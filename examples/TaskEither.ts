import { Applicative } from 'fp-ts/lib/Applicative'
import * as eitherT from 'fp-ts/lib/EitherT'
import * as either from 'fp-ts/lib/Either'
import * as task from 'fp-ts/lib/Task'
import { URI as URIArray } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { Monad } from 'fp-ts/lib/Monad'

const eitherTTask = eitherT.getEitherT(task)

export const URI = 'TaskEither'

export type URI = typeof URI

export class TaskEither<L, A> {
  static of = of
  readonly _A: A
  readonly _L: L
  readonly _URI: URI
  constructor(public readonly value: task.Task<either.Either<L, A>>) {}
  map<B>(f: (a: A) => B): TaskEither<L, B> {
    return new TaskEither(eitherTTask.map(f, this.value))
  }
  of<M, B>(b: B): TaskEither<M, B> {
    return of(b)
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
    return new TaskEither(eitherT.mapLeft(task)(f, this.value))
  }
  toOption(): task.Task<Option<A>> {
    return eitherT.toOption(task)(this.value)
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

export function right<L, A>(fa: task.Task<A>): TaskEither<L, A> {
  return new TaskEither(eitherT.right(task)(fa))
}

export function left<L, A>(fa: task.Task<L>): TaskEither<L, A> {
  return new TaskEither(eitherT.left(task)(fa))
}

export function fromEither<L, A>(fa: either.Either<L, A>): TaskEither<L, A> {
  return new TaskEither(eitherT.fromEither(task)(fa))
}

export const taskEither: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}

//
// overloadings
//

declare module 'fp-ts/lib/Traversable' {
  interface Ops {
    sequence(
      applicative: Applicative<URI>,
      traversable: Traversable<URIArray>
    ): <L, A>(tfa: Array<TaskEither<L, A>>) => TaskEither<L, Array<A>>
  }
}
