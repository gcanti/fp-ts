/**
 * @since 2.10.0
 */
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Eq, fromEquals } from './Eq'
import { getObjectSemigroup, Semigroup } from './Semigroup'
import * as _ from './internal'

/**
 * @category instances
 * @since 2.10.0
 */
export const getShow = <A>(shows: { [K in keyof A]: Show<A[K]> }): Show<{ readonly [K in keyof A]: A[K] }> => ({
  show: (a) => {
    let s = '{'
    for (const k in shows) {
      if (_.hasOwnProperty.call(shows, k)) {
        s += ` ${k}: ${shows[k].show(a[k])},`
      }
    }
    if (s.length > 1) {
      s = s.slice(0, -1) + ' '
    }
    s += '}'
    return s
  }
})

/**
 * @category instances
 * @since 2.10.0
 */
export const getEq = <A>(eqs: { [K in keyof A]: Eq<A[K]> }): Eq<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((first, second) => {
    for (const key in eqs) {
      if (!eqs[key].equals(first[key], second[key])) {
        return false
      }
    }
    return true
  })

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { getSemigroup } from 'fp-ts/struct'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = getSemigroup<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.10.0
 */
export const getSemigroup = <A>(
  semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<{ readonly [K in keyof A]: A[K] }> => ({
  concat: (first, second) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (_.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].concat(first[k], second[k])
      }
    }
    return r
  }
})

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/struct'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 2.10.0
 */
// tslint:disable-next-line: deprecation
export const getAssignSemigroup: <A extends object = never>() => Semigroup<A> = getObjectSemigroup

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { getMonoid } from 'fp-ts/struct'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const M = getMonoid<Point>({
 *   x: N.MonoidSum,
 *   y: N.MonoidSum
 * })
 *
 * assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @category instances
 * @since 2.10.0
 */
export const getMonoid = <A>(monoids: { [K in keyof A]: Monoid<A[K]> }): Monoid<{ readonly [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  for (const k in monoids) {
    if (_.hasOwnProperty.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return {
    concat: getSemigroup(monoids).concat,
    empty
  }
}
