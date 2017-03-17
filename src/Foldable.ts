import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { Function1, Function2 } from './function'

export interface StaticFoldable<F> {
  reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKT<F, A>): B
}

export interface FantasyFoldable<F, A> extends HKT<F, A> {
  reduce<B>(f: Function2<B, A, B>, b: B): B
}

export class FoldableOps {
  /** A default implementation of `foldMap` using `foldl`. */
  foldMap<F, M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<F, A>): M
  foldMap<F, M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<F, A>): M {
    return fa.reduce((acc, x) => monoid.concat(f(x), acc), monoid.empty())
  }

  reduce<F, A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<F, A>): B
  reduce<F, A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<F, A>): B {
    return fa.reduce(f, b)
  }

  /** A default implementation of `foldMap` using `foldl`. */
  foldMapS<F, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: Function1<A, M>, fa: HKT<F, A>): M
  foldMapS<F, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: Function1<A, M>, fa: HKT<F, A>): M {
    return foldable.reduce((acc, x) => monoid.concat(f(x), acc), monoid.empty(), fa)
  }
}

export const ops = new FoldableOps()
