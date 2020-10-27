import Drawer from '@@/Drawer/index.js'

export const drawerCreate = (pageTable) => new Drawer({
  title: '新建',
  data() {
    return {
      msg: '1231'
    }
  },
  on: {
    async ok() {
      console.log('您选中了', pageTable)
    },
    close() {
      console.log('点击了取消')
    }
  },
  content() {
    return (
      <el-form ref='numberValidateForm' label-width='100px' class='demo-ruleForm'>
        <el-form-item label='年龄' prop='age'>
          <el-input value={this.msg} type='age' autocomplete='off'/>
        </el-form-item>
      </el-form>
    )
  }
})

