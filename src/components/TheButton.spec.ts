/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import TheButton from './TheButton.vue'

describe('src/components/TheButton.vue', () => {
  it('Button emits click to parent', () => {
    const wrapper = mount(TheButton)

    wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeDefined()
  })

  it('Button does not emit when disabled', () => {
    const wrapper = mount(TheButton, {
      props: {
        disabled: true,
      },
    })

    wrapper.trigger('click')

    expect(wrapper.emitted().click).not.toBeDefined()
  })

  it('Button contains slot', () => {
    const wrapper = mount(TheButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'test',
      },
    })

    expect(wrapper.text()).toBe('test')
  })

  it('Button removes slot when loading and shows loading', () => {
    const wrapper = mount(TheButton, {
      props: {
        disabled: true,
        loading: true,
      },
      slots: {
        default: 'test',
      },
    })

    expect(wrapper.text()).toBe('Loading...')
  })
})
