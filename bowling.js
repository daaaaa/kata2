'use strict'

const R = require('ramda')
const MISSING_ARRAY_OF_POINTS = 'MISSING_ARRAY_OF_POINTS'

module.exports = (rollPoints) => {
  if (Array.isArray(rollPoints) === false) {
    throw new Error(MISSING_ARRAY_OF_POINTS)
  }

  try {
    const [rollsInFrames] = R.reduce(([acc, prevFrame], roll) => {
      if (roll < 0 || roll > 10) {
        throw new Error('Invalid roll')
      }

      if (acc.length === 10) {
        if (prevFrame.length === 3) {
          throw new Error('Too many rolls')
        }

        if (prevFrame[1] === 10) {
          const frame = [...prevFrame, roll]
          return [R.update(9, frame, acc), frame]
        }

        if (prevFrame.length === 2 && prevFrame[0] + prevFrame[1] < 10) {
          throw new Error('Too many rolls')
        }

        if (prevFrame.length === 2 && prevFrame[0] + prevFrame[1] === 10) {
          const frame = [...prevFrame, roll]
          return [R.update(9, frame, acc), frame]
        }

        if (prevFrame.length === 2 && prevFrame[1] + roll > 10) {
          throw new Error('Invalid frame')
        }

        if (prevFrame[0] === 10) {
          const frame = [...prevFrame, roll]
          return [R.update(9, frame, acc), frame]
        }

        if (prevFrame[0] < 10 && prevFrame[0] + roll <= 10) {
          const frame = [...prevFrame, roll]
          return [R.update(9, frame, acc), frame]
        }

        throw new Error('Invalid frame')
      }

      if (acc.length === 9) {
        const frame = [...prevFrame, roll]
        return [[...acc, frame], frame]
      }

      // case empty prev frame
      if (R.isEmpty(prevFrame)) {
        if (roll === 10) {
          return [[...acc, [10]], []]
        }
        return [acc, [roll]]
      }

      if (prevFrame[0] + roll > 10) {
        throw new Error('Invalid frame')
      }

      return [[...acc, [...prevFrame, roll]], []]
    }, [[], []])
    (rollPoints)

    if (rollsInFrames.length < 10) {
      throw new Error('Not enough rolls')
    }

    if (rollsInFrames.length === 10 && rollsInFrames[9].length < 2) {
      throw new Error('Not enough rolls')
    }

    if (rollsInFrames.length === 10 && rollsInFrames[9][0] === 10 && rollsInFrames[9].length < 3) {
      throw new Error('Not enough rolls')
    }

    if (rollsInFrames.length === 10 && rollsInFrames[9][0] + rollsInFrames[9][1] === 10 && rollsInFrames[9].length < 3) {
      throw new Error('Not enough rolls')
    }

    const frame = (rawFrame) => ({
      isStrike: rawFrame.length === 1,
      isSpare: rawFrame.length === 2 && (rawFrame[0] + rawFrame[1] === 10),
      total: rawFrame.reduce((acc, next) => acc + next, 0),
      rawFrame,
      rollOne: rawFrame[0],
      rollTwo: rawFrame[1] || 0,
      rollThree: rawFrame[2] || 0,
    })

    const structuredFrames = rollsInFrames
      .map(frame)

    const total = structuredFrames
      .reduce((acc, next, index) => {
        if (index === 9) {
          return acc + next.total
        }

        if (next.isStrike) {
          if (structuredFrames[index + 1].isStrike) {
            return acc + 10 + 10 + structuredFrames[index + 2].rollOne
          }
          return acc + 10 + structuredFrames[index + 1].rollOne + structuredFrames[index + 1].rollTwo
        }

        if (next.isSpare) {
          return acc + 10 + structuredFrames[index + 1].rollOne
        }

        return acc + next.total
      }, 0)

    return [null, total]
  } catch (error) {
    return [error, null]
  }

}

module.exports.MISSING_ARRAY_OF_POINTS = MISSING_ARRAY_OF_POINTS
