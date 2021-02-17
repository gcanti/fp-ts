import * as assert from 'assert'
import * as _ from '../src/Choice'
import { left, right } from '../src/Either'
import * as R from '../src/Reader'

describe('Choice', () => {
  it('split', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(right(3)), right(true))
    assert.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(right(1)), right(false))
    assert.deepStrictEqual(_.split(R.Choice, R.Category)(ab, cd)(left('foo')), left(3))
  })

  it('fanIn', () => {
    const ac = (s: string) => s === s.toLowerCase()
    const bc = (n: number) => n >= 2
    assert.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(right(3)), true)
    assert.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(right(1)), false)
    assert.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(left('foo')), true)
    assert.deepStrictEqual(_.fanIn(R.Choice, R.Category)(ac, bc)(left('A')), false)
  })
})
