import { HKT } from './HKT'
import { StaticFunctor } from './Functor'
import { StaticPointedFunctor } from './PointedFunctor'
import { StaticApplicative } from './Applicative'
import { StaticSemigroup } from './Semigroup'
import { FantasyApply } from './Apply'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticSetoid } from './Setoid'
import { StaticTraversable, FantasyTraversable } from './Traversable'
import { StaticAlt, FantasyAlt } from './Alt'
import { StaticMonoid } from './Monoid'
import { constFalse, constTrue, Function1, Function2, Function3, Function4, Predicate, Curried2, Curried3, Curried4 } from './function'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'
import * as nea from './NonEmptyArray'

export type URI = 'Validation'

export type HKTURI<L> = HKT<URI, L>

export type HKTValidation<L, A> = HKT<HKTURI<L>, A>

export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A> implements
  FantasyApply<HKTURI<L>, A>,
  FantasyFoldable<HKTURI<L>, A>,
  FantasyTraversable<HKTURI<L>, A>,
  FantasyAlt<HKTURI<L>, A> {

  static of = of
  readonly __tag: 'Failure'
  readonly __hkt: HKTURI<L>
  readonly __hkta: A
  constructor(public readonly semigroup: StaticSemigroup<L>, public readonly value: L) {}
  map<B>(f: Function1<A, B>): Validation<L, B> {
    return this as any
  }
  of<L2, B>(b: B): Validation<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Validation<L, Function1<A, B>>): Validation<L, B> {
    if (isFailure(fab)) {
      return failure<L, B>(this.semigroup, this.semigroup.concat(fab.value, this.value))
    }
    return this as any
  }
  bimap<L2, B>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>, g: Function1<A, B>): Validation<L2, B> {
    return failure<L2, B>(semigroup, f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return b
  }
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Validation<L, B>> {
    return applicative.of(this as any)
  }
  fold<B>(failure: Function1<L, B>, success: Function1<A, B>): B {
    return failure(this.value)
  }
  equals(setoid: StaticSetoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(
      l => failure<L, A>(this.semigroup, this.semigroup.concat(l, this.value)),
      () => this
    )
  }
  mapFailure<L2>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>): Validation<L2, A> {
    return failure<L2, A>(semigroup, f(this.value))
  }
  swap(semigroup: StaticSemigroup<A>): Validation<A, L> {
    return success<A, L>(this.value)
  }
  toOption(): Option<A> {
    return none
  }
  toEither(): Either<L, A> {
    return left<L, A>(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toValidationNea(): Option<Validation<nea.NonEmptyArray<L>, A>> {
    return some(failure<nea.NonEmptyArray<L>, A>(nea, nea.of(this.value)))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Failure(${JSON.stringify(this.value)})`
  }
}

export class Success<L, A> implements
  FantasyApply<HKTURI<L>, A>,
  FantasyFoldable<HKTURI<L>, A>,
  FantasyTraversable<HKTURI<L>, A>,
  FantasyAlt<HKTURI<L>, A> {

  static of = of
  readonly __tag: 'Success'
  readonly __hkt: HKTURI<L>
  readonly __hkta: A
  constructor(public readonly value: A) {}
  map<B>(f: Function1<A, B>): Validation<L, B> {
    return new Success<L, B>(f(this.value))
  }
  of<L2, B>(b: B): Validation<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Validation<L, Function1<A, B>>): Validation<L, B> {
    if (isSuccess(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  bimap<L2, B>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>, g: Function1<A, B>): Validation<L2, B> {
    return new Success<L2, B>(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(f: Function2<B, A, B>, b: B): B {
    return f(b, this.value)
  }
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, Validation<L, B>> {
    return applicative.map(b => of<L, B>(b), f(this.value))
  }
  fold<B>(failure: Function1<L, B>, success: Function1<A, B>): B {
    return success(this.value)
  }
  equals(setoid: StaticSetoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  mapFailure<L2>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>): Validation<L2, A> {
    return this as any
  }
  swap(semigroup: StaticSemigroup<A>): Validation<A, L> {
    return failure<A, L>(semigroup, this.value)
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  toEither(): Either<L, A> {
    return right<L, A>(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toValidationNea(): Option<Validation<nea.NonEmptyArray<L>, A>> {
    return none
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Success(${JSON.stringify(this.value)})`
  }
}

export function to<L, A>(fa: HKTValidation<L, A>): Validation<L, A> {
  return fa as Validation<L, A>
}

export function equals<L, A>(setoid: StaticSetoid<A>, fx: HKTValidation<L, A>, fy: HKTValidation<L, A>): boolean {
  return (fx as Validation<L, A>).equals(setoid, (fy as Validation<L, A>))
}

export function fold<L, A, B>(failure: Function1<L, B>, success: Function1<A, B>, fa: HKTValidation<L, A>): B {
  return (fa as Validation<L, A>).fold(failure, success)
}

export function map<L, A, B>(f: Function1<A, B>, fa: HKTValidation<L, A>): Validation<L, B> {
  return (fa as Validation<L, A>).map(f)
}

export function of<L, A>(a: A): Success<L, A> {
  return new Success<L, A>(a)
}

export function getApplicativeS<L>(semigroup: StaticSemigroup<L>): StaticApplicative<HKT<URI, any>> {
  function ap<A, B>(fab: HKTValidation<L, Function1<A, B>>, fa: HKTValidation<L, A>): Validation<L, B> {
    return (fa as Validation<L, A>).ap(fab as Validation<L, Function1<A, B>>)
  }

  return { map, of, ap }
}

export function bimap<L, L2, A, B>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>, g: Function1<A, B>, fa: HKTValidation<L, A>): Validation<L2, B> {
  return (fa as Validation<L, A>).bimap(semigroup, f, g)
}

