/**
 * @file The `Semialign` type class represents functors supporting a zip operation that takes the
 * union of non-uniform shapes.
 *
 * `Semialign` instances are required to satisfy the following laws:
 *
 * TODO Do any of these laws have a name? And more importantly, have I converted them correctly?
 * 1. `F.align(fa, fa) = F.map(fa, (a) => both(a, a))`
 * 2. `F.align(F.map(fa, f), F.map(fb, g)) = F.map(F.align(fa, fb), (t) => These.bimap(t, f, g))`
 * 3. `F.alignWith(fa, fb, f) = F.map(F.align(fa, fb), f)`
 * 4. `F.align(fa, F.align(fb, fc)) = F.map(F.align(F.align(fa, fb), fc), These.assoc)`
 *
 * Where `These.assoc` implements the associativity law of `These` and has the following type signature:
 * `function assoc<A, B, C>(fa: These<A, These<B, C>>): These<These<A, B>, C>`
 *
 * Adapted from http://hackage.haskell.org/package/these-0.8/docs/Data-Align.html
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C } from './Functor'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { These } from './These'

/**
 * @since 1.15.0
 */
export interface Semialign<F> extends Functor<F> {
  readonly align: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (x: These<A, B>) => C) => HKT<F, C>
}

export interface Semialign1<F extends URIS> extends Functor1<F> {
  readonly align: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Type<F, A>, fb: Type<F, B>, f: (x: These<A, B>) => C) => Type<F, C>
}

export interface Semialign2<F extends URIS2> extends Functor2<F> {
  readonly align: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, These<A, B>>
  readonly alignWith: <L, A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (x: These<A, B>) => C) => Type2<F, L, C>
}

export interface Semialign3<F extends URIS3> extends Functor3<F> {
  readonly align: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, These<A, B>>
  readonly alignWith: <U, L, A, B, C>(
    fa: Type3<F, U, L, A>,
    fb: Type3<F, U, L, B>,
    f: (x: These<A, B>) => C
  ) => Type3<F, U, L, C>
}

export interface Semialign2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly align: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (x: These<A, B>) => C) => Type2<F, L, C>
}

export interface Semialign3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly align: <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, These<A, B>>
  readonly alignWith: <A, B, C>(
    fa: Type3<F, U, L, A>,
    fb: Type3<F, U, L, B>,
    f: (x: These<A, B>) => C
  ) => Type3<F, U, L, C>
}
