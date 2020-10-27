import Dialog from '@@/Dialog/index.js'

export const edit = (rows) => new Dialog({
  title: '批量编辑',
  data() {
    return {
      msg: '1231'
    }
  },
  on: {
    async ok() {
      console.log('您选中了', rows)
      await new Promise((r, j) => {
        setTimeout(() => {
          r()
        }, 1000)
      })
    },
    close() {
      console.log('点击了取消')
      return false
    }
  },
  // footer: () => {},
  content() {
    return (
      <el-form ref='numberValidateForm' label-width='100px' class='demo-ruleForm'>
        <el-form-item label='年龄' prop='age'>
          <el-input value={this.msg} type='age' onInput={v => {
            this.msg = v
          }} autocomplete='off'/>
          {this.msg}
        </el-form-item>
      </el-form>
    )
  }
})
