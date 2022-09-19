export { default as Cart } from '../..\\components\\Cart.vue'
export { default as CartItem } from '../..\\components\\CartItem.vue'
export { default as Detail } from '../..\\components\\Detail.vue'
export { default as Error } from '../..\\components\\error.vue'
export { default as Header } from '../..\\components\\Header.vue'
export { default as Landing } from '../..\\components\\Landing.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
