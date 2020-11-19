
<script>
import _ from 'lodash'

export default {
  name: 'MdRadioGroup',
  props: {
    items: {
      type: Array,
      default: undefined
    },
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      contents: {}
    }
  },
  methods: {
    handleInput(newValue) {
      this.$emit('input', newValue)
    }
  },
  render(h) {
    if (!this.items || !this.items.length) return null

    const RenderRadioGroup = () => {
      const radioItems = this.items.map((item) => {
        const { value, label, content, ...props } = item
        this.contents[value] = content
        const isAction = value === this.value && content
        return (
          <el-radio
            {...{ props }}
            label={value}
            border={true}
            class={{ 'action-radio': isAction, 'md-radio-group-item': true }}
          >
            {label}
            <u />
          </el-radio>
        )
      })

      return (
        <div>
          <el-radio-group value={this.value} onInput={this.handleInput}>
            { radioItems }
          </el-radio-group>
        </div>
      )
    }

    const RenderSubContent = () => {
      const fnContent = this.contents[this.value]
      if (!fnContent || !_.isFunction(fnContent)) return null
      return (
        <div class='su-content'>
          {fnContent()}
        </div>
      )
    }
    return (
      <div class='md-radio-group'>
        <RenderRadioGroup />
        <RenderSubContent />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/element-variables";
  .su-content{
    border-radius: $--border-radius-base;
    border: 1px solid $--border-color-light;
    padding: 15px;
    margin-top: 10px;
  }
  .md-radio-group {
    .md-radio-group-item {
      box-sizing: content-box;
      padding-top: 0;
      line-height: 36px;
    }
  }
  .action-radio {
    border-bottom: none;
    border-color:$--border-color-light !important;
    u{
        position: absolute;
        width: 100%;
        height: 13px;
        background: #fff;
        bottom: -12.5px;
        left: -1px;
        border-left: 1px solid $--border-color-light;
        border-right: 1px solid $--border-color-light;
    }
  }
</style>
