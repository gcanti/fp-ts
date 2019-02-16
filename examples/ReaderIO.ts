import { IO, io } from '../src/IO'
import { Monad2 } from '../src/Monad'
import { Reader } from '../src/Reader'
import * as readerT from '../src/ReaderT'

const readerTIO = readerT.getReaderT2v(io)

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    ReaderIO: ReaderIO<L, A>
  }
}

export const URI = 'ReaderIO'

export type URI = typeof URI

export class ReaderIO<E, A> {
  readonly _A!: A
  readonly _L!: E
  readonly _URI!: URI
  constructor(readonly run: (e: E) => IO<A>) {}
  map<B>(f: (a: A) => B): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.map(this.run, f))
  }
  of<E, B>(b: B): ReaderIO<E, B> {
    return of(b)
  }
  ap<B>(fab: ReaderIO<E, (a: A) => B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.ap(fab.run, this.run))
  }
  ap_<B, C>(this: ReaderIO<E, (b: B) => C>, fb: ReaderIO<E, B>): ReaderIO<E, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.chain(this.run, a => f(a).run))
  }
}

const map = <E, A, B>(fa: ReaderIO<E, A>, f: (a: A) => B): ReaderIO<E, B> => {
  return fa.map(f)
}

const of = <E, A>(a: A): ReaderIO<E, A> => {
  return new ReaderIO(readerTIO.of(a))
}

const ap = <E, A, B>(fab: ReaderIO<E, (a: A) => B>, fa: ReaderIO<E, A>): ReaderIO<E, B> => {
  return fa.ap(fab)
}

const chain = <E, A, B>(fa: ReaderIO<E, A>, f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> => {
  return fa.chain(f)
}

export const ask = <E>(): ReaderIO<E, E> => {
  return new ReaderIO(io.of)
}

export const asks = <E, A>(f: (e: E) => A): ReaderIO<E, A> => {
  return new ReaderIO(e => io.of(f(e)))
}

export const local = <E>(f: (e: E) => E) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, A> => {
  return new ReaderIO(e => fa.run(f(e)))
}

export const fromIO = <E, A>(fa: IO<A>): ReaderIO<E, A> => {
  return new ReaderIO(() => fa)
}

const readerTfromReader = readerT.fromReader(io)
export const fromReader = <E, A>(fa: Reader<E, A>): ReaderIO<E, A> => {
  return new ReaderIO(readerTfromReader(fa))
}

export const readerIO: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
