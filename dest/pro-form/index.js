"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/col/style/css");

var _col = _interopRequireDefault(require("antd/lib/col"));

require("antd/lib/time-picker/style/css");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/space/style/css");

var _space = _interopRequireDefault(require("antd/lib/space"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var Option = _select["default"].Option;
var RangePicker = _datePicker["default"].RangePicker; // interface formPropsTpe {
//     search?: any,
//     config?: any,
//     layoutConfig?: any
// }
// interface propsType {
//     formProps?: any,
//     circle: Boolean,
//     submit: (any) => void
// }

var tailLayout = {// wrapperCol: {
  //     // offset: 8,
  //     span: 24,
  // },
  // labelCol: {
  //     span: 24,
  //     flex: 2
  // }
};

var _default = /*#__PURE__*/(0, _react.memo)(function (props) {
  var _formProps$config, _formProps$config$res, _formProps$config2, _formProps$config2$su;

  var _Form$useForm = _form["default"].useForm(),
      _Form$useForm2 = (0, _slicedToArray2["default"])(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var formProps = props.formProps,
      submit = props.submit,
      circle = props.circle;
  /**
   * 表单提交， 提交时会过滤空值
   * @param {Object} values 
   */

  var onFinish = function onFinish(values) {
    var FormFields = form.getFieldsValue();
    var fields = {};

    for (var key in FormFields) {
      if (FormFields[key] !== undefined && FormFields[key] !== '') {
        fields[key] = FormFields[key];
      }
    }

    submit(fields);
  };
  /**
   * 表单重置
   */


  var onReset = function onReset() {
    form.resetFields();
  };

  return /*#__PURE__*/_react["default"].createElement(_form["default"], (0, _extends2["default"])({
    layout: "inline",
    form: form,
    name: "control-hooks",
    onFinish: onFinish
  }, formProps === null || formProps === void 0 ? void 0 : formProps.layoutConfig, {
    className: "pro-table-form-wrap ".concat(circle ? 'pro-table-form-circle' : '')
  }), (formProps === null || formProps === void 0 ? void 0 : formProps.search) && renderForm(formProps.search), /*#__PURE__*/_react["default"].createElement(_form["default"].Item, (0, _extends2["default"])({}, tailLayout, {
    className: "form-footer"
  }), /*#__PURE__*/_react["default"].createElement(_space["default"], null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    htmlType: "button",
    onClick: onReset,
    className: "btn-default"
  }, (formProps === null || formProps === void 0 ? void 0 : (_formProps$config = formProps.config) === null || _formProps$config === void 0 ? void 0 : (_formProps$config$res = _formProps$config.reset) === null || _formProps$config$res === void 0 ? void 0 : _formProps$config$res.text) || '重置'), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "primary",
    htmlType: "submit",
    className: "btn-primary"
  }, (formProps === null || formProps === void 0 ? void 0 : (_formProps$config2 = formProps.config) === null || _formProps$config2 === void 0 ? void 0 : (_formProps$config2$su = _formProps$config2.submit) === null || _formProps$config2$su === void 0 ? void 0 : _formProps$config2$su.text) || '查询'))));
});
/**
 * 渲染搜索表单
 * @param {Array} search 表单配置数组
 */


exports["default"] = _default;

var renderForm = function renderForm(search) {
  /**
   * 渲染input类型
   * @param {String} type input类型 
   * @param {Object} searchProps input配置项 
   */
  var renderFormEle = function renderFormEle(type, searchProps) {
    type = type.toLowerCase();
    var ele = null;

    switch (type) {
      case 'input':
        ele = /*#__PURE__*/_react["default"].createElement(_input["default"], (0, _extends2["default"])({
          allowClear: true
        }, searchProps));
        break;

      case 'select':
        ele = /*#__PURE__*/_react["default"].createElement(_select["default"], (0, _extends2["default"])({
          allowClear: true
        }, searchProps), searchProps["enum"].map(function (item) {
          return /*#__PURE__*/_react["default"].createElement(Option, {
            value: item.value,
            key: item.value
          }, item.label);
        }));
        break;

      case 'rangepicker':
        ele = /*#__PURE__*/_react["default"].createElement(RangePicker, (0, _extends2["default"])({
          allowClear: true
        }, searchProps));
        break;

      case 'timepicker ':
        ele = /*#__PURE__*/_react["default"].createElement(_timePicker["default"], (0, _extends2["default"])({
          allowClear: true
        }, searchProps));
        break;

      default:
        ele = /*#__PURE__*/_react["default"].createElement(_input["default"], (0, _extends2["default"])({
          allowClear: true
        }, searchProps));
    }

    return ele;
  };

  return search.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_col["default"], (0, _extends2["default"])({
      key: item.wrap.name,
      xs: 24,
      sm: 24,
      xl: 8
    }, item.wrap.col), /*#__PURE__*/_react["default"].createElement(_form["default"].Item, (0, _extends2["default"])({
      colon: false
    }, item.wrap), renderFormEle(item.wrap.type, item.props)));
  });
};