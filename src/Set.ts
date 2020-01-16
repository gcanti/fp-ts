/**
 * @since 2.0.0
 */
import { Separated } from './Compactable'
import { Either } from './Either'
import { Eq } from './Eq'
import { Predicate, Refinement } from './function'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import * as RS from './ReadonlySet'
import { Semigroup } from './Semigroup'
import { Show } from './Show'

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Set<A>> = RS.getShow

/**
 * @since 2.0.0
 */
export const empty: Set<never> = new Set()

/**
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export const toArray: <A>(O: Ord<A>) => (set: Set<A>) => Array<A> = RS.toReadonlyArray as any

/**
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Set<A>> = RS.getEq

/**
 * @since 2.0.0
 */
export const some: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean = RS.some

/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
export const map: <B>(E: Eq<B>) => <A>(f: (x: A) => B) => (set: Set<A>) => Set<B> = RS.map as any

/**
 * @since 2.0.0
 */
export const every: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean = RS.every

/**
 * @since 2.0.0
 */
export const chain: <B>(E: Eq<B>) => <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B> = RS.chain as any

/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export const subset: <A>(E: Eq<A>) => (x: Set<A>, y: Set<A>) => boolean = RS.isSubset

/**
 * @since 2.0.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A> {
  return RS.filter(predicate) as any
}

/**
 * @since 2.0.0
 */
export function partition<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Separated<Set<A>, Set<B>>
export function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>>
export function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>> {
  return RS.partition(predicate) as any
}

/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export const elem: <A>(E: Eq<A>) => (a: A, set: Set<A>) => boolean = RS.elem

/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
export const union: <A>(E: Eq<A>) => (set: Set<A>, y: Set<A>) => Set<A> = RS.union as any

/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
export const intersection: <A>(E: Eq<A>) => (set: Set<A>, y: Set<A>) => Set<A> = RS.intersection as any

/**
 * @since 2.0.0
 */
export const partitionMap: <B, C>(
  EB: Eq<B>,
  EC: Eq<C>
) => <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>> = RS.partitionMap as any

/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/Set'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.0.0
 */
export const difference: <A>(E: Eq<A>) => (x: Set<A>, y: Set<A>) => Set<A> = RS.difference as any

/**
 * @since 2.0.0
 */
export const getUnionMonoid: <A>(E: Eq<A>) => Monoid<Set<A>> = RS.getUnionMonoid as any

/**
 * @since 2.0.0
 */
export const getIntersectionSemigroup: <A>(E: Eq<A>) => Semigroup<Set<A>> = RS.getIntersectionSemigroup as any

/**
 * @since 2.0.0
 */
export const reduce: <A>(O: Ord<A>) => <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B = RS.reduce

/**
 * @since 2.0.0
 */
export const foldMap: <A, M>(O: Ord<A>, M: Monoid<M>) => (f: (a: A) => M) => (fa: Set<A>) => M = RS.foldMap

/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
export const singleton: <A>(a: A) => Set<A> = RS.singleton as any

/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
export const insert: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A> = RS.insert as any

/**
 * Delete a value from a set
 *
 * @since 2.0.0
 */
export const remove: <A>(E: Eq<A>) => (a: A) => (set: Set<A>) => Set<A> = RS.remove as any

/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
// tslint:disable-next-line: readonly-array
export const fromArray: <A>(E: Eq<A>) => (as: Array<A>) => Set<A> = RS.fromArray as any

/**
 * @since 2.0.0
 */
export const compact: <A>(E: Eq<A>) => (fa: Set<Option<A>>) => Set<A> = RS.compact as any

/**
 * @since 2.0.0
 */
export const separate: <E, A>(
  EE: Eq<E>,
  EA: Eq<A>
) => (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>> = RS.separate as any

/**
 * @since 2.0.0
 */
export const filterMap: <B>(E: Eq<B>) => <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B> = RS.filterMap as any
