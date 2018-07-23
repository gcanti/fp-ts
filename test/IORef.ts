import * as assert from 'assert'
import { IORef, newIORef } from '../src/IORef'

describe('IORef', () => {
  it('read', () => {
    const ref = new IORef(1)
    assert.strictEqual(ref.read.run(), 1)
  })

  it('write', () => {
    const ref = new IORef(1)
    assert.strictEqual(
      ref
        .write(2)
        .chain(() => ref.read)
        .run(),
      2
    )
  })

  it('modify', () => {
    const double = (n: number): number => n * 2
    const ref = new IORef(1)
    assert.strictEqual(
      ref
        .modify(double)
        .chain(() => ref.read)
        .run(),
      2
    )
  })

  it('newIORef', () => {
    assert.strictEqual(
      newIORef(1)
        .chain(ref => ref.read)
        .run(),
      1
    )
  })
})
