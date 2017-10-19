import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Theme from './Theme'
import Canvas from './Canvas'
import History from './History'
import Bands from './Bands'
import DashBoard from './DashBoard'

import styles from './index.sass'

import { hexToHsb, hexToRgb, hsbToHex } from './utils'

export default class ColorPicker extends PureComponent {
  constructor (props) {
    super(props)

    const { color, opacity } = props

    this.state = { color, opacity }
    this.setPosInfo(color, opacity)
  }

  componentWillReceiveProps({ color: nextColor, opacity: nextOpacity }) {
    const { color, opacity } = this.state

    if (color !== nextColor || opacity !== nextOpacity) {
      this.setState({ color: nextColor, opacity: nextOpacity })
    }
  }

  setPosInfo (color, opacity = 100) {
    const hsb = hexToHsb(color)
    this.colorOffset = hsb.h + '%'
    this.canvasLeft = hsb.s + '%'
    this.canvasTop = 100 - hsb.b + '%'
    this.opacityOffset = opacity + '%'
  }

  handleChange = (state) => {
    Object.assign(this, state)

    const { canvasLeft, canvasTop, colorOffset, opacityOffset } = this
    // console.log(canvasLeft, canvasTop, colorOffset, opacityOffset)
    const opacity = parseInt(opacityOffset)
    const hex = '#' + hsbToHex({
      h: parseInt(colorOffset) * 360 / 100,
      s: parseInt(canvasLeft),
      b: 100 - parseInt(canvasTop)
    })

    this.setState(
      { color: hex, opacity },
      () => this.props.onChange(hex, opacity)
    )
  }

  handleTheme = color => (
    this.setState({ color }, () => {
      this.setPosInfo(color)
      this.props.onChange(color, 100)
    })
  )

  render () {
    const { style, themes } = this.props
    const { color, opacity } = this.state

    const { canvasLeft, canvasTop, colorOffset, opacityOffset } = this
    // console.log(canvasLeft, canvasTop, colorOffset, opacityOffset)
    const rgb = hexToRgb(color)
    const canvasColor = '#' + hsbToHex({
      h: parseInt(colorOffset) * 360 / 100,
      s: 100,
      b: 100
    })

    return (
      <div className={styles['colorpicker']} style={style}>
        <Theme themes={themes} handleTheme={this.handleTheme} />

        <Canvas
          top={canvasTop} left={canvasLeft}
          color={canvasColor} handleChange={this.handleChange}
        />
        <Bands
          color={color} colorOffset={colorOffset}
          opacityOffset={opacityOffset} handleChange={this.handleChange}
        />
        <DashBoard color={color} rgb={rgb} alpha={opacity} />
        <span className={styles['hr']} />
        <History />
      </div>
    )
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  themes: PropTypes.array,
  opacity: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.object
}
ColorPicker.defaultProps = {
  color: '#F55D54',
  opacity: 50
}
