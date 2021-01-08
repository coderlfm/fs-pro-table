var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { memo, useState, useEffect, useRef } from 'react';
import { Table, message } from 'antd';
import Form from '../pro-form';
import ProTableHeader from './Pro-table-header';
import './index.less';
const tableDataDefault = {
    list: [],
    page: 1,
    page_size: 10
};
function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}
export default memo(function (props) {
    const { tabs, title, tableTools, preSubmit, requestData, getAllParams, request } = props;
    const reqDataDefault = {
        page: 1,
        page_size: 10,
        search: {},
        sort: {},
    };
    const tabsReqInit = useRef(null);
    const tabsReqFlag = useRef(false);
    const [tableData, setTableData] = useState(tableDataDefault); // 表格数据
    const [selectRows, setSelectRows] = useState([]); // 被选中的行数据对象数组
    const [selectRowKeys, setSelectRowKeys] = useState([]); // 被选中行的keys
    const [reqData, setReqData] = useState(Object.assign(Object.assign({}, reqDataDefault), requestData)); // 请求数据
    const [loading, setLoading] = useState(true); // loading
    /**
     * 请求数据
     */
    useEffect(() => {
        setLoading(true);
        initData();
        if (typeof getAllParams === "function") {
            console.log("reqData变化了");
            getAllParams(reqData);
        }
    }, [reqData, props.reset]);
    useEffect(() => {
        if (tabs && Object.keys(tabs).length) {
            tabsReqInit.current = getTabsInitReq(tabs);
            if (Object.keys(tabs).length === 1) {
                if (Object.keys(tabsReqInit.current).length) {
                    setReqData(Object.assign(Object.assign({}, reqData), { search: Object.assign(Object.assign({}, reqData.search), tabsReqInit.current) }));
                }
            }
            else {
                if (Object.keys(tabsReqInit.current).length === 2) {
                    setReqData(Object.assign(Object.assign({}, reqData), { search: Object.assign(Object.assign({}, reqData.search), tabsReqInit.current) }));
                }
            }
        }
    }, [tabs]);
    /**
     * 初始化请求
     * @param data 请求参数，默认为
     */
    const initData = (data = reqData) => __awaiter(this, void 0, void 0, function* () {
        !loading && setLoading(true);
        const res = yield request({ url: props.url, method: 'post', data: Object.assign(Object.assign({}, reqData), requestData) });
        if (res.code === 0) {
            setTableData(Object.assign(Object.assign({}, tableData), res.data));
        }
        else {
            message.warning(res.msg || '请求超时');
        }
        setLoading(false);
    });
    /**
     * 表单搜索
     * 此处可过滤数据并可等待其中异步操作，所以此过滤需要返回一个promise
     */
    const submit = (values) => __awaiter(this, void 0, void 0, function* () {
        const search = Object.assign(Object.assign({}, reqData.search), values);
        //过滤为空的数据
        Object.keys(search).forEach(item => {
            (!search[item]) && delete search[item];
        });
        let submitValue = Object.assign(Object.assign({}, reqData), { search, page: 1 });
        // console.log('submitValue', submitValue);
        if (typeof preSubmit === 'function') {
            const result = yield preSubmit(submitValue);
            // 防止preSubmit没有返回数据
            submitValue = result || submitValue;
        }
        setReqData(submitValue);
    });
    /**
     * 分页器事件
     * @param page
     * @param page_size
     */
    const handlePageChange = (page, page_size) => {
        console.log(page, page_size);
        setReqData(Object.assign(Object.assign({}, reqData), { page, page_size }));
    };
    /**
     * 分页器配置
     */
    const pagination = {
        onChange: handlePageChange,
        onShowSizeChange: handlePageChange,
        total: tableData.total,
        pageSize: tableData.page_size,
        current: tableData.page,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
    };
    /**
     * 一级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
     * @param key key值
     * @param value value
     */
    const firstTabsChange = (key, value) => {
        var _a, _b, _c, _d, _e;
        // 默认为当前选中的值若无手动选中，则为二级tabs默认值
        const secondValue = reqData.search[(_a = tabs.secondTabs) === null || _a === void 0 ? void 0 : _a.key] ? reqData.search[(_b = tabs.secondTabs) === null || _b === void 0 ? void 0 : _b.key] : (_d = (_c = tabs.secondTabs) === null || _c === void 0 ? void 0 : _c.data.find(item => item.key === tabs.secondTabs.defaultKey)) === null || _d === void 0 ? void 0 : _d.key;
        const reqValue = Object.assign(Object.assign({}, reqData), { search: { [(_e = tabs.secondTabs) === null || _e === void 0 ? void 0 : _e.key]: secondValue, [key]: value } });
        // const reqValue = { ...reqData, search: { [key]: value } }
        if (typeof tabs.firstTabs.onChange === 'function') {
            const result = tabs.firstTabs.onChange(key, value, reqValue);
            result ? setReqData(Object.assign({}, result)) : setReqData(reqValue);
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
    const secondTabsChange = (key, value) => {
        var _a;
        // 默认为当前选中的值若无手动选中，则为一级tabs默认值
        const firstTabsValue = reqData.search[tabs.firstTabs.key] ? reqData.search[tabs.firstTabs.key] : (_a = tabs.firstTabs.data.find(item => item.key === tabs.firstTabs.defaultKey)) === null || _a === void 0 ? void 0 : _a.key;
        const reqValue = Object.assign(Object.assign({}, reqData), { search: { [tabs.firstTabs.key]: firstTabsValue, [key]: value } });
        if (typeof tabs.secondTabs.onChange === 'function') {
            const result = tabs.secondTabs.onChange(key, value, reqValue);
            result ? setReqData(Object.assign({}, result)) : setReqData(reqValue);
            return;
        }
        setReqData(reqValue);
        // console.log('secondTabsChange', key, value);
    };
    // 多选配置
    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys: selectRowKeys,
        hideOnSinglePage: true,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRowKeys(selectedRowKeys);
            setSelectRows(selectedRows);
        },
    };
    // console.log('tabs',tabs);
    return (React.createElement("div", { className: "pro-table-wrap" },
        React.createElement(ProTableHeader, { title: title, tabs: tabs, firstTabsChange: firstTabsChange, secondTabsChange: secondTabsChange }),
        props.formProps ? React.createElement(Form, { formProps: props.formProps, submit: submit, circle: (tabs && tabs.secondTabs) ? false : true }) : null,
        React.createElement("div", { className: "pro-table-body-wrap" },
            tableTools && renderTools(tableTools, selectRows),
            React.createElement(Table, { columns: props.columns, dataSource: tableData.list, rowKey: props.rowKey, rowSelection: props.row && rowSelection, size: "middle", onChange: onChange, loading: loading, pagination: pagination }))));
});
/**
 * 渲染表格工具栏
 * @param tableTools 表格tools工具栏配置
 * @param selectRows 当前选中行数据
 */
