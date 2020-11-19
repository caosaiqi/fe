<script>
import createPageContent from '@@/PageContent/createPageContent.js'
import Popover from '@@/Popover'
import Descriptions from '@@/Descriptions'
import { getTimeTableColumn } from '@/utils/tableColumn.js'

const textKeys = [2, 3, 5, 7, 8, 10, 11]

const searchContent = {
  formItems: [
    {
      id: 'search_value',
      label: '主题或链接搜索'
    }
  ]
}

const tableContent = {
  resources: 'ad',
  path: '/creative_list',
  onFetchSuccess(ret) {
    if (ret) {
      return {
        list: ret.creatives,
        total: ret.count
      }
    }
  },
  formatParams(params) {
    params['rows'] = params.pageSize
    params['id'] = 'cart_feed_list'
    return params
  },
  columns: [
    {
      prop: 'id',
      label: '素材编号',
      width: 100
    },
    {
      prop: 'operator',
      label: '操作人',
      width: 100
    },
    getTimeTableColumn({
      label: '投放时间段'
    }),
    {
      label: '广告主题',
      prop: 'text'
    },
    {
      label: '广告图片',
      prop: 'show_url',
      width: 100,
      customRender({ show_url }) {
        if (!show_url) return null
        return (
          <Popover placement='right' trigger='hover'>
            <img height={80} width={'100%'} src={show_url} />
            <div slot='content' style={{ height: 500 }}>
              <img width={'100%'} src={show_url} />
            </div>
          </Popover>
        )
      }
    },
    {
      prop: 'url',
      label: '广告链接'
    },
    {
      prop: 'weight',
      label: '权重',
      width: 60
    },
    {
      label: '统计信息',
      width: 150,
      customRender({ row }) {
        return <Descriptions
          data={row}
          lableWidth={'80px'}
          items={[
            {
              prop: 'curr_num',
              label: '展示次数'
            },
            {
              prop: 'click_num',
              label: '点击次数'
            },
            {
              prop: 'click_rate',
              label: '转化率CTR',
              customRender() {
                if (!row.click_num || !row.curr_num) return 0
                const count = (row.click_num * 100) / row.curr_num
                return `${count}%`
              }
            }
          ]}
        />
      }
    }
  ],
  actions: [
    {
      lable: '编辑'
    }
  ]
}

export default createPageContent({
  tableContent,
  searchContent
})

</script>
