import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import { createRef, Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import Button, { PrimaryCoreButton, TertiaryCoreButton } from '../button';
import SVG from '../svg';
import Switch from '../switch';
import { preparePortal, trimList, addModalToStack, toggleGlobalScroll, deleteModalFromStack, checkNoOpenModalInStack, $, checkModalIndexInStack } from '../util';

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
