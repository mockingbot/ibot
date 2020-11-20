import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { jsxs, jsx } from 'react/jsx-runtime';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { trimList } from '../util';

var Switch = /*#__PURE__*/function (_PureComponent) {
  _inherits(Switch, _PureComponent);

  var _super = _createSuper(Switch);

  function Switch() {
    var _this;

    _classCallCheck(this, Switch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isChecked: _this.props.isChecked
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function (_ref) {
      var $btn = _ref.target;
      var onChange = _this.props.onChange;
      var isChecked = _this.state.isChecked;

      var _assertThisInitialize = _assertThisInitialized(_this),
          isDisabled = _assertThisInitialize.isDisabled,
          canToggle = _assertThisInitialize.canToggle;

      var newChecked = canToggle ? !isChecked : isChecked;
      $btn.blur();

      _this.setState({
        isChecked: newChecked
      });

      return !isDisabled && onChange(newChecked);
    });

    return _this;
  }

  _createClass(Switch, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          readOnly = _this$props.readOnly,
          children = _this$props.children;
      var isChecked = this.state.isChecked;
      var isDisabled = this.isDisabled;
      return /*#__PURE__*/jsxs("label", {
        className: trimList(['Switch', size, isChecked ? 'is-checked' : 'isnt-checked', isDisabled && 'is-disabled', readOnly && 'readonly']),
        children: [/*#__PURE__*/jsx("button", {
          type: "button",
          disabled: isDisabled,
          onClick: this.toggle
        }), children]
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
    key: "canToggle",
    get: function get() {
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      return !isDisabled && !readOnly;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref2) {
      var prevProps = _ref2.prevProps;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isChecked: props.isChecked
        };
      }

      return null;
    }
  }]);

  return Switch;
}(PureComponent);

_defineProperty(Switch, "propTypes", {
  className: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.any
});

_defineProperty(Switch, "defaultProps", {
  className: '',
  size: 'regular',
  isChecked: false,
  isDisabled: false,
  disabled: false,
  readOnly: false,
  onChange: function onChange() {
    return null;
  }
});

export default Switch;
