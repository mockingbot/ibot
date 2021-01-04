import React, { PureComponent, Fragment, isValidElement, cloneElement } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import EventListener, { withOptions } from 'react-event-listener'
import isEqual from 'lodash/isEqual'
import Button from '../button'
import SVG from '../svg'
import { trimList, preparePortal, SVG as UTIL_SVG } from '../util'
import { positionMenu } from '../dropdown'
import { StyledGuidBase, StyledGuid } from './styled'
import get from 'lodash/get'

const GUIDE_ROOT_ID = 'IBOT_GUIDE_GUIDE_ROOT'

export default class GuideBase extends PureComponent {
  state = {
    prevProps: this.props,

    isOpen: this.props.isOpen,
    isDownward: this.props.Y === 'bottom'
  }

  static propTypes = {
    isOpen: PropTypes.bool,

    header: PropTypes.any,

    noCloseBtn: PropTypes.bool,
    gotItBtn: PropTypes.bool,
    onClose: PropTypes.func,
    gotItText: PropTypes.any,

    className: PropTypes.string,
    children: PropTypes.node,
    guide: PropTypes.any,

    X: PropTypes.oneOf([ 'left', 'center', 'right' ]),
    Y: PropTypes.oneOf([ 'top', 'bottom' ]),

    inflexible: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,

    noCloseBtn: false,
    iKonwBtn: false,
    onClose: () => null,

    X: 'left',
    Y: 'bottom',

    inflexible: false
  }

  static getDerivedStateFromProps (props, { prevProps, isOpen }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, isOpen: props.isOpen }
    }

    return null
  }

  componentDidMount () {
    const { isOpen } = this.state
    this.init()
    if (isOpen) this.position()
  }

  init = () => {
    this.I18N = get(window, 'I18N', {})
    const $guideRoot = (
      document.getElementById(GUIDE_ROOT_ID) ||
      Object.assign(document.createElement('div'), { id: GUIDE_ROOT_ID })
    )
    const $body = document.body

    if (!$body.contains($guideRoot)) {
      $body.appendChild($guideRoot)
    }

    this.portal = preparePortal($guideRoot, 'GuidePortal')
  }

  componentDidUpdate (_, { isOpen: wasOpen }) {
    const { isOpen } = this.state

    if (!wasOpen && isOpen) {
      this.position()
    }
  }

  componentWillUnmount () {
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
      inflexible
    })

    this.setState({ isDownward })
  }

  set$base = $base => Object.assign(this, { $base })

  set$guide = $guide => Object.assign(this, { $guide })

  close = () => this.setState(
    { isOpen: false },
    this.props.onClose
  )

  render () {
    const { children = null } = this.props

    const base = (
      isValidElement(children)
        ? cloneElement(children, { ref: this.set$base })
        : <span ref={this.set$base}>{ children }</span>
    )

    const guide = this.portal && createPortal(this.renderGuide(), this.portal)

    return (
      <Fragment>
        { base }
        { guide }
      </Fragment>
    )
  }

  onScrollOutside = this.position

  renderGuide () {
    const {
      className,
      noCloseBtn,
      X,
      header,
      gotItText, gotItBtn,
      guide
    } = this.props

    const { isOpen, isDownward } = this.state

    const klass = trimList([
      'Guide',
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      `x-${X}`,
      className
    ])

    return (
      <StyledGuidBase className="GuideBase" ref={this.set$guide}>
        <StyledGuid className={klass}>
          <span className="arrow" dangerouslySetInnerHTML={{ __html: UTIL_SVG.GUIDE_ARROW }} />

          <div className="content">
            { header && <header>{ header }</header> }

            { !noCloseBtn && (
              <button
                className="close-btn"
                onClick={this.close}
              >
                <SVG name="close" />
              </button>
            )}

            { guide }

            { gotItBtn && (
              <footer>
                <Button type="text" onClick={this.close}>{ gotItText || this.I18N.iknow || 'Got it!'}</Button>
              </footer>
            )}
          </div>

          { isOpen && (
            <EventListener
              target={document}
              onScroll={withOptions(this.onScrollOutside, { capture: true })}
            />
          )}
        </StyledGuid>
      </StyledGuidBase>
    )
  }
}
