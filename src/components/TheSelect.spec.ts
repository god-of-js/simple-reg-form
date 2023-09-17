/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheSelect from './TheSelect.vue'

describe('src/components/TheSelect', () => {
  const options = [
    {
      label: 'United States',
      value: 'usa',
    },
    {
      label: 'United Kingdom',
      value: 'uk',
    },
    {
      label: 'Germany',
      value: 'de',
    },
    {
      label: 'Russia',
      value: 'ru',
    },
    {
      label: 'Nigeria',
      value: 'ng',
    },
    {
      label: 'South Africa',
      value: 'sa',
    },
  ]
  it('Options are visible when button is clicked', async () => {
    const wrapper = mount(TheSelect, {
      props: {
        modelValue: '',
        options,
        name: 'select',
      },
    })
    await wrapper.find('button').trigger('click')

    const optionList = wrapper.find('ul')
    expect(optionList.exists()).toBe(true)
  })
  it('Search through options is functional', async () => {
    const wrapper = mount(TheSelect, {
      props: {
        modelValue: '',
        options,
        name: 'select',
      },
    })
    await wrapper.find('button').trigger('click')

    const input = wrapper.find('input')

    await input.setValue('United')

    expect(wrapper.find('#usa').exists()).toBe(true)
    expect(wrapper.find('#uk').exists()).toBe(true)
    expect(wrapper.find('#sa').exists()).toBe(false)
  })
  it('Value is sent to parent through model', async () => {
    const wrapper = mount(TheSelect, {
      props: {
        modelValue: '',
        options,
        name: 'select',
      },
    })
    await wrapper.find('button').trigger('click')

    const option = wrapper.find('li')
    await option.trigger('click')

    expect((wrapper.emitted()['update:model-value'][0] as string[])[0]).toBe(options[0].value)
  })
})
