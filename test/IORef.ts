import * as U from './util'
import * as I from '../src/IO'
import { IORef, newIORef } from '../src/IORef'
import { pipe } from '../src/function'

describe('IORef', () => {
  it('read', () => {
    const ref = new IORef(1)
    U.deepStrictEqual(ref.read(), 1)
  })

  it('write', () => {
    const ref = new IORef(1)
    U.deepStrictEqual(
      pipe(
        ref.write(2),
        I.chain(() => ref.read)
      )(),
      2
    )
  })

  it('modify', () => {
    const double = (n: number): number => n * 2
    const ref = new IORef(1)
    U.deepStrictEqual(
      pipe(
        ref.modify(double),
        I.chain(() => ref.read)
      )(),
      2
    )
  })

  it('newIORef', () => {
    U.deepStrictEqual(
      pipe(
        newIORef(1),
        I.chain((ref) => ref.read)
      )(),
      1
    )
  })

  it('pipe', () => {
    const ref = new IORef(1)
    pipe(2, ref.write)()
    U.deepStrictEqual(ref.read(), 2)
    pipe(() => 3, ref.modify)()
    U.deepStrictEqual(ref.read(), 3)
  })
})
