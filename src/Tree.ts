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
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { pipeable } from './pipeable'

// tslint:disable:readonly-array

declare module './HKT' {
  interface URItoKind<A> {
    readonly Tree: Tree<A>
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
    return t.forest === empty || t.forest.length === 0
      ? `make(${S.show(t.value)})`
      : `make(${S.show(t.value)}, [${t.forest.map(show).join(', ')}])`
  }
  return {
    show
  }
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
  return (b, f) => M.chain(f(b), ([a, bs]) => M.chain(unfoldForestMM(bs, f), ts => M.of({ value: a, forest: ts })))
}

/**
 * Monadic forest builder, in depth-first order
 *
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
  return (bs, f) => traverseM(bs, b => unfoldTreeM(M)(b, f))
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

/**
 * @since 2.0.0
 */
export const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = {
  URI,
  map: (fa, f) => ({
    value: f(fa.value),
    forest: fa.forest.map(t => tree.map(t, f))
  }),
  of: a => ({
    value: a,
    forest: empty
  }),
  ap: (fab, fa) => tree.chain(fab, f => tree.map(fa, f)),
  chain: <A, B>(fa: Tree<A>, f: (a: A) => Tree<B>): Tree<B> => {
    const { value, forest } = f(fa.value)
    const concat = getMonoid<Tree<B>>().concat
    return {
      value,
      forest: concat(
        forest,
        fa.forest.map(t => tree.chain(t, f))
      )
    }
  },
  reduce: <A, B>(fa: Tree<A>, b: B, f: (b: B, a: A) => B): B => {
    let r: B = f(b, fa.value)
    const len = fa.forest.length
    for (let i = 0; i < len; i++) {
      r = tree.reduce(fa.forest[i], r, f)
    }
    return r
  },
  foldMap: M => (fa, f) => tree.reduce(fa, M.empty, (acc, a) => M.concat(acc, f(a))),
  reduceRight: <A, B>(fa: Tree<A>, b: B, f: (a: A, b: B) => B): B => {
    let r: B = b
    const len = fa.forest.length
    for (let i = len - 1; i >= 0; i--) {
      r = tree.reduceRight(fa.forest[i], r, f)
    }
    return f(fa.value, r)
  },
  traverse: <F>(F: Applicative<F>): (<A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>) => HKT<F, Tree<B>>) => {
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
  },
  sequence: <F>(F: Applicative<F>): (<A>(ta: Tree<HKT<F, A>>) => HKT<F, Tree<A>>) => {
    const traverseF = tree.traverse(F)
    return ta => traverseF(ta, identity)
  },
  extract: wa => wa.value,
  extend: (wa, f) => ({
    value: f(wa),
    forest: wa.forest.map(t => tree.extend(t, f))
  })
}

const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  duplicate,
  extend,
  flatten,
  foldMap,
  map,
  reduce,
  reduceRight
} = pipeable(tree)

export {
  /**
   * @since 2.0.0
   */
  ap,
  /**
   * @since 2.0.0
   */
  apFirst,
  /**
   * @since 2.0.0
   */
  apSecond,
  /**
   * @since 2.0.0
   */
  chain,
  /**
   * @since 2.0.0
   */
  chainFirst,
  /**
   * @since 2.0.0
   */
  duplicate,
  /**
   * @since 2.0.0
   */
  extend,
  /**
   * @since 2.0.0
   */
  flatten,
  /**
   * @since 2.0.0
   */
  foldMap,
  /**
   * @since 2.0.0
   */
  map,
  /**
   * @since 2.0.0
   */
  reduce,
  /**
   * @since 2.0.0
   */
  reduceRight
}