const renderTools = (tableTools, selectRows) => {
    return (React.createElement("div", { className: "pro-table-tools" },
        React.createElement("div", { className: "pro-table-tools-title" }, tableTools.title ? React.createElement(React.Fragment, null,
            React.createElement("span", null),
            React.createElement("span", null, tableTools.title)) : null),
        React.createElement("div", { className: "pro-table-tools-actions-wrap" }, tableTools.actions.map((item, index) => {
            return React.createElement("div", { key: index }, item === null || item === void 0 ? void 0 : item.render(selectRows));
        }))));
};
/**
 * 获取tabs默认请求数据
 * @param tabs tabs配置值
 */
const getTabsInitReq = (tabs) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    let tabsReq = {};
    //一级tabs默认请求数据
    if (((_a = tabs.firstTabs) === null || _a === void 0 ? void 0 : _a.defaultKey) !== null) {
        tabsReq = { [(_b = tabs.firstTabs) === null || _b === void 0 ? void 0 : _b.key]: (_d = (_c = tabs.firstTabs) === null || _c === void 0 ? void 0 : _c.data.find(item => item.key === tabs.firstTabs.defaultKey)) === null || _d === void 0 ? void 0 : _d.key };
    }
    else {
        tabsReq = { [(_e = tabs.firstTabs) === null || _e === void 0 ? void 0 : _e.key]: (_g = (_f = tabs.firstTabs) === null || _f === void 0 ? void 0 : _f.data[0]) === null || _g === void 0 ? void 0 : _g.key };
    }
    //二级tabs默认请求数据
    if (((_h = tabs.secondTabs) === null || _h === void 0 ? void 0 : _h.defaultKey) !== null) {
        tabsReq = Object.assign(Object.assign({}, tabsReq), { [(_j = tabs.secondTabs) === null || _j === void 0 ? void 0 : _j.key]: (_l = (_k = tabs.secondTabs) === null || _k === void 0 ? void 0 : _k.data.find(item => item.key === tabs.secondTabs.defaultKey)) === null || _l === void 0 ? void 0 : _l.key });
    }
    else {
        tabsReq = Object.assign(Object.assign({}, tabsReq), { [(_m = tabs.secondTabs) === null || _m === void 0 ? void 0 : _m.key]: (_p = (_o = tabs.secondTabs) === null || _o === void 0 ? void 0 : _o.data[0]) === null || _p === void 0 ? void 0 : _p.key });
    }
    /**
     * 过滤空值
     */
    Object.keys(tabsReq).forEach(item => {
        (!tabsReq[item]) && delete tabsReq[item];
    });
    return tabsReq;
};
// /**
//  * 判断tabs默认请求数据是否返回
//  */
// const checkTabsInitReq = (tabs) => {
//     const tabsLength = Object.keys(tabs).length;
//     let tabsReqInit = {};
//     if (tabsLength) {
//         tabsReqInit = getTabsInitReq(tabs)
//         if (Object.keys(tabsReqInit).length === tabsLength) {
//             // if (Object.keys(tabsReqInit).length) {
//             //     setReqData({ ...reqData, search: { ...reqData.search, ...tabsReqInit } })
//             // }
//         }
//     }
// }
