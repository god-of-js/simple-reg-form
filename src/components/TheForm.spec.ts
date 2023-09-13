/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { required } from '@vuelidate/validators'

import type { ValidationArgs } from '@vuelidate/core'
import TheForm from './TheForm.vue'

describe('src/components/TheButton.vue', () => {
  it('Form submits when all rules success', () => {
    const wrapper = mount(TheForm, {
      props: {
        formData: {
          name: 'henry',
        },
        rules: { name: [required] } as ValidationArgs,
      },
    })

    wrapper.trigger('submit')

    expect(wrapper.emitted().formSubmit).toBeDefined()
  })
})
