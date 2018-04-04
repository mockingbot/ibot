import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'

import get from 'lodash/get'
import isArray from 'lodash/isArray'

import Text from '../text'
import Dropdown from '../dropdown'
import util from '../util'
import { Input } from './Input'
import { getOptionLabel, getOptionValue, getCurrentOptionIdx } from './util'

import './index.styl'

const { Ellipsis: { Ellipsis } } = Text
const { trimList, $, $$, SVG } = util
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
  state = {
    isOpen: false,
    currentOptionIdx: this.currentOptionIdx,
    value: this.props.value,
  }

  static propTypes = {
    size: PropTypes.oneOf(['regular', 'small']),
    unstyled: PropTypes.bool,
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

    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    currentOptionIdx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    isDisabled: PropTypes.bool,
    onChange: PropTypes.func,

    shouldMenuAlignCenter: PropTypes.bool,
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
    shouldMenuAlignCenter: false,
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeWindow)
  }

  componentWillReceiveProps(nextProps) {
    const { currentOptionIdx, value } = this.props
    const { currentOptionIdx: nextOptionIdx, value: nextValue } = nextProps

    if (currentOptionIdx !== nextOptionIdx || value !== nextValue) {
      this.setState({
        currentOptionIdx: this::getCurrentOptionIdx(nextProps),
        value: nextValue,
      })
    }
  }

  get currentOptionIdx() {
    return this::getCurrentOptionIdx()
  }

  set$select = $select => this.setState({ $select })

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  onResizeWindow = () => this.state.isOpen && this.close()

  onChange = (idx, value) => this.setState(
    { currentOptionIdx: idx, value },
    () => {
      const { optionList, onChange } = this.props
      this.close()
      onChange({ value, idx })
    },
  )

  onSelect = ({ currentTarget: $opt }) => (
    this.onChange($opt.dataset.idx, $opt.dataset.value)
  )

  render() {
    const {
      size, unstyled,

      className,
      optionList,
      shouldMenuAlignCenter,

      isDisabled,
      placeholder,
    } = this.props

    const { isOpen, $select } = this.state
    const { currentOptionIdx } = this

    const option = get(optionList, currentOptionIdx, placeholder)
    const displayText = option.label || option

    const klass = trimList([
      'Select',
      size,
      unstyled && 'unstyled',
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
          <Ellipsis>{ displayText }</Ellipsis>
        </button>

        <span className="caret" dangerouslySetInnerHTML={{ __html: SVG.INPUT_ARROW }} />

        <SelectMenu
          isOpen={isOpen}
          {...this.props}
          $select={$select}
          onChange={this.onSelect}
          onClose={this.close}
          currentOptionIdx={currentOptionIdx}
          shouldMenuAlignCenter={shouldMenuAlignCenter}
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
    const { isOpen, shouldMenuAlignCenter } = this.props

    // Set up the min-width of the <Select> once mounted:
    this.size$select($select)

    // Set up the position of the <SelectMenu> once opened:
    if (!isOpen && willBeOpen) {
      const result = Dropdown.positionDropdown({
        $menu,
        $opener: $select,
        position: 'bottom',
        shouldSetMinWidth: true,
        shouldSetMaxHeight: true,
        shouldAlignLeft: !shouldMenuAlignCenter,
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

    Object.assign($menu.style, { minWidth: 0 })

    const { offsetWidth: wOf$menu } = $menu
    const { offsetWidth: wOf$select } = $select

    const minW = Math.max(wOf$select, wOf$menu)

    Object.assign($select.style, { minWidth: `${minW}px` })
    Object.assign($menu.style, { minWidth: `${minW}px` })
  }

  scrollIntoActive = () => {
    const $current = $('li[role=option].is-active', this.$menu)

    if ($current) {
      $current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
      shouldMenuAlignCenter,
    } = this.props

    const { isDownward } = this.state

    const isEmpty = optionList.length === 0

    const klass = trimList([
      'SelectMenu',
      menuClassName,
      shouldMenuAlignCenter && 'h-centered',
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
              isArray(opt)
              ? <Group
                  key={idx}
                  idx={idx}
                  optionList={opt}
                  onChange={onChange}
                  currentOptionIdx={currentOptionIdx}
                />
              : <Option
                  key={idx}
                  idx={idx}
                  label={getOptionLabel(opt)}
                  value={getOptionValue(opt)}
                  isDisabled={opt.isDisabled}
                  onChange={onChange}
                  currentOptionIdx={currentOptionIdx}
                />
            ))
          )
        }

        <DocumentEvents
          enabled={isOpen}
          capture={false}
          onClick={this.onClickOutside}
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

const getGroupOptionIdx = ({ groupIdx, idx }) => `${groupIdx}.${idx + 1}`

function Group({
  idx: groupIdx,
  optionList: [title, ...optionList],
  onChange,
  currentOptionIdx,
}) {
  return (
    <li className="SelectGroup">
      <Ellipsis className="title">{ title }</Ellipsis>

      <ul>
      {
        optionList
        .map((opt, idx) => (
          <Option
            key={idx}
            idx={getGroupOptionIdx({ groupIdx, idx })}
            label={getOptionLabel(opt)}
            value={getOptionValue(opt)}
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
      data-value={value}
      className={className}
      onClick={isDisabled ? undefined : onChange}
    >
      <Ellipsis>{ label }</Ellipsis>
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
