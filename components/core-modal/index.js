import React, { createRef, Fragment, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isEqual from 'lodash/isEqual'
import Button, { PrimaryCoreButton, TertiaryCoreButton } from '../button'
import SVG from '../svg'
import Switch from '../switch'
import {
  addModalToStack, deleteModalFromStack, checkNoOpenModalInStack, checkModalIndexInStack,
  toggleGlobalScroll, trimList, $, preparePortal, stopPropagation
} from '../util'
import { StyledCorePortal, StyledCoreModal, StyledCoreMask } from './styled'

const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'
const MODAL_PORTAL_CLASS = 'CoreModalPortal'

const TYPE_CLASS_MAP = {
  alert: 'AlertCoreModal',
  form: 'FormCoreModal',
  functional: 'FunctionalCoreModal',
  display: 'DisplayCoreModal'
}

export default class CoreModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.node,
    children: PropTypes.node,

    // modal: PropTypes.node,
    type: PropTypes.oneOf([ 'alert', 'form', 'functional', 'display' ]),

    opener: PropTypes.node,
    openerType: PropTypes.oneOf([ 'primary', 'regular', 'text', 'switch', 'custom', 'none' ]),

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,

    canClose: PropTypes.bool,
    canCloseOnClickMask: PropTypes.bool,
    shouldCloseOnAction: PropTypes.bool,

    canCloseOnEsc: PropTypes.bool,
    canConfirmOnEnter: PropTypes.bool,

    onConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    isConfirmDisabled: PropTypes.bool,

    onCancel: PropTypes.func,
    isCancelDisabled: PropTypes.bool,
    cancelText: PropTypes.string
  }

  static defaultProps = {
    openerType: 'none',
    type: 'functional',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,

    canClose: true,
    canCloseOnClickMask: true,
    shouldCloseOnAction: true,
    canCloseOnEsc: true,
    canConfirmOnEnter: true
  }

  state = {
    prevProps: this.props,
    isOpen: this.props.isOpen,
    isVisible: false
  }

  maskRef = createRef()

  static getDerivedStateFromProps (props, { prevProps, isOpen }) {
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

  componentDidMount () {
    const { isOpen } = this.state
    this.init()
    if (isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen
      ))
    }

    window.addEventListener('resize', this.positionY)
  }

  componentDidUpdate (_, { isOpen: wasOpen }) {
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      setTimeout(() => this.setState(
        { isVisible: true },
        this.didOpen
      ))
    } else if (wasOpen && !isOpen) {
      this.didClose()
    }
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()

    this.didClose()
    window.removeEventListener('resize', this.positionY)
  }

  init = () => {
    this.I18N = get(window, 'I18N', {})
    const $body = document.body
    const $modalRoot = (
      document.getElementById(MODAL_ROOT_ID) ||
      Object.assign(document.createElement('div'), { id: MODAL_ROOT_ID })
    )

    if (!$body.contains($modalRoot)) {
      $body.appendChild($modalRoot)
    }

    this.portal = preparePortal(
      $modalRoot,
      trimList([ MODAL_PORTAL_CLASS, this.props.portalClassName ])
    )
  }

  didOpen = () => {
    const { onOpen, onToggle } = this.props

    addModalToStack(this)

    this.positionY()

    toggleGlobalScroll(true)

    onOpen()
    onToggle(true)
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

  onTransitionEnd = ({ target }) => {
    const { isVisible } = this.state

    if (!isVisible && target.matches('.CoreModalMask')) {
      this.setState({ isOpen: false })
    }
  }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isVisible: false })

  toggle = (willBeOpen = !this.state.isOpen) => willBeOpen ? this.open() : this.close()

  positionY = () => setTimeout(() => {
    const { type } = this.props
    const $modal = $('.CoreModal', this.portal)

    if (!$modal || type === 'alert') return

    const { innerHeight: vh } = window
    const { height: h } = $modal.getBoundingClientRect()

    const action = (vh <= h || ((vh - h) / 2) < (vh * 0.15)) ? 'add' : 'remove'
    $modal.classList[ action ]('is-v-centered')
  })

  onClickMask = e => {
    stopPropagation(e)

    const { canClose, canCloseOnClickMask } = this.props
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (canClose && canCloseOnClickMask && !isSelectMenuOpen) {
      this.close()
    }
  }

  confirm = () => {
    const { onConfirm, shouldCloseOnAction } = this.props

    if (onConfirm) {
      onConfirm()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  cancel = () => {
    const { onCancel, shouldCloseOnAction } = this.props

    if (onCancel) {
      onCancel()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  onKeyDown = ({ key, target: $elmt }) => {
    const {
      canClose, canCloseOnEsc,
      canConfirmOnEnter,
      onConfirm, onCancel
    } = this.props

    const { isOpen } = this.state
    const isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open')

    if (
      key === 'Escape' &&

      // Not focus on form elements:
      !$elmt.matches('input, textarea, select') && !isSelectMenuOpen &&

      // Current modal is open and can close via esc:
      isOpen && canClose && canCloseOnEsc && !isSelectMenuOpen &&

      // Only work on the toppest modal:
      checkModalIndexInStack(this) === 0
    ) {
      if (onCancel) {
        this.cancel()
      }

      return this.close()
    }

    if (
      key === 'Enter' &&

      // Not focus on form elements:
      !$elmt.matches('textarea, button') && !isSelectMenuOpen &&

      // Current modal is open and can confirm via enter:
      isOpen && canConfirmOnEnter &&

      // Only work on the toppest modal:
      checkModalIndexInStack(this) === 0 &&

      // Only work whilst `onConfirm` callback is provided:
      !!onConfirm
    ) {
      return this.confirm()
    }
  }

  render () {
    return this.opener
  }

  get opener () {
    const { opener, openerType } = this.props
    const { isOpen } = this.state

    const { modal } = this

    return (
      openerType === 'none'
        ? modal

        : openerType === 'custom'
          ? (
            opener
              ? <span onClick={this.toggle}>
                { opener }
                { modal }
              </span>
              : modal
          )

          : openerType === 'switch'
            ? <Switch isChecked={isOpen} onChange={this.toggle}>
              { modal }
            </Switch>

            : <Button type={openerType} onClick={this.open}>
              { opener }
              { modal }
            </Button>
    )
  }

  get modal () {
    if (this.portal) {
      return createPortal(this.modalDOM, this.portal)
    }
    return null
  }

  get footer () {
    const {
      onConfirm, onCancel,
      confirmText, cancelText,
      isConfirmDisabled, isCancelDisabled
    } = this.props

    const shouldRender = onConfirm || onCancel

    return shouldRender && (
      <footer>
        { onConfirm && (
          <PrimaryCoreButton onClick={this.confirm} isDisabled={isConfirmDisabled}>
            { confirmText || this.I18N.confirm || 'Confirm'}
          </PrimaryCoreButton>
        )}

        { onCancel && (
          <TertiaryCoreButton onClick={this.cancel} isDisabled={isCancelDisabled}>
            { cancelText || this.I18N.cancel || 'Cancel'}
          </TertiaryCoreButton>
        )}
      </footer>
    )
  }

  get modalDOM () {
    const {
      type,
      maskClassName,
      className,
      title,

      children,

      canClose, canCloseOnClickMask
    } = this.props

    const { isOpen, isVisible } = this.state
    const { footer } = this

    return isOpen && (
      <Fragment>
        <StyledCorePortal/>
        <StyledCoreMask
          ref={this.maskRef}
          className={trimList([
            'CoreModalMask',
            maskClassName,
            isVisible && 'is-open',
            canClose && canCloseOnClickMask ? 'can-close' : 'cant-close'
          ])}
          onClick={this.onClickMask}
          onTransitionEnd={this.onTransitionEnd}
        />
        <StyledCoreModal
          className={trimList([ 'CoreModal', TYPE_CLASS_MAP[ type ], className ])}
          onTransitionEnd={stopPropagation}
          onClick={stopPropagation}
        >
          <header>
            { title }

            {/* Close button */}
            { canClose && (
              <Button type="text" className="close-btn" onClick={this.close}>
                <SVG name="times" label="Close the Modal" />
              </Button>
            )}
          </header>

          <div className="content">
            { children }
          </div>

          { footer }
        </StyledCoreModal>
        <EventListener target={document} onKeyDown={this.onKeyDown} />
      </Fragment>
    )
  }
}
