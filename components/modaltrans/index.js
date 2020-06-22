import React, { Fragment, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { $, preparePortal } from '../util'

// import './index.styl'
import {StyledMask, StyledModal, StyledPortal} from "./styled";
import {Transition} from "react-transition-group"

const MODAL_ROOT_ID = 'IBOT_MODAL_ROOT'
const $Root = (document.getElementById(MODAL_ROOT_ID) || document.body)

// 从组件，滑出动画无效，reactTransitionGroup用的Transition组件
export default class Modal extends PureComponent {
  portal = preparePortal($Root, 'ModalTest')

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
    const { isOpen } = this.props

    if (!wasOpen && isOpen) {
      this.didOpen()
    } else if (wasOpen && !isOpen) {
      console.log('didclose in componentDidUpdate')
      this.didClose()
    }
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()
    window.removeEventListener('resize', this.positionY)
  }

  didClose = () => {
    this.props.onClose()
    if (this.portal) {
      this.portal.remove()
    }
  }

  didOpen = () => {
    this.props.onOpen()
    $Root.appendChild(this.portal)

    // Reassign Y position of the modal:
    this.positionY()
  }

  positionY = () => setTimeout(() => {
    const $modal = $('.ModalTest', this.portal)
    if (!$modal) return

    const { innerHeight: vh } = window
    const { offsetHeight: h } = $modal

    const action = (vh <= h || ((vh - h) / 2) < (vh * 0.2)) ? 'add' : 'remove'
    $modal.classList[action]('is-v-centered')
  })

  render () {
    const { isOpen } = this.props

    return isOpen && createPortal(this.renderModalDOM(), this.portal)
  }

  renderModalDOM () {
    const { children } = this.props

    return (
      <Transition
        in={this.props.isOpen}
        timeout={0}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
        exit={true}
      >
        {state => (
          <Fragment>
            <StyledPortal />
            <StyledMask state={state}/>
            <span>{state}</span>
            <StyledModal state={state}>
              { children }
            </StyledModal>
          </Fragment>
        )}
      </Transition>
    )
  }
}
