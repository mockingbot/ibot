import React, { PureComponent, isValidElement } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'

import { trimList, getOtherProps, $, SVG } from '../util'

import { StyledToolTip, StyledToolTipSpan } from './styled'

const EVENT_NAME_LIST = [ 'hover', 'click' ]

const TIP_ROOT_ID = 'IBOT_TOOLTIP_ROOT'

const $tipRoot = (
  document.getElementById(TIP_ROOT_ID) ||
  Object.assign(document.createElement('div'), { id: TIP_ROOT_ID })
)

const $body = document.body

if (!$body.contains($tipRoot)) {
  $body.appendChild($tipRoot)
}

function parseContent (content, eventName = 'hover') {
  return (
    isString(content) || isArray(content) || isValidElement(content)
      ? content
      : EVENT_NAME_LIST.includes(eventName) && isObject(content)
        ? content[ eventName ] || content.hover
        : null
  )
}

export default class Tooltip extends PureComponent {
  state = {
    isOpen: false,
    isClicked: false,
    $text: null
  }

  static propTypes = {
    theme: PropTypes.oneOf([ 'core', 'plain' ]),
    position: PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]).isRequired,
    arrowed: PropTypes.bool,
    inflexible: PropTypes.bool,

    className: PropTypes.string,
    tipClassName: PropTypes.string,

    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape(
        EVENT_NAME_LIST.reduce(
          (res, n) => Object.assign(res, { [ n ]: PropTypes.node }),
          {}
        )
      )
    ]),

    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,

    delay: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    duration: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),

    children: PropTypes.node,
    html: PropTypes.string,

    setRef: PropTypes.func
  }

  static defaultProps = {
    theme: 'plain',
    position: 'right',
    arrowed: true,
    inflexible: false,

    delay: 200,

    className: '',
    tipClassName: '',

    setRef: () => null,
    onClick: () => null
  }

  ref = React.createRef()

  componentDidMount () {
    this.props.setRef(this.ref.current)
  }

  componentDidUpdate (_, { isOpen: wasOpen }) {
    const { duration } = this.props
    if (!duration) return null

    const { isOpen } = this.state

    if (duration > 0 && !wasOpen && isOpen) {
      this.timeout = setTimeout(() => this.setState({ isOpen: false }), duration)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
    clearTimeout(this.hoverTimeout)
  }

  onClick = e => {
    this.setState({
      isOpen: !!parseContent(this.props.content, 'click'),
      isClicked: true
    })

    e.persist()
    this.props.onClick(e)
  }

  onMouseEnter = () => Object.assign(this, {
    hoverTimeout: setTimeout(
      () => this.setState(
        { isOpen: !!parseContent(this.props.content, 'hover') },
        this.props.onMouseEnter
      ),
      this.props.delay
    )
  })

  onMouseLeave = () => {
    clearTimeout(this.hoverTimeout)

    this.setState(
      { isOpen: false, isClicked: false },
      this.props.onMouseLeave
    )
  }

  render () {
    const {
      theme,
      position, inflexible, arrowed,
      className, tipClassName,
      content,

      html,
      children
    } = this.props

    const { isOpen, isClicked } = this.state

    const klass = trimList([
      'Tooltip',
      className,
      isOpen ? 'is-open' : '',
      isClicked ? 'is-clicked' : ''
    ])

    const eventName = isClicked ? 'click' : 'hover'

    return (
      <StyledToolTipSpan
        ref={this.ref}
        className={klass}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave}
        {...getOtherProps(this.constructor, this.props)}
      >
        <>
          { html ? <span dangerouslySetInnerHTML={{ __html: html }} /> : children }

          {isOpen && <Tip
            $text={this.ref.current}
            isOpen={true}
            className={tipClassName}
            eventName={eventName}

            theme={theme}
            position={position}
            inflexible={inflexible}
            arrowed={arrowed}
          >
            {parseContent(content, eventName)}
          </Tip>
          }        </>
      </StyledToolTipSpan>
    )
  }
}

