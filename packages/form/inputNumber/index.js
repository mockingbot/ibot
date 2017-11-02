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
const floatFix = (num, dig) => Number(Number(num).toFixed(dig))


// 目前 formatter 被这 checkValid 拦截了，暂时没用到
// 对于 maxlength，存在精度的时候已经无用了,需要用 dig表示保留小数后几位
export class InputNumber extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cycle: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    formatter: PropTypes.func,
    parser: PropTypes.func,
    step: PropTypes.number,
    attr: PropTypes.string,
    dig: PropTypes.number,
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
    let value = e.target.value
    this.handleValue(value)
  }

  checkValid = (value) => {
    const { min, max, dig } = this.props
    if (value == '') {
      value = 0
    }
    if (value < min) {
      return min
    }
    if (value > max) {
      return max
    }
    if (typeof value == 'string') {
      if (value.startsWith('0')) {
        const idx = value.indexOf('.')
        if (idx == '-1') {
          // 如果是0开头的数字并且不为小数，则保留其数字，则直接覆盖0
          value = floatFix(value, dig)
        } else {
          // 如果是0开头，并且是小数，则保留
          this.setState({ value })
        }
      } else {
        // 其他数字情况下
        // 1. 如果不含小数，则取整
        if (!value.includes('.')) {
          value = Number(value)
        }
      }
    }
    // if (/^0+/.test(value)) { // 禁止在数字前加0
    //   this.$elem.value = value.replace(/^0+/, '')
    // }
    return value
  }

  componentWillReveiveProps ({ value }) {
    if (value != this.state.value) {
      this.setState({ value })
    }
  }

  handleValue = (value) => {
    if (isNaN(value)) return
    value = this.checkValid(value)
    const { attr, parser } = this.props
    value = parser(value)
    this.prevValue = value
    this.props.onChange(value, attr)
    this.setState({ value })
  }

  handlePlus = (e) => {
    const range = getRange(e)
    const { value: stateValue } = this.state
    const { formatter, dig } = this.props
    const value = floatFix(formatter(stateValue) + range, dig)
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
    const { formatter, dig } = this.props
    const value = floatFix(formatter(stateValue) - range, dig)
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
      const { formatter, dig } = this.props
      const value = bool ? floatFix(formatter(stateValue) - range, dig) : floatFix(formatter(stateValue) + range, dig)
      this.handleValue(value)
    }
    if (e.key == 'ArrowUp') {
      commandKeyDown(e, false)
    } else if (e.key == 'ArrowDown') {
      commandKeyDown(e, true)
    }
  }
  /* fix:
   * 修复safari中, 因为mousedown + mousemove至边界触发元素scroll, 不得不在#canvas的mousedown处preventDefault
   * 然后导致无法触发浏览器默认的blur所有inputElement的行为
   */

  // manualBlurInput = (e) => {
  //   if (!this.$elem.contains(e.target)) {
  //     this.$elem.blur()
  //   }
  // }

  // bindBlurListener = () => {
  //   document.addEventListener('mousedown', this.manualBlurInput, true)
  // }

  // unbindBlurListener = () => {
  //   document.removeEventListener('mousedown', this.manualBlurInput)
  // }


  render () {
    const { disabled } = this.props
    const { value } = this.state
    return (<div type="number-input" className={`number-input ${disabled}`}>
      <input
        type="text"
        value={value}
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
  maxLength: 10,
  value: 1,
  dig: 1,
  parser: v => v,
  formatter: v => isNaN(parseFloat(v)) ? 0 : parseFloat(v),
}