import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { jsx } from 'react/jsx-runtime';
import PropTypes from 'prop-types';
import { trimList } from '../util';

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
  return /*#__PURE__*/jsx("label", {
    className: klass,
    children: /*#__PURE__*/jsx("input", _objectSpread({
      type: type,
      value: value,
      onChange: createOnChangeHandler(onChange)
    }, others))
  });
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
  return /*#__PURE__*/jsx("label", {
    className: klass,
    children: /*#__PURE__*/jsx("textarea", _objectSpread({
      value: value,
      onChange: createOnChangeHandler(onChange)
    }, others))
  });
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
