"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./pro-form/index.js"));

var _ProTableHeader = _interopRequireDefault(require("./pro-table/Pro-table-header.js"));

require("./index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var tableDataDefault = {
  list: [],
  page: 1,
  page_size: 10
};
var reqDataDefault = {
  //请求参数
  page: 1,
  page_size: 10,
  search: {},
  sort: {}
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

var _default = /*#__PURE__*/(0, _react.memo)(function (props) {
  var tabs = props.tabs,
      title = props.title,
      tableTools = props.tableTools,
      preSubmit = props.preSubmit,
      requestData = props.requestData,
      request = props.request;

  var _useState = (0, _react.useState)(tableDataDefault),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1]; //表格数据


  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selectRows = _useState4[0],
      setSelectRows = _useState4[1]; // 被选中的行数据对象数组


  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      selectRowKeys = _useState6[0],
      setSelectRowKeys = _useState6[1]; // 被选中行的keys


  var _useState7 = (0, _react.useState)(_objectSpread(_objectSpread({}, reqDataDefault), requestData)),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      reqData = _useState8[0],
      setReqData = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      loading = _useState10[0],
      setLoading = _useState10[1]; //loading

  /**
   * 请求数据
   */


  (0, _react.useEffect)(function () {
    console.log('reqData');
    initData();
  }, [reqData, props.reset]);
  /**
   * 初始化请求
   * @param data 请求参数，默认为
   */

  var initData = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var data,
          res,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _args.length > 0 && _args[0] !== undefined ? _args[0] : reqData;
              !loading && setLoading(true);
              _context.next = 4;
              return request({
                url: props.url,
                method: 'post',
                data: data
              });

            case 4:
              res = _context.sent;

              if (res.code === 0) {
                setTableData(_objectSpread(_objectSpread({}, tableData), res.data));
              } else {
                _message2["default"].warning(res.msg || '请求超时');
              }

              setLoading(false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function initData() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * 表单搜索
   * 此处可过滤数据并可等待其中异步操作，所以此过滤需要返回一个promise
   */


  var submit = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(values) {
      var submitValue;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              submitValue = _objectSpread(_objectSpread({}, reqData), {}, {
                search: values
              });

              if (!(typeof preSubmit === 'function')) {
                _context2.next = 6;
                break;
              }

              _context2.next = 4;
              return preSubmit(submitValue);

            case 4:
              submitValue = _context2.sent;
              console.log('submitValue', submitValue);

            case 6:
              setReqData(submitValue);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * 分页器事件
   * @param page 
   * @param page_size 
   */


  var handlePageChange = function handlePageChange(page, page_size) {
    console.log(page, page_size);
    setReqData(_objectSpread(_objectSpread({}, reqData), {}, {
      page: page,
      page_size: page_size
    }));
  };
  /**
   * 分页器配置
   */


  var pagination = {
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
    total: tableData.total,
    pageSize: tableData.page_size,
    current: tableData.page,
    showSizeChanger: true,
    showTotal: function showTotal(total) {
      return "\u5171".concat(total, "\u6761");
    }
  };
  /**
   * 一级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
   * @param key key值
   * @param value value
   */

  var firstTabsChange = function firstTabsChange(key, value) {
    var _tabs$secondTabs, _tabs$secondTabs2, _tabs$secondTabs3, _tabs$secondTabs3$dat, _tabs$secondTabs4, _search;

    // 默认为当前选中的值若无手动选中，则为二级tabs默认值
    var secondValue = reqData.search[(_tabs$secondTabs = tabs.secondTabs) === null || _tabs$secondTabs === void 0 ? void 0 : _tabs$secondTabs.key] ? reqData.search[(_tabs$secondTabs2 = tabs.secondTabs) === null || _tabs$secondTabs2 === void 0 ? void 0 : _tabs$secondTabs2.key] : (_tabs$secondTabs3 = tabs.secondTabs) === null || _tabs$secondTabs3 === void 0 ? void 0 : (_tabs$secondTabs3$dat = _tabs$secondTabs3.data.find(function (item) {
      return item.key === tabs.secondTabs.defaultKey;
    })) === null || _tabs$secondTabs3$dat === void 0 ? void 0 : _tabs$secondTabs3$dat.key;

    var reqValue = _objectSpread(_objectSpread({}, reqData), {}, {
      search: (_search = {}, (0, _defineProperty2["default"])(_search, (_tabs$secondTabs4 = tabs.secondTabs) === null || _tabs$secondTabs4 === void 0 ? void 0 : _tabs$secondTabs4.key, secondValue), (0, _defineProperty2["default"])(_search, key, value), _search)
    }); // const reqValue = { ...reqData, search: { [key]: value } }


    if (typeof tabs.firstTabs.onChange === 'function') {
      var result = tabs.firstTabs.onChange(key, value, reqValue);
      result ? setReqData(_objectSpread({}, result)) : setReqData(reqValue);
      return;
    }

    setReqData(reqValue);
  };
  /**
   * 二级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
   * 二级tabs切换会带上一级tabs的值
   * @param key key值
   * @param value value
   */


  var secondTabsChange = function secondTabsChange(key, value) {
    var _tabs$firstTabs$data$, _search2;

    // 默认为当前选中的值若无手动选中，则为一级tabs默认值
    var firstTabsValue = reqData.search[tabs.firstTabs.key] ? reqData.search[tabs.firstTabs.key] : (_tabs$firstTabs$data$ = tabs.firstTabs.data.find(function (item) {
      return item.key === tabs.firstTabs.defaultKey;
    })) === null || _tabs$firstTabs$data$ === void 0 ? void 0 : _tabs$firstTabs$data$.key;

    var reqValue = _objectSpread(_objectSpread({}, reqData), {}, {
      search: (_search2 = {}, (0, _defineProperty2["default"])(_search2, tabs.firstTabs.key, firstTabsValue), (0, _defineProperty2["default"])(_search2, key, value), _search2)
    });

    if (typeof tabs.secondTabs.onChange === 'function') {
      var result = tabs.secondTabs.onChange(key, value, reqValue);
      result ? setReqData(_objectSpread({}, result)) : setReqData(reqValue);
      return;
    }

    setReqData(reqValue);
    console.log('secondTabsChange', key, value);
  }; // 多选配置


  var rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectRowKeys,
    hideOnSinglePage: true,
    onChange: function onChange(selectedRowKeys, selectedRows) {
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    }
  }; // console.log('tabs',tabs);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "pro-table-wrap"
  }, /*#__PURE__*/_react["default"].createElement(_ProTableHeader["default"], {
    title: title,
    tabs: tabs,
    firstTabsChange: firstTabsChange,
    secondTabsChange: secondTabsChange
  }), props.formProps ? /*#__PURE__*/_react["default"].createElement(_index["default"], {
    formProps: props.formProps,
    submit: submit,
    circle: tabs && tabs.secondTabs ? false : true
  }) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "pro-table-body-wrap"
  }, tableTools && renderTools(tableTools, selectRows), /*#__PURE__*/_react["default"].createElement(_table["default"], {
    columns: props.columns,
    dataSource: tableData.list,
    rowKey: props.rowKey,
    rowSelection: props.row && rowSelection,
    size: "middle",
    onChange: onChange,
    loading: loading,
    pagination: pagination
  })));
});
/**
 * 渲染表格工具栏
 * @param tableTools 表格tools工具栏配置 
 * @param selectRows 当前选中行数据
 */


exports["default"] = _default;

var renderTools = function renderTools(tableTools, selectRows) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "pro-table-tools"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "pro-table-tools-title"
  }, tableTools.title ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement("span", null, tableTools.title)) : null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pro-table-tools-actions-wrap"
  }, tableTools.actions.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index
    }, item === null || item === void 0 ? void 0 : item.render(selectRows));
  })));
};