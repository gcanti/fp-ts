/**
 * @since 3.0.0
 */
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import * as foldable from '@fp-ts/core/Foldable'
import { identity } from '@fp-ts/core/Function'
import type { TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type { Magma } from '@fp-ts/core/Magma'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { Option } from '@fp-ts/core/Option'
import type { Ord } from '@fp-ts/core/Ord'
import type { Predicate } from '@fp-ts/core/Predicate'
import * as predicate from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Show } from '@fp-ts/core/Show'

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlySetTypeLambda extends TypeLambda {
  readonly type: ReadonlySet<this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const of = <A>(a: A): ReadonlySet<A> => new Set([a])

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromIterable = <A>(Eq: Eq<A>) => {
  const uniq = iterable.uniq(Eq)
  return (self: Iterable<A>): ReadonlySet<A> => {
    const candidate = uniq(self)
    return _.isNonEmpty(candidate) ? new Set(candidate) : empty
  }
}

/**
 * Checks an element is a member of a set;
 * If yes, removes the value from the set
 * If no, inserts the value to the set
 *
 * @since 3.0.0
 */
export const toggle = <A>(E: Eq<A>): ((a: A) => (set: ReadonlySet<A>) => ReadonlySet<A>) => {
  const elemE = elem(E)
  const removeE = remove(E)
  const insertE = insert(E)
  return (a) => {
    const elemEa = elemE(a)
    return (set) => (elemEa(set) ? removeE : insertE)(a)(set)
  }
}

/**
 * Return the union of two `ReadonlySet`s.
 *
 * @since 3.0.0
 */
export const union = <A>(E: Eq<A>): Semigroup<ReadonlySet<A>>['combine'] => {
  const elemE = elem(E)
  return (that) =>
    (self) => {
      if (isEmpty(self)) {
        return that
      }
      if (isEmpty(that)) {
        return self
      }
      const r = new Set(self)
      that.forEach((e) => {
        if (!elemE(e)(r)) {
          r.add(e)
        }
      })
      return r
    }
}

/**
 * The `ReadonlySet` of elements which are in both the first and second `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const intersection = <A>(E: Eq<A>): Semigroup<ReadonlySet<A>>['combine'] => {
  const elemE = elem(E)
  return (that) =>
    (self) => {
      if (isEmpty(self) || isEmpty(that)) {
        return empty
      }
      const r = new Set<A>()
      self.forEach((e) => {
        if (elemE(e)(that)) {
          r.add(e)
        }
      })
      return r
    }
}

/**
 * Return the set difference (`x` - `y`).
 *
 * @example
 * import { difference } from '@fp-ts/core/ReadonlySet'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(new Set([1, 2]), difference(N.Eq)(new Set([1, 3]))), new Set([2]))
 *
 * @since 3.0.0
 */
export const difference = <A>(E: Eq<A>): Magma<ReadonlySet<A>>['combine'] => {
  const elemE = elem(E)
  return (that) => filter((a: A) => !elemE(a)(that))
}

/**
 * Insert a value into a `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const insert = <A>(E: Eq<A>): ((a: A) => (s: ReadonlySet<A>) => ReadonlySet<A>) => {
  const elemE = elem(E)
  return (a) =>
    (set) => {
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
 * Delete a value from a `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const remove = <A>(E: Eq<A>) =>
  (a: A): ((s: ReadonlySet<A>) => ReadonlySet<A>) => filter(predicate.not(E.equals(a)))

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map = <B>(E: Eq<B>): (<A>(f: (x: A) => B) => (s: ReadonlySet<A>) => ReadonlySet<B>) => {
  const elemE = elem(E)
  return (f) =>
    (set) => {
      const r = new Set<B>()
      set.forEach((e) => {
        const v = f(e)
        if (!elemE(v)(r)) {
          r.add(v)
        }
      })
      return r
    }
}

/**
 * @category Flattenable
 * @since 3.0.0
 */
export const flatMap = <B>(E: Eq<B>): (<A>(f: (x: A) => ReadonlySet<B>) => (s: ReadonlySet<A>) => ReadonlySet<B>) => {
  const elemE = elem(E)
  return (f) =>
    (set) => {
      const r = new Set<B>()
      set.forEach((e) => {
        f(e).forEach((e) => {
          if (!elemE(e)(r)) {
            r.add(e)
          }
        })
      })
      return r
    }
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact = <A>(E: Eq<A>): ((fa: ReadonlySet<Option<A>>) => ReadonlySet<A>) => filterMap(E)(identity)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate = <E, A>(EE: Eq<E>, EA: Eq<A>) =>
  (fa: ReadonlySet<Result<E, A>>): readonly [ReadonlySet<E>, ReadonlySet<A>] => {
    const elemEE = elem(EE)
    const elemEA = elem(EA)
    const left: Set<E> = new Set()
    const right: Set<A> = new Set()
    fa.forEach((e) => {
      switch (e._tag) {
        case 'Failure':
          if (!elemEE(e.failure)(left)) {
            left.add(e.failure)
          }
          break
        case 'Success':
          if (!elemEA(e.success)(right)) {
            right.add(e.success)
          }
          break
      }
    })
    return [left, right]
  }

/**
 * @since 3.0.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (s: ReadonlySet<A>) => ReadonlySet<B>
export function filter<A>(predicate: Predicate<A>): <B extends A>(s: ReadonlySet<B>) => ReadonlySet<B>
export function filter<A>(predicate: Predicate<A>): (s: ReadonlySet<A>) => ReadonlySet<A>
export function filter<A>(predicate: Predicate<A>): (s: ReadonlySet<A>) => ReadonlySet<A> {
  return (s: ReadonlySet<A>) => {
    const values = s.values()
    let e: Next<A>
    const r = new Set<A>()
    while (!(e = values.next()).done) {
      const a = e.value
      if (predicate(a)) {
        r.add(a)
      }
    }
    return r
  }
}

/**
 * @since 3.0.0
 */
export const filterMap = <B>(E: Eq<B>): (<A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B>) => {
  const elemE = elem(E)
  return (f) =>
    (fa) => {
      const r: Set<B> = new Set()
      fa.forEach((a) => {
        const ob = f(a)
        if (_.isSome(ob) && !elemE(ob.value)(r)) {
          r.add(ob.value)
        }
      })
      return r
    }
}

/**
 * @since 3.0.0
 */
export function partition<A, B extends A>(
  refinement: Refinement<A, B>
): (s: ReadonlySet<A>) => readonly [ReadonlySet<A>, ReadonlySet<B>]
export function partition<A>(
  predicate: Predicate<A>
): <B extends A>(s: ReadonlySet<B>) => readonly [ReadonlySet<B>, ReadonlySet<B>]
export function partition<A>(predicate: Predicate<A>): (s: ReadonlySet<A>) => readonly [ReadonlySet<A>, ReadonlySet<A>]
export function partition<A>(
  predicate: Predicate<A>
): (s: ReadonlySet<A>) => readonly [ReadonlySet<A>, ReadonlySet<A>] {
  return (s: ReadonlySet<A>) => {
    const values = s.values()
    let e: Next<A>
    const right = new Set<A>()
    const left = new Set<A>()
    while (!(e = values.next()).done) {
      const a = e.value
      if (predicate(a)) {
        right.add(a)
      } else {
        left.add(a)
      }
    }
    return [left, right]
  }
}

/**
 * @since 3.0.0
 */
export const partitionMap = <B, C>(EB: Eq<B>, EC: Eq<C>) =>
  <A>(f: (a: A) => Result<B, C>) =>
    (s: ReadonlySet<A>): readonly [ReadonlySet<B>, ReadonlySet<C>] => {
      const values = s.values()
      let e: Next<A>
      const left = new Set<B>()
      const right = new Set<C>()
      const hasB = elem(EB)
      const hasC = elem(EC)
      while (!(e = values.next()).done) {
        const v = f(e.value)
        switch (v._tag) {
          case 'Failure':
            if (!hasB(v.failure)(left)) {
              left.add(v.failure)
            }
            break
          case 'Success':
            if (!hasC(v.success)(right)) {
              right.add(v.success)
            }
            break
        }
      }
      return [left, right]
    }

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<ReadonlySet<A>> => ({
  show: (s) => {
    const entries: Array<string> = []
    s.forEach((a) => {
      entries.push(S.show(a))
    })
    return `new Set([${entries.sort().join(', ')}])`
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<ReadonlySet<A>> => {
  const subsetE = isSubset(E)
  return eq.fromEquals((that) => (self) => subsetE(self)(that) && subsetE(that)(self))
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlySet<A>> => ({
  combine: union(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(E: Eq<A>): Monoid<ReadonlySet<A>> => ({
  combine: getUnionSemigroup(E).combine,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlySet<A>> => ({
  combine: intersection(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(E: Eq<A>): Magma<ReadonlySet<A>> => ({
  combine: difference(E)
})

/**
 * An empty `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlySet<never> = _.emptyReadonlySet

/**
 * Test whether a `ReadonlySet` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = <A>(set: ReadonlySet<A>): boolean => set.size === 0

/**
 * Calculate the number of elements in a `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const size = <A>(set: ReadonlySet<A>): number => set.size

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

/**
 * @since 3.0.0
 */
export const some = <A>(predicate: Predicate<A>) =>
  (s: ReadonlySet<A>): boolean => {
    const values = s.values()
    let e: Next<A>
    let found = false
    while (!found && !(e = values.next()).done) {
      found = predicate(e.value)
    }
    return found
  }

/**
 * @since 3.0.0
 */
export function every<A, B extends A>(r: Refinement<A, B>): Refinement<ReadonlySet<A>, ReadonlySet<B>>
export function every<A>(p: Predicate<A>): Predicate<ReadonlySet<A>>
export function every<A>(p: Predicate<A>): Predicate<ReadonlySet<A>> {
  return predicate.not(some(predicate.not(p)))
}

/**
 * Return `true` if and only if every element in the first `ReadonlySet` is an element of the second `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const isSubset = <A>(E: Eq<A>): ((that: ReadonlySet<A>) => (self: ReadonlySet<A>) => boolean) => {
  const elemE = elem(E)
  return (that) => every((a) => elemE(a)(that))
}

/**
 * Tests whether a value is a member of a `ReadonlySet`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) =>
  (a: A): ((s: ReadonlySet<A>) => boolean) => {
    const predicate = E.equals(a)
    return (set) => {
      const values = set.values()
      let e: Next<A>
      let found = false
      while (!found && !(e = values.next()).done) {
        found = predicate(e.value)
      }
      return found
    }
  }

/**
 * @category conversions
 * @since 3.0.0
 */
export const toIterable = <A>(O: Ord<A>) =>
  (self: ReadonlySet<A>): Iterable<A> => {
    const out = Array.from(self.values())
    return out.sort((self, that) => O.compare(that)(self))
  }

/**
 * @category conversions
 * @since 3.0.0
 */
export const toIterableUnsafe = <A>(self: ReadonlySet<A>): Iterable<A> => self.values()

/**
 * @category conversions
 * @since 3.0.0
 */
export const FoldableUnsafe: foldable.Foldable<ReadonlySetTypeLambda> = {
  toIterable: toIterableUnsafe
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceUnsafe: <B, A>(b: B, f: (b: B, a: A) => B) => (self: ReadonlySet<A>) => B = foldable
  .reduce(FoldableUnsafe)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapUnsafe: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: ReadonlySet<A>) => M = foldable
  .foldMap(FoldableUnsafe)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightUnsafe: <B, A>(b: B, f: (a: A, b: B) => B) => (self: ReadonlySet<A>) => B = foldable
  .reduceRight(FoldableUnsafe)
