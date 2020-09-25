<script>
import _ from 'lodash'

export default {
  name: 'PageFormItemLabel',
  props: {
    label: {
      type: [String, Function],
      default: undefined
    }
  },
  created() {
    console.log(this)
  },
  render(h) {
    let content = this.label
    if (_.isFunction(this.label)) {
      content = this.label(h)
    }
    return (
      <div>
        { content }
      </div>
    )
  }
}
</script>

