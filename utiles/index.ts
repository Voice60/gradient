export const getGradientProperty = (gradient: string[]): string => {
  let grd: string[] = gradient.map(e => '#' + e)
  return `linear-gradient(90deg, ${grd.join(', ')})`
}