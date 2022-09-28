/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = ReadonlyArray<Tree<A>>
 * ```
 *
 * @since 3.0.0
 */
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as flattenable from './Flattenable'
import type * as comonad from './Comonad'
import type { Eq } from './Eq'
import * as eq from './Eq'
import type * as foldable from './Foldable'
import { flow, identity, pipe } from './function'
import * as functor from './Functor'
import type { TypeLambda, Kind } from './HKT'
import * as _ from './internal'
import type * as monad from './Monad'
import type { Monoid } from './Monoid'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import * as readonlyArray from './ReadonlyArray'
import type { Show } from './Show'
import type * as traversable from './Traversable'
import * as readonlyNonEmptyArray from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Forest<A> extends ReadonlyArray<Tree<A>> {}

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

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make = <A>(value: A, forest: Forest<A> = readonlyArray.empty): Tree<A> => ({
  value,
  forest
})

/**
 * Build a (possibly infinite) tree from a seed value in breadth-first order.
 *
 * @category constructors
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
 * Build a (possibly infinite) forest from a list of seed values in breadth-first order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldForest =
  <B, A>(f: (b: B) => readonly [A, ReadonlyArray<B>]) =>
  (bs: ReadonlyArray<B>): Forest<A> =>
    bs.map(unfoldTree(f))

/**
 * Monadic tree builder, in depth-first order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldTreeWithEffect = <M extends TypeLambda>(
  M: monad.Monad<M>,
  A: applicative.Applicative<M>
): (<B, S, R, O, E, A>(
  f: (b: B) => Kind<M, S, R, O, E, readonly [A, ReadonlyArray<B>]>
) => (b: B) => Kind<M, S, R, O, E, Tree<A>>) => {
  const unfoldForestWithEffectMA = unfoldForestWithEffect(M, A)
  return (f) =>
    flow(
      f,
      M.flatMap(([value, bs]) =>
        pipe(
          bs,
          unfoldForestWithEffectMA(f),
          M.map((forest) => ({ value, forest }))
        )
      )
    )
}

/**
 * Monadic forest builder, in depth-first order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldForestWithEffect = <M extends TypeLambda>(
  M: monad.Monad<M>,
  A: applicative.Applicative<M>
): (<B, S, R, O, E, A>(
  f: (b: B) => Kind<M, S, R, O, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind<M, S, R, O, E, Forest<A>>) => {
  const traverseA = readonlyArray.traverse(A)
  return (f) => traverseA(unfoldTreeWithEffect(M, A)(f))
}

// -------------------------------------------------------------------------------------
// destructors
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
 * import { pipe } from 'fp-ts/function'
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
 * @category destructors
 * @since 3.0.0
 */
export const fold = <A, B>(f: (a: A, bs: ReadonlyArray<B>) => B): ((tree: Tree<A>) => B) => {
  const go = (tree: Tree<A>): B => f(tree.value, tree.forest.map(go))
  return go
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B> = (f) => (fa) => ({
  value: f(fa.value),
  forest: fa.forest.map(map(f))
})

/**
 * @category combinators
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
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipLeft: <_>(that: Tree<_>) => <A>(self: Tree<A>) => Tree<A> =
  /*#__PURE__*/ flattenable.zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipRight: <A>(that: Tree<A>) => <_>(self: Tree<_>) => Tree<A> =
  /*#__PURE__*/ flattenable.zipRight(Flattenable)

/**
 * @category combinators
 * @since 3.0.0
 */
export const ap: <A>(fa: Tree<A>) => <B>(self: Tree<(a: A) => B>) => Tree<B> = /*#__PURE__*/ flattenable.ap(Flattenable)

/**
 * @category Extendable
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B> = (f) => (wa) => ({
  value: f(wa),
  forest: wa.forest.map(extend(f))
})

/**
 * Derivable from `Extendable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>> = /*#__PURE__*/ extend(identity)

/**
 * Derivable from `Flattenable`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A> = /*#__PURE__*/ flatMap(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B =
  <A, B>(b: B, f: (b: B, a: A) => B) =>
  (fa: Tree<A>): B => {
    let r: B = f(b, fa.value)
    const len = fa.forest.length
    for (let i = 0; i < len; i++) {
      r = pipe(fa.forest[i], reduce(r, f))
    }
    return r
  }

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M = (M) => (f) =>
  reduce(M.empty, (acc, a) => M.combine(f(a))(acc))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B =
  <A, B>(b: B, f: (a: A, b: B) => B) =>
  (fa: Tree<A>): B => {
    let r: B = b
    const len = fa.forest.length
    for (let i = len - 1; i >= 0; i--) {
      r = pipe(fa.forest[i], reduceRight(r, f))
    }
    return f(fa.value, r)
  }

/**
 * @category Extract
 * @since 3.0.0
 */
export const extract: <A>(wa: Tree<A>) => A = (wa) => wa.value

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Tree<A>) => Kind<F, S, R, O, E, Tree<B>> = <
  F extends TypeLambda
>(
  F: apply.Apply<F>
) => {
  const traverseF = readonlyNonEmptyArray.traverse(F)
  const out =
    <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) =>
    (ta: Tree<A>): Kind<F, S, R, O, E, Tree<B>> => {
      const fb = f(ta.value)
      if (readonlyNonEmptyArray.isNonEmpty(ta.forest)) {
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

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => Tree<A> = (a) => make(a)

/**
 * @since 3.0.0
 */
export const unit: Tree<void> = of(undefined)

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
    (second) => (first) => E.equals(second.value)(first.value) && SA.equals(second.forest)(first.forest)
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
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<TreeTypeLambda> = {
  of
}

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
 * @since 3.0.0
 */
export const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Tree<A>, fb: Tree<B>) => Tree<C> =
  /*#__PURE__*/ apply.lift2(Apply)

/**
 * Lifts a ternary function into `Tree`.
 *
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
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<TreeTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<TreeTypeLambda> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<TreeTypeLambda> = {
  traverse
}

/**
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

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

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
// struct sequencing
// -------------------------------------------------------------------------------------

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const Do: Tree<{}> = /*#__PURE__*/ of(_.Do)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <A>(self: Tree<A>) => Tree<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @category struct sequencing
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ flattenable.bind(Flattenable)

/**
 * @category struct sequencing
 * @since 3.0.0
 */
export const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.bindPar(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const DoT: Tree<readonly []> = /*#__PURE__*/ of(_.DoT)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: Tree<A>) => Tree<readonly [A]> = /*#__PURE__*/ functor.tupled(Functor)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZipPar: <B>(
  fb: Tree<B>
) => <A extends ReadonlyArray<unknown>>(self: Tree<A>) => Tree<readonly [...A, B]> =
  /*#__PURE__*/ apply.flatZipPar(Apply)

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const flatZip: <A extends ReadonlyArray<unknown>, B>(
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<readonly [...A, B]> = /*#__PURE__*/ flattenable.flatZip(Flattenable)
