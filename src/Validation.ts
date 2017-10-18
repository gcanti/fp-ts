import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Semigroup } from './Semigroup'
import { FantasyApply } from './Apply'
import { Foldable, FantasyFoldable } from './Foldable'
import { Setoid } from './Setoid'
import { Traversable, FantasyTraversable } from './Traversable'
import { Alt, FantasyAlt } from './Alt'
import { constFalse, Predicate, toString } from './function'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Validation: Validation<L, A>
  }
}

export const URI = 'Validation'

export type URI = typeof URI

/** A data-type like Either but with an accumulating Applicative */
export type Validation<L, A> = Failure<L, A> | Success<L, A>

export class Failure<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  readonly _tag: 'Failure' = 'Failure'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(readonly semigroup: Semigroup<L>, readonly value: L) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return this as any
  }
  ap<B>(fab: Validation<L, (a: A) => B>): Validation<L, B> {
    if (isFailure(fab)) {
      return failure(this.semigroup)(this.semigroup.concat(fab.value)(this.value))
    }
    return this as any
  }
  ap_<B, C>(this: Validation<L, (a: B) => C>, fb: Validation<L, B>): Validation<L, C> {
    return fb.ap(this)
  }
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => failure(S)(f(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return fy
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return b
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.of(this as any)
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return failure(this.value)
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(SL.equals(this.value), constFalse)
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return fy.fold(l => failure<L>(this.semigroup)<A>(this.semigroup.concat(l)(this.value)), () => this)
  }
  mapFailure<M>(S: Semigroup<M>): (f: (l: L) => M) => Validation<M, A> {
    return f => failure(S)(f(this.value))
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
  inspect() {
    return this.toString()
  }
  toString() {
    return `failure(${toString(this.value)})`
  }
}

export class Success<L, A>
  implements FantasyApply<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A>, FantasyAlt<URI, A> {
  readonly _tag: 'Success' = 'Success'
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Validation<L, B> {
    return new Success<L, B>(f(this.value))
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
  bimap<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B> {
    return (f, g) => success(g(this.value))
  }
  alt(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    return f(b, this.value)
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <M, B>(f: (a: A) => HKT2As<F, M, B>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>> {
    return f => F.map(b => of(b), f(this.value))
  }
  fold<B>(failure: (l: L) => B, success: (a: A) => B): B {
    return success(this.value)
  }
  equals(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean {
    return fy => fy.fold(constFalse, y => SA.equals(this.value)(y))
  }
  concat(fy: Validation<L, A>): Validation<L, A> {
    return this
  }
  mapFailure<M>(S: Semigroup<M>): (f: (l: L) => M) => Validation<M, A> {
    return f => this as any
  }
  swap(S: Semigroup<A>): Validation<A, L> {
    return failure(S)(this.value)
  }
  toOption(): Option<A> {
    return some(this.value)
  }
  toEither(): Either<L, A> {
    return right(this.value)
  }
  inspect() {
    return this.toString()
  }
  toString() {
    return `success(${toString(this.value)})`
  }
}

export const fold = <L, A, B>(failure: (l: L) => B, success: (a: A) => B) => (fa: Validation<L, A>): B =>
  fa.fold(failure, success)

export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>> => ({
  equals: x => y =>
    x.fold(lx => y.fold(ly => SL.equals(lx)(ly), constFalse), ax => y.fold(constFalse, ay => SA.equals(ax)(ay)))
})

export const map = <L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B> => fa.map(f)

export const of = <L, A>(a: A): Validation<L, A> => new Success(a)

export const ap = <L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B> => fa.ap(fab)

export const bimap = <M>(S: Semigroup<M>) => <L, A, B>(f: (l: L) => M, g: (a: A) => B) => (
  fa: Validation<L, A>
): Validation<M, B> => fa.bimap(S)(f, g)

export const alt = <L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A> => fx.alt(fy)

export const reduce = <L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B => fa.reduce(f, b)

export class Ops {
  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <M, L, A, B>(f: (a: A) => HKT2As<F, M, B>, ta: Validation<L, A>) => HKT2As<F, M, Validation<L, B>>
  traverse<F extends HKTS>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKTAs<F, B>, ta: Validation<L, A>) => HKTAs<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, Validation<L, B>>
  traverse<F>(F: Applicative<F>): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse

export const isFailure = <L, A>(fa: Validation<L, A>): fa is Failure<L, A> => fa._tag === 'Failure'

export const isSuccess = <L, A>(fa: Validation<L, A>): fa is Success<L, A> => fa._tag === 'Success'

export const failure = <L>(L: Semigroup<L>) => <A>(l: L): Validation<L, A> => new Failure(L, l)

export const success = of

export const fromPredicate = <L>(S: Semigroup<L>) => <A>(predicate: Predicate<A>, f: (a: A) => L) => (
  a: A
): Validation<L, A> => (predicate(a) ? success(a) : failure(S)(f(a)))

export const fromEither = <L>(S: Semigroup<L>): (<A>(e: Either<L, A>) => Validation<L, A>) => {
  const f = failure(S)
  return e => e.fold(l => f(l), a => success(a))
}

export const concat = <L, A>(fx: Validation<L, A>) => (fy: Validation<L, A>): Validation<L, A> => fx.concat(fy)

export const mapFailure = <M>(S: Semigroup<M>) => <L>(f: (l: L) => M) => <A>(fa: Validation<L, A>): Validation<M, A> =>
  fa.mapFailure(S)(f)

export const swap = <L, A>(S: Semigroup<A>) => (fa: Validation<L, A>): Validation<A, L> => fa.swap(S)

export const toOption = <L, A>(fa: Validation<L, A>): Option<A> => fa.toOption()

export const toEither = <L, A>(fa: Validation<L, A>): Either<L, A> => fa.toEither()

export const validation: Semigroup<Validation<any, any>> &
  Functor<URI> &
  Applicative<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Alt<URI> = {
  URI,
  ap,
  map,
  of,
  concat,
  reduce,
  traverse,
  alt
}
