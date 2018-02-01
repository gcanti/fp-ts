import { HKT } from './HKT'
import { Applicative } from './Applicative'
import { Monad2 } from './Monad'
import { Foldable2 } from './Foldable'
import { Extend2 } from './Extend'
import { Setoid } from './Setoid'
import { Traversable2 } from './Traversable'
import { Bifunctor2 } from './Bifunctor'
import { Alt2 } from './Alt'
import { tailRec, ChainRec2 } from './ChainRec'
import { Option } from './Option'
import { constFalse, Predicate, Lazy, toString } from './function'
import { Validation } from './Validation'

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

export class Left<L, A> {
  readonly _tag: 'Left' = 'Left'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: L) {}
  /** The given function is applied if this is a `Right` */
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (fab.isLeft() ? fab : this) as any
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
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return b
  }
  /** Applies a function to each case in the data structure */
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return left(this.value)
  }
  /** Returns the value from this `Right` or the given argument if this is a `Left` */
  getOrElse(a: A): A {
    return a
  }
  /** Lazy version of `getOrElse` */
  getOrElseL(f: () => A): A {
    return f()
  }
  /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
  catchLeft(f: (l: L) => A): A {
    return f(this.value)
  }
  /** Maps the left side of the disjunction */
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return left(f(this.value))
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

export class Right<L, A> {
  readonly _tag: 'Right' = 'Right'
  readonly '-A': A
  readonly '-L': L
  readonly '-URI': URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right(f(this.value))
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    if (fab.isRight()) {
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
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return f(b, this.value)
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return right(this.value)
  }
  getOrElse(a: A): A {
    return this.value
  }
  getOrElseL(f: () => A): A {
    return this.value
  }
  catchLeft(f: (l: L) => A): A {
    return this.value
  }
  mapLeft<M>(f: (l: L) => M): Either<M, A> {
    return this as any
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

/** @function */
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => {
  return {
    equals: (x, y) =>
      x.fold(lx => y.fold(ly => SL.equals(lx, ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax, ay)))
  }
}

/**
 * Returns the value from this `Right` or the result of given argument if this is a `Left`
 * @function
 */
export const catchLeft = <L, A>(fa: Either<L, A>, f: (l: L) => A): A => {
  return fa.catchLeft(f)
}

const map = <L, A, B>(fa: Either<L, A>, f: (a: A) => B): Either<L, B> => {
  return fa.map(f)
}

const of = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}

const ap = <L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> => {
  return fa.chain(f)
}

const bimap = <L, V, A, B>(fla: Either<L, A>, f: (u: L) => V, g: (a: A) => B): Either<V, B> => {
  return fla.bimap(f, g)
}

const alt = <L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
  return fx.alt(fy)
}

const extend = <L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B> => {
  return ea.extend(f)
}

const reduce = <L, A, B>(fa: Either<L, A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

function traverse<F>(F: Applicative<F>): <L, A, B>(ta: Either<L, A>, f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> {
  return (ta, f) => ta.fold(l => F.of(left(l)), a => F.map(f(a), b => of(b)))
}

const chainRec = <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>): Either<L, B> => {
  return tailRec(e => e.fold(l => right(left(l)), r => r.fold(a => left(f(a)), b => right(right(b)))), f(a))
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
export const fromPredicate = <L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (a: A): Either<L, A> => {
  return predicate(a) ? right(a) : left(whenFalse(a))
}

/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into
 * a `Right`, if the value is a `None` use the provided default as a `Left`
 * @function
 */
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => {
  return fa.fold(left(defaultValue), a => right(a))
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
export const tryCatch = <A>(f: Lazy<A>): Either<Error, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(e)
  }
}

/** @function */
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.fold<Either<L, A>>(left, right)
}

/** @instance */
export const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = {
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
