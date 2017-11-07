import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mockingbot/icon'
import './index.styl'

// 根据按键来决定每次up/down时值是多少
function getEventStep (e, step = 1) {
  if (e.shiftKey) return 10
  if (e.metaKey) return 100
  return step
}

const threshold = 500
const interval = 30
const numberFix = (num, precision) => Number(Number(num).toFixed(precision))

export default class InputNumber extends PureComponent {
  static propTypes = {
    // 数值精度
    precision: PropTypes.number,
    // 指定输入框展示值的格式
    formatter: PropTypes.func,
    // 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
    parser: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  handleChange = (e) => {
    const value = e.target.value.trim()
    this.handleValue(value)
  }

  componentWillReveiveProps ({ value }) {
    if (value != this.state.value) {
      this.setState({ value })
    }
  }

  handleValue = (value) => {
    const { parser, min, max, precision } = this.props
    value = parser(value.toString())
    if (!isNaN(value)) {
      if (value > max) {
        value = max
      }
      if (value < min) {
        value = min
      }
      value = numberFix(value, precision)
      value != this.prevValue && this.props.onChange(value)
      this.prevValue = value
    }
    this.setState({ value })
  }

  handlePlus = (e) => {
    const { precision, step } = this.props
    const range = getEventStep(e, step)
    const { value: stateValue } = this.state
    const value = numberFix(Number(stateValue) + range, precision)
    this.handleValue(value)
    // 按下超过500毫秒以后, 进入长按模式
    this.timeout = setTimeout(() => {
      this.inerval = setInterval(() => {
        this.handleValue(value)
      }, interval)
    }, threshold)
  }

  handleMinus = (e) => {
    const { precision, step } = this.props
    const { value: stateValue } = this.state
    const range = getEventStep(e, step)
    const value = numberFix(Number(stateValue) - range, precision)
    this.handleValue(value)
    this.timeout = setTimeout(() => {
      this.inerval = setInterval(() => {
        this.handleValue(value)
      }, interval)
    }, threshold)
  }

  handleRelease = () => {
    clearTimeout(this.timeout)
    clearInterval(this.inerval)
  }

  handleKeyDown = (e) => {
    const commandKeyDown = (e, bool) => {
      e.preventDefault()
      const { precision, step } = this.props
      const range = getEventStep(e, step)
      const { value: stateValue } = this.state
      // 避免空字符串 parseFloat("") NaN
      const value = bool ? numberFix(parseFloat(Number(stateValue)) - range, precision) : numberFix(parseFloat(Number(stateValue)) + range, precision)
      this.handleValue(value)
    }
    if (e.key == 'ArrowUp') {
      commandKeyDown(e, false)
    } else if (e.key == 'ArrowDown') {
      commandKeyDown(e, true)
    }
  }

  handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e)
  }

  handleBlur = (e) => {
    this.props.onBlur && this.props.onBlur(e)
  }

  render () {
    const { disabled, formatter } = this.props
    const { value } = this.state
    return (<div type="number-input" className={`number-input ${disabled ? 'disabled' : ''}`}>
      <input
        type="text"
        value={formatter(value)}
        className="input"
        disabled={disabled}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
      <div className="buttons">
        <Icon
          type="fa"
          name="caret-up"
          onMouseDown={this.handlePlus}
          onMouseLeave={this.handleRelease}
          onMouseUp={this.handleRelease}
        />
        <Icon
          type="fa"
          name="caret-down"
          onMouseDown={this.handleMinus}
          onMouseLeave={this.handleRelease}
          onMouseUp={this.handleRelease}
        />
      </div>
    </div>)
  }
}

InputNumber.defaultProps = {
  step: 1,
  disable: false,
  min: 0,
  max: 1000,
  value: 1,
  precision: 1,
  parser: v => v.replace(/[^\w\.-]+/g, ''),
  formatter: v => v,
}
