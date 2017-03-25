import { Ordering } from './Ordering'
import {
  StaticSetoid,
  setoidBoolean,
  setoidNumber,
  setoidString
} from './Setoid'

export interface StaticOrd<A> extends StaticSetoid<A> {
  compare(x: A, y: A): Ordering
}

export function toNativeComparator<A>(compare: (x: A, y: A) => Ordering): (x: A, y: A) => number {
  return (x, y) => {
    const c = compare(x, y)
    return c === 'GT' ? 1 : c === 'EQ' ? 0 : -1
  }
}

export function unsafeCompare(x: any, y: any): Ordering {
  return x < y ? 'LT' : x > y ? 'GT' : 'EQ'
}

export const stringOrd: StaticOrd<string> = { compare: unsafeCompare, equals: setoidString.equals }

export const numberOrd: StaticOrd<number> = { compare: unsafeCompare, equals: setoidNumber.equals }

export const booleanOrd: StaticOrd<boolean> = { compare: unsafeCompare, equals: setoidBoolean.equals }

export function lessThan<A>(ord: StaticOrd<A>, x: A, y: A): boolean {
  return ord.compare(x, y) === 'LT'
}

export function greaterThan<A>(ord: StaticOrd<A>, x: A, y: A): boolean {
  return ord.compare(x, y) === 'GT'
}

export function lessThanOrEq<A>(ord: StaticOrd<A>, x: A, y: A): boolean {
  return ord.compare(x, y) !== 'GT'
}

export function greaterThanOrEq<A>(ord: StaticOrd<A>, x: A, y: A): boolean {
  return ord.compare(x, y) !== 'LT'
}

export function min<A>(ord: StaticOrd<A>, x: A, y: A): A {
  return ord.compare(x, y) === 'GT' ? y : x
}

export function max<A>(ord: StaticOrd<A>, x: A, y: A): A {
  return ord.compare(x, y) === 'LT' ? y : x
}

export function clamp<A>(ord: StaticOrd<A>, low: A, hi: A, x: A): A {
  return min(ord, hi, max(ord, low, x))
}

export function between<A>(ord: StaticOrd<A>, low: A, hi: A, x: A): boolean {
  return lessThan(ord, x, low) || greaterThan(ord, x, hi) ? false : true
}
