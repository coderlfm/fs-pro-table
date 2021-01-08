import React, { memo, useState, useEffect } from 'react';
import { Tabs, Button, Row, Col, Grid } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './pro-table-header.less';
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
const colSettingDefault = { xs: 12, sm: 8, md: 8, lg: 6, xl: 3, xxl: 2 }; // 列默认配置
export default memo(function (props) {
    var _a, _b, _c;
    const screens = useBreakpoint();
    const { title, tabs, firstTabsChange, secondTabsChange } = props;
    const [secondTab, setSecondTab] = useState(((_a = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _a === void 0 ? void 0 : _a.defaultKey) || 1); // 二级菜单active
    const [rotate, setRotate] = useState(((_b = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _b === void 0 ? void 0 : _b.defaultOpen) ? 0.5 : 0); // 旋转角度
    const [hiddenNum, setHiddenNum] = useState(8); // 隐藏条数
    const [colSetting] = useState(Object.assign(Object.assign({}, colSettingDefault), (_c = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _c === void 0 ? void 0 : _c.col)); // 列配置
    const screenlist = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']; // 响应尺寸
    useEffect(() => {
        setHiddenNum(computeHideNum(screens));
    }, [screens]);
    /**
     * 计算隐藏行
     * @param screens 当前屏幕尺寸
     */
    const computeHideNum = (screens) => {
        let hideNum = 8;
        for (let i = 0; i < screenlist.length; i++) {
            if (screens[screenlist[i]]) {
                hideNum = 24 / colSetting[screenlist[i]];
                break;
            }
        }
        return hideNum;
    };
    /**
     * 一级tabs切换
     * @param key
     */
    const tabFirstTabsChange = (key, value) => {
        var _a, _b, _c;
        //该处为解决 antd 默认将 activeKey转成string型
        if (typeof ((_a = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _a === void 0 ? void 0 : _a.defaultKey) === 'number') {
            value = parseFloat(value);
        }
        firstTabsChange(key, value);
        console.log("一级切换111", (_b = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _b === void 0 ? void 0 : _b.defaultKey);
        setSecondTab(((_c = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs) === null || _c === void 0 ? void 0 : _c.defaultKey) || 1);
    };
    /**
     * 二级tabs切换
     * @param key
     */
    const tabSecondTabsChange = (key, value) => {
        secondTabsChange(key, value);
        setSecondTab(value);
    };
    return (React.createElement("header", { className: "pro-table-header-wrap" },
        React.createElement("h2", null, title || ''),
        (tabs && tabs.firstTabs)
            && React.createElement("section", { className: "first" },
                React.createElement(Tabs, { defaultActiveKey: tabs.firstTabs.defaultKey, onChange: (e) => tabFirstTabsChange(tabs.firstTabs.key, e) }, tabs.firstTabs.data.map(item => React.createElement(TabPane, { tab: item.label, key: item.key })))),
        (tabs && tabs.secondTabs)
            && React.createElement("section", { className: "second" },
                React.createElement("span", null,
                    tabs.secondTabs.title,
                    "\uFF1A"),
                React.createElement(Row, { className: "second-content", gutter: [0, 16] }, tabs.secondTabs.data.map((item, index) => {
                    if (rotate) {
                        return (React.createElement(Col, Object.assign({ key: item.key }, colSetting),
                            React.createElement(Button, { className: "second-btn", size: "small", type: (secondTab === item.key) ? 'primary' : 'text', onClick: () => tabSecondTabsChange(tabs.secondTabs.key, item.key) }, item.label)));
                    }
                    else {
                        if (index < hiddenNum) {
                            return (React.createElement(Col, Object.assign({ key: item.key }, colSetting),
                                React.createElement(Button, { className: "second-btn", size: "small", type: (secondTab === item.key) ? 'primary' : 'text', onClick: () => tabSecondTabsChange(tabs.secondTabs.key, item.key) }, item.label)));
                        }
                        else {
                            return null;
                        }
                    }
                })),
                React.createElement("div", { className: "toggle-wrap" },
                    React.createElement("div", null,
                        React.createElement(Button, { type: "link" }, "\u7F16\u8F91")),
                    React.createElement("div", { className: "toggle-item" },
                        React.createElement(Button, { type: "link", onClick: () => rotate ? setRotate(0) : setRotate(0.5) },
                            rotate ? '收起' : '展开',
                            React.createElement(DownOutlined, { style: { "transition": "all 0.3s ease 0s", "transform": `rotate(${rotate}turn)` } })))))));
});
