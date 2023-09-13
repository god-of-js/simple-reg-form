/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheAlert from './TheAlert.vue'

describe('src/components/TheAlert.vue', () => {
  it('Alert renders the slots.', () => {
    const wrapper = mount(TheAlert, {
      slots: {
        default: 'lorem ipsum',
        prepend: 'prepend',
      },
    })
    const defaultSlotContent = wrapper.find('#default-slot').text()
    const prependSlotContent = wrapper.find('#prepend-slot').text()

    expect(defaultSlotContent).toBe('lorem ipsum')
    expect(prependSlotContent).toBe('prepend')
  })
})
