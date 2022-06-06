import * as _ from '../src/Alternative'
import * as M from '../src/Monoid'
import * as NEA from '../src/NonEmptyArray'
import * as O from '../src/Option'
import * as S from '../src/Semigroup'
import * as U from './util'

describe('Alternative', () => {
  it('altAll', () => {
    const altAll = _.altAll(O.Alternative)
    U.deepStrictEqual(altAll([]), O.none)
    U.deepStrictEqual(altAll([O.none]), O.none)
    U.deepStrictEqual(altAll([O.none, O.some(1)]), O.some(1))
  })

  it('getAlternativeMonoid', () => {
    const altConcatAll = M.concatAll(_.getAlternativeMonoid(O.Alternative)(NEA.getSemigroup<number>()))
    U.deepStrictEqual(altConcatAll([]), O.none)
    U.deepStrictEqual(altConcatAll([O.none]), O.none)
    U.deepStrictEqual(altConcatAll([O.none, O.some([1]), O.some([2])]), O.some([1, 2]))

    const pickFirst = _.getAlternativeMonoid(O.Alternative)(S.first<string>())
    U.deepStrictEqual(pickFirst.concat(O.some('a'), O.some('b')), O.some('a'))
    U.deepStrictEqual(pickFirst.concat(O.none, O.some('b')), O.some('b'))
    U.deepStrictEqual(pickFirst.concat(O.some('a'), O.none), O.some('a'))

    const pickLast = _.getAlternativeMonoid(O.Alternative)(S.last<string>())
    U.deepStrictEqual(pickLast.concat(O.some('a'), O.some('b')), O.some('b'))
    U.deepStrictEqual(pickLast.concat(O.none, O.some('b')), O.some('b'))
    U.deepStrictEqual(pickLast.concat(O.some('a'), O.none), O.some('a'))
  })
})
