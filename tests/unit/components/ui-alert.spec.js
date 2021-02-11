// Libraries
import Vuetify from 'vuetify'
// Components
import UiAlert from '@/components/ui-alert.vue'
// Utilities
// use mount instead of shallowMount for Vuetify 
import { createLocalVue, mount } from '@vue/test-utils'

describe('UiAlert.vue', () => {
  // use the Vuetify object in a localVue instance and pass an instance to the mount functions options
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const mountInstance = (options) => mount(UiAlert, { localVue, vuetify, ...options })

  it('renders default title and subtitle when no props passed', () => {
    const wrapper = mountInstance({
      propsData: { value: true }
    })
    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    expect(title.text()).toMatch(wrapper.vm.$props.title)
    expect(subtitle.text()).toMatch(wrapper.vm.$props.subtitle)
  })

  it('renders title and subtitle when props passed', () => {
    const titleMsg = 'alert title msg'
    const subtitleMsg = 'alert subtitle msg'
    const wrapper = mountInstance({
      propsData: {
        value: true,
        title: titleMsg,
        subtitle: subtitleMsg
      }
    })
    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    expect(title.text()).toMatch(titleMsg)
    expect(subtitle.text()).toMatch(subtitleMsg)
  })

  it('should not render anything when it is closed', () => {
    const wrapper = mountInstance({
      propsData: { value: false }
    })
    const card = wrapper.find('[data-test="card"]')
    expect(card.exists()).toBeFalsy()
  })

  it('should not render anything by default', () => {
    const wrapper = mountInstance()
    const card = wrapper.find('[data-test="card"]')
    expect(card.exists()).toBeFalsy()
  })

  it('emits (\'input\', false) when yes button clicked', async () => {
    const wrapper = mountInstance({
      propsData: { value: true }
    })
    wrapper.find('[data-test="yesBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('emits (\'ok\') when yes button clicked', async () => {
    const wrapper = mountInstance({
      propsData: { value: true }
    })
    wrapper.find('[data-test="yesBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('ok')).toBeTruthy()
    expect(wrapper.emitted('ok').length).toBe(1)
  })

  it('emits (\'input\', false) when no button clicked', async () => {
    const wrapper = mountInstance({
      propsData: { value: true }
    })
    wrapper.find('[data-test="noBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })
})
