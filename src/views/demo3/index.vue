<script>
import createPageContent from '@@/PageContent/createPageContent.js'
import { datePicker } from '@/sections/SearchItems/index.js'

console.log(datePicker)
const searchContent = {
  formItems: [
    {
      id: 'name',
      label: 'saasdd'
    },
    datePicker(),
    {
      label: '自定义输入框',
      items: [
        {
          id: 'custom',
          customRender(model) {
            return <el-rate v-model={model.custom}></el-rate>
          }
        },
        {
          id: 'asd',
          customRender() {
            return <p>asdsa</p>
          }
        }
      ]
    }
  ]
}

const tableContent = {
  resources: 'orders',
  columns: [
    {
      prop: 'title',
      label: 'asdas',
      copy: true,
      className: 'ellipsis'
    },
    {
      prop: 'title',
      label: 'asdas',
      copy: true,
      className: 'ellipsis',
      customRender() {
        return <h1>asdas</h1>
      }
    }
  ]
}

export default createPageContent({
  tableContent,
  searchContent
})

</script>
