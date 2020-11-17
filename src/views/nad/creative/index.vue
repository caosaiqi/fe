<script>
import createPageContent from '@@/PageContent/createPageContent.js'
import Status from '@@/Status'

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
      label: '素材编号',
      width: 200
    },
    {
      prop: 'operator',
      label: '操作人'
    },
    {
      label: '投放时间段',
      width: 50,
      customRender({ start_time, end_time }) {
        return (
          <div>
            <span> { start_time } </span>
            <span> { end_time } </span>
          </div>
        )
      }
    },
    {
      label: '广告主题',
      prop: 'text'
    },
    {
      label: '广告图片',
      prop: 'show_url',
      customRender({ show_url }) {
        if (!show_url) return null
        return (
          <Popover placement='right' trigger='hover'>
            <img height={40} width={'100%'} src={show_url} />
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
      prop: 'status',
      label: '投放状态',
      width: 100,
      customRender({ status, pageTable, row }) {
        const handleChange = (newStatus) => {
          pageTable.manager.post({
            path: '/status'
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
  ]
}

export default createPageContent({
  tableContent,
  searchContent
})

</script>
