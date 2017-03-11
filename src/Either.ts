import { HKT } from './HKT'
import { Applicative } from './Applicative'
import { Monad } from './Monad'
import { Foldable } from './Foldable'
import { Extend } from './Extend'
import { Setoid } from './Setoid'
import { Traversable } from './Traversable'
import { Bifunctor } from './Bifunctor'
import { Alt } from './Alt'
import { constFalse, constTrue, Function1, Function2, Predicate } from './function'

export type URI = 'Either'

export type HKTEither<L, A> = HKT<HKT<URI, L>, A>

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  static of = of
  __tag: 'Left'
  __hkt: HKT<URI, L>
  __hkta: A
  constructor(public value: L) {}
  map<B>(f: Function1<A, B>): Either<L, B> {
    return this as any
  }
  ap<B>(fab: Either<L, Function1<A, B>>): Either<L, B> {
    return this as any
  }
  chain<B>(f: Function1<A, Either<L, B>>): Either<L, B> {
    return this as any
  }
  bimap<L2, B>(f: Function1<L, L2>, g: Function1<A, B>): Either<L2, B> {
    return new Left<L2, B>(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }
  extend<B>(f: Function1<Either<L, A>, B>): Either<L, B> {
    return this as any
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return b
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Either<L, B>> {
    return applicative.of(this as any)
  }
  fold<B>(left: Function1<L, B>, right: Function1<A, B>): B {
    return left(this.value)
  }
  equals(setoid: Setoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Left(${JSON.stringify(this.value)})`
  }
}

export class Right<L, A> {
  static of = of
  __tag: 'Right'
  __hkt: HKT<URI, L>
  __hkta: A
  constructor(public value: A) {}
  map<B>(f: Function1<A, B>): Either<L, B> {
    return new Right<L, B>(f(this.value))
  }
  ap<B>(fab: Either<L, Function1<A, B>>): Either<L, B> {
    if (isRight(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  chain<B>(f: Function1<A, Either<L, B>>): Either<L, B> {
    return f(this.value)
  }
  bimap<L2, B>(f: Function1<L, L2>, g: Function1<A, B>): Either<L2, B> {
    return new Right<L2, B>(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  extend<B>(f: Function1<Either<L, A>, B>): Either<L, B> {
    return new Right<L, B>(f(this))
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return f(b, this.value)
  }
  traverse<F, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Either<L, B>> {
    return applicative.map(b => of<L, B>(b), f(this.value))
  }
  fold<B>(left: Function1<L, B>, right: Function1<A, B>): B {
    return right(this.value)
  }
  equals(setoid: Setoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Right(${JSON.stringify(this.value)})`
  }
}

export function equals<L, A>(setoid: Setoid<A>, fx: HKTEither<L, A>, fy: HKTEither<L, A>): boolean {
  return (fx as Either<L, A>).equals(setoid, (fy as Either<L, A>))
}

export function fold<L, A, B>(left: Function1<L, B>, right: Function1<A, B>, fa: HKTEither<L, A>): B {
  return (fa as Either<L, A>).fold(left, right)
}

export function map<L, A, B>(f: Function1<A, B>, fa: HKTEither<L, A>): Either<L, B> {
  return (fa as Either<L, A>).map(f)
}

export function of<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}

export function ap<L, A, B>(fab: HKTEither<L, Function1<A, B>>, fa: HKTEither<L, A>): Either<L, B> {
  return (fa as Either<L, A>).ap(fab as Either<L, Function1<A, B>>)
}

export function chain<L, A, B>(f: Function1<A, HKTEither<L, B>>, fa: HKTEither<L, A>): Either<L, B> {
  return (fa as Either<L, A>).chain(f as Function1<A, Either<L, B>>)
}

export function bimap<L, L2, A, B>(f: Function1<L, L2>, g: Function1<A, B>, fa: HKTEither<L, A>): Either<L2, B> {
  return (fa as Either<L, A>).bimap(f, g)
}

export function alt<L, A>(fx: HKTEither<L, A>, fy: HKTEither<L, A>): Either<L, A> {
  return (fx as Either<L, A>).alt(fy as Either<L, A>)
}

export function extend<L, A, B>(f: Function1<HKTEither<L, A>, B>, ea: HKTEither<L, A>): Either<L, B> {
  return (ea as Either<L, A>).extend(f)
}

export function reduce<L, A, B>(f: Function2<B, A, B>, b: B, fa: HKTEither<L, A>): B {
  return (fa as Either<L, A>).reduce(f, b)
}

export function traverse<F, L, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTEither<L, A>): HKT<F, Either<L, B>> {
  return (ta as Either<L, A>).traverse(applicative, f)
}

export function isLeft<L, A>(fa: HKTEither<L, A>): fa is Left<L, A> {
  return fa instanceof Left
}

export function isRight<L, A>(fa: HKTEither<L, A>): fa is Right<L, A> {
  return fa instanceof Right
}

export function left<L, A>(l: L): Either<L, A> {
  return new Left<L, A>(l)
}

export function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}

export function fromPredicate<L, A>(predicate: Predicate<A>, l: Function1<A, L>): (a: A) => Either<L, A> {
  return a => predicate(a) ? right<L, A>(a) : left<L, A>(l(a))
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, bimap, alt, extend } as (
    Monad<HKT<URI, any>> &
    Foldable<HKT<URI, any>> &
    Traversable<HKT<URI, any>> &
    Bifunctor<URI> &
    Alt<HKT<URI, any>> &
    Extend<HKT<URI, any>>
  )
)
