import _toArray from '@babel/runtime/helpers/esm/toArray';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import { PureComponent, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isElement from 'lodash/isElement';
import Icon from '../icon';
import Ellipsis from '../ellipsis';
import { trimList, SVG, checkOptionByValue, getOptionLabel, preparePortal, $, preventScrollingPropagation, getOptionValue } from '../util';
import { positionMenu } from '../dropdown';

var MENU_ROOT_ID = 'IBOT_SELECT_MENU_ROOT';
var _window = window,
    _window$I18N = _window.I18N,
    I18N = _window$I18N === void 0 ? {} : _window$I18N;
var $menuRoot = document.getElementById(MENU_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MENU_ROOT_ID
});
var $body = document.body;

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot);
}

var Select = /*#__PURE__*/function (_PureComponent) {
  _inherits(Select, _PureComponent);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false,
      prevProps: _this.props,
      value: _this.props.value
    });

    _defineProperty(_assertThisInitialized(_this), "set$select", function ($select) {
      return _this.setState({
        $select: $select
      });
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      return _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeWindow", function () {
      return _this.state.isOpen && _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      return _this.setState({
        value: value
      }, function () {
        _this.close();

        _this.props.onChange(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (_ref) {
      var $opt = _ref.currentTarget;
      var value = _this.props.value;

      var _assertThisInitialize = _assertThisInitialized(_this),
          canSelect = _assertThisInitialize.canSelect;

      return _this.onChange(canSelect ? $opt.dataset.value : value);
    });

    return _this;
  }

  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          theme = _this$props.theme,
          unstyled = _this$props.unstyled,
          className = _this$props.className,
          menuX = _this$props.menuX;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          $select = _this$state.$select,
          value = _this$state.value;
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly,
          canSelect = this.canSelect;
      var klass = trimList([theme === 'core' ? 'CoreSelect' : 'Select', size, unstyled && 'unstyled', className, isOpen && 'is-open', isDisabled && 'is-disabled', readOnly && 'readonly']);
      return /*#__PURE__*/jsxs("label", {
        className: klass,
        role: "listbox",
        ref: this.set$select,
        children: [/*#__PURE__*/jsx("button", {
          type: "button",
          onClick: this.toggle,
          disabled: isDisabled,
          children: /*#__PURE__*/jsx(Ellipsis, {
            children: this.displayText
          })
        }), /*#__PURE__*/jsx("span", {
          className: "caret",
          dangerouslySetInnerHTML: {
            __html: SVG.INPUT_ARROW
          }
        }), /*#__PURE__*/jsx(SelectMenu, _objectSpread(_objectSpread({
          isOpen: isOpen
        }, this.props), {}, {
          value: value,
          $select: $select,
          canSelect: canSelect,
          onChange: this.onSelect,
          onClose: this.close,
          menuX: menuX
        }))]
      });
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var _this$props2 = this.props,
          isDisabled = _this$props2.isDisabled,
          disabled = _this$props2.disabled;
      return isDisabled || disabled;
    }
  }, {
    key: "readOnly",
    get: function get() {
      return this.props.readOnly;
    }
  }, {
    key: "canSelect",
    get: function get() {
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      return !isDisabled && !readOnly;
    }
  }, {
    key: "displayText",
    get: function get() {
      var _this$props3 = this.props,
          optionList = _this$props3.optionList,
          placeholder = _this$props3.placeholder;
      var value = this.state.value;
      var group = optionList.find(function (g) {
        return isArray(g) && g.slice(0).some(function (o) {
          return checkOptionByValue(o, value);
        });
      });
      var option = (group || optionList).find(function (o) {
        return !isArray(o) && checkOptionByValue(o, value);
      });
      return option ? getOptionLabel(option) : placeholder;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          value = _ref2.value;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          value: props.value
        };
      }

      return null;
    }
  }]);

  return Select;
}(PureComponent);

_defineProperty(Select, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  menuTheme: PropTypes.oneOf(['core', 'plain', 'check']),
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
  optionList: PropTypes.arrayOf(PropTypes.oneOfType([// Regular options:
  PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  }), // Option groups:
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })]))])).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  menuX: PropTypes.oneOf(['left', 'center', 'right'])
});

