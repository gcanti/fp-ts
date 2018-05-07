import * as assert from 'assert'
import { Writer, censor, listen, listens, pass, tell } from '../src/Writer'
import { tuple } from '../src/function'

describe('Writer', () => {
  it('tell', () => {
    assert.deepEqual(tell(1).run(), [undefined, 1])
  })

  it('listen', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.deepEqual(listen(fa).run(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    const fa = new Writer(() => [tuple(1, (w: string) => w + 'b'), 'a'])
    assert.deepEqual(pass(fa).run(), [1, 'ab'])
  })

  it('listens', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.deepEqual(listens(fa, w => w.length).run(), [[1, 1], 'a'])
  })

  it('censor', () => {
    const fa = new Writer(() => [1, ['a', 'b']])
    assert.deepEqual(censor(fa, w => w.filter(a => a !== 'a')).run(), [1, ['b']])
  })
})
