<script>
import _ from 'lodash'
import mixin from '../mixins/common'
import mixinVnode from '@/mixins/vnode'
import { ACTION_BUTTON_DEFAULT_ATTRS, ACTION_BUTTON_DEFAULT_LABEL } from '../constants'
import Popover from '@@/Popover'
export default {
  name: 'TableActionButton',
  components: {
    Popover
  },
  mixins: [mixin, mixinVnode],
  props: {
    label: {
      type: String,
      default: ACTION_BUTTON_DEFAULT_LABEL
    },
    action: {
      type: Function,
      default: () => {}
    },
    scope: {
      required: true,
      type: Object
    }
  },
  computed: {
    btnAttrs() {
      return Object.assign({}, ACTION_BUTTON_DEFAULT_ATTRS, this.$attrs)
    }
  },
  methods: {
    getParams() {
      const pageTable = this.getTable()
      const { row = {}} = this.scope
      return {
        pageTable,
        row,
        scope: this.scope
      }
    },
    handleClick(e) {
      if (_.isFunction(this.action)) {
        this.action(this.getParams())
      }
    }
  },
  render(h) {
    const Vnode = () => {
      if (this.isRender) {
        const props = this.getParams()
        return this.createApp(props)
      }
      return (
        <a onClick={this.handleClick} class='table-action-button'>
          { this.label }
        </a>
      )
    }
    return (
      <div class='page-table-action-btn'>
        <Vnode />
      </div>
    )
  }
}
</script>

<style>
 .page-table-action-btn {
    display: inline-block;
    padding: 0 3px;
    /* margin: 0px 5px; */
    line-height: 1;
    color: #1890ff
 }
</style>
