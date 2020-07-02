import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../tooltip'
import { trimList } from '../util'
import { StyledEllipsis } from './styled'

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

  componentDidMount () {
    return this.setState({ isDetected: true, isTruncated: this.detectTruncation() })
  }

  componentDidUpdate ({ children: prevChildren, html: prevHTML }) {
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

  render () {
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
        (withQuote || withPeriod || withComma || withQuestionMark) && 'Punctuation',
        withQuote && 'with-quote',
        withPeriod && 'with-period',
        withComma && 'with-comma',
        withQuestionMark && 'with-question-mark',
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
        ? <StyledEllipsis
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
        </StyledEllipsis>
        : tooltip
    )
  }
}
