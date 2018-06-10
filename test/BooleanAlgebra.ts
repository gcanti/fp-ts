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
    assert.strictEqual(BA.implies(true, true), true)
    assert.strictEqual(BA.implies(true, false), false)
    assert.strictEqual(BA.implies(false, true), true)
    assert.strictEqual(BA.implies(false, false), true)

    assert.strictEqual(BA.join(true, true), true)
    assert.strictEqual(BA.join(true, false), true)
    assert.strictEqual(BA.join(false, true), true)
    assert.strictEqual(BA.join(false, false), false)

    assert.strictEqual(BA.meet(true, true), true)
    assert.strictEqual(BA.meet(true, false), false)

    assert.strictEqual(BA.not(true), false)
    assert.strictEqual(BA.not(false), true)

    assert.strictEqual(BA.one, true)
    assert.strictEqual(BA.zero, false)
  })

  it('booleanAlgebraVoid', () => {
    const BA = booleanAlgebraVoid
    assert.strictEqual(BA.implies(undefined, undefined), undefined)

    assert.strictEqual(BA.join(undefined, undefined), undefined)

    assert.strictEqual(BA.meet(undefined, undefined), undefined)

    assert.strictEqual(BA.not(undefined), undefined)

    assert.strictEqual(BA.one, undefined)
    assert.strictEqual(BA.zero, undefined)
  })

  it('getFunctionBooleanAlgebra', () => {
    const BA = getFunctionBooleanAlgebra(booleanAlgebraBoolean)<number>()
    const f = (n: number) => n >= 0
    const g = (n: number) => n < 2
    assert.strictEqual(BA.implies(f, g)(1), true)
    assert.strictEqual(BA.implies(f, g)(-1), true)

    assert.strictEqual(BA.join(f, g)(1), true)
    assert.strictEqual(BA.join(f, g)(-1), true)

    assert.strictEqual(BA.meet(f, g)(1), true)
    assert.strictEqual(BA.meet(f, g)(-1), false)

    assert.strictEqual(BA.not(f)(1), false)
    assert.strictEqual(BA.not(f)(-1), true)

    assert.strictEqual(BA.one(1), true)
    assert.strictEqual(BA.one(-1), true)
    assert.strictEqual(BA.zero(1), false)
    assert.strictEqual(BA.zero(-1), false)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = getDualBooleanAlgebra(booleanAlgebraBoolean)
    assert.strictEqual(BA.implies(true, true), true)
    assert.strictEqual(BA.implies(true, false), false)
    assert.strictEqual(BA.implies(false, true), true)
    assert.strictEqual(BA.implies(false, false), true)

    assert.strictEqual(BA.join(true, true), true)
    assert.strictEqual(BA.join(true, false), false)
    assert.strictEqual(BA.join(false, true), false)
    assert.strictEqual(BA.join(false, false), false)

    assert.strictEqual(BA.meet(true, true), true)
    assert.strictEqual(BA.meet(true, false), true)

    assert.strictEqual(BA.not(true), false)
    assert.strictEqual(BA.not(false), true)

    assert.strictEqual(BA.one, false)
    assert.strictEqual(BA.zero, true)
  })
})
