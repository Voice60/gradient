import { fireEvent, render, screen } from '@testing-library/react';

import Generate from '../pages/generate';
import { getGradientProperty } from '../utiles/functions';

import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => require('next-router-mock'));

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  let clipboardData = '' //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
      writeText: jest.fn(
          (data) => {clipboardData = data}
      ),
      readText: jest.fn(
          () => {return clipboardData}  
      ),
  };
  //@ts-ignore
  global.navigator.clipboard = mockClipboard;

});

afterEach(() => {
  jest.resetAllMocks();
  //@ts-ignore
  global.navigator.clipboard = originalClipboard;
});

describe('Generate page', () => {
  it('Generate page renders', () => {
    render(<Generate />)

    expect(screen.getByText('Generator')).toBeInTheDocument()
    expect(screen.getByText('generate')).toBeInTheDocument()
    expect(screen.getByText('save')).toBeInTheDocument()
    expect(screen.getByText('copy')).toBeInTheDocument()
    expect(screen.getByText('copy').closest('button')).toBeDisabled();
    expect(screen.getByText('save').closest('button')).toBeDisabled();
    expect(screen.queryByText('delete')).toBeNull();
  })
  it('Generate button works', () => {
    render(<Generate />)
    const button = screen.getByText('generate')
    button.click()
    expect(screen.getByText('generate')).toBeInTheDocument()
    expect(screen.getByText('save')).toBeInTheDocument()
    expect(screen.getByText('copy')).toBeInTheDocument()
    expect(screen.getByText(/^background: linear-gradient\(90deg, #(\p{Hex_Digit})+, #(\p{Hex_Digit})+\)$/u)).toBeInTheDocument()
  })
  it('Save button works', () => {
    render(<Generate />)
    expect(localStorage.gradients).toBeUndefined()

    const generateButton = screen.getByText('generate')
    generateButton.click()

    const saveButton = screen.getByText('save')
    saveButton.click()
    const gradients = JSON.parse(localStorage.gradients)
    expect(Array.isArray(gradients)).toBeTruthy()
    expect(gradients.length).toBe(1)
    expect(Array.isArray(gradients[0])).toBeTruthy()
    expect(gradients[0].length).toBeGreaterThan(1)
    gradients[0].forEach(((gradient: string): void => {
      expect(gradient).toMatch(/^[0-9a-fA-F]+$/)
    }))

    expect(screen.getByText(/^background: linear-gradient\(90deg, #(\p{Hex_Digit})+, #(\p{Hex_Digit})+\)$/u)).toBeInTheDocument()
  })
  it('Delete button shows after saving a gradient', () => {
    render(<Generate />)

    const generateButton = screen.getByText('generate')
    generateButton.click()

    const saveButton = screen.getByText('save')
    saveButton.click()

    expect(screen.getByText('delete')).toBeInTheDocument()
  })
  it('Copy button works', () => {
    render(<Generate />)

    const generateButton = screen.getByText('generate')
    generateButton.click()

    const copyButton = screen.getByText('copy')
    copyButton.click()

    expect(navigator.clipboard.readText()).toMatch(/^background: linear-gradient\(90deg, #(\p{Hex_Digit})+, #(\p{Hex_Digit})+\)$/u)
  })
  it('Copy message shows', () => {
    render(<Generate />)

    const generateButton = screen.getByText('generate')
    generateButton.click()

    const copyButton = screen.getByText('copy')
    copyButton.click()

    expect(screen.getByText('Gradient copied')).toBeInTheDocument()
  })
})