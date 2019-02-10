import * as assert from 'assert'
import { Writer, censor, listen, listens, pass, tell, getMonad, writer } from '../src/Writer'
import { tuple } from '../src/function'
import { monoidString } from '../src/Monoid'

describe('Writer', () => {
  it('eval', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.strictEqual(fa.eval(), 1)
  })

  it('exec', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.strictEqual(fa.exec(), 'a')
  })

  it('map', () => {
    const fa = new Writer(() => [1, 'a'])
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(fa.map(double).run(), [2, 'a'])
    assert.deepStrictEqual(writer.map(fa, double).run(), [2, 'a'])
  })

  it('tell', () => {
    assert.deepStrictEqual(tell(1).run(), [undefined, 1])
  })

  it('listen', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.deepStrictEqual(listen(fa).run(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    const fa = new Writer(() => [tuple(1, (w: string) => w + 'b'), 'a'])
    assert.deepStrictEqual(pass(fa).run(), [1, 'ab'])
  })

  it('listens', () => {
    const fa = new Writer(() => [1, 'a'])
    assert.deepStrictEqual(listens(fa, w => w.length).run(), [[1, 1], 'a'])
  })

  it('censor', () => {
    const fa = new Writer(() => [1, ['a', 'b']])
    assert.deepStrictEqual(censor(fa, w => w.filter(a => a !== 'a')).run(), [1, ['b']])
  })

  it('getMonad', () => {
    const M = getMonad(monoidString)
    assert.deepStrictEqual(M.of(1).run(), [1, ''])
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(M.ap(M.of(double), M.of(1)).run(), [2, ''])
    const f = (n: number) => M.of(n * 2)
    assert.deepStrictEqual(M.chain(M.of(1), f).run(), [2, ''])
  })
})
