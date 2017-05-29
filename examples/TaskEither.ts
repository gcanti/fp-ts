import { Either } from 'fp-ts/lib/Either'
import * as either from 'fp-ts/lib/Either'
import { Task } from 'fp-ts/lib/Task'
import * as task from 'fp-ts/lib/Task'
import { getEitherT } from 'fp-ts/lib/EitherT'
import { FantasyMonad } from 'fp-ts/lib/Monad'
import { Lazy } from 'fp-ts/lib/function'
import { Option } from 'fp-ts/lib/Option'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A, U> {
    'Task<Either>': Task<Either<U, A>>
    TaskEither: TaskEither<U, A>
  }
}

const eitherTTask = getEitherT('Task<Either>', task)

export const URI = 'TaskEither'

export type URI = typeof URI

export class TaskEither<L, A> implements FantasyMonad<URI, A> {
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: Task<Either<L, A>>) {}
  run(): Promise<Either<L, A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(eitherTTask.map(f, this.value))
  }
  of<L2, B>(b: B): TaskEither<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> {
    return new TaskEither(eitherTTask.chain(a => f(a).value, this.value))
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): Task<R> {
    return eitherTTask.fold(none, some, this.value)
  }
  mapLeft<L2>(f: (l: L) => L2): TaskEither<L2, A> {
    return new TaskEither(eitherTTask.mapLeft(f, this.value))
  }
  toOption(): Task<Option<A>> {
    return eitherTTask.toOption(this.value)
  }
}

export function map<L, A, B>(f: (a: A) => B, fa: TaskEither<L, A>): TaskEither<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): TaskEither<L, A> {
  return new TaskEither(eitherTTask.of(a))
}

export function ap<L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B> {
  return fa.ap(fab)
}

export function chain<L, A, B>(f: (a: A) => TaskEither<L, B>, fa: TaskEither<L, A>): TaskEither<L, B> {
  return fa.chain(f)
}

export function right<L, A>(ma: Task<A>): TaskEither<L, A> {
  return new TaskEither(eitherTTask.right<L, A>(ma))
}

export function left<L, A>(ml: Task<L>): TaskEither<L, A> {
  return new TaskEither(eitherTTask.left<L, A>(ml))
}
