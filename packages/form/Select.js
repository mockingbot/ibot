import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'
import get from 'lodash/get'

import { EllipsisSpan } from '@ibot/text'
import Icon from '@ibot/icon'
import { positionDropdown } from '@ibot/dropdown'
import { trimList, $, $$, SVG } from '@ibot/util'

import './index.styl'

const MENU_ROOT_ID = 'MB_SELECT_MENU_ROOT'
const CANT_SCROLL_CLASS = 'mb-cant-scroll'

const { I18N = {} } = window

export const $menuRoot = (
  document.getElementById(MENU_ROOT_ID)
  || Object.assign(document.createElement('div'), { id: MENU_ROOT_ID })
)

const $body = document.body

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot)
}

function getOptionEntry(optionList, idx, def) {
  return get(optionList, idx, def)
}

function controlScrolling({ target, canScroll = false }) {
  const classList = target.classList || document.body.classList
  const action = canScroll ? 'remove' : 'add'
  return classList[action](CANT_SCROLL_CLASS)
}

function enableScrolling() {
  $$(`.${CANT_SCROLL_CLASS}`)
  .forEach($elmt => (
    $elmt.classList.remove(CANT_SCROLL_CLASS)
  ))
}

export default class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      currentOptionIdx: props.currentOptionIdx,
    }
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small', 'unstyled']),
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    placeholder: PropTypes.string,

    /**
     * A valid option list looks like either one below:
     *
     * ['Apple', 'Pencil']
     * ['Apple', { label: <span>Pencil <Icon name="pencil"/></span>, value: 'pencil' }]
     * [{ label: 'Apple', isDisabled: true }, 'Pencil']
     *
     * [
     *  'An apple',
     *  [
     *    'Stationery', // First entry of an array is the title of the group.
     *    'A pen',
     *    'A marker',
     *    {
     *      label: <span>A pencil <Icon name="pencil"/></span>,
     *      value: 'pencil',
     *      isDisabled: true
     *    },
     *  ],
     *  { label: 'Blackberries' },
     * ]
     *
     */
    optionList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        // Regular options:
        PropTypes.node,
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.any,
          isDisabled: PropTypes.bool,
        }),

        // Option groups:
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.shape({
              label: PropTypes.node,
              value: PropTypes.any,
              isDisabled: PropTypes.bool,
            }),
          ])
        ),
      ])
    ).isRequired,

    currentOptionIdx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    size: 'regular',
    className: '',
    menuClassName: '',
    placeholder: I18N.select_placeholder || 'Choose one…',
    emptyMsg: I18N.select_empty_msg || 'Nothing to display…',
    optionList: [],
    isDisabled: false,
    onChange: () => null,
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeWindow)
  }

  componentWillReceiveProps({ currentOptionIdx: nextOptionIdx }) {
    const { currentOptionIdx } = this.state

    if (currentOptionIdx !== nextOptionIdx) {
      this.setState({ currentOptionIdx: nextOptionIdx })
    }
  }

  set$select = $select => this.setState({ $select })

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  onResizeWindow = () => this.state.isOpen && this.close()

  onChange = idx => this.setState(
    { currentOptionIdx: idx },
    () => {
      const { optionList, onChange } = this.props
      const opt = getOptionEntry(optionList, idx)

      this.close()

      onChange(
        idx,
        typeof opt === 'string' ? opt : (opt.value || opt.label),
      )
    },
  )

  onSelect = ({ currentTarget: $opt }) => (
    this.onChange($opt.dataset.idx)
  )

  render() {
    const {
      size,
      className,
      menuClassName,
      isDisabled,
      optionList,
      placeholder,
    } = this.props

    const { isOpen, currentOptionIdx, $select } = this.state

    const option = get(optionList, currentOptionIdx, placeholder)
    const displayText = option.label || option

    const klass = trimList([
      'Select',
      size,
      className,
      isOpen && 'is-open',
      isDisabled && 'is-disabled',
    ])

    return (
      <label
        className={klass}
        role="listbox"
        ref={this.set$select}
      >
        <button type="button" onClick={this.toggle} disabled={isDisabled}>
          <EllipsisSpan>{ displayText }</EllipsisSpan>
        </button>

        <span className="caret" dangerouslySetInnerHTML={{ __html: SVG.INPUT_ARROW }} />

        <SelectMenu
          isOpen={isOpen}
          {...this.props}
          $select={$select}
          onChange={this.onSelect}
          onClose={this.close}
          currentOptionIdx={currentOptionIdx}
        />
      </label>
    )
  }
}

export class SelectMenu extends PureComponent {
  constructor(props) {
    super(props)

    Object.assign(this, {
      state: { isDownward: true },

      portal: Object.assign(
        document.createElement('div'),
        { className: 'SelectMenuPortal' },
      ),
    })
  }

  static propTypes = {
    ...Select.propTypes,
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    $select: PropTypes.instanceOf(Element),
  }

  static defaultProps = {
    isOpen: false,
  }

  componentWillMount() {
    $menuRoot.appendChild(this.portal)
  }

  componentWillReceiveProps({ isOpen: willBeOpen, $select }) {
    const { $menu } = this
    const { isOpen } = this.props

    // Set up the min-width of the <Select> once mounted:
    this.size$select($select)

    // Set up the position of the <SelectMenu> once opened:
    if (!isOpen && willBeOpen) {
      const result = positionDropdown({
        $menu,
        $opener: $select,
        shouldSetMinWidth: true,
        position: 'bottom',
        unfold: 'left',
      })

      this.setState({ isDownward: result.finalPosition === 'bottom' })
      this.scrollIntoActive()
    }
  }

