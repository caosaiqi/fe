<script>
import _ from 'lodash'

export default {
  name: 'PageFormItemSelect',

  props: {
    model: {
      type: Object,
      required: true
    },
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
    },
    listener: {
      type: [Boolean, String, Array],
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
    this.initOptions()
  },
  methods: {
    optionsRender(options = []) {
      return options.map((item, index) => (
        <el-option
          key={`${item.value}_${index}`}
          label={item.label}
          value={item.value}
        />
      ))
    },
    async fetchOptions() {
      try {
        this.loading = true
        const list = await this.options(this.model)
        this.children = this.optionsRender(list)
      } catch (err) {
        this.children = []
        throw err
      } finally {
        this.loading = false
      }
    },
    initOptions() {
      if (_.isArray(this.options) && !_.isEmpty(this.options)) {
        this.children = this.optionsRender(this.options)
      }
      if (!_.isFunction(this.options)) return []

      // 监听model
      if (_.isString(this.listener)) {
        this.$watch(`model.${this.listener}`, this.fetchOptions, { immediate: true })
      }

      if (_.isArray(this.listener)) {
        this.listener.forEach((key, index) => {
          this.$watch(`model.${key}`, this.fetchOptions, { immediate: true })
        })
      }

      if (_.isUndefined(this.listener)) {
        this.fetchOptions()
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
