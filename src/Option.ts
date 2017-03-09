import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Plus } from './Plus'
import { Alternative } from './Alternative'
import { Extend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { identity, constant, constFalse, constTrue, Lazy, Function1, Function2 } from './function'

export type URI = 'Option'

export type HKTOption<A> = HKT<URI, A>

export type Option<A> = None<A> | Some<A>

export class None<A> {
  static of = of
  static empty = empty
  static zero = zero
  static value: Option<any> = new None()
  __tag: 'None'
  __hkt: URI
  __hkta: A
  constructor() {
    if (none) {
      return none as any
    }
  }
  map<B>(f: Function1<A, B>): Option<B> {
    return none
  }
  ap<B>(fab: Option<Function1<A, B>>): Option<B> {
    return none
  }
  chain<B>(f: Function1<A, Option<B>>): Option<B> {
    return none
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return b
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Option<B>> {
    return applicative.of(none)
  }
  alt(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: Function1<Option<A>, B>): Option<B> {
    return none
  }
  fold<B>(n: Lazy<B>, s: Function1<A, B>): B {
    return n()
  }
  getOrElse(f: Lazy<A>): A {
    return f()
  }
  concat(semigroup: Semigroup<A>, fy: Option<A>): Option<A> {
    return fy
  }
  equals(setoid: Setoid<A>, fy: Option<A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return 'None'
  }
}

export const none = None.value

export function zero<A>(): Option<A> {
  return none
}

export function empty<A>(): Option<A> {
  return none
}

export class Some<A> {
  static of = of
  static empty = empty
  static zero = zero
  __tag: 'Some'
  __hkt: URI
  __hkta: A
  constructor(public value: A) {}
  map<B>(f: Function1<A, B>): Option<B> {
    return new Some(f(this.value))
  }
  ap<B>(fab: Option<Function1<A, B>>): Option<B> {
    return fab.map(f => f(this.value))
  }
  chain<B>(f: Function1<A, Option<B>>): Option<B> {
    return f(this.value)
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return this.fold<B>(constant(b), identity)
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Option<B>> {
    return applicative.map(b => new Some(b), f(this.value))
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: Function1<Option<A>, B>): Option<B> {
    return new Some(f(this))
  }
  fold<B>(n: Lazy<B>, s: Function1<A, B>): B {
    return s(this.value)
  }
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  concat(semigroup: Semigroup<A>, fy: Option<A>): Option<A> {
    return fy.fold(() => this, y => new Some(semigroup.concat(this.value, y)))
  }
  equals(setoid: Setoid<A>, fy: Option<A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Some(${this.value})`
  }
}

export function equals<A>(setoid: Setoid<A>, fx: HKTOption<A>, fy: HKTOption<A>): boolean {
  return (fx as Option<A>).equals(setoid, fy as Option<A>)
}

export function fold<A, B>(n: Lazy<B>, s: Function1<A, B>, fa: HKTOption<A>): B {
  return (fa as Option<A>).fold(n, s)
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : new Some(a)
}

export function map<A, B>(f: Function1<A, B>, fa: HKTOption<A>): Option<B> {
  return (fa as Option<A>).map(f)
}

export function of<A>(a: A): Option<A> {
  return new Some(a)
}

export function ap<A, B>(fab: HKTOption<Function1<A, B>>, fa: HKTOption<A>): Option<B> {
  return (fa as Option<A>).ap(fab as Option<Function1<A, B>>)
}

export function chain<A, B>(f: Function1<A, HKTOption<B>>, fa: HKTOption<A>): Option<B> {
  return (fa as Option<A>).chain(f as Function1<A, Option<B>>)
}

export function reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKTOption<A>): B {
  return (fa as Option<A>).reduce(f, b)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTOption<A>): HKT<F, Option<B>> {
  return (ta as Option<A>).traverse(applicative, f)
}

export function alt<A>(fx: HKTOption<A>, fy: HKTOption<A>): Option<A> {
  return (fx as Option<A>).alt(fy as Option<A>)
}

export function extend<A, B>(f: Function1<HKTOption<A>, B>, ea: HKTOption<A>): Option<B> {
  return (ea as Option<A>).extend(f)
}

/** Maybe monoid returning the leftmost non-Nothing value */
export const monoidFirst: Monoid<Option<any>> = {
  empty,
  concat: alt
}

export function concat<A>(semigroup: Semigroup<A>, fx: HKTOption<A>, fy: HKTOption<A>): Option<A> {
  return (fx as Option<A>).concat(semigroup, fy as Option<A>)
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<Option<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(semigroup: Semigroup<A>): Monoid<Option<A>> {
  return { empty, concat: getSemigroup(semigroup).concat }
}

export function isSome<A>(fa: HKTOption<A>): fa is Some<A> {
  return fa instanceof Some
}

export function isNone<A>(fa: HKTOption<A>): fa is None<A> {
  return fa === none
}

export const some = of

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, alt, extend, zero } as (
    Monad<URI> &
    Foldable<URI> &
    Plus<URI> &
    Traversable<URI> &
    Alternative<URI> &
    Extend<URI>
  )
)
