import { Applicative } from './Applicative'
import { array, last, sort } from './Array'
import { Comonad1 } from './Comonad'
import { Foldable1 } from './Foldable'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Option, none, some } from './Option'
import { Ord } from './Ord'
import { Semigroup, fold, getJoinSemigroup, getMeetSemigroup } from './Semigroup'
import { Traversable1 } from './Traversable'
import { concat as uncurriedConcat, toString } from './function'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

export const URI = 'NonEmptyArray'

export type URI = typeof URI

/**
 * Data structure which represents non-empty arrays
 * @data
 * @constructor NonEmptyArray
 * @since 1.0.0
 */
export class NonEmptyArray<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly head: A, readonly tail: Array<A>) {}

  /**
   * Converts this {@link NonEmptyArray} to plain {@link Array}
   * @since 1.0.0
   * @example
   * assert.deepEqual(new NonEmptyArray(1, [2, 3]), [1, 2, 3])
   * @returns {Array<A>} foo
   */
  toArray(): Array<A> {
    return uncurriedConcat([this.head], this.tail)
  }

  /**
   * Concatenates this {@link NonEmptyArray} and passed {@link Array}
   * @since 1.0.0
   * @param {Array<A>} as - {@link Array}
   * @example
   * assert.deepEqual(new NonEmptyArray(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
   * @returns {NonEmptyArray<A>}
   */
  concatArray(as: Array<A>): NonEmptyArray<A> {
    return new NonEmptyArray(this.head, uncurriedConcat(this.tail, as))
  }

  /**
   * Instance-bound implementation of {@link Functor}
   * @since 1.0.0
   * @param {(a: A) => B} f
   * @example
   * const double = (n: number): number => n * 2
   * assert.deepEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
   * @returns {NonEmptyArray<B>}
   */
  map<B>(f: (a: A) => B): NonEmptyArray<B> {
    return new NonEmptyArray(f(this.head), this.tail.map(f))
  }

  /**
   * Instance-bound implementation of {@link Apply}
   * @since 1.0.0
   * @param {NonEmptyArray<(a: A) => B>} fab
   * @example
   * const x = new NonEmptyArray(1, [2])
   * const double = (n: number) => n * 2
   * assert.deepEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
   * @returns {NonEmptyArray<B>}
   */
  ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> {
    return fab.chain(f => this.map(f)) // <= derived
  }

  /**
   * Same as {@link ap} but works on {@link NonEmptyArray} of functions and accepts {@link NonEmptyArray} of values instead
   * @since 1.0.0
   * @this {NonEmptyArray<(b: B) => C>}
   * @param {NonEmptyArray<B>} fb
   * @example
   * const x = new NonEmptyArray(1, [2])
   * const double = (n: number) => n * 2
   * assert.deepEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
   * @returns {NonEmptyArray<C>}
   */
  ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> {
    return fb.ap(this)
  }

  /**
   * Instance-bound implementation of {@link Chain}
   * @since 1.0.0
   * @param {(a: A) => NonEmptyArray<B>} f
   * @example
   * const x = new NonEmptyArray(1, [2])
   * const f = (a: number) => new NonEmptyArray(a, [4])
   * assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
   * @returns {NonEmptyArray<B>}
   */
  chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> {
    return f(this.head).concatArray(array.chain(this.tail, a => f(a).toArray()))
  }

  /**
   * Instance-bound implementation of {@link Semigroup}
   * @since 1.0.0
   * @param {NonEmptyArray<A>} y
   * @example
   * const x = new NonEmptyArray(1, [2])
   * const y = new NonEmptyArray(3, [4])
   * assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
   * @returns {NonEmptyArray<A>}
   */
  concat(y: NonEmptyArray<A>): NonEmptyArray<A> {
    return this.concatArray(y.toArray())
  }

  /**
   * Instance-bound implementation of {@link Foldable}
   * @since 1.0.0
   * @param {B} b
   * @param {(b: B, a: A) => B} f
   * @example
   * const x = new NonEmptyArray('a', ['b'])
   * assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
   * @returns {B}
   */
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return array.reduce(this.toArray(), b, f)
  }

  /**
   * Instance-bound implementation of {@link Extend}
   * @since 1.0.0
   * @param {(fa: NonEmptyArray<A>) => B} f
   * @example
   * const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
   * assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
   * @returns {NonEmptyArray<B>}
   */
  extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> {
    return unsafeFromArray(array.extend(this.toArray(), as => f(unsafeFromArray(as))))
  }

  /**
   * Instance-bound implementation of {@link Comonad}
   * @since 1.0.0
   * @example
   * assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
   * @returns {A}
   */
  extract(): A {
    return this.head
  }

  /**
   * Same as {@link toString}
   * @since 1.0.0
   * @returns {string}
   */
  inspect(): string {
    return this.toString()
  }

  /**
   * Return stringified representation of this {@link NonEmptyArray}
   * @since 1.0.0
   * @returns {string}
   */
  toString(): string {
    return `new NonEmptyArray(${toString(this.head)}, ${toString(this.tail)})`
  }

  /**
   * Gets minimum of this {@link NonEmptyArray} using specified {@link Ord} instance
   * @since 1.3.0
   * @param ord - {@link Ord} instance
   * @example
   * const minimum = new NonEmptyArray(1, [2, 3]).min(ordNumber) // 1
   * @returns {A}
   */
  min(ord: Ord<A>): A {
    return fold(getMeetSemigroup(ord))(this.head)(this.tail)
  }

  /**
   * Gets maximum of this {@link NonEmptyArray} using specified {@link Ord} instance
   * @since 1.3.0
   * @param ord - {@link Ord} instance
   * @example
   * const maximum = new NonEmptyArray(1, [2, 3]).max(ordNumber) // 3
   * @returns {A}
   */
  max(ord: Ord<A>): A {
    return fold(getJoinSemigroup(ord))(this.head)(this.tail)
  }

  /**
   * Gets last element of this {@link NonEmptyArray}
   * @since 1.6.0
   * @example
   * const last = new NonEmptyArray(1, [2, 3]).last(); // 3
   * const last = new NonEmptyArray(1, []).last(); // 1
   * @returns {A}
   */
  last(): A {
    return last(this.tail).getOrElse(this.head)
  }

  /**
   * Sorts this {@link NonEmptyArray} using specified {@link Ord} instance
   * @since 1.6.0
   * @param {Ord<A>} ord - {@link Ord} instance
   * @example
   * const result = new NonEmptyArray(3, [2, 1]).sort(ordNumber)
   * const expected = new NonEmptyArray(1, [2, 3])
   * assert.deepEqual(result, expected)
   * @returns {NonEmptyArray<A>}
   */
  sort(ord: Ord<A>): NonEmptyArray<A> {
    return unsafeFromArray(sort(ord)(this.toArray()))
  }
}

