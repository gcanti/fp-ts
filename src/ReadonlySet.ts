/**
 * @since 2.5.0
 */
import { Either } from './Either'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Eq, fromEquals } from './Eq'
import { Predicate, not, Refinement, identity } from './function'
import { Separated, separated } from './Separated'
import { Option } from './Option'
import { Show } from './Show'

/**
 * @category constructors
 * @since 2.5.0
 */
export function fromSet<A>(s: Set<A>): ReadonlySet<A> {
  return new Set(s)
}

/**
 * @category destructors
 * @since 2.5.0
 */
export function toSet<A>(s: ReadonlySet<A>): Set<A> {
  return new Set(s)
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getShow<A>(S: Show<A>): Show<ReadonlySet<A>> {
  return {
    show: (s) => {
      const entries: Array<string> = []
      s.forEach((a) => {
        entries.push(S.show(a))
      })
      return `new Set([${entries.sort().join(', ')}])`
    }
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getEq<A>(E: Eq<A>): Eq<ReadonlySet<A>> {
  const subsetE = isSubset(E)
  return fromEquals((x, y) => subsetE(x, y) && subsetE(y, x))
}

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

/**
 * Projects a Set through a function
 *
 * @category combinators
 * @since 2.5.0
 */
export function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: ReadonlySet<A>) => ReadonlySet<B> {
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
 * @category combinators
 * @since 2.5.0
 */
export function chain<B>(E: Eq<B>): <A>(f: (x: A) => ReadonlySet<B>) => (set: ReadonlySet<A>) => ReadonlySet<B> {
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

/**
 * @category combinators
 * @since 2.5.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>
export function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A>
export function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A> {
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
 * @since 2.5.0
 */
export function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<B>>
export function partition<A>(
  predicate: Predicate<A>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<A>>
export function partition<A>(
  predicate: Predicate<A>
): (set: ReadonlySet<A>) => Separated<ReadonlySet<A>, ReadonlySet<A>> {
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
 * @since 2.5.0
 */
export function union<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
export function union<A>(
  E: Eq<A>
): (me: ReadonlySet<A>, that?: ReadonlySet<A>) => ReadonlySet<A> | ((me: ReadonlySet<A>) => ReadonlySet<A>) {
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
 * @since 2.5.0
 */
export function intersection<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
export function intersection<A>(
  E: Eq<A>
): (me: ReadonlySet<A>, that?: ReadonlySet<A>) => ReadonlySet<A> | ((that: ReadonlySet<A>) => ReadonlySet<A>) {
  const elemE = elem(E)
  return (me, that?) => {
    if (that === undefined) {
      const intersectionE = intersection(E)
      return (that) => intersectionE(that, me)
    }
    if (isEmpty(me) || isEmpty(that)) {
      return empty
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
 * @since 2.5.0
 */
export function partitionMap<B, C>(
  EB: Eq<B>,
  EC: Eq<C>
): <A>(f: (a: A) => Either<B, C>) => (set: ReadonlySet<A>) => Separated<ReadonlySet<B>, ReadonlySet<C>> {
  return <A>(f: (a: A) => Either<B, C>) => (set: ReadonlySet<A>) => {
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
 * import { difference } from 'fp-ts/ReadonlySet'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
 *
 * @category combinators
 * @since 2.5.0
 */
export function difference<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => ReadonlySet<A>
  (me: ReadonlySet<A>, that: ReadonlySet<A>): ReadonlySet<A>
}
export function difference<A>(
  E: Eq<A>
): (me: ReadonlySet<A>, that?: ReadonlySet<A>) => ReadonlySet<A> | ((me: ReadonlySet<A>) => ReadonlySet<A>) {
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
 * @since 2.5.0
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<ReadonlySet<A>> {
  return {
    concat: union(E),
    empty
  }
}

/**
 * @category instances
 * @since 2.5.0
 */
export function getIntersectionSemigroup<A>(E: Eq<A>): Semigroup<ReadonlySet<A>> {
  return {
    concat: intersection(E)
  }
}

/**
 * @since 2.5.0
 */
export function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlySet<A>) => B {
  const toReadonlyArrayO = toReadonlyArray(O)
  return (b, f) => (fa) => toReadonlyArrayO(fa).reduce(f, b)
}

/**
 * @since 2.5.0
 */
export function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: ReadonlySet<A>) => M {
  const toReadonlyArrayO = toReadonlyArray(O)
  return (f) => (fa) => toReadonlyArrayO(fa).reduce((b, a) => M.concat(b, f(a)), M.empty)
}

/**
 * Create a set with one element
 *
 * @category constructors
 * @since 2.5.0
 */
export const singleton = <A>(a: A): ReadonlySet<A> => new Set([a])

/**
 * Insert a value into a set
 *
 * @category combinators
 * @since 2.5.0
 */
export function insert<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A> {
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
 * @since 2.5.0
 */
export const remove = <A>(E: Eq<A>) => (a: A) => (set: ReadonlySet<A>): ReadonlySet<A> =>
  filter((ax: A) => !E.equals(a, ax))(set)

/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @category combinators
 * @since 2.10.0
 */
export const toggle = <A>(E: Eq<A>): ((a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>) => {
  const elemE = elem(E)
  const removeE = remove(E)
  const insertE = insert(E)
  return (a) => (set) => (elemE(a, set) ? removeE : insertE)(a)(set)
}

/**
 * Create a set from an array
 *
 * @category constructors
 * @since 2.10.0
 */
export const fromReadonlyArray = <A>(E: Eq<A>) => (as: ReadonlyArray<A>): ReadonlySet<A> => {
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
 * @since 2.5.0
 */
export const compact = <A>(E: Eq<A>): ((fa: ReadonlySet<Option<A>>) => ReadonlySet<A>) => filterMap(E)(identity)

/**
 * @since 2.5.0
 */
export function separate<E, A>(
  EE: Eq<E>,
  EA: Eq<A>
): (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>> {
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
 * @since 2.5.0
 */
export function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B> {
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
 * @since 2.5.0
 */
export const empty: ReadonlySet<never> = new Set()

/**
 * Test whether a `ReadonlySet` is empty.
 *
 * @since 2.10.0
 */
export const isEmpty = <A>(set: ReadonlySet<A>): boolean => set.size === 0

/**
 * Calculate the number of elements in a `ReadonlySet`.
 *
 * @since 2.10.0
 */
export const size = <A>(set: ReadonlySet<A>): number => set.size

/**
 * @since 2.5.0
 */
export const some = <A>(predicate: Predicate<A>) => (set: ReadonlySet<A>): boolean => {
  const values = set.values()
  let e: Next<A>
  let found = false
  // tslint:disable-next-line: strict-boolean-expressions
  while (!found && !(e = values.next()).done) {
    found = predicate(e.value)
  }
  return found
}

/**
 * @since 2.5.0
 */
export const every = <A>(predicate: Predicate<A>): ((set: ReadonlySet<A>) => boolean) => not(some(not(predicate)))

// TODO: remove non-curried overloading in v3
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.5.0
 */
export function isSubset<A>(
  E: Eq<A>
): {
  (that: ReadonlySet<A>): (me: ReadonlySet<A>) => boolean
  (me: ReadonlySet<A>, that: ReadonlySet<A>): boolean
}
export function isSubset<A>(
  E: Eq<A>
): (me: ReadonlySet<A>, that?: ReadonlySet<A>) => boolean | ((me: ReadonlySet<A>) => boolean) {
  const elemE = elem(E)
  return (me, that?) => {
    if (that === undefined) {
      const isSubsetE = isSubset(E)
      return (that) => isSubsetE(that, me)
    }
    return every((a: A) => elemE(a, that))(me)
  }
}

// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of a set
 *
 * @since 2.5.0
 */
export function elem<A>(
  E: Eq<A>
): {
  (a: A): (set: ReadonlySet<A>) => boolean
  (a: A, set: ReadonlySet<A>): boolean
}
export function elem<A>(E: Eq<A>): (a: A, set?: ReadonlySet<A>) => boolean | ((set: ReadonlySet<A>) => boolean) {
  return (a, set?) => {
    if (set === undefined) {
      const elemE = elem(E)
      return (set) => elemE(a, set)
    }
    const values = set.values()
    let e: Next<A>
    let found = false
    // tslint:disable-next-line: strict-boolean-expressions
    while (!found && !(e = values.next()).done) {
      found = E.equals(a, e.value)
    }
    return found
  }
}

/**
 * Get a sorted `ReadonlyArray` of the values contained in a `ReadonlySet`.
 *
 * @since 2.5.0
 */
export const toReadonlyArray = <A>(O: Ord<A>) => (set: ReadonlySet<A>): ReadonlyArray<A> => {
  const out: Array<A> = []
  set.forEach((e) => out.push(e))
  return out.sort(O.compare)
}

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`fromReadonlyArray`](#fromreadonlyarray) instead.
 *
 * @category constructors
 * @since 2.5.0
 * @deprecated
 */
export const fromArray: <A>(E: Eq<A>) => (as: ReadonlyArray<A>) => ReadonlySet<A> = fromReadonlyArray
