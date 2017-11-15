import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import { trimList } from '@mockingbot/util'

import Tooltip from './Tooltip'

import { TYPE_ELEMENT_MAP } from './constants'

export class EllipsisSpan extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { isTruncated: false }
  }

  static propTypes = {
    className: PropTypes.string,
    to: PropTypes.string,
    type: PropTypes.oneOf(['user', 'id', 'email', 'team', 'app', 'widget']),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    display: PropTypes.oneOf(['inline-block', 'block']),
    children: PropTypes.node,
    noTooltip: PropTypes.bool,
  }

  componentDidMount() {
    const { noTooltip } = this.props

    if (this.detectTruncation()) {
      this.setState({ isTruncated: true })
    }
  }

  componentDidUpdate({ children: prevChildren }) {
    const { children, noTooltip } = this.props

    if (!isEqual(prevChildren, children)) {
      this.setState({
        isTruncated: this.detectTruncation(),
      })
    }
  }

  set$ellipsis = $ellipsis => Object.assign(this, { $ellipsis })
  detectTruncation = ($e = this.$ellipsis) => $e.offsetWidth < $e.scrollWidth

  render() {
    const {
      className, to, type, max, display, noTooltip,
      children,
      ...others,
    } = this.props

    const { isTruncated } = this.state

    const elementType = !!to ? 'link' : 'inline'

    const attr = {
      ref: this.set$ellipsis,

      className: trimList([
        'EllipsisSpan',
        className,
        isTruncated && 'is-truncated',
      ]),

      href: to,
      'data-type': type,
      'data-max': max,

      style: {
        display,
        maxWidth: isFinite(max) ? `${max}em` : max,
      },

      ...others,
      children,
    }

    return (
      isTruncated && !noTooltip
      ? <Tooltip type={elementType} content={children} {...attr} />
      : React.createElement(TYPE_ELEMENT_MAP[elementType], attr)
    )
  }
}

export function User({
  name, id, email,
  ...others,
}) {
  const result = name || (id ? `@${id}` : email)
  const resultType = !!name ? 'user' : !!id ? 'id' : !!email ? 'email' : null

  return (
    <EllipsisSpan type={resultType} {...others}>
    { result }
    </EllipsisSpan>
  )
}

export function TeamName({ name, ...others }) {
  return <EllipsisSpan type="team" {...others}>{ name }</EllipsisSpan>
}

export function AppName({ name, ...others }) {
  return <EllipsisSpan type="app" {...others}>{ name }</EllipsisSpan>
}

export function WidgetName({ name, ...others }) {
  return <EllipsisSpan type="widget" {...others}>{ name }</EllipsisSpan>
}
