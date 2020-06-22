import React, { Fragment, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

// import './index.styl'
import { StyledMask, StyledModal, StyledPortal } from './mysc'
import { CSSTransition} from 'react-transition-group'

const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'
const $Root = (document.getElementById(MODAL_ROOT_ID) || document.body)

// 从组件，没用用到react.Portal，动画效果正常
export default class Modal extends PureComponent {
  portal = document.createElement('div')

  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,

    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,

    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
  }

  componentDidMount () {
    const { isOpen } = this.props
    if (isOpen) this.didOpen()

    window.addEventListener('resize', this.positionY)
  }

  componentDidUpdate ({ isOpen: wasOpen }) {
    console.log('componentDidUpdate')
    const { isOpen } = this.props

    if (!wasOpen && isOpen) {
      this.didOpen()
    } else if (wasOpen && !isOpen) {
      console.log('didclose in componentDidUpdate')
      this.didClose()
    }
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    if (this.portal) this.portal.remove()
    window.removeEventListener('resize', this.positionY)
  }

  didClose = () => {
    this.props.onClose()
    // if (this.portal) {
    //   setTimeout(() => this.portal.remove(), 200)
    // }
  }

  didOpen = () => {
    this.props.onOpen()
    // $Root.appendChild(this.portal)

    // Reassign Y position of the modal:
    this.positionY()
  }

  positionY = () => setTimeout(() => {
    const $modal = document.querySelector('.fade-enter-done')
    if (!$modal) return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h) / 2) < (vh * 0.2)) ? 'add' : 'remove'
    console.log('positionY has called action=', action)
    $modal.classList[action]('is-v-centered')
  })

  render () {
    const { isOpen } = this.props

    const { children } = this.props
    console.log('renderModal')
    return (
      <>
        <StyledPortal/>
        <CSSTransition
          in={isOpen}
          classNames="mask"
          timeout={{
            appear: 0,
            enter: 0,
            exit: 0,
          }}
          unmountOnExit
        >
          <StyledMask />
        </CSSTransition>

        <CSSTransition
          in={this.props.isOpen}
          classNames='fade'
          timeout={{
            appear: 300,
            enter: 0,
            exit: 200,
          }}
          unmountOnExit
        >
          <StyledModal>
            { children }
          </StyledModal>
        </CSSTransition>
      </>
    )

    // return isOpen && createPortal(this.renderModalDOM(), this.portal)
  }

  // renderModalDOM () {
  //   const { children } = this.props
  //   console.log('renderModal inner')
  //   return (
  //     <>
  //       <StyledPortal />
  //       <CSSTransition
  //         in={this.props.isOpen}
  //         classNames="mask"
  //         timeout={{
  //           appear: 0,
  //           enter: 0,
  //           exit: 0,
  //         }}
  //         unmountOnExit
  //       >
  //         <StyledMask />
  //       </CSSTransition>
  //
  //       <CSSTransition
  //         in={this.props.isOpen}
  //         classNames='fade'
  //         timeout={{
  //           appear: 300,
  //           enter: 0,
  //           exit: 200,
  //         }}
  //         unmountOnExit
  //       >
  //         <StyledModal>
  //           { children }
  //         </StyledModal>
  //       </CSSTransition>
  //     </>
  //   )
  // }
}
