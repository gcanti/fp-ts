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
    return foldT(left, right, this.value)
  }
  mapLeft<M>(f: (l: L) => M): IOEither<M, A> {
    return new IOEither(this.value.map(e => e.mapLeft(f)))
  }
  orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> {
    return new IOEither(this.value.chain(e => e.fold(l => f(l).value, a => T.of(a))))
  }
  alt(fy: IOEither<L, A>): IOEither<L, A> {
    return this.orElse(() => fy)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> {
    return new IOEither(this.value.map(e => e.bimap(f, g)))
  }
}

const map = <L, A, B>(fa: IOEither<L, A>, f: (a: A) => B): IOEither<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): IOEither<L, A> => {
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
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => {
  return new IOEither(fa.map<Either<L, A>>(eitherRight))
}

/**
 * @since 1.6.0
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
 * @since 1.6.0
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
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON } from 'fp-ts/lib/IOEither'
 * import { toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError).run().value, { a: 1 })
 * assert.deepStrictEqual(parseJSON('{"a":}', toError).run().value, new SyntaxError('Unexpected token } in JSON at position 5'))
 *
 * @since 1.16.0
 */
export const parseJSON = <L>(s: string, onError: (reason: unknown) => L): IOEither<L, unknown> => {
  return tryCatch2v(() => JSON.parse(s), onError)
}

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON } from 'fp-ts/lib/IOEither'
 * import { toError } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).run().value, '{"a":1}')
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError).run().value, new TypeError('Converting circular structure to JSON'))
 *
 * @since 1.16.0
 */
export const stringifyJSON = <L>(u: unknown, onError: (reason: unknown) => L): IOEither<L, string> => {
  return tryCatch2v(() => JSON.stringify(u), onError)
}

const throwError = fromLeft

/**
 * @since 1.6.0
 */
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = {
  URI,
  bimap,
  map,
  of,
  ap,
  chain,
  alt,
  throwError,
  fromEither,
  fromOption: (o, e) => (o.isNone() ? throwError(e) : of(o.value))
}
