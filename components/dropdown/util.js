const MARGIN = 9

/**
 * Position menu according to where its opener is and return
 * corresponding information.
 *
 * @param {Object}
 *  @prop {Element} $opener
 *  @prop {Element} $menuBase
 *  @prop {String} [menuX="left"]
 *  @prop {String} [menuY="bottom"]
 *  @prop {Object} [menuBaseStyle={}]
 *  @prop {String} [inflexible=false]
 *  @prop {Boolean} [shouldSetMaxHeight=false]
 *  @prop {Number [decidingPoint]
 *@return {Object}
 *  @prop {Object} style
 *  @prop {Boolean} isDownward
 */
export function positionMenu({
  $opener,
  $menuBase,

  menuX = 'left',
  menuY = 'bottom',

  menuBaseStyle = {},

  inflexible = false,
  shouldSetMaxHeight = false,
}) {
  if (!$opener || !$menuBase) return

  const $menu = $menuBase.querySelector('*')

  const result = { styleFor$menuBase: {}, styleFor$menu: {} }
  const setStyleFor$menuBase = style => Object.assign(result.styleFor$menuBase, style)
  const setStyleFor$menu = style => Object.assign(result.styleFor$menu, style)

  const { offsetWidth: wOf$menu, offsetHeight: hOf$menu } = $menu
  const wOf$opener = menuBaseStyle.width || $opener.offsetWidth
  const hOf$opener = menuBaseStyle.height || $opener.offsetHeight

  const rect = $opener.getBoundingClientRect()

  const { top, right, bottom, left } = Object.assign(
    {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    },
    menuBaseStyle,
  )

  // Copy positioning info of $opener to $menuBase:
  setStyleFor$menuBase({
    top: `${top}px`,
    left: `${left}px`,
    width: `${wOf$opener}px`,
    height: `${hOf$opener}px`,
  })

  const { innerHeight: hOf$win } = window

  const minY = 10
  const maxY = hOf$win - 10

  // Point deciding the position for the menu:
  const ratio = menuY === 'top' ? 1/3 : 2/3
  const decidingPoint = hOf$win * ratio

  // Y middle line of the $opener:
  const midOf$opener = top + hOf$opener/2
  const bottomOf$opener = top + hOf$opener

  // Slide downward:
  if (
    (
      inflexible && menuY === 'bottom'
      || !inflexible && decidingPoint >= midOf$opener
    )
    && (bottomOf$opener + hOf$menu + MARGIN) < hOf$win
  ) {
    result.isDownward = true

    // If the height of the menu is taller than that of space downward:
    if (shouldSetMaxHeight && bottom + hOf$menu > maxY) {
      setStyleFor$menu({ maxHeight: `${maxY - bottom}px` })
    }

  // Slide upward:
  } else {
    result.isDownward = false

    // If the height of the menu is taller than that of space upward:
    if (shouldSetMaxHeight && top - hOf$menu < minY) {
      setStyleFor$menu({ maxHeight: `${top - minY}px` })
    }
  }

  Object.assign($menuBase.style, result.styleFor$menuBase)
  Object.assign($menu.style, result.styleFor$menu)

  return result
}
