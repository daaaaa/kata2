'use strict'

const bowling = require('./bowling')


module.exports = (...input) => {
  const [error, result] = bowling(...input)
  if (error) {
    return {
      valid: false,
      total: null,
      error: error.message,
    }
  }
  return {
    valid: true,
    total: result,
    error: null,
  }
}
