import * as assert from 'assert'
import { splitChoice, fanin } from '../src/Choice'
import { Reader, reader } from '../src/Reader'
import { right, left } from '../src/Either'

describe('Choice', () => {
  it('splitChoice', () => {
    const ab = new Reader<string, number>(s => s.length)
    const cd = new Reader<number, boolean>(n => n >= 2)
    assert.deepEqual(splitChoice(reader)(ab, cd).run(right(3)), right(true))
    assert.deepEqual(splitChoice(reader)(ab, cd).run(right(1)), right(false))
    assert.deepEqual(splitChoice(reader)(ab, cd).run(left('foo')), left(3))
  })

  it('fanin', () => {
    const ac = new Reader<string, boolean>(s => s === s.toLowerCase())
    const bc = new Reader<number, boolean>(n => n >= 2)
    assert.deepEqual(fanin(reader)(ac, bc).run(right(3)), true)
    assert.deepEqual(fanin(reader)(ac, bc).run(right(1)), false)
    assert.deepEqual(fanin(reader)(ac, bc).run(left('foo')), true)
    assert.deepEqual(fanin(reader)(ac, bc).run(left('A')), false)
  })
})
