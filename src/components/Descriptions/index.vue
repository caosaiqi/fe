
<script>
import _ from 'lodash'

export default {
  name: 'MdDescriptions',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    lableWidth: {
      type: [String, Number],
      default: 'auto'
    },
    items: {
      type: Array,
      default: undefined
    }
  },
  render() {
    if (!this.items) return null

    const RenderItem = () => {
      if (this.items.length <= 0) {
        return null
      }
      const lw = _.isNumber(this.lableWidth) ? `${this.lableWidth}px` : this.lableWidth
      return this.items.map(({ label, prop, customRender }) => {
        let vnode = this.data[prop]
        if (_.isFunction(customRender)) {
          vnode = customRender({
            [prop]: this.data[prop],
            data: this.data
          })
        }
        return (
          <div class='md-descriptions-item'>
            <b style={{ width: lw }}> {label}: </b>
            <div> { vnode } </div>
          </div>
        )
      })
    }
    return (
      <div class='md-descriptions'>
        <RenderItem />
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>

.md-descriptions-item{
  line-height: 25px;
  display: flex;
  >b {
    color: rgba(0,0,0,.55) ;
    text-align: right;
    padding-right: 4px;
  }
}

</style>