class Tip extends PureComponent {
  state = {
    prevProps: this.props,

    isOpen: this.props.isOpen,
    position: this.props.position
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    eventName: PropTypes.oneOf(EVENT_NAME_LIST),
    $text: PropTypes.instanceOf(Element),

    theme: PropTypes.oneOf([ 'plain', 'core' ]),
    position: PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]),
    inflexible: PropTypes.bool,
    arrowed: PropTypes.bool,

    children: PropTypes.node
  }

  static getDerivedStateFromProps (props, { prevProps }) {
    if (!isEqual(prevProps, props)) {
      return {
        prevProps: props,
        isOpen: props.isOpen,
        position: props.position
      }
    }
    return null
  }

  ref = React.createRef()

  componentDidUpdate ({ isOpen: wasOpen }) {
    const { isOpen } = this.props

    if (!wasOpen && isOpen) {
      this.position()
    } else if (wasOpen && !isOpen) {
      if (this.$tip) {
        this.$tip.classList.remove('is-open')
      }
    }
  }

  get $tipBase () {
    return this.ref.current
  }

  get $tip () {
    return this.$tipBase && $('.Tip', this.$tipBase)
  }

  position = () => {
    const { $text, position, inflexible } = this.props
    const { $tipBase, $tip } = this

    if (!$text || !$tipBase || !$tip) return

    const flexible = !inflexible
    const [ minX, minY ] = [ 10, 10 ]
    const [ maxX, maxY ] = [ window.innerWidth - 10, window.innerHeight - 10 ]

    const { top, right, bottom, left } = $text.getBoundingClientRect()
    const { offsetWidth: wOf$text, offsetHeight: hOf$text } = $text
    const { offsetWidth: wOf$tip, offsetHeight: hOf$tip } = $tip

    const midXOf$text = left + wOf$text / 2
    const midYOf$text = top + hOf$text / 2

    const baseStyle = {}
    const tipStyle = {}
    const setStyleForBase = src => Object.assign(baseStyle, src)
    const setStyleForTip = src => Object.assign(tipStyle, src)

    setStyleForBase({
      top: `${top}px`,
      left: `${left}px`,
      width: `${wOf$text}px`,
      height: `${hOf$text}px`
    })

    // Main-axis position adjustment:
    if (flexible) {
      if (position === 'top' && top - hOf$tip < minY) {
        this.setState({ position: 'bottom' })
      } else if (position === 'bottom' && bottom + hOf$tip > maxY) {
        this.setState({ position: 'top' })
      } else if (position === 'left' && left - wOf$tip < minX) {
        this.setState({ position: 'right' })
      } else if (position === 'right' && right + wOf$tip > maxX) {
        this.setState({ position: 'left' })
      }
    }

    // Cross-axis position adjustment:
    switch (position) {
      case 'top':
      case 'bottom': {
        const most = (wOf$tip - 18) / 2 + 6

        const adjustment = (
          // No enough space to the left:
          midXOf$text - wOf$tip / 2 < 10
            ? Math.min(wOf$tip / 2 - midXOf$text - 6, most)
          // No enough space to the right:
            : midXOf$text + wOf$tip / 2 > maxX
              ? Math.max(-(wOf$tip / 2 - (maxX + 10 - midXOf$text)) + 6, -most)
              : 0
        )

        if (adjustment !== 0) {
          setStyleForTip({ transform: `translateX(${adjustment}px)` })
        }
        break
      }

      case 'left':
      case 'right': {
        const most = (hOf$tip - 18) / 2 - 6

        const adjustment = hOf$tip > 50 && (
          // No enough space to the top:
          midYOf$text - 5 <= maxY / 2 && midYOf$text - hOf$tip / 2 < 10
            ? Math.min(hOf$tip / 2 - midYOf$text - 6, most)
          // No enough space to the bottom:
            : midYOf$text - 5 > maxY / 2 && midYOf$text + hOf$tip / 2 > maxY
              ? Math.max(-(hOf$tip / 2 - (maxY + 10 - midYOf$text)), -most)
              : 0
        )

        if (adjustment !== 0) {
          setStyleForTip({ transform: `translateY(${adjustment}px)` })
        }
        break
      }
    }

    Object.assign($tipBase.style, baseStyle)
    Object.assign($('.content', $tip).style, tipStyle)
    $tip.classList.add('is-open')
  }

  onTransitionEnd = () => {
    const { isOpen } = this.props

    if (isOpen) {
      this.$tip.classList.add('is-open')
    } else {
      this.setState({ isOpen: false })
    }
  }

  render () {
    return createPortal(this.tip, $tipRoot)
  }

  get tip () {
    const { className, theme, inflexible, arrowed, children } = this.props
    const { isOpen, position } = this.state

    const klass = trimList([
      theme === 'core' ? 'Tip CoreTip' : 'Tip',
      className,
      `on-${position}`,
      inflexible && 'inflexible',
      arrowed && 'arrowed'
    ])

    return isOpen && (
      <StyledToolTip className="TipBase" ref={this.ref}>
        <div
          className={klass}
          onTransitionEnd={this.onTransitionEnd}
        >
          { arrowed && (
            <div
              className="arrow"
              dangerouslySetInnerHTML={{ __html: SVG.DROPDOWN_ARROW }}
            />
          )}

          <div className="content">{children}</div>
        </div>
      </StyledToolTip>
      // <div className="TipBase" ref={this.ref}>
      //   <div
      //     className={klass}
      //     onTransitionEnd={this.onTransitionEnd}
      //   >
      //     { arrowed && (
      //       <div
      //         className="arrow"
      //         dangerouslySetInnerHTML={{ __html: SVG.DROPDOWN_ARROW }}
      //       />
      //     )}
      //
      //     <div className="content">{children}</div>
      //   </div>
      // </div>
    )
  }
}
