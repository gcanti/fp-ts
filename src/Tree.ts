/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = ReadonlyArray<Tree<A>>
 * ```
 *
 * @since 3.0.0
 */
import type { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import type { Comonad as Comonad_ } from './Comonad'
import { Eq, fromEquals } from './Eq'
import type { Foldable as Foldable_ } from './Foldable'
import { flow, identity, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Monad as Monad_ } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed as Pointed_ } from './Pointed'
import { Predicate } from './Predicate'
import * as RA from './ReadonlyArray'
import type { Show } from './Show'
import type { Traversable as Traversable_ } from './Traversable'

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
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const tree = <A>(value: A, forest: Forest<A> = RA.empty): Tree<A> => ({
  value,
  forest
})

/**
 * Build a (possibly infinite) tree from a seed value in breadth-first order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldTree = <B, A>(f: (b: B) => readonly [A, ReadonlyArray<B>]) => (b: B): Tree<A> => {
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
export const unfoldForest = <B, A>(f: (b: B) => readonly [A, ReadonlyArray<B>]) => (bs: ReadonlyArray<B>): Forest<A> =>
  bs.map(unfoldTree(f))

/**
 * Monadic tree builder, in depth-first order.
 *
 * @category constructors
 * @since 3.0.0
 */
export function unfoldTreeM<M extends HKT>(
  M: Monad_<M>,
  A: Applicative_<M>
): <B, S, R, E, A>(
  f: (b: B) => Kind<M, S, R, E, readonly [A, ReadonlyArray<B>]>
) => (b: B) => Kind<M, S, R, E, Tree<A>> {
  const unfoldForestMM = unfoldForestM(M, A)
  return (f) =>
    flow(
      f,
      M.chain(([value, bs]) =>
        pipe(
          bs,
          unfoldForestMM(f),
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
export function unfoldForestM<M extends HKT>(
  M: Monad_<M>,
  A: Applicative_<M>
): <B, S, R, E, A>(
  f: (b: B) => Kind<M, S, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind<M, S, R, E, Forest<A>> {
  const traverseM = RA.traverse(A)
  return (f) => traverseM(unfoldTreeM(M, A)(f))
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
 * import { fold, tree } from 'fp-ts/Tree'
 * import * as N from 'fp-ts/number'
 * import { concatAll } from 'fp-ts/Monoid'
 * import { pipe } from 'fp-ts/function'
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * const t = tree(1, [tree(2), tree(3)])
 *
 * const sum = concatAll(N.MonoidSum)
 *
 * assert.deepStrictEqual(pipe(t, fold((a, bs) => a + sum(bs))), 6)
 * assert.deepStrictEqual(pipe(t, fold((a, bs) => bs.reduce((b, acc) => Math.max(b, acc), a))), 3)
 * assert.deepStrictEqual(pipe(t, fold((_, bs) => (isEmpty(bs) ? 1 : sum(bs)))), 2)
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
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B> = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B> = <A, B>(f: (a: A) => Tree<B>) => (
  ma: Tree<A>
) => {
  const { value, forest } = f(ma.value)
  const concat = RA.getMonoid<Tree<B>>().concat
  return {
    value,
    forest: concat(ma.forest.map(chain(f)))(forest)
  }
}

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B> = (f) => (wa) => ({
  value: f(wa),
  forest: wa.forest.map(extend(f))
})

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>> = /*#__PURE__*/ extend(identity)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A> = /*#__PURE__*/ chain(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B = <A, B>(b: B, f: (b: B, a: A) => B) => (
  fa: Tree<A>
): B => {
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
  reduce(M.empty, (acc, a) => M.concat(f(a))(acc))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B = <A, B>(
  b: B,
  f: (a: A, b: B) => B
) => (fa: Tree<A>): B => {
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
 * @since 3.0.0
 */
export const traverse: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E, B>(f: (a: A) => Kind<F, S, R, E, B>) => (ta: Tree<A>) => Kind<F, S, R, E, Tree<B>> = <F extends HKT>(
  F: Applicative_<F>
) => {
  const traverseF = RA.traverse(F)
  const out = <A, S, R, E, B>(f: (a: A) => Kind<F, S, R, E, B>) => (ta: Tree<A>): Kind<F, S, R, E, Tree<B>> =>
    pipe(
      f(ta.value),
      F.map((value: B) => (forest: Forest<B>) => ({
        value,
        forest
      })),
      F.ap(pipe(ta.forest, traverseF(out(f))))
    )
  return out
}

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => Tree<A> = (a) => tree(a)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface TreeF extends HKT {
  readonly type: Tree<this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<Tree<A>> => {
  const show = (t: Tree<A>): string => {
    return RA.isEmpty(t.forest)
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
  const R: Eq<Tree<A>> = fromEquals((second) => (first) =>
    E.equals(second.value)(first.value) && SA.equals(second.forest)(first.forest)
  )
  const SA = RA.getEq(R)
  return R
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<TreeF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<TreeF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply_<TreeF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<A> = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<B> = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<TreeF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<TreeF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<TreeF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Tree<B>) => (first: Tree<A>) => Tree<A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable_<TreeF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable_<TreeF> = {
  map,
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad_<TreeF> = {
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
export const exists = <A>(predicate: Predicate<A>) => (ma: Tree<A>): boolean =>
  predicate(ma.value) || ma.forest.some(exists(predicate))

/**
 * Tests whether a value is a member of a `Tree`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A): ((fa: Tree<A>) => boolean) => exists(E.equals(a))

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
 * import { tree, drawTree } from 'fp-ts/Tree'
 *
 * const fa = tree('a', [
 *   tree('b'),
 *   tree('c'),
 *   tree('d', [tree('e'), tree('f')])
 * ])
 *
 * assert.strictEqual(drawTree(fa), `a
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
 * @since 3.0.0
 */
export const Do: Tree<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(fa: Tree<A>) => Tree<{ readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Tree<B>
) => (ma: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (fa: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Tree<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <A>(fa: Tree<A>) => Tree<readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <B>(
  fb: Tree<B>
) => <A extends ReadonlyArray<unknown>>(fas: Tree<A>) => Tree<readonly [...A, B]> = /*#__PURE__*/ apT_(Apply)
