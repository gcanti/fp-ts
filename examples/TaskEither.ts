import { Applicative } from 'fp-ts/lib/Applicative'
import * as eitherT from 'fp-ts/lib/EitherT'
import * as either from 'fp-ts/lib/Either'
import * as task from 'fp-ts/lib/Task'
import { URI as URIArray } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'
import { Lazy } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

const eitherTTask = eitherT.getEitherT(task)

export const URI = 'TaskEither'

export type URI = typeof URI

export class TaskEither<L, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(readonly value: task.Task<either.Either<L, A>>) {}
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(eitherTTask.map(f, this.value))
  }
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskEither<L, (a: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): task.Task<R> {
    return eitherT.fold(task)(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(eitherT.mapLeft(task)(f)(this.value))
  }
  toOption(): task.Task<Option<A>> {
    return eitherT.toOption(task)(this.value)
  }
}

export const map = <L, A, B>(f: (a: A) => B, fa: TaskEither<L, A>): TaskEither<L, B> => fa.map(f)

export const of = <L, A>(a: A): TaskEither<L, A> => new TaskEither(eitherTTask.of(a))

export const ap = <L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B> => fa.ap(fab)

export const chain = <L, A, B>(f: (a: A) => TaskEither<L, B>, fa: TaskEither<L, A>): TaskEither<L, B> => fa.chain(f)

export const right = <L, A>(fa: task.Task<A>): TaskEither<L, A> => new TaskEither(eitherT.right(task)(fa))

export const left = <L, A>(fa: task.Task<L>): TaskEither<L, A> => new TaskEither(eitherT.left(task)(fa))

export const fromEither = <L, A>(fa: either.Either<L, A>): TaskEither<L, A> =>
  new TaskEither(eitherT.fromEither(task)(fa))

export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: any) => L): TaskEither<L, A> =>
  new TaskEither(task.tryCatch(f)(onrejected))

export const taskEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
