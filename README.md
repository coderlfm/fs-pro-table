# 森森日记管理后台

### 表格配置项
## column 配置
|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|title      |标题  |string \| () => string| |
|url        |接口请求地址      |(values)=> values ||
|columns    |antd [columns](https://ant.design/components/table-cn/#Column) 标准配置 |array|
|rowKey     |唯一key值 |string \| (() => string)| |
|tabs       |tabs栏配置         |[tabs](#tabs) ||
|formProps  |搜索表单配置        |[formProps](#formProps) ||
|tableTools |表格工具栏配置      |[tableTools](#tableTools) ||
|preSubmit  |搜索前数据过滤,将过滤完成后的值return      |(values)=> values ||
|requestData|自定义请求数据      |object ||
|row        |是否开启多选       |boolean |false|

<br/>

## formProps 

|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|search      |搜索框类型  |[searchType](#searchType)[]| |
|config      |表单其他项配置      |||
|layoutConfig    |antd [form](https://ant.design/components/form-cn/#Form) 标准配置 |[form](https://ant.design/components/form-cn/#Form)|

<br/>

### searchType
搜索框配置
|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|wrap       |form.Item配置  |[form.Item](#form.Item) | |
|props      |input配置  |[form.input.props](#form.input.props) | |

props 为注入到input框的配置，可根据不同input来配置不同配置项，都为antd input标准配置项 `<Input allowClear {...props} />`
如为下拉选择框，则在props中配置 [enum](#enumType) 属性
<br/>

#### enumType
下拉选择项配置
|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|label       |option 标签的文本  |string  |  |
|value       |option 标签的值  |string \| number  |  |

<br/>

#### form.Item
该配置会注入至 ` <Form.Item  {...item.wrap}> </Form.Item>`
|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|name       |传入后端的key  |string \|number | |
|label      |label 标签的文本      |string \|number||
|type       |搜索input类型 |'input' \| 'select' \| 'rangepicker' \| 'timepicker '| 'input'|
|col       |响应式布局 antd [col](https://ant.design/components/grid-cn/#Col) 标准配置 |[col](https://ant.design/components/grid-cn/#Col) |{ xs:{24}, sm:{24}, xl:{8} }|

<br/>

### tabs
tabs配置
切换时默认会向后端发送请求
|   属性     |	描述    |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|key        |tabs的key |string \|number | |
|onChange   |切换时的回调 |(key,value)=>void |(key,value)=>void |
|defaultKey |默认选中key |string \|number | |
|data       |tabs展示数据 |[tabsDataType](#tabsDataType)|  |
|title      |标题，二级tabs需配置 |string| |
|col        |响应式布局，二级tabs可配置， antd [col](https://ant.design/components/grid-cn/#Col) 标准配置 |[col](https://ant.design/components/grid-cn/#Col)  | { xs: 12, sm: 8, md: 8, lg: 6, xl: 3, xxl: 2 } |
|defaultOpen|二级tabs是否默认展开，二级tabs可配置， |boolean| false |

<br/>

#### tabsDataType
tabs展示数据
|   属性     |	描述     |	类型     |   默认值  |
| :-------  | -------- | --------- | -------- |
|label      |展示的文本  |string \|number |     |
|key        |展示文本的值 |string \|number |     |

<br/>
---
## Usage

```js
import React, { memo } from 'react'

import ProTable from '@/components/pro-table'

// 表单配置
const formProps = {
    search: [

        {
            wrap: {
                key: 'product_name',
                name: 'product_name',
                label: '商品名称',
                type: 'input',
                col: {
                    xs: 24,
                    sm: 8,
                    xl: 6
                }
            },
            props: {
                placeholder: '请输入商品名称',
            }

        },

    ],
    config: {
        submit: {
            text: '查询'
        },
        reset: {
            text: '重置'
        }
    },
    layoutConfig: {

        layout: 'inline'
    }
}

/**
 * 过滤搜索值
 * @param {Object} values 
 */
const preSubmit = async (values) => {
    console.log('values', values);
    return Promise.resolve(values)
}

export default memo(function () {


    const tabs = {
        firstTabs: {
            key: 'channel',
            onChange: false,
            defaultKey: 1,
            data: [
                {
                    label: "全部",
                    key: 1,
                },
                {
                    label: "频道名称1",
                    key: 2,
                },
                {
                    label: "频道名称2",
                    key: 3,
                },
                {
                    label: "频道名称3",
                    key: 4,
                },
            ]
        },
        secondTabs: {
            key: 'category',
            onChange: false,
            title: '商品类目',
            defaultKey: 1,
            defaultOpen:true,
            col:{
            },
            data: [
                {
                    label: "全部",
                    key: 1,
                },
                {
                    label: "类目一",
                    key: 2,
                },
                {
                    label: "类目二",
                    key: 3,
                },
                {
                    label: "类目三",
                    key: 4,
                },
                {
                    label: "类目四",
                    key: 5,
                },
                {
                    label: "类目五",
                    key: 6,
                },
                {
                    label: "类目六",
                    key: 7,
                },
            ]
        }
    }


    // 表格行配置
    const columns = [
        {
            title: '商品 id',
            dataIndex: 'product_id',
            align: 'center'
        },
        {
            title: '商品名称',
            dataIndex: 'product_name',
            ellipsis: true,
            width: 300
        },
        {
            title: '商品价格',
            dataIndex: 'market_price',
        }

    ];


    return (
        <div>
            <ProTable url="product/list" title="京东商品" requestData={{ section_id: 1 }} tabs={tabs} formProps={formProps} columns={columns} rowKey="product_id" preSubmit={preSubmit} />
        </div>
    )
})

```
