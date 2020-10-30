<template>
  <div>
    <page-content
      :header-content="headerContent"
      :search-content="searchContent"
      :table-content="tableContent"
    />
    <drawer :visible.sync="visible" @ok="handleOk">
      <h1 slot="content">asdasdad</h1>
    </drawer>
  </div>
</template>

<script>
import PageContent from '@@/PageContent'
import Drawer from '@@/Drawer/index.vue'

export default {
  name: 'VueTemplate',
  components: {
    PageContent,
    Drawer
  },
  data() {
    return {
      headerContent: 'VueTemplate',
      visible: false,
      searchContent: {
        formItems: [
          {
            id: 'name',
            label: '名称'
          }
        ]
      },
      tableContent: {
        resources: 'orders',
        columns: [
          {
            prop: 'title',
            label: '名称'
          },
          {
            prop: 'title',
            label: '名称',
            render: () => {
              // h gets auto injected here (note that data is now a member function)
              // return <img src='https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' />
              return '123'
            }
          },
          {
            prop: 'status',
            label: '状态'
          }
        ],
        actions: [
          {
            label: '删除',
            async action({ row }) {
              // const ret = await removeDialog(row, this)
              // console.log(ret)
            }
          }
        ],
        batchActions: [
          {
            label: '新建',
            action: async({ row }) => {
              this.visible = true
            }
          }
        ]
      }
    }
  },
  methods: {
    handleOk() {
      console.log('asdadasdas')
    }
  }
}
</script>

<style>

</style>
