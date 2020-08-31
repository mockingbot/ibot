import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import { $, trimList, preparePortal } from '../util'

import { StyledMask, StyledModal, StyledPortal, StyledFooter } from './styled'
import SVG from '../svg'

const MODAL_PORTAL_CLASS = 'ModalPortal'
const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'

const $body = document.body

const $modalRoot = (
  document.getElementById(MODAL_ROOT_ID) || Object.assign(document.createElement('div'), { id: MODAL_ROOT_ID })
)

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot)
}

const stopPropagation = e => e.stopPropagation()

export default class Modal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
    timeout: PropTypes.number,
    title: PropTypes.node,

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,

    canClose: PropTypes.bool,
    canCloseOnClickMask: PropTypes.bool,
    shouldCloseOnAction: PropTypes.bool,

    canCloseOnEsc: PropTypes.bool,
    canConfirmOnEnter: PropTypes.bool,

    confirmText: PropTypes.string,
    onConfirm: PropTypes.func,
    isConfirmDisabled: PropTypes.bool,

    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    isCancelDisabled: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,
    timeout: 200,
    maskClassName: '',
    portalClassName: '',
    className: '',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,

    canClose: true,
    canCloseOnClickMask: true,
    shouldCloseOnAction: true,

    canCloseOnEsc: true,
    canConfirmOnEnter: true,

    cancelText: '取消',
    confirmText: '确认删除'
  }

  portal = preparePortal(
    $modalRoot,
    trimList([ MODAL_PORTAL_CLASS, this.props.portalClassName ])
  )

  componentDidMount () {
    const { isOpen } = this.props
    if (isOpen) this.open()

    window.addEventListener('resize', this.positionY)
  }

  componentDidUpdate ({ isOpen: wasOpen }) {
    const { isOpen } = this.props

    if (!wasOpen && isOpen) {
      this.open()
    } else if (wasOpen && !isOpen) {
      this.close()
    }
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()
    window.removeEventListener('resize', this.positionY)
  }

  close = () => {
    const { onClose, timeout } = this.props
    onClose()
    setTimeout(() => this.portal.remove(), timeout)
  }

  open = () => {
    const { isOpen, onOpen } = this.props
    if (isOpen) {
      onOpen()
      $modalRoot.appendChild(this.portal)
    }

    // // Reassign Y position of the modal:
    this.positionY()
  }

  onConfirm = () => {
    const {
      onConfirm,
      shouldCloseOnAction,
      isConfirmDisabled
    } = this.props

    if (typeof onConfirm === 'function' && !isConfirmDisabled) {
      onConfirm()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  onCancel = () => {
    const {
      onCancel,
      shouldCloseOnAction,
      isCancelDisabled
    } = this.props

    if (typeof onCancel === 'function' && !isCancelDisabled) {
      onCancel()
    }

    if (shouldCloseOnAction) {
      this.close()
    }
  }

  positionY = () => setTimeout(() => {
    const $modal = $('.TransitionModal', this.portal)
    if (!$modal) return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h) / 2) < (vh * 0.2)) ? 'add' : 'remove'
    $modal.classList[ action ]('is-v-centered')
  })

  onClickMask = (e) => {
    stopPropagation(e)
    const { onClose } = this.props

    if (onClose) {
      this.close()
    }
  }

  renderModalDOM () {
    const { children, isOpen, timeout, className, maskClassName,
      title, canClose, isCancelDisabled, cancelText, canCloseOnClickMask,
      isConfirmDisabled, confirmText } = this.props

    return (
      <>
        <StyledPortal />
        <CSSTransition
          in={isOpen}
          classNames="mask"
          timeout={timeout}
          unmountOnExit
        >
          <StyledMask
            className={trimList([ 'TransitionModalMask', maskClassName ])}
            onClick={canCloseOnClickMask ? this.onClickMask : null}
          />
        </CSSTransition>

        <CSSTransition
          in={isOpen}
          classNames="fade"
          timeout={timeout}
          unmountOnExit
        >
          <StyledModal
            className={trimList([ 'TransitionModal', className ])}
            onClick={stopPropagation}
          >
            <header className="header">
              { title }
              { canClose && (
                <button className="close-btn" onClick={this.close}>
                  <SVG name="times" label="Close the Modal" />
                </button>
              )}
            </header>

            <div className="content">
              { children }
            </div>

            <StyledFooter>
              <button
                className="cancel-btn"
                onClick={this.onCancel}
                disabled={isCancelDisabled}
              >
                {cancelText}
              </button>

              <button
                className="confirm-btn"
                onClick={this.onConfirm}
                disabled={isConfirmDisabled}
              >
                {confirmText}
              </button>
            </StyledFooter>
          </StyledModal>
        </CSSTransition>
      </>
    )
  }

  render () {
    return createPortal(this.renderModalDOM(), this.portal)
  }
}
