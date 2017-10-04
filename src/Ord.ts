import { Ordering, orderingSemigroup } from './Ordering'
import { Setoid, setoidBoolean, setoidNumber, setoidString } from './Setoid'
import { Semigroup } from './Semigroup'
import { on } from './function'

export interface Ord<A> extends Setoid<A> {
  compare: (x: A) => (y: A) => Ordering
}

export const toNativeComparator = <A>(compare: (x: A) => (y: A) => Ordering): ((x: A, y: A) => number) => (x, y) => {
  const c = compare(x)(y)
  return c === 'GT' ? 1 : c === 'EQ' ? 0 : -1
}

export const unsafeCompare = (x: any) => (y: any): Ordering => (x < y ? 'LT' : x > y ? 'GT' : 'EQ')

export const ordString: Ord<string> = {
  ...setoidString,
  compare: unsafeCompare
}

export const ordNumber: Ord<number> = {
  ...setoidNumber,
  compare: unsafeCompare
}

export const ordBoolean: Ord<boolean> = {
  ...setoidBoolean,
  compare: unsafeCompare
}

/** Test whether one value is _strictly less than_ another */
export const lessThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => ord.compare(x)(y) === 'LT'

/** Test whether one value is _strictly greater than_ another */
export const greaterThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => ord.compare(x)(y) === 'GT'

/** Test whether one value is _non-strictly less than_ another */
export const lessThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => ord.compare(x)(y) !== 'GT'

/** Test whether one value is _non-strictly greater than_ another */
export const greaterThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => ord.compare(x)(y) !== 'LT'

/** Take the minimum of two values. If they are considered equal, the first argument is chosen */
export const min = <A>(ord: Ord<A>) => (x: A) => (y: A): A => (ord.compare(x)(y) === 'GT' ? y : x)

/** Take the maximum of two values. If they are considered equal, the first argument is chosen */
export const max = <A>(ord: Ord<A>) => (x: A) => (y: A): A => (ord.compare(x)(y) === 'LT' ? y : x)

/** Clamp a value between a minimum and a maximum */
export const clamp = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): A => min(ord)(hi)(max(ord)(low)(x))

/** Test whether a value is between a minimum and a maximum (inclusive) */
export const between = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): boolean =>
  lessThan(ord)(x)(low) || greaterThan(ord)(x)(hi) ? false : true

export const fromCompare = <A>(compare: (x: A) => (y: A) => Ordering): Ord<A> => ({
  equals: x => y => compare(x)(y) === 'EQ',
  compare
})

export const contramap = <A, B>(f: (b: B) => A, fa: Ord<A>): Ord<B> => fromCompare(on(fa.compare)(f))

export const getSemigroup = <A>(): Semigroup<Ord<A>> => ({
  concat: x => y => fromCompare(a => b => orderingSemigroup.concat(x.compare(a)(b))(y.compare(a)(b)))
})
