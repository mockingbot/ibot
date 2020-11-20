import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsx, jsxs } from 'react/jsx-runtime';
import react, { isValidElement, cloneElement, Fragment, PureComponent } from 'react';
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
import isEqual from 'lodash/isEqual';
import Button from '../button';
import Icon from '../icon';
import { preparePortal, trimList, SVG } from '../util';
import { positionMenu } from '../dropdown';

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

var _window = window,
    _window$I18N = _window.I18N,
    I18N = _window$I18N === void 0 ? {} : _window$I18N;
var GUIDE_ROOT_ID = 'IBOT_GUIDE_GUIDE_ROOT';
var $guideRoot = document.getElementById(GUIDE_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: GUIDE_ROOT_ID
});
var $body = document.body;

if (!$body.contains($guideRoot)) {
  $body.appendChild($guideRoot);
}

var GuideBase = /*#__PURE__*/function (_PureComponent) {
  _inherits(GuideBase, _PureComponent);

  var _super = _createSuper(GuideBase);

  function GuideBase() {
    var _this;

    _classCallCheck(this, GuideBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      isDownward: _this.props.Y === 'bottom'
    });

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($guideRoot, 'GuidePortal'));

    _defineProperty(_assertThisInitialized(_this), "position", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          $base = _assertThisInitialize.$base,
          $guide = _assertThisInitialize.$guide;

      var _this$props = _this.props,
          X = _this$props.X,
          Y = _this$props.Y,
          inflexible = _this$props.inflexible;

      var _positionMenu = positionMenu({
        $menuBase: $guide,
        $opener: $base,
        menuX: X,
        menuY: Y,
        inflexible: inflexible
      }),
          isDownward = _positionMenu.isDownward;

      _this.setState({
        isDownward: isDownward
      });
    });

    _defineProperty(_assertThisInitialized(_this), "set$base", function ($base) {
      return Object.assign(_assertThisInitialized(_this), {
        $base: $base
      });
    });

    _defineProperty(_assertThisInitialized(_this), "set$guide", function ($guide) {
      return Object.assign(_assertThisInitialized(_this), {
        $guide: $guide
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isOpen: false
      }, _this.props.onClose);
    });

    _defineProperty(_assertThisInitialized(_this), "onScrollOutside", _this.position);

    return _this;
  }

  _createClass(GuideBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.state.isOpen;
      if (isOpen) this.position();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref) {
      var wasOpen = _ref.isOpen;
      var isOpen = this.state.isOpen;

      if (!wasOpen && isOpen) {
        this.position();
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
      var _this$props$children = this.props.children,
          children = _this$props$children === void 0 ? null : _this$props$children;
      var base = /*#__PURE__*/isValidElement(children) ? /*#__PURE__*/cloneElement(children, {
        ref: this.set$base
      }) : /*#__PURE__*/jsx("span", {
        ref: this.set$base,
        children: children
      });
      var guide = /*#__PURE__*/createPortal(this.renderGuide(), this.portal);
      return /*#__PURE__*/jsxs(Fragment, {
        children: [base, guide]
      });
    }
  }, {
    key: "renderGuide",
    value: function renderGuide() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          noCloseBtn = _this$props2.noCloseBtn,
          X = _this$props2.X,
          header = _this$props2.header,
          gotItText = _this$props2.gotItText,
          gotItBtn = _this$props2.gotItBtn,
          guide = _this$props2.guide;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isDownward = _this$state.isDownward;
      var klass = trimList(['Guide', isOpen && 'is-open', isDownward ? 'is-downward' : 'is-upward', "x-".concat(X), className]);
      return /*#__PURE__*/jsx("div", {
        className: "GuideBase",
        ref: this.set$guide,
        children: /*#__PURE__*/jsxs("div", {
          className: klass,
          children: [/*#__PURE__*/jsx("span", {
            className: "arrow",
            dangerouslySetInnerHTML: {
              __html: SVG.GUIDE_ARROW
            }
          }), /*#__PURE__*/jsxs("div", {
            className: "content",
            children: [header && /*#__PURE__*/jsx("header", {
              children: header
            }), !noCloseBtn && /*#__PURE__*/jsx("button", {
              className: "close-btn",
              onClick: this.close,
              children: /*#__PURE__*/jsx(Icon, {
                name: "times_fc",
                type: "dora"
              })
            }), guide, gotItBtn && /*#__PURE__*/jsx("footer", {
              children: /*#__PURE__*/jsx(Button, {
                type: "text",
                onClick: this.close,
                children: gotItText
              })
            })]
          }), isOpen && /*#__PURE__*/jsx(EventListener, {
            target: document,
            onScroll: reactEventListener_cjs_1(this.onScrollOutside, {
              capture: true
            })
          })]
        })
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps,
          isOpen = _ref2.isOpen;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isOpen: props.isOpen
        };
      }

      return null;
    }
  }]);

  return GuideBase;
}(PureComponent);

_defineProperty(GuideBase, "propTypes", {
  isOpen: PropTypes.bool,
  header: PropTypes.any,
  noCloseBtn: PropTypes.bool,
  gotItBtn: PropTypes.bool,
  onClose: PropTypes.func,
  gotItText: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  guide: PropTypes.any,
  X: PropTypes.oneOf(['left', 'center', 'right']),
  Y: PropTypes.oneOf(['top', 'bottom']),
  inflexible: PropTypes.bool
});

_defineProperty(GuideBase, "defaultProps", {
  isOpen: false,
  noCloseBtn: false,
  iKonwBtn: false,
  onClose: function onClose() {
    return null;
  },
  gotItText: I18N.iknow || 'Got it!',
  X: 'left',
  Y: 'bottom',
  inflexible: false
});

export default GuideBase;
