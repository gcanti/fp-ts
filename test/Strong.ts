import * as assert from 'assert'
import { reader } from '../src/Reader'
import { fanout, splitStrong } from '../src/Strong'

describe('Strong', () => {
  it('splitStrong', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(splitStrong(reader)(ab, cd)(['foo', 2]), [3, true])
    assert.deepStrictEqual(splitStrong(reader)(ab, cd)(['a', 1]), [1, false])
  })

  it('fanout', () => {
    const ab = (s: string) => s.length
    const ac = (s: string) => s === s.toLowerCase()
    assert.deepStrictEqual(fanout(reader)(ab, ac)('foo'), [3, true])
    assert.deepStrictEqual(fanout(reader)(ab, ac)('A'), [1, false])
  })
})
