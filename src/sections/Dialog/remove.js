import Dialog from '@@/Dialog'

export default (row) => {
  let _resolve
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
  })

  new Dialog({
    attrs: {
      size: 'small',
      showClose: false
    },
    on: {
      async ok() {
        await new Promise((r, j) => {
          setTimeout(() => {
            r()
          }, 1000)
        })
        _resolve(true)
      },
      close() {
        _resolve(false)
        return false
      }
    },
    content() {
      return (
        <div class='dialog-remove'>
          <i class='el-icon-question' />
          <div class='description'>
            <h3> 您确定要删除吗？</h3>
            <h4> 删除后数据将无法找回 </h4>
          </div>
        </div>
      )
    }
  })
  return promise
}
