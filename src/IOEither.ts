import { Bifunctor2 } from './Bifunctor'
import { Either, left as eitherLeft, tryCatch2v as eitherTryCatch2v, toError } from './Either_'
import * as eitherT from './EitherT'
import { Monad2 } from './Monad'
import { IO, io } from './IO'
import { Lazy, constIdentity, constant } from './function'
import { Alt2 } from './Alt'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    IOEither: IOEither<L, A>
  }
}

const eitherTIO = eitherT.getEitherT(io)

export const URI = 'IOEither'

export type URI = typeof URI

const eitherTfold = eitherT.fold(io)
const eitherTmapLeft = eitherT.mapLeft(io)
const eitherTbimap = eitherT.bimap(io)

/**
 * `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see {@link IO}.
 * @data
 * @constructor IOEither
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
  map<B>(f: (a: A) => B): IOEither<L, B> {
    return new IOEither(eitherTIO.map(this.value, f))
  }
  ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> {
    return new IOEither(eitherTIO.ap(fab.value, this.value))
  }
  /**
   * Flipped version of {@link ap}
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
    return new IOEither(eitherTIO.chain(a => f(a).value, this.value))
  }
  fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> {
    return eitherTfold(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): IOEither<M, A> {
    return new IOEither(eitherTmapLeft(f)(this.value))
  }
  orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> {
    return new IOEither(this.value.chain(e => e.fold(l => f(l).value, a => eitherTIO.of(a))))
  }
  alt(fy: IOEither<L, A>): IOEither<L, A> {
    return this.orElse(() => fy)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> {
    return new IOEither(eitherTbimap(this.value, f, g))
  }
}

const map = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => B): IOEither<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): IOEither<L, A> => {
  return new IOEither(eitherTIO.of(a))
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

const eitherTright = eitherT.right(io)

/**
 * @since 1.6.0
 */
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => {
  return new IOEither(eitherTright(fa))
}

const eitherTleft = eitherT.left(io)

/**
 * @since 1.6.0
 */
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => {
  return new IOEither(eitherTleft(fa))
}

const eitherTfromEither = eitherT.fromEither(io)

/**
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => {
  return new IOEither(eitherTfromEither(fa))
}

/**
 * @since 1.6.0
 */
export const fromLeft = <L, A>(l: L): IOEither<L, A> => {
  return fromEither(eitherLeft(l))
}

/**
 * Use {@link tryCatch2v}
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
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = {
  URI,
  bimap,
  map,
  of,
  ap,
  chain,
  alt
}
