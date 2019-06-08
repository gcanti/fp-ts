import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { constant, constIdentity, Predicate, Refinement } from './function'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadIO3 } from './MonadIO'
import { Reader } from './Reader'
import * as readerT from './ReaderT'
import { Task } from './Task'
import * as taskEither from './TaskEither'
import TaskEither = taskEither.TaskEither
import { MonadTask3 } from './MonadTask'
import { MonadThrow3 } from './MonadThrow'
import { pipeable } from './pipeable'

const readerTTaskEither = readerT.getReaderT2v(taskEither.taskEither)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
  }
}

export const URI = 'ReaderTaskEither'

export type URI = typeof URI

/**
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
  /** @obsolete */
  map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.map(this.value, f))
  }
  /** @obsolete */
  ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.ap(fab.value, this.value))
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @obsolete
   */
  applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @obsolete
   */
  applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> {
    // tslint:disable-next-line: deprecation
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  /** @obsolete */
  chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> {
    return new ReaderTaskEither(readerTTaskEither.chain(this.value, a => f(a).value))
  }
  /** @obsolete */
  fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>> {
    return new Reader(e => this.value(e).fold(left, right))
  }
  /** @obsolete */
  mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A> {
    return new ReaderTaskEither(e => this.value(e).mapLeft(f))
  }
  /**
   * Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`
   * @obsolete
   */
  orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A> {
    return new ReaderTaskEither(e => this.value(e).orElse(l => f(l).value(e)))
  }
  /** @obsolete */
  alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> {
    return this.orElse(() => fy)
  }
  /** @obsolete */
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B> {
    return new ReaderTaskEither(e => this.value(e).bimap(f, g))
  }
  /**
   * @since 1.6.1
   * @obsolete
   */
  local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A> {
    return new ReaderTaskEither(e => this.value(f(e)))
  }
}

/**
 * @since 1.6.0
 */
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => {
  return new ReaderTaskEither(e => taskEither.taskEither.of(e))
}

/**
 * @since 1.6.0
 */
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(e => taskEither.taskEither.of(f(e)))
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
 * Use `rightTask`
 *
 * @since 1.6.0
 * @deprecated
 */
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => taskEither.rightTask(fa))
}

/**
 * Use `leftTask`
 *
 * @since 1.6.0
 * @deprecated
 */
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => taskEither.leftTask(fa))
}

/**
 * @since 1.6.0
 */
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => {
  return new ReaderTaskEither(() => fa)
}

const readerTfromReader = readerT.fromReader(taskEither.taskEither)
/**
 * Use `rightReader`
 *
 * @since 1.6.0
 * @deprecated
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
 * Use `rightIO`
 *
 * @since 1.6.0
 * @deprecated
 */
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.rightIO(fa))
}

/**
 * Use `left2v`
 *
 * @since 1.6.0
 * @deprecated
 */
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => {
  return fromTaskEither(taskEither.left2v(l))
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
): (a: A) => ReaderTaskEither<E, L, B>
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<E, L, A>
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<E, L, A> {
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

/**
 * @since 1.6.0
 */
export const readerTaskEither: Monad3<URI> &
  Bifunctor3<URI> &
  Alt3<URI> &
  MonadIO3<URI> &
  MonadTask3<URI> &
  MonadThrow3<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  of: a => new ReaderTaskEither(readerTTaskEither.of(a)),
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  alt: (fx, fy) => fx.alt(fy),
  bimap: (fla, f, g) => fla.bimap(f, g),
  fromIO,
  // tslint:disable-next-line: deprecation
  fromTask: right,
  // tslint:disable-next-line: deprecation
  throwError: fromLeft,
  fromEither,
  // tslint:disable-next-line: deprecation
  fromOption: (o, e) => (o.isNone() ? fromLeft(e) : readerTaskEither.of(o.value))
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 1.10.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}

//
// backporting
//

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const left2v: <E, L>(e: L) => ReaderTaskEither<E, L, never> = fromLeft

/**
 * @since 1.19.0
 */
export const right2v: <E, A>(a: A) => ReaderTaskEither<E, never, A> = readerTaskEither.of

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const rightReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A> = fromReader

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const rightIO: <E, A>(ma: IO<A>) => ReaderTaskEither<E, never, A> = fromIO

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const rightTask: <E, L, A>(fa: Task<A>) => ReaderTaskEither<E, L, A> = right

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const leftTask: <E, L, A>(fa: Task<L>) => ReaderTaskEither<E, L, A> = left

const { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft } = pipeable(readerTaskEither)

export { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft }
