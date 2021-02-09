import * as U from './util'
import * as _ from '../src/BooleanAlgebra'
import * as B from '../src/boolean'

describe('BooleanAlgebra', () => {
  it('booleanAlgebraVoid', () => {
    const BA = _.booleanAlgebraVoid
    U.deepStrictEqual(BA.implies(undefined, undefined), undefined)

    U.deepStrictEqual(BA.join(undefined, undefined), undefined)

    U.deepStrictEqual(BA.meet(undefined, undefined), undefined)

    U.deepStrictEqual(BA.not(undefined), undefined)

    U.deepStrictEqual(BA.one, undefined)
    U.deepStrictEqual(BA.zero, undefined)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = _.getDualBooleanAlgebra(B.BooleanAlgebra)
    U.deepStrictEqual(BA.implies(true, true), true)
    U.deepStrictEqual(BA.implies(true, false), false)
    U.deepStrictEqual(BA.implies(false, true), true)
    U.deepStrictEqual(BA.implies(false, false), true)

    U.deepStrictEqual(BA.join(true, true), true)
    U.deepStrictEqual(BA.join(true, false), false)
    U.deepStrictEqual(BA.join(false, true), false)
    U.deepStrictEqual(BA.join(false, false), false)

    U.deepStrictEqual(BA.meet(true, true), true)
    U.deepStrictEqual(BA.meet(true, false), true)

    U.deepStrictEqual(BA.not(true), false)
    U.deepStrictEqual(BA.not(false), true)

    U.deepStrictEqual(BA.one, false)
    U.deepStrictEqual(BA.zero, true)
  })
})
