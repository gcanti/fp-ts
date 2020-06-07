/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 *
 * @since 2.0.0
 */
import { Applicative } from './Applicative'
import { array, empty, getEq as getArrayEq, getMonoid } from './Array'
import { Comonad1 } from './Comonad'
import { Eq, fromEquals } from './Eq'
import { Foldable1 } from './Foldable'
import { identity } from './function'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'

// tslint:disable:readonly-array

declare module './HKT' {
  interface URItoKind<A> {
    readonly Tree: Tree<A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'Tree'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @category model
 * @since 2.0.0
 */
export type Forest<A> = Array<Tree<A>>

/**
 * @category model
 * @since 2.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}

/**
 * @category constructors
 * @since 2.0.0
 */
export function make<A>(value: A, forest: Forest<A> = empty): Tree<A> {
  return {
    value,
    forest
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Tree<A>> {
  const show = (t: Tree<A>): string => {
    return t.forest === empty || t.forest.length === 0
      ? `make(${S.show(t.value)})`
      : `make(${S.show(t.value)}, [${t.forest.map(show).join(', ')}])`
  }
  return {
    show
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getEq<A>(E: Eq<A>): Eq<Tree<A>> {
  let SA: Eq<Array<Tree<A>>>
  const R: Eq<Tree<A>> = fromEquals((x, y) => E.equals(x.value, y.value) && SA.equals(x.forest, y.forest))
  SA = getArrayEq(R)
  return R
}

const draw = (indentation: string, forest: Forest<string>): string => {
  let r: string = ''
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
 * @since 2.0.0
 */
export function drawForest(forest: Forest<string>): string {
  return draw('\n', forest)
}

/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { make, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = make('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   make('d', [tree.of('e'), tree.of('f')])
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
 * @since 2.0.0
 */
export function drawTree(tree: Tree<string>): string {
  return tree.value + drawForest(tree.forest)
}

/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> {
  const [a, bs] = f(b)
  return { value: a, forest: unfoldForest(bs, f) }
}

/**
 * Build a tree from a seed value
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> {
  return bs.map((b) => unfoldTree(b, f))
}

/**
 * Monadic tree builder, in depth-first order
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldTreeM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export function unfoldTreeM<M extends URIS2>(
  M: Monad2<M>
): <E, A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export function unfoldTreeM<M extends URIS>(
  M: Monad1<M>
): <A, B>(b: B, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Tree<A>>
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> {
  const unfoldForestMM = unfoldForestM(M)
  return (b, f) => M.chain(f(b), ([a, bs]) => M.chain(unfoldForestMM(bs, f), (ts) => M.of({ value: a, forest: ts })))
}

/**
 * Monadic forest builder, in depth-first order
 *
 * @category constructors
 * @since 2.0.0
 */
export function unfoldForestM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export function unfoldForestM<M extends URIS2>(
  M: Monad2<M>
): <R, E, B>(bs: Array<B>, f: (b: B) => Kind2<M, R, [E, Array<B>]>) => Kind2<M, R, Forest<E>>
export function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(bs: Array<B>, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Forest<A>>
export function unfoldForestM<M extends URIS>(
  M: Monad1<M>
): <A, B>(bs: Array<B>, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> {
  const traverseM = array.traverse(M)
  return (bs, f) => traverseM(bs, (b) => unfoldTreeM(M)(b, f))
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean {
  const go = (a: A, fa: Tree<A>): boolean => {
    if (E.equals(a, fa.value)) {
      return true
    }
    return fa.forest.some((tree) => go(a, tree))
  }
  return go
}

/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 *
 * @example
 * import { fold, make } from 'fp-ts/lib/Tree'
 *
 * const t = make(1, [make(2), make(3)])
 *
 * const sum = (as: Array<number>) => as.reduce((a, acc) => a + acc, 0)
 *
 * // Sum the values in a tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => a + sum(bs))(t), 6)
 *
 * // Find the maximum value in the tree:
 * assert.deepStrictEqual(fold((a: number, bs: Array<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)
 *
 * // Count the number of leaves in the tree:
 * assert.deepStrictEqual(fold((_: number, bs: Array<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
 *
 * @category destructors
 * @since 2.6.0
 */
export function fold<A, B>(f: (a: A, bs: Array<B>) => B): (tree: Tree<A>) => B {
  const go = (tree: Tree<A>): B => f(tree.value, tree.forest.map(go))
  return go
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const map_: <A, B>(fa: Tree<A>, f: (a: A) => B) => Tree<B> = (fa, f) => ({
  value: f(fa.value),
  forest: fa.forest.map((t) => map_(t, f))
})

const ap_: <A, B>(fab: Tree<(a: A) => B>, fa: Tree<A>) => Tree<B> = (fab, fa) => chain_(fab, (f) => map_(fa, f))

const chain_ = <A, B>(fa: Tree<A>, f: (a: A) => Tree<B>): Tree<B> => {
  const { value, forest } = f(fa.value)
  const concat = getMonoid<Tree<B>>().concat
  return {
    value,
    forest: concat(
      forest,
      fa.forest.map((t) => chain_(t, f))
    )
  }
}

const reduce_ = <A, B>(fa: Tree<A>, b: B, f: (b: B, a: A) => B): B => {
  let r: B = f(b, fa.value)
  const len = fa.forest.length
  for (let i = 0; i < len; i++) {
    r = reduce_(fa.forest[i], r, f)
  }
  return r
}

const foldMap_: <M>(M: Monoid<M>) => <A>(fa: Tree<A>, f: (a: A) => M) => M = (M) => (fa, f) =>
  reduce_(fa, M.empty, (acc, a) => M.concat(acc, f(a)))

const reduceRight_ = <A, B>(fa: Tree<A>, b: B, f: (a: A, b: B) => B): B => {
  let r: B = b
  const len = fa.forest.length
  for (let i = len - 1; i >= 0; i--) {
    r = reduceRight_(fa.forest[i], r, f)
  }
  return f(fa.value, r)
}

const extend_: <A, B>(wa: Tree<A>, f: (wa: Tree<A>) => B) => Tree<B> = (wa, f) => ({
  value: f(wa),
  forest: wa.forest.map((t) => extend_(t, f))
})

/**
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <B>(fb: Tree<B>) => <A>(fa: Tree<A>): Tree<B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B> = (f) => (ma) => chain_(ma, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>> = (wa) => extend_(wa, identity)

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B> = (f) => (wa) => extend_(wa, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A> = (mma) => chain_(mma, identity)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B> = (f) => (fa) => map_(fa, f)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B = (b, f) => (fa) => reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <A>(wa: Tree<A>) => A = (wa) => wa.value

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const traverse_ = <F>(F: Applicative<F>): (<A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>) => HKT<F, Tree<B>>) => {
  const traverseF = array.traverse(F)
  const r = <A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>): HKT<F, Tree<B>> =>
    F.ap(
      F.map(f(ta.value), (value: B) => (forest: Forest<B>) => ({
        value,
        forest
      })),
      traverseF(ta.forest, (t) => r(t, f))
    )
  return r
}

/**
 * @category instances
 * @since 2.0.0
 */
export const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = {
  URI,
  map: map_,
  of: (a) => ({
    value: a,
    forest: empty
  }),
  ap: ap_,
  chain: chain_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence: <F>(F: Applicative<F>): (<A>(ta: Tree<HKT<F, A>>) => HKT<F, Tree<A>>) => {
    const traverseF = traverse_(F)
    return (ta) => traverseF(ta, identity)
  },
  extract,
  extend: extend_
}
