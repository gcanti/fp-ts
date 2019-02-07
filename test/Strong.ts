import * as assert from 'assert'
import { splitStrong, fanout } from '../src/Strong'
import { Reader, reader } from '../src/Reader'

describe('Strong', () => {
  it('splitStrong', () => {
    const ab = new Reader<string, number>(s => s.length)
    const cd = new Reader<number, boolean>(n => n >= 2)
    assert.deepStrictEqual(splitStrong(reader)(ab, cd).run(['foo', 2]), [3, true])
    assert.deepStrictEqual(splitStrong(reader)(ab, cd).run(['a', 1]), [1, false])
  })

  it('fanout', () => {
    const ab = new Reader<string, number>(s => s.length)
    const ac = new Reader<string, boolean>(s => s === s.toLowerCase())
    assert.deepStrictEqual(fanout(reader)(ab, ac).run('foo'), [3, true])
    assert.deepStrictEqual(fanout(reader)(ab, ac).run('A'), [1, false])
  })
})
