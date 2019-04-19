/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import * as E from './Either'
import * as eitherT from './EitherT'
import { constant, constIdentity, Lazy } from './function'
import { IO, io } from './IO'
import { Monad2 } from './Monad'
import { MonadThrow2 } from './MonadThrow'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    IOEither: IOEither<L, A>
  }
}

export const URI = 'IOEither'

export type URI = typeof URI

const T = eitherT.getEitherT(io)
const foldT = eitherT.fold(io)

/**
 * @since 1.6.0
 */
export class IOEither<L, A> {
  constructor(readonly value: IO<E.Either<L, A>>) {}
  /**
   * Runs the inner io
   */
  run(): E.Either<L, A> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): IOEither<L, B> {
    return new IOEither(T.map(this.value, f))
  }
  ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> {
    return new IOEither(T.ap(fab.value, this.value))
  }
  /**
   * Flipped version of `ap`
   */
  ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> {
    return fb.ap(this)
  }
  /**
   * Combine two effectful actions, keeping only the result of the first
   */
  applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A> {
    return fb.ap(this.map(constant))
  }
  /**
   * Combine two effectful actions, keeping only the result of the second
   */
  applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> {
    return new IOEither(T.chain(this.value, a => f(a).value))
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> {
    return foldT(this.value, left, right)
  }
  mapLeft<M>(f: (l: L) => M): IOEither<M, A> {
    return new IOEither(this.value.map(e => E.mapLeft(e, f)))
  }
  orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> {
    return new IOEither(this.value.chain(e => E.fold(e, l => f(l).value, a => T.of(a))))
  }
  alt(fy: IOEither<L, A>): IOEither<L, A> {
    return this.orElse(() => fy)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> {
    return new IOEither(this.value.map(e => E.either.bimap(e, f, g)))
  }
}

const map = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => B): IOEither<L, B> => {
  return fa.map(f)
}

/**
 * @since 2.0.0
 */
export const make = <A>(a: A): IOEither<never, A> => {
  return new IOEither(T.of(a))
}

const ap = <L, A, B>(fab: IOEither<L, (a: A) => B>, fa: IOEither<L, A>): IOEither<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => IOEither<L, B>): IOEither<L, B> => {
  return fa.chain(f)
}

const alt = <L, A>(fx: IOEither<L, A>, fy: IOEither<L, A>): IOEither<L, A> => {
  return fx.alt(fy)
}

const bimap = <L, V, A, B>(fa: IOEither<L, A>, f: (l: L) => V, g: (a: A) => B): IOEither<V, B> => {
  return fa.bimap(f, g)
}

/**
 * @since 1.6.0
 */
export const right = <A>(fa: IO<A>): IOEither<never, A> => {
  return new IOEither(fa.map(E.right))
}

/**
 * @since 1.6.0
 */
export const left = <L>(fa: IO<L>): IOEither<L, never> => {
  return new IOEither(fa.map(E.left))
}

/**
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: E.Either<L, A>): IOEither<L, A> => {
  return new IOEither(io.of(fa))
}

/**
 * @since 1.6.0
 */
export const fromLeft = <L>(l: L): IOEither<L, never> => {
  return fromEither(E.left(l))
}

/**
 * @since 1.11.0
 */
export const tryCatch = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => {
  return new IOEither(new IO(() => E.tryCatch(f, onerror)))
}

const throwError = fromLeft

/**
 * @since 1.6.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  bimap,
  map,
  of: make,
  ap,
  chain,
  alt,
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : make(o.value))
}
