import { render, screen } from '@testing-library/react';

import Layout from './index';

import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => require('next-router-mock'));

describe('Layout component', () => {
  it('Layout renders', () => {
    render(<Layout>
      Layout test
    </Layout>)

    expect(screen.getByText('Layout test')).toBeInTheDocument()
  })
})