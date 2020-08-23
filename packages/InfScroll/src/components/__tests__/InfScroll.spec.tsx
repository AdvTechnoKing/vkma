import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { InfScroll } from '../../index'

test('Renders', async () => {
  const func = () => {
    return new Promise(res=>{res(true)})
  }
  const { getByText } = render(<InfScroll loader="123" onReachEnd={func}>text</InfScroll>)
  expect(getByText('text')).toHaveTextContent('123')
})
