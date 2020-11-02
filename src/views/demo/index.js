import createPageContent from '@@/PageContent/createPageContent.js'
import { edit } from './dialogs'
import { drawerCreate } from './drawer'
import { removePopover } from '@sections/TablePagePopovers'
import { fetchGetCity, fetchGetRegion } from '@api'

// 头部内容
const headerContent = {
  title: '电商管理-POP店管理-店铺管理'
}

// 筛选
const searchContent = {
  onSearch(values) {
    /*
     * return false表示不再刷新列表
     * return new Object(), 使用新对象刷新列表
     * return undefined，使用默认参数刷新列表
     */
  },
  formItems: [
    {
      id: 'name',
      label: '名称'
    },
    {
      label(asd) {
        return <span> {asd} <i class='el-icon-warning' /> </span>
      },
      items: [
        {
          id: 'city',
          componentName: 'Select',
          placeholder: '请选择城市',
          options: async() => {
            const { data } = await fetchGetCity()
            return data
          }
        },
        {
          id: 'region',
          componentName: 'Select',
          placeholder: '请选中区域',
          listener: 'city',
          options: async(values = {}) => {
            const { city } = values
            const { data } = await fetchGetRegion({ city })
            return data
          }
        }
      ]
    }
  ]
}

const tableContent = {
  resources: 'orders',
  /**
   * table 默认查询参数
   * queryParams: {
   *  name: '1'
   * },
   */
  columns: [
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'title',
      label: '名称',
      value(data) {
        console.log(data)
        return <img width='100px' src='https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' />
      }
    },
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'title',
      label: '名称'
    },
    {
      prop: 'status',
      label: '状态'
    }
  ],
  actions: [
    {
      ...removePopover
    },
    {
      label: '更新',
      async action(row) {
        edit(row)
      }
    },
    {
      label: '更多',
      /**
       * 使用弹框（el-popover）形式展示更多按钮
       */
      subActions: [
        {
          label: '预定'
        },
        {
          label: '详情'
        }
      ]
    }
  ],
  batchActions: [
    {
      label: '新建',
      action: ({ rows, pageTable }) => {
        drawerCreate(pageTable)
      }
    }
  ]
}
export default createPageContent({
  headerContent,
  searchContent,
  tableContent
})
