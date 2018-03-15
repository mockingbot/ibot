import React, { PureComponent, isValidElement, cloneElement } from 'react'
import { createPortal } from 'react-dom'

import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import Button from '@ibot/button'
import Icon from '@ibot/icon'
import { trimList, $, SVG } from '@ibot/util'
import { positionDropdown } from '@ibot/dropdown'

import './index.styl'

const { I18N = {} } = window
const GUIDE_ROOT_ID = 'MB_GUIDE_GUIDE_ROOT'

const $guideRoot = (
  document.getElementById(GUIDE_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: GUIDE_ROOT_ID })
)

const $body = document.body

if (!$body.contains($guideRoot)) {
  $body.appendChild($guideRoot)
}

export default class GuideBase extends PureComponent {
  state = {
    isOpen: this.props.isOpen,
    isDownward: this.props.position === 'bottom',
  }

  portal = Object.assign(
    document.createElement('div'),
    { className: 'GuidePortal' },
  )

  static propTypes = {
    isOpen: PropTypes.bool,

    header: PropTypes.any,

    noCloseBtn: PropTypes.bool,
    gotItBtn: PropTypes.bool,
    onClose: PropTypes.func,
    gotItText: PropTypes.any,

    className: PropTypes.string,
    children: PropTypes.any,
    guide: PropTypes.any,

    position: PropTypes.oneOf(['top', 'bottom']),
    unfold: PropTypes.oneOf(['left', 'center', 'right']),
    inflexible: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,

    noCloseBtn: false,
    iKonwBtn: false,
    onClose: () => null,
    gotItText: I18N.iknow || 'Got it!',

    position: 'bottom',
    unfold: 'right',
    inflexible: true,
  }

  componentWillMount() {
    $guideRoot.appendChild(this.portal)
  }

  componentDidMount() {
    const { isOpen } = this.state

    if (isOpen) this.position()
  }

  componentWillReceiveProps({ isOpen: willBeOpen }) {
    const { isOpen } = this.state

    if (isOpen !== willBeOpen) {
      this.setState({ isOpen: willBeOpen })
    }
  }

  componentWillUpdate(_, { isOpen: willBeOpen }) {
    const { isOpen } = this.state

    if (!isOpen && willBeOpen) {
      this.position()
    }
  }

  position = () => {
    const { $base, $guide } = this
    const { position, inflexible } = this.props

    const { finalPosition } = positionDropdown({
      $menu: $guide,
      $opener: $base,
      position,
      inflexible,
    })

    this.setState({ isDownward: finalPosition === 'bottom' })
  }

  set$base = $base => Object.assign(this, { $base })
  set$guide = $guide => Object.assign(this, { $guide })

  close = () => this.setState(
    { isOpen: false },
    this.props.onClose,
  )

  render() {
    const { className, children = null } = this.props
    const { isOpen } = this.state

    const base = (
      isValidElement(children)
      ? cloneElement(children, { key: 'base', ref: this.set$base })
      : <span key="base" ref={this.set$base}>{ children }</span>
    )

    const guide = createPortal(this.renderGuide(), this.portal)

    return [base, guide]
  }

  onScrollOutside = this.position

  renderGuide() {
    const {
      className,
      noCloseBtn,
      unfold,
      header,
      gotItText, gotItBtn,
      guide,
    } = this.props

    const { isOpen, isDownward } = this.state

    const klass = trimList([
      'Guide',
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      `unfold-${unfold}`,
      className,
    ])

    return (
      <div className={klass} ref={this.set$guide}>
        <span className="arrow" dangerouslySetInnerHTML={{ __html: SVG.GUIDE_ARROW }} />

        <div className="content">
          { header && <header>{ header }</header> }

          { !noCloseBtn && (
            <button
              className="close-btn"
              onClick={this.close}
            >
              <Icon name="times_fc" type="dora" />
            </button>
          )}

          { guide }

          { gotItBtn && (
            <footer>
              <Button type="text" onClick={this.close}>{ gotItText }</Button>
            </footer>
          )}
        </div>

        <DocumentEvents
          enabled={isOpen}
          capture={true}
          onScroll={this.onScrollOutside}
        />
      </div>
    )
  }
}
