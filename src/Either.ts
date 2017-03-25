import { HKT } from './HKT'
import { StaticApplicative } from './Applicative'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticExtend, FantasyExtend } from './Extend'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { StaticBifunctor, FantasyBifunctor } from './Bifunctor'
import { StaticAlt, FantasyAlt } from './Alt'
import { StaticMonoid } from './Monoid'
import { StaticChainRec, tailRec } from './ChainRec'
import { Option, none, some } from './Option'
import { constFalse, constTrue, Function1, Function2, Function3, Function4, Predicate, Curried2, Curried3, Curried4, Kleisli, Cokleisli, Lazy } from './function'

export type URI = 'Either'

export type HKTURI<L> = HKT<URI, L>

export type HKTEither<L, A> = HKT<HKTURI<L>, A>

export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> implements
  FantasyMonad<HKTURI<L>, A>,
  FantasyFoldable<HKTURI<L>, A>,
  FantasyTraversable<HKTURI<L>, A>,
  FantasyAlt<HKTURI<L>, A>,
  FantasyExtend<HKTURI<L>, A>,
  FantasyBifunctor<URI, L, A> {

  static of = of
  readonly _tag: 'Left'
  readonly _hkt: HKTURI<L>
  readonly _hkta: A
  constructor(public readonly value: L) {}
  map<B>(f: Function1<A, B>): Either<L, B> {
    return this as any
  }
  of<L2, B>(b: B): Either<L2, B> {
    return of<L2, B>(b)
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
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Either<L, B>> {
    return applicative.of(this as any)
  }
  fold<B>(left: Function1<L, B>, right: Function1<A, B>): B {
    return left(this.value)
  }
  equals(setoid: StaticSetoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  mapLeft<L2>(f: Function1<L, L2>): Either<L2, A> {
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
  FantasyMonad<HKTURI<L>, A>,
  FantasyFoldable<HKTURI<L>, A>,
  FantasyTraversable<HKTURI<L>, A>,
  FantasyAlt<HKTURI<L>, A>,
  FantasyExtend<HKTURI<L>, A>,
  FantasyBifunctor<URI, L, A> {

  static of = of
  readonly _tag: 'Right'
  readonly _hkt: HKTURI<L>
  readonly _hkta: A
  constructor(public readonly value: A) {}
  map<B>(f: Function1<A, B>): Either<L, B> {
    return new Right<L, B>(f(this.value))
  }
  of<L2, B>(b: B): Either<L2, B> {
    return of<L2, B>(b)
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
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Either<L, B>> {
    return applicative.map(b => of<L, B>(b), f(this.value))
  }
  fold<B>(left: Function1<L, B>, right: Function1<A, B>): B {
    return right(this.value)
  }
  equals(setoid: StaticSetoid<A>, fy: Either<L, A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  mapLeft<L2>(f: Function1<L, L2>): Either<L2, A> {
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

export function to<L, A>(fa: HKTEither<L, A>): Either<L, A> {
  return fa as Either<L, A>
}

export function equals<L, A>(setoid: StaticSetoid<A>, fx: HKTEither<L, A>, fy: HKTEither<L, A>): boolean {
  return (fx as Either<L, A>).equals(setoid, (fy as Either<L, A>))
}

export function fold<L, A, B>(left: Function1<L, B>, right: Function1<A, B>, fa: HKTEither<L, A>): B {
  return (fa as Either<L, A>).fold(left, right)
}

export function map<L, A, B>(f: Function1<A, B>, fa: HKTEither<L, A>): Either<L, B> {
  return (fa as Either<L, A>).map(f)
}

export function of<L, A>(a: A): Right<L, A> {
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

export function traverse<F, L, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTEither<L, A>): HKT<F, Either<L, B>> {
  return (ta as Either<L, A>).traverse(applicative, f)
}

export function chainRec<L, A, B>(f: Function1<A, Either<L, Either<A, B>>>, a: A): Either<L, B> {
  return tailRec((e: Either<L, Either<A, B>>) => e.fold(
    (l: L) => right(left<L, B>(l)),
    (r: Either<A, B>) => r.fold(
      (a: A) => left<Either<L, Either<A, B>>, Either<L, B>>(f(a)),
      (b: B) => right(right<L, B>(b))
    )
  ), f(a))
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

export function fromPredicate<L, A>(predicate: Predicate<A>, l: Function1<A, L>): Function1<A, Either<L, A>> {
  return a => predicate(a) ? right<L, A>(a) : left<L, A>(l(a))
}

export function mapLeft<L, L2, A>(f: Function1<L, L2>, fa: HKTEither<L, A>): Either<L2, A> {
  return (fa as Either<L, A>).mapLeft(f)
}

export function toOption<L, A>(fa: HKTEither<L, A>): Option<A> {
  return (fa as Either<L, A>).toOption()
}

export function tryCatch<A>(f: Lazy<A>): Either<Error, A> {
  try {
    return right<Error, A>(f())
  } catch (e) {
    return left<Error, A>(e)
  }
}

declare module './Functor' {
  interface FunctorOps {
    map<L, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<L>, A>): Either<L, B>
    lift<L, A, B>(functor: StaticFunctor<HKTURI<L>>, f: Function1<A, B>): Function1<Either<L, A>, Either<L, B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<L, A, B>(fab: FantasyApply<HKTURI<L>, Function1<A, B>>, fa: FantasyApply<HKTURI<L>, A>): Either<L, B>
    liftA2<L, A, B, C>(apply: StaticApply<HKTURI<L>>, f: Curried2<A, B, C>): Function2<Either<L, A>, Either<L, B>, Either<L, C>>
    liftA3<L, A, B, C, D>(apply: StaticApply<HKTURI<L>>, f: Curried3<A, B, C, D>): Function3<Either<L, A>, Either<L, B>, Either<L, C>, Either<L, D>>
    liftA4<L, A, B, C, D, E>(apply: StaticApply<HKTURI<L>>, f: Curried4<A, B, C, D, E>): Function4<Either<L, A>, Either<L, B>, Either<L, C>, Either<L, D>, Either<L, E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<L, A, B>(f: Kleisli<HKTURI<L>, A, B>, fa: FantasyMonad<HKTURI<L>, A>): Either<L, B>
    flatten<L, A>(mma: FantasyMonad<HKTURI<L>, FantasyMonad<HKTURI<L>, A>>): Either<L, A>
  }
}

declare module './Foldable' {
  interface FoldableOps {
    reduce<L, A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<HKTURI<L>, A>): B
    foldMap<L, M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<HKTURI<L>, A>): M
  }
}

declare module './Traversable' {
  interface TraversableOps {
    traverse<L, F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<HKTURI<L>, A>): HKT<F, Either<L, B>>

    sequence<L, F, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyFoldable<HKTURI<L>, HKT<F, A>>): HKT<F, Either<L, A>>

    sequenceS<L, F, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<HKTURI<L>>,
    tfa: HKTEither<L, HKT<F, A>>): HKT<F, Either<L, A>>
  }
}

declare module './Alt' {
  interface AltOps {
    alt<L, F, A>(fx: FantasyAlt<HKTURI<L>, A>, fy: FantasyAlt<HKTURI<L>, A>): Either<L, A>
  }
}

declare module './Extend' {
  interface ExtendOps {
    extend<L, A, B>(f: Cokleisli<HKTURI<L>, A, B>, ea: FantasyExtend<HKTURI<L>, A>): Either<L, B>
  }
}

declare module './Bifunctor' {
  interface BifunctorOps {
    bimap<A, B, C, D>(f: Function1<A, B>, g: Function1<C, D>, fac: FantasyBifunctor<URI, A, C>): Either<B, D>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, bimap, alt, extend, chainRec } as (
    StaticMonad<HKTURI<any>> &
    StaticFoldable<HKTURI<any>> &
    StaticTraversable<HKTURI<any>> &
    StaticBifunctor<URI> &
    StaticAlt<HKTURI<any>> &
    StaticExtend<HKTURI<any>> &
    StaticChainRec<HKTURI<any>>
  )
)
