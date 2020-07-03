import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'
import isEqual from 'lodash/isEqual'
import isNumber from 'lodash/isNumber'
import Button from '../button'
import { SelectMenu } from '../select'
import SVG from '../svg'
import { trimList, getOtherProps, setNumberValue } from '../util'

import { StyledInputNumber } from './styled'

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
  shiftKey ? step * 10 : metaKey ? step * 100 : step
)

const checkSettability = value => (
  value === '' ||
  /^0?[\+\-]0*$/.test(value) // Starting with a plus/minus
  || /^[\+\-]?\d*\.$/.test(value) // Ending with a dot
)

const defaultOnFocus = ({ currentTarget: $input }) => (
  setTimeout(() => $input.select(), 50)
)

export default class InputNumber extends PureComponent {
  state = {
    prevProps: this.props,
    value: setNumberValue(this.props.value),

    isActive: false,
    isValid: true,
    isMenuOpen: false,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    theme: PropTypes.oneOf(['core', 'plain']),
    unstyled: PropTypes.bool,

    step: PropTypes.number,
    precision: PropTypes.number,
    formatter: PropTypes.func,
    parser: PropTypes.func,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueForEmptyInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    className: PropTypes.string,
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',
    unstyled: false,

    value: '',
    valueForEmptyInput: null,
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
    onBlur: () => null,
  }

  static getDerivedStateFromProps (props, { prevProps, value }) {
    if (!isEqual(prevProps, props)) {
      const { value: newValue } = props
      return { prevProps: props, value: setNumberValue(newValue) }
    }
    return null
  }

  componentDidMount () {
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

    const originalPaddingLeft = parseInt(getComputedStyle($input).getPropertyValue('padding-left'))

    if (title || prefix) {
      const space = ($title ? $title.clientWidth + 6 : 0) + ($prefix ? $prefix.clientWidth : 0)

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

  onChange = e => {
    const { target: { value } } = e
    this.setValue(value.trim(), e)
  }

  correctNumber = number => {
    const { min, max, precision } = this.props
    return toFixed(Math.min(Math.max(number, min), max), precision)
  }

  checkValidity = number => (
    number === '' ||
    (
      isFinite(number) &&
      this.correctNumber(number) === Number(number)
    )
  )

  setValue = (v, e) => {
    e.persist()
    clearTimeout(this.correctionTimeout)

    const {
      value: originalValue,
      parser,
      placeholder,
      onChange,
    } = this.props

    const value = parser(v.toString()).toString()

    const isNull = v !== '0' && !value && !!placeholder
    const isValid = this.checkValidity(value)
    const isNumber = v !== '' && isFinite(value)
    const isSettable = checkSettability(value)

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
          this.state.value === settingNumber &&
          this.setState(
            {
              value: finalNumber,
              isValid: true,
            },
            onChange(finalNumber, e),
          )
        ), CORRECTION_AWAIT)
      ) })
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
    e.persist()
    e.nativeEvent.stopPropagation()

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

    e.persist()
    e.nativeEvent.preventDefault()

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
    e.persist()

    const { currentTarget: $opt } = e
    this.setValue($opt.dataset.value, e)
    this.closeMenu()
  }

  onClickOutside = ({ target }) => {
    if (!(target.closest('label') && this.$label.contains(target))) {
      this.setInactive()
    }
  }

  onBlur = e => {
    const { valueForEmptyInput, onBlur } = this.props
    const { value } = this.state

    onBlur(e)

    if (!value && isNumber(valueForEmptyInput)) {
      this.setValue(valueForEmptyInput, e)
    }
  }

  render () {
    const {
      className,
      size, theme, unstyled,
      readOnly, placeholder,

      prefix, suffix,
      title, desc,

      formatter,

      dontSelectOnFocus,
      onFocus = !dontSelectOnFocus ? defaultOnFocus : undefined,

      optionList, menuX,
    } = this.props

    const { value, isActive, isValid, isMenuOpen } = this.state

    const isEmpty = value === ''
    const isDisabled = this.props.isDisabled || this.props.disabled

    const klass = trimList([
      theme === 'core' ? 'CoreInput CoreInputNumber' : 'Input InputNumber',
      size,
      unstyled && 'unstyled',
      className,

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
      <StyledInputNumber
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
          onBlur={this.onBlur}
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

        <InputActionButton hasMenu={hasMenu} onToggleMenu={this.toggleMenu} onStep={this.onStep} onRelease={this.onRelease} />

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

        { (isActive || isMenuOpen) && (
          <EventListener
            target={document}
            onClick={this.onClickOutside}
          />
        )}

      </StyledInputNumber>
    )
  }
}

export class InputActionButton extends PureComponent {
  static propTypes = {
    hasMenu: PropTypes.bool,
    onStep: PropTypes.func,
    onToggleMenu: PropTypes.func,
    onRelease: PropTypes.func,
  }

  render () {
    const { hasMenu, onToggleMenu, onStep, onRelease } = this.props

    return (
      <React.Fragment>
        {
          hasMenu
            ? <div className="action caret">
              <Button type="text" tabIndex="-1" onClick={onToggleMenu} >
                <SVG name="triangle_down" />
              </Button>
            </div>

            : <div className="action">
              <Button
                type="text"
                tabIndex="-1"
                data-action="up"
                onMouseDown={onStep}
                onMouseLeave={onRelease}
                onMouseUp={onRelease}
              >
                <SVG name="triangle_up" />
              </Button>

              <Button
                type="text"
                tabIndex="-1"
                data-action="down"
                onMouseDown={onStep}
                onMouseLeave={onRelease}
                onMouseUp={onRelease}
              >
                <SVG name="triangle_down" />
              </Button>
            </div>
        }
      </React.Fragment>
    )
  }
}
