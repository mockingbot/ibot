import React from 'react'
import PropTypes from 'prop-types'
import { trimList } from '@ibot/util'

import './index.styl'

/**
 * <Icon>
 *
 * @param
 *  @prop {String} name/id of icon
 *  @prop {String} [type=icon]
 *  @prop {String} [className]
 */
export default function Icon({
  name: propName = '',
  type,
  className,
  ...others,
}) {
  const prefix = type === 'mb' ? 'icon' : type
  const name = propName.replace(/^(dora|icon|fa|md|ci|mb)\-/gi, '')
  const isLiga = type === 'dora' || type === 'md'

  return (
    <span
      className={trimList(['Icon', type, `${prefix}-${name}`, className])}
      {...others}
    >
      { isLiga && name }
    </span>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
}

Icon.defaultProps = {
  name: '',
  type: 'icon',
}
