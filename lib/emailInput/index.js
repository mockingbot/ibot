import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import react, { PureComponent } from 'react';
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
import { EMAIL_REGEX, trimList, getOtherProps } from '../util';

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

var checkFinishedTyping = function checkFinishedTyping(v) {
  return /^@/.test(v) || /@\./.test(v) || /\s+[\w@]/.test(v) || /@\w*\.\w*/.test(v) || /@\w*@/.test(v);
};

var InputEmail = /*#__PURE__*/function (_PureComponent) {
  _inherits(InputEmail, _PureComponent);

  var _super = _createSuper(InputEmail);

  function InputEmail() {
    var _this;

    _classCallCheck(this, InputEmail);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      value: _this.props.value,
      isActive: false,
      isValid: true,
      isFinishedTyping: checkFinishedTyping(_this.props.value)
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;

      _this.setState({
        value: value,
        isFinishedTyping: checkFinishedTyping(value)
      }, function () {
        var onChange = _this.props.onChange;

        _this.checkValidity();

        onChange(value.trim(), e);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkValidity", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          isFinishedTyping = _this$state.isFinishedTyping;
      var isValid = value === '' || !isFinishedTyping ? true : EMAIL_REGEX.test(value);

      _this.setState({
        isValid: isValid
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setActive", function () {
      return _this.setState({
        isActive: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setInactive", function () {
      return _this.setState({
        isActive: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickOutside", function (_ref) {
      var target = _ref.target;

      if (!target.closest('label')) {
        _this.setInactive();
      }
    });

    return _this;
  }

  _createClass(InputEmail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          size = _this$props.size,
          theme = _this$props.theme,
          unstyled = _this$props.unstyled,
          readOnly = _this$props.readOnly,
          placeholder = _this$props.placeholder,
          onFocus = _this$props.onFocus;
      var _this$state2 = this.state,
          value = _this$state2.value,
          isActive = _this$state2.isActive,
          isValid = _this$state2.isValid;
      var isDisabled = this.props.isDisabled || this.props.disabled;
      var klass = trimList([theme === 'core' ? 'CoreInput CoreInputEmail' : 'Input InputEmail', size, unstyled && 'unstyled', className, isActive && !isDisabled && !readOnly && 'is-active', isDisabled && 'is-disabled', readOnly && 'is-readonly', isValid ? 'is-valid' : 'isnt-valid']);
      return /*#__PURE__*/jsxs("label", {
        className: klass,
        onMouseDown: this.setActive,
        children: [/*#__PURE__*/jsx("input", _objectSpread({
          type: "email",
          value: value,
          placeholder: placeholder,
          disabled: isDisabled,
          readOnly: readOnly,
          onChange: this.onChange,
          onFocus: onFocus
        }, getOtherProps(this.constructor, this.props))), isActive && /*#__PURE__*/jsx(EventListener, {
          target: document,
          onClick: this.onClickOutside
        })]
      });
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

  return InputEmail;
}(PureComponent);

_defineProperty(InputEmail, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  unstyled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  className: PropTypes.string
});

_defineProperty(InputEmail, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  unstyled: false,
  value: '',
  placeholder: '',
  isDisabled: false,
  disabled: false,
  readOnly: false,
  onChange: function onChange() {
    return null;
  }
});

export default InputEmail;
