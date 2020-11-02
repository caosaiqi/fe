import './index.scss'
import FooterConfirm from '@@/FooterConfirm'

export default {
  data() {
    return {
      value: false
    }
  },
  methods: {
    async handleOk() {
      await this.pageTable.fetchRemove(this.row)
    },
    handleClose() {
      this.$refs.popover.showPopper = false
    }
  },
  render() {
    return (
      <el-popover
        value={this.value}
        placement='left'
        trigger='hover'
        ref='popover'
      >
        <div>
          <div class='popover-remove-content'>
            <i class='el-icon-question' />
            <div class='description'>
              您确定要删除吗？
            </div>
          </div>
          <FooterConfirm
            size='mini'
            style='margin-top: 10px'
            onOk={this.handleOk}
            onClose={this.handleClose}
          />
        </div>
        <a slot='reference' class='link-btn txt-err-hover'> 删除 </a>
      </el-popover>
    )
  }
}
