import { Either, either } from '../src/Either'
import { Monad3 } from '../src/Monad'
import { Reader } from '../src/Reader'
import * as readerT from '../src/ReaderT'

const readerTEither = readerT.getReaderT2v(either)

declare module '../src/HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderEither: ReaderEither<U, L, A>
  }
}

export const URI = 'ReaderEither'

export type URI = typeof URI

export class ReaderEither<E, L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _U!: E
  readonly _URI!: URI
  constructor(readonly run: (e: E) => Either<L, A>) {}
  map<B>(f: (a: A) => B): ReaderEither<E, L, B> {
    return new ReaderEither(readerTEither.map(this.run, f))
  }
  of<E, B>(b: B): ReaderEither<E, L, B> {
    return of(b)
  }
  ap<B>(fab: ReaderEither<E, L, (a: A) => B>): ReaderEither<E, L, B> {
    return new ReaderEither(readerTEither.ap(fab.run, this.run))
  }
  ap_<B, C>(this: ReaderEither<E, L, (b: B) => C>, fb: ReaderEither<E, L, B>): ReaderEither<E, L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ReaderEither<E, L, B>): ReaderEither<E, L, B> {
    return new ReaderEither(readerTEither.chain(this.run, a => f(a).run))
  }
}

const map = <E, L, A, B>(fa: ReaderEither<E, L, A>, f: (a: A) => B): ReaderEither<E, L, B> => {
  return fa.map(f)
}

const of = <E, L, A>(a: A): ReaderEither<E, L, A> => {
  return new ReaderEither(readerTEither.of(a))
}

const ap = <E, L, A, B>(fab: ReaderEither<E, L, (a: A) => B>, fa: ReaderEither<E, L, A>): ReaderEither<E, L, B> => {
  return fa.ap(fab)
}

const chain = <E, L, A, B>(fa: ReaderEither<E, L, A>, f: (a: A) => ReaderEither<E, L, B>): ReaderEither<E, L, B> => {
  return fa.chain(f)
}

export const ask = <E, L>(): ReaderEither<E, L, E> => {
  return new ReaderEither(e => either.of(e))
}

export const asks = <E, L, A>(f: (e: E) => A): ReaderEither<E, L, A> => {
  return new ReaderEither(e => either.of(f(e)))
}

export const local = <E>(f: (e: E) => E) => <L, A>(fa: ReaderEither<E, L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(e => fa.run(f(e)))
}

export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(() => fa)
}

const readerTfromReader = readerT.fromReader(either)
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(readerTfromReader(fa))
}

export const alt = <E, L, A>(fx: ReaderEither<E, L, A>, fy: ReaderEither<E, L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(e => fx.run(e).alt(fy.run(e)))
}

export const readerEither: Monad3<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
