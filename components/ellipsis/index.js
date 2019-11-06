import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../tooltip'
import { trimList } from '../util'

import './index.styl'
export default class Ellipsis extends PureComponent {
  state = { isTruncated: false, isDetected: false }

  static propTypes = {
    className: PropTypes.string,

    theme: PropTypes.oneOf(['core', 'plain']),
    type: PropTypes.oneOf(['user', 'id', 'email', 'org', 'team', 'app', 'widget']),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    display: PropTypes.oneOf(['inline-block', 'block']),

    lang: PropTypes.string,

    to: PropTypes.string,
    children: PropTypes.node,
    html: PropTypes.string,

    noTooltip: PropTypes.bool,
    withTooltip: PropTypes.bool,

    withQuote: PropTypes.bool,
    withComma: PropTypes.bool,
    withPeriod: PropTypes.bool,
    withQuestionMark: PropTypes.bool,
  }

  static defaultProps = {
    lang: 'en',
    theme: 'core',
  }

  componentDidMount() {
    return this.setState({ isDetected: true, isTruncated: this.detectTruncation() })
  }

  componentDidUpdate({ children: prevChildren, html: prevHTML }) {
    const { children, html } = this.props

    const { isDetected } = this.state

    if (prevChildren !== children || prevHTML !== html) {
      return this.setState({ isDetected: false })
    }

    if (!isDetected) {
      return this.setState({ isDetected: true, isTruncated: this.detectTruncation() })
    }
  }

  set$ellipsis = $ellipsis => Object.assign(this, { $ellipsis })
  detectTruncation = ($e = this.$ellipsis) => $e.offsetWidth < $e.scrollWidth

  render() {
    const {
      className, to, type, max, display, lang, theme,
      noTooltip, withTooltip,

      withQuote,
      withPeriod, withComma, withQuestionMark,

      children,
      html,
      ...others
    } = this.props

    const { isTruncated, isDetected } = this.state

    const contentProp = (
      html
      ? { dangerouslySetInnerHTML: { __html: html } }
      : { children }
    )

    const truncationClassName = isDetected && (isTruncated ? 'is-truncated' : 'isnt-truncated')

    const tooltipProps = {
      type: to ? 'link' : 'inline',
      theme,

      className: trimList([
        'Ellipsis',
        truncationClassName,
        className,
      ]),

      href: to,
      'data-type': type,
      'data-max': max,

      style: {
        display,
        maxWidth: isFinite(max) ? `${max}em` : max,
      },

      content: (withTooltip || isTruncated && !noTooltip) && <div lang={lang} className="EllipsisTip" {...contentProp} />,

      html,
      children,
      setRef: this.set$ellipsis,

      ...others,
    }

    const tooltip = <Tooltip {...tooltipProps} />

    return (
      withQuote || withPeriod || withComma || withQuestionMark
      ? <span
          className={trimList([
            'Punctuation',
            withQuote && 'with-quote',
            withPeriod && 'with-period',
            withComma && 'with-comma',
            withQuestionMark && 'with-question-mark',
            truncationClassName,
          ])}
        >
          { tooltip }
        </span>
      : tooltip
    )
  }
}

export function User({
  name, id, email, ...others
}) {
  const result = name || (id ? `@${id}` : email)
  const resultType = name ? 'user' : id ? 'id' : email ? 'email' : null

  return <Ellipsis type={resultType} {...others}>{ result }</Ellipsis>
}

User.propTypes = {
  name: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  email: PropTypes.string,
}

export function OrgName({ name, ...others }) {
  return <Ellipsis type="org" {...others}>{ name }</Ellipsis>
}

OrgName.propTypes = {
  name: PropTypes.node,
}

export function TeamName({ name, ...others }) {
  return <Ellipsis type="team" {...others}>{ name }</Ellipsis>
}

TeamName.propTypes = {
  name: PropTypes.node,
}

export function AppName({ name, ...others }) {
  return <Ellipsis type="app" {...others}>{ name }</Ellipsis>
}

AppName.propTypes = {
  name: PropTypes.node,
}

export function WidgetName({ name, ...others }) {
  return <Ellipsis type="widget" {...others}>{ name }</Ellipsis>
}

WidgetName.propTypes = {
  name: PropTypes.node,
}
