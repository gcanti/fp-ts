import { HKT } from './HKT'
import { StaticMonoid } from './Monoid'
import { StaticApplicative } from './Applicative'
import { StaticSemigroup } from './Semigroup'
import { StaticMonad, FantasyMonad } from './Monad'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticPlus } from './Plus'
import { StaticAlternative } from './Alternative'
import { StaticExtend, FantasyExtend } from './Extend'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { FantasyAlternative } from './Alternative'
import { identity, constant, constFalse, constTrue, Lazy, Function1, Function2, Function3, Function4, Curried2, Curried3, Curried4, Kleisli, Cokleisli, Predicate} from './function'

export type URI = 'Option'

export type HKTOption<A> = HKT<URI, A>

export type Option<A> = None<A> | Some<A>

export class None<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<URI, A>,
  FantasyTraversable<URI, A>,
  FantasyAlternative<URI, A>,
  FantasyExtend<URI, A> {

  static of = of
  static empty = empty
  static zero = zero
  static value: Option<any> = new None()
  readonly __tag: 'None'
  readonly __hkt: URI
  readonly __hkta: A
  constructor() {
    if (none) {
      return none as any
    }
  }
  map<B>(f: Function1<A, B>): Option<B> {
    return none
  }
  of<B>(b: B): Option<B> {
    return of(b)
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
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Option<B>> {
    return applicative.of(none)
  }
  zero<B>(): Option<B> {
    return zero<B>()
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
  concat(semigroup: StaticSemigroup<A>, fy: Option<A>): Option<A> {
    return fy
  }
  equals(setoid: StaticSetoid<A>, fy: Option<A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  toNullable(): A | null {
    return null
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

export class Some<A> implements
  FantasyMonad<URI, A>,
  FantasyFoldable<URI, A>,
  FantasyTraversable<URI, A>,
  FantasyAlternative<URI, A>,
  FantasyExtend<URI, A> {

  static of = of
  static empty = empty
  static zero = zero
  readonly __tag: 'Some'
  readonly __hkt: URI
  readonly __hkta: A
  constructor(public readonly value: A) {}
  map<B>(f: Function1<A, B>): Option<B> {
    return new Some(f(this.value))
  }
  of<B>(b: B): Option<B> {
    return of(b)
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
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Option<B>> {
    return applicative.map(b => some(b), f(this.value))
  }
  zero<B>(): Option<B> {
    return zero<B>()
  }
  alt(fa: Option<A>): Option<A> {
    return this
  }
  extend<B>(f: Function1<Option<A>, B>): Option<B> {
    return some(f(this))
  }
  fold<B>(n: Lazy<B>, s: Function1<A, B>): B {
    return s(this.value)
  }
  getOrElse(f: Lazy<A>): A {
    return this.value
  }
  concat(semigroup: StaticSemigroup<A>, fy: Option<A>): Option<A> {
    return fy.fold(() => this, y => some(semigroup.concat(this.value, y)))
  }
  equals(setoid: StaticSetoid<A>, fy: Option<A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  toNullable(): A | null {
    return this.value
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Some(${JSON.stringify(this.value)})`
  }
}

export function to<A>(fa: HKTOption<A>): Option<A> {
  return fa as Option<A>
}

export function equals<A>(setoid: StaticSetoid<A>, fx: HKTOption<A>, fy: HKTOption<A>): boolean {
  return (fx as Option<A>).equals(setoid, fy as Option<A>)
}

export function fold<A, B>(n: Lazy<B>, s: Function1<A, B>, fa: HKTOption<A>): B {
  return (fa as Option<A>).fold(n, s)
}

export function fromNullable<A>(a: A | null | undefined): Option<A> {
  return a == null ? none : some(a)
}

export function toNullable<A>(fa: HKTOption<A>): A | null {
  return (fa as Option<A>).toNullable()
}

export function map<A, B>(f: Function1<A, B>, fa: Option<A>): Option<B> {
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

export function traverse<F, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTOption<A>): HKT<F, Option<B>> {
  return (ta as Option<A>).traverse(applicative, f)
}

export function alt<A>(fx: HKTOption<A>, fy: HKTOption<A>): Option<A> {
  return (fx as Option<A>).alt(fy as Option<A>)
}

export function extend<A, B>(f: Function1<HKTOption<A>, B>, ea: HKTOption<A>): Option<B> {
  return (ea as Option<A>).extend(f)
}

/** Maybe monoid returning the leftmost non-None value */
export function getFirstStaticMonoid<A>(): StaticMonoid<Option<A>> {
  return { empty, concat: alt }
}

export function concat<A>(semigroup: StaticSemigroup<A>, fx: HKTOption<A>, fy: HKTOption<A>): Option<A> {
  return (fx as Option<A>).concat(semigroup, fy as Option<A>)
}

export function getStaticSemigroup<A>(semigroup: StaticSemigroup<A>): StaticSemigroup<Option<A>> {
  return { concat: (fx, fy) => concat(semigroup, fx, fy) }
}

export function getStaticMonoid<A>(semigroup: StaticSemigroup<A>): StaticMonoid<Option<A>> {
  return { empty, concat: getStaticSemigroup(semigroup).concat }
}

export function isSome<A>(fa: HKTOption<A>): fa is Some<A> {
  return fa instanceof Some
}

export function isNone<A>(fa: HKTOption<A>): fa is None<A> {
  return fa === none
}

export const some = of

export function fromPredicate<A>(predicate: Predicate<A>): Function1<A, Option<A>> {
  return a => predicate(a) ? some<A>(a) : none
}

declare module './Functor' {
  interface FunctorOps {
    map<A, B>(f: Function1<A, B>, fa: FantasyFunctor<URI, A>): Option<B>
    lift<A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Option<A>, Option<B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<A, B>(fab: Option<Function1<A, B>>, fa: FantasyApply<URI, A>): Option<B>
    liftA2<A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<Option<A>, Option<B>, Option<C>>
    liftA3<A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<Option<A>, Option<B>, Option<C>, Option<D>>
    liftA4<A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<Option<A>, Option<B>, Option<C>, Option<D>, Option<E>>
  }
}

declare module './Chain' {
  interface MonadOps {
    chain<A, B>(f: Kleisli<URI, A, B>, fa: FantasyMonad<URI, A>): Option<B>
    flatten<A>(mma: FantasyMonad<URI, FantasyMonad<URI, A>>): Option<A>
  }
}

declare module './Foldable' {
  interface FoldableOps {
    reduce<A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<URI, A>): B
    foldMap<M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: FantasyFoldable<URI, A>): M
    foldMapS<M, A>(foldable: StaticFoldable<URI>, monoid: StaticMonoid<M>, f: Function1<A, M>, fa: HKTOption<A>): M
  }
}

declare module './Traversable' {
  interface TraversableOps {
    traverse<F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<URI, A>): HKT<F, Option<B>>

    sequence<F, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<URI, HKT<F, A>>): HKT<F, Option<A>>

    sequenceS<F, T, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<URI>,
    tfa: HKTOption<HKT<F, A>>): HKT<F, HKT<T, A>>
  }
}

declare module './Alt' {
  interface AltOps {
    alt<F, A>(fx: FantasyAlt<URI, A>, fy: FantasyAlt<URI, A>): Option<A>
  }
}

declare module './Extend' {
  interface ExtendOps {
    extend<A, B>(f: Cokleisli<URI, A, B>, ea: FantasyExtend<URI, A>): Option<B>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, ap, chain, reduce, traverse, alt, extend, zero } as (
    StaticMonad<URI> &
    StaticFoldable<URI> &
    StaticPlus<URI> &
    StaticTraversable<URI> &
    StaticAlternative<URI> &
    StaticExtend<URI>
  )
)
