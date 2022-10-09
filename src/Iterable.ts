/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './Function'
import type { Kind, TypeLambda } from './HKT'
import * as _ from './internal'
import type { Monoid } from './Monoid'

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Iterable<A>): B =>
    _.fromIterable(self).reduce((b, a) => f(b, a), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M) =>
  (self: Iterable<A>): M =>
    _.fromIterable(self).reduce((m, a) => Monoid.combine(f(a))(m), Monoid.empty)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  (self: Iterable<A>): B =>
    _.fromIterable(self).reduceRight((b, a) => f(a, b), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex =
  <B, A>(b: B, f: (i: number, b: B, a: A) => B) =>
  (self: Iterable<A>): B =>
    _.fromIterable(self).reduce((b, a, i) => f(i, b, a), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (i: number, a: A) => M) =>
  (self: Iterable<A>): M =>
    _.fromIterable(self).reduce((m, a, i) => Monoid.combine(f(i, a))(m), Monoid.empty)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex =
  <B, A>(b: B, f: (i: number, a: A, b: B) => B) =>
  (self: Iterable<A>): B =>
    _.fromIterable(self).reduceRight((b, a, i) => f(i, a, b), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceKind =
  <F extends TypeLambda>(Flattenable: Flattenable<F>) =>
  <S, R, O, E, B, A>(
    fb: Kind<F, S, R, O, E, B>,
    f: (b: B, a: A) => Kind<F, S, R, O, E, B>
  ): ((self: Iterable<A>) => Kind<F, S, R, O, E, B>) =>
    reduce(fb, (fb, a) =>
      pipe(
        fb,
        Flattenable.flatMap((b) => f(b, a))
      )
    )
