import createDrawer from '@@/Drawer/createDrawer.js'

export const drawerCreate = (pageTable) => createDrawer({
  title: '新建',
  data() {
    return {
      data: {
        name: '',
        age: 0
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空' }
        ],
        age: [
          { required: true, message: '年龄不能为空' }
        ]
      }
    }
  },
  methods: {
    async ok() {
      try {
        await this.$refs.form.validate()
        await pageTable.fetchCreate(this.data)
      } catch (e) {
        return false
      }
    },
    close() {
      console.log('点击了取消')
    }
  },
  render() {
    return (
      <el-form {...{ props: { model: this.data }}} ref='form' rules={this.rules}>
        <el-form-item label='名称' prop='name'>
          <el-input v-model={this.data.name} />
        </el-form-item>
        <el-form-item label='年龄' prop='age'>
          <el-input type='number' v-model={this.data.age} />
        </el-form-item>
      </el-form>
    )
  }
})

