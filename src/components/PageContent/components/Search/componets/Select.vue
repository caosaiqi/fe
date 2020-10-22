<script>
import _ from 'lodash'

export default {
  name: 'PageFormItemSelect',
  props: {
    id: {
      required: true,
      type: [String, Number]
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: [Array, Function],
      default: () => ([])
    },
    width: {
      type: [String, Number],
      default: () => 210
    },
    optionRender: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      children: null,
      loading: false
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    option(item, index) {
      return (
        <el-option
          key={`${item.value}_${index}`}
          label={item.label}
          value={item.value}
        />
      )
    },
    async getOptions() {
      if (_.isArray(this.options) && !_.isEmpty(this.options)) {
        this.children = this.options.map(this.option)
      }
      if (_.isFunction(this.options)) {
        try {
          this.loading = true
          const fetchOptions = await this.options()
          if (_.isArray(fetchOptions)) {
            this.children = fetchOptions.map(this.option)
          }
        } catch (err) {
          this.children = []
          throw err
        } finally {
          this.loading = false
        }
      }
    },
    handleChange(newValue) {
      this.$emit('update:value', newValue)
    }
  },
  render() {
    return (
      <el-select
        loading={this.loading}
        value={this.value}
        placeholder={this.placeholder}
        clearable={true}
        width={this.width}
        onChange={this.handleChange}
      >
        {
          this.children
        }
      </el-select>
    )
  }
}
</script>