  componentWillUnmount() {
    if (this.portal) this.portal.remove()
  }

  onClose = () => {
    const { onClose } = this.props

    onClose()
    enableScrolling()
  }

  set$menu = $menu => Object.assign(this, { $menu })

  size$select = ($select = this.props.$select) => {
    const { $menu } = this

    if (!$select || !$menu) return

    // Clean up previously-set min-width:
    $select.removeAttribute('style')
    Object.assign($menu.style, { minWidth: 0 })

    const { offsetWidth: wOf$menu, offsetHeight: hOf$menu } = $menu
    const { offsetWidth: wOf$select, offsetHeight: hOf$select } = $select

    const minW = Math.max(wOf$select, wOf$menu)
    const maxY = window.innerHeight - 10

    Object.assign($select.style, { minWidth: `${minW}px` })
    Object.assign($menu.style, { minWidth: `${minW}px` })
  }

  scrollIntoActive = () => {
    const $current = $('li[role=option].is-active', this.$menu)

    if ($current) {
      $current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  onTransitionEnd = () => (
    // Clean up inline styles for <SelectMenu> once closed:
    !this.props.isOpen && this.$menu.removeAttribute('style')
  )

  onClickOutside = ({ target }) => {
    const { $select } = this.props

    const isOutsideMenu = !$menuRoot.contains(target)

    const closestLabel = target.closest('label')
    const isOwnLabel = closestLabel && closestLabel.contains($select)

    if (isOutsideMenu && !isOwnLabel) {
      this.onClose()
    }
  }

  onScrollWhileOpen = ({ target }) => {
    const { $menu } = this
    const { $select } = this.props
    if (!$menu) return

    const isScrollingMenu = $menu.contains(target)
    const isCursorOnMenu = $menu.matches(':hover')
    const isCursorOnOpener = $select.matches(':hover')

    if (!isScrollingMenu && isCursorOnMenu) {
      controlScrolling({ target, canScroll: false })

    } else if (!isScrollingMenu && !isCursorOnMenu && !isCursorOnOpener) {
      this.onClose()
      controlScrolling({ target, canScroll: true })
    }
  }

  onMouseLeave = () => setTimeout(enableScrolling, 300)

  render() {
    return createPortal(this.renderMenu(), this.portal)
  }

  renderMenu() {
    const {
      isOpen,
      isDisabled,
      menuClassName,
      optionList,
      emptyMsg,
      onChange,
      currentOptionIdx,
    } = this.props

    const { isDownward } = this.state

    const isEmpty = optionList.length === 0

    const klass = trimList([
      'SelectMenu',
      menuClassName,
      isOpen && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      isDisabled && 'is-disabled',
      isEmpty && 'is-empty',
    ])

    return (
      <ul
        className={klass}
        ref={this.set$menu}
        onTransitionEnd={this.onTransitionEnd}
        onMouseLeave={this.onMouseLeave}
      >
        {
          isEmpty
          ? <li className="SelectOption empty-msg">{ emptyMsg }</li>
          : (
            optionList
            .map((opt, idx) => (
              Array.isArray(opt)
              ? (
                <Group
                  key={idx}
                  idx={idx}
                  optionList={opt}
                  onChange={onChange}
                  currentOptionIdx={currentOptionIdx}
                />
              )
              : (
                <Option
                  key={idx}
                  idx={idx}
                  label={opt.label || opt}
                  value={opt.value}
                  isDisabled={opt.isDisabled}
                  onChange={onChange}
                  currentOptionIdx={currentOptionIdx}
                />
              )
            ))
          )
        }

        <DocumentEvents
          enabled={isOpen}
          capture={false}
          onMouseDown={this.onClickOutside}
        />

        <DocumentEvents
          enabled={isOpen}
          capture={true}
          onScroll={this.onScrollWhileOpen}
        />
      </ul>
    )
  }
}

function Group({
  idx: groupIdx,
  optionList: [title, ...optionList],
  onChange,
  currentOptionIdx,
}) {
  return (
    <li className="SelectGroup">
      <div className="title">{ title }</div>

      <ul>
      {
        optionList
        .map((opt, idx) => (
          <Option
            key={idx}
            idx={`${groupIdx}.${idx + 1}`}
            label={opt.label || opt}
            value={opt.value}
            isDisabled={opt.isDisabled}
            onChange={onChange}
            currentOptionIdx={currentOptionIdx}
          />
        ))
      }
      </ul>
    </li>
  )
}

Group.propTypes = {
  idx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  optionList: PropTypes.array,
  onChange: PropTypes.func,
  currentOptionIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

function Option({
  idx,
  label,
  value,
  isDisabled,
  onChange,
  currentOptionIdx,
}) {

  const className = trimList([
    'SelectOption',
    isDisabled ? 'is-disabled' : '',
    String(currentOptionIdx) === String(idx) ? 'is-active' : '',
  ])

  return (
    <li
      role="option"
      data-idx={idx}
      className={className}
      onClick={isDisabled ? undefined : onChange}
    >
      <EllipsisSpan>{ label }</EllipsisSpan>
    </li>
  )
}

Option.propTypes = {
  idx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.node.isRequired,
  value: PropTypes.any,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  currentOptionIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export function PanelSelect({ className, ...others }) {
  return (
    <Input
      size="small"
      className={trimList(['PanelSelect', className])}
      {...others}
    />
  )
}

PanelSelect.propTypes = {
  className: PropTypes.string,
}
