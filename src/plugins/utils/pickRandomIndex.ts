export const pickRandomIndex = (length: number, excludeIndex?: number | null) => {
  if (length <= 0) {
    return -1
  }

  if (length === 1) {
    return 0
  }

  let index: number

  do {
    index = Math.floor(Math.random() * length)
  } while (index === excludeIndex)

  return index
}
