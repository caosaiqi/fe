<script>
export default {
  name: 'MdPopover',

  // 组件固定唯一ID
  componentName: 'MdPopover',

  props: {
  },
  render() {
    const { $slots } = this
    const config = {
      props: {
        trigger: 'click'
      },
      scopedSlots: {
        reference: props => {
          if ($slots.reference || $slots.default) {
            return <a v-popper:popper >asd</a>
          }
        },
        default: props => <h1>asdadasd</h1>
      }
    }
    return (
      <el-popover ref='popper' {...config}>
      </el-popover>
    )
  }
}
</script>

