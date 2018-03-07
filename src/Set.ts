import { Setoid } from './Setoid'
import { Predicate, not } from './function'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Ord } from './Ord'
import { Either } from './Either'

/** @function */
export const toArray = <A>(O: Ord<A>) => (x: Set<A>): Array<A> => {
  const r: Array<A> = []
  x.forEach(e => r.push(e))
  return r.sort(O.compare)
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Set<A>> => {
  const subsetS = subset(S)
  return {
    equals: (x, y) => subsetS(x, y) && subsetS(y, x)
  }
}

/** @function */
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

/** @function */
export const every = <A>(x: Set<A>, predicate: Predicate<A>): boolean => {
  return !some(x, not(predicate))
}

/**
 * `true` if and only if every element in the first set
 * is an element of the second set
 * @function
 */
export const subset = <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean => {
  return every(x, member(S)(y))
}

/** @function */
export const filter = <A>(x: Set<A>, predicate: Predicate<A>): Set<A> => {
  const values = x.values()
  let e: IteratorResult<A>
  let r = new Set()
  // tslint:disable:no-conditional-assignment
  while (!(e = values.next()).done) {
    const value = e.value
    if (predicate(value)) {
      r.add(value)
    }
  }
  return r
}

/**
 * Test if a value is a member of a set
 * @function
 */
export const member = <A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean => {
  return some(x, (ax: A) => S.equals(a, ax))
}

/**
 * Form the union of two sets
 * @function
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

/** @function */
export const partitionMap = <A, L, R>(x: Set<A>, f: (a: A) => Either<L, R>): { left: Set<L>; right: Set<R> } => {
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
  return { left: l, right: r }
}

/**
 * Form the set difference (`y` - `x`)
 * @function
 */
export const difference = <A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>) => {
  return (x, y) => filter(y, not(member(S)(x)))
}

/** @function */
export const getUnionMonoid = <A>(S: Setoid<A>): Monoid<Set<A>> => {
  return {
    concat: union(S),
    empty: new Set<never>()
  }
}

/** @function */
export const getIntersectionSemigroup = <A>(S: Setoid<A>): Semigroup<Set<A>> => {
  return {
    concat: intersection(S)
  }
}

/** @function */
export const reduce = <A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B) => {
  const toArrayO = toArray(O)
  return (fa, b, f) => toArrayO(fa).reduce(f, b)
}

/**
 * Create a set with one element
 * @function
 */
export const singleton = <A>(a: A): Set<A> => {
  return new Set([a])
}

/**
 * Insert a value into a set
 * @function
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
 */
export const remove = <A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A> => {
  return filter(x, (ax: A) => !S.equals(a, ax))
}
