import React,{ memo, useState, useEffect } from 'react'
import { Table, message } from 'antd';


import Form from './pro-form/index.js'
import ProTableHeader from './pro-table/Pro-table-header.js'
// import request from '../../services/request'

import './index.css'


const tableDataDefault = {
    list: [],
    page: 1,
    page_size: 10
}

const reqDataDefault = {                        //请求参数
    page: 1,
    page_size: 10,
    search: {},
    sort: {},
}


function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

export default memo(function (props) {

    const { tabs, title, tableTools, preSubmit, requestData ,request} = props

    const [tableData, setTableData] = useState(tableDataDefault)    //表格数据
    const [selectRows, setSelectRows] = useState([]);               // 被选中的行数据对象数组
    const [selectRowKeys, setSelectRowKeys] = useState([]);         // 被选中行的keys
    const [reqData, setReqData] = useState({ ...reqDataDefault, ...requestData })
    const [loading, setLoading] = useState(true)                    //loading


    /**
     * 请求数据
     */
    useEffect(() => {
        console.log('reqData');

        initData()
    }, [reqData, props.reset])


    /**
     * 初始化请求
     * @param data 请求参数，默认为
     */
    const initData = async (data = reqData) => {
        !loading && setLoading(true)

        const res = await request({ url: props.url, method: 'post', data })
        if (res.code === 0) {
            setTableData({ ...tableData, ...res.data })
        } else {
            message.warning(res.msg || '请求超时')
        }
        setLoading(false)
    }


    /**
     * 表单搜索
     * 此处可过滤数据并可等待其中异步操作，所以此过滤需要返回一个promise
     */
    const submit = async values => {
        let submitValue = { ...reqData, search: { ...reqData.search, ...values } }
        if (typeof preSubmit === 'function') {
            submitValue = await preSubmit(submitValue)
            console.log('submitValue', submitValue);

        }
        setReqData(submitValue);
    }

    /**
     * 分页器事件
     * @param page 
     * @param page_size 
     */
    const handlePageChange = (page, page_size) => {
        console.log(page, page_size);
        setReqData({ ...reqData, page, page_size });
    }

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
    }


    /**
     * 一级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
     * @param key key值
     * @param value value
     */
    const firstTabsChange = (key, value) => {

        // 默认为当前选中的值若无手动选中，则为二级tabs默认值
        const secondValue = reqData.search[tabs.secondTabs?.key] ? reqData.search[tabs.secondTabs?.key] : tabs.secondTabs?.data.find(item => item.key === tabs.secondTabs.defaultKey)?.key;
        const reqValue = { ...reqData, search: { [tabs.secondTabs?.key]: secondValue, [key]: value } }
        // const reqValue = { ...reqData, search: { [key]: value } }

        if (typeof tabs.firstTabs.onChange === 'function') {
            const result = tabs.firstTabs.onChange(key, value, reqValue)
            result ? setReqData({ ...result }) : setReqData(reqValue)
            return;
        }
        setReqData(reqValue)

    }

    /**
     * 二级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
     * 二级tabs切换会带上一级tabs的值
     * @param key key值
     * @param value value
     */
    const secondTabsChange = (key, value) => {

        // 默认为当前选中的值若无手动选中，则为一级tabs默认值
        const firstTabsValue = reqData.search[tabs.firstTabs.key] ? reqData.search[tabs.firstTabs.key] : tabs.firstTabs.data.find(item => item.key === tabs.firstTabs.defaultKey)?.key;
        const reqValue = { ...reqData, search: { [tabs.firstTabs.key]: firstTabsValue, [key]: value } }


        if (typeof tabs.secondTabs.onChange === 'function') {
            const result = tabs.secondTabs.onChange(key, value, reqValue)
            result ? setReqData({ ...result }) : setReqData(reqValue)
            return;
        }
        setReqData(reqValue)
        console.log('secondTabsChange', key, value);
    }

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


    return (
        <div className="pro-table-wrap">
            <ProTableHeader title={title} tabs={tabs} firstTabsChange={firstTabsChange} secondTabsChange={secondTabsChange} />

            { props.formProps ? <Form formProps={props.formProps} submit={submit} circle={(tabs && tabs.secondTabs) ? false : true} /> : null}

            <div className="pro-table-body-wrap">

                {tableTools && renderTools(tableTools, selectRows)}
                <Table
                    columns={props.columns}
                    dataSource={tableData.list}
                    rowKey={props.rowKey}
                    rowSelection={props.row && rowSelection}
                    size="middle"
                    onChange={onChange}
                    loading={loading}
                    pagination={pagination}
                />
            </div>
        </div>
    )
})


/**
 * 渲染表格工具栏
 * @param tableTools 表格tools工具栏配置 
 * @param selectRows 当前选中行数据
 */
const renderTools = (tableTools, selectRows) => {

    return (
        <div className="pro-table-tools">
            <div className="pro-table-tools-title">
                {tableTools.title ? <><span></span><span>{tableTools.title}</span></> : null}
            </div>
            <div className="pro-table-tools-actions-wrap">
                {
                    tableTools.actions.map((item, index) => {
                        return <div key={index}>{item?.render(selectRows)}</div>
                    })
                }
            </div>
        </div>
    )
}