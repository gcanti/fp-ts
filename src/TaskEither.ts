import * as eitherT from './EitherT'
import * as either from './Either'
import * as task from './Task'
import { Option } from './Option'
import { Monad, FantasyMonad } from './Monad'
import { Lazy } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

const eitherTTask = eitherT.getEitherT(task)

export const URI = 'TaskEither'

export type URI = typeof URI

const eitherTfold = eitherT.fold(task)
const eitherTmapLeft = eitherT.mapLeft(task)
const eitherTtoOption = eitherT.toOption(task)

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
    return eitherTfold(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(eitherTmapLeft(f)(this.value))
  }
  toOption(): task.Task<Option<A>> {
    return eitherTtoOption(this.value)
  }
}

export const map = <L, A, B>(f: (a: A) => B, fa: TaskEither<L, A>): TaskEither<L, B> => fa.map(f)

export const of = <L, A>(a: A): TaskEither<L, A> => new TaskEither(eitherTTask.of(a))

export const ap = <L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B> => fa.ap(fab)

export const chain = <L, A, B>(f: (a: A) => TaskEither<L, B>, fa: TaskEither<L, A>): TaskEither<L, B> => fa.chain(f)

const eitherTright = eitherT.right(task)
export const right = <L, A>(fa: task.Task<A>): TaskEither<L, A> => new TaskEither(eitherTright(fa))

const eitherTleft = eitherT.left(task)
export const left = <L, A>(fa: task.Task<L>): TaskEither<L, A> => new TaskEither(eitherTleft(fa))

const eitherTfromEither = eitherT.fromEither(task)
export const fromEither = <L, A>(fa: either.Either<L, A>): TaskEither<L, A> => new TaskEither(eitherTfromEither(fa))

export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A> =>
  new TaskEither(task.tryCatch(f)(onrejected))

export const taskEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
