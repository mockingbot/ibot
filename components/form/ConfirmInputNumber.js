import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { isNumber, isEqual } from 'lodash'

import { Button } from '../button'
import { trimList, getOtherProps, SVG } from '../util'

import { SelectMenu } from './Select'

const LONG_PRESSED_THRESHOLD = 500
const LONG_PRESSED_STEPPING_INTERVAL = 30

const toFixed = (num, precision) => Number(Number(num).toFixed(precision))

/**
 * 根据按键来决定step大小
 *
 * @param {Event}
 * @param {Number} step
 * @return {Number} final step
 */
const getStep = ({ shiftKey, metaKey }, step = 1) => (
  shiftKey ? step*10 : metaKey ? step*100 : step
)

const checkSettability = value => (
  value === ''
  || /^0?[\+\-]0*$/.test(value)   // Starting with a plus/minus
  || /^[\+\-]?\d*\.$/.test(value) // Ending with a dot
)

const defaultOnFocus = ({ currentTarget: $input }) => (
  setTimeout(() => $input.select(), 50)
)

export class ConfirmInputNumber extends PureComponent {
  state = {
    value: isNumber(Number(this.props.value)) ? Number(this.props.value) : '',

    isHover: false,
    isActive: false,

    isValid: true,
    isMenuOpen: false,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    unstyled: PropTypes.bool,

    step: PropTypes.number,
    precision: PropTypes.number,
    formatter: PropTypes.func,
    parser: PropTypes.func,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    optionList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    menuX: PropTypes.oneOf(['left', 'center']),
    dontSelectOnFocus: PropTypes.bool,

    title: PropTypes.node,
    desc: PropTypes.node,

    prefix: PropTypes.node,
    suffix: PropTypes.node,

    min: PropTypes.number,
    max: PropTypes.number,

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onFocus: PropTypes.func,
    onConfirm: PropTypes.func.isRequired,
    shouldCorrectOnConfirm: PropTypes.bool,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: 'regular',
    unstyled: false,

    value: '',
    placeholder: '',

    step: 1,
    precision: 1,
    parser: v => v,
    formatter: v => v,

    min: 0,
    max: Infinity,

    isDisabled: false,
    disabled: false,
    readOnly: false,

    onConfirm: () => null,
    shouldCorrectOnConfirm: false,
  }

  static getDerivedStateFromProps({ value: newValue }, { value }) {
    if (newValue !== value) {
      return { value: isNumber(newValue) ? newValue : '' }
    }

    return null
  }

  componentDidMount() {
    this.positionEverything()
  }

  componentDidUpdate({
    title: prevTitle, prefix: prevPrefix, suffix: prevSuffix,
  }) {
    const { title, prefix, suffix } = this.props

    if (
      !isEqual(prevTitle, title)
      || !isEqual(prevPrefix, prefix)
      || !isEqual(prevSuffix, suffix)
    ) {
      this.positionEverything()
    }
  }

  positionEverything() {
    const { $label } = this
    const { value, title, prefix, suffix } = this.props

    const isValid = this.checkValidity(value)
    this.setState({ isValid })

    if (!title && !prefix && !suffix) return

    const $input = $label.querySelector('input')
    const $action = $label.querySelector('.action')

    const $title = $label.querySelector('.title')
    const $prefix = $label.querySelector('.prefix')
    const $suffix = $label.querySelector('.suffix span')

    $input.style.paddingLeft = null

    const originalPaddingLeft = parseInt(getComputedStyle($input).getPropertyValue('padding-left'))

    if (title || prefix) {
      const space = ($title ? $title.clientWidth+6 : 0) + ($prefix ? $prefix.clientWidth : 0)

      const style = { paddingLeft: `${space + originalPaddingLeft}px` }

      Object.assign($input.style, style)

      if (title && prefix) {
        Object.assign($prefix.style, { left: `${$title.clientWidth + 6}px` })
      }

      if (suffix) {
        Object.assign($suffix.parentNode.style, style)
      }
    }

    if (suffix) {
      const space = $action.clientWidth + $suffix.clientWidth
      Object.assign($input.style, { paddingRight: `${space}px` })
    }
  }

  get canBePositive() { return this.props.max > 0 }
  get canBeNegative() { return this.props.min < 0 }

  onChange = e => {
    const { target: { value } } = e
    this.setValue(value.trim(), e)
  }

