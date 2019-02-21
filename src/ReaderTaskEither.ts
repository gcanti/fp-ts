import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either_'
import { constant, constIdentity, Predicate, Refinement } from './function'
import { IO } from './IO_'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadIO3 } from './MonadIO'
import { Reader } from './Reader'
import * as readerT from './ReaderT'
import { Task } from './Task_'
import * as taskEither from './TaskEither'
import TaskEither = taskEither.TaskEither
import { MonadTask3 } from './MonadTask'

const readerTTaskEither = readerT.getReaderT(taskEither.taskEither)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
  }
}

export const URI = 'ReaderTaskEither'

export type URI = typeof URI

/**
 * @data
 * @constructor ReaderTaskEither
 * @since 1.6.0
 */
export class ReaderTaskEither<E, L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _U!: E
  readonly _URI!: URI
  constructor(readonly value: (e: E) => TaskEither<L, A>) {}
  /** Runs the inner `TaskEither` */
  run(e: E): Promise<Either<L, A>> {
    return this.value(e).run()
  }
  map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.map(f, this.value))
  }
  ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.ap(fab.value, this.value))
  }
  /**
   * Flipped version of {@link ap}
   */
  ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   */
  applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   */
  applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.chain(a => f(a).value, this.value))
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>> {
    return new Reader(e => this.value(e).fold(left, right))
  }
  mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A> {
    return new ReaderTaskEither(e => this.value(e).mapLeft(f))
  }
  /**
   * Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`
   */
  orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A> {
    return new ReaderTaskEither(e => this.value(e).orElse(l => f(l).value(e)))
  }
  alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> {
    return this.orElse(() => fy)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B> {
    return new ReaderTaskEither(e => this.value(e).bimap(f, g))
  }
  /**
   * @since 1.6.1
   */
  local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A> {
    return new ReaderTaskEither(e => this.value(f(e)))
  }
}

const map = <E, L, A, B>(fa: ReaderTaskEither<E, L, A>, f: (a: A) => B): ReaderTaskEither<E, L, B> => {
  return fa.map(f)
}

const of = <E, L, A>(a: A): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(readerTTaskEither.of(a))
}

const ap = <E, L, A, B>(
  fab: ReaderTaskEither<E, L, (a: A) => B>,
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E, L, B> => {
  return fa.ap(fab)
}

const chain = <E, L, A, B>(
  fa: ReaderTaskEither<E, L, A>,
  f: (a: A) => ReaderTaskEither<E, L, B>
): ReaderTaskEither<E, L, B> => {
  return fa.chain(f)
}

const alt = <E, L, A>(fx: ReaderTaskEither<E, L, A>, fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> => {
  return fx.alt(fy)
}

const bimap = <E, L, V, A, B>(
  fa: ReaderTaskEither<E, L, A>,
  f: (l: L) => V,
  g: (a: A) => B
): ReaderTaskEither<E, V, B> => {
  return fa.bimap(f, g)
}

const readerTask = readerT.ask(taskEither.taskEither)
/**
 * @since 1.6.0
 */
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => {
  return new ReaderTaskEither(readerTask())
}

const readerTasks = readerT.asks(taskEither.taskEither)
/**
 * @since 1.6.0
 */
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(readerTasks(f))
}

/**
 * @since 1.6.0
 */
export const local = <E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A> => {
  return fa.local(f)
}

/**
 * @since 1.6.0
 */
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => taskEither.right(fa))
}

/**
 * @since 1.6.0
 */
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => taskEither.left(fa))
}

/**
 * @since 1.6.0
 */
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => fa)
}

const readerTfromReader = readerT.fromReader(taskEither.taskEither)
/**
 * @since 1.6.0
 */
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(readerTfromReader(fa))
}

/**
 * @since 1.6.0
 */
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.fromEither(fa))
}

/**
 * @since 1.6.0
 */
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.fromIO(fa))
}

/**
 * @since 1.6.0
 */
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.fromLeft(l))
}

/**
 * @since 1.6.0
 */
export const fromIOEither = <E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.fromIOEither(fa))
}

/**
 * @since 1.6.0
 */
export function fromPredicate<E, L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, B>)
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>)
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>) {
  const f = taskEither.fromPredicate(predicate, onFalse)
  return a => fromTaskEither(f(a))
}

/**
 * @since 1.6.0
 */
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(e => taskEither.tryCatch(() => f(e), (reason: unknown) => onrejected(reason, e)))
}

const fromTask = right

/**
 * @since 1.6.0
 */
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  alt,
  bimap,
  fromIO,
  fromTask
}

/**
 * Like {@link readerTaskEither} but `ap` is sequential
 * @since 1.10.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}
