import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import react, { isValidElement, cloneElement, PureComponent, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classCallCheck from '@babel/runtime/helpers/classCallCheck';
import createClass from '@babel/runtime/helpers/createClass';
import possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import inherits from '@babel/runtime/helpers/inherits';
import _typeof from '@babel/runtime/helpers/typeof';
import objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _extends from '@babel/runtime/helpers/extends';
import { trimList, preparePortal, $, preventScrollingPropagation, SVG } from '../util';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

var reactEventListener_cjs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(classCallCheck);
var _createClass = _interopDefault(createClass);
var _possibleConstructorReturn = _interopDefault(possibleConstructorReturn);
var _getPrototypeOf = _interopDefault(getPrototypeOf);
var _inherits = _interopDefault(inherits);
var _typeof$1 = _interopDefault(_typeof);
var _objectWithoutProperties = _interopDefault(objectWithoutProperties);
var _extends$1 = _interopDefault(_extends);
var React = _interopDefault(react);
var PropTypes$1 = _interopDefault(PropTypes);
var warning = _interopDefault(warning_1);

function defineProperty(object, property, attr) {
  return Object.defineProperty(object, property, attr);
} // Passive options
// Inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js


var passiveOption = function () {
  var cache = null;
  return function () {
    if (cache !== null) {
      return cache;
    }

    var supportsPassiveOption = false;

    try {
      window.addEventListener('test', null, defineProperty({}, 'passive', {
        get: function get() {
          supportsPassiveOption = true;
        }
      }));
    } catch (err) {//
    }

    cache = supportsPassiveOption;
    return supportsPassiveOption;
  }();
}();

var defaultEventOptions = {
  capture: false,
  passive: false
};

function mergeDefaultEventOptions(options) {
  return _extends$1({}, defaultEventOptions, options);
}

function getEventListenerArgs(eventName, callback, options) {
  var args = [eventName, callback];
  args.push(passiveOption ? options : options.capture);
  return args;
}

function on(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.addEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function off(target, eventName, callback, options) {
  // eslint-disable-next-line prefer-spread
  target.removeEventListener.apply(target, getEventListenerArgs(eventName, callback, options));
}

function forEachListener(props, iteratee) {
  var children = props.children,
      target = props.target,
      eventProps = _objectWithoutProperties(props, ["children", "target"]);

  Object.keys(eventProps).forEach(function (name) {
    if (name.substring(0, 2) !== 'on') {
      return;
    }

    var prop = eventProps[name];

    var type = _typeof$1(prop);

    var isObject = type === 'object';
    var isFunction = type === 'function';

    if (!isObject && !isFunction) {
      return;
    }

    var capture = name.substr(-7).toLowerCase() === 'capture';
    var eventName = name.substring(2).toLowerCase();
    eventName = capture ? eventName.substring(0, eventName.length - 7) : eventName;

    if (isObject) {
      iteratee(eventName, prop.handler, prop.options);
    } else {
      iteratee(eventName, prop, mergeDefaultEventOptions({
        capture: capture
      }));
    }
  });
}

function withOptions(handler, options) {
  process.env.NODE_ENV !== "production" ? warning(options, 'react-event-listener: should be specified options in withOptions.') : void 0;
  return {
    handler: handler,
    options: mergeDefaultEventOptions(options)
  };
}

var EventListener =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(EventListener, _React$PureComponent);

  function EventListener() {
    _classCallCheck(this, EventListener);

    return _possibleConstructorReturn(this, _getPrototypeOf(EventListener).apply(this, arguments));
  }

  _createClass(EventListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyListeners(on);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.applyListeners(off, prevProps);
      this.applyListeners(on);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.applyListeners(off);
    }
  }, {
    key: "applyListeners",
    value: function applyListeners(onOrOff) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var target = props.target;

      if (target) {
        var element = target;

        if (typeof target === 'string') {
          element = window[target];
        }

        forEachListener(props, onOrOff.bind(null, element));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
    }
  }]);

  return EventListener;
}(React.PureComponent);

EventListener.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can provide a single child too.
   */
  children: PropTypes$1.node,

  /**
   * The DOM target to listen to.
   */
  target: PropTypes$1.oneOfType([PropTypes$1.object, PropTypes$1.string]).isRequired
} : {};

exports.withOptions = withOptions;
exports.default = EventListener;
});

var EventListener = unwrapExports(reactEventListener_cjs);
var reactEventListener_cjs_1 = reactEventListener_cjs.withOptions;

var MARGIN = 9;
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

function positionMenu(_ref) {
  var $opener = _ref.$opener,
      $menuBase = _ref.$menuBase,
      _ref$menuX = _ref.menuX,
      _ref$menuY = _ref.menuY,
      menuY = _ref$menuY === void 0 ? 'bottom' : _ref$menuY,
      _ref$menuBaseStyle = _ref.menuBaseStyle,
      menuBaseStyle = _ref$menuBaseStyle === void 0 ? {} : _ref$menuBaseStyle,
      _ref$inflexible = _ref.inflexible,
      inflexible = _ref$inflexible === void 0 ? false : _ref$inflexible,
      _ref$shouldSetMaxHeig = _ref.shouldSetMaxHeight,
      shouldSetMaxHeight = _ref$shouldSetMaxHeig === void 0 ? false : _ref$shouldSetMaxHeig;
  if (!$opener || !$menuBase) return;
  var $menu = $menuBase.querySelector('*');
  var result = {
    styleFor$menuBase: {},
    styleFor$menu: {}
  };

  var setStyleFor$menuBase = function setStyleFor$menuBase(style) {
    return Object.assign(result.styleFor$menuBase, style);
  };

  var setStyleFor$menu = function setStyleFor$menu(style) {
    return Object.assign(result.styleFor$menu, style);
  };

  var wOf$menu = $menu.offsetWidth,
      hOf$menu = $menu.offsetHeight;
  var wOf$opener = menuBaseStyle.width || $opener.offsetWidth;
  var hOf$opener = menuBaseStyle.height || $opener.offsetHeight;
  var rect = $opener.getBoundingClientRect();

  var _Object$assign = Object.assign({
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  }, menuBaseStyle),
      top = _Object$assign.top,
      right = _Object$assign.right,
      bottom = _Object$assign.bottom,
      left = _Object$assign.left; // Copy positioning info of $opener to $menuBase:


  setStyleFor$menuBase({
    top: "".concat(top, "px"),
    left: "".concat(left, "px"),
    width: "".concat(wOf$opener, "px"),
    height: "".concat(hOf$opener, "px")
  });
  var _window = window,
      hOf$win = _window.innerHeight;
  var minY = 10;
  var maxY = hOf$win - 10; // Point deciding the position for the menu:

  var ratio = menuY === 'top' ? 1 / 3 : 2 / 3;
  var decidingPoint = hOf$win * ratio; // Y middle line of the $opener:

  var midOf$opener = top + hOf$opener / 2;
  var bottomOf$opener = top + hOf$opener; // Slide downward:

  if ((inflexible && menuY === 'bottom' || !inflexible && decidingPoint >= midOf$opener) && bottomOf$opener + hOf$menu + MARGIN < hOf$win) {
    result.isDownward = true; // If the height of the menu is taller than that of space downward:

    if (shouldSetMaxHeight && bottom + hOf$menu > maxY) {
      setStyleFor$menu({
        maxHeight: "".concat(maxY - bottom, "px")
      });
    } // Slide upward:

  } else {
    result.isDownward = false; // If the height of the menu is taller than that of space upward:

    if (shouldSetMaxHeight && top - hOf$menu < minY) {
      setStyleFor$menu({
        maxHeight: "".concat(top - minY, "px")
      });
    }
  }

  Object.assign($menuBase.style, result.styleFor$menuBase);
  Object.assign($menu.style, result.styleFor$menu);
  return result;
}

var _PropTypes$shape;
var MENU_ROOT_ID = 'IBOT_DROPDOWN_MENU_ROOT';
var $menuRoot = document.getElementById(MENU_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MENU_ROOT_ID
});
var $body = document.body;

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot);
}

