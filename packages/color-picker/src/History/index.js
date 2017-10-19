import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.sass'

export default class History extends React.Component {
  render () {
    return (
      <div className={styles['history-pane']}>
        <span>最近使用的颜色</span>
      </div>
    )
  }
}

History.propTypes = {
  'a': PropTypes.string
}
