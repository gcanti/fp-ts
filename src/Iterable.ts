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
import type { Option } from './Option'

/**
 * @since 3.0.0
 */
export const empty: Iterable<never> = {
  *[Symbol.iterator]() {
    // eslint-disable-next-line no-empty
  }
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const of = <A>(a: A): Iterable<A> => {
  return {
    *[Symbol.iterator]() {
      yield a
    }
  }
}

// TODO: is this useful?
/**
 * @category mapping
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
 * @category folding
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
    Array.from(self).reduceRight((b, a) => f(a, b), b)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex =
  <B, I, A>(b: B, f: (i: I, b: B, a: A) => B) =>
  (self: Iterable<readonly [I, A]>): B => {
    let out: B = b
    for (const [i, a] of self) {
      out = f(i, out, a)
    }
    return out
  }

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex =
  <M>(Monoid: Monoid<M>) =>
  <I, A>(f: (i: I, a: A) => M): ((self: Iterable<readonly [I, A]>) => M) =>
    reduceWithIndex(Monoid.empty, (i, b, a) => Monoid.combine(f(i, a))(b))

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex =
  <B, I, A>(b: B, f: (i: I, a: A, b: B) => B) =>
  (self: Iterable<readonly [I, A]>): B =>
    Array.from(self).reduceRight((b, [i, a]) => f(i, a, b), b)

/**
 * @category filtering
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
 * @since 3.0.0
 */
export const append =
  <B>(end: B) =>
  <A>(self: Iterable<A>): Iterable<A | B> => {
    return {
      *[Symbol.iterator]() {
        yield* self
        yield end
      }
    }
  }

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverseWithIndex =
  <F extends TypeLambda>(Applicative: applicative.Applicative<F>) =>
  <I, A, S, R, O, E, B>(f: (i: I, a: A) => Kind<F, S, R, O, E, B>) =>
  (self: Iterable<readonly [I, A]>): Kind<F, S, R, O, E, Iterable<B>> => {
    return pipe(
      self,
      reduceWithIndex<Kind<F, S, R, O, E, Iterable<B>>, I, A>(Applicative.of(empty), (i, fbs, a) =>
        pipe(
          fbs,
          Applicative.map((bs) => (b: B) => append(b)(bs)),
          Applicative.ap(f(i, a))
        )
      )
    )
  }

/**
 * @since 3.0.0
 */
export const toEntries = <A>(self: Iterable<A>): Iterable<readonly [number, A]> => {
  return {
    *[Symbol.iterator]() {
      let i = -1
      for (const a of self) {
        i++
        yield [i, a]
      }
    }
  }
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse = <F extends TypeLambda>(Applicative: applicative.Applicative<F>) => {
  const traverseWithIndex_ = traverseWithIndex(Applicative)
  return <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) =>
    (self: Iterable<A>): Kind<F, S, R, O, E, Iterable<B>> =>
      pipe(
        toEntries(self),
        traverseWithIndex_((_, a) => f(a))
      )
}

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @example
 * import { intercalate } from 'fp-ts/Iterable'
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

/**
 * Similar to 'reduce', but the result is encapsulated in a `Flattenable`.
 *
 * Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.
 *
 * @example
 * import { reduceKind } from 'fp-ts/Iterable'
 * import { Flattenable, some } from 'fp-ts/Option'
 * import * as T from 'fp-ts/Tree'
 * import { pipe } from 'fp-ts/Function'
 *
 * const tree = T.make(1, [T.make(2), T.make(3), T.make(4)])
 * assert.deepStrictEqual(pipe(tree, T.toIterable, reduceKind(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))), some(7))
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
  (iterable: Iterable<A>): ReadonlyArray<A> => {
    const out: Array<A> = []
    for (const candidate of iterable) {
      if (out.every((a) => !Eq.equals(a)(candidate))) {
        out.push(candidate)
      }
    }
    return _.isNonEmpty(out) ? out : _.emptyReadonlyArray
  }
