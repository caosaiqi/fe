<script>
import { adTypes } from './constants'
import { drawerCreative } from './drawer'
import createPageContent from '@@/PageContent/createPageContent.js'
import Status from '@@/Status'
import Popover from '@@/Popover'

const searchContent = {
  formItems: [
    {
      id: 'space_mark',
      label: '位置搜索'
    }
  ]
}

const tableContent = {
  resources: 'ad',
  path: '/lists',
  onFetchSuccess: ({ types, count }) => ({
    list: types,
    total: count
  }),
  formatParams(params) {
    params['rows'] = params.pageSize
    return params
  },
  columns: [
    {
      prop: 'id',
      label: '广告位ID',
      width: 200
    },
    {
      className: 'ellipsis',
      prop: 'space_mark',
      label: '位置说明',
      width: 200
    },
    {
      prop: 'pre_show',
      label: '刊例',
      width: 50,
      customRender({ pre_show }) {
        if (!pre_show) return null
        return (
          <Popover placement='right' trigger='hover'>
            <img height={40} width={'100%'} src={pre_show} />
            <div slot='content' style={{ height: 500 }}>
              <img width={'100%'} src={pre_show} />
            </div>
          </Popover>
        )
      }
    },
    {
      prop: 'ad_type',
      label: '广告类型',
      width: 200,
      customRender({ ad_type }) {
        return adTypes[ad_type]
      }
    },
    {
      prop: 'width_height',
      label: '广告位尺寸',
      width: 100
    },
    {
      prop: 'rules',
      label: '选择规则'
    },
    {
      prop: 'status',
      label: '投放状态',
      width: 100,
      customRender({ status, pageTable, row }) {
        const handleChange = (newStatus) => {
          pageTable.manager.post({
            path: '/status',
            params: qs.stringify({
              id: row.id,
              status: newStatus
            })
          })
        }
        return (
          <Status
            name='nad'
            status={status}
            onChange={handleChange}
          />
        )
      }
    }
  ],
  actions: [{
    label: '管理投放',
    onAction({ row }) {
      drawerCreative()
    }
  }]
}

export default createPageContent({
  tableContent,
  searchContent
})

</script>
