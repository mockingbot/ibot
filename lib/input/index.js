import React from 'react';
import PropTypes from 'prop-types';
import { trimList } from '../util';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function createOnChangeHandler(onChange) {
  return function (e) {
    return onChange(e.target.value, e);
  };
}
/**
 * <Input>
 */


function Input(_ref) {
  var size = _ref.size,
      theme = _ref.theme,
      isInvalid = _ref.isInvalid,
      unstyled = _ref.unstyled,
      className = _ref.className,
      value = _ref.value,
      type = _ref.type,
      onChange = _ref.onChange,
      others = _objectWithoutProperties(_ref, ["size", "theme", "isInvalid", "unstyled", "className", "value", "type", "onChange"]);

  var klass = trimList([theme === 'core' ? 'CoreInput' : 'Input', size, unstyled && 'unstyled', isInvalid && 'is-invalid', className]);
  return /*#__PURE__*/React.createElement("label", {
    className: klass
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: createOnChangeHandler(onChange)
  }, others)));
}
Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  unstyled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};
Input.defaultProps = {
  type: 'text',
  size: 'regular',
  theme: 'plain',
  onChange: function onChange() {
    return null;
  }
};
/**
 * <Textarea>
 */

function Textarea(_ref2) {
  var size = _ref2.size,
      theme = _ref2.theme,
      unstyled = _ref2.unstyled,
      className = _ref2.className,
      value = _ref2.value,
      onChange = _ref2.onChange,
      others = _objectWithoutProperties(_ref2, ["size", "theme", "unstyled", "className", "value", "onChange"]);

  var klass = trimList([theme === 'core' ? 'CoreTextarea' : 'Textarea', size, unstyled && 'unstyled', className]);
  return /*#__PURE__*/React.createElement("label", {
    className: klass
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    value: value,
    onChange: createOnChangeHandler(onChange)
  }, others)));
}
Textarea.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['regular', 'small']),
  theme: PropTypes.oneOf(['core', 'plain']),
  unstyled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};
Textarea.defaultProps = {
  size: 'regular',
  theme: 'plain',
  onChange: function onChange() {
    return null;
  }
};

export default Input;
export { Textarea };
