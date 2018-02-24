'use strict'

const pfn = require('pfn')
const supportBindOperator = require('sbo')

module.exports = supportBindOperator(function * intersperseIterable (iter, separator) {
  const getSep = pfn(separator, separator)
  let i = 0
  let prev
  for (const value of iter) {
    if (i > 0) yield getSep(i - 1, prev, i, value, iter)
    yield value
    prev = value
    i++
  }
})
