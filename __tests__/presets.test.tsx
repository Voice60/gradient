import { fireEvent, render, screen } from '@testing-library/react';
import { getGradientProperty } from '../utiles/functions';

import Presets from '../pages/presets';
import presets from '../data/presets.json';
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

interface IText {
    text: string
} 

const fakeGradient = ['000000', 'ffffff']

describe('Presets page', () => {
  it('Presets page renders', () => {
      
    render(<Presets/>)

    expect(screen.getByRole('heading', {name: 'Presets'})).toBeInTheDocument()
  })
  it('Every preset renders', () => {
      
    render(<Presets/>)
    presets.forEach((preset) => {
        expect(screen.getByText(preset.title)).toBeInTheDocument()
        preset.gradients.forEach((gradient) => {
            gradient.forEach((gradientColor) => {
                expect(screen.getByText('#' + gradientColor)).toBeInTheDocument()
            })
        })
    })
    expect(screen.getByRole('heading', {name: 'Presets'})).toBeInTheDocument()
  })
  it('Copy button works', () => {
    render(<Presets/>)

    const buttons = screen.getAllByText('Copy')
    buttons[0].click()
    expect(navigator.clipboard.readText()).toBe('background: ' + getGradientProperty(presets[0].gradients[0]))
  })
  it('A message shows after copying gradient', () => {
    render(<Presets/>)

    const buttons = screen.getAllByText('Copy')
    buttons[0].click()
    expect(screen.getByText('Gradient copied')).toBeInTheDocument()
  })
})