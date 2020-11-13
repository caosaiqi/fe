import createPageContent from '@@/PageContent/createPageContent.js'
import { edit } from './dialogs'
import { drawerCreate } from './drawer'
import { removePopover } from '@sections/TablePagePopovers'
import { fetchGetCity, fetchGetRegion } from '@api'
import Status from '@@/Status'
import Popover from '@@/Popover'

// 筛选
const searchContent = {
  formItems: [
    {
      id: 'name',
      label: 'saasdd'
    },
    {
      label: 'wqwe',
      items: [
        {
          id: 'user1',
          customRender({ form }) {
            return <h1>asasdasd123123</h1>
          }
        },
        {
          id: 'user2',
          customRender({ form }) {
            return <h1>asasdasd123123</h1>
          }
        }
      ]
    },
    {
      lable: '自定义输入框',
      customRender({ form }) {
        return <h1>asdasdas</h1>
      }
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
      label: '名称',
      copy: true,
      className: 'ellipsis'
    },
    {
      prop: 'title',
      label: '图片',
      customRender({ title, row, pageTable }) {
        const handleOk = async() => {
          await new Promise((r) => {
            setTimeout(() => {
              r()
            }, 1000)
          })
        }
        return <Popover onOk={handleOk}>
          <img width='30px' src={row.image_uri} />
        </Popover>
      }
    },
    {
      width: 100,
      prop: 'status',
      align: 'center',
      label: '状态',
      customRender({ row, pageTable }) {
        const handleChange = (newStatus) => {
          pageTable.fetchUpdate({
            status: newStatus,
            id: row.id
          })
        }
        return <Status status={row.status} onChange={handleChange}/>
      }
    },
    {
      prop: 'author',
      label: 'author'
    }
  ],
  actions: [
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
    },
    {
      label: '删除',
      action: ({ rows, pageTable }) => {
        console.log(rows)
      }
    }
  ]
}

export default createPageContent({
  searchContent,
  tableContent
})
