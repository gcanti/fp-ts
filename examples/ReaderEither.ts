import * as readerT from '../src/ReaderT'
import * as either from '../src/Either'
import { Monad, FantasyMonad } from '../src/Monad'

const readerTEither = readerT.getReaderT(either)

declare module '../src/HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderEither: ReaderEither<U, L, A>
  }
}

export const URI = 'ReaderEither'

export type URI = typeof URI

export class ReaderEither<E, L, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: L
  readonly _U: E
  readonly _URI: URI
  constructor(readonly run: (e: E) => either.Either<L, A>) {}
  map<B>(f: (a: A) => B): ReaderEither<E, L, B> {
    return new ReaderEither(readerTEither.map(f, this.run))
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
    return new ReaderEither(readerTEither.chain(a => f(a).run, this.run))
  }
}

export const map = <E, L, A, B>(f: (a: A) => B, fa: ReaderEither<E, L, A>): ReaderEither<E, L, B> => {
  return fa.map(f)
}

export const of = <E, L, A>(a: A): ReaderEither<E, L, A> => {
  return new ReaderEither(readerTEither.of(a))
}

export const ap = <E, L, A, B>(
  fab: ReaderEither<E, L, (a: A) => B>,
  fa: ReaderEither<E, L, A>
): ReaderEither<E, L, B> => {
  return fa.ap(fab)
}

export const chain = <E, L, A, B>(
  f: (a: A) => ReaderEither<E, L, B>,
  fa: ReaderEither<E, L, A>
): ReaderEither<E, L, B> => {
  return fa.chain(f)
}

export const ask = <E, L>(e: E): ReaderEither<E, L, E> => {
  return new ReaderEither(readerT.ask(either)())
}

export const asks = <E, L, A>(f: (e: E) => A): ReaderEither<E, L, A> => {
  return new ReaderEither(readerT.asks(either)(f))
}

export const local = <E>(f: (e: E) => E) => <L, A>(fa: ReaderEither<E, L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(e => fa.run(f(e)))
}

export const alt = <E, L, A>(fx: ReaderEither<E, L, A>, fy: ReaderEither<E, L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(e => fx.run(e).alt(fy.run(e)))
}

export const fromEither = <E, L, A>(fa: either.Either<L, A>): ReaderEither<E, L, A> => {
  return new ReaderEither(() => fa)
}

export const readerEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
