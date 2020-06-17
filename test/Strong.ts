import * as assert from 'assert'
import * as R from '../src/Reader'
import { fanout, splitStrong } from '../src/Strong'

describe('Strong', () => {
  it('splitStrong', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(splitStrong({ ...R.strongReader, ...R.categoryReader })(ab, cd)(['foo', 2]), [3, true])
    assert.deepStrictEqual(splitStrong({ ...R.strongReader, ...R.categoryReader })(ab, cd)(['a', 1]), [1, false])
  })

  it('fanout', () => {
    const ab = (s: string) => s.length
    const ac = (s: string) => s === s.toLowerCase()
    assert.deepStrictEqual(fanout({ ...R.strongReader, ...R.categoryReader })(ab, ac)('foo'), [3, true])
    assert.deepStrictEqual(fanout({ ...R.strongReader, ...R.categoryReader })(ab, ac)('A'), [1, false])
  })
})
