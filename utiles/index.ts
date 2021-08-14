export const getGradientProperty = (gradient: string[], opacity = '' as string): string => {
  let grd: string[] = gradient.map(e => '#'+ e + opacity)
  return `linear-gradient(90deg, ${grd.join(`, `)})`
}