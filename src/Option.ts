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
import { identity, constant, ffalse, ftrue } from './function'

export abstract class Option<A> extends HKT<'Option', A> {
  static of = of
  static zero = zero
  abstract map<B>(f: (a: A) => B): Option<B>
  abstract ap<A, B>(fab: Option<(a: A) => B>): Option<B>
  abstract chain<B>(f: (a: any) => Option<B>): Option<B>
  abstract fold<B>(n: () => B, s: (a: A) => B): B
  abstract reduce<A, B>(f: (b: B, a: A) => B, b: B): B
  abstract traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>>
  abstract alt(fa: Option<A>): Option<A>
  abstract extend<B>(fy: (ea: Option<A>) => B): Option<B>
}

export function as<A>(x: HKT<'Option', A>): Option<A> {
  return x as Option<A>
}

class None extends Option<any> {
  map<B>(f: (a: any) => B): Option<B> {
    return none
  }
  ap<B>(fab: Option<(a: any) => B>): Option<B> {
    return none
  }
  chain<B>(f: (a: any) => Option<B>): Option<B> {
    return none
  }
  reduce<A, B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: any) => HKT<F, B>): HKT<F, Option<B>> {
    return applicative.of(none)
  }
  alt<A>(fa: Option<A>): Option<A> {
    return fa
  }
  extend<B>(f: (ea: Option<any>) => B): Option<B> {
    return none
  }
  fold<B>(n: () => B, s: (a: any) => B): B {
    return n()
  }
}

export const none: Option<any> = new None

export function zero(): Option<any> {
  return none
}

export class Some<A> extends Option<A> {
  constructor(public value: A){ super() }
  map<B>(f: (a: A) => B): Option<B> {
    return new Some(f(this.value))
  }
  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.map(f => f(this.value))
  }
  chain<B>(f: (a: A) => Option<B>): Option<B> {
    return f(this.value)
  }
  reduce<A, B>(f: (b: B, a: A) => B, b: B): B {
    return this.fold<B>(constant(b), identity)
  }
  traverse<F, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>): HKT<F, Option<B>> {
    return applicative.map(b => new Some(b), f(this.value))
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: (ea: Option<A>) => B): Option<B> {
    return new Some<B>(f(this))
  }
  fold<B>(n: () => B, s: (a: A) => B): B {
    return s(this.value)
  }
}

export function equals<A>(setoid: Setoid<A>, fx: Option<A>, fy: Option<A>): boolean {
  return fx.fold(
    () => fy.fold(ftrue, ffalse),
    x => fy.fold(ffalse, y => setoid.equals(x, y))
  )
}

export function fold<A, B>(n: () => B, s: (a: A) => B, fa: Option<A>): B {
  return fa.fold(n, s)
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : new Some(a)
}

export function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  return fa.map(f)
}

export function of<A>(a: A): Option<A> {
  return new Some(a)
}

export function ap<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => Option<B>, fa: Option<A>): Option<B> {
  return fa.chain(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Option<A>): B {
  return fa.reduce(f, b)
}

export function traverse<F, A, B>(applicative: Applicative<F>, f: (a: A) => HKT<F, B>, ta: Option<A>): HKT<F, Option<B>> {
  return ta.traverse(applicative, f)
}

export function alt<A>(fx: Option<A>, fy: Option<A>): Option<A> {
  return fx.alt(fy)
}

export function extend<A, B>(f: (ea: Option<A>) => B, ea: Option<A>): Option<B> {
  return ea.extend(f)
}

const empty = constant(none)

/** Maybe monoid returning the leftmost non-Nothing value */
export const monoidFirst: Monoid<Option<any>> = {
  empty,
  concat: alt
}

export function concat<A>(semigroup: Semigroup<A>, fx: Option<A>, fy: Option<A>): Option<A> {
  return fx.fold(
    () => fy,
    x => fy.fold(() => fx, y => some(semigroup.concat(x, y)))
  )
}

export function getSemigroup<A>(semigroup: Semigroup<A>): Semigroup<Option<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getMonoid<A>(semigroup: Semigroup<A>): Monoid<Option<A>> {
  const { concat } = getSemigroup(semigroup)
  return { empty, concat }
}

export function isSome<A>(fa: Option<A>): fa is Some<A> {
  return fa instanceof Some
}

export function isNone<A>(fa: Option<A>): boolean {
  return fa === none
}

export const some = of

;(
  { map, of, ap, chain, reduce, traverse, alt, extend, zero } as (
    Monad<'Option'> &
    Foldable<'Option'> &
    Plus<'Option'> &
    Traversable<'Option'> &
    Alternative<'Option'> &
    Extend<'Option'>
  )
)
