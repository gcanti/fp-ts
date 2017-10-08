import * as readerT from 'fp-ts/lib/ReaderT'
import * as taskEither from 'fp-ts/lib/TaskEither'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'
import { Task } from 'fp-ts/lib/Task'
import { Either } from 'fp-ts/lib/Either'

const readerTTaskEither = readerT.getReaderT(taskEither)

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
  }
}

export const URI = 'ReaderTaskEither'

export type URI = typeof URI

export class ReaderTaskEither<E, L, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: L
  readonly _U: E
  readonly _URI: URI
  constructor(readonly run: (e: E) => TaskEither<L, A>) {}
  map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.map(f, this.run))
  }
  of<E, B>(b: B): ReaderTaskEither<E, L, B> {
    return of(b)
  }
  ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.ap(fab.run, this.run))
  }
  ap_<B, C>(this: ReaderTaskEither<E, L, (a: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.chain(a => f(a).run, this.run))
  }
}

export const map = <E, L, A, B>(f: (a: A) => B, fa: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, B> => fa.map(f)

export const of = <E, L, A>(a: A): ReaderTaskEither<E, L, A> => new ReaderTaskEither(readerTTaskEither.of(a))

export const ap = <E, L, A, B>(
  fab: ReaderTaskEither<E, L, (a: A) => B>,
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E, L, B> => fa.ap(fab)

export const chain = <E, L, A, B>(
  f: (a: A) => ReaderTaskEither<E, L, B>,
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E, L, B> => fa.chain(f)

export const ask = <E, L>(e: E): ReaderTaskEither<E, L, E> => new ReaderTaskEither(readerT.ask(taskEither)())

export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> =>
  new ReaderTaskEither(readerT.asks(taskEither)(f))

export const local = <E>(f: (e: E) => E) => <L, A>(fa: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> =>
  new ReaderTaskEither(e => fa.run(f(e)))

export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> =>
  new ReaderTaskEither(() => taskEither.right(fa))

export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => new ReaderTaskEither(() => taskEither.left(fa))

export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> =>
  new ReaderTaskEither(() => taskEither.fromEither(fa))

export const tryCatch = <E, L, A>(f: (e: E) => Promise<A>, onrejected: (reason: {}) => L): ReaderTaskEither<E, L, A> =>
  new ReaderTaskEither(e => taskEither.tryCatch(() => f(e), onrejected))

export const readerTaskEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
