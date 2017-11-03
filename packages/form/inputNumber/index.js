import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mockingbot/icon'
import './index.styl'

function getRange (e) {
  if (e.shiftKey) return 10
  if (e.metaKey) return 100
  return 1
}

const threshold = 500
const interval = 30
const numberFix = (num, precision) => Number(Number(num).toFixed(precision))

// todo: add step and maxLength
export class InputNumber extends PureComponent {
  static propTypes = {
    // 数值精度
    precision: PropTypes.number,
    // 指定输入框展示值的格式
    formatter: PropTypes.func,
    // 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
    parser: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cycle: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    step: PropTypes.number,
    attr: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  setElementRef = ref => this.$elem = ref

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
    const { attr, parser, min, max, precision } = this.props
    value = parser(value.toString())
    // 避免 为空字符串时 Number("") = 0
    if (value != "" && !isNaN(value)) {
      if (value > max) {
        value = max
      }
      if (value < min) {
        value = min
      }
      this.props.onChange(numberFix(value, precision), attr)
    }
    this.setState({ value })
  }

  handlePlus = (e) => {
    const range = getRange(e)
    const { value: stateValue } = this.state
    const { precision } = this.props
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
    const { value: stateValue } = this.state
    const range = getRange(e)
    const { precision } = this.props
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
      const range = getRange(e)
      const { value: stateValue } = this.state
      const { precision } = this.props
      const value = bool ? numberFix(parseFloat(stateValue) - range, precision) : numberFix(parseFloat(stateValue) + range, precision)
      this.handleValue(value)
    }
    if (e.key == 'ArrowUp') {
      commandKeyDown(e, false)
    } else if (e.key == 'ArrowDown') {
      commandKeyDown(e, true)
    }
  }


  render () {
    const { disabled, formatter } = this.props
    const { value } = this.state
    return (<div type="number-input" className={`number-input ${disabled ? 'disabled' : ''}`}>
      <input
        type="text"
        value={formatter(value)}
        ref={this.setElementRef}
        className="input"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onFocus={this.bindBlurListener}
        onBlur={this.unbindBlurListener}
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
  min: -1000,
  max: 1000,
  value: 1,
  maxLength: 10,
  precision: 1,
  parser: v => v.replace(/[^\w\.-]+/g, ''),
  formatter: v => v,
}
