<script>
export default {
  name: 'MdInputNumber',
  props: {
    value: {
      type: [Number, String],
      required: true,
      default: undefined
    },
    min: {
      type: Number,
      default: 0
    },
    append: {
      type: String,
      default: undefined
    }
  },
  methods: {
    handleInput(newValue = this.min) {
      this.$emit('input', newValue)
    }
  },
  render() {
    console.log(this.value, '123')
    const props = Object.assign({
      controls: false,
      value: this.value,
      min: this.min
    }, this.$attrs)

    const RenderAppend = () => {
      if (!this.append) return null
      return (
        <div class='append'>
          <span>次</span>
        </div>
      )
    }

    return (
      <div class='md-input-number'>
        <el-input-number {...{ props, on: { input: this.handleInput }}} />
        <RenderAppend />
        <a class='close-btn' onClick={ () => this.handleInput() }>
          <i class='el-icon-circle-close'></i>
        </a>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
 @import "~@/styles/element-variables";
.md-input-number{
  display: flex;
  position: relative;
  &:hover{
    .close-btn {
      display: block;
    }
  }
  .close-btn {
    display: none;
    position: absolute;
    right: 53px;
    top: 1px;
    color: #C0C4CC;
  }
  .append {
    span {
      display: block;
      height: 100%;
      background: #f5f7fa;
      color: #606266;
      margin:  -1px;
      border: 1px solid $--border-color-light;
      border-radius: 0 3px 3px 0;
    }
    position: relative;
    top: 1px;
    left: -2px;
    width: 40px;
    height: auto;
    text-align: center;
    font-size: 13px;
    border-radius: 0 4px 4px 0;
  }
}
</style>
