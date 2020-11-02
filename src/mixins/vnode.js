
import Vue from 'vue'
import _ from 'lodash'

const VUE_KEYS = ['data', 'computed', 'watch', 'methods', 'created', 'beforeCreate', 'beforeMount', 'mounted', 'render']

export default {
  props: {
    data: {
      type: Function,
      default: undefined
    },

    computed: {
      type: Object,
      default: undefined
    },

    watch: {
      type: Object,
      default: undefined
    },

    methods: {
      type: Object,
      default: undefined
    },

    created: {
      type: Function,
      default: undefined
    },

    beforeCreate: {
      type: Function,
      default: undefined
    },

    beforeMount: {
      type: Function,
      default: undefined
    },

    mounted: {
      type: Function,
      default: undefined
    },

    render: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    isRender() {
      return this.render && _.isFunction(this.render)
    }
  },
  methods: {
    createApp(props) {
      if (this.isRender) {
        const config = {}
        VUE_KEYS.forEach(key => {
          if (this[key]) {
            config[key] = this[key]
          }
        })
        if (props && _.isObject(props) && !_.isEmpty(props)) {
          config.props = {}
          for (const key in props) {
            config.props[key] = {
              default: () => props[key]
            }
          }
        }

        const Component = Vue.extend(config)
        return <Component />
      }
      return null
    }
  }
}

