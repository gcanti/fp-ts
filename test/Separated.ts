import { increment, pipe } from '../src/function'
import * as _ from '../src/Separated'
import * as U from './util'

describe('Separated', () => {
  it('map', () => {
    U.deepStrictEqual(pipe(_.separated('a', 1), _.map(increment)), _.separated('a', 2))
  })

  it('bimap', () => {
    U.deepStrictEqual(pipe(_.separated(2, 1), _.bimap(increment, increment)), _.separated(3, 2))
  })

  it('mapLeft', () => {
    U.deepStrictEqual(pipe(_.separated(2, 1), _.mapLeft(increment)), _.separated(3, 1))
  })
})
