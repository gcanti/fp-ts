export interface Semigroup<M> {
  concat(x: M, y: M): M
}

export function getProductSemigroup<A, B>(asemigroup: Semigroup<A>, bsemigroup: Semigroup<B>): Semigroup<[A, B]> {
  return { concat: ([xa, xb], [ya, yb]) => [asemigroup.concat(xa, ya), bsemigroup.concat(xb, yb)] }
}

export function getDualSemigroup<A>(semigroup: Semigroup<A>): Semigroup<A> {
  return { concat: (x, y) => semigroup.concat(y, x) }
}

