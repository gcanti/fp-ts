import * as eitherT from './EitherT'
import { Either } from './Either'
import * as task from './Task'
import { Task } from './Task'
import { Monad } from './Monad'
import { Lazy } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    TaskEither: TaskEither<L, A>
  }
}

const eitherTTask = eitherT.getEitherT(task.task)

export const URI = 'TaskEither'

export type URI = typeof URI

const eitherTfold = eitherT.fold(task.task)
const eitherTmapLeft = eitherT.mapLeft(task.task)

/**
 * @data
 * @constructor TaskEither
 */
export class TaskEither<L, A> {
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: Task<Either<L, A>>) {}
  /** Runs the inner task */
  run(): Promise<Either<L, A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(eitherTTask.map(this.value, f))
  }
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): Task<R> {
    return eitherTfold(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): TaskEither<M, A> {
    return new TaskEither(eitherTmapLeft(f)(this.value))
  }
  /** Transforms the failure value of the `TaskEither` into a new `TaskEither` */
  orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> {
    return new TaskEither(this.value.chain(e => e.fold(l => f(l).value, a => eitherTTask.of(a))))
  }
}

const map = <L, A, B>(fa: TaskEither<L, A>, f: (a: A) => B): TaskEither<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): TaskEither<L, A> => {
  return new TaskEither(eitherTTask.of(a))
}

const ap = <L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: TaskEither<L, A>, f: (a: A) => TaskEither<L, B>): TaskEither<L, B> => {
  return fa.chain(f)
}

const eitherTright = eitherT.right(task.task)
/** @function */
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => {
  return new TaskEither(eitherTright(fa))
}

const eitherTleft = eitherT.left(task.task)
/** @function */
export const left = <L, A>(fa: Task<L>): TaskEither<L, A> => {
  return new TaskEither(eitherTleft(fa))
}

const eitherTfromEither = eitherT.fromEither(task.task)
/** @function */
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => {
  return new TaskEither(eitherTfromEither(fa))
}

/** @function */
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A> => {
  return new TaskEither(task.tryCatch(f, onrejected))
}

/** @instance */
export const taskEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
