import { HKT, HKTS } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { FantasyApply } from './Apply'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { constFalse, constTrue, Predicate } from './function'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'
import * as nea from './NonEmptyArray'

declare module './HKT' {
  interface HKT<A, U> {
    Validation: Validation<U, A>
  }
}

export const URI = 'Validation'

export type URI = typeof URI

export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  static of = of
  readonly _tag = 'Failure'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly semigroup: Semigroup<L>, public readonly value: L) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return this as any
  }
  of<L2, B>(b: B): Validation<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isFailure(fab)) {
      return failure<L, B>(this.semigroup, this.semigroup.concat(fab.value, this.value))
    }
    return this as any
  }
  bimap<L2, B>(semigroup: Semigroup<L2>, f: (l: L) => L2, g: (a: A) => B): Validation<L2, B> {
    return failure<L2, B>(semigroup, f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKTS>(
    applicative: Applicative<F>
  ): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<Validation<L, B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.of(this as any)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  equals(setoid: Setoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(l => failure<L, A>(this.semigroup, this.semigroup.concat(l, this.value)), () => this)
  }
  mapFailure<L2>(semigroup: Semigroup<L2>, f: (l: L) => L2): Validation<L2, A> {
    return failure<L2, A>(semigroup, f(this.value))
  }
  swap(semigroup: Semigroup<A>): Validation<A, L> {
    return success<A, L>(this.value)
  }
  toOption(): Option<A> {
    return none
  }
  toEither(): Either<L, A> {
    return left<L, A>(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toEitherNea(): Option<Validation<nea.NonEmptyArray<L>, A>> {
    return some(failure<nea.NonEmptyArray<L>, A>(nea, nea.of(this.value)))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Failure(${JSON.stringify(this.value)})`
  }
}

export class Success<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  static of = of
  readonly _tag = 'Success'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return new Success<L, B>(f(this.value))
  }
  of<L2, B>(b: B): Validation<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isSuccess(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  bimap<L2, B>(semigroup: Semigroup<L2>, f: (l: L) => L2, g: (a: A) => B): Validation<L2, B> {
    return new Success<L2, B>(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKTS>(
    applicative: Applicative<F>
  ): <B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F]) => HKT<Validation<L, B>, U, V>[F] {
    return <B>(f: (a: A) => HKT<B>[F]) => applicative.map((b: B) => of<L, B>(b), f(this.value))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  equals(setoid: Setoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constFalse, y => setoid.equals(this.value, y))
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  mapFailure<L2>(semigroup: Semigroup<L2>, f: (l: L) => L2): Validation<L2, A> {
    return this as any
  }
  swap(semigroup: Semigroup<A>): Validation<A, L> {
    return failure<A, L>(semigroup, this.value)
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  toEither(): Either<L, A> {
    return right<L, A>(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toEitherNea(): Option<Validation<nea.NonEmptyArray<L>, A>> {
    return none
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `Success(${JSON.stringify(this.value)})`
  }
}

export function equals<L, A>(setoid: Setoid<A>, fx: Validation<L, A>, fy: Validation<L, A>): boolean {
  return fx.equals(setoid, fy)
}

export function fold<L, A, B>(failure: (l: L) => B, success: (a: A) => B, fa: Validation<L, A>): B {
  return fa.fold(failure, success)
}

export function map<L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): Validation<L, A> {
  return new Success<L, A>(a)
}

export function ap<L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> {
  return fa.ap(fab)
}

export function bimap<L, L2, A, B>(
  semigroup: Semigroup<L2>,
  f: (l: L) => L2,
  g: (a: A) => B,
  fa: Validation<L, A>
): Validation<L2, B> {
  return fa.bimap(semigroup, f, g)
}

export function alt<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> {
  return fx.alt(fy as Validation<L, A>)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B {
  return fa.reduce(f, b)
}

export function traverse<F extends HKTS>(
  applicative: Applicative<F>
): <L, A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: Validation<L, A>) => HKT<Validation<L, B>, U, V>[F] {
  return <L, A, B>(f: (a: A) => HKT<B>[F], ta: Validation<L, A>) => ta.traverse<F>(applicative)<B>(f)
}

export function isFailure<L, A>(fa: Validation<L, A>): fa is Failure<L, A> {
  return fa._tag === 'Failure'
}

export function isSuccess<L, A>(fa: Validation<L, A>): fa is Success<L, A> {
  return fa._tag === 'Success'
}

export function failure<L, A>(semigroup: Semigroup<L>, l: L): Validation<L, A> {
  return new Failure<L, A>(semigroup, l)
}

export const success = of

export function fromPredicate<L, A>(
  semigroup: Semigroup<L>,
  predicate: Predicate<A>,
  l: (a: A) => L
): (a: A) => Validation<L, A> {
  return a => (predicate(a) ? success<L, A>(a) : failure<L, A>(semigroup, l(a)))
}

export function concat<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> {
  return fx.concat(fy)
}

export function mapFailure<L, L2, A>(
  semigroup: Semigroup<L2>,
  f: (l: L) => L2,
  fa: Validation<L, A>
): Validation<L2, A> {
  return fa.mapFailure(semigroup, f)
}

export function swap<L, A>(semigroup: Semigroup<A>, fa: Validation<L, A>): Validation<A, L> {
  return fa.swap(semigroup)
}

export function toOption<L, A>(fa: Validation<L, A>): Option<A> {
  return fa.toOption()
}

export function toEither<L, A>(fa: Validation<L, A>): Either<L, A> {
  return fa.toEither()
}

export function toEitherNea<L, A>(fa: Validation<L, A>): Option<Validation<nea.NonEmptyArray<L>, A>> {
  return fa.toEitherNea()
}

const proof: Functor<URI> & Applicative<URI> & Foldable<URI> & Traversable<URI> & Alt<URI> = {
  URI,
  ap,
  map,
  of,
  reduce,
  traverse,
  alt
}
// tslint:disable-next-line no-unused-expression
proof
