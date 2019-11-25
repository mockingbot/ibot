import React, { Fragment, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { isBoolean, isEqual } from 'lodash'
import Button, { PrimaryCoreButton, TertiaryCoreButton } from '../button'
import Switch from '../switch'
import SVG from '../svg'
import {
  addModalToStack, deleteModalFromStack, checkNoOpenModalInStack,
  toggleGlobalScroll, trimList, $, preparePortal,
} from '../util'

import './index.styl'

const OVERLAY_ROOT_ID = 'IBOT_OVERLAY_ROOT'
const OVERLAY_PORTAL_CLASS = 'OverlayPortal'

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
    prevProps: this.props,
    isOpen: this.props.isOpen,
    isVisible: false,
  }

  portal = preparePortal(
    $overlayRoot,
    trimList([OVERLAY_PORTAL_CLASS, this.props.portalClassName]),
  )

  static propTypes = {
    isOpen: PropTypes.bool,
    openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),

    portalClassName: PropTypes.string,
    maskClassName: PropTypes.string,
    className: PropTypes.string,

    canClose: PropTypes.bool,
    canConfirm: PropTypes.bool,
    canCancel: PropTypes.bool,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,

    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,

    confirmText: PropTypes.string,
    cancelText: PropTypes.string,

    title: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    openerType: 'none',
    canClose: true,

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,

    confirmText: 'Confirm',
    cancelText: 'Cancel',
  }

  static getDerivedStateFromProps(props, { prevProps, isOpen }) {
    if (!isEqual(prevProps, props)) {
      const { isOpen: willBeOpen } = props

      if (isBoolean(willBeOpen)) {
        if (!isOpen && willBeOpen) {
          return { isOpen: true, prevProps: props }
        } else if (isOpen && !willBeOpen) {
          return { isVisible: false, prevProps: props }
        }
      }
      return { prevProps: props }
    }

    return null
  }

  componentDidMount() {
    const { onOpen, onToggle } = this.props
    const { isOpen } = this.state

    if (isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen,
      ))
    }
  }

  componentDidUpdate(_, { isOpen: wasOpen }) {
    const { onOpen, onClose, onToggle } = this.props
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen,
      ))
    } else if (wasOpen && !isOpen) {
      this.didClose()
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()

    this.didClose()
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isVisible: false })

  didOpen = () => {
    const { onOpen, onToggle } = this.props
    const { portal } = this

    // Store in the modal stack to monitor:
    addModalToStack(this)

    onOpen()
    onToggle(true)

    toggleGlobalScroll(true)
  }

  didClose = () => {
    const { onClose, onToggle } = this.props

    onClose()
    onToggle(false)

   setTimeout(() => {
      // Remove from the stack in the next round:
      deleteModalFromStack(this)

      if (checkNoOpenModalInStack()) {
        toggleGlobalScroll(false)
      }
    })
  }

  toggle = (willBeOpen = !this.state.isOpen) => (
    willBeOpen ? this.open() : this.close()
  )

  confirm = () => {
    const { onConfirm } = this.props
    onConfirm()
    this.close()
  }

  cancel = () => {
    const { onCancel } = this.props
    onCancel()
    this.close()
  }

  onTransitionEnd = ({ target }) => {
    const { isVisible } = this.state

    if (!isVisible && target.matches('.OverlayMask')) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return this.opener
  }

  get opener() {
    const { opener, openerType } = this.props
    const { isOpen } = this.state
    const overlay = createPortal(this.overlay, this.portal)

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

  get overlay() {
    const {
      maskClassName,
      className,

      title, children,

      canClose, canConfirm, canCancel,
      onConfirm, onCancel,
      confirmText, cancelText,
    } = this.props

    const { isVisible, isOpen } = this.state

    const shouldShowFooter = onConfirm || onCancel

    return isOpen && (
      <Fragment>
        <div
          className={trimList(['OverlayMask', isVisible && 'is-open', maskClassName])}
          onTransitionEnd={this.onTransitionEnd}
          onClick={stopPropagation}
        />

        {/* Close button */}
        { canClose && (
          <Button type="text" className="OverlayCloseButton" onClick={this.close}>
            <SVG name="close" label="Close the Overlay" />
          </Button>
        )}

        <div className={trimList(['Overlay', className])}>
          { title && <h1>{ title }</h1> }
          { children }

          { shouldShowFooter && (
            <footer>
              { onConfirm && <PrimaryCoreButton onClick={this.confirm} isDisabled={!canConfirm}>{ confirmText }</PrimaryCoreButton> }
              { onCancel && <TertiaryCoreButton onClick={this.cancel} isDisabled={!canCancel}>{ cancelText }</TertiaryCoreButton> }
            </footer>
          )}
        </div>
      </Fragment>
    )
  }
}