  correctNumber = number => {
    const { value: originalValue, min, max, precision } = this.props

    const correctedNumber = toFixed(
      Math.min(Math.max(number, min), max),
      precision,
    )

    return isNaN(correctedNumber) ? originalValue : correctedNumber
  }

  checkValidity = number => (
    /^\+$/.test(number)
    ? this.canBePositive
    : /^\-$/.test(number)
    ? this.canBeNegative
    : number === ''
      || (
        isFinite(number)
        && this.correctNumber(number) === Number(number)
      )
  )

  setValue = (v, e, callback) => {
    if (e.persist) {
      e.persist()
    }

    const {
      value: originalValue,
      parser,
      placeholder,
      onConfirm,
    } = this.props

    const value = parser(v.toString()).toString()

    const isValid = this.checkValidity(value)
    const isNumber = v !== '' && isFinite(value)
    const isSettable = checkSettability(value)

    if (!isNumber && !isSettable) return

    const correctedNumber = this.correctNumber(value)
    const finalNumber = isNaN(correctedNumber) ? originalValue : correctedNumber
    const settingNumber = isSettable || !isValid ? value : finalNumber

    this.setState(
      { value: settingNumber, isValid },
      callback,
    )
  }

  setConfirmedValue = (v, e) => this.setValue(
    v,
    e,
    () => this.onConfirm(e),
  )

  onConfirm = e => {
    const {
      value: originalValue,
      precision,
      onConfirm,
      shouldCorrectOnConfirm,
    } = this.props

    const { value } = this.state
    const isValid = this.checkValidity(value)
    const isDisabled = this.props.isDisabled || this.props.disabled

    if (isDisabled) {
      return
    }

    if (e.persist) {
      e.persist()
    }

    const correctedNumber = this.correctNumber(value)
    const finalNumber = isNaN(correctedNumber) ? originalValue : correctedNumber

    const settingNumber = (
      value === ''
      ? originalValue
      : isValid
      ? /^[\+\-]$/.test(value) ? 0 : value
      : correctedNumber === toFixed(value, precision)
      ? correctedNumber
      : shouldCorrectOnConfirm
      ? finalNumber
      : originalValue || finalNumber
    )

    return this.setState(
      {
        value: settingNumber,
        isValid: true,
      },
      () => onConfirm(settingNumber, e),
    )
  }

