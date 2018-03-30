import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import isNumber from 'lodash/isNumber'

import Button from '../button'
import util from '../util'

import { SelectMenu } from './Select'
const { trimList, getOtherProps, SVG } = util

const LONG_PRESSED_THRESHOLD = 500
const LONG_PRESSED_STEPPING_INTERVAL = 30
const CORRECTION_AWAIT = 1000

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

export class InputNumber extends PureComponent {
  state = {
    value: (
      isNumber(this.props.value)
      ? this.props.value
      : this.props.placeholder
      ? ''
      : 1
    ),

    isActive: false,
    isValid: true,
    isMenuOpen: false,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    unstyled: PropTypes.bool,

    step: PropTypes.number,
    precision: PropTypes.number, // 数值精度
    formatter: PropTypes.func, // 输入框展示值的格式
    parser: PropTypes.func, // 从formatter里转换回数字的方式

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    optionList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    shouldMenuAlignCenter: PropTypes.bool,

    title: PropTypes.node,
    desc: PropTypes.node,

    prefix: PropTypes.node,
    suffix: PropTypes.node,

    min: PropTypes.number,
    max: PropTypes.number,

    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,

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

    onChange: () => null,
    onFocus: ({ currentTarget: $input }) => (
      setTimeout(() => $input.select(), 50)
    ),
  }

  componentWillMount() {
    const { value } = this.props
    const isValid = this.checkValidity(value)
    this.setState({ isValid })
  }

  componentDidMount() {
    const { $label } = this

    const { title, prefix, suffix } = this.props

    if (!title && !prefix && !suffix) return

    const $input = $label.querySelector('input')
    const $action = $label.querySelector('.action')

    const $title = $label.querySelector('.title')
    const $prefix = $label.querySelector('.prefix')
    const $suffix = $label.querySelector('.suffix span')

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

  componentWillReceiveProps({ value: newValue }) {
    const { value } = this.props

    if (newValue !== value) {
      this.setState({
        value: (
          newValue === 0 || !!newValue
          ? newValue
          : ''
        ),
      })
    }
  }

  onChange = e => {
    const { target: { value } } = e
    this.setValue(value.trim(), e)
  }

  correctNumber = number => {
    const { min, max, precision } = this.props
    return toFixed(Math.min(Math.max(number, min), max), precision)
  }

  checkValidity = number => (
    number === ''
    || (
      isFinite(number)
      && this.correctNumber(number) === Number(number)
    )
  )

  checkSettability = value => (
    /^0?\-0*$/.test(value)      // Starting with a minus
    || /^\-?\d*\.$/.test(value) // Ending with a dot
  )

  setValue = (v, e) => {
    clearTimeout(this.correctionTimeout)

    const {
      value: originalValue,
      parser,
      placeholder,
      onChange,
    } = this.props

    const value = (
      parser(v.toString())
      .toString()
      .replace(/^0(?!\.)/, '')
    )

    const isNull = v !== '0' && !value && !!placeholder
    const isValid = this.checkValidity(value)
    const isNumber = isFinite(value)
    const isSettable = this.checkSettability(value)

    if (!isNumber && !isSettable) return

    const correctedNumber = this.correctNumber(value)
    const finalNumber = isNaN(correctedNumber) ? originalValue : correctedNumber
    const settingNumber = isNull ? '' : isSettable || !isValid ? value : finalNumber

    this.setState({ value: settingNumber, isValid })

    if (isValid) {
      onChange(settingNumber, e)
    } else {
      Object.assign(this, { correctionTimeout: (
        setTimeout(() => (
          this.state.value === settingNumber
          && this.setState(
            {
              value: finalNumber,
              isValid: true,
            },
            onChange(finalNumber, e),
          )
        ), CORRECTION_AWAIT)
      )})
    }
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
    e.stopPropagation()
    const { action } = e.currentTarget.dataset

    const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

    this.setValue(
      this.correctNumber(Number(this.state.value) + step),
      e,
    )

    this.focusOnInput(e)

    // 长按500毫秒后，进入递增/减模式
    Object.assign(this, {
      longPressedTimeout: setTimeout(
        () => Object.assign(this, {
          steppingInterval: setInterval(
            () => this.setValue(
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
    const action = e.key === 'ArrowUp' ? 'up' : e.key === 'ArrowDown' ? 'down' : null

    if (!action) return
    e.preventDefault()

    const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

    this.setValue(
      this.correctNumber(Number(this.state.value) + step),
      e,
    )
  }

  set$label = $label => Object.assign(this, { $label })
  setActive = () => this.setState({ isActive: true })
  setInactive = () => this.setState({ isActive: false })
  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })
  closeMenu = () => this.setState({ isMenuOpen: false })

  onSelect = e => {
    const { currentTarget: $opt } = e
    this.setValue(this.props.optionList[$opt.dataset.idx], e)
    this.closeMenu()
  }

  onClickOutside = ({ target }) => {
    if (!(target.closest('label') && this.$label.contains(target))) {
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
      onFocus,

      optionList, shouldMenuAlignCenter,
    } = this.props

    const { value, isActive, isValid, isMenuOpen } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      'Input InputNumber',
      size,
      unstyled && 'unstyled',
      className,

      isActive && !isDisabled && !readOnly && 'is-active',
      isMenuOpen && 'is-menu-open',

      isDisabled && 'is-disabled',
      readOnly && 'is-readonly',
      isValid ? 'is-valid' : 'isnt-valid',

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
            currentOptionIdx={optionList.indexOf(value)}
            shouldMenuAlignCenter={shouldMenuAlignCenter}

            onChange={this.onSelect}
            onClose={this.closeMenu}
          />
        )}

        <DocumentEvents
          enabled={isActive || isMenuOpen}
          onMouseDown={this.onClickOutside}
        />
      </label>
    )
  }
}

export function SelectNumber({ className, ...others }) {
  return (
    <InputNumber
      className={trimList(['SelectNumber', className])}
      {...others}
    />
  )
}

SelectNumber.propTypes = {
  className: PropTypes.string,
}

SelectNumber.defaultProps = {
  optionList: [1, 2, 3],
}

export function PanelInputNumber({ className, ...others }) {
  return (
    <InputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

PanelInputNumber.propTypes = SelectNumber.propTypes

export function PanelSelectNumber({ className, ...others }) {
  return (
    <InputNumber
      size="small"
      className={trimList(['PanelInputNumber', className])}
      {...others}
    />
  )
}

PanelSelectNumber.propTypes = SelectNumber.propTypes
PanelSelectNumber.defaultProps = SelectNumber.defaultProps
