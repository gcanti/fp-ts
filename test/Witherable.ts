import { pipe } from '../src/function'
import * as RT from '../src/ReaderTask'
import * as RA from '../src/ReadonlyArray'
import * as RR from '../src/ReadonlyRecord'
import * as T from '../src/Task'
import * as S from '../src/string'
import * as _ from '../src/Witherable'
import * as U from './util'

describe('Witherable', () => {
  describe('filterE', () => {
    const filterERA = _.filterE(RA.Witherable)
    const filterERR = _.filterE(RR.getWitherable(S.Ord))

    it('Applicative1', async () => {
      const f = (n: number) => T.of(n % 2 === 0)
      U.deepStrictEqual(await pipe([1, 2], filterERA(T.ApplicativePar)(f))(), [2])
      U.deepStrictEqual(await pipe({ a: 1, b: 2 }, filterERR(T.ApplicativePar)(f))(), { b: 2 })
    })

    it('Applicative2', async () => {
      const f = (n: number) => RT.of(n % 2 === 0)
      U.deepStrictEqual(await pipe([1, 2], filterERA(RT.ApplicativePar)(f))({})(), [2])
      U.deepStrictEqual(await pipe({ a: 1, b: 2 }, filterERR(RT.ApplicativePar)(f))({})(), { b: 2 })
    })
  })
})