_defineProperty(Select, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  menuTheme: 'plain',
  className: '',
  menuClassName: '',
  placeholder: I18N.select_placeholder || 'Choose one…',
  emptyMsg: I18N.select_empty_msg || 'Nothing to display…',
  optionList: [],
  isDisabled: false,
  onChange: function onChange() {
    return null;
  },
  menuX: 'left'
});
var SelectMenu = /*#__PURE__*/function (_PureComponent2) {
  _inherits(SelectMenu, _PureComponent2);

  var _super2 = _createSuper(SelectMenu);

  function SelectMenu() {
    var _this2;

    _classCallCheck(this, SelectMenu);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      isDownward: true
    });

    _defineProperty(_assertThisInitialized(_this2), "portal", preparePortal($menuRoot, 'SelectMenuPortal'));

    _defineProperty(_assertThisInitialized(_this2), "menuBaseRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this2), "position", function (e) {
      var _this2$props = _this2.props,
          $select = _this2$props.$select,
          menuX = _this2$props.menuX;

      var _assertThisInitialize2 = _assertThisInitialized(_this2),
          $menuBase = _assertThisInitialize2.menuBaseRef.current;

      if (e) {
        var $target = get(e, 'target');
        if ($target && isElement($target) && $target.matches('.SelectMenu')) return;
      }

      var _positionMenu = positionMenu({
        $menuBase: $menuBase,
        $opener: $select,
        menuX: menuX,
        shouldSetMaxHeight: true
      }),
          isDownward = _positionMenu.isDownward;

      _this2.setState({
        isDownward: isDownward
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (e) {
      var _this2$props2 = _this2.props,
          canSelect = _this2$props2.canSelect,
          onChange = _this2$props2.onChange;
      var isDownward = _this2.state.isDownward;
      var $opt = e.currentTarget;
      var $menuBase = $opt.closest('.SelectMenu, .CoreSelectMenu, .CheckSelectMenu');

      if (!$opt || !$menuBase) {
        return _this2.onlose();
      }

      var _$opt$getBoundingClie = $opt.getBoundingClientRect(),
          topOf$opt = _$opt$getBoundingClie.top,
          bottomOf$opt = _$opt$getBoundingClie.bottom;

      var _$menuBase$getBoundin = $menuBase.getBoundingClientRect(),
          topOf$menuBase = _$menuBase$getBoundin.top,
          bottomOf$menuBase = _$menuBase$getBoundin.bottom;

      if (isDownward && topOf$opt >= topOf$menuBase || !isDownward && bottomOf$opt <= bottomOf$menuBase) {
        if ($opt.classList.contains('title')) return;
        return onChange(e);
      }

      return _this2.onClose();
    });

    _defineProperty(_assertThisInitialized(_this2), "onClose", function () {
      var onClose = _this2.props.onClose;
      onClose();
    });

    _defineProperty(_assertThisInitialized(_this2), "scrollIntoActive", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_this2),
          $menuBase = _assertThisInitialize3.menuBaseRef.current;

      var $current = $('li[role=option].is-active', $menuBase);

      if ($current) {
        $current.scrollIntoView({
          block: 'start'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "onClickOutside", function (_ref3) {
      var target = _ref3.target;
      var $select = _this2.props.$select;
      var isOutsideMenu = !$menuRoot.contains(target);
      var closestLabel = target.closest('label');
      var isOwnLabel = closestLabel && closestLabel.contains($select);

      if (isOutsideMenu && !isOwnLabel) {
        _this2.onClose();
      }
    });

    return _this2;
  }

  _createClass(SelectMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var $menuBase = this.menuBaseRef.current;
      preventScrollingPropagation($('.SelectMenu', $menuBase));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref4) {
      var wasOpen = _ref4.isOpen;
      var isOpen = this.props.isOpen; // Set up the position of the <SelectMenu> once opened:

      if (!wasOpen && isOpen) {
        this.position();
        this.scrollIntoActive();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/createPortal(this.menu, this.portal);
    }
  }, {
    key: "menu",
    get: function get() {
      var _this3 = this;

      var _this$props4 = this.props,
          isOpen = _this$props4.isOpen,
          isDisabled = _this$props4.isDisabled,
          readOnly = _this$props4.readOnly,
          menuTheme = _this$props4.menuTheme,
          menuClassName = _this$props4.menuClassName,
          menuX = _this$props4.menuX,
          optionList = _this$props4.optionList,
          emptyMsg = _this$props4.emptyMsg,
          value = _this$props4.value,
          canSelect = _this$props4.canSelect;
      var isDownward = this.state.isDownward;
      var isEmpty = optionList.length === 0;
      var klass = trimList([menuTheme === 'core' ? 'CoreSelectMenu' : menuTheme === 'check' ? 'CheckSelectMenu' : 'SelectMenu', menuClassName, "x-".concat(menuX), isOpen && 'is-open', isDownward ? 'is-downward' : 'is-upward', isDisabled && 'is-disabled', isEmpty && 'is-empty', canSelect ? 'can-select' : 'cant-select']);
      return /*#__PURE__*/jsx("div", {
        ref: this.menuBaseRef,
        className: "SelectMenuBase",
        children: /*#__PURE__*/jsxs("ul", {
          className: klass,
          onTransitionEnd: this.onTransitionEnd,
          children: [isEmpty ? /*#__PURE__*/jsx("li", {
            className: "SelectOption empty-msg",
            children: emptyMsg
          }) : optionList.map(function (option, idx) {
            return isArray(option) ? /*#__PURE__*/jsx(Group, {
              menuTheme: menuTheme,
              optionList: option,
              value: value,
              onChange: _this3.onChange
            }, idx) : /*#__PURE__*/jsx(Option, {
              menuTheme: menuTheme,
              isActive: checkOptionByValue(option, value),
              option: option,
              isDisabled: option.isDisabled,
              onChange: _this3.onChange
            }, idx);
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onClick: this.onClickOutside
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onScroll: withOptions(this.position, {
              capture: true
            })
          })]
        })
      });
    }
  }]);

  return SelectMenu;
}(PureComponent);

