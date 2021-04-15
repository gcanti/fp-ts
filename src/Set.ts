/**
 * @since 2.0.0
 */
import { separated, Separated } from './Separated'
import { Either } from './Either'
import { Eq } from './Eq'
import { identity, Predicate, Refinement } from './function'
import { Monoid } from './Monoid'
import { Option } from './Option'
import { Ord } from './Ord'
import * as RS from './ReadonlySet'
import { Semigroup } from './Semigroup'
import { Show } from './Show'

/**
 * @category instances
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Set<A>> = RS.getShow

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Set<A>> = RS.getEq

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category combinators
 * @since 2.0.0
 */
export function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: Set<A>) => Set<B> {
  const elemE = elem(E)
  return (f) => (set) => {
    const r = new Set<B>()
    set.forEach((e) => {
      const v = f(e)
      if (!elemE(v, r)) {
        r.add(v)
      }
    })
    return r
  }
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 2.0.0
 */
export function chain<B>(E: Eq<B>): <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B> {
  const elemE = elem(E)
  return (f) => (set) => {
    const r = new Set<B>()
    set.forEach((e) => {
      f(e).forEach((e) => {
        if (!elemE(e, r)) {
          r.add(e)
        }
      })
    })
    return r
  }
}

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A> {
  return (set) => {
    const values = set.values()
    let e: Next<A>
    const r = new Set<A>()
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = values.next()).done) {
      const value = e.value
      if (predicate(value)) {
        r.add(value)
      }
    }
    return r
  }
}

/**
 * @since 2.0.0
 */
export function partition<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Separated<Set<A>, Set<B>>
export function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>>
export function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Separated<Set<A>, Set<A>> {
  return (set) => {
    const values = set.values()
    let e: Next<A>
    const right = new Set<A>()
    const left = new Set<A>()
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = values.next()).done) {
      const value = e.value
      if (predicate(value)) {
        right.add(value)
      } else {
        left.add(value)
      }
    }
    return separated(left, right)
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Form the union of two sets
 *
 * @category combinators
 * @since 2.0.0
 */
export function union<A>(
  E: Eq<A>
): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
export function union<A>(E: Eq<A>): (me: Set<A>, that?: Set<A>) => Set<A> | ((me: Set<A>) => Set<A>) {
  const elemE = elem(E)
  return (me, that?) => {
    if (that === undefined) {
      const unionE = union(E)
      return (that) => unionE(me, that)
    }
    if (isEmpty(me)) {
      return that
    }
    if (isEmpty(that)) {
      return me
    }
    const r = new Set(me)
    that.forEach((e) => {
      if (!elemE(e, r)) {
        r.add(e)
      }
    })
    return r
  }
}

// TODO: remove non-curried overloading in v3
/**
 * The set of elements which are in both the first and second set
 *
 * @category combinators
 * @since 2.0.0
 */
