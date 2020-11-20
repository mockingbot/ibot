import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import { jsxs, jsx } from 'react/jsx-runtime';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { trimList } from '../util';

/**
 * <FormEntry>
 */

function FormEntry(_ref) {
  var className = _ref.className,
      key = _ref.name,
      val = _ref.children,
      type = _ref.type,
      isLabel = _ref.isLabel,
      isRequired = _ref.isRequired;
  return /*#__PURE__*/React.createElement(isLabel ? 'label' : 'div', {
    className: trimList(['FormEntry', className]),
    type: type
  }, /*#__PURE__*/jsxs(Fragment, {
    children: [key && /*#__PURE__*/jsxs("span", {
      className: "FormEntry-Key key",
      children: [key, isRequired && /*#__PURE__*/jsx("span", {
        className: "required-sign",
        children: "*"
      })]
    }), /*#__PURE__*/jsx("span", {
      className: "FormEntry-Val val",
      children: val
    })]
  }));
}
FormEntry.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.any,
  type: PropTypes.string,
  isLabel: PropTypes.bool,
  isRequired: PropTypes.bool
};
FormEntry.defaultProps = {
  className: '',
  isLabel: false
};
/**
 * <FormLabel>
 */

function FormLabel(props) {
  return /*#__PURE__*/jsx(FormEntry, _objectSpread(_objectSpread({}, props), {}, {
    isLabel: true
  }));
}

export default FormEntry;
export { FormLabel };
