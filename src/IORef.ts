/**
 * Mutable references in the `IO` monad
 *
 * @since 2.0.0
 */
import { IO } from './IO'

/**
 * @example
 * import { io } from 'fp-ts/lib/IO'
 * import { newIORef } from 'fp-ts/lib/IORef'
 *
 * assert.strictEqual(io.chain(newIORef(1), ref => io.chain(ref.write(2), () => ref.read))(), 2)
 *
 * @since 2.0.0
 */
export class IORef<A> {
  readonly read: IO<A>
  constructor(private value: A) {
    this.read = () => this.value
  }
  /**
   * @since 2.0.0
   */
  write(a: A): IO<void> {
    return () => {
      this.value = a
    }
  }
  /**
   * @since 2.0.0
   */
  modify(f: (a: A) => A): IO<void> {
    return () => {
      this.value = f(this.value)
    }
  }
}

/**
 * @since 2.0.0
 */
export function newIORef<A>(a: A): IO<IORef<A>> {
  return () => new IORef(a)
}