var Dropdown = /*#__PURE__*/function (_PureComponent) {
  _inherits(Dropdown, _PureComponent);

  var _super = _createSuper(Dropdown);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      $opener: null,
      currentMenuListItemIdx: _this.props.currentMenuListItemIdx
    });

    _defineProperty(_assertThisInitialized(_this), "leaveTimeoutList", []);

    _defineProperty(_assertThisInitialized(_this), "toggle", function (willBeOpen) {
      return _this.setState({
        isOpen: isBoolean(willBeOpen) ? willBeOpen : !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.toggle(true);
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.toggle(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      var shouldOpenOnHover = _this.props.shouldOpenOnHover;
      if (!shouldOpenOnHover) return;
      clearTimeout(_this.closeTimeout);
      Object.assign(_assertThisInitialized(_this), {
        hoverTimeout: setTimeout(_this.open, _this.props.hoverDelay)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var shouldOpenOnHover = _this.props.shouldOpenOnHover;

      if (shouldOpenOnHover) {
        clearTimeout(_this.hoverTimeout);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      var _this$props = _this.props,
          shouldOpenOnHover = _this$props.shouldOpenOnHover,
          hoverDelay = _this$props.hoverDelay,
          hoverCloseDelay = _this$props.hoverCloseDelay;
      var $opener = _this.state.$opener;
      if (!shouldOpenOnHover) return;
      clearTimeout(_this.hoverTimeout);
      var $on = document.elementFromPoint(clientX, clientY);
      var isOutsideOpener = !$opener.contains($on);
      var isOutsideMenu = !$on.closest('.DropdownMenu');

      if (!isOutsideMenu) {
        _this.leaveTimeoutList.map(clearTimeout);

        Object.assign(_assertThisInitialized(_this), {
          leaveTimeoutList: []
        });
      } else if (isOutsideOpener && isOutsideMenu) {
        _this.leaveTimeoutList.push(setTimeout(_this.close, hoverCloseDelay !== undefined ? hoverCloseDelay : Math.max(hoverDelay, 300)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "set$opener", function ($opener) {
      return _this.setState({
        $opener: $opener
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (_ref2) {
      var currentTarget = _ref2.currentTarget;
      var _this$props2 = _this.props,
          menuList = _this$props2.menuList,
          onSelect = _this$props2.onSelect,
          shouldCloseOnSelect = _this$props2.shouldCloseOnSelect;
      if (typeof onSelect !== 'function') return;
      var idx = currentTarget.dataset.idx;
      var item = menuList[idx];
      var value = typeof item === 'string' ? item : item && item.value;
      onSelect(idx, value);

      _this.setState({
        currentMenuListItemIdx: idx
      });

      if (shouldCloseOnSelect) {
        _this.close();
      }
    });

    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref3) {
      var wasOpen = _ref3.isOpen;
      var _this$props3 = this.props,
          onOpen = _this$props3.onOpen,
          onClose = _this$props3.onClose,
          onToggle = _this$props3.onToggle;
      var isOpen = this.state.isOpen;

      if (wasOpen !== isOpen) {
        if (isOpen) {
          onOpen();
          onToggle(true);
        } else {
          onClose();
          onToggle(false);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          opener = _this$props4.opener,
          openerType = _this$props4.openerType,
          shouldCloseOnClickOutside = _this$props4.shouldCloseOnClickOutside;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          $opener = _this$state.$opener,
          currentMenuListItemIdx = _this$state.currentMenuListItemIdx;
      var isDisabled = this.props.isDisabled || this.props.disabled;
      var klass = trimList(['Dropdown', isOpen && 'is-open', isDisabled && 'is-disabled', className]);
      var openerAttr = {
        onClick: this.toggle,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        disabled: isDisabled
      };
      return /*#__PURE__*/jsxs("label", {
        ref: this.set$opener,
        className: klass,
        children: [openerType !== 'button' && /*#__PURE__*/isValidElement(opener) ? /*#__PURE__*/cloneElement(opener, openerAttr) : /*#__PURE__*/jsx("button", _objectSpread(_objectSpread({
          type: "button"
        }, openerAttr), {}, {
          children: opener
        })), /*#__PURE__*/jsx(DropdownMenu, _objectSpread(_objectSpread({}, this.props), {}, {
          isOpen: isOpen,
          $opener: $opener,
          onSelect: this.onSelect,
          onClose: this.close,
          shouldCloseOnClickOutside: shouldCloseOnClickOutside,
          currentMenuListItemIdx: currentMenuListItemIdx
        })), isOpen && /*#__PURE__*/jsx(EventListener, {
          target: document,
          onMouseMove: this.onMouseMove
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref4) {
      var prevProps = _ref4.prevProps,
          isOpen = _ref4.isOpen;

      if (!isEqual(props, prevProps)) {
        if (isBoolean(props.isOpen)) {
          return {
            prevProps: props,
            isOpen: props.isOpen
          };
        }

        return {
          prevProps: props
        };
      }

      return null;
    }
  }]);

  return Dropdown;
}(PureComponent);

_defineProperty(Dropdown, "positionMenu", positionMenu);

_defineProperty(Dropdown, "propTypes", {
  isOpen: PropTypes.bool,
  mode: PropTypes.oneOf(['light', 'dark']),
  opener: PropTypes.node,
  openerType: PropTypes.oneOf(['button', 'custom']),
  className: PropTypes.string,
  portalClassName: PropTypes.string,
  menuBaseClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  menuBaseStyle: PropTypes.shape((_PropTypes$shape = {
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number
  }, _defineProperty(_PropTypes$shape, "top", PropTypes.number), _defineProperty(_PropTypes$shape, "width", PropTypes.number), _defineProperty(_PropTypes$shape, "height", PropTypes.number), _PropTypes$shape)),
  menu: PropTypes.node,
  menuList: PropTypes.arrayOf(PropTypes.oneOfType([// Regular options:
  PropTypes.node, PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })])),
  currentMenuListItemIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shouldPreventScrollingPropagation: PropTypes.bool,
  shouldOpenOnHover: PropTypes.bool,
  shouldCloseOnClickOutside: PropTypes.bool,
  hoverDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverCloseDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  arrowed: PropTypes.bool,
  inflexible: PropTypes.bool,
  menuX: PropTypes.oneOf(['left', 'center', 'right']),
  menuY: PropTypes.oneOf(['top', 'bottom']),
  menuBasedX: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  shouldCloseOnSelect: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
});

_defineProperty(Dropdown, "defaultProps", {
  arrowed: false,
  openerType: 'button',
  mode: 'light',
  shouldPreventScrollingPropagation: true,
  shouldCloseOnSelect: true,
  shouldOpenOnHover: false,
  shouldCloseOnClickOutside: true,
  hoverDelay: 200,
  menuX: 'center',
  menuY: 'bottom',
  inflexible: false,
  menuBasedX: false,
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  }
});

var DropdownMenu = /*#__PURE__*/function (_PureComponent2) {
  _inherits(DropdownMenu, _PureComponent2);

  var _super2 = _createSuper(DropdownMenu);

  function DropdownMenu() {
    var _this2;

    _classCallCheck(this, DropdownMenu);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      isDownward: _this2.props.position === 'bottom'
    });

    _defineProperty(_assertThisInitialized(_this2), "portal", preparePortal($menuRoot, trimList(['DropdownMenuPortal', _this2.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this2), "menuBaseRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this2), "onResizeWindow", function () {
      return _this2.props.isOpen && _this2.position();
    });

    _defineProperty(_assertThisInitialized(_this2), "onClickOutside", function (_ref5) {
      var target = _ref5.target;
      var _this2$props = _this2.props,
          $opener = _this2$props.$opener,
          onClose = _this2$props.onClose,
          shouldCloseOnClickOutside = _this2$props.shouldCloseOnClickOutside;
      if (!shouldCloseOnClickOutside) return;
      var isOutsideMenu = !$menuRoot.contains(target);
      var closestLabel = target.closest('label');
      var isOwnLabel = closestLabel && closestLabel.contains($opener);
      var hasSelectMenuOpen = !!$('.SelectMenu.is-open');

      if (isOutsideMenu && !isOwnLabel && !hasSelectMenuOpen) {
        onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "position", function () {
      var _this2$props2 = _this2.props,
          $opener = _this2$props2.$opener,
          menuX = _this2$props2.menuX,
          menuY = _this2$props2.menuY,
          menuBaseStyle = _this2$props2.menuBaseStyle,
          inflexible = _this2$props2.inflexible;

      var _assertThisInitialize = _assertThisInitialized(_this2),
          $menuBase = _assertThisInitialize.menuBaseRef.current;

      var _positionMenu = positionMenu({
        $menuBase: $menuBase,
        $opener: $opener,
        menuX: menuX,
        menuY: menuY,
        menuBaseStyle: menuBaseStyle,
        inflexible: inflexible
      }),
          isDownward = _positionMenu.isDownward;

      _this2.setState({
        isDownward: isDownward
      });
    });

    return _this2;
  }

  _createClass(DropdownMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props5 = this.props,
          isOpen = _this$props5.isOpen,
          shouldPreventScrollingPropagation = _this$props5.shouldPreventScrollingPropagation;
      var $menuBase = this.menuBaseRef.current;

      if (isOpen) {
        setTimeout(this.position);
      }

      if (shouldPreventScrollingPropagation) {
        preventScrollingPropagation($('.content', $menuBase));
      }

      window.addEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref6) {
      var wasOpen = _ref6.isOpen;
      var isOpen = this.props.isOpen; // Set up the position of the <DropdownMenu> once opened:

      if (!wasOpen && isOpen) {
        this.position();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      window.removeEventListener('resize', this.onResizeWindow);
    }
  }, {
    key: "render",
    value: function render() {
      var portal = this.portal,
          menu = this.menu;
      return /*#__PURE__*/createPortal(menu, portal);
    }
  }, {
    key: "menu",
    get: function get() {
      var _this$props6 = this.props,
          isOpen = _this$props6.isOpen,
          mode = _this$props6.mode,
          menuBaseClassName = _this$props6.menuBaseClassName,
          menuClassName = _this$props6.menuClassName,
          menu = _this$props6.menu,
          menuList = _this$props6.menuList,
          arrowed = _this$props6.arrowed,
          menuX = _this$props6.menuX,
          menuY = _this$props6.menuY,
          menuBasedX = _this$props6.menuBasedX,
          currentMenuListItemIdx = _this$props6.currentMenuListItemIdx,
          onSelect = _this$props6.onSelect;
      var isDownward = this.state.isDownward;
      var klass = trimList(['DropdownMenu', mode, isOpen && 'is-open', isDownward ? 'is-downward' : 'is-upward', "x-".concat(menuX), arrowed && "arrowed ".concat(menuBasedX ? 'x-menu-based' : 'x-arrow-based'), menuClassName]);
      return /*#__PURE__*/jsx("div", {
        ref: this.menuBaseRef,
        className: trimList(['DropdownMenuBase', menuBaseClassName]),
        children: /*#__PURE__*/jsxs("div", {
          className: klass,
          children: [arrowed && /*#__PURE__*/jsx("span", {
            className: "arrow",
            dangerouslySetInnerHTML: {
              __html: SVG.DROPDOWN_ARROW
            }
          }), /*#__PURE__*/jsx("div", {
            className: "content",
            children: menuList ? /*#__PURE__*/jsx("ul", {
              className: "MenuList",
              children: menuList.map(function (it, idx) {
                return /*#__PURE__*/jsx("li", {
                  role: "option",
                  "data-idx": idx,
                  className: trimList([it.isDisabled && 'is-disabled', idx === Number(currentMenuListItemIdx) && 'is-active']),
                  onClick: it.isDisabled ? undefined : onSelect,
                  children: it.label || it
                }, idx);
              })
            }) : menu
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onClick: this.onClickOutside
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onScroll: reactEventListener_cjs_1(this.position, {
              capture: true
            })
          })]
        })
      });
    }
  }]);

  return DropdownMenu;
}(PureComponent);

_defineProperty(DropdownMenu, "propTypes", _objectSpread(_objectSpread({}, Dropdown.propTypes), {}, {
  isOpen: PropTypes.bool,
  $opener: PropTypes.instanceOf(Element),
  onSelect: PropTypes.func,
  onClose: PropTypes.func
}));

export default Dropdown;
export { positionMenu };
