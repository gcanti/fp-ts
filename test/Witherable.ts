import * as U from './util'
import * as T from '../src/Task'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/Witherable'
import * as RA from '../src/ReadonlyArray'
import * as RR from '../src/ReadonlyRecord'

describe('Witherable', () => {
  describe('filterE', () => {
    it('Applicative1', async () => {
      const filterEArray = _.filterE(RA.Witherable)(T.ApplicativePar)((n: number) => T.of(n % 2 === 0))
      U.deepStrictEqual(await filterEArray([1, 2])(), [2])

      const filterERecord = _.filterE(RR.Witherable)(T.ApplicativePar)((n: number) => T.of(n % 2 === 0))
      U.deepStrictEqual(await filterERecord({ a: 1, b: 2 })(), { b: 2 })
    })
    it('Applicative2', async () => {
      const filterEArray = _.filterE(RA.Witherable)(RT.ApplicativePar)((n: number) => RT.of(n % 2 === 0))
      U.deepStrictEqual(await filterEArray([1, 2])({})(), [2])

      const filterERecord = _.filterE(RR.Witherable)(RT.ApplicativePar)((n: number) => RT.of(n % 2 === 0))
      U.deepStrictEqual(await filterERecord({ a: 1, b: 2 })({})(), { b: 2 })
    })
  })
})
