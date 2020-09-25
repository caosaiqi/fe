<template>
  <div>
    <page-content v-bind="config" />
  </div>
</template>

<script>
import PageContent from '@@/PageContent'
export default {
  name: 'Test',
  components: {
    PageContent
  },
  data() {
    return {
      config: {
        header: {
          title: '电商管理-POP店管理-店铺管理',
          actions: [
            {
              title: '修改'
            }
          ]
        },
        seachForm: {
          size: 'medium',
          onSearch(values) {
            /*
            * return false表示不再刷新列表
            * return new Object(), 使用新对象刷新列表
            * return undefined，使用默认参数刷新列表
            **/
          },
          formItems: [
            {
              id: 'namasdae',
              value: 'sasda',
              label: '名称'
            },
            {
              // label
              label() {
                return <button>可以自定义label</button>
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
        },
        table: {
          resources: 'orders',
          /**
           * table 默认查询参数
           * queryParams: {
           *  name: '1'
           * },
           **/
          columns: [
            {
              prop: 'date',
              label: '时间',
              render() {
                /**
                 * this指向table, 您可以调用table下面所用方法，比如fetchList
                 **/
                return 'test'
              }
            },
            {
              prop: 'name',
              label: '名称'
            },
            {
              prop: 'address',
              label: '地址'
            }
          ],
          actions: [
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
            },
            {
              label: '删除',
              action(row) {
                console.log(this, row)
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    // fetchList()
  }
}
</script>

<style>

</style>
