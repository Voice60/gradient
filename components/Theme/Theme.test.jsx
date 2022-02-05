import { fireEvent, render, screen } from '@testing-library/react';

import Theme from './index';

import '@testing-library/jest-dom/extend-expect';

describe('Theme component', () => {
  it('Theme renders', () => {
    render(<Theme>
      Theme test
    </Theme>)

    expect(screen.getByText('Theme test')).toBeInTheDocument()
  })
  it('Theme is defined in localStorage', () => {
    render(<Theme>
      Theme test
    </Theme>)

    expect(localStorage.darkTheme).not.toBeUndefined()
  })
})