import { HKT } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { FantasyApply } from './Apply'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { constFalse, constTrue, Predicate, toString } from './function'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'
import * as nonEmptyArray from './NonEmptyArray'
import './overloadings'

export const URI = 'Validation'

export type URI = typeof URI

export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  static of = of
  readonly _tag: 'Failure' = 'Failure'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly semigroup: Semigroup<L>, public readonly value: L) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return this as any
  }
  of<M, B>(b: B): Validation<M, B> {
    return of(b)
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isFailure(fab)) {
      return failure(this.semigroup, this.semigroup.concat(fab.value, this.value))
    }
    return this as any
  }
  ap_<B, C>(this: Validation<L, (a: B) => C>, fb: Validation<L, B>): Validation<L, C> {
    return fb.ap(this)
  }
  bimap<M, B>(S: Semigroup<M>, f: (l: L) => M, g: (a: A) => B): Validation<M, B> {
    return failure(S, f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  equals(S: Setoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constTrue, constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(l => failure<L, A>(this.semigroup, this.semigroup.concat(l, this.value)), () => this)
  }
  mapFailure<M>(S: Semigroup<M>, f: (l: L) => M): Validation<M, A> {
    return failure(S, f(this.value))
  }
  swap(S: Semigroup<A>): Validation<A, L> {
    return success(this.value)
  }
  toOption(): Option<A> {
    return none
  }
  toEither(): Either<L, A> {
    return left(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toValidationNea(): Option<Validation<nonEmptyArray.NonEmptyArray<L>, A>> {
    return some(failure(nonEmptyArray, nonEmptyArray.of(this.value)))
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `failure(${toString(this.value)})`
  }
}

export class Success<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  static of = of
  readonly _tag: 'Success' = 'Success'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: A) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return new Success<L, B>(f(this.value))
  }
  of<M, B>(b: B): Validation<M, B> {
    return of(b)
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isSuccess(fab)) {
      return this.map(fab.value)
    }
    return fab as any
  }
  ap_<B, C>(this: Validation<L, (a: B) => C>, fb: Validation<L, B>): Validation<L, C> {
    return fb.ap(this)
  }
  bimap<M, B>(S: Semigroup<M>, f: (l: L) => M, g: (a: A) => B): Validation<M, B> {
    return success(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.map(b => of(b), f(this.value))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  equals(S: Setoid<A>, fy: Validation<L, A>): boolean {
    return fy.fold(constFalse, y => S.equals(this.value, y))
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  mapFailure<M>(S: Semigroup<M>, f: (l: L) => M): Validation<M, A> {
    return this as any
  }
  swap(S: Semigroup<A>): Validation<A, L> {
    return failure(S, this.value)
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  toEither(): Either<L, A> {
    return right(this.value)
  }
  /** Lift the Invalid value into a NonEmptyArray */
  toValidationNea(): Option<Validation<nonEmptyArray.NonEmptyArray<L>, A>> {
    return none
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `success(${toString(this.value)})`
  }
}

export function equals<L, A>(S: Setoid<A>, fx: Validation<L, A>, fy: Validation<L, A>): boolean {
  return fx.equals(S, fy)
}

export function getSetoid<L, A>(S: Setoid<A>): Setoid<Validation<L, A>> {
  return {
    equals: (x, y) => equals(S, x, y)
  }
}

export function fold<L, A, B>(failure: (l: L) => B, success: (a: A) => B, fa: Validation<L, A>): B {
  return fa.fold(failure, success)
}

export function map<L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): Validation<L, A> {
  return new Success(a)
}

export function ap<L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> {
  return fa.ap(fab)
}

export function bimap<L, M, A, B>(
  S: Semigroup<M>,
  f: (l: L) => M,
  g: (a: A) => B,
  fa: Validation<L, A>
): Validation<M, B> {
  return fa.bimap(S, f, g)
}

export function alt<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> {
  return fx.alt(fy)
}

export function reduce<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B {
  return fa.reduce(f, b)
}

export class Ops {
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export function isFailure<L, A>(fa: Validation<L, A>): fa is Failure<L, A> {
  return fa._tag === 'Failure'
}

export function isSuccess<L, A>(fa: Validation<L, A>): fa is Success<L, A> {
  return fa._tag === 'Success'
}

export function failure<L, A>(L: Semigroup<L>, l: L): Validation<L, A> {
  return new Failure(L, l)
}

export const success = of

export function fromPredicate<L, A>(
  S: Semigroup<L>,
  predicate: Predicate<A>,
  l: (a: A) => L
): (a: A) => Validation<L, A> {
  return a => (predicate(a) ? success(a) : failure(S, l(a)))
}

export function concat<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> {
  return fx.concat(fy)
}

export function mapFailure<L, M, A>(S: Semigroup<M>, f: (l: L) => M, fa: Validation<L, A>): Validation<M, A> {
  return fa.mapFailure(S, f)
}

export function swap<L, A>(S: Semigroup<A>, fa: Validation<L, A>): Validation<A, L> {
  return fa.swap(S)
}

export function toOption<L, A>(fa: Validation<L, A>): Option<A> {
  return fa.toOption()
}

export function toEither<L, A>(fa: Validation<L, A>): Either<L, A> {
  return fa.toEither()
}

export function toValidationNea<L, A>(fa: Validation<L, A>): Option<Validation<nonEmptyArray.NonEmptyArray<L>, A>> {
  return fa.toValidationNea()
}

export const validation: Functor<URI> & Applicative<URI> & Foldable<URI> & Traversable<URI> & Alt<URI> = {
  URI,
  ap,
  map,
  of,
  reduce,
  traverse,
  alt
}
