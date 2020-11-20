import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import react, { createRef, Fragment, PureComponent } from 'react';
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
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import Button, { PrimaryCoreButton, TertiaryCoreButton } from '../button';
import SVG from '../svg';
import Switch from '../switch';
import { preparePortal, trimList, addModalToStack, toggleGlobalScroll, deleteModalFromStack, checkNoOpenModalInStack, $, checkModalIndexInStack } from '../util';

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

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

var MODAL_ROOT_ID = 'IBOT_MODAL_ROOT';
var MODAL_PORTAL_CLASS = 'CoreModalPortal';
var I18N = get(window, 'I18N', {});
var $body = document.body;
var $modalRoot = document.getElementById(MODAL_ROOT_ID) || Object.assign(document.createElement('div'), {
  id: MODAL_ROOT_ID
});

if (!$body.contains($modalRoot)) {
  $body.appendChild($modalRoot);
}

var TYPE_CLASS_MAP = {
  alert: 'AlertCoreModal',
  form: 'FormCoreModal',
  functional: 'FunctionalCoreModal',
  display: 'DisplayCoreModal'
};

var CoreModal = /*#__PURE__*/function (_PureComponent) {
  _inherits(CoreModal, _PureComponent);

  var _super = _createSuper(CoreModal);

  function CoreModal() {
    var _this;

    _classCallCheck(this, CoreModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isOpen: _this.props.isOpen,
      isVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "portal", preparePortal($modalRoot, trimList([MODAL_PORTAL_CLASS, _this.props.portalClassName])));

    _defineProperty(_assertThisInitialized(_this), "maskRef", /*#__PURE__*/createRef());

    _defineProperty(_assertThisInitialized(_this), "didOpen", function () {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onToggle = _this$props.onToggle;

      var _assertThisInitialize = _assertThisInitialized(_this),
          $mask = _assertThisInitialize.maskRef.current;

      addModalToStack(_assertThisInitialized(_this));

      _this.positionY();

      toggleGlobalScroll(true);
      onOpen();
      onToggle(true);
    });

    _defineProperty(_assertThisInitialized(_this), "didClose", function () {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          onToggle = _this$props2.onToggle;
      onClose();
      onToggle(false);
      setTimeout(function () {
        // Remove from the stack in the next round:
        deleteModalFromStack(_assertThisInitialized(_this));

        if (checkNoOpenModalInStack()) {
          toggleGlobalScroll(false);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTransitionEnd", function (_ref) {
      var target = _ref.target;
      var isVisible = _this.state.isVisible;

      if (!isVisible && target.matches('.CoreModalMask')) {
        _this.setState({
          isOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      return _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      return _this.setState({
        isVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      var willBeOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.isOpen;
      return willBeOpen ? _this.open() : _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "positionY", function () {
      return setTimeout(function () {
        var type = _this.props.type;
        var $modal = $('.CoreModal', _this.portal);
        if (!$modal || type === 'alert') return;
        var _window = window,
            vh = _window.innerHeight;

        var _$modal$getBoundingCl = $modal.getBoundingClientRect(),
            h = _$modal$getBoundingCl.height;

        var action = vh <= h || (vh - h) / 2 < vh * 0.15 ? 'add' : 'remove';
        $modal.classList[action]('is-v-centered');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickMask", function (e) {
      stopPropagation(e);
      var _this$props3 = _this.props,
          canClose = _this$props3.canClose,
          canCloseOnClickMask = _this$props3.canCloseOnClickMask;
      var isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open');

      if (canClose && canCloseOnClickMask && !isSelectMenuOpen) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "confirm", function () {
      var _this$props4 = _this.props,
          onConfirm = _this$props4.onConfirm,
          shouldCloseOnAction = _this$props4.shouldCloseOnAction;

      if (onConfirm) {
        onConfirm();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "cancel", function () {
      var _this$props5 = _this.props,
          onCancel = _this$props5.onCancel,
          shouldCloseOnAction = _this$props5.shouldCloseOnAction;

      if (onCancel) {
        onCancel();
      }

      if (shouldCloseOnAction) {
        _this.close();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (_ref2) {
      var key = _ref2.key,
          $elmt = _ref2.target;
      var _this$props6 = _this.props,
          type = _this$props6.type,
          canClose = _this$props6.canClose,
          canCloseOnEsc = _this$props6.canCloseOnEsc,
          canConfirmOnEnter = _this$props6.canConfirmOnEnter,
          onConfirm = _this$props6.onConfirm,
          onCancel = _this$props6.onCancel;
      var isOpen = _this.state.isOpen;
      var isSelectMenuOpen = !!$('#IBOT_SELECT_MENU_ROOT .SelectMenu.is-open');

      if (key === 'Escape' && // Not focus on form elements:
      !$elmt.matches('input, textarea, select') && !isSelectMenuOpen && // Current modal is open and can close via esc:
      isOpen && canClose && canCloseOnEsc && !isSelectMenuOpen && // Only work on the toppest modal:
      checkModalIndexInStack(_assertThisInitialized(_this)) === 0) {
        if (onCancel) {
          _this.cancel();
        }

        return _this.close();
      }

      if (key === 'Enter' && // Not focus on form elements:
      !$elmt.matches('textarea, button') && !isSelectMenuOpen && // Current modal is open and can confirm via enter:
      isOpen && canConfirmOnEnter && // Only work on the toppest modal:
      checkModalIndexInStack(_assertThisInitialized(_this)) === 0 && // Only work whilst `onConfirm` callback is provided:
      !!onConfirm) {
        return _this.confirm();
      }
    });

    return _this;
  }

  _createClass(CoreModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props7 = this.props,
          onOpen = _this$props7.onOpen,
          onToggle = _this$props7.onToggle;
      var isOpen = this.state.isOpen;

      if (isOpen) {
        setTimeout(function () {
          return _this2.setState({
            isVisible: true
          }, _this2.didOpen);
        });
      }

      window.addEventListener('resize', this.positionY);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, _ref3) {
      var _this3 = this;

      var wasOpen = _ref3.isOpen;
      var isOpen = this.state.isOpen;

      if (!wasOpen && isOpen) {
        setTimeout(function () {
          return _this3.setState({
            isVisible: true
          }, _this3.didOpen);
        });
      } else if (wasOpen && !isOpen) {
        this.didClose();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.portal) this.portal.remove();
      this.didClose();
      window.removeEventListener('resize', this.positionY);
    }
  }, {
    key: "render",
    value: function render() {
      return this.opener;
    }
  }, {
    key: "opener",
    get: function get() {
      var _this$props8 = this.props,
          opener = _this$props8.opener,
          openerType = _this$props8.openerType;
      var isOpen = this.state.isOpen;
      var modal = this.modal;
      return openerType === 'none' ? modal : openerType === 'custom' ? opener ? /*#__PURE__*/jsxs("span", {
        onClick: this.toggle,
        children: [opener, modal]
      }) : modal : openerType === 'switch' ? /*#__PURE__*/jsx(Switch, {
        isChecked: isOpen,
        onChange: this.toggle,
        children: modal
      }) : /*#__PURE__*/jsxs(Button, {
        type: openerType,
        onClick: this.open,
        children: [opener, modal]
      });
    }
  }, {
    key: "modal",
    get: function get() {
      return /*#__PURE__*/createPortal(this.modalDOM, this.portal);
    }
  }, {
    key: "footer",
    get: function get() {
      var _this$props9 = this.props,
          onConfirm = _this$props9.onConfirm,
          onCancel = _this$props9.onCancel,
          confirmText = _this$props9.confirmText,
          cancelText = _this$props9.cancelText,
          isConfirmDisabled = _this$props9.isConfirmDisabled,
          isCancelDisabled = _this$props9.isCancelDisabled;
      var shouldRender = onConfirm || onCancel;
      return shouldRender && /*#__PURE__*/jsxs("footer", {
        children: [onConfirm && /*#__PURE__*/jsx(PrimaryCoreButton, {
          onClick: this.confirm,
          isDisabled: isConfirmDisabled,
          children: confirmText
        }), onCancel && /*#__PURE__*/jsx(TertiaryCoreButton, {
          onClick: this.cancel,
          isDisabled: isCancelDisabled,
          children: cancelText
        })]
      });
    }
  }, {
    key: "modalDOM",
    get: function get() {
      var _this$props10 = this.props,
          type = _this$props10.type,
          maskClassName = _this$props10.maskClassName,
          className = _this$props10.className,
          title = _this$props10.title,
          children = _this$props10.children,
          canClose = _this$props10.canClose,
          canCloseOnClickMask = _this$props10.canCloseOnClickMask;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isVisible = _this$state.isVisible;
      var footer = this.footer;
      return isOpen && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", {
          ref: this.maskRef,
          className: trimList(['CoreModalMask', maskClassName, isVisible && 'is-open', canClose && canCloseOnClickMask ? 'can-close' : 'cant-close']),
          onClick: this.onClickMask,
          onTransitionEnd: this.onTransitionEnd
        }), /*#__PURE__*/jsxs("div", {
          className: trimList(['CoreModal', TYPE_CLASS_MAP[type], className]),
          onTransitionEnd: stopPropagation,
          onClick: stopPropagation,
          children: [/*#__PURE__*/jsxs("header", {
            children: [title, canClose && /*#__PURE__*/jsx(Button, {
              type: "text",
              className: "close-btn",
              onClick: this.close,
              children: /*#__PURE__*/jsx(SVG, {
                name: "times",
                label: "Close the Modal"
              })
            })]
          }), /*#__PURE__*/jsx("div", {
            className: "content",
            children: children
          }), footer]
        }), /*#__PURE__*/jsx(EventListener, {
          target: document,
          onKeyDown: this.onKeyDown
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref4) {
      var prevProps = _ref4.prevProps,
          isOpen = _ref4.isOpen;

      if (!isEqual(prevProps, props)) {
        var willBeOpen = props.isOpen;

        if (isBoolean(willBeOpen)) {
          if (!isOpen && willBeOpen) {
            return {
              isOpen: true,
              prevProps: props
            };
          } else if (isOpen && !willBeOpen) {
            return {
              isVisible: false,
              prevProps: props
            };
          }
        }

        return {
          prevProps: props
        };
      }

      return null;
    }
  }]);

  return CoreModal;
}(PureComponent);

_defineProperty(CoreModal, "propTypes", {
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  children: PropTypes.node,
  modal: PropTypes.node,
  type: PropTypes.oneOf(['alert', 'form', 'functional', 'display']),
  opener: PropTypes.node,
  openerType: PropTypes.oneOf(['primary', 'regular', 'text', 'switch', 'custom', 'none']),
  className: PropTypes.string,
  maskClassName: PropTypes.string,
  portalClassName: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  canClose: PropTypes.bool,
  canCloseOnClickMask: PropTypes.bool,
  shouldCloseOnAction: PropTypes.bool,
  canCloseOnEsc: PropTypes.bool,
  canConfirmOnEnter: PropTypes.bool,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  isConfirmDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
  isCancelDisabled: PropTypes.bool,
  cancelText: PropTypes.string
});

_defineProperty(CoreModal, "defaultProps", {
  openerType: 'none',
  type: 'functional',
  onOpen: function onOpen() {
    return null;
  },
  onClose: function onClose() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  },
  canClose: true,
  canCloseOnClickMask: true,
  shouldCloseOnAction: true,
  canCloseOnEsc: true,
  canConfirmOnEnter: true,
  cancelText: I18N.cancel || 'Cancel',
  confirmText: I18N.confirm || 'Confirm'
});

export default CoreModal;
