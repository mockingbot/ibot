import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import { $, trimList, preparePortal } from '../util'

import { StyledMask, StyledModal, StyledPortal } from './styled'

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

    className: PropTypes.string,
    maskClassName: PropTypes.string,
    portalClassName: PropTypes.string,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    timeout: 200,
    maskClassName: '',
    portalClassName: '',
    className: '',

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null
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

    // Reassign Y position of the modal:
    this.positionY()
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
    const { children, isOpen, timeout, className, maskClassName } = this.props
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
            onClick={this.onClickMask}
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
            { children }
          </StyledModal>
        </CSSTransition>
      </>
    )
  }

  render () {
    return createPortal(this.renderModalDOM(), this.portal)
  }
}
