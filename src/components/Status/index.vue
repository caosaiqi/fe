
<script>
import _ from 'lodash'
import constants from './constants'

export default {
  name: 'MdStatus',
  props: {
    // 当前行显示状态
    status: {
      type: [String, Boolean],
      required: true
    },
    statusModule: {
      type: [String, Boolean],
      default: 'enabled'
    }
  },
  computed: {
    statusItems() {
      const obj = {}
      const data = constants[this.statusModule]
      for (const type in data) {
        const items = data[type]
        Object.keys(items).forEach(key => {
          const label = items[key]
          obj[key] = {
            type,
            label
          }
        })
      }
      return obj
    }
  },
  methods: {
    handleCommand(newStatus) {
      if (newStatus === this.status) return
      this.$emit('change', newStatus)
    }
  },
  render() {
    const StatusList = () => {
      return Object.keys(this.statusItems).map((key) => {
        const { label, type } = this.statusItems[key]
        return <el-dropdown-item command={key}> <i class={`${type} status-icon`} /> { label } <i class='el-icon-check' style={{ opacity: this.status.toString() === key ? 1 : 0 }} /> </el-dropdown-item>
      })
    }

    const ActionStatus = () => {
      const item = this.statusItems[this.status]
      if (!item || _.isEmpty(item)) return null
      const { label, type } = item
      return (
        <div class='action-status'>
          <i class={`${type} status-icon`} />
          <span>{ label }</span>
          <i class='el-icon-arrow-down el-icon--right' />
        </div>
      )
    }
    return (
      <div>
        <el-dropdown onCommand={this.handleCommand} placement='bottom' class='status-dropdown'>
          <ActionStatus />
          <el-dropdown-menu slot='dropdown'>
            <StatusList />
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/element-variables";
  .el-icon-check{
    color: $--color-primary;
    padding-left: 8px;
  }
  .status-dropdown {
      .action-status{
        cursor: pointer;
        box-sizing: border-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        .el-icon--right {
          margin-left: 8px;
        }
      }
  }
</style>
