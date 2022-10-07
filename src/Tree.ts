/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = ReadonlyArray<Tree<A>>
 * ```
 *
 * @since 3.0.0
 */
import type * as kleisliCategory from './KleisliCategory'
import type * as kleisliComposable from './KleisliComposable'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import type * as comonad from './Comonad'
import type { Eq } from './Eq'
import * as eq from './Eq'
import type * as foldable from './Foldable'
import { flow, identity, pipe } from './Function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import * as fromIdentity from './FromIdentity'
import type { Predicate } from './Predicate'
import * as readonlyArray from './ReadonlyArray'
import type { Show } from './Show'
import type * as traversable from './Traversable'
import * as nonEmptyReadonlyArray from './NonEmptyReadonlyArray'
import type { NonEmptyReadonlyArray } from './NonEmptyReadonlyArray'

/**
 * @category model
 * @since 3.0.0
 */
export interface Forest<A> extends ReadonlyArray<Tree<A>> {}

/**
 * @category model
 * @since 3.0.0
 */
export type NonEmptyForest<A> = NonEmptyReadonlyArray<Tree<A>>

/**
 * @category model
 * @since 3.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TreeTypeLambda extends TypeLambda {
  readonly type: Tree<this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const make = <A>(value: A, forest: Forest<A> = _.emptyReadonlyArray): Tree<A> => ({
  value,
  forest
})

/**
 * Build a (possibly infinite) tree from a seed value in breadth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldTree =
  <B, A>(f: (b: B) => readonly [A, ReadonlyArray<B>]) =>
  (b: B): Tree<A> => {
    const [a, bs] = f(b)
    return {
      value: a,
      forest: pipe(bs, unfoldForest(f))
    }
  }

/**
 * Build a (possibly infinite) forest from a `NonEmptyReadonlyArray` of seed values in breadth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldNonEmptyForest = <B, A>(
  f: (b: B) => readonly [A, ReadonlyArray<B>]
): ((bs: NonEmptyReadonlyArray<B>) => NonEmptyForest<A>) => nonEmptyReadonlyArray.map(unfoldTree(f))

/**
 * Build a (possibly infinite) forest from a `ReadonlyArray` of seed values in breadth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldForest =
  <B, A>(f: (b: B) => readonly [A, ReadonlyArray<B>]) =>
  (bs: ReadonlyArray<B>): Forest<A> =>
    readonlyArray.isNonEmpty(bs) ? pipe(bs, unfoldNonEmptyForest(f)) : _.emptyReadonlyArray

/**
 * Monadic tree builder, in depth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldTreeKind = <F extends TypeLambda>(Monad: monad.Monad<F>, Apply: apply.Apply<F>) => {
  const unfoldForestKind_ = unfoldForestKind(Monad, Apply)
  return <B, S, R, O, E, A>(
    f: (b: B) => Kind<F, S, R, O, E, readonly [A, ReadonlyArray<B>]>
  ): ((b: B) => Kind<F, S, R, O, E, Tree<A>>) =>
    flow(
      f,
      Monad.flatMap(([value, bs]) =>
        pipe(
          bs,
          unfoldForestKind_(f),
          Monad.map((forest) => make(value, forest))
        )
      )
    )
}

/**
 * Monadic non empty forest builder, in depth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldNonEmptyForestKind = <F extends TypeLambda>(Monad: monad.Monad<F>, Apply: apply.Apply<F>) => {
  const traverse = nonEmptyReadonlyArray.traverse(Apply)
  return <B, S, R, O, E, A>(
    f: (b: B) => Kind<F, S, R, O, E, readonly [A, ReadonlyArray<B>]>
  ): ((bs: NonEmptyReadonlyArray<B>) => Kind<F, S, R, O, E, NonEmptyForest<A>>) =>
    traverse(unfoldTreeKind(Monad, Apply)(f))
}

/**
 * Monadic forest builder, in depth-first order.
 *
 * @category unfolding
 * @since 3.0.0
 */
export const unfoldForestKind = <F extends TypeLambda>(Monad: monad.Monad<F>, Apply: apply.Apply<F>) => {
  const unfoldNonEmptyForestKind_ = unfoldNonEmptyForestKind(Monad, Apply)
  return <B, S, R, O, E, A>(f: (b: B) => Kind<F, S, R, O, E, readonly [A, ReadonlyArray<B>]>) => {
    const g = unfoldNonEmptyForestKind_(f)
    return (bs: ReadonlyArray<B>): Kind<F, S, R, O, E, Forest<A>> =>
      readonlyArray.isNonEmpty(bs) ? g(bs) : Monad.succeed(_.emptyReadonlyArray)
  }
}

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/Tree'
 * import * as N from 'fp-ts/number'
 * import { combineAll } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/Function'
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * const tree = make(1, [make(2), make(3)])
 *
 * const sum = combineAll(N.MonoidSum)
 *
 * assert.deepStrictEqual(pipe(tree, fold((a, bs) => a + sum(bs))), 6)
 * assert.deepStrictEqual(pipe(tree, fold((a, bs) => bs.reduce((b, acc) => Math.max(b, acc), a))), 3)
 * assert.deepStrictEqual(pipe(tree, fold((_, bs) => (isEmpty(bs) ? 1 : sum(bs)))), 2)
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const fold = <A, B>(f: (a: A, bs: ReadonlyArray<B>) => B): ((tree: Tree<A>) => B) => {
  const go = (tree: Tree<A>): B => f(tree.value, tree.forest.map(go))
  return go
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B> = (f) => (fa) => ({
  value: f(fa.value),
  forest: fa.forest.map(map(f))
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const succeed: <A>(a: A) => Tree<A> = (a) => make(a)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<TreeTypeLambda> = {
  succeed
}

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => Tree<B>) => (self: Tree<A>) => Tree<B> =
  <A, B>(f: (a: A) => Tree<B>) =>
  (self: Tree<A>) => {
    const { value, forest } = f(self.value)
    const combine = readonlyArray.getMonoid<Tree<B>>().combine
    return {
      value,
      forest: combine(self.forest.map(flatMap(f)))(forest)
    }
  }

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<TreeTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(bfc: (b: B) => Tree<C>) => <A>(afb: (a: A) => Tree<B>) => (a: A) => Tree<C> =
  /*#__PURE__*/ flattenable.composeKleisli(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<TreeTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => Tree<A> = /*#__PURE__*/ fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<TreeTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (that: Tree<unknown>) => <A>(self: Tree<A>) => Tree<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: Tree<A>) => (self: Tree<unknown>) => Tree<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: Tree<A>) => <B>(self: Tree<(a: A) => B>) => Tree<B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B> = (f) => (wa) => ({
  value: f(wa),
  forest: wa.forest.map(extend(f))
})

/**
 * @since 3.0.0
 */
export const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>> = /*#__PURE__*/ extend(identity)

/**
 * @since 3.0.0
 */
export const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: <A>(wa: Tree<A>) => A = (wa) => wa.value

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Tree<A>) => Kind<F, S, R, O, E, Tree<B>> = <
  F extends TypeLambda
>(
  F: apply.Apply<F>
) => {
  const traverseF = nonEmptyReadonlyArray.traverse(F)
  const out =
    <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) =>
    (ta: Tree<A>): Kind<F, S, R, O, E, Tree<B>> => {
      const fb = f(ta.value)
      if (_.isNonEmpty(ta.forest)) {
        return pipe(
          f(ta.value),
          F.map((value: B) => (forest: Forest<B>) => ({
            value,
            forest
          })),
          F.ap(pipe(ta.forest, traverseF(out(f))))
        )
      }
      return pipe(
        fb,
        F.map((b) => make(b))
      )
    }
  return out
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<Tree<A>> => {
  const show = (t: Tree<A>): string => {
    return readonlyArray.isEmpty(t.forest)
      ? `tree(${S.show(t.value)})`
      : `tree(${S.show(t.value)}, [${t.forest.map(show).join(', ')}])`
  }
  return {
    show
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<Tree<A>> => {
  const R: Eq<Tree<A>> = eq.fromEquals(
    (that) => (self) => E.equals(that.value)(self.value) && SA.equals(that.forest)(self.forest)
  )
  const SA = readonlyArray.getEq(R)
  return R
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TreeTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: Tree<unknown>) => Tree<B> = /*#__PURE__*/ functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: Tree<unknown>) => Tree<void> = /*#__PURE__*/ functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<TreeTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `Tree`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Tree<A>, fb: Tree<B>) => Tree<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Tree`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: Tree<A>, fb: Tree<B>, fc: Tree<C>) => Tree<D> =
  /*#__PURE__*/ apply.lift3(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<TreeTypeLambda> = {
  map,
  ap,
  succeed
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TreeTypeLambda> = {
  map,
  succeed,
  flatMap
}

/**
 * @category conversions
 * @since 3.0.0
 */
export const toIterable = <A>(self: Tree<A>): Iterable<A> => {
  return {
    *[Symbol.iterator](): Iterator<A> {
      yield self.value
      for (const t of self.forest) {
        yield* toIterable(t)
      }
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<TreeTypeLambda> = {
  toIterable
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<TreeTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence =
  <F extends TypeLambda>(F: apply.Apply<F>) =>
  <S, R, O, E, A>(self: Tree<Kind<F, S, R, O, E, A>>): Kind<F, S, R, O, E, Tree<A>> =>
    pipe(self, traverse(F)(identity))

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: comonad.Comonad<TreeTypeLambda> = {
  map,
  extend,
  extract
}

/**
 * @since 3.0.0
 */
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: Tree<A>): boolean =>
    predicate(ma.value) || ma.forest.some(exists(predicate))

/**
 * Tests whether a value is a member of a `Tree`.
 *
 * @since 3.0.0
 */
export const elem =
  <A>(E: Eq<A>) =>
  (a: A): ((fa: Tree<A>) => boolean) =>
    exists(E.equals(a))

const draw = (indentation: string, forest: Forest<string>): string => {
  let r = ''
  const len = forest.length
  let tree: Tree<string>
  for (let i = 0; i < len; i++) {
    tree = forest[i]
    const isLast = i === len - 1
    r += indentation + (isLast ? '└' : '├') + '─ ' + tree.value
    r += draw(indentation + (len > 1 && !isLast ? '│  ' : '   '), tree.forest)
  }
  return r
}

/**
 * Neat 2-dimensional drawing of a forest
 *
 * @since 3.0.0
 */
export const drawForest = (forest: Forest<string>): string => draw('\n', forest)

/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree } from 'fp-ts/Tree'
 *
 * const tree = make('a', [
 *   make('b'),
 *   make('c'),
 *   make('d', [make('e'), make('f')])
 * ])
 *
 * assert.strictEqual(drawTree(tree), `a
 * ├─ b
 * ├─ c
 * └─ d
 *    ├─ e
 *    └─ f`)
 *
 *
 * @since 3.0.0
 */
export const drawTree = (tree: Tree<string>): string => tree.value + drawForest(tree.forest)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: Tree<{}> = /*#__PURE__*/ succeed(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Tree<A>) => Tree<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: Tree<readonly []> = /*#__PURE__*/ succeed(_.emptyReadonlyArray)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Tree<A>) => Tree<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: Tree<B>
) => <A extends ReadonlyArray<unknown>>(self: Tree<A>) => Tree<readonly [...A, B]> =
  /*#__PURE__*/ apply.zipFlatten(Apply)

/**
 * Sequentially zips this effect with the specified effect using the specified combiner function.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipWith: <B, A, C>(that: Tree<B>, f: (a: A, b: B) => C) => (self: Tree<A>) => Tree<C> =
  /*#__PURE__*/ apply.zipWith(Apply)
