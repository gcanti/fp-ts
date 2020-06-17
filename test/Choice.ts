import * as assert from 'assert'
import { fanin, splitChoice } from '../src/Choice'
import { left, right } from '../src/Either'
import * as R from '../src/Reader'

describe('Choice', () => {
  it('splitChoice', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(splitChoice({ ...R.choiceReader, ...R.categoryReader })(ab, cd)(right(3)), right(true))
    assert.deepStrictEqual(splitChoice({ ...R.choiceReader, ...R.categoryReader })(ab, cd)(right(1)), right(false))
    assert.deepStrictEqual(splitChoice({ ...R.choiceReader, ...R.categoryReader })(ab, cd)(left('foo')), left(3))
  })

  it('fanin', () => {
    const ac = (s: string) => s === s.toLowerCase()
    const bc = (n: number) => n >= 2
    assert.deepStrictEqual(fanin({ ...R.choiceReader, ...R.categoryReader })(ac, bc)(right(3)), true)
    assert.deepStrictEqual(fanin({ ...R.choiceReader, ...R.categoryReader })(ac, bc)(right(1)), false)
    assert.deepStrictEqual(fanin({ ...R.choiceReader, ...R.categoryReader })(ac, bc)(left('foo')), true)
    assert.deepStrictEqual(fanin({ ...R.choiceReader, ...R.categoryReader })(ac, bc)(left('A')), false)
  })
})
