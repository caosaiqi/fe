const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

module.exports = [
  {
    url: 'orders',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 0,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },

  {
    url: 'orders/delete',
    type: 'post',
    response: config => {
      return {
        code: 0
      }
    }
  },

  {
    url: 'orders/create',
    type: 'post',
    response: config => {
      return {
        code: 0
      }
    }
  },

  {
    url: 'city',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: [
          {
            value: 'shanghai',
            label: '上海'
          },
          {
            value: 'beijing',
            label: '北京'
          }
        ]
      }
    }
  },

  {
    url: 'region',
    type: 'get',
    response: config => {
      const { city } = config.query
      console.log(config.query)
      let data = []
      if (city === 'shanghai') {
        data = [
          {
            label: '黄浦区',
            value: 'hangbuqu'
          },
          {
            label: '徐汇区',
            value: 'quhuiqu'
          },
          {
            label: '长宁区',
            value: 'changningqu'
          }
        ]
      }
      if (city === 'beijing') {
        data = [
          {
            label: '朝阳区',
            value: 'chaoyangqu'
          },
          {
            label: '海淀区',
            value: 'haidianqu'
          },
          {
            label: '东城区',
            value: 'dongchengqy'
          }
        ]
      }
      return {
        code: 0,
        data
      }
    }
  }

]
