import Dialog from '@@/Dialog'

export default (row) => {
  let _resolve
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
  })

  new Dialog({
    attrs: {
      size: 'small'
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
        <div>
          <h2>您确定要删除吗</h2>
        </div>
      )
    }
  })
  return promise
}
