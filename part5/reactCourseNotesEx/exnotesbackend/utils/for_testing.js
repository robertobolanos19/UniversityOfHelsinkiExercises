//!couple of simple functions that we can use for test writing practice:
const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}