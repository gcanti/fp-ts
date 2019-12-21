import * as assert from 'assert'
import {
  booleanAlgebraBoolean,
  booleanAlgebraVoid,
  getFunctionBooleanAlgebra,
  getDualBooleanAlgebra
} from '../src/BooleanAlgebra'

describe('BooleanAlgebra', () => {
  it('booleanAlgebraBoolean', () => {
    const BA = booleanAlgebraBoolean
    assert.deepStrictEqual(BA.implies(true, true), true)
    assert.deepStrictEqual(BA.implies(true, false), false)
    assert.deepStrictEqual(BA.implies(false, true), true)
    assert.deepStrictEqual(BA.implies(false, false), true)

    assert.deepStrictEqual(BA.join(true, true), true)
    assert.deepStrictEqual(BA.join(true, false), true)
    assert.deepStrictEqual(BA.join(false, true), true)
    assert.deepStrictEqual(BA.join(false, false), false)

    assert.deepStrictEqual(BA.meet(true, true), true)
    assert.deepStrictEqual(BA.meet(true, false), false)

    assert.deepStrictEqual(BA.not(true), false)
    assert.deepStrictEqual(BA.not(false), true)

    assert.deepStrictEqual(BA.one, true)
    assert.deepStrictEqual(BA.zero, false)
  })

  it('booleanAlgebraVoid', () => {
    const BA = booleanAlgebraVoid
    assert.deepStrictEqual(BA.implies(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.join(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.meet(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.not(undefined), undefined)

    assert.deepStrictEqual(BA.one, undefined)
    assert.deepStrictEqual(BA.zero, undefined)
  })

  it('getFunctionBooleanAlgebra', () => {
    const BA = getFunctionBooleanAlgebra(booleanAlgebraBoolean)<number>()
    const f = (n: number) => n >= 0
    const g = (n: number) => n < 2
    assert.deepStrictEqual(BA.implies(f, g)(1), true)
    assert.deepStrictEqual(BA.implies(f, g)(-1), true)

    assert.deepStrictEqual(BA.join(f, g)(1), true)
    assert.deepStrictEqual(BA.join(f, g)(-1), true)

    assert.deepStrictEqual(BA.meet(f, g)(1), true)
    assert.deepStrictEqual(BA.meet(f, g)(-1), false)

    assert.deepStrictEqual(BA.not(f)(1), false)
    assert.deepStrictEqual(BA.not(f)(-1), true)

    assert.deepStrictEqual(BA.one(1), true)
    assert.deepStrictEqual(BA.one(-1), true)
    assert.deepStrictEqual(BA.zero(1), false)
    assert.deepStrictEqual(BA.zero(-1), false)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = getDualBooleanAlgebra(booleanAlgebraBoolean)
    assert.deepStrictEqual(BA.implies(true, true), true)
    assert.deepStrictEqual(BA.implies(true, false), false)
    assert.deepStrictEqual(BA.implies(false, true), true)
    assert.deepStrictEqual(BA.implies(false, false), true)

    assert.deepStrictEqual(BA.join(true, true), true)
    assert.deepStrictEqual(BA.join(true, false), false)
    assert.deepStrictEqual(BA.join(false, true), false)
    assert.deepStrictEqual(BA.join(false, false), false)

    assert.deepStrictEqual(BA.meet(true, true), true)
    assert.deepStrictEqual(BA.meet(true, false), true)

    assert.deepStrictEqual(BA.not(true), false)
    assert.deepStrictEqual(BA.not(false), true)

    assert.deepStrictEqual(BA.one, false)
    assert.deepStrictEqual(BA.zero, true)
  })
})
