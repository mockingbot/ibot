import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class Root extends PureComponent {
  static PropTypes = {
    children: PropTypes.any,
  }

  render() {
    return this.props.children
  }
}