export function alt<L, A>(fx: HKTValidation<L, A>, fy: HKTValidation<L, A>): Validation<L, A> {
  return (fx as Validation<L, A>).alt(fy as Validation<L, A>)
}

export function reduce<L, A, B>(f: Function2<B, A, B>, b: B, fa: HKTValidation<L, A>): B {
  return (fa as Validation<L, A>).reduce(f, b)
}

export function traverse<F, L, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKTValidation<L, A>): HKT<F, Validation<L, B>> {
  return (ta as Validation<L, A>).traverse(applicative, f)
}

export function isFailure<L, A>(fa: HKTValidation<L, A>): fa is Failure<L, A> {
  return fa instanceof Failure
}

export function isSuccess<L, A>(fa: HKTValidation<L, A>): fa is Success<L, A> {
  return fa instanceof Success
}

export function failure<L, A>(semigroup: StaticSemigroup<L>, l: L): Failure<L, A> {
  return new Failure<L, A>(semigroup, l)
}

export function success<L, A>(a: A): Success<L, A> {
  return new Success<L, A>(a)
}

export function fromPredicate<L, A>(semigroup: StaticSemigroup<L>, predicate: Predicate<A>, l: Function1<A, L>): (a: A) => Validation<L, A> {
  return a => predicate(a) ? success<L, A>(a) : failure<L, A>(semigroup, l(a))
}

export function concat<L, A>(fx: HKTValidation<L, A>, fy: HKTValidation<L, A>): Validation<L, A> {
  return (fx as Validation<L, A>).concat((fy as Validation<L, A>))
}

export function mapFailure<L, L2, A>(semigroup: StaticSemigroup<L2>, f: Function1<L, L2>, fa: HKTValidation<L, A>): Validation<L2, A> {
  return (fa as Validation<L, A>).mapFailure(semigroup, f)
}

export function swap<L, A>(semigroup: StaticSemigroup<A>, fa: HKTValidation<L, A>): Validation<A, L> {
  return (fa as Validation<L, A>).swap(semigroup)
}

export function toOption<L, A>(fa: HKTValidation<L, A>): Option<A> {
  return (fa as Validation<L, A>).toOption()
}

export function toEither<L, A>(fa: HKTValidation<L, A>): Either<L, A> {
  return (fa as Validation<L, A>).toEither()
}

export function toValidationNea<L, A>(fa: HKTValidation<L, A>): Option<Validation<nea.NonEmptyArray<L>, A>> {
  return (fa as Validation<L, A>).toValidationNea()
}

declare module './Functor' {
  interface FunctorOps {
    map<L, A, B>(f: Function1<A, B>, fa: FantasyFunctor<HKTURI<L>, A>): Validation<L, B>
    lift<L, A, B>(functor: StaticFunctor<URI>, f: Function1<A, B>): Function1<Validation<L, A>, Validation<L, B>>
  }
}

declare module './Apply' {
  interface ApplyOps {
    ap<L, A, B>(fab: Validation<L, Function1<A, B>>, fa: FantasyApply<HKTURI<L>, A>): Validation<L, B>
    liftA2<L, A, B, C>(apply: StaticApply<URI>, f: Curried2<A, B, C>): Function2<Validation<L, A>, Validation<L, B>, Validation<L, C>>
    liftA3<L, A, B, C, D>(apply: StaticApply<URI>, f: Curried3<A, B, C, D>): Function3<Validation<L, A>, Validation<L, B>, Validation<L, C>, Validation<L, D>>
    liftA4<L, A, B, C, D, E>(apply: StaticApply<URI>, f: Curried4<A, B, C, D, E>): Function4<Validation<L, A>, Validation<L, B>, Validation<L, C>, Validation<L, D>, Validation<L, E>>
  }
}

declare module './Foldable' {
  interface FoldableOps {
    reduce<L, A, B>(f: Function2<B, A, B>, b: B, fa: FantasyFoldable<HKTURI<L>, A>): B
    foldMap<L, M, A>(monoid: StaticMonoid<M>, f: Function1<A, M>, fa: Validation<L, A>): M
  }
}

declare module './Traversable' {
  interface TraversableOps {
    traverse<L, F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<HKTURI<L>, A>): HKT<F, Validation<L, B>>

    sequence<L, F, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<HKTURI<L>, HKT<F, A>>): HKT<F, Validation<L, A>>

    sequenceS<L, F, T, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<URI>,
    tfa: HKTValidation<L, HKT<F, A>>): HKT<F, HKT<T, A>>
  }
}

declare module './Alt' {
  interface AltOps {
    alt<L, F, A>(fx: FantasyAlt<HKTURI<L>, A>, fy: FantasyAlt<HKTURI<L>, A>): Validation<L, A>
  }
}

// tslint:disable-next-line no-unused-expression
;(
  { map, of, reduce, traverse, alt } as (
    StaticFunctor<HKTURI<any>> &
    StaticPointedFunctor<HKTURI<any>> &
    StaticFoldable<HKTURI<any>> &
    StaticTraversable<HKTURI<any>> &
    StaticAlt<HKTURI<any>>
  )
)
