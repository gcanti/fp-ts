import { Bifunctor2 } from './Bifunctor'
import { Either, left as eitherLeft, tryCatch as eitherTryCatch, toError } from './Either'
import * as eitherT from './EitherT'
import { Monad2 } from './Monad'
import { IO, io } from './IO'
import { Lazy, constIdentity } from './function'
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
   * @since 1.6.0
   */
  run(): Either<L, A> {
    return this.value.run()
  }
  /**
   * @since 1.6.0
   */
  map<B>(f: (a: A) => B): IOEither<L, B> {
    return new IOEither(eitherTIO.map(this.value, f))
  }
  /**
   * @since 1.6.0
   */
  ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> {
    return new IOEither(eitherTIO.ap(fab.value, this.value))
  }
  /**
   * @since 1.6.0
   */
  ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> {
    return fb.ap(this)
  }
  /**
   * @since 1.6.0
   */
  applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> {
    return fb.ap(this.map(constIdentity as () => (b: B) => B))
  }
  /**
   * @since 1.6.0
   */
  chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> {
    return new IOEither(eitherTIO.chain(a => f(a).value, this.value))
  }
  /**
   * @since 1.6.0
   */
  fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> {
    return eitherTfold(left, right, this.value)
  }
  /**
   * @since 1.6.0
   */
  mapLeft<M>(f: (l: L) => M): IOEither<M, A> {
    return new IOEither(eitherTmapLeft(f)(this.value))
  }
  /**
   * @since 1.6.0
   */
  orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> {
    return new IOEither(this.value.chain(e => e.fold(l => f(l).value, a => eitherTIO.of(a))))
  }
  /**
   * @since 1.6.0
   */
  alt(fy: IOEither<L, A>): IOEither<L, A> {
    return this.orElse(() => fy)
  }
  /**
   * @since 1.6.0
   */
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

const alt = <L, A, B>(fx: IOEither<L, A>, fy: IOEither<L, A>): IOEither<L, A> => {
  return fx.alt(fy)
}

const bimap = <L, V, A, B>(fa: IOEither<L, A>, f: (l: L) => V, g: (a: A) => B): IOEither<V, B> => {
  return fa.bimap(f, g)
}

const eitherTright = eitherT.right(io)

/**
 * @function
 * @since 1.6.0
 */
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => {
  return new IOEither(eitherTright(fa))
}

const eitherTleft = eitherT.left(io)

/**
 * @function
 * @since 1.6.0
 */
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => {
  return new IOEither(eitherTleft(fa))
}

const eitherTfromEither = eitherT.fromEither(io)

/**
 * @function
 * @since 1.6.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => {
  return new IOEither(eitherTfromEither(fa))
}

/**
 * @function
 * @since 1.6.0
 */
export const fromLeft = <L, A>(l: L): IOEither<L, A> => {
  return fromEither(eitherLeft(l))
}

/**
 * @function
 * @since 1.6.0
 */
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: {}) => Error = toError): IOEither<Error, A> => {
  return new IOEither(new IO(() => eitherTryCatch(f, onerror)))
}

/**
 * @function
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
