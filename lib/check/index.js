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
import Icon from '../icon';
import { trimList, convertValueListToSet, getOptionValue, getOptionLabel, checkOptionByValueList } from '../util';

/**
 * <Check>
 */

var Check = /*#__PURE__*/function (_PureComponent) {
  _inherits(Check, _PureComponent);

  var _super = _createSuper(Check);

  function Check() {
    var _this;

    _classCallCheck(this, Check);

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
          onChange = _this$props.onChange,
          onToggle = _this$props.onToggle;
      var isChecked = _this.state.isChecked;

      var _assertThisInitialize = _assertThisInitialized(_this),
          canToggle = _assertThisInitialize.canToggle;

      var willBeChecked = canToggle ? !isChecked : isChecked;

      _this.setState({
        isChecked: willBeChecked
      });

      onToggle(willBeChecked, name, value || label);
      onChange(name, value || label, willBeChecked);
    });

    return _this;
  }

  _createClass(Check, [{
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
        className: trimList([theme === 'core' ? 'CoreCheck' : 'Check', size, className, isChecked && 'is-checked', isDisabled && 'is-disabled', readOnly && 'readonly']),
        children: [/*#__PURE__*/jsx("input", {
          type: "checkbox",
          defaultChecked: isChecked,
          disabled: isDisabled,
          name: name,
          onChange: this.onToggle
        }), /*#__PURE__*/jsx("span", {
          className: "Check-state",
          children: /*#__PURE__*/jsx(Icon, {
            type: "dora",
            name: "check"
          })
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

  return Check;
}(PureComponent);
/**
 * <CheckGroup>
 */


_defineProperty(Check, "propTypes", {
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string
});

_defineProperty(Check, "defaultProps", {
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
var CheckGroup = /*#__PURE__*/function (_PureComponent2) {
  _inherits(CheckGroup, _PureComponent2);

  var _super2 = _createSuper(CheckGroup);

  function CheckGroup() {
    var _this2;

    _classCallCheck(this, CheckGroup);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "name", _this2.props.name || Math.random().toString(36).substring(2, 15));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      prevProps: _this2.props,
      valueList: convertValueListToSet(_this2.props.valueList)
    });

    _defineProperty(_assertThisInitialized(_this2), "createOnChangeHandler", function (name, opt) {
      return function () {
        var _this2$props = _this2.props,
            optionList = _this2$props.optionList,
            onToggle = _this2$props.onToggle,
            onChange = _this2$props.onChange;
        var valueList = _this2.state.valueList;

        var _assertThisInitialize2 = _assertThisInitialized(_this2),
            canToggle = _assertThisInitialize2.canToggle;

        if (!canToggle) {
          var currentValueList = Array.from(valueList);
          var currentIdxList = currentValueList.map(function (v) {
            return optionList.findIndex(function (o) {
              return getOptionValue(o) === v;
            });
          });
          onToggle(currentValueList, name);
          onChange({
            name: name,
            valueList: currentValueList,
            idxList: currentIdxList
          });
          return;
        }

        var resultValueList = new Set(valueList);
        var optionValue = getOptionValue(opt);
        var toggleAction = resultValueList.has(optionValue) ? 'delete' : 'add';
        resultValueList[toggleAction](optionValue);
        var nextValueList = Array.from(resultValueList);
        var nextIdxList = nextValueList.map(function (v) {
          return optionList.findIndex(function (o) {
            return getOptionValue(o) === v;
          });
        });

        _this2.setState({
          valueList: resultValueList
        });

        onToggle(nextValueList, name);
        onChange({
          name: name,
          valueList: nextValueList,
          idxList: nextIdxList
        });
      };
    });

    return _this2;
  }

  _createClass(CheckGroup, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          size = _this$props4.size,
          theme = _this$props4.theme,
          className = _this$props4.className,
          optionList = _this$props4.optionList;
      var valueList = this.state.valueList;
      var name = this.name,
          isDisabled = this.isDisabled,
          readOnly = this.readOnly;
      var klass = trimList([theme === 'core' ? 'CoreCheckGroup' : 'CheckGroup', size, className, isDisabled && 'is-disabled', readOnly && 'readonly']);
      return /*#__PURE__*/jsx("span", {
        className: klass,
        children: optionList.map(function (opt, idx) {
          return opt && /*#__PURE__*/jsx(Check, {
            name: name,
            label: getOptionLabel(opt),
            size: size,
            theme: theme,
            isDisabled: isDisabled || opt.isDisabled,
            readOnly: readOnly,
            isChecked: checkOptionByValueList(opt, valueList),
            onChange: !(isDisabled || opt.isDisabled) ? _this3.createOnChangeHandler(name, opt) : undefined
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
          valueList = _ref2.valueList;

      if (!isEqual(prevProps, props)) {
        return {
          prevProps: props,
          valueList: props.valueList
        };
      }

      return null;
    }
  }]);

  return CheckGroup;
}(PureComponent);

_defineProperty(CheckGroup, "propTypes", {
  name: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
    label: PropTypes.any,
    value: PropTypes.any,
    isDisabled: PropTypes.bool
  })])).isRequired,
  valueList: PropTypes.oneOfType([PropTypes.instanceOf(Set), PropTypes.array]),
  isDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
});

_defineProperty(CheckGroup, "defaultProps", {
  size: 'regular',
  theme: 'plain',
  className: '',
  optionList: [],
  onChange: function onChange() {
    return null;
  },
  onToggle: function onToggle() {
    return null;
  },
  isDisabled: false
});

export default Check;
export { CheckGroup };
