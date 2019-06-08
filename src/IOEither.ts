/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import { Either, left as eitherLeft, right as eitherRight, toError, tryCatch2v as eitherTryCatch2v } from './Either'
import * as eitherT from './EitherT'
import { constant, constIdentity, Lazy } from './function'
import { IO, io } from './IO'
import { Monad2 } from './Monad'
import { MonadThrow2 } from './MonadThrow'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    IOEither: IOEither<L, A>
  }
}

export const URI = 'IOEither'

export type URI = typeof URI

const T = eitherT.getEitherT2v(io)
const foldT = eitherT.fold(io)

/**
 * @since 1.6.0
 */
export class IOEither<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: IO<Either<L, A>>) {}
  /**
   * Runs the inner io
   */
  run(): Either<L, A> {
    return this.value.run()
  }
  /** @obsolete */
  map<B>(f: (a: A) => B): IOEither<L, B> {
    return new IOEither(T.map(this.value, f))
  }
  /** @obsolete */
  ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> {
    return new IOEither(T.ap(fab.value, this.value))
  }
  /**
   * Flipped version of `ap`
   * @obsolete
   */
  ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   * @obsolete
   */
  applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   * @obsolete
   */
  applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> {
    // tslint:disable-next-line: deprecation
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  /** @obsolete */
  chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> {
    return new IOEither(T.chain(this.value, a => f(a).value))
  }
  /** @obsolete */
  fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> {
    return foldT(left, right, this.value)
  }
  /**
   * Similar to `fold`, but the result is flattened.
   *
   * @since 1.19.0
   * @obsolete
   */
  foldIO<R>(left: (l: L) => IO<R>, right: (a: A) => IO<R>): IO<R> {
    return this.value.chain(fa => fa.fold(left, right))
  }
  /**
   * Similar to `fold`, but the result is flattened.
   *
   * @since 1.19.0
   * @obsolete
   */
  foldIOEither<M, B>(onLeft: (l: L) => IOEither<M, B>, onRight: (a: A) => IOEither<M, B>): IOEither<M, B> {
    return new IOEither(this.value.chain(e => e.fold(onLeft, onRight).value))
  }
  /** @obsolete */
  mapLeft<M>(f: (l: L) => M): IOEither<M, A> {
    return new IOEither(this.value.map(e => e.mapLeft(f)))
  }
  /** @obsolete */
  orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> {
    return new IOEither(this.value.chain(e => e.fold(l => f(l).value, a => T.of(a))))
  }
  /** @obsolete */
  alt(fy: IOEither<L, A>): IOEither<L, A> {
    return this.orElse(() => fy)
  }
  /** @obsolete */
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> {
    return new IOEither(this.value.map(e => e.bimap(f, g)))
  }
}

/**
 * Use `rightIO`
 *
 * @since 1.6.0
 * @deprecated
 */
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => {
  return new IOEither(fa.map<Either<L, A>>(eitherRight))
}

/**
 * Use `leftIO`
 *
 * @since 1.6.0
 * @deprecated
 */
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => {
  return new IOEither(fa.map<Either<L, A>>(eitherLeft))
}

/**
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => {
  return new IOEither(io.of(fa))
}

/**
 * Use `left2v`
 *
 * @since 1.6.0
 * @deprecated
 */
export const fromLeft = <L, A>(l: L): IOEither<L, A> => {
  return fromEither(eitherLeft(l))
}

/**
 * Use `tryCatch2v` instead
 *
 * @since 1.6.0
 * @deprecated
 */
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => {
  return tryCatch2v(f, onerror)
}

/**
 * @since 1.11.0
 */
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => {
  return new IOEither(new IO(() => eitherTryCatch2v(f, onerror)))
}

/**
 * @since 1.6.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  bimap: (fla, f, g) => fla.bimap(f, g),
  map: (fa, f) => fa.map(f),
  of: right2v,
  ap: (fab, fa) => fa.ap(fab),
  chain: (fa, f) => fa.chain(f),
  alt: (fx, fy) => fx.alt(fy),
  // tslint:disable-next-line: deprecation
  throwError: fromLeft,
  fromEither,
  // tslint:disable-next-line: deprecation
  fromOption: (o, e) => (o.isNone() ? fromLeft(e) : ioEither.of(o.value))
}

//
// backporting
//

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const left2v: <L>(l: L) => IOEither<L, never> = fromLeft

/**
 * @since 1.19.0
 */
export function right2v<A>(a: A): IOEither<never, A> {
  return new IOEither(T.of(a))
}

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const rightIO: <A>(ma: IO<A>) => IOEither<never, A> = right

/**
 * @since 1.19.0
 */
// tslint:disable-next-line: deprecation
export const leftIO: <E>(me: IO<E>) => IOEither<E, never> = left

/**
 * @since 1.19.0
 */
export function fold<E, A, R>(onLeft: (e: E) => IO<R>, onRight: (a: A) => IO<R>): (ma: IOEither<E, A>) => IO<R> {
  return ma => ma.foldIO(onLeft, onRight)
}

/**
 * @since 1.19.0
 */
export function orElse<E, A, M>(f: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A> {
  return ma => ma.orElse(f)
}

const { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft } = pipeable(ioEither)

export { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, flatten, map, mapLeft }
