import React, { PureComponent, isValidElement } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { trimList, getOtherProps, SVG } from '@ibot/util'

import { TYPE_ELEMENT_MAP } from './constants'

const EVENT_NAME_LIST = ['hover', 'click']

const TIP_ROOT_ID = 'MB_TOOLTIP_ROOT'

const $tipRoot = (
  document.getElementById(TIP_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: TIP_ROOT_ID })
)

const $body = document.body

if (!$body.contains($tipRoot)) {
  $body.appendChild($tipRoot)
}

function parseContent(content, eventName = 'hover') {
  return (
    typeof content === 'string' || Array.isArray(content) || isValidElement(content)
    ? content
    : EVENT_NAME_LIST.includes(eventName)
    ? content[eventName] || content.hover
    : null
  )
}

export default class Tooltip extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isClicked: false,
      $text: null,
    }
  }

  static propTypes = {
    type: PropTypes.oneOf(Object.keys(TYPE_ELEMENT_MAP)).isRequired,

    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    arrowed: PropTypes.bool,
    inflexible: PropTypes.bool,

    className: PropTypes.string,
    tipClassName: PropTypes.string,

    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape(
        EVENT_NAME_LIST.reduce(
          (res, n) => Object.assign(res, { [n]: PropTypes.node }),
          {},
        )
      ),
    ]),

    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,

    children: PropTypes.node,
  }

  static defaultProps = {
    type: 'inline',

    position: 'right',
    arrowed: true,
    inflexible: false,

    className: '',
    tipClassName: '',
  }

  set$text = $text => this.setState({ $text })

  onClick = () => this.setState(
    { isClicked: true },
    this.props.onClick,
  )

  onMouseEnter = () => this.setState(
    { isOpen: true },
    this.props.onMouseEnter,
  )

  onMouseLeave = () => this.setState(
    { isOpen: false, isClicked: false },
    this.props.onMouseLeave,
  )

  render() {
    const {
      type,
      position, inflexible, arrowed,
      className, tipClassName,
      content,
      children,
    } = this.props

    const { isOpen, isClicked, $text } = this.state

    const klass = trimList([
      'Tooltip',
      className,
      isOpen ? 'is-open' : '',
      isClicked ? 'is-clicked' : '',
    ])

    const eventName = isClicked ? 'click' : 'hover'

    return React.createElement(
      TYPE_ELEMENT_MAP[type],
      {
        ref: this.set$text,
        className: klass,
        onMouseEnter: this.onMouseEnter,
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        ...getOtherProps(this.constructor, this.props),
      },
      [
        children,
        <Tip
          key="tip"
          $text={$text}
          isOpen={isOpen}
          className={tipClassName}
          eventName={eventName}

          position={position}
          inflexible={inflexible}
          arrowed={arrowed}

          children={parseContent(content, eventName)}
        />,
      ],
    )
  }
}