  focusOnInput = e => {
    try {
      const $input = e.currentTarget.closest('label').querySelector('input')
      setTimeout(() => $input.focus())
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e)
    }
  }

  onStep = e => {
    e.persist()
    e.nativeEvent.stopPropagation()

    const { action } = e.currentTarget.dataset

    const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

    this.setConfirmedValue(
      this.correctNumber(Number(this.state.value) + step),
      e,
    )

    this.focusOnInput(e)

    // 长按500毫秒后，进入递增/减模式
    Object.assign(this, {
      longPressedTimeout: setTimeout(
        () => Object.assign(this, {
          steppingInterval: setInterval(
            () => this.setConfirmedValue(
              this.correctNumber(Number(this.state.value) + step),
              e,
            ),
            LONG_PRESSED_STEPPING_INTERVAL,
          ),
        }),
        LONG_PRESSED_THRESHOLD,
      ),
    })
  }

  onRelease = () => {
    clearTimeout(this.longPressedTimeout)
    clearInterval(this.steppingInterval)
  }

  onKeyDown = e => {
    const { key, currentTarget } = e

    const action = (
      key === 'ArrowUp'
      ? 'up'
      : key === 'ArrowDown'
      ? 'down'
      : key === 'Enter'
      ? 'enter'
      : key === 'Tab'
      ? 'tab'
      : null
    )

    const isOn$input = currentTarget instanceof Element && currentTarget.matches('input')
    if (!action) return

    if (e.persist) {
      e.persist()
    }

    if (action !== 'tab') {
      e.preventDefault()
    }

    if (isOn$input && action === 'tab') {
      this.setInactive()
      return this.onConfirm(e)
    } else if (isOn$input && action === 'enter') {
      this.onConfirm(e)
      this.$label.querySelector('input').select()
      return
    }

    if (isOn$input) {
      const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

      this.setConfirmedValue(
        this.correctNumber(Number(this.state.value) + step),
        e,
      )
    }
  }

  set$label = $label => Object.assign(this, { $label })

  setActive = () => this.setState({ isActive: true })
  setInactive = () => this.setState({ isActive: false })

  onHover = () => this.setState({ isHover: true })
  onLeave = () => this.setState({ isHover: false })

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })
  closeMenu = () => this.setState({ isMenuOpen: false })

  onSelect = e => {
    e.persist()

    const { currentTarget: $opt } = e
    this.setConfirmedValue($opt.dataset.value, e)
    this.closeMenu()
  }

  onClickOutside = e => {
    const { target } = e

    if (!(target.closest('label') && this.$label.contains(target))) {
      this.onConfirm(e)
      this.setInactive()
    }
  }

  render() {
    const {
      className,
      size, unstyled,
      readOnly, placeholder,

      prefix, suffix,
      title, desc,

      formatter,

      dontSelectOnFocus,
      onFocus = !dontSelectOnFocus ? defaultOnFocus : undefined,

      optionList, menuX,
    } = this.props

    const { value, isHover, isActive, isValid, isMenuOpen } = this.state

    const isEmpty = value === ''
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      'Input InputNumber ConfirmInputNumber',
      size,
      unstyled && 'unstyled',
      className,

      isHover && !isDisabled && !readOnly && 'is-hover',
      isActive && !isDisabled && !readOnly && 'is-active',
      isMenuOpen && 'is-menu-open',

      isDisabled && 'is-disabled',
      readOnly && 'is-readonly',
      isValid ? 'is-valid' : 'isnt-valid',
      isEmpty ? 'is-empty' : 'isnt-empty',

      !!title && 'with-title',
      !!desc && 'with-desc',
      !!prefix && 'with-prefix',
      !!suffix && 'with-suffix',
    ])

    const hasMenu = optionList && optionList.length > 0

    return (
      <label
        className={klass}
        ref={this.set$label}

        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}

        onMouseDown={this.setActive}
      >
        { title && <span className="title">{title}</span> }
        { desc && <span className="desc">{desc}</span> }

        { prefix && <span className="prefix">{prefix}</span> }

        <input
          /**
           * There are unsolved issues with [type=number] inputs,
           * so we currently use regular text input instead.
           */
          type="text"
          value={formatter(value)}
          placeholder={placeholder}

          disabled={isDisabled}
          readOnly={readOnly}

          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onFocus={onFocus}
          {...getOtherProps(this.constructor, this.props)}
        />

      { suffix && (
          <span
            className="suffix"
            data-value={formatter(value)}
            data-suffix={suffix}
          >
            <span>{suffix}</span>
          </span>
        )}

        {
          hasMenu
          ? <div className="action caret">
              <Button
                type="text"
                tabIndex="-1"
                onClick={this.toggleMenu}
                html={SVG.INPUT_ARROW}
              />
            </div>

          : <div className="action">
              <Button
                type="text"
                tabIndex="-1"
                data-action="up"
                onMouseDown={this.onStep}
                onMouseLeave={this.onRelease}
                onMouseUp={this.onRelease}
                html={SVG.INPUT_ARROW}
              />
              <Button
                type="text"
                tabIndex="-1"
                data-action="down"
                onMouseDown={this.onStep}
                onMouseLeave={this.onRelease}
                onMouseUp={this.onRelease}
                html={SVG.INPUT_ARROW}
              />
            </div>
        }

        { hasMenu && (
          <SelectMenu
            isOpen={isMenuOpen}
            menuClassName="SelectNumberMenu"
            $select={this.$label}

            optionList={optionList}
            value={value}
            menuX={menuX}

            onChange={this.onSelect}
            onClose={this.closeMenu}
          />
        )}

        <DocumentEvents
          enabled={isActive || isMenuOpen}
          onMouseDown={this.onClickOutside}
          onKeyDown={this.onKeyDown}
        />
      </label>
    )
  }
}

export function PanelInputNumber({ className, ...others }) {
  return (
    <ConfirmInputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

 PanelInputNumber.propTypes = {
  className: PropTypes.string,
}

export function PanelSelectNumber({ className, ...others }) {
  return (
    <ConfirmInputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

PanelSelectNumber.propTypes = PanelInputNumber.propTypes

PanelSelectNumber.defaultProps = {
  optionList: [1, 2, 3],
}
