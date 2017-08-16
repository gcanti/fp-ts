import { Ordering } from './Ordering'
import { Setoid, setoidBoolean, setoidNumber, setoidString } from './Setoid'

export interface Ord<A> extends Setoid<A> {
  compare: (x: A) => (y: A) => Ordering
}

export function toNativeComparator<A>(compare: (x: A) => (y: A) => Ordering): (x: A, y: A) => number {
  return (x, y) => {
    const c = compare(x)(y)
    return c === 'GT' ? 1 : c === 'EQ' ? 0 : -1
  }
}

export const unsafeCompare = (x: any) => (y: any): Ordering => {
  return x < y ? 'LT' : x > y ? 'GT' : 'EQ'
}

export const stringOrd: Ord<string> = { compare: unsafeCompare, equals: setoidString.equals }

export const numberOrd: Ord<number> = { compare: unsafeCompare, equals: setoidNumber.equals }

export const booleanOrd: Ord<boolean> = { compare: unsafeCompare, equals: setoidBoolean.equals }

export const lessThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x)(y) === 'LT'
}

export const greaterThan = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x)(y) === 'GT'
}

export const lessThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x)(y) !== 'GT'
}

export const greaterThanOrEq = <A>(ord: Ord<A>) => (x: A) => (y: A): boolean => {
  return ord.compare(x)(y) !== 'LT'
}

export const min = <A>(ord: Ord<A>) => (x: A) => (y: A): A => {
  return ord.compare(x)(y) === 'GT' ? y : x
}

export const max = <A>(ord: Ord<A>) => (x: A) => (y: A): A => {
  return ord.compare(x)(y) === 'LT' ? y : x
}

export const clamp = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): A => {
  return min(ord)(hi)(max(ord)(low)(x))
}

export const between = <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A): boolean => {
  return lessThan(ord)(x)(low) || greaterThan(ord)(x)(hi) ? false : true
}
