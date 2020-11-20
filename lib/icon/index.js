import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { jsx } from 'react/jsx-runtime';
import PropTypes from 'prop-types';
import { trimList } from '../util';

var duoList = [
	{
		id: "save",
		layer: [
			"arrow",
			"cloud"
		]
	},
	{
		id: "inspect",
		layer: [
			"slash",
			"bracket"
		]
	},
	{
		id: "play",
		layer: [
			"arrow",
			"circle"
		]
	},
	{
		id: "evenly_distribute_h",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "evenly_distribute_v",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_bottom",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_center",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_left",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_right",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_top",
		layer: [
			"indicator",
			"object"
		]
	},
	{
		id: "widget_align_v_center",
		layer: [
			"indicator",
			"object"
		]
	}
];

var ICON_SET_LIST = ['dora', 'mb', 'icon', 'fa', 'md', 'ci'];
var LIGA_ICON_SET_LIST = ['dora', 'md'];

var checkIfIconIsLiga = function checkIfIconIsLiga(type) {
  return LIGA_ICON_SET_LIST.includes(type);
};

function Icon(_ref) {
  var _ref$name = _ref.name,
      propName = _ref$name === void 0 ? '' : _ref$name,
      type = _ref.type,
      className = _ref.className,
      others = _objectWithoutProperties(_ref, ["name", "type", "className"]);

  var prefix = type === 'mb' ? 'icon' : type;
  var name = propName.replace(new RegExp("^(".concat(ICON_SET_LIST.join('|'), ")-"), 'i'), '');
  var isLiga = checkIfIconIsLiga(type);
  return /*#__PURE__*/jsx("span", _objectSpread(_objectSpread({
    className: trimList(['icon', type, !isLiga && "".concat(prefix, "-").concat(name), className])
  }, others), {}, {
    children: isLiga && name
  }));
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string
};
Icon.defaultProps = {
  name: '',
  type: 'icon'
};
var DUO_ICON_NAME_MAP = {
  dora: 'duodora'
};

function DuoIcon(_ref2) {
  var name = _ref2.name,
      type = _ref2.type,
      className = _ref2.className,
      colorList = _ref2.colorList,
      others = _objectWithoutProperties(_ref2, ["name", "type", "className", "colorList"]);

  var icon = duoList.find(function (_ref3) {
    var id = _ref3.id;
    return id === name;
  });
  return !!icon && /*#__PURE__*/jsx("span", _objectSpread(_objectSpread({
    className: trimList(['duo-icon', DUO_ICON_NAME_MAP[type], className])
  }, others), {}, {
    children: icon.layer.map(function (l, idx) {
      return /*#__PURE__*/jsx("span", {
        className: "layer",
        style: {
          color: colorList[idx]
        },
        children: "".concat(name, "__").concat(l)
      }, l);
    })
  }));
}

DuoIcon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(DUO_ICON_NAME_MAP)),
  className: PropTypes.string,
  colorList: PropTypes.array
};
DuoIcon.defaultProps = {
  name: '',
  type: 'dora',
  colorList: []
};
Icon.DuoIcon = DuoIcon;

export default Icon;
