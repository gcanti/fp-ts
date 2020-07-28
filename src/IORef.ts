/**
 * Mutable references in the `IO` monad
 *
 * @since 2.0.0
 */
import { IO } from './IO'

/**
 * @example
 * import { io } from 'fp-ts/IO'
 * import { newIORef } from 'fp-ts/IORef'
 *
 * assert.strictEqual(io.chain(newIORef(1), ref => io.chain(ref.write(2), () => ref.read))(), 2)
 *
 * @category model
 * @since 2.0.0
 */
export class IORef<A> {
  /**
   * @since 2.0.0
   */
  readonly read: IO<A>
  constructor(private value: A) {
    this.read = () => this.value
    this.write = this.write.bind(this)
    this.modify = this.modify.bind(this)
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
 * @category constructors
 * @since 2.0.0
 */
export function newIORef<A>(a: A): IO<IORef<A>> {
  return () => new IORef(a)
}
