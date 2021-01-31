import * as assert from 'assert'
import * as _ from '../src/BooleanAlgebra'
import * as B from '../src/boolean'

describe('BooleanAlgebra', () => {
  it('booleanAlgebraVoid', () => {
    // tslint:disable-next-line: deprecation
    const BA = _.booleanAlgebraVoid
    assert.deepStrictEqual(BA.implies(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.join(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.meet(undefined, undefined), undefined)

    assert.deepStrictEqual(BA.not(undefined), undefined)

    assert.deepStrictEqual(BA.one, undefined)
    assert.deepStrictEqual(BA.zero, undefined)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = _.getDualBooleanAlgebra(B.BooleanAlgebra)
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
