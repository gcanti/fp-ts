import * as assert from 'assert'
import * as mealy from '../src/Mealy'
import { monoidProduct } from '../src/Monoid'

describe('Mealy', () => {
  it('driveMealy', () => {
    type I = -1 | 1
    const m1 = mealy.unfold((s: number, i: I) => [s + i, s + i])(0)
    assert.strictEqual(mealy.driveMealy(m1, []).eval(1), 1)
    assert.strictEqual(mealy.driveMealy(m1, [1]).eval(1), 2)
    assert.strictEqual(mealy.driveMealy(m1, [1, -1, -1]).eval(1), 0)
  })

  it('semigroup', () => {
    type I = -1 | 1
    const m1 = mealy.unfold((s: number, i: I) => [s + i, s + i])(0)
    const semigroup = mealy.getSemigroup<I, number>(monoidProduct)
    const m2 = semigroup.concat(m1, m1)
    assert.strictEqual(mealy.driveMealy(m2, [1]).eval(1), 4)
  })

  it('monoid', () => {
    type I = -1 | 1
    const m1 = mealy.unfold((s: number, i: I) => [s + i, s + i])(0)
    const monoid = mealy.getMonoid<I, number>(monoidProduct)
    const m2 = monoid.concat(m1, monoid.empty())
    assert.strictEqual(mealy.driveMealy(m2, [1]).eval(1), 2)
  })

  it('collect', () => {
    type I = -1 | 1
    const m1 = mealy.unfold((s: number, i: I) => [s + i, s + i])(0)
    const m2 = mealy.collect(m1)
    assert.deepEqual(mealy.driveMealy(m2, [1]).eval(1), [1, 2])
  })
})
