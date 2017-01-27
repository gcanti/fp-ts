import { HKT, Applicative, liftA2 } from './cats'

type Arr<A> = HKT<'Arr', A>

export function inj<A>(as: Array<A>): Arr<A> {
  return as as any as Arr<A>
}

export function prj<A>(as: Arr<A>): Array<A> {
  return as as any as Array<A>
}

export const empty: Arr<any> = inj([])

export function map<A, B>(f: (a: A) => B, fa: Arr<A>): Arr<B> {
  return inj(prj(fa).map(f))
}

export function of<A>(a: A): Arr<A> {
  return inj([a])
}

export function ap<A, B>(fab: Arr<(a: A) => B>, fa: Arr<A>): Arr<B> {
  const a = prj(fa)
  return inj(prj(fab).reduce((acc: Array<B>, f) => acc.concat(a.map(f)), []))
}

export function chain<A, B>(f: (a: A) => Arr<B>, fa: Arr<A>): Arr<B> {
  return inj(prj(fa).reduce((acc: Array<B>, a) => acc.concat(prj(f(a))), []))
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Arr<A>): B {
  return prj(fa).reduce(f, b)
}

export function snoc<A>(as: Arr<A>, a: A): Arr<A> {
  return inj(prj(as).concat(a))
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Arr<A>): HKT<F, Arr<B>> {
  const snocA2 = liftA2(applicative, snoc)
  return reduce((fab, a) => snocA2(fab, f(a)), applicative.of(empty), ta)
}

