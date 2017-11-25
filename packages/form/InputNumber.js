import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '@ibot/button'
import { trimList, getOtherProps } from '@ibot/util'

const LONG_PRESSED_THRESHOLD = 500
const LONG_PRESSED_STEPPING_INTERVAL = 30
const CORRECTION_AWAIT = 1000

// **NOTE:** Use SVG here instead of font icons to solve pixel alignment issue.
const ARROW_SVG = `<svg width="6" height="4" viewBox="0 0 6 4"><path d="M3 0l3 4H0" fill-rule="evenodd"></path></svg>`

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

export default class InputNumber extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value || (!!props.placeholder ? '' : 1),
      isValid: false,
    }
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    // 数值精度
    precision: PropTypes.number,
    // 指定输入框展示值的格式
    formatter: PropTypes.func,
    // 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
    parser: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    min: PropTypes.number,
    max: PropTypes.number,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    size: 'small',
    value: '',
    placeholder: '',
    step: 1,
    isDisabled: false,
    disabled: false,
    readOnly: false,
    min: 0,
    max: Infinity,
    precision: 1,
    parser: v => v,
    formatter: v => v,
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

  componentWillReceiveProps({ value: newValue }) {
    const { placeholder } = this.props
    const { value } = this.state

    if (newValue !== value) {
      this.setState({
        value: (
          newValue === 0 || !!newValue
          ? newValue
          : !!placeholder
          ? ''
          : 1
        ),
      })
    }
  }

  set$input = $input => Object.assign(this, { $input })

  handleChange = ({ target: { value } }) => (
    this.setValue(value.trim())
  )

  correctNumber = number => {
    const { min, max, precision } = this.props
    return toFixed(Math.min(Math.max(number, min), max), precision)
  }

  checkValidity = number => (
    isFinite(number)
    && this.correctNumber(number) === Number(number)
  )

  checkSettability = value => (
    /^0?\-0*$/.test(value)      // Starting with a minus
    || /^\-?\d*\.$/.test(value) // Ending with a dot
  )

  setValue = v => {
    clearTimeout(this.correctionTimeout)

    const {
      value: originalValue,
      parser,
      min, max,
      precision,
      placeholder,
      onChange,
    } = this.props

    const value = (
      parser(v.toString())
      .toString()
      .replace(/^0(?!\.)/, '')
      .replace(/^0{2,}(?!\.)/, '0')
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
      onChange(settingNumber)
    } else {
      Object.assign(this, { correctionTimeout: (
        setTimeout(() => (
          this.state.value === settingNumber
          && this.setState(
            {
              value: finalNumber,
              isValid: true,
            },
            onChange(finalNumber),
          )
        ), CORRECTION_AWAIT)
      )})
    }
  }

  focusOnInput = e => {
    try {
      const $input = e.currentTarget.closest('label').querySelector('input')
      setTimeout(() => $input.focus())
    } catch (e) {}
  }

  handleStep = e => {
    const { action } = e.currentTarget.dataset

    const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

    this.setValue(
      this.correctNumber(Number(this.state.value) + step)
    )

    this.focusOnInput(e)

    // 长按500毫秒后，进入递增/减模式
    Object.assign(this, {
      longPressedTimeout: setTimeout(
        () => Object.assign(this, {
          steppingInterval: setInterval(
            () => this.setValue(
              this.correctNumber(Number(this.state.value) + step)
            ),
            LONG_PRESSED_STEPPING_INTERVAL,
          ),
        }),
        LONG_PRESSED_THRESHOLD,
      )
    })
  }

  handleRelease = () => {
    clearTimeout(this.longPressedTimeout)
    clearInterval(this.steppingInterval)
  }

  handleKeyDown = e => {
    const action = e.key === 'ArrowUp' ? 'up' : e.key === 'ArrowDown' ? 'down' : null

    if (!action) return
    e.preventDefault()

    const step = getStep(e, this.props.step) * (action === 'up' ? 1 : -1)

    this.setValue(
      this.correctNumber(Number(this.state.value) + step)
    )
  }

  setActive = () => this.setState({ isActive: true })
  setNotActive = () => this.setState({ isActive: false })

  render () {
    const {
      size,
      formatter, prefix, suffix, placeholder, readOnly,
      onFocus,
    } = this.props

    const { value, isActive, isValid } = this.state
    const isDisabled = this.props.isDisabled || this.props.disabled

    return (
      <label
        className={trimList([
          'Input InputNumber',
          size,
          isActive && !isDisabled && !readOnly && 'is-active',
          isDisabled && 'is-disabled',
          readOnly && 'is-readonly',
          isValid ? 'is-valid' : 'isnt-valid',
          !!prefix && 'with-prefix',
          !!suffix && 'with-suffix',
        ])}

        onMouseDown={this.setActive}
        onMouseLeave={this.setNotActive}
      >
        { prefix && <span className="prefix" children={prefix} /> }

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

          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={onFocus}
          {...getOtherProps(this.constructor, this.props)}
        />

        { suffix && (
          <span
            className="suffix"
            data-value={formatter(value)}
            data-suffix={suffix}
            children={suffix}
          />
        )}

        <div className="action">
          <Button
            type="text"
            tabIndex="-1"
            data-action="up"
            onMouseDown={this.handleStep}
            onMouseLeave={this.handleRelease}
            onMouseUp={this.handleRelease}
            html={ARROW_SVG}
          />
          <Button
            type="text"
            tabIndex="-1"
            data-action="down"
            onMouseDown={this.handleStep}
            onMouseLeave={this.handleRelease}
            onMouseUp={this.handleRelease}
            html={ARROW_SVG}
          />
        </div>
      </label>
    )
  }
}

