/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheInput from './TheInput.vue'

describe('src/components/TheInput', () => {
  it('Input sends data to parent.', () => {
    const wrapper = mount(TheInput, {
      props: {
        modelValue: '',
        name: 'input',
      },
    })

    const input = wrapper.find('input')

    input.setValue('hola amigo')
    expect(wrapper.emitted()['update:modelValue']).toBeDefined()
    expect(wrapper.emitted()['update:modelValue'][0]).toContain('hola amigo')
  })

  it('Input shows error state when error is passed', () => {
    const wrapper = mount(TheInput, {
      props: {
        modelValue: '',
        error: 'Something went wrong',
        name: 'input',
      },
    })

    const input = wrapper.find('input')

    expect(input.element.classList.contains('b-red')).toBe(true)
  })

  it('Check default input type is been set', () => {
    const wrapper = mount(TheInput, {
      props: {
        modelValue: '',
        name: 'input',
      },
    })

    const input = wrapper.find('input')

    expect(input.element.type).toBe('text')
  })
})
