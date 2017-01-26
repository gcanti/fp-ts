import { HKT, Monad, Foldable, Traversable, Applicative, liftA2 } from './cats'

type Arr<A> = HKT<'Arr', A>

export function inj<A>(as: Array<A>): Arr<A> {
  return as as any as Arr<A>
}

export function prj<A>(as: Arr<A>): Array<A> {
  return as as any as Array<A>
}

export const empty: Arr<any> = inj([])

export const monad: Monad<'Arr'> = {
  map<A, B>(f: (a: A) => B, fa: Arr<A>): Arr<B> {
    return inj(prj(fa).map(f))
  },
  of<A>(a: A): Arr<A> {
    return inj([a])
  },
  ap<A, B>(fab: Arr<(a: A) => B>, fa: Arr<A>): Arr<B> {
    const a = prj(fa)
    return inj(prj(fab).reduce((acc: Array<B>, f) => acc.concat(a.map(f)), []))
  },
  chain<A, B>(f: (a: A) => Arr<B>, fa: Arr<A>): Arr<B> {
    return inj(prj(fa).reduce((acc: Array<B>, a) => acc.concat(prj(f(a))), []))
  }
}

export const foldable: Foldable<'Arr'> = {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Arr<A>): B {
    return prj(fa).reduce(f, b)
  }
}

export function snoc<A>(as: Arr<A>, a: A): Arr<A> {
  return inj(prj(as).concat(a))
}

export const traversable: Traversable<'Arr'> = {
  map: monad.map,
  reduce: foldable.reduce,
  traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Arr<A>): HKT<F, Arr<B>> {
    const snocA2 = liftA2<F, Arr<B>, B, Arr<B>>(applicative, snoc)
    return foldable.reduce((fab: HKT<F, Arr<B>>, a) => snocA2(fab, f(a)), applicative.of(empty), ta)
  }
}

