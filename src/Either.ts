import { HKT, HKTS } from './HKT'
import { StaticApplicative } from './Applicative'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticExtend, FantasyExtend } from './Extend'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { StaticBifunctor, FantasyBifunctor } from './Bifunctor'
import { StaticAlt, FantasyAlt } from './Alt'
import { StaticChainRec, tailRec } from './ChainRec'
import { Option, none, some } from './Option'
import { constFalse, constTrue, Predicate, Lazy } from './function'

declare module './HKT' {
  interface HKT<A, U> {
    Either: Either<U, A>
  }
  interface HKT2<A, B> {
    Either: Either<A, B>
  }
}

export const URI = 'Either'

export type URI = typeof URI

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<A>,
  FantasyTraversable<URI, A>,
  FantasyAlt<URI, A>,
  FantasyExtend<URI, A>,
  FantasyBifunctor<URI, L, A> {

  static of = of
  readonly _tag = 'Left'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: L) { }
  map<B>(f: (a: A) => B): Either<L, B> {
    return this as any
  }
  of<L2, B>(b: B): Either<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    return (isLeft(fab) ? fab : this) as any
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return this as any
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): Either<L2, B> {
    return new Left<L2, B>(f(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return fy
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return this as any
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<Either<L, B>>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.of(this as any)
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return left(this.value)
  }
  getOrElse(f: Lazy<A>): A {
    return f()
  }
  equals(setoid: StaticSetoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  mapLeft<L2>(f: (l: L) => L2): Either<L2, A> {
    return left<L2, A>(f(this.value))
  }
  toOption(): Option<A> {
    return none
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Left(${JSON.stringify(this.value)})`
  }
}

export class Right<L, A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<A>,
  FantasyTraversable<URI, A>,
  FantasyAlt<URI, A>,
  FantasyExtend<URI, A>,
  FantasyBifunctor<URI, L, A> {

  static of = of
  readonly _tag = 'Right'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) { }
  map<B>(f: (a: A) => B): Either<L, B> {
    return new Right<L, B>(f(this.value))
  }
  of<L2, B>(b: B): Either<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
    if (isRight(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  chain<B>(f: (a: A) => Either<L, B>): Either<L, B> {
    return f(this.value)
  }
  bimap<L2, B>(f: (l: L) => L2, g: (a: A) => B): Either<L2, B> {
    return new Right<L2, B>(g(this.value))
  }
  alt(fy: Either<L, A>): Either<L, A> {
    return this
  }
  extend<B>(f: (ea: Either<L, A>) => B): Either<L, B> {
    return new Right<L, B>(f(this))
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKTS>(applicative: StaticApplicative<F>): <B>(f: (a: A) => HKT<B>[F]) => HKT<Either<L, B>>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((b: B) => of<L, B>(b), f(this.value))
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): B {
    return right(this.value)
  }
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  equals(setoid: StaticSetoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  mapLeft<L2>(f: (l: L) => L2): Either<L2, A> {
    return this as any
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Right(${JSON.stringify(this.value)})`
  }
}

export function equals<L, A>(setoid: StaticSetoid<A>, fx: Either<L, A>, fy: Either<L, A>): boolean {
  return fx.equals(setoid, fy)
}

export function fold<L, A, B>(left: (l: L) => B, right: (a: A) => B, fa: Either<L, A>): B {
  return fa.fold(left, right)
}

export function getOrElse<L, A>(f: () => A, fa: Either<L, A>): A {
  return fa.getOrElse(f)
}

export function map<L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}

export function ap<L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> {
  return fa.ap(fab)
}

export function chain<L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B> {
  return fa.chain(f)
}

export function bimap<L, L2, A, B>(f: (l: L) => L2, g: (a: A) => B, fa: Either<L, A>): Either<L2, B> {
  return fa.bimap(f, g)
}

export function alt<L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> {
  return fx.alt(fy)
}

export function extend<L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B> {
  return ea.extend(f)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B {
  return fa.reduce(f, b)
}

export function traverse<F extends HKTS>(applicative: StaticApplicative<F>): <L, A, B>(f: (a: A) => HKT<B>[F], ta: Either<L, A>) => HKT<Either<L, B>>[F] {
  return <L, A, B>(f: (a: A) => HKT<B>[F], ta: Either<L, A>) => ta.traverse<F>(applicative)<B>(f)
}

export function chainRec<L, A, B>(f: (a: A) => Either<L, Either<A, B>>, a: A): Either<L, B> {
  return tailRec((e: Either<L, Either<A, B>>) => e.fold(
    (l: L) => right(left<L, B>(l)),
    (r: Either<A, B>) => r.fold(
      (a: A) => left<Either<L, Either<A, B>>, Either<L, B>>(f(a)),
      (b: B) => right(right<L, B>(b))
    )
  ), f(a))
}

export function isLeft<L, A>(fa: Either<L, A>): fa is Left<L, A> {
  return fa._tag === 'Left'
}

export function isRight<L, A>(fa: Either<L, A>): fa is Right<L, A> {
  return fa._tag === 'Right'
}

export function left<L, A>(l: L): Either<L, A> {
  return new Left<L, A>(l)
}

export function right<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a)
}

export function fromPredicate<L, A>(predicate: Predicate<A>, l: (a: A) => L): (a: A) => Either<L, A> {
  return a => predicate(a) ? right<L, A>(a) : left<L, A>(l(a))
}

export function mapLeft<L, L2, A>(f: (l: L) => L2, fa: Either<L, A>): Either<L2, A> {
  return fa.mapLeft(f)
}

export function toOption<L, A>(fa: Either<L, A>): Option<A> {
  return fa.toOption()
}

export function tryCatch<A>(f: Lazy<A>): Either<Error, A> {
  try {
    return right<Error, A>(f())
  } catch (e) {
    return left<Error, A>(e)
  }
}

// tslint:disable-next-line no-unused-expression
; (
  { map, of, ap, chain, reduce, traverse, bimap, alt, extend, chainRec } as (
    StaticMonad<URI> &
    StaticFoldable<URI> &
    StaticTraversable<URI> &
    StaticBifunctor<URI> &
    StaticAlt<URI> &
    StaticExtend<URI> &
    StaticChainRec<URI>
  )
)
