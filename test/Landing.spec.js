import { mount } from '@vue/test-utils'
import Landing from '@/components/Landing.vue'

describe('Landing', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Landing)
    expect(wrapper.vm).toBeTruthy()
  })
})
