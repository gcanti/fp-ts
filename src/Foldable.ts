/**
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './Function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Monoid } from './Monoid'
import type { Option } from './Option'
import * as _ from './internal'

/**
 * @category model
 * @since 3.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly toIterable: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<A>
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
}

/**
 * @since 3.0.0
 */
export const empty: Iterable<never> = {
  *[Symbol.iterator](): Iterator<never> {
    // eslint-disable-next-line no-empty
  }
}

/**
 * @since 3.0.0
 */
export const succeed = <A>(a: A): Iterable<A> => {
  return {
    *[Symbol.iterator](): Iterator<A> {
      yield a
    }
  }
}

/**
 * @since 3.0.0
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  (self: Iterable<A>): Iterable<B> => {
    return {
      *[Symbol.iterator]() {
        for (const a of self) {
          yield f(a)
        }
      }
    }
  }

/**
 * @since 3.0.0
 */
export const reduce =
  <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Iterable<A>): B => {
    let out: B = b
    for (const a of self) {
      out = f(out, a)
    }
    return out
  }

/**
 * @since 3.0.0
 */
export const foldMap =
  <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A) => M): ((self: Iterable<A>) => M) =>
    reduce(Monoid.empty, (b, a) => Monoid.combine(f(a))(b))

/**
 * @since 3.0.0
 */
export const filterMap =
  <A, B>(f: (a: A) => Option<B>) =>
  (self: Iterable<A>): Iterable<B> => {
    return {
      *[Symbol.iterator]() {
        for (const a of self) {
          const o = f(a)
          if (_.isSome(o)) {
            yield o.value
          }
        }
      }
    }
  }

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @example
 * import { intercalate } from 'fp-ts/Foldable'
 * import { Monoid } from 'fp-ts/string'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
 * assert.strictEqual(pipe(tree, T.toIterable, intercalate(Monoid)('|')), 'a|b|c|d')
 *
 * @since 3.0.0
 */
export const intercalate =
  <M>(Monoid: Monoid<M>) =>
  (separator: M) =>
  (self: Iterable<M>): M => {
    const go = ([init, acc]: readonly [boolean, M], m: M): readonly [boolean, M] =>
      init ? [false, m] : [false, pipe(acc, Monoid.combine(separator), Monoid.combine(m))]
    return pipe(self, reduce([true, Monoid.empty], go))[1]
  }

// -------------------------------

/**
 * Returns a default `reduce` composition.
 *
 * @since 3.0.0
 */
export const reduceComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: Foldable<F>, FoldableG: Foldable<G>) =>
  <B, A>(
    b: B,
    f: (b: B, a: A) => B
  ): (<FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B) =>
    FoldableF.reduce(b, (b, ga) => pipe(ga, FoldableG.reduce(b, f)))

/**
 * Returns a default `foldMap` composition.
 *
 * @since 3.0.0
 */
export const foldMapComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: Foldable<F>, FoldableG: Foldable<G>) =>
  <M>(Monoid: Monoid<M>) => {
    const foldMapF = FoldableF.foldMap(Monoid)
    const foldMapG = FoldableG.foldMap(Monoid)
    return <A>(
      f: (a: A) => M
    ): (<FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => M) =>
      foldMapF(foldMapG(f))
  }

/**
 * Returns a default `reduceRight` composition.
 *
 * @since 3.0.0
 */
export const reduceRightComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: Foldable<F>, FoldableG: Foldable<G>) =>
  <B, A>(
    b: B,
    f: (a: A, b: B) => B
  ): (<FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B) =>
    FoldableF.reduceRight(b, (ga, b) => FoldableG.reduceRight(b, f)(ga))

/**
 * Similar to 'reduce', but the result is encapsulated in a `Flattenable`.
 *
 * Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.
 *
 * @example
 * import { reduceKind } from 'fp-ts/Foldable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import { make, Foldable } from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = make(1, [make(2), make(3), make(4)])
 * assert.deepStrictEqual(pipe(tree, reduceKind(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
 *
 * @since 3.0.0
 */
export const reduceKind =
  <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <G extends TypeLambda>(Flattenable: Flattenable<G>) =>
  <S, R, O, E, B, A>(
    gb: Kind<G, S, R, O, E, B>,
    f: (b: B, a: A) => Kind<G, S, R, O, E, B>
  ): (<FS>(self: Kind<F, FS, never, unknown, unknown, A>) => Kind<G, S, R, O, E, B>) =>
    Foldable.reduce(gb, (gb, a) =>
      pipe(
        gb,
        Flattenable.flatMap((b) => f(b, a))
      )
    )
