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
}

/**
 * Returns a default `toIterable` composition.
 *
 * @since 3.0.0
 */
export const toIterableComposition =
  <F extends TypeLambda, G extends TypeLambda>(FoldableF: Foldable<F>, FoldableG: Foldable<G>) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>): Iterable<A> => {
    return {
      *[Symbol.iterator]() {
        for (const ga of FoldableF.toIterable(self)) {
          yield* FoldableG.toIterable(ga)
        }
      }
    }
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
export const reduceRight =
  <B, A>(b: B, f: (a: A, b: B) => B) =>
  (self: Iterable<A>): B =>
    Array.from(self).reduceRight((b, a) => f(a, b), b)

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
 * Similar to 'reduce', but the result is encapsulated in a `Flattenable`.
 *
 * Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.
 *
 * @example
 * import { reduceKind } from 'fp-ts/Foldable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = T.make(1, [T.make(2), T.make(3), T.make(4)])
 * assert.deepStrictEqual(pipe(tree, T.toIterable, reduceKind(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
 *
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
