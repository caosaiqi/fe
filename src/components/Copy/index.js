import './index.scss'

export default {
  name: 'Copy',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      title: ''
    }
  },
  methods: {
    clearTimer() {
      clearTimeout(this.timer)
      this.timer = null
    },
    async doCopy(e) {
      e.stopPropagation()
      try {
        this.title = '已复制'
        await this.$copyText(this.message)
      } catch (error) {
        this.title = '复制失败'
      }
      this.visible = true
      this.clearTimer()
      this.timer = setTimeout(() => {
        this.visible = false
      }, 800)
    }
  },
  destroyed() {
    this.clearTimer()
  },
  render(h) {
    if (!this.message) return null
    return (
      <el-tooltip
        disabled={!this.visible}
        value={this.visible}
        content={this.title}
        placement='top'
      >
        <a onClick={this.doCopy}>
          <i class='iconfont icon-icon-copy'/>
        </a>
      </el-tooltip>
    )
  }
}
