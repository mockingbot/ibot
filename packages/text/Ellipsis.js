import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import Util from '@ibot/util'

import Tooltip from './Tooltip'

import { TYPE_ELEMENT_MAP } from './constants'
const { trimList } = Util
export class Ellipsis extends PureComponent {
  state = { isTruncated: false }

  static propTypes = {
    className: PropTypes.string,

    type: PropTypes.oneOf(['user', 'id', 'email', 'team', 'app', 'widget']),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    display: PropTypes.oneOf(['inline-block', 'block']),

    to: PropTypes.string,
    children: PropTypes.node,

    noTooltip: PropTypes.bool,
    withTooltip: PropTypes.bool,

    withQuote: PropTypes.bool,
    withComma: PropTypes.bool,
    withPeriod: PropTypes.bool,
    withQuestionMark: PropTypes.bool,
  }

  componentDidMount() {
    if (this.detectTruncation()) {
      this.setState({ isTruncated: true })
    }
  }

  componentWillReceiveProps({ children: nextChildren }) {
    const { children } = this.props

    if (!isEqual(children, nextChildren)) {
      this.setState({ isTruncated: false })
    }
  }

  componentDidUpdate({ children: prevChildren }) {
    const { children } = this.props

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
      className, to, type, max, display,
      noTooltip, withTooltip,

      withQuote,
      withPeriod, withComma, withQuestionMark,

      children,
      ...others,
    } = this.props

    const { isTruncated } = this.state

    const elementType = !!to ? 'link' : 'inline'

    const attr = {
      ref: this.set$ellipsis,

      className: trimList([
        'Ellipsis',
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

    const ellipsis = (
     withTooltip || isTruncated && !noTooltip
      ? <Tooltip type={elementType} content={children} {...attr} />
      : React.createElement(TYPE_ELEMENT_MAP[elementType], attr)
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
          ])}
          children={ellipsis}
        />
      : ellipsis
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
    <Ellipsis type={resultType} {...others}>
    { result }
    </Ellipsis>
  )
}

export function TeamName({ name, ...others }) {
  return <Ellipsis type="team" {...others}>{ name }</Ellipsis>
}

export function AppName({ name, ...others }) {
  return <Ellipsis type="app" {...others}>{ name }</Ellipsis>
}

export function WidgetName({ name, ...others }) {
  return <Ellipsis type="widget" {...others}>{ name }</Ellipsis>
}
