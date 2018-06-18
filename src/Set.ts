import { Either } from './Either'
import { Monoid } from './Monoid'
import { Ord } from './Ord'
import { Semigroup } from './Semigroup'
import { Setoid } from './Setoid'
import { Predicate, not, identity } from './function'
import { Option } from './Option'
import { eitherBool, Filterable1, optionBool } from './Filterable'
import { Compactable1, separated, Separated } from './Compactable'

declare global {
  interface Set<T> {
    _URI: URI
    _A: T
  }
}

declare module './HKT' {
  interface URI2HKT<A> {
    Set: Set<A>
  }
}

export const URI = 'Set'

export type URI = typeof URI

/**
 * @function
 * @since 1.0.0
 */
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => {
  const r: Array<A> = []
  x.forEach(e => r.push(e))
  return r.sort(O.compare)
}

/**
 * @function
 * @since 1.0.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => {
  const subsetS = subset(S)
  return {
    equals: (x, y) => subsetS(x, y) && subsetS(y, x)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const some = <A>(x: Set<A>, predicate: Predicate<A>): boolean => {
  const values = x.values()
  let e: IteratorResult<A>
  let found = false
  // tslint:disable:no-conditional-assignment
  while (!found && !(e = values.next()).done) {
    found = predicate(e.value)
  }
  return found
}

/**
 * Projects a Set through a function
 * @function
 * @since 1.2.0
 */
export const map = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B> => {
  const r = new Set<B>()
  const ismember = member(bset)(r)
  x.forEach(e => {
    const v = f(e)
    if (!ismember(v)) {
      r.add(v)
    }
  })
  return r
}

/**
 * @function
 * @since 1.0.0
 */
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => {
  return !some(x, not(predicate))
}

/**
 * @function
 * @since 1.2.0
 */
export const chain = <B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B> => {
  let r = new Set<B>()
  const rhas = member(bset)(r)
  x.forEach(e => {
    f(e).forEach(e => {
      if (!rhas(e)) {
        r.add(e)
      }
    })
  })
  return r
}

/**
 * `true` if and only if every element in the first set is an element of the second set
 * @function
 * @since 1.0.0
 */
export const subset = <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean => {
  return every(x, member(S)(y))
}

/**
 * Test if a value is a member of a set
 * @function
 * @since 1.0.0
 */
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => {
  return some(x, (ax: A) => S.equals(a, ax))
}

/**
 * Form the union of two sets
 * @function
 * @since 1.0.0
 */
export const union = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => {
  const memberS = member(S)
  return (x, y) => {
    const xhas = memberS(x)
    const r = new Set(x)
    y.forEach(e => {
      if (!xhas(e)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * The set of elements which are in both the first and second set
 * @function
 * @since 1.0.0
 */
export const intersection = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => {
  const memberS = member(S)
  return (x, y) => {
    const yhas = memberS(y)
    const r = new Set()
    x.forEach(e => {
      if (yhas(e)) {
        r.add(e)
      }
    })
    return r
  }
}

/**
 * Form the set difference (`y` - `x`)
 * @function
 * @since 1.0.0
 */
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => {
  const has = member(S)
  return (x, y) => filter(y, not(has(x)))
}

/**
 * @function
 * @since 1.0.0
 */
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => {
  return {
    concat: union(S),
    empty: new Set<never>()
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => {
  return {
    concat: intersection(S)
  }
}

/**
 * @function
 * @since 1.0.0
 */
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => {
  const toArrayO = toArray(O)
  return (fa, b, f) => toArrayO(fa).reduce(f, b)
}

/**
 * Create a set with one element
 * @function
 * @since 1.0.0
 */
export const singleton = <A>(a: A): Set<A> => {
  return new Set([a])
}

/**
 * Insert a value into a set
 * @function
 * @since 1.0.0
 */
export const insert = <A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>) => {
  const memberS = member(S)
  return (a, x) => {
    if (!memberS(x)(a)) {
      const r = new Set(x)
      r.add(a)
      return r
    } else {
      return x
    }
  }
}

/**
 * Delete a value from a set
 * @function
 * @since 1.0.0
 */
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => {
  return filter(x, (ax: A) => !S.equals(a, ax))
}

/**
 * Create a set from an array
 * @function
 * @since 1.2.0
 */
export const fromArray = <A>(S: Setoid<A>) => (as: A[]): Set<A> => {
  const len = as.length
  const r = new Set<A>()
  const isMember = member(S)(r)
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (!isMember(a)) {
      r.add(a)
    }
  }
  return r
}

/**
 * {@link Compactable} implementation
 * @since 1.6.3
 */
export const compact = <A>(fa: Set<Option<A>>): Set<A> => filterMap(fa, identity)

/**
 * {@link Compactable} implementation
 * @since 1.6.3
 */
export const separate = <L, A>(fa: Set<Either<L, A>>): Separated<Set<L>, Set<A>> => partitionMap(fa, identity)

/**
 * {@link Filterable} implementation
 * @since 1.6.3
 */
export const filterMap = <A, B>(fa: Set<A>, f: (a: A) => Option<B>): Set<B> => {
  const values = fa.values()
  let e: IteratorResult<A>
  let r = new Set()
  // tslint:disable:no-conditional-assignment
  while (!(e = values.next()).done) {
    const value = e.value
    const optionB = f(value)
    if (optionB.isSome()) {
      r.add(optionB.value)
    }
  }
  return r
}

/**
 * {@link Filterable} implementation
 * @function
 * @since 1.0.0
 */
export const filter = <A>(x: Set<A>, predicate: Predicate<A>): Set<A> => filterMap(x, optionBool(predicate))

/**
 * {@link Filterable} implementation
 * @function
 * @since 1.2.0
 */
export const partition = <A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>> =>
  partitionMap(x, eitherBool(predicate))

/**
 * {@link Filterable} implementation
 * @function
 * @since 1.2.0
 */
export const partitionMap = <A, L, R>(x: Set<A>, f: (a: A) => Either<L, R>): Separated<Set<L>, Set<R>> => {
  const values = x.values()
  let e: IteratorResult<A>
  let l = new Set()
  let r = new Set()
  // tslint:disable:no-conditional-assignment
  while (!(e = values.next()).done) {
    const v = f(e.value)
    if (v.isLeft()) {
      l.add(v.value)
    } else {
      r.add(v.value)
    }
  }
  return separated(l, r)
}

/**
 * {@link Functor} impelemtation
 */
const fmap = <A, B>(fa: Set<A>, f: (a: A) => B): Set<B> => {
  const result = new Set()
  fa.forEach(a => {
    result.add(f(a))
  })
  return result
}

/**
 * @instance
 * @since 1.6.3
 */
export const set: Compactable1<URI> & Filterable1<URI> = {
  URI,
  map: fmap,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap
}
