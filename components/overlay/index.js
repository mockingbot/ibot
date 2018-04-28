import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import { Button } from '../button'
import Switch from '../switch'
import SVG from '../svg'
import { trimList, $, preparePortal } from '../util'

import './index.styl'

const OVERLAY_ROOT_ID = 'MB_OVERLAY_ROOT'
const OVERLAY_PORTAL_CLASS = 'OverlayPortal'
const CANT_SCROLL_CLASS = 'mb-cant-scroll'

const stopPropagation = e => e.stopPropagation()

const $body = document.body

const $overlayRoot = (
  document.getElementById(OVERLAY_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: OVERLAY_ROOT_ID })
)

if (!$body.contains($overlayRoot)) {
  $body.appendChild($overlayRoot)
}

export default class Overlay extends PureComponent {
  state = {
    isOpen: this.props.isOpen,
    isVisible: this.props.isOpen,
  }

  portal = preparePortal(
    $overlayRoot,
    trimList([OVERLAY_PORTAL_CLASS, this.props.portalClassName]),
  )

  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
    openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),

    portalClassName: PropTypes.string,
    className: PropTypes.string,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    openerType: 'none',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
  }

  static getDerivedStateFromProps({ isOpen: willBeOpen }, { isVisible }) {
    if (!isVisible && willBeOpen) {
      return { isOpen: true }
    } else if (isVisible && !willBeOpen) {
      return { isVisible: false }
    }
    return null
  }

  componentDidMount() {
    const { isOpen } = this.state

    if (isOpen) {
      $body.classList.add(CANT_SCROLL_CLASS)
    }
  }

  componentDidUpdate(_, { isOpen: wasOpen }) {
    const { onOpen, onClose, onToggle } = this.props
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        () => {
          onOpen()
          onToggle(true)
        },
      ))
    } else if (wasOpen && !isOpen) {
      onClose()
      onToggle(false)
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
    $body.classList.remove(CANT_SCROLL_CLASS)
  }

  open = () => this.setState(
    { isOpen: true },
    () => $body.classList.add(CANT_SCROLL_CLASS),
  )

  close = () => this.setState(
    { isVisible: false },
    () => $body.classList.remove(CANT_SCROLL_CLASS),
  )

  toggle = (willBeOpen = !this.state.isOpen) => (
    willBeOpen ? this.open() : this.close()
  )

  onTransitionEnd = ({ target }) => {
    const { isVisible } = this.state

    if (!isVisible && target.matches('.Overlay')) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return this.renderOpener()
  }

  renderOpener() {
    const { opener, openerType } = this.props
    const { isOpen } = this.state
    const overlay = this.renderOverlay()

    return (
      openerType === 'none'
      ? overlay

      : openerType === 'custom'
      ? (
        opener
        ? <span onClick={this.open}>
            { opener }
            { overlay }
          </span>
        : overlay
      )

      : openerType === 'switch'
      ? <Switch isChecked={isOpen} onChange={this.toggle}>
          { overlay }
        </Switch>

      : <Button type={openerType} onClick={this.open}>
          { opener }
          { overlay }
        </Button>
    )
  }

  renderOverlay() {
    return createPortal(this.renderOverlayDOM(), this.portal)
  }

  renderOverlayDOM() {
    const { children, className } = this.props
    const { isVisible, isOpen } = this.state

    const klass = trimList([
      'Overlay',
      isVisible && 'is-open',
      className,
    ])

    return isOpen && (
      <div
        className={klass}
        onTransitionEnd={this.onTransitionEnd}
        onClick={stopPropagation}
      >
        {/* Close button */}
        <Button type="text" className="close-btn" onClick={this.close}>
          <SVG name="close" label="Close the Overlay" />
        </Button>

        <div className="content">
          { children }
        </div>
      </div>
    )
  }
}
