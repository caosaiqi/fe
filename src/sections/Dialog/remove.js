import Dialog from '@@/Dialog'

export default (row, vnodeTable) => {
  let _resolve, _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  new Dialog({
    attrs: {
      size: 'small',
      showClose: false
    },
    on: {
      async ok() {
        if (!vnodeTable || (vnodeTable.$options && vnodeTable.$options.componentName !== 'PageTable')) return false
        try {
          await vnodeTable.fetchRemove(row)
          _resolve()
        } catch (err) {
          _reject()
          throw err
        }
      },
      close() {
        _resolve()
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
