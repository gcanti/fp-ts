export interface Semigroup<A> {
  concat: (x: A) => (y: A) => A
}

export const fold = <A>(semigroup: Semigroup<A>) => (a: A) => (as: Array<A>): A => {
  return as.reduce((acc, a) => semigroup.concat(acc)(a), a)
}

export function getFirstSemigroup<A>(): Semigroup<A> {
  return { concat: x => y => x }
}

export function getLastSemigroup<A>(): Semigroup<A> {
  return { concat: x => y => y }
}

export function getProductSemigroup<A, B>(asemigroup: Semigroup<A>, bsemigroup: Semigroup<B>): Semigroup<[A, B]> {
  return {
    concat: ([xa, xb]) => ([ya, yb]) => [asemigroup.concat(xa)(ya), bsemigroup.concat(xb)(yb)]
  }
}

export function getDualSemigroup<A>(semigroup: Semigroup<A>): Semigroup<A> {
  return { concat: x => y => semigroup.concat(y)(x) }
}
