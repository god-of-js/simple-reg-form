/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheField from './TheField.vue'

describe('src/components/TheField', () => {
  it('error text is shown when an error is passed', () => {
    const wrapper = mount(TheField, {
      props: {
        error: 'little error',
        name: 'the field',
        suggestion: '',
        label: '',
      },
      slots: {
        default: '<span>Just a test</span>',
      },
    })

    const errorText = wrapper.find('.error-text')

    expect(errorText.exists()).toBe(true)
  })
})