class Tip extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen, position: props.position }
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    eventName: PropTypes.oneOf(EVENT_NAME_LIST),
    $text: PropTypes.instanceOf(Element),

    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    inflexible: PropTypes.bool,
    arrowed: PropTypes.bool,

    children: PropTypes.node,
  }

  componentWillReceiveProps({ isOpen: willBeOpen, position: newPosition }) {
    const { isOpen, position } = this.state

    if (!isOpen && willBeOpen) {
      this.setState({ isOpen: willBeOpen })
    } else if (isOpen && !willBeOpen) {
      this.$tip.classList.remove('is-open')
    }

    if (!isOpen && willBeOpen && position !== newPosition) {
      this.setState({ position: newPosition })
    }
  }

  componentDidUpdate({ isOpen: wasOpen }) {
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      this.position()
    }
  }

  set$tip = $tip => Object.assign(this, { $tip })
  set$tipStyle = style => Object.assign(this.$tip.style, style)

  position = () => {
    const { $tip } = this
    const { $text, position, inflexible } = this.props

    const flexible = !inflexible

    if (!$text || !$tip) return

    const { offsetWidth: w_$tip, offsetHeight: h_$tip } = $tip
    const { offsetWidth: w_$text, offsetHeight: h_$text } = $text
    const { top, right, bottom, left } = $text.getBoundingClientRect()

    const midX_$text = left + w_$text/2
    const midY_$text = top + h_$text/2
    const maxX = window.innerWidth - 10
    const maxY = window.innerHeight - 10

    const main = {}
    const cross = {}
    const setMain = src => Object.assign(main, src)
    const setCross = src => Object.assign(cross, src)

    // Top:
    if (position === 'top') {
      if (flexible && top - h_$tip < 10) {
        setMain({ top: `${bottom}px` })
        this.setState({ position: 'bottom' })
      } else {
        setMain({ top: `${top}px` })
      }

    // Bottom:
    } else if (position === 'bottom') {
      if (flexible && bottom + h_$tip > maxY) {
        setMain({ top: `${top}px` })
        this.setState({ position: 'top' })
      } else {
        setMain({ top: `${bottom}px` })
      }
    }

    if (['top', 'bottom'].includes(position)) {
      setMain({ left: `${midX_$text}px` })

      const most = (w_$tip-18)/2 + 6

      const adjustment = (
        // No enough space to the left:
        midX_$text - w_$tip/2 < 10
        ? Math.min(w_$tip/2 - midX_$text - 6, most)
        // No enough space to the right:
        : midX_$text + w_$tip/2 > maxX
        ? Math.max(-(w_$tip/2 - (maxX + 10 - midX_$text)) + 6, -most)
        : 0
      )

      if (adjustment !== 0) {
        setCross({ transform: `translateX(${adjustment}px)` })
      }
    }

    // Left:
    if (position === 'left') {
      if (flexible && left - w_$tip < 10) {
        setMain({ left: `${right}px` })
        this.setState({ position: 'right' })
      } else {
        setMain({ left: `${left}px` })
      }

    // Right:
    } else if (position === 'right') {
      if (flexible && right + w_$tip > maxX) {
        setMain({ left: `${left}px` })
        this.setState({ position: 'left' })
      } else {
        setMain({ left: `${right}px` })
      }
    }

    if (['left', 'right'].includes(position)) {
      setMain({ top: `${midY_$text}px` })

      const most = (h_$tip - 18)/2 - 6

      const adjustment = h_$tip > 50 && (
        // No enough space to the top:
        midY_$text - 5 <= maxY/2 && midY_$text - h_$tip/2 < 10
        ? Math.min(h_$tip/2 - midY_$text - 6, most)
        // No enough space to the bottom:
        : midY_$text - 5 > maxY/2 && midY_$text + h_$tip/2 > maxY
        ? Math.max(-(h_$tip/2 - (maxY + 10 - midY_$text)), -most)
        : 0
      )

      if (adjustment !== 0) {
        setCross({ transform: `translateY(${adjustment}px)` })
      }
    }

    Object.assign($tip.style, main)
    Object.assign($tip.querySelector('.content').style, cross)
    this.$tip.classList.add('is-open')
  }

  onTransitionEnd = () => {
    const { isOpen } = this.props

    if (isOpen) {
      this.$tip.classList.add('is-open')
    } else {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return createPortal(this.renderTip(), $tipRoot)
  }

  renderTip() {
    const { className, inflexible, arrowed, children } = this.props
    const { isOpen, position } = this.state

    const klass = trimList([
      'Tip',
      className,
      `on-${position}`,
      inflexible && 'inflexible',
      arrowed && 'arrowed',
    ])

    return isOpen && (
      <div
        ref={this.set$tip}
        className={klass}
        onTransitionEnd={this.onTransitionEnd}
      >
        { arrowed && (
          <div
            className="arrow"
            dangerouslySetInnerHTML={{ __html: SVG.DROPDOWN_ARROW }}
          />
        )}

        <div className="content" children={children} />
      </div>
    )
  }
}
