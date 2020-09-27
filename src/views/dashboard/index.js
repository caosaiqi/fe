import pageContentTemplate from '@@/PageContent/template.js'

// 头部内容
const headerContent = {
  title: '电商管理-POP店管理-店铺管理',
  actions: [{
    title: '修改'
  }]
}

// 筛选
const searchContent = {
  onSearch(values) {
    /*
     * return false表示不再刷新列表
     * return new Object(), 使用新对象刷新列表
     * return undefined，使用默认参数刷新列表
     **/
  },
  formItems: [
    {
      id: 'name',
      label: '名称',
      placeholder: '12312312312'
    },
    {
      label() {
        return <span> 城市 <i class='el-icon-warning' /> </span>
      },
      items: [
        {
          id: 'city'
        },
        {
          id: 'region'
        }
      ]
    }
  ]
}

// 列表
const tableContent = {
  resources: 'orders',
  /**
   * table 默认查询参数
   * queryParams: {
   *  name: '1'
   * },
   **/
  columns: [
    {
      prop: 'name',
      label: '名称'
    },
    {
      prop: 'status',
      label: '状态'
    }
  ],
  actions: [
    {
      label: '删除',
      action(row) {
        console.log(this, row)
      }
    },
    {
      label: '更多',
      /**
         * 使用弹框（el-popover）形式展示更多按钮
         **/
      subActions: [
        {
          label: '下单',
          /**
             * action方法内部this指定当前table，您可以调用table下面所用方法，比如fetchList
             **/
          action(row) {
            console.log(row)
          }
        },
        {
          label: '预定'
        },
        {
          label: '详情'
        }
      ]
    }
  ]
}

export default pageContentTemplate({
  headerContent,
  searchContent,
  tableContent
})