_defineProperty(SelectMenu, "propTypes", _objectSpread(_objectSpread({}, Select.propTypes), {}, {
  isOpen: PropTypes.bool,
  canSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  $select: PropTypes.instanceOf(Element)
}));

_defineProperty(SelectMenu, "defaultProps", {
  isOpen: false
});

function Group(_ref5) {
  var value = _ref5.value,
      _ref5$optionList = _toArray(_ref5.optionList),
      title = _ref5$optionList[0],
      optionList = _ref5$optionList.slice(1),
      menuTheme = _ref5.menuTheme,
      onChange = _ref5.onChange;

  return /*#__PURE__*/jsxs("li", {
    className: "SelectGroup",
    children: [/*#__PURE__*/jsx(Ellipsis, {
      className: "title",
      onClick: onChange,
      children: title
    }), /*#__PURE__*/jsx("ul", {
      children: optionList.map(function (option, idx) {
        return /*#__PURE__*/jsx(Option, {
          menuTheme: menuTheme,
          option: option,
          isActive: checkOptionByValue(option, value),
          isDisabled: option.isDisabled,
          onChange: onChange
        }, idx);
      })
    })]
  });
}

Group.propTypes = {
  idx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  optionList: PropTypes.array,
  onChange: PropTypes.func,
  menuTheme: PropTypes.string
};

function Option(_ref6) {
  var option = _ref6.option,
      isActive = _ref6.isActive,
      isDisabled = _ref6.isDisabled,
      menuTheme = _ref6.menuTheme,
      onChange = _ref6.onChange;
  var className = trimList(['SelectOption', isActive && 'is-active', isDisabled && 'is-disabled']);
  var label = getOptionLabel(option);
  var value = getOptionValue(option);
  return /*#__PURE__*/jsxs("li", {
    role: "option",
    "data-value": value,
    className: className,
    onClick: isDisabled ? undefined : onChange,
    children: [/*#__PURE__*/jsx(Ellipsis, {
      children: label
    }), menuTheme === 'check' && isActive && /*#__PURE__*/jsx(Icon, {
      name: "check",
      type: "dora"
    })]
  });
}

Option.propTypes = {
  idx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  option: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  isDisabled: PropTypes.bool,
  menuTheme: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
export { $menuRoot, SelectMenu };
