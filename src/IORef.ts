/**
 * @file Mutable references in the `IO` monad
 */
import { IO } from './IO'

/**
 * @example
 * import { io, run } from 'fp-ts/lib/IO'
 * import { newIORef } from 'fp-ts/lib/IORef'
 *
 * assert.strictEqual(run(io.chain(newIORef(1), ref => io.chain(ref.write(2), () => ref.read))), 2)
 *
 * @since 1.8.0
 */
export class IORef<A> {
  read: IO<A>
  constructor(private value: A) {
    this.read = () => this.value
  }
  /**
   * @since 1.8.0
   */
  write(a: A): IO<void> {
    return () => {
      this.value = a
    }
  }
  /**
   * @since 1.8.0
   */
  modify(f: (a: A) => A): IO<void> {
    return () => {
      this.value = f(this.value)
    }
  }
}

/**
 * @since 1.8.0
 */
export const newIORef = <A>(a: A): IO<IORef<A>> => {
  return () => new IORef(a)
}
