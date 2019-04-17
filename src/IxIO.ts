import { IO, io } from './IO'
import { IxMonad3 } from './IxMonad'
import { Monad3C } from './Monad'
import { phantom } from './function'

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    IxIO: IxIO<U, L, A>
  }
}

export const URI = 'IxIO'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class IxIO<I, O, A> {
  constructor(readonly value: IO<A>) {}
  run(): A {
    return this.value.run()
  }
  ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> {
    return new IxIO<I, Z, B>(this.value.chain(a => f(a).value))
  }
  map<B>(f: (a: A) => B): IxIO<I, O, B> {
    return new IxIO<I, O, B>(this.value.map(f))
  }
  ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.ap(fab.value))
  }
  chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.chain(a => f(a).value))
  }
}

/**
 * @since 1.0.0
 */
export const iof = <I, A>(a: A): IxIO<I, I, A> => {
  return new IxIO<I, I, A>(io.of(a))
}

const ichain = <I, O, Z, A, B>(fa: IxIO<I, O, A>, f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> => {
  return fa.ichain(f)
}

const map = <I, A, B>(fa: IxIO<I, I, A>, f: (a: A) => B): IxIO<I, I, B> => {
  return fa.map(f)
}

const of = iof

const ap = <I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B> => {
  return fa.ap(fab)
}

const chain = <I, A, B>(fa: IxIO<I, I, A>, f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> => {
  return fa.chain(f)
}

/**
 * @since 1.0.0
 */
export const getMonad = <I = never>(): Monad3C<URI, I, I> => {
  return {
    URI,
    _L: phantom,
    _U: phantom,
    map,
    of,
    ap,
    chain
  }
}

/**
 * @since 1.0.0
 */
export const ixIO: IxMonad3<URI> = {
  URI,
  iof,
  ichain
}
