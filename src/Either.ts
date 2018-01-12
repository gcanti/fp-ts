import { HKT, HKTS, HKT2S, HKT2, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Monad, FantasyMonad } from './Monad'
import { Foldable, FantasyFoldable } from './Foldable'
import { Extend, FantasyExtend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Bifunctor, FantasyBifunctor } from './Bifunctor'
import { Alt, FantasyAlt } from './Alt'
import { ChainRec, tailRec } from './ChainRec'
import { Option, none, some } from './Option'
import { constFalse, Predicate, Lazy, toString } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Either: Either<L, A>
  }
}

export const URI = 'Either'

export type URI = typeof URI

/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values.
 * In this usage, `None` is replaced with a `Left` which can contain useful information.
 * `Right` takes the place of `Some`.
 * Convention dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on.
 * If it is `Left`, operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * right(12).map(double) // right(24)
 * left(23).map(double)  // left(23)
 * ```
 *
 * @data
 * @constructor Left
 * @constructor Right
 */
export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlt<URI, A>,
    FantasyExtend<URI, A>,
    FantasyBifunctor<URI, L, A> {
  readonly _tag: 'Left' = 'Left'
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_L': L
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: L) {}
  /** The given function is applied if this is a `Right` */
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (isLeft(fab) ? fab : this) as any
  }
  ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  /** Binds the given function across `Right` */
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Left(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Either<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> {
    return f => F.of(this as any)
  }
  /** Applies a function to each case in the data structure */
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return left(this.value)
  }
  /** Returns the value from this `Right` or the given argument if this is a `Left` */
  getOrElseValue(a: A): A {
    return a
  }
  /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
  getOrElse(f: (l: L) => A): A {
    return f(this.value)
  }
  /** Maps the left side of the disjunction */
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return left(f(this.value))
  }
  /** Returns a `Some` containing the `Right` value if it exists or a `None` if this is a `Left` */
  toOption(): Option<A> {
    return none
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `left(${toString(this.value)})`
  }
  /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
  isLeft(): this is Left<L, A> {
    return true
  }
  /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
  isRight(): this is Right<L, A> {
    return false
  }
  /** Swaps the disjunction values */
  swap(): Either<A, L> {
    return right(this.value)
  }
}

export class Right<L, A>
  implements FantasyMonad<URI, A>,
    FantasyFoldable<A>,
    FantasyTraversable<URI, A>,
    FantasyAlt<URI, A>,
    FantasyExtend<URI, A> {
  readonly _tag: 'Right' = 'Right'
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_L': L
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    if (isRight(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B> {
    return new Right<V, B>(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return new Right(f(this))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2<F, M, B>) => HKT2As<F, M, Either<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKTAs<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> {
    return f => F.map(b => of(b), f(this.value))
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return right(this.value)
  }
  getOrElseValue(a: A): A {
    return this.value
  }
  getOrElse(f: (l: L) => A): A {
    return this.value
  }
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return this as any
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `right(${toString(this.value)})`
  }
  isLeft(): this is Left<L, A> {
    return false
  }
  isRight(): this is Right<L, A> {
    return true
  }
  swap(): Either<A, L> {
    return left(this.value)
  }
}

/**
 * Applies a function to each case in the data structure
 * @function
 */
export const fold = <L, A, B>(left: (l: L) => B, right: (a: A) => B) => (fa: Either<L, A>): B => {
  return fa.fold(left, right)
}

/** @function */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => {
  return {
    equals: x => y =>
      x.fold(lx => y.fold(ly => SL.equals(lx)(ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax)(ay)))
  }
}

/**
 * Returns the value from this `Right` or the given argument if this is a `Left`
 * @function
 */
export const getOrElseValue = <A>(a: A) => <L>(fa: Either<L, A>): A => {
  return fa.getOrElseValue(a)
}

/**
 * Returns the value from this `Right` or the result of given argument if this is a `Left`
 * @function
 */
export const getOrElse = <L, A>(f: (l: L) => A) => (fa: Either<L, A>): A => {
  return fa.getOrElse(f)
}

/** @function */
export const map = <L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B> => {
  return fa.map(f)
}

/** @function */
export const of = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}

/** @function */
export const ap = <L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> => {
  return fa.ap(fab)
}

/** @function */
export const chain = <L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B> => {
  return fa.chain(f)
}

/** @function */
export const bimap = <L, V, A, B>(f: (u: L) => V, g: (a: A) => B, fla: Either<L, A>): Either<V, B> => {
  return fla.bimap(f, g)
}

/** @function */
export const alt = <L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
  return fx.alt(fy)
}

/** @function */
export const extend = <L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B> => {
  return ea.extend(f)
}

/** @function */
export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B => {
  return fa.reduce(f, b)
}

export function traverse<F extends HKT2S>(
  F: Applicative<F>
): <M, L, A, B>(f: (a: A) => HKT2<F, M, B>, ta: Either<L, A>) => HKT2As<F, M, Either<L, B>>
export function traverse<F extends HKTS>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Either<L, A>) => HKTAs<F, Either<L, B>>
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Either<L, B>>
export function traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Either<L, A>) => HKT<F, Either<L, B>> {
  return (f, ta) => ta.traverse(F)(f)
}

/** @function */
export const chainRec = <L, A, B>(f: (a: A) => Either<L, Either<A, B>>, a: A): Either<L, B> => {
  return tailRec(e => e.fold(l => right(left(l)), r => r.fold(a => left(f(a)), b => right(right(b)))), f(a))
}

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 * @function
 */
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => {
  return fa.isLeft()
}

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 * @function
 */
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => {
  return fa.isRight()
}

/**
 * Constructs a new `Either` holding a `Left` value.
 * This usually represents a failure, due to the right-bias of this structure
 * @function
 */
export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

/**
 * Constructs a new `Either` holding a `Right` value.
 * This usually represents a successful value due to the right bias of this structure
 * @function
 * @alias of
 */
export const right = of

/** @function */
export const fromPredicate = <L, A>(predicate: Predicate<A>, l: (a: A) => L) => (a: A): Either<L, A> => {
  return predicate(a) ? right(a) : left(l(a))
}

/**
 * Maps the left side of the disjunction
 * @function
 */
export const mapLeft = <L, M>(f: (l: L) => M) => <A>(fa: Either<L, A>): Either<M, A> => {
  return fa.mapLeft(f)
}

/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into
 * a `Right`, if the value is a `None` use the provided default as a `Left`
 * @function
 */
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.fold(() => left(defaultValue), a => right(a))
}

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into
 * a `Right`, if the value is nully use the provided default as a `Left`
 * @function
 */
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => {
  return a == null ? left(defaultValue) : right(a)
}

/** @function */
export const toOption = <L, A>(fa: Either<L, A>): Option<A> => {
  return fa.toOption()
}

/** @function */
export const tryCatch = <A>(f: Lazy<A>): Either<Error, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(e)
  }
}

/**
 * Swaps the disjunction values
 * @function
 */
export const swap = <L, A>(fa: Either<L, A>): Either<A, L> => {
  return fa.swap()
}

/** @instance */
export const either: Monad<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Bifunctor<URI> &
  Alt<URI> &
  Extend<URI> &
  ChainRec<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse,
  bimap,
  alt,
  extend,
  chainRec
}
