import * as readerT from 'fp-ts/lib/ReaderT'
import * as io from 'fp-ts/lib/IO'
import { Monad } from 'fp-ts/lib/Monad'

const readerTIO = readerT.getReaderT(io)

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    ReaderIO: ReaderIO<L, A>
  }
}

export const URI = 'ReaderIO'

export type URI = typeof URI

export class ReaderIO<E, A> {
  readonly _A: A
  readonly _L: E
  readonly _URI: URI
  constructor(public readonly value: (e: E) => io.IO<A>) {}
  map<B>(f: (a: A) => B): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.map(f, this.value))
  }
  of<E, B>(b: B): ReaderIO<E, B> {
    return of(b)
  }
  ap<B>(fab: ReaderIO<E, (a: A) => B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.ap(fab.value, this.value))
  }
  ap_<B, C>(this: ReaderIO<E, (a: B) => C>, fb: ReaderIO<E, B>): ReaderIO<E, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.chain(a => f(a).value, this.value))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: ReaderIO<E, A>): ReaderIO<E, B> {
  return fa.map(f)
}

export function of<E, A>(a: A): ReaderIO<E, A> {
  return new ReaderIO(readerTIO.of(a))
}

export function ap<E, A, B>(fab: ReaderIO<E, (a: A) => B>, fa: ReaderIO<E, A>): ReaderIO<E, B> {
  return fa.ap(fab)
}

export function chain<E, A, B>(f: (a: A) => ReaderIO<E, B>, fa: ReaderIO<E, A>): ReaderIO<E, B> {
  return fa.chain(f)
}

export function ask<E>(e: E): ReaderIO<E, E> {
  return new ReaderIO(readerT.ask(io)())
}

export function asks<E, A>(f: (e: E) => A): ReaderIO<E, A> {
  return new ReaderIO(readerT.asks(io)(f))
}

export const readerIO: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
