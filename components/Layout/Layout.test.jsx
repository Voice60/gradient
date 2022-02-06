import { fireEvent, render, screen } from '@testing-library/react';

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
  it('Drawer button works', () => {
    render(<Layout>
      Layout test
    </Layout>)

    const button = screen.getByLabelText('menu')
    button.click()
    expect(screen.getByText('Generate gradient')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByText('Presets')).toBeInTheDocument()
    expect(screen.getByText('Dark theme')).toBeInTheDocument()
  })
  it('Switch theme button works', () => {
    render(<Layout>
      Layout test
    </Layout>)

    const button = screen.getByLabelText('menu')
    button.click()
    expect(localStorage.darkTheme).toBeUndefined
    screen.getByRole('checkbox').click()
    expect(localStorage.darkTheme).toBe('true')
    screen.getByRole('checkbox').click()
    expect(localStorage.darkTheme).toBe('false')
  })

})