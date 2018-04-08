import React from 'react'
import PropTypes from 'prop-types'

import { trimList } from '../util'
import duoList from 'mb-icons/dora/duo-list.json'

import './index.styl'

const ICON_SET_LIST = ['dora', 'mb', 'icon', 'fa', 'md', 'ci']
const LIGA_ICON_SET_LIST = ['dora', 'md']

const checkIfIconIsLiga = type => LIGA_ICON_SET_LIST.includes(type)

function Icon({
  name: propName = '',
  type,
  className,
  ...others
}) {
  const prefix = type === 'mb' ? 'icon' : type
  const name = propName.replace(new RegExp(`^(${ ICON_SET_LIST.join('|') })\-`, 'i'), '')
  const isLiga = checkIfIconIsLiga(type)

  return (
    <span
      className={trimList([
        'icon',
        type,
        !isLiga && `${prefix}-${name}`,
        className,
      ])}
      {...others}
    >
      { isLiga && name }
    </span>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Icon.defaultProps = {
  name: '',
  type: 'icon',
}

const DUO_ICON_NAME_MAP = {
  dora: 'duodora',
}

function DuoIcon({
  name,
  type,
  className,
  colorList,
  ...others
}) {
  const icon = duoList.find(({ id }) => id === name)

  return !!icon && (
    <span
      className={trimList(['duo-icon', DUO_ICON_NAME_MAP[type], className])}
      {...others}
    >
    {
      icon.layer
      .map((l, idx) => (
        <span key={l} className="layer" style={{ color: colorList[idx] }}>
        { `${name}__${l}` }
        </span>
      ))
    }
    </span>
  )
}

DuoIcon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(DUO_ICON_NAME_MAP)),
  className: PropTypes.string,
  colorList: PropTypes.array,
}

DuoIcon.defaultProps = {
  name: '',
  type: 'dora',
  colorList: [],
}

Icon.DuoIcon = DuoIcon

export default Icon
