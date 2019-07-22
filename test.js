'use strict'

const tap = require('tap')
const kata = require('./index.js')
const bowling = require('./bowling.js')
const fs = require('fs')

tap.test('Bowling kata', (t) => {

  t.test('Input error case 1', (t) => {
    t.throws(
      () => kata(),
      new Error(bowling.MISSING_ARRAY_OF_POINTS)
    )
    t.end()
  })

  const fileInputReader = basePath => fs
    .readdirSync(basePath)
    .reduce((acc, next, index) => {
      if (next.startsWith('o')) {
        acc[index - acc.length].push(next)
        return acc
      }
      return [...acc, [next]]
    }, [])
    .map(([input, output]) => [
      JSON.parse(fs.readFileSync([basePath, input].join('/'), 'utf8')),
      JSON.parse(fs.readFileSync([basePath, output].join('/'), 'utf8'))
    ])

  t.test('requirement 1', (t) => {
    function testRunnerCase1(input, output) {
      t.strictSame(kata(input).total, output)
    }

    fileInputReader('use-cases/use-cases-1')
      .forEach(([input, output]) => {
        testRunnerCase1(input, output.total)
      })
    t.end()
  })

  t.test('requirement 2', t => {
    function testRunnerCase2(input, output) {
      t.strictSame(kata(input), output)
    }

    fileInputReader('use-cases/use-cases-2')
      .forEach(([input, output]) => {
        testRunnerCase2(input, output)
      })

    t.end()
  })

  t.end()

})


