import React, { PureComponent, isValidElement, cloneElement } from 'react'
import { createPortal } from 'react-dom'

import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import Button from '../button'
import Icon from '../icon'

import { trimList, SVG } from '../util'

import './index.styl'
import { positionMenu } from '../dropdown/util'

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
    isDownward: this.props.Y === 'bottom',
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

    X: PropTypes.oneOf(['left', 'center', 'right']),
    Y: PropTypes.oneOf(['top', 'bottom']),

    inflexible: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,

    noCloseBtn: false,
    iKonwBtn: false,
    onClose: () => null,
    gotItText: I18N.iknow || 'Got it!',

    X: 'left',
    Y: 'bottom',

    inflexible: false,
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

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
  }

  position = () => {
    const { $base, $guide } = this
    const { X, Y, inflexible } = this.props

    const { isDownward } = positionMenu({
      $menuBase: $guide,
      $opener: $base,

      menuX: X,
      menuY: Y,
      inflexible,
    })

    this.setState({ isDownward })
  }

  set$base = $base => Object.assign(this, { $base })
  set$guide = $guide => Object.assign(this, { $guide })

  close = () => this.setState(
    { isOpen: false },
    this.props.onClose,
  )

  render() {
    const { children = null } = this.props

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
      X,
      header,
      gotItText, gotItBtn,
      guide,
    } = this.props

    const { isOpen, isDownward } = this.state

    const klass = trimList([
      'Guide',
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      `x-${X}`,
      className,
    ])

    return (
      <div className="GuideBase" ref={this.set$guide}>
        <div className={klass}>
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
      </div>
    )
  }
}
