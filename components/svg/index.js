import PropTypes from 'prop-types'
import { trimList } from '../util'
import * as ICON_MAP from './icons'
import './index.styl'

function getIcon (name) {
  const [cat, id] = /.\/./.test(name) ? name.split('/') : ['general', name]
  return ICON_MAP[cat][id]
}

function SVG ({ name, icon = getIcon(name), className, label, ...others }) {
  if (!icon) return null

  const [width, height, __html] = icon

  const aria = label ? { 'aria-label': label } : { 'aria-hidden': true }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={trimList(['svg-icon', name, className])}
      viewBox={`0 0 ${width} ${height}`}
      {...{ ...aria, ...others }}
      dangerouslySetInnerHTML={{ __html }}
    />
  )
}

SVG.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
}

export default SVG
