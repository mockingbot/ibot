import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import isEqual from 'lodash/isEqual';
import { EMAIL_REGEX, trimList, getOtherProps } from '../util';

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
