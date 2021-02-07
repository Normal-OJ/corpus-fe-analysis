// Libraries
import Vuetify from 'vuetify'

// Components
import UiAlert from '@/components/ui-alert.vue'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('UiAlert.vue', () => {
  // use the Vuetify object in a localVue instance and pass an instance to the mount functions options
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders default title and subtitle when no props passed', () => {
    const wrapper = shallowMount(UiAlert, {
      localVue, vuetify,
    })
    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    expect(title.text()).toMatch(wrapper.vm.$props.title)
    expect(subtitle.text()).toMatch(wrapper.vm.$props.subtitle)
  })

  it('renders title and subtitle when props passed', () => {
    const titleMsg = 'alert title msg'
    const subtitleMsg = 'alert subtitle msg'
    const wrapper = shallowMount(UiAlert, {
      localVue, vuetify,
      propsData: {
        title: titleMsg,
        subtitle: subtitleMsg
      }
    })
    const title = wrapper.find('[data-test="title"]')
    const subtitle = wrapper.find('[data-test="subtitle"]')
    expect(title.text()).toMatch(titleMsg)
    expect(subtitle.text()).toMatch(subtitleMsg)
  })

  it('emits (\'input\', false) when yes button clicked', async () => {
    const wrapper = shallowMount(UiAlert, {
      localVue, vuetify,
    })
    wrapper.find('[data-test="yesBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })

  it('emits (\'ok\') when yes button clicked', async () => {
    const wrapper = shallowMount(UiAlert, {
      localVue, vuetify,
    })
    wrapper.find('[data-test="yesBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('ok')).toBeTruthy()
    expect(wrapper.emitted('ok').length).toBe(1)
  })

  it('emits (\'input\', false) when no button clicked', async () => {
    const wrapper = shallowMount(UiAlert, {
      localVue, vuetify,
    })
    wrapper.find('[data-test="noBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([false])
  })
})
