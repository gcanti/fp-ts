import { HKT } from './HKT'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Alt } from './Alt'
import { Comonad } from './Comonad'
import { Function1, Function2 } from './function'

export type URI = 'Identity';

export type HKTIdentity<A> = HKT<URI, A>;

export class Identity<A> implements HKTIdentity<A> {
  __hkt: URI;
  __hkta: A;
  static of = of
  static extract = extract
  constructor(private value: A){}
  map<B>(f: Function1<A, B>): Identity<B> {
    return new Identity(f(this.value))
  }
  ap<B>(fab: Identity<Function1<A, B>>): Identity<B> {
    return this.map(fab.extract())
  }
  chain<B>(f: Function1<A, Identity<B>>): Identity<B> {
    return f(this.extract())
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return f(b, this.value)
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Identity<B>> {
    return applicative.map(b => of<B>(b), f(this.value))
  }
  alt(fx: Identity<A>): Identity<A> {
    return this
  }
  extract(): A {
    return this.value
  }
  extend<B>(f: Function1<Identity<A>, B>): Identity<B> {
    return of(f(this))
  }
  fold<B>(f: Function1<A, B>): B {
    return f(this.value)
  }
  equals(setoid: Setoid<A>, fy: Identity<A>): boolean {
    return setoid.equals(this.value, fy.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Identity(${JSON.stringify(this.value)})`
  }
}

export function equals<A>(setoid: Setoid<A>, fx: HKTIdentity<A>, fy: HKTIdentity<A>): boolean {
  return (fx as Identity<A>).equals(setoid, fy as Identity<A>)
}

export function map<A, B>(f: Function1<A, B>, fa: HKTIdentity<A>): Identity<B> {
  return (fa as Identity<A>).map(f)
}

export function of<A>(a: A): Identity<A> {
  return new Identity(a)
}

export function ap<A, B>(fab: HKTIdentity<Function1<A, B>>, fa: Identity<A>): Identity<B> {
  return (fa as Identity<A>).ap(fab as Identity<Function1<A, B>>)
}

export function chain<A, B>(f: Function1<A, HKTIdentity<B>>, fa: Identity<A>): Identity<B> {
  return (fa as Identity<A>).chain(f as Function1<A, Identity<B>>)
}

export function reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKTIdentity<A>): B {
  return (fa as Identity<A>).reduce(f, b)
}

export function alt<A>(fx: HKTIdentity<A>, fy: HKTIdentity<A>): Identity<A> {
  return (fx as Identity<A>).alt(fy as Identity<A>)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTIdentity<A>): HKT<F, Identity<B>> {
  return (ta as Identity<A>).traverse(applicative, f)
}

export function extend<A, B>(f: Function1<HKTIdentity<A>, B>, ea: HKTIdentity<A>): Identity<B> {
  return (ea as Identity<A>).extend(f)
}

export function extract<A>(fa: HKTIdentity<A>): A {
  return (fa as Identity<A>).extract()
}

;(
  { map, of, ap, chain, reduce, traverse, alt, extract, extend } as (
    Monad<URI> &
    Foldable<URI> &
    Traversable<URI> &
    Alt<URI> &
    Comonad<URI>
  )
)
