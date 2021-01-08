import React, { memo } from 'react';
import { Form, Input, Button, Select, Space, Col, DatePicker, TimePicker } from 'antd';
import './index.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
const tailLayout = {
// wrapperCol: {
//     // offset: 8,
//     span: 24,
// },
// labelCol: {
//     span: 24,
//     flex: 2
// }
};
export default memo((props) => {
    var _a, _b, _c, _d, _e, _f;
    const [form] = Form.useForm();
    const { formProps, submit, circle } = props;
    /**
     * 表单提交， 提交时会过滤空值
     * @param {Object} values
     */
    const onFinish = (values) => {
        const FormFields = form.getFieldsValue();
        const fields = {};
        for (let key in FormFields) {
            if (FormFields[key] !== undefined && FormFields[key] !== '') {
                (fields[key] = FormFields[key]);
            }
        }
        submit(fields);
    };
    /**
     * 表单重置
     */
    const onReset = () => {
        const FormFields = form.getFieldsValue();
        // console.log("重置前获取的数据111",FormFields);
        //这里加个标记判断是重置还是提交
        const obj = {};
        Object.keys(FormFields).map(item => obj[item] = '');
        // console.log("晴空数据",obj)
        form.resetFields();
        submit(obj);
    };
    return (React.createElement(Form, Object.assign({ layout: "inline", form: form, name: "control-hooks", onFinish: onFinish }, formProps === null || formProps === void 0 ? void 0 : formProps.layoutConfig, { className: `pro-table-form-wrap ${circle ? 'pro-table-form-circle' : ''}` }),
        (formProps === null || formProps === void 0 ? void 0 : formProps.search) && renderForm(formProps.search),
        React.createElement(Form.Item, Object.assign({}, tailLayout, { className: "form-footer" }),
            React.createElement(Space, null,
                React.createElement(Button, { htmlType: "button", onClick: onReset, className: "btn-default" }, ((_b = (_a = formProps === null || formProps === void 0 ? void 0 : formProps.config) === null || _a === void 0 ? void 0 : _a.reset) === null || _b === void 0 ? void 0 : _b.text) || '重置'),
                React.createElement(Button, { type: "primary", htmlType: "submit", className: "btn-primary" }, ((_d = (_c = formProps === null || formProps === void 0 ? void 0 : formProps.config) === null || _c === void 0 ? void 0 : _c.submit) === null || _d === void 0 ? void 0 : _d.text) || '查询'), (_f = (_e = formProps === null || formProps === void 0 ? void 0 : formProps.config) === null || _e === void 0 ? void 0 : _e.otherBtn) === null || _f === void 0 ? void 0 :
                _f.map(item => {
                    return (React.createElement(Button, Object.assign({}, item.btnProps, { onClick: () => {
                            const FormFields = form.getFieldsValue();
                            item.onBtnChange(FormFields);
                        }, className: "btn-primary", key: item }), item.text));
                })))));
});
/**
 * 渲染搜索表单
 * @param {Array} search 表单配置数组
 */
const renderForm = (search) => {
    /**
     * 渲染input类型
     * @param {String} type input类型
     * @param {Object} searchProps input配置项
     */
    const renderFormEle = (type, searchProps) => {
        type = type.toLowerCase();
        let ele;
        switch (type) {
            case 'input':
                ele = React.createElement(Input, Object.assign({ allowClear: true }, searchProps));
                break;
            case 'select':
                ele = React.createElement(Select, Object.assign({ allowClear: true }, searchProps), searchProps.enum.map(item => React.createElement(Option, { value: item.value, key: item.value }, item.label)));
                break;
            case 'rangepicker':
                ele = React.createElement(RangePicker, Object.assign({ allowClear: true }, searchProps));
                break;
            case 'timepicker ':
                ele = React.createElement(TimePicker, Object.assign({ allowClear: true }, searchProps));
                break;
            default:
                ele = React.createElement(Input, Object.assign({ allowClear: true }, searchProps));
        }
        return ele;
    };
    return search.map(item => {
        return (React.createElement(Col, Object.assign({ key: item.wrap.name, xs: 24, sm: 24, xl: 8 }, item.wrap.col),
            React.createElement(Form.Item, Object.assign({ colon: false }, item.wrap), renderFormEle(item.wrap.type, item.props))));
    });
};
