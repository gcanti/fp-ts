import * as N from '../src/number'
import { pipe } from '../src/function'
import * as _ from '../src/Monoid'
import * as U from './util'
import * as B from '../src/boolean'
import * as S from '../src/string'

describe('Monoid', () => {
  it('tuple', () => {
    const M1 = _.tuple(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])
    const M2 = _.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
  })

  it('fold', () => {
    U.deepStrictEqual(_.fold(N.MonoidSum)([1, 2, 3]), 6)
  })

  it('min', () => {
    const M = _.min(N.Bounded)
    U.deepStrictEqual(_.fold(M)([]), +Infinity)
    U.deepStrictEqual(_.fold(M)([1]), 1)
    U.deepStrictEqual(_.fold(M)([1, -1]), -1)
  })

  it('max', () => {
    const M = _.max(N.Bounded)
    U.deepStrictEqual(_.fold(M)([]), -Infinity)
    U.deepStrictEqual(_.fold(M)([1]), 1)
    U.deepStrictEqual(_.fold(M)([1, -1]), 1)
  })

  it('reverse', () => {
    const M = _.reverse(S.Monoid)
    U.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
    U.deepStrictEqual(pipe('a', M.concat(M.empty)), 'a')
    U.deepStrictEqual(pipe(M.empty, M.concat('a')), 'a')
  })
})
