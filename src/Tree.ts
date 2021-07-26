/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = ReadonlyArray<Tree<A>>
 * ```
 *
 * @since 3.0.0
 */
import type {
  Applicative as Applicative_,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4
} from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import type { Comonad1 } from './Comonad'
import { Eq, fromEquals } from './Eq'
import type { Extend1 } from './Extend'
import type { Foldable1 } from './Foldable'
import { flow, identity, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1, tupled as tupled_ } from './Functor'
import type { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import * as _ from './internal'
import type { Monad as Monad_, Monad1, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import type { Pointed1 } from './Pointed'
import { Predicate } from './Predicate'
import * as RA from './ReadonlyArray'
import type { Show } from './Show'
import type { Traversable1 } from './Traversable'
import * as O from './Option'

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
export function unfoldTreeM<M extends URIS4>(
  M: Monad4<M> & Applicative4<M>
): <B, S, R, E, A>(
  f: (b: B) => Kind4<M, S, R, E, readonly [A, ReadonlyArray<B>]>
) => (b: B) => Kind4<M, S, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <B, R, E, A>(f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => (b: B) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <B, R, A>(f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => (b: B) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <B, E, A>(f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => (b: B) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <B, A>(f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => (b: B) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <B, A>(f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => (b: B) => Kind<M, Tree<A>>
export function unfoldTreeM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => (b: B) => HKT<M, Tree<A>>
export function unfoldTreeM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => (b: B) => HKT<M, Tree<A>> {
  const unfoldForestMM = unfoldForestM(M)
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
export function unfoldForestM<M extends URIS4>(
  M: Monad4<M> & Applicative4<M>
): <B, S, R, E, A>(
  f: (b: B) => Kind4<M, S, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind4<M, S, R, E, Forest<A>>
export function unfoldForestM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <B, R, E, A>(
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <B, R, A>(
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <B, R, E>(
  f: (b: B) => Kind2<M, R, readonly [E, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind2<M, R, Forest<E>>
export function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <B, A>(f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => Kind2<M, E, Forest<A>>
export function unfoldForestM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <B, A>(f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => Kind<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => HKT<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => HKT<M, Forest<A>> {
  const traverseM = RA.traverse(M)
  return (f) => traverseM(unfoldTreeM(M)(f))
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
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain1<URI>['chain'] = <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => {
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
 * Derivable from `Chain`.
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
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed1<URI>['of'] = (a) => tree(a)

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
export const Functor: Functor1<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
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
export const Chain: Chain1<URI> = {
  map,
  chain
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
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

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
  traverse
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

/**
 * Deep first search
 * The predicate judgment acts on the tree itself, not the value, so that the predicate can access the forest
 * @since:3.0.0
 */
export const findDepthFirst = <A>(predicate: (a: Tree<A>) => boolean) => (tree: Tree<A>): O.Option<Tree<A>> => {
  if (predicate(tree)) {
    return O.some(tree)
  }

  const todo: Array<Tree<A>> = [...tree.forest]

  while (todo.length > 0) {
    const current = todo.shift()!
    if (predicate(current)) {
      return O.some(current)
    }
    todo.unshift(...current.forest)
  }

  return O.none
}

/**
 * Breadth first search
 * The predicate judgment acts on the tree itself, not the value, so that the predicate can access the forest
 * @since:3.0.0
 */
export const findBreadthFirst = <A>(predicate: (a: Tree<A>) => boolean) => (tree: Tree<A>): O.Option<Tree<A>> => {
  if (predicate(tree)) {
    return O.some(tree)
  }

  const todo: Array<Tree<A>> = [...tree.forest]

  while (todo.length > 0) {
    const result = pipe(
      todo,
      RA.findFirst((tree) => predicate(tree))
    )

    if (O.isSome(result)) {
      return result
    }

    const todoCopy: ReadonlyArray<Tree<A>> = [...todo].reverse()
    todoCopy.forEach((tree) => todo.unshift(...tree.forest))
  }

  return O.none
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

/**
 * Filter the tree, if the root does not pass the predicate, it returns none
 * @since:3.0.0
 */
export const filter = <A>(predicate: (a: Tree<A>) => boolean) => (t: Tree<A>): O.Option<Tree<A>> => {
  if (predicate(t)) {
    const forest = pipe(t.forest, RA.map(filter(predicate)), RA.compact)
    return O.some(tree(t.value, forest))
  }
  return O.none
}

/**
 * Like the `map`, but give the chance to change the forest
 * @since:3.0.0
 */
export const modify = <A>(f: (ta: Tree<A>) => Tree<A>) => (ta: Tree<A>): Tree<A> => {
  const tb = f(ta)
  return tree(tb.value, tb.forest.map(modify(f)))
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Tree<{}> =
  /*#__PURE__*/
  of(_.emptyRecord)

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
  bind_(Chain)

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
export const ApT: Tree<readonly []> = of(_.emptyReadonlyArray)

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