const unsafeFromArray = <A>(as: Array<A>): NonEmptyArray<A> => {
  return new NonEmptyArray(as[0], as.slice(1))
}

/**
 * Builds {@link NonEmptyArray} from {@link Array} returning {@link Option#none} or {@link Option#some} depending on amount of values in passed array
 * @function
 * @since 1.0.0
 * @param {Array<A>} as
 * @returns {Option<NonEmptyArray<A>>}
 */
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => {
  return as.length > 0 ? some(unsafeFromArray(as)) : none
}

const map = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => B): NonEmptyArray<B> => {
  return fa.map(f)
}

const of = <A>(a: A): NonEmptyArray<A> => {
  return new NonEmptyArray(a, [])
}

const ap = <A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: NonEmptyArray<A>, f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> => {
  return fa.chain(f)
}

const concat = <A>(fx: NonEmptyArray<A>, fy: NonEmptyArray<A>): NonEmptyArray<A> => {
  return fx.concat(fy)
}

/**
 * Builds {@link Semigroup} instance for {@link NonEmptyArray} of specified type arument
 * @function
 * @since 1.0.0
 * @returns {Semigroup<NonEmptyArray<A>>}
 */
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => {
  return { concat }
}

const reduce = <A, B>(fa: NonEmptyArray<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const extend = <A, B>(fa: NonEmptyArray<A>, f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> => {
  return fa.extend(f)
}

const extract = <A>(fa: NonEmptyArray<A>): A => {
  return fa.extract()
}

function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: NonEmptyArray<A>, f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> {
  return (ta, f) => F.map(array.traverse(F)(ta.toArray(), f), unsafeFromArray)
}

/**
 * @instance
 * @since 1.0.0
 */
export const nonEmptyArray: Monad1<URI> & Comonad1<URI> & Foldable1<URI> & Traversable1<URI> = {
  URI,
  extend,
  extract,
  map,
  of,
  ap,
  chain,
  reduce,
  traverse
}
