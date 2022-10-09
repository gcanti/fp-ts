/**
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import type { Eq } from './Eq'
import type { Flattenable } from './Flattenable'
import { pipe } from './Function'
import type { Kind, TypeLambda } from './HKT'
import * as _ from './internal'
import type { Monoid } from './Monoid'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'
import type { Option } from './Option'

/**
 * @since 3.0.0
 */
export type NonEmptyIterable<A> = readonly [A, Iterable<A>]

/**
 * @since 3.0.0
 */
export const toEntries = <A>(self: Iterable<A>): ReadonlyArray<readonly [number, A]> =>
  _.fromIterable(self).map((a, i) => [i, a])

/**
 * @category mapping
 * @since 3.0.0
 */
export const mapEntries =
  <K, A, B>(f: (k: K, a: A) => B) =>
  (self: Iterable<readonly [K, A]>): ReadonlyArray<B> =>
    _.fromIterable(self).map(([k, a]) => f(k, a))

/**
 * @category mapping
 * @since 3.0.0
 */
export const mapWithIndex =
  <A, B>(f: (i: number, a: A) => B) =>
  (self: Iterable<A>): ReadonlyArray<B> =>
    _.fromIterable(self).map((a, i) => f(i, a))

/**
 * @category mapping
 * @since 3.0.0
 */
export const map = <A, B>(f: (a: A) => B): ((self: Iterable<A>) => ReadonlyArray<B>) => mapWithIndex((_, a) => f(a))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceEntries =
  <K, B, A>(b: B, f: (k: K, b: B, a: A) => B) =>
  (self: Iterable<readonly [K, A]>): B =>
    _.fromIterable(self).reduce((b, [i, a]) => f(i, b, a), b)

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
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B): ((self: Iterable<A>) => B) =>
  reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap =
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M): ((self: Iterable<A>) => M) =>
    reduce(Monoid.empty, (b, a) => Monoid.combine(f(a))(b))

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
export const foldMapEntries =
  <M>(Monoid: Monoid<M>) =>
  <K, A>(f: (k: K, a: A) => M): ((self: Iterable<readonly [K, A]>) => M) =>
    reduceEntries(Monoid.empty, (i, b, a) => Monoid.combine(f(i, a))(b))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightEntries =
  <B, K, A>(b: B, f: (k: K, a: A, b: B) => B) =>
  (self: Iterable<readonly [K, A]>): B =>
    _.fromIterable(self).reduceRight((b, [i, a]) => f(i, a, b), b)

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMapWithIndex =
  <A, B>(f: (i: number, a: A) => Option<B>) =>
  (self: Iterable<A>): ReadonlyArray<B> => {
    const as = _.fromIterable(self)
    const out: Array<B> = []
    for (let i = 0; i < as.length; i++) {
      const o = f(i, as[i])
      if (_.isSome(o)) {
        out.push(o.value)
      }
    }
    return out
  }

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMap = <A, B>(f: (a: A) => Option<B>): ((self: Iterable<A>) => ReadonlyArray<B>) =>
  filterMapWithIndex((_, a) => f(a))

/**
 * @since 3.0.0
 */
export const append =
  <B>(end: B) =>
  <A>(self: Iterable<A>): NonEmptyReadonlyArray<A | B> =>
    _.concat([end])(_.fromIterable(self))

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverseEntries =
  <F extends TypeLambda>(Applicative: applicative.Applicative<F>) =>
  <K, A, S, R, O, E, B>(f: (k: K, a: A) => Kind<F, S, R, O, E, B>) =>
  (self: Iterable<readonly [K, A]>): Kind<F, S, R, O, E, ReadonlyArray<B>> => {
    return pipe(
      self,
      reduceEntries<K, Kind<F, S, R, O, E, ReadonlyArray<B>>, A>(Applicative.of(_.emptyReadonlyArray), (k, fbs, a) =>
        pipe(
          fbs,
          Applicative.map((bs) => (b: B) => append(b)(bs)),
          Applicative.ap(f(k, a))
        )
      )
    )
  }

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverseWithIndex =
  <F extends TypeLambda>(Applicative: applicative.Applicative<F>) =>
  <A, S, R, O, E, B>(f: (i: number, a: A) => Kind<F, S, R, O, E, B>) =>
  (self: Iterable<A>): Kind<F, S, R, O, E, ReadonlyArray<B>> => {
    return pipe(
      self,
      reduceWithIndex<Kind<F, S, R, O, E, ReadonlyArray<B>>, A>(Applicative.of(_.emptyReadonlyArray), (i, fbs, a) =>
        pipe(
          fbs,
          Applicative.map((bs) => (b: B) => append(b)(bs)),
          Applicative.ap(f(i, a))
        )
      )
    )
  }

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse = <F extends TypeLambda>(Applicative: applicative.Applicative<F>) => {
  const traverseWithIndex_ = traverseWithIndex(Applicative)
  return <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ): ((self: Iterable<A>) => Kind<F, S, R, O, E, ReadonlyArray<B>>) => traverseWithIndex_((_, a) => f(a))
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 3.0.0
 */
export const intercalate =
  <M>(Monoid: Monoid<M>) =>
  (separator: M) =>
  (self: Iterable<M>) => {
    let out: M = Monoid.empty
    let i = 0
    for (const m of self) {
      if (i === 0) {
        i++
        out = m
      } else {
        out = pipe(out, Monoid.combine(separator), Monoid.combine(m))
      }
    }
    return out
  }

/**
 * Similar to 'reduce', but the result is encapsulated in a `Flattenable`.
 *
 * Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.
 *
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

/**
 * @since 3.0.0
 */
export const uniq =
  <A>(Eq: Eq<A>) =>
  ([a, iterable]: NonEmptyIterable<A>): NonEmptyReadonlyArray<A> => {
    const out: _.NonEmptyArray<A> = [a]
    for (const candidate of iterable) {
      if (out.every((a) => !Eq.equals(a)(candidate))) {
        out.push(candidate)
      }
    }
    return out
  }
