import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'

import Tooltip from './Tooltip'
import { trimList } from '../util'
import { TYPE_ELEMENT_MAP } from './constants'

export class Ellipsis extends PureComponent {
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
    if (this.detectTruncation()) {
      this.setState({ isTruncated: true })
    }

    this.setState({ isDetected: true })
  }

  componentDidUpdate({ children: prevChildren, html: prevHTML }) {
    const { children, html } = this.props

    if (!isEqual(prevChildren, children) || !isEqual(prevHTML, html)) {
      console.log({ prevChildren, children, prevHTML, html })

      this.setState(
        { isDetected: false },
        () => this.setState({ isTruncated: this.detectTruncation(), isDetected: true }),
      )
    }
  }

  set$ellipsis = $ellipsis => Object.assign(this, { $ellipsis })

  detectTruncation = ($e = this.$ellipsis) => $e.offsetWidth < $e.scrollWidth

  render() {
    const {
      className, to, type, max, display, lang,
      noTooltip, withTooltip,

      withQuote,
      withPeriod, withComma, withQuestionMark,

      children,
      html,
      ...others
    } = this.props

    const { isTruncated, isDetected } = this.state

    const elementType = to ? 'link' : 'inline'

    const contentProp = (
      html
      ? { dangerouslySetInnerHTML: { __html: html } }
      : { children }
    )

    const truncationClassName = isTruncated ? 'is-truncated' : isDetected ? 'isnt-truncated': null

    const attr = {
      ref: this.set$ellipsis,

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

      html,
      children,
      ...others,
    }

    const tip = (
      <div lang={lang} className="EllipsisTip" {...contentProp}></div>
    )

    const ellipsis = (
     withTooltip || isTruncated && !noTooltip
      ? <Tooltip type={elementType} content={tip} {...attr} />
      : React.createElement(TYPE_ELEMENT_MAP[elementType], {...attr, ...contentProp})
    )

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
          { ellipsis }
        </span>
      : ellipsis
    )
  }
}

export function User({
  name, id, email, ...others
}) {
  const result = name || (id ? `@${id}` : email)
  const resultType = name ? 'user' : id ? 'id' : email ? 'email' : null

  return (
    <Ellipsis type={resultType} {...others}>
    { result }
    </Ellipsis>
  )
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
