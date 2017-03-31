export interface StaticSemigroup<A> {
  concat(x: A, y: A): A
}

export function fold<A>(semigroup: StaticSemigroup<A>, a: A, as: Array<A>): A {
  return as.reduce((acc, a) => semigroup.concat(acc, a), a)
}

export function getFirstStaticSemigroup<A>(): StaticSemigroup<A> {
  return { concat: (x, y) => x }
}

export function getLastStaticSemigroup<A>(): StaticSemigroup<A> {
  return { concat: (x, y) => y }
}

export function getProductStaticSemigroup<A, B>(asemigroup: StaticSemigroup<A>, bsemigroup: StaticSemigroup<B>): StaticSemigroup<[A, B]> {
  return { concat: ([xa, xb], [ya, yb]) => [asemigroup.concat(xa, ya), bsemigroup.concat(xb, yb)] }
}

export function getDualStaticSemigroup<A>(semigroup: StaticSemigroup<A>): StaticSemigroup<A> {
  return { concat: (x, y) => semigroup.concat(y, x) }
}
