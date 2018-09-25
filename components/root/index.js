import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class Root extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    return (
      <div className="iBotRoot ContentRoot">
        { this.props.children }
      </div>
    )
  }
}
