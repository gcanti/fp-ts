/**
 * @since 2.5.0
 */
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
 * @since 2.5.0
 */
export function fromSet<A>(s: Set<A>): ReadonlySet<A> {
  return new Set(s)
}

/**
 * @since 2.5.0
 */
export function toSet<A>(s: ReadonlySet<A>): Set<A> {
  return new Set(s)
}

/**
 * @since 2.5.0
 */
export function getShow<A>(S: Show<A>): Show<ReadonlySet<A>> {
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
 * @since 2.5.0
 */
export const empty: ReadonlySet<never> = new Set()

/**
 * @since 2.5.0
 */
export function toReadonlyArray<A>(O: Ord<A>): (set: ReadonlySet<A>) => ReadonlyArray<A> {
  return x => {
    // tslint:disable-next-line: readonly-array
    const r: Array<A> = []
    x.forEach(e => r.push(e))
    return r.sort(O.compare)
  }
}

/**
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
 * @since 2.5.0
 */
export function some<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean {
  return set => {
    const values = set.values()
    let e: Next<A>
    let found = false
    // tslint:disable-next-line: strict-boolean-expressions
    while (!found && !(e = values.next()).done) {
      found = predicate(e.value)
    }
    return found
  }
}

/**
 * Projects a Set through a function
 *
 * @since 2.5.0
 */
export function map<B>(E: Eq<B>): <A>(f: (x: A) => B) => (set: ReadonlySet<A>) => ReadonlySet<B> {
  const elemE = elem(E)
  return f => set => {
    const r = new Set<B>()
    set.forEach(e => {
      const v = f(e)
      if (!elemE(v, r)) {
        r.add(v)
      }
    })
    return r
  }
}

/**
 * @since 2.5.0
 */
export function every<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => boolean {
  return not(some(not(predicate)))
}

/**
 * @since 2.5.0
 */
export function chain<B>(E: Eq<B>): <A>(f: (x: A) => ReadonlySet<B>) => (set: ReadonlySet<A>) => ReadonlySet<B> {
  const elemE = elem(E)
  return f => set => {
    const r = new Set<B>()
    set.forEach(e => {
      f(e).forEach(e => {
        if (!elemE(e, r)) {
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
 * @since 2.5.0
 */
export function isSubset<A>(E: Eq<A>): (x: ReadonlySet<A>, y: ReadonlySet<A>) => boolean {
  const elemE = elem(E)
  return (x, y) => every((a: A) => elemE(a, y))(x)
}

/**
 * @since 2.5.0
 */
export function filter<A, B extends A>(refinement: Refinement<A, B>): (set: ReadonlySet<A>) => ReadonlySet<B>
export function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A>
export function filter<A>(predicate: Predicate<A>): (set: ReadonlySet<A>) => ReadonlySet<A> {
  return set => {
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
  return set => {
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
    return { left, right }
  }
}

/**
 * Test if a value is a member of a set
 *
 * @since 2.5.0
 */
export function elem<A>(E: Eq<A>): (a: A, set: ReadonlySet<A>) => boolean {
  return (a, set) => {
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
 * Form the union of two sets
 *
 * @since 2.5.0
 */
export function union<A>(E: Eq<A>): (set: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A> {
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
      if (!elemE(e, r)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * The set of elements which are in both the first and second set
 *
 * @since 2.5.0
 */
export function intersection<A>(E: Eq<A>): (set: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A> {
  const elemE = elem(E)
  return (x, y) => {
    if (x === empty || y === empty) {
      return empty
    }
    const r = new Set<A>()
    x.forEach(e => {
      if (elemE(e, y)) {
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
    return { left, right }
  }
}

/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference } from 'fp-ts/lib/ReadonlySet'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * assert.deepStrictEqual(difference(eqNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 2.5.0
 */
export function difference<A>(E: Eq<A>): (x: ReadonlySet<A>, y: ReadonlySet<A>) => ReadonlySet<A> {
  const elemE = elem(E)
  return (x, y) => filter((a: A) => !elemE(a, y))(x)
}

/**
 * @since 2.5.0
 */
export function getUnionMonoid<A>(E: Eq<A>): Monoid<ReadonlySet<A>> {
  return {
    concat: union(E),
    empty
  }
}

/**
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
  const toArrayO = toReadonlyArray(O)
  return (b, f) => fa => toArrayO(fa).reduce(f, b)
}

/**
 * @since 2.5.0
 */
export function foldMap<A, M>(O: Ord<A>, M: Monoid<M>): (f: (a: A) => M) => (fa: ReadonlySet<A>) => M {
  const toArrayO = toReadonlyArray(O)
  return f => fa => toArrayO(fa).reduce((b, a) => M.concat(b, f(a)), M.empty)
}

/**
 * Create a set with one element
 *
 * @since 2.5.0
 */
export function singleton<A>(a: A): ReadonlySet<A> {
  return new Set([a])
}

/**
 * Insert a value into a set
 *
 * @since 2.5.0
 */
export function insert<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A> {
  const elemE = elem(E)
  return a => set => {
    if (!elemE(a, set)) {
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
 * @since 2.5.0
 */
export function remove<A>(E: Eq<A>): (a: A) => (set: ReadonlySet<A>) => ReadonlySet<A> {
  return a => set => filter((ax: A) => !E.equals(a, ax))(set)
}

/**
 * Create a set from an array
 *
 * @since 2.5.0
 */
export function fromArray<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlySet<A> {
  return as => {
    const len = as.length
    const r = new Set<A>()
    const has = elem(E)
    for (let i = 0; i < len; i++) {
      const a = as[i]
      if (!has(a, r)) {
        r.add(a)
      }
    }
    return r
  }
}

/**
 * @since 2.5.0
 */
export function compact<A>(E: Eq<A>): (fa: ReadonlySet<Option<A>>) => ReadonlySet<A> {
  return filterMap(E)(identity)
}

/**
 * @since 2.5.0
 */
export function separate<E, A>(
  EE: Eq<E>,
  EA: Eq<A>
): (fa: ReadonlySet<Either<E, A>>) => Separated<ReadonlySet<E>, ReadonlySet<A>> {
  return fa => {
    const elemEE = elem(EE)
    const elemEA = elem(EA)
    const left: Set<E> = new Set()
    const right: Set<A> = new Set()
    fa.forEach(e => {
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
    return { left, right }
  }
}

/**
 * @since 2.5.0
 */
export function filterMap<B>(E: Eq<B>): <A>(f: (a: A) => Option<B>) => (fa: ReadonlySet<A>) => ReadonlySet<B> {
  const elemE = elem(E)
  return f => fa => {
    const r: Set<B> = new Set()
    fa.forEach(a => {
      const ob = f(a)
      if (ob._tag === 'Some' && !elemE(ob.value, r)) {
        r.add(ob.value)
      }
    })
    return r
  }
}
