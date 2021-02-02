/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = ReadonlyArray<Tree<A>>
 * ```
 *
 * @since 3.0.0
 */
import {
  Applicative as Applicative_,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C
} from './Applicative'
import { apFirst as apFirst_, Apply1, apSecond as apSecond_, apS as apS_, apT as apT_ } from './Apply'
import { Comonad1 } from './Comonad'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { identity, pipe } from './function'
import { bindTo as bindTo_, Functor1, tupled as tupled_ } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import {
  bind as bind_,
  chainFirst as chainFirst_,
  Monad1,
  Monad2,
  Monad2C,
  Monad3,
  Monad3C,
  Monad as Monad_
} from './Monad'
import { Pointed1 } from './Pointed'
import * as RA from './ReadonlyArray'
import { Show } from './Show'
import { Traversable1 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type Forest<A> = ReadonlyArray<Tree<A>>

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
export const make = <A>(value: A, forest: Forest<A> = RA.empty): Tree<A> => ({
  value,
  forest
})

/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldTree = <B, A>(b: B, f: (b: B) => readonly [A, ReadonlyArray<B>]): Tree<A> => {
  const [a, bs] = f(b)
  return { value: a, forest: unfoldForest(bs, f) }
}

/**
 * Monadic tree builder, in depth-first order
 *
 * @category constructors
 * @since 3.0.0
 */
export function unfoldTreeM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <R, A, B>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <E, A, B>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <A, B>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <A, B>(b: B, f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => Kind<M, Tree<A>>
export function unfoldTreeM<M>(
  M: Monad_<M> & Applicative_<M>
): <A, B>(b: B, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Tree<A>>
export function unfoldTreeM<M>(
  M: Monad_<M> & Applicative_<M>
): <A, B>(b: B, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Tree<A>> {
  const unfoldForestMM = unfoldForestM(M)
  return <A, B>(b: B, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) =>
    M.chain(([a, bs]: readonly [A, ReadonlyArray<B>]) =>
      M.chain((ts: ReadonlyArray<Tree<A>>) => M.of({ value: a, forest: ts }))(unfoldForestMM(bs, f))
    )(f(b))
}

/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 3.0.0
 */
export const unfoldForest = <B, A>(bs: ReadonlyArray<B>, f: (b: B) => readonly [A, ReadonlyArray<B>]): Forest<A> =>
  bs.map((b) => unfoldTree(b, f))

/**
 * Monadic forest builder, in depth-first order
 *
 * @category constructors
 * @since 3.0.0
 */
export function unfoldForestM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <R, E, A, B>(
  bs: ReadonlyArray<B>,
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <R, A, B>(
  bs: ReadonlyArray<B>,
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <R, E, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind2<M, R, readonly [E, ReadonlyArray<B>]>) => Kind2<M, R, Forest<E>>
export function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Forest<A>>
export function unfoldForestM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => Kind<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad_<M> & Applicative_<M>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad_<M> & Applicative_<M>
): <A, B>(bs: ReadonlyArray<B>, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Forest<A>> {
  const traverseM = RA.traverse(M)
  return (bs, f) =>
    pipe(
      bs,
      traverseM((b) => unfoldTreeM(M)(b, f))
    )
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
 * import { pipe } from 'fp-ts/function'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: ReadonlyArray<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(pipe(t, fold((a, bs) => a + sum(bs))), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(pipe(t, fold((a, bs) => bs.reduce((b, acc) => Math.max(b, acc), a))), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(pipe(t, fold((_, bs) => (bs.length === 0 ? 1 : sum(bs)))), 2)
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
export const map: Functor1<URI>['map'] = (f) => (fa) => ({
  value: f(fa.value),
  forest: fa.forest.map(map(f))
})

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad1<URI>['chain'] = <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => {
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
export const extend: Extend1<URI>['extend'] = (f) => (wa) => ({
  value: f(wa),
  forest: wa.forest.map(extend(f))
})

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable1<URI>['reduce'] = <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>): B => {
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
export const foldMap: Foldable1<URI>['foldMap'] = (M) => (f) => reduce(M.empty, (acc, a) => M.concat(f(a))(acc))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable1<URI>['reduceRight'] = <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>): B => {
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
export const extract: Comonad1<URI>['extract'] = (wa) => wa.value

/**
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(
  F: Applicative_<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: Tree<A>) => HKT<F, Tree<B>>) => {
  const traverseF = RA.traverse(F)
  const out = <A, B>(f: (a: A) => HKT<F, B>) => (ta: Tree<A>): HKT<F, Tree<B>> =>
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
 * @since 3.0.0
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(
  F: Applicative_<F>
): (<A>(ta: Tree<HKT<F, A>>) => HKT<F, Tree<A>>) => traverse(F)(identity)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => ({
  value: a,
  forest: RA.empty
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Tree'

declare module './HKT' {
  interface URItoKind<A> {
    readonly Tree: Tree<A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<Tree<A>> => {
  const show = (t: Tree<A>): string => {
    return t.forest === RA.empty || t.forest.length === 0
      ? `make(${S.show(t.value)})`
      : `make(${S.show(t.value)}, [${t.forest.map(show).join(', ')}])`
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
export const Functor: Functor1<URI> = {
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
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
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative1<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable1<URI> = {
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Comonad: Comonad1<URI> = {
  map,
  extend,
  extract
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a value is a member of a `Tree`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A): ((fa: Tree<A>) => boolean) => {
  const predicate = E.equals(a)
  const go = (fa: Tree<A>): boolean => predicate(fa.value) || fa.forest.some(go)
  return go
}

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
 * const fa = make('a', [
 *   make('b'),
 *   make('c'),
 *   make('d', [make('e'), make('f')])
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
export const Do: Tree<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Tree<readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)
