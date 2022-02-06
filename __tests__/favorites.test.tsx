import { fireEvent, render, screen } from '@testing-library/react';
import { getGradientProperty } from '../utiles/functions';

import Favorites from '../pages/favorites';

import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => require('next-router-mock'));

interface IText {
    text: string
} 

const Text: React.FC<IText> = ({text}) => {
    return <h6>{text}</h6>
}

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

describe('Favorites page', () => {
  it('Favorites page renders', () => {
      
    render(<Favorites/>)

    expect(screen.getByRole('heading', {name: 'Favorites'})).toBeInTheDocument()
  })
  it('Favorites page has no saved gradients', () => {
      
    render(<Favorites/>)

    expect(screen.getByText('There is no saved gradients yet')).toBeInTheDocument()
  })
  it('Favorites page has saved gradients', () => {

    localStorage.setItem('gradients', JSON.stringify([['000000', 'ffffff']]))
      
    render(<Favorites/>)

    expect(screen.getByText('#000000')).toBeInTheDocument()
    expect(screen.getByText('#ffffff')).toBeInTheDocument()
  })
  it('Delete button works', () => {

    localStorage.setItem('gradients', JSON.stringify([['000000', 'ffffff']]))
      
    render(<Favorites/>)

    const button = screen.getByLabelText('delete gradient')
    button.click()

    expect(screen.queryByText('#000000')).toBeNull()
    expect(screen.queryByText('#ffffff')).toBeNull()
    expect(Array.isArray(JSON.parse(localStorage.gradients))).toBeTruthy()
    expect(JSON.parse(localStorage.gradients).length === 0).toBeTruthy()
  })
  it('Copy button works', () => {

    const gradient = ['000000', 'ffffff']
    localStorage.setItem('gradients', JSON.stringify([gradient]))
      
    render(<Favorites/>)

    const button = screen.getByText('Copy')
    button.click()
    expect(navigator.clipboard.readText()).toBe('background: ' + getGradientProperty(gradient))
  })
  it('A message shows after copying gradient', () => {

    const gradient = ['000000', 'ffffff']
    localStorage.setItem('gradients', JSON.stringify([gradient]))
      
    render(<Favorites/>)

    const button = screen.getByText('Copy')
    button.click()
    expect(screen.getByText('Gradient copied')).toBeInTheDocument()
  })
})