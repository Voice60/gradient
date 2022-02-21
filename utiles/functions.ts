import { Gradient, GradientsType } from "../types"

export const getGradientProperty = (gradient: string[], opacity = '' as string): string => {
  let grd: string[] = gradient.map(e => '#' + e + opacity)
  return `linear-gradient(90deg, ${grd.join(`, `)})`
}

export const copyGradient = (gradient: string[]): void => {
  navigator.clipboard.writeText('background: ' + getGradientProperty(gradient))
}

export const generateLetter = (): string => {
  type hexLetter = string | number
  const hexArray: hexLetter[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const n = Math.floor(Math.random() * 16)
  return hexArray[n].toString()
}

export const generateGradient = (): Gradient => {
  const newGradient: Gradient = []
  for (let i = 0; i < 2; i++) {
    let grd: string = ''
    for (let k = 0; k < 6; k++) {
      grd += generateLetter()
    }
    newGradient.push(grd)
  }
  return newGradient
}

export const saveGradientInStorage = (gradient: Gradient): void => {
    const gradients: GradientsType = JSON.parse(localStorage.gradients ? localStorage.gradients : '[]')
    gradients.unshift(gradient)
    localStorage.setItem('gradients', JSON.stringify(gradients))
}