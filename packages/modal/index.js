import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import Icon from '../icon/index'

import './index.styl'

const OPEN_MODAL_STACK = []
const { I18N = {} } = window
const MODAL_ROOT_ID = 'MB_MODAL_ROOT'
const MODAL_PORTAL_CLASS = 'mb-modal-portal'
const stopPropagation = e => e.stopPropagation()

const $body = document.body

const $modalRoot = (
  document.getElementById(MODAL_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: MODAL_ROOT_ID })
)

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot)
}

export default class Modal extends PureComponent {
  constructor(props) {
    super(props)

    const { isOpen, portalClassName } = props

    Object.assign(this, {
      state: { isOpen },

      portal: Object.assign(
        document.createElement('div'),
        { className: `${MODAL_PORTAL_CLASS} ${portalClassName}` },
      ),
    })
  }

  static propTypes = {
    isOpen: PropTypes.bool,
    type: PropTypes.oneOf(['alert', 'form', 'functional', 'display']),
    title: PropTypes.any,
    children: PropTypes.any,

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onClose: PropTypes.func,
    canClose: PropTypes.bool,
    canCloseOnClickMask: PropTypes.bool,

    canCloseOnEsc: PropTypes.bool,
    canConfirmOnEnter: PropTypes.bool,

    onConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    isOnConfirmDisabled: PropTypes.bool,

    onCancel: PropTypes.func,
    isOnCancelDisabled: PropTypes.bool,
    cancelText: PropTypes.string,
  }

  static defaultProps = {
    type: 'functional',
    title: '',

    portalClassName: '',
    maskClassName: '',
    className: '',

    onClose: () => null,

    canClose: true,
    canCloseOnClickMask: true,
    canCloseOnEsc: true,
    canConfirmOnEnter: true,

    cancelText: I18N.cancel || 'Cancel',
    confirmText: I18N.confirm || 'Confirm',
  }

  componentWillMount() {
    $modalRoot.appendChild(this.portal)
  }

  componentDidMount() {
    const { isOpen } = this.props
    if (isOpen) this.onOpen()

    window.addEventListener('resize', this.positionY)
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillReceiveProps({ isOpen: willBeOpen }) {
    const { isOpen } = this.props

    if (!isOpen && willBeOpen) {
      this.onOpen()
    } else if (isOpen && !willBeOpen) {
      this.onClose({ delay: 100 })
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()

    window.removeEventListener('resize', this.positionY)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onOpen = () => {
    // Store in the modal stack to monitor:
    OPEN_MODAL_STACK.unshift(this)

    // Transition:
    this.setState({ isOpen: true })
    setTimeout(() => this.portal.classList.add('is-open'))

    // Reassign Y position of the modal:
    this.positionY()

    // Focus on confirm button:
    this.focusOnConfirmBtn()
  }

  onClose = ({ delay = null } = {}) => {
    // Remove from the stack in the next round:
    const idx = OPEN_MODAL_STACK.indexOf(this)
    setTimeout(() => OPEN_MODAL_STACK.splice(idx, 1))

    // Transition:
    this.portal.classList.remove('is-open')
    setTimeout(() => this.setState({ isOpen: false }), delay)
  }

  onTransitionEnd = () => {
    const { isOpen: props_isOpen } = this.props
    const { isOpen: state_isOpen } = this.state

    if (props_isOpen && !state_isOpen) {
      this.props.onClose()
    }
  }

  positionY = () => setTimeout(() => {
    const { type } = this.props
    const $modal = this.portal.querySelector('.modal-mask > div')

    if (!$modal || type === 'alert') return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h)/2) < (vh * .2)) ? 'add' : 'remove'
    $modal.classList[action]('is-v-centered')
  })

  onKeyDown = ({ key, target: $elmt }) => {
    const {
      isOpen,
      canCloseOnEsc,
      canConfirmOnEnter, onConfirm,
      isOnConfirmDisabled,
    } = this.props

    if (
      key === 'Escape'

      // Not focus on form elements:
      && !$elmt.matches('input, textarea, [type=select]')

      // Current modal is open and can close via esc:
      && isOpen && canCloseOnEsc

      // Only work on the toppest modal:
      && this === OPEN_MODAL_STACK[0]
    ) {
      this.onClose()
    }

    if (
      key === 'Enter'

      // Not focus on form elements:
      && !$elmt.matches('textarea')

      // Current modal is open and can confirm via enter:
      && isOpen && canConfirmOnEnter
      && onConfirm && !isOnConfirmDisabled

      // Only work on the toppest modal:
      && this === OPEN_MODAL_STACK[0]
    ) {
      onConfirm()
    }
  }

  focusOnConfirmBtn = () => setTimeout(() => {
    const $confirm = this.portal.querySelector('footer .confirm-btn')
    if ($confirm) $confirm.focus()
  })

  render() {
    return createPortal(this.renderModal(), this.portal)
  }

  renderModal() {
    const {
      isOpen: props_isOpen,

      type,
      title,
      children,

      maskClassName,
      className,

      canClose,
      canCloseOnClickMask,

      onCancel,
      cancelText,
      isOnCancelDisabled,

      onConfirm,
      confirmText,
      isOnConfirmDisabled,
    } = this.props

    const { isOpen: state_isOpen } = this.state

    const shouldRenderAtAll = props_isOpen || state_isOpen
    const shouldRenderFooter = type === 'alert' || onCancel || onConfirm

    return shouldRenderAtAll && (
      <div
        className={`modal-mask ${maskClassName} ${canCloseOnClickMask ? 'can-close' : 'cant-close'}`}
        onClick={canCloseOnClickMask && this.onClose}
        onTransitionEnd={this.onTransitionEnd}
      >
        <div
          className={`${type}-modal ${className}`}
          onClick={stopPropagation}
        >
          {/* Header */}
          <header>
            { title }

            {/* Close button */}
            { canClose && (
              <button className="close-btn" onClick={this.onClose}>
                <Icon name="times" />
              </button>
            )}
          </header>

          {/* Main content */}
          <div className="content">
            { children }
          </div>

          {/* Footer */}
          { shouldRenderFooter && (
            <footer>
              { onCancel && <button className="cancel-btn" onClick={onCancel} disabled={isOnCancelDisabled}>{cancelText}</button> }
              { onConfirm && <button className="confirm-btn" onClick={onConfirm} disabled={isOnConfirmDisabled}>{confirmText}</button> }
            </footer>
          )}
        </div>
      </div>
    )
  }
}
