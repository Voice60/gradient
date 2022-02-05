import { render, screen } from '@testing-library/react';

import Snackbar from './index';

import '@testing-library/jest-dom/extend-expect';

describe('Snackbar component', () => {
  it('Snackbar renders', () => {
    render(<Snackbar isOpen={true} message='test'/>)

    expect(screen.getByText('test')).toBeInTheDocument()
  })
  it('Snackbar does not renders', () => {
    render(<Snackbar isOpen={false} message='test'/>)

    expect(screen.queryByText('test')).toBeNull();
  })
})