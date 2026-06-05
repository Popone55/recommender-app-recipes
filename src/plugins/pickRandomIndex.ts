export const pickRandomIndex = (length: number, excludeIndex?: number | null) => {
  if (length <= 0) {
    return -1
  }

  if (length === 1) {
    return 0
  }

  let index = Math.floor(Math.random() * length)

  while (excludeIndex != null && index === excludeIndex) {
    index = Math.floor(Math.random() * length)
  }

  return index
}
