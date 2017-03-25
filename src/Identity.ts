import { HKT } from './HKT'
import { StaticApplicative } from './Applicative'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticMonoid } from './Monoid'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { StaticAlt, FantasyAlt } from './Alt'
import { StaticComonad, FantasyComonad } from './Comonad'
import { Either } from './Either'
import { StaticChainRec, tailRec } from './ChainRec'
import { Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli, Cokleisli } from './function'

export type URI = 'Identity'

export type HKTIdentity<A> = HKT<URI, A>

export class Identity<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<URI, A>,
  FantasyTraversable<URI, A>,
  FantasyAlt<URI, A>,
  FantasyComonad<URI, A> {

  static of = of
  static extract = extract
  readonly _hkt: URI
  readonly _hkta: A
  constructor(public readonly value: A) {}
  map<B>(f: Function1<A, B>): Identity<B> {
    return new Identity(f(this.value))
  }
  of<B>(b: B): Identity<B> {
    return of(b)
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
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Identity<B>> {
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
  equals(setoid: StaticSetoid<A>, fy: Identity<A>): boolean {
    return setoid.equals(this.value, fy.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Identity(${JSON.stringify(this.value)})`
  }
}

export function to<A>(fa: HKTIdentity<A>): Identity<A> {
  return fa as Identity<A>
}

export function equals<A>(setoid: StaticSetoid<A>, fx: HKTIdentity<A>, fy: HKTIdentity<A>): boolean {
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

export function traverse<F, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTIdentity<A>): HKT<F, Identity<B>> {
  return (ta as Identity<A>).traverse(applicative, f)
}

export function extend<A, B>(f: Function1<HKTIdentity<A>, B>, ea: HKTIdentity<A>): Identity<B> {
  return (ea as Identity<A>).extend(f)
}

export function extract<A>(fa: HKTIdentity<A>): A {
  return (fa as Identity<A>).extract()
}

export function chainRec<A, B>(f: (a: A) => Identity<Either<A, B>>, a: A): Identity<B> {
  return new Identity(tailRec(a => f(a).extract(), a))
}

declare module './Functor' {
  interface FunctorOps {
    map<A, B>(f: Function1<A, B>, fa: FantasyFunctor<URI, A>): Identity<B>
    lift<A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Identity<A>, Identity<B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<A, B>(fab: Identity<Function1<A, B>>, fa: FantasyApply<URI, A>): Identity<B>
    liftA2<A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<Identity<A>, Identity<B>, Identity<C>>
    liftA3<A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<Identity<A>, Identity<B>, Identity<C>, Identity<D>>
    liftA4<A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<Identity<A>, Identity<B>, Identity<C>, Identity<D>, Identity<E>>
  }
}

declare module './Monad' {
  interface MonadOps {
    chain<A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<URI, A>): Identity<B>
    flatten<A>(mma: FantasyMonad<URI, FantasyMonad<URI, A>>): Identity<A>
  }
}

declare module './Foldable' {
  interface FoldableOps {
    reduce<A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<URI, A>): B
    foldMap<M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<URI, A>): M
  }
}

declare module './Traversable' {
  interface TraversableOps {
    traverse<F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<URI, A>): HKT<F, Identity<B>>

    sequence<F, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<URI, HKT<F, A>>): HKT<F, Identity<A>>

    sequenceS<F, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<URI>,
    tfa: HKTIdentity<HKT<F, A>>): HKT<F, Identity<A>>
  }
}

declare module './Alt' {
  interface AltOps {
    alt<F, A>(fx: FantasyAlt<URI, A>, fy: FantasyAlt<URI, A>): Identity<A>
  }
}

declare module './Extend' {
  interface ExtendOps {
    extend<A, B>(f: Cokleisli<URI, A, B>, ea: FantasyExtend<URI, A>): Identity<B>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, alt, extract, extend, chainRec } as (
    StaticMonad<URI> &
    StaticFoldable<URI> &
    StaticTraversable<URI> &
    StaticAlt<URI> &
    StaticComonad<URI> &
    StaticChainRec<URI>
  )
)
