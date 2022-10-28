export const table_column_list = [
    { prop: 'time', label: '创建日期' },
    { prop: 'name', label: '任务名称' },
    {
        prop: 'done', label: '是否完成',
        render: (value) => (
            <el-tag type={value ? "success" : "danger"}>
                {value ? "已完成" : "未完成"}
            </el-tag>
        ),
    },
]

export function FormItem({ form_item_list }) {
    return form_item_list.map(({ render, ...restArrts }) => (
        <el-form-item {...restArrts}>
            {typeof render === "function" && render(restArrts)}
        </el-form-item>
    ));
}

export function getDateTimeObj() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}