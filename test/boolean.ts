import * as U from './util'
import * as _ from '../src/boolean'

describe('boolean', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Eq', () => {
    U.deepStrictEqual(_.Eq.equals(true, true), true)
    U.deepStrictEqual(_.Eq.equals(false, false), true)
    U.deepStrictEqual(_.Eq.equals(false, true), false)
  })

  it('Ord', () => {
    U.deepStrictEqual(_.Ord.compare(false, true), -1)
    U.deepStrictEqual(_.Ord.compare(true, false), 1)
    U.deepStrictEqual(_.Ord.compare(true, true), 0)
  })

  it('Show', () => {
    U.deepStrictEqual(_.Show.show(true), 'true')
    U.deepStrictEqual(_.Show.show(false), 'false')
  })

  it('BooleanAlgebra', () => {
    const BA = _.BooleanAlgebra
    U.deepStrictEqual(BA.implies(true, true), true)
    U.deepStrictEqual(BA.implies(true, false), false)
    U.deepStrictEqual(BA.implies(false, true), true)
    U.deepStrictEqual(BA.implies(false, false), true)

    U.deepStrictEqual(BA.join(true, true), true)
    U.deepStrictEqual(BA.join(true, false), true)
    U.deepStrictEqual(BA.join(false, true), true)
    U.deepStrictEqual(BA.join(false, false), false)

    U.deepStrictEqual(BA.meet(true, true), true)
    U.deepStrictEqual(BA.meet(true, false), false)

    U.deepStrictEqual(BA.not(true), false)
    U.deepStrictEqual(BA.not(false), true)

    U.deepStrictEqual(BA.one, true)
    U.deepStrictEqual(BA.zero, false)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    U.deepStrictEqual(
      _.fold(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    U.deepStrictEqual(
      _.fold(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })
})
