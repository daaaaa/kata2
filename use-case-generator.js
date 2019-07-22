'use strict'

const tap = require('tap')
const kata = require('./index.js')
const bowling = require('./bowling.js')
const fs = require('fs')
const shuffle = require('shuffle-array')

tap.test('Bowling kata', (t) => {

  t.test('Input error case 1', (t) => {
    t.throws(
      () => kata(),
      new Error(bowling.MISSING_ARRAY_OF_POINTS)
    )
    t.end()
  })

  t.test('requirement 1', (t) => {
    function testRunnerCase1(input, output) {
      t.strictSame(kata(input).total, output)
    }

    const testCases = [
      [
        [1, 2, 1, 2, 10, 5, 5, 10, 10, 0, 7, 8, 2, 1, 1, 3, 7, 10],
        123,
      ],
      [
        [5, 5, 10, 10, 10, 10, 9, 1, 2, 4, 6, 4, 4, 6, 5, 5, 5],
        191,
      ],
      [
        [8, 2, 10, 10, 9, 0, 0, 0, 0, 2, 0, 10, 10, 9, 1, 10, 9, 1],
        159,
      ],
      [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        300,
      ],
      [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10],
        270,
      ],
    ]
    testCases.forEach(([input, output], index) => {
      testRunnerCase1(input, output)
      fs.writeFileSync(`use-cases/use-cases-1/input-${index}.json`, JSON.stringify(input), null, 2)
      fs.writeFileSync(`use-cases/use-cases-1/output-${index}.json`, JSON.stringify({ total: output }, null, 2))
    })
    t.end()
  })

  t.test('requirement 2', t => {
    function testRunnerCase2(input, output) {
      t.strictSame(kata(input), output)
    }

    const testCasesError = [
      [
        [12, 1, 3],
        {
          valid: false,
          error: 'Invalid roll',
          total: null,
        }
      ],
      [
        [10, 1, 3],
        {
          valid: false,
          error: 'Not enough rolls',
          total: null,
        }
      ],
      [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 3],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 7, 8],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 10],
        {
          valid: false,
          error: 'Invalid frame',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 2, 9],
        {
          valid: false,
          error: 'Invalid frame',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 1, 1],
        {
          valid: false,
          error: 'Too many rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 10, 1],
        {
          valid: false,
          error: 'Invalid frame',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10],
        {
          valid: false,
          error: 'Not enough rolls',

          total: null,
        }
      ],
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 8],
        {
          valid: false,
          error: 'Not enough rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10],
        {
          valid: false,
          error: 'Not enough rolls',
          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        {
          valid: false,
          error: 'Not enough rolls',

          total: null,
        }
      ],
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 10],
        {
          valid: false,
          error: 'Not enough rolls',
          total: null,
        }
      ],
      [
        [9, 3],
        {
          valid: false,
          error: 'Invalid frame',
          total: null,
        }
      ],
      [
        [10, 1, 10],
        {
          valid: false,
          error: 'Invalid frame',
          total: null,
        }
      ]
    ]
    const testCasesValid = [
      [
        [5, 0, 2, 3, 4, 5, 6, 4, 3, 2, 5, 5, 4, 6, 8, 2, 3, 2, 3, 4],
        {
          valid: true,
          error: null,
          total: 94,
        }
      ],
      [
        [10, 9, 1, 5, 5, 5, 5, 6, 3, 6, 3, 2, 7, 8, 2, 5, 5, 9, 1, 2],
        {
          valid: true,
          error: null,
          total: 139,
        }
      ],
      [
        [10, 10, 9, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        {
          valid: true,
          error: null,
          total: 169,
        }
      ],
      [
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        {
          valid: true,
          error: null,
          total: 150,
        }
      ],
      [
        [9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9],
        {
          valid: true,
          error: null,
          total: 190,
        }
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        {
          valid: true,
          error: null,
          total: 0,
        }
      ]
    ]

    t.test('requirement 2 - errors', (t) => {
      testCasesError.forEach(([input, output]) => {
        testRunnerCase2(input, output)
      })
      t.end()
    })
    t.test('requirement 2 - valid', (t) => {
      testCasesValid.forEach(([input, output]) => {
        testRunnerCase2(input, output)
      })
      t.end()
    })

    const testCases = shuffle([...testCasesError, ...testCasesValid])
    testCases.forEach(([input, output], index) => {
      fs.writeFileSync(`use-cases/use-cases-2/input-${index}.json`, JSON.stringify(input), null, 2)
      fs.writeFileSync(`use-cases/use-cases-2/output-${index}.json`, JSON.stringify(output, null, 2))
    })
    t.end()
  })

  t.end()

})