export function intersection<A>(
  E: Eq<A>
): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
export function intersection<A>(E: Eq<A>): (me: Set<A>, that?: Set<A>) => Set<A> | ((that: Set<A>) => Set<A>) {
  const elemE = elem(E)
  return (me, that?) => {
    if (that === undefined) {
      const intersectionE = intersection(E)
      return (that) => intersectionE(that, me)
    }
    if (isEmpty(me) || isEmpty(that)) {
      return new Set()
    }
    const r = new Set<A>()
    me.forEach((e) => {
      if (elemE(e, that)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * @since 2.0.0
 */
export function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Separated<Set<B>, Set<C>> {
  return <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => {
    const values = set.values()
    let e: Next<A>
    const left = new Set<B>()
    const right = new Set<C>()
    const hasB = elem(EB)
    const hasC = elem(EC)
    // tslint:disable-next-line: strict-boolean-expressions
    while (!(e = values.next()).done) {
      const v = f(e.value)
      switch (v._tag) {
        case 'Left':
          if (!hasB(v.left, left)) {
            left.add(v.left)
          }
          break
        case 'Right':
          if (!hasC(v.right, right)) {
            right.add(v.right)
          }
          break
      }
    }
    return separated(left, right)
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/Set'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
 *
 * @category combinators
 * @since 2.0.0
 */
export function difference<A>(
  E: Eq<A>
): {
  (that: Set<A>): (me: Set<A>) => Set<A>
  (me: Set<A>, that: Set<A>): Set<A>
}
export function difference<A>(E: Eq<A>): (me: Set<A>, that?: Set<A>) => Set<A> | ((me: Set<A>) => Set<A>) {
  const elemE = elem(E)
  return (me, that?) => {
    if (that === undefined) {
      const differenceE = difference(E)
      return (that) => differenceE(that, me)
    }
    return filter((a: A) => !elemE(a, that))(me)
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<Set<A>> {
  return {
    concat: union(E),
    empty: new Set()
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<Set<A>> {
  return {
    concat: intersection(E)
  }
}

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
 * @category constructors
 * @since 2.0.0
 */
export const singleton = <A>(a: A): Set<A> => new Set([a])

/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.0.0
 */
export function insert<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A> {
  const elemE = elem(E)
  return (a) => (set) => {
    if (!elemE(a)(set)) {
      const r = new Set(set)
      r.add(a)
      return r
    } else {
      return set
    }
  }
}

/**
 * Delete a value from a set
 *
 * @category combinators
 * @since 2.0.0
 */
export const remove = <A>(E: Eq<A>) => (a: A) => (set: Set<A>): Set<A> => filter((ax: A) => !E.equals(a, ax))(set)

/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @category combinators
 * @since 2.5.0
 */
export const toggle = <A>(E: Eq<A>): ((a: A) => (set: Set<A>) => Set<A>) => {
  const elemE = elem(E)
  const removeE = remove(E)
  const insertE = insert(E)
  return (a) => (set) => (elemE(a, set) ? removeE : insertE)(a)(set)
}

/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromArray = <A>(E: Eq<A>) => (as: Array<A>): Set<A> => {
  const len = as.length
  const out = new Set<A>()
  const has = elem(E)
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (!has(a, out)) {
      out.add(a)
    }
  }
  return out
}

/**
 * @category combinators
 * @since 2.0.0
 */
export const compact = <A>(E: Eq<A>): ((fa: Set<Option<A>>) => Set<A>) => filterMap(E)(identity)

/**
 * @since 2.0.0
 */
export function separate<E, A>(EE: Eq<E>, EA: Eq<A>): (fa: Set<Either<E, A>>) => Separated<Set<E>, Set<A>> {
  return (fa) => {
    const elemEE = elem(EE)
    const elemEA = elem(EA)
    const left: Set<E> = new Set()
    const right: Set<A> = new Set()
    fa.forEach((e) => {
      switch (e._tag) {
        case 'Left':
          if (!elemEE(e.left, left)) {
            left.add(e.left)
          }
          break
        case 'Right':
          if (!elemEA(e.right, right)) {
            right.add(e.right)
          }
          break
      }
    })
    return separated(left, right)
  }
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B> {
  const elemE = elem(E)
  return (f) => (fa) => {
    const r: Set<B> = new Set()
    fa.forEach((a) => {
      const ob = f(a)
      if (ob._tag === 'Some' && !elemE(ob.value, r)) {
        r.add(ob.value)
      }
    })
    return r
  }
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.0.0
 */
export const empty: Set<never> = new Set()

/**
 * Test whether a `Set` is empty.
 *
 * @since 2.10.0
 */
export const isEmpty = <A>(set: Set<A>): boolean => set.size === 0

/**
 * Calculate the number of elements in a `Set`.
 *
 * @since 2.10.0
 */
export const size = <A>(set: Set<A>): number => set.size

/**
 * @since 2.0.0
 */
export const some: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean = RS.some

/**
 * @since 2.0.0
 */
export const every: <A>(predicate: Predicate<A>) => (set: Set<A>) => boolean = RS.every

/**
 * @since 2.10.0
 */
export const isSubset: <A>(E: Eq<A>) => (that: Set<A>) => (me: Set<A>) => boolean = RS.isSubset

// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export const elem: <A>(
  E: Eq<A>
) => {
  (a: A): (set: Set<A>) => boolean
  (a: A, set: Set<A>): boolean
} = RS.elem

/**
 * Get a sorted `Array` of the values contained in a `Set`.
 *
 * @since 2.0.0
 */
export const toArray = <A>(O: Ord<A>) => (set: Set<A>): Array<A> => {
  const out: Array<A> = []
  set.forEach((e) => out.push(e))
  return out.sort(O.compare)
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`isSubset`](#issubset) instead.
 *
 * @since 2.0.0
 * @deprecated
 */
export const subset: <A>(
  E: Eq<A>
) => {
  (that: Set<A>): (me: Set<A>) => boolean
  (me: Set<A>, that: Set<A>): boolean
} = RS.isSubset
