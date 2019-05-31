import { Either } from './Either'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Eq, fromEquals } from './Eq'
import { Predicate, not, Refinement, identity } from './function'
import { Separated } from './Compactable'
import { Option } from './Option'
import { Show } from './Show'

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Set<A>> {
  return {
    show: s => {
      let elements = ''
      s.forEach(a => {
        elements += S.show(a) + ', '
      })
      if (elements !== '') {
        elements = elements.substring(0, elements.length - 2)
      }
      return `new Set([${elements}])`
    }
  }
}

/**
 * @since 2.0.0
 */
export const empty: Set<never> = new Set()

/**
 * @since 2.0.0
 */
export function toArray<A>(O: Ord<A>): (set: Set<A>) => Array<A> {
  return x => {
    const r: Array<A> = []
    x.forEach(e => r.push(e))
    return r.sort(O.compare)
  }
}

/**
 * @since 2.0.0
 */
export function getEq<A>(E: Eq<A>): Eq<Set<A>> {
  const subsetE = subset(E)
  return fromEquals((x, y) => subsetE(x, y) && subsetE(y, x))
}

/**
 * @since 2.0.0
 */
export function some<A>(predicate: Predicate<A>): (set: Set<A>) => boolean {
  return set => {
    const values = set.values()
    let e: IteratorResult<A>
    let found = false
    while (!found && !(e = values.next()).done) {
      found = predicate(e.value)
    }
    return found
  }
}

/**
 * Projects a Set through a function
 *
 * @since 2.0.0
 */
export function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: Set<A>) => Set<B> {
  const elemE = elem(E)
  return f => set => {
    const r = new Set<B>()
    set.forEach(e => {
      const v = f(e)
      if (!elemE(v)(r)) {
        r.add(v)
      }
    })
    return r
  }
}

/**
 * @since 2.0.0
 */
export function every<A>(predicate: Predicate<A>): (set: Set<A>) => boolean {
  return not(some(not(predicate)))
}

/**
 * @since 2.0.0
 */
export function chain<B>(E: Eq<B>): <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B> {
  const elemE = elem(E)
  return f => set => {
    let r = new Set<B>()
    set.forEach(e => {
      f(e).forEach(e => {
        if (!elemE(e)(r)) {
          r.add(e)
        }
      })
    })
    return r
  }
}

/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 2.0.0
 */
export function subset<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => boolean {
  const elemE = elem(E)
  return (x, y) => every((a: A) => elemE(a)(y))(x)
}

/**
 * @since 2.0.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>
export function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A> {
  return set => {
    const values = set.values()
    let e: IteratorResult<A>
    let r = new Set<A>()
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
  return set => {
    const values = set.values()
    let e: IteratorResult<A>
    let right = new Set<A>()
    let left = new Set<A>()
    while (!(e = values.next()).done) {
      const value = e.value
      if (predicate(value)) {
        right.add(value)
      } else {
        left.add(value)
      }
    }
    return { left, right }
  }
}

/**
 * Test if a value is a member of a set
 *
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A) => (set: Set<A>) => boolean {
  return a => some((ax: A) => E.equals(a, ax))
}

/**
 * Form the union of two sets
 *
 * @since 2.0.0
 */
export function union<A>(E: Eq<A>): (set: Set<A>, y: Set<A>) => Set<A> {
  const elemE = elem(E)
  return (x, y) => {
    if (x === empty) {
      return y
    }
    if (y === empty) {
      return x
    }
    const r = new Set(x)
    y.forEach(e => {
      if (!elemE(e)(r)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.0.0
 */
export function intersection<A>(E: Eq<A>): (set: Set<A>, y: Set<A>) => Set<A> {
  const elemE = elem(E)
  return (x, y) => {
    if (x === empty || y === empty) {
      return empty
    }
    const r = new Set<A>()
    x.forEach(e => {
      if (elemE(e)(y)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * @since 2.0.0
 */
export function partitionMap<L, R>(
  SL: Eq<L>,
  SR: Eq<R>
): <A>(f: (a: A) => Either<L, R>) => (set: Set<A>) => Separated<Set<L>, Set<R>> {
  return <A>(f: (a: A) => Either<L, R>) => (set: Set<A>) => {
    const values = set.values()
    let e: IteratorResult<A>
    let left = new Set<L>()
    let right = new Set<R>()
    const hasL = elem(SL)
    const hasR = elem(SR)
    while (!(e = values.next()).done) {
      const v = f(e.value)
      switch (v._tag) {
        case 'Left':
          if (!hasL(v.left)(left)) {
            left.add(v.left)
          }
          break
        case 'Right':
          if (!hasR(v.right)(right)) {
            right.add(v.right)
          }
          break
      }
    }
    return { left, right }
  }
}

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
export function difference<A>(E: Eq<A>): (x: Set<A>, y: Set<A>) => Set<A> {
  const elemE = elem(E)
  return (x, y) => filter((a: A) => !elemE(a)(y))(x)
}

/**
 * @since 2.0.0
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<Set<A>> {
  return {
    concat: union(E),
    empty
  }
}

/**
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
export function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B {
  const toArrayO = toArray(O)
  return (b, f) => fa => toArrayO(fa).reduce(f, b)
}

/**
 * @since 2.0.0
 */
export function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: Set<A>) => M {
  const toArrayO = toArray(O)
  return f => fa => toArrayO(fa).reduce((b, a) => M.concat(b, f(a)), M.empty)
}

/**
 * Create a set with one element
 *
 * @since 2.0.0
 */
export function singleton<A>(a: A): Set<A> {
  return new Set([a])
}

/**
 * Insert a value into a set
 *
 * @since 2.0.0
 */
export function insert<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A> {
  const elemE = elem(E)
  return a => set => {
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
 * @since 2.0.0
 */
export function remove<A>(E: Eq<A>): (a: A) => (set: Set<A>) => Set<A> {
  return a => set => filter((ax: A) => !E.equals(a, ax))(set)
}

/**
 * Create a set from an array
 *
 * @since 2.0.0
 */
export function fromArray<A>(E: Eq<A>): (as: Array<A>) => Set<A> {
  return as => {
    const len = as.length
    const r = new Set<A>()
    const has = elem(E)
    for (let i = 0; i < len; i++) {
      const a = as[i]
      if (!has(a)(r)) {
        r.add(a)
      }
    }
    return r
  }
}

/**
 * @since 2.0.0
 */
export function compact<A>(E: Eq<A>): (fa: Set<Option<A>>) => Set<A> {
  return filterMap(E)(identity)
}

/**
 * @since 2.0.0
 */
export function separate<L, R>(EL: Eq<L>, ER: Eq<R>): (fa: Set<Either<L, R>>) => Separated<Set<L>, Set<R>> {
  return fa => {
    const elemEL = elem(EL)
    const elemER = elem(ER)
    const left: Set<L> = new Set()
    const right: Set<R> = new Set()
    fa.forEach(e => {
      switch (e._tag) {
        case 'Left':
          if (!elemEL(e.left)(left)) {
            left.add(e.left)
          }
          break
        case 'Right':
          if (!elemER(e.right)(right)) {
            right.add(e.right)
          }
          break
      }
    })
    return { left, right }
  }
}

/**
 * @since 2.0.0
 */
export function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B> {
  const elemE = elem(E)
  return f => fa => {
    const r: Set<B> = new Set()
    fa.forEach(a => {
      const ob = f(a)
      if (ob._tag === 'Some' && !elemE(ob.value)(r)) {
        r.add(ob.value)
      }
    })
    return r
  }
}
