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
import { trimList, getOptionLabel, checkOptionByValue, getOptionValue } from '../util';

/**
 * <Radio>
 */

var Radio = /*#__PURE__*/function (_PureComponent) {
  _inherits(Radio, _PureComponent);

  var _super = _createSuper(Radio);

  function Radio() {
    var _this;

    _classCallCheck(this, Radio);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      prevProps: _this.props,
      isChecked: _this.props.isChecked
    });

    _defineProperty(_assertThisInitialized(_this), "onToggle", function () {
      var _this$props = _this.props,
          name = _this$props.name,
          value = _this$props.value,
          label = _this$props.label,
          onToggle = _this$props.onToggle,
          onChange = _this$props.onChange;
      var isChecked = _this.state.isChecked;

      var _assertThisInitialize = _assertThisInitialized(_this),
          canToggle = _assertThisInitialize.canToggle;

      var result = canToggle ? true : isChecked;

      _this.setState({
        isChecked: result
      });

      onToggle(result, name, value || label);
      onChange(name, value || label, result);
    });

    return _this;
  }

  _createClass(Radio, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          size = _this$props2.size,
          theme = _this$props2.theme,
          className = _this$props2.className,
          label = _this$props2.label,
          name = _this$props2.name;
      var isChecked = this.state.isChecked;
      var isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      return /*#__PURE__*/jsxs("label", {
        className: trimList([theme === 'core' ? 'CoreRadio' : 'Radio', size, className, isChecked && 'is-checked', isDisabled && 'is-disabled', readOnly && 'readonly']),
        children: [/*#__PURE__*/jsx("input", {
          type: "radio",
          defaultChecked: isChecked,
          disabled: isDisabled,
          name: name,
          onClick: this.onToggle
        }), /*#__PURE__*/jsx("span", {
          className: "Check-state"
        }), /*#__PURE__*/jsx("span", {
          className: "Check-label",
          children: label
        })]
      });
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var _this$props3 = this.props,
          isDisabled = _this$props3.isDisabled,
          disabled = _this$props3.disabled;
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
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps,
          isChecked = _ref.isChecked;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          isChecked: props.isChecked
        };
      }

      return null;
    }
  }]);

  return Radio;
}(PureComponent);
/**
 * <RadioGroup>
 */


_defineProperty(Radio, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  className: PropTypes.string,
  label: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
});

_defineProperty(Radio, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  isChecked: false,
  label: '',
  className: '',
  onChange: function onChange() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  }
});
var RadioGroup = /*#__PURE__*/function (_PureComponent2) {
  _inherits(RadioGroup, _PureComponent2);

  var _super2 = _createSuper(RadioGroup);

  function RadioGroup() {
    var _this2;

    _classCallCheck(this, RadioGroup);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "name", _this2.props.name || Math.random().toString(36).substring(2, 15));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      prevProps: _this2.props,
      value: _this2.props.value
    });

    _defineProperty(_assertThisInitialized(_this2), "createOnChangeHandler", function (name, value, idx) {
      return function () {
        var _this2$props = _this2.props,
            onToggle = _this2$props.onToggle,
            onChange = _this2$props.onChange;
        var originalValue = _this2.state.value;

        var _assertThisInitialize2 = _assertThisInitialized(_this2),
            canToggle = _assertThisInitialize2.canToggle;

        var result = canToggle ? value : originalValue;

        _this2.setState({
          value: result
        });

        onToggle(result, name);
        onChange({
          name: name,
          value: result,
          idx: idx
        });
      };
    });

    return _this2;
  }

  _createClass(RadioGroup, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          size = _this$props4.size,
          theme = _this$props4.theme,
          className = _this$props4.className,
          optionList = _this$props4.optionList;
      var value = this.state.value;
      var name = this.name,
          isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      var klass = trimList([theme === 'core' ? 'CoreRadioGroup' : 'RadioGroup', size, className, isDisabled && 'is-disabled', readOnly && 'readonly']);
      return /*#__PURE__*/jsx("span", {
        className: klass,
        children: optionList.map(function (opt, idx) {
          return opt && /*#__PURE__*/jsx(Radio, {
            name: name,
            size: size,
            theme: theme,
            label: getOptionLabel(opt),
            type: "radio",
            isChecked: checkOptionByValue(opt, value),
            isDisabled: isDisabled || opt.isDisabled,
            readOnly: readOnly,
            onChange: !(isDisabled || opt.isDisabled) ? _this3.createOnChangeHandler(name, getOptionValue(opt), idx) : undefined
          }, idx);
        })
      });
    }
  }, {
    key: "isDisabled",
    get: function get() {
      var _this$props5 = this.props,
          isDisabled = _this$props5.isDisabled,
          disabled = _this$props5.disabled;
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

  return RadioGroup;
}(PureComponent);

_defineProperty(RadioGroup, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  className: PropTypes.string,
  name: PropTypes.string,
  optionList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
    label: PropTypes.any,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })])).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
});

_defineProperty(RadioGroup, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  className: '',
  optionList: [],
  onChange: function onChange() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  }
});

export default Radio;
export { RadioGroup };
