import * as assert from 'assert'
import {
  booleanAlgebraBoolean,
  booleanAlgebraVoid,
  getFunctionBooleanAlgebra,
  getDualBooleanAlgebra
} from '../src/BooleanAlgebra'
import { pipe } from '../src/function'

describe('BooleanAlgebra', () => {
  it('booleanAlgebraBoolean', () => {
    const BA = booleanAlgebraBoolean
    assert.deepStrictEqual(pipe(true, BA.implies(true)), true)
    assert.deepStrictEqual(pipe(true, BA.implies(false)), false)
    assert.deepStrictEqual(pipe(false, BA.implies(true)), true)
    assert.deepStrictEqual(pipe(false, BA.implies(false)), true)

    assert.deepStrictEqual(pipe(true, BA.join(true)), true)
    assert.deepStrictEqual(pipe(true, BA.join(false)), true)
    assert.deepStrictEqual(pipe(false, BA.join(true)), true)
    assert.deepStrictEqual(pipe(false, BA.join(false)), false)

    assert.deepStrictEqual(pipe(true, BA.meet(true)), true)
    assert.deepStrictEqual(pipe(true, BA.meet(false)), false)

    assert.deepStrictEqual(BA.not(true), false)
    assert.deepStrictEqual(BA.not(false), true)

    assert.deepStrictEqual(BA.one, true)
    assert.deepStrictEqual(BA.zero, false)
  })

  it('booleanAlgebraVoid', () => {
    const BA = booleanAlgebraVoid
    assert.deepStrictEqual(pipe(undefined, BA.implies(undefined)), undefined)

    assert.deepStrictEqual(pipe(undefined, BA.join(undefined)), undefined)

    assert.deepStrictEqual(pipe(undefined, BA.meet(undefined)), undefined)

    assert.deepStrictEqual(BA.not(undefined), undefined)

    assert.deepStrictEqual(BA.one, undefined)
    assert.deepStrictEqual(BA.zero, undefined)
  })

  it('getFunctionBooleanAlgebra', () => {
    const BA = getFunctionBooleanAlgebra(booleanAlgebraBoolean)<number>()
    const f = (n: number) => n >= 0
    const g = (n: number) => n < 2
    assert.deepStrictEqual(pipe(f, BA.implies(g))(1), true)
    assert.deepStrictEqual(pipe(f, BA.implies(g))(-1), true)

    assert.deepStrictEqual(pipe(f, BA.join(g))(1), true)
    assert.deepStrictEqual(pipe(f, BA.join(g))(-1), true)

    assert.deepStrictEqual(pipe(f, BA.meet(g))(1), true)
    assert.deepStrictEqual(pipe(f, BA.meet(g))(-1), false)

    assert.deepStrictEqual(BA.not(f)(1), false)
    assert.deepStrictEqual(BA.not(f)(-1), true)

    assert.deepStrictEqual(BA.one(1), true)
    assert.deepStrictEqual(BA.one(-1), true)
    assert.deepStrictEqual(BA.zero(1), false)
    assert.deepStrictEqual(BA.zero(-1), false)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = getDualBooleanAlgebra(booleanAlgebraBoolean)
    assert.deepStrictEqual(pipe(true, BA.implies(true)), true)
    assert.deepStrictEqual(pipe(true, BA.implies(false)), false)
    assert.deepStrictEqual(pipe(false, BA.implies(true)), true)
    assert.deepStrictEqual(pipe(false, BA.implies(false)), true)

    assert.deepStrictEqual(pipe(true, BA.join(true)), true)
    assert.deepStrictEqual(pipe(true, BA.join(false)), false)
    assert.deepStrictEqual(pipe(false, BA.join(true)), false)
    assert.deepStrictEqual(pipe(false, BA.join(false)), false)

    assert.deepStrictEqual(pipe(true, BA.meet(true)), true)
    assert.deepStrictEqual(pipe(true, BA.meet(false)), true)

    assert.deepStrictEqual(BA.not(true), false)
    assert.deepStrictEqual(BA.not(false), true)

    assert.deepStrictEqual(BA.one, false)
    assert.deepStrictEqual(BA.zero, true)
  })
})
