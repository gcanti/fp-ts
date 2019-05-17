/**
 * @file Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 */
import { Applicative } from './Applicative'
import { array, empty, getEq as getArrayEq, getMonoid } from './Array'
import { Comonad1 } from './Comonad'
import { Eq, fromEquals } from './Eq'
import { Foldable1 } from './Foldable'
import { identity } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1 } from './Traversable'

declare module './HKT' {
  interface URI2HKT<A> {
    Tree: Tree<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Tree'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Forest<A> = Array<Tree<A>>

/**
 * @since 2.0.0
 */
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}

/**
 * @since 2.0.0
 */
export function make<A>(value: A, forest: Forest<A> = empty): Tree<A> {
  return {
    value,
    forest
  }
}

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Tree<A>> {
  const show = (t: Tree<A>): string => {
    return t.forest === empty
      ? `make(${S.show(t.value)})`
      : `make(${S.show(t.value)}, [${t.forest.map(show).join(', ')}])`
  }
  return {
    show
  }
}

const map = <A, B>(fa: Tree<A>, f: (a: A) => B): Tree<B> => {
  return { value: f(fa.value), forest: fa.forest.map(tree => map(tree, f)) }
}

const of = <A>(a: A): Tree<A> => {
  return { value: a, forest: empty }
}

const ap = <A, B>(fab: Tree<(a: A) => B>, fa: Tree<A>): Tree<B> => {
  return chain(fab, f => map(fa, f)) // <- derived
}

const chain = <A, B>(fa: Tree<A>, f: (a: A) => Tree<B>): Tree<B> => {
  const { value, forest } = f(fa.value)
  const concat = getMonoid<Tree<B>>().concat
  return { value, forest: concat(forest, fa.forest.map(t => chain(t, f))) }
}

const extract = <A>(fa: Tree<A>): A => {
  return fa.value
}

const extend = <A, B>(fa: Tree<A>, f: (fa: Tree<A>) => B): Tree<B> => {
  return { value: f(fa), forest: fa.forest.map(t => extend(t, f)) }
}

const reduce = <A, B>(fa: Tree<A>, b: B, f: (b: B, a: A) => B): B => {
  let r: B = f(b, fa.value)
  const len = fa.forest.length
  for (let i = 0; i < len; i++) {
    r = reduce(fa.forest[i], r, f)
  }
  return r
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Tree<A>, f: (a: A) => M): M => {
  return reduce(fa, M.empty, (acc, a) => M.concat(acc, f(a)))
}

const reduceRight = <A, B>(fa: Tree<A>, b: B, f: (a: A, b: B) => B): B => {
  let r: B = b
  const len = fa.forest.length
  for (let i = len - 1; i >= 0; i--) {
    r = reduceRight(fa.forest[i], r, f)
  }
  return f(fa.value, r)
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>) => HKT<F, Tree<B>> {
  const traverseF = array.traverse(F)
  const r = <A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>): HKT<F, Tree<B>> =>
    F.ap(
      F.map(f(ta.value), (value: B) => (forest: Forest<B>) => ({
        value,
        forest
      })),
      traverseF(ta.forest, t => r(t, f))
    )
  return r
}

function sequence<F>(F: Applicative<F>): <A>(ta: Tree<HKT<F, A>>) => HKT<F, Tree<A>> {
  const traverseF = traverse(F)
  return ta => traverseF(ta, identity)
}

/**
 * @since 2.0.0
 */
export function getEq<A>(E: Eq<A>): Eq<Tree<A>> {
  let SA: Eq<Array<Tree<A>>>
  const R: Eq<Tree<A>> = fromEquals((x, y) => E.equals(x.value, y.value) && SA.equals(x.forest, y.forest))
  SA = getArrayEq(R)
  return R
}

/**
 * @since 2.0.0
 */
export const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  traverse,
  sequence,
  extract,
  extend
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
 * @since 2.0.0
 */
export function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> {
  const [a, bs] = f(b)
  return { value: a, forest: unfoldForest(bs, f) }
}

/**
 * Build a tree from a seed value
 *
 * @since 2.0.0
 */
export function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> {
  return bs.map(b => unfoldTree(b, f))
}

/**
 * Monadic tree builder, in depth-first order
 *
 * @since 2.0.0
 */
export function unfoldTreeM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(b: B, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Tree<A>>
export function unfoldTreeM<M extends URIS2>(
  M: Monad2<M>
): <L, A, B>(b: B, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Tree<A>>
export function unfoldTreeM<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A, B>(b: B, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Tree<A>>
export function unfoldTreeM<M extends URIS>(
  M: Monad1<M>
): <A, B>(b: B, f: (b: B) => Type<M, [A, Array<B>]>) => Type<M, Tree<A>>
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> {
  const unfoldForestMM = unfoldForestM(M)
  return (b, f) => M.chain(f(b), ([a, bs]) => M.chain(unfoldForestMM(bs, f), ts => M.of({ value: a, forest: ts })))
}

/**
 * Monadic forest builder, in depth-first order
 *
 * @since 2.0.0
 */
export function unfoldForestM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(bs: Array<B>, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Forest<A>>
export function unfoldForestM<M extends URIS2>(
  M: Monad2<M>
): <L, A, B>(bs: Array<B>, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Forest<A>>
export function unfoldForestM<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A, B>(bs: Array<B>, f: (b: B) => Type2<M, L, [A, Array<B>]>) => Type2<M, L, Forest<A>>
export function unfoldForestM<M extends URIS>(
  M: Monad1<M>
): <A, B>(bs: Array<B>, f: (b: B) => Type<M, [A, Array<B>]>) => Type<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
export function unfoldForestM<M>(
  M: Monad<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> {
  const traverseM = array.traverse(M)
  // to avoid Maximum call stack size exceeded
  let unfoldTree: <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
  return (bs, f) => {
    // tslint:disable-next-line
    if (unfoldTree === undefined) {
      unfoldTree = unfoldTreeM(M)
    }
    return traverseM(bs, b => unfoldTree(b, f))
  }
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean {
  const go = (a: A, fa: Tree<A>): boolean => {
    if (E.equals(a, fa.value)) {
      return true
    }
    return fa.forest.some(tree => go(a, tree))
  }
  return go
}
