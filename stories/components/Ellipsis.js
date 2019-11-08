import React from 'react'
import PropTypes from 'prop-types'
import Ellipsis from '../../components/ellipsis'
import Tooltip from '../../components/tooltip'

export function User ({
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

export function OrgName ({ name, ...others }) {
  return <Ellipsis type="org" {...others}>{ name }</Ellipsis>
}

OrgName.propTypes = {
  name: PropTypes.node,
}

export function TeamName ({ name, ...others }) {
  return <Ellipsis type="team" {...others}>{ name }</Ellipsis>
}

TeamName.propTypes = {
  name: PropTypes.node,
}

export function AppName ({ name, ...others }) {
  return <Ellipsis type="app" {...others}>{ name }</Ellipsis>
}

AppName.propTypes = {
  name: PropTypes.node,
}

export function WidgetName ({ name, ...others }) {
  return <Ellipsis type="widget" {...others}>{ name }</Ellipsis>
}

WidgetName.propTypes = {
  name: PropTypes.node,
}

export function CoreTooltip (props) {
  return <Tooltip {...props} theme="core" />
}
