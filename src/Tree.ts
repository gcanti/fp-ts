import { Applicative } from './Applicative'
import { getSetoid as getArraySetoid, traverse as arrayTraverse, empty } from './Array'
import { Comonad1 } from './Comonad'
import { Foldable2v1 } from './Foldable2v'
import { concat, identity, toString } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from './Monad'
import { Monoid } from './Monoid'
import { Setoid, fromEquals } from './Setoid'
import { Traversable2v1 } from './Traversable2v'

declare module './HKT' {
  interface URI2HKT<A> {
    Tree: Tree<A>
  }
}

export const URI = 'Tree'

export type URI = typeof URI

export type Forest<A> = Array<Tree<A>>

/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 *
 * @data
 * @constructor Tree
 * @since 1.6.0
 */
export class Tree<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A, readonly forest: Forest<A>) {}
  map<B>(f: (a: A) => B): Tree<B> {
    return new Tree(f(this.value), this.forest.map(tree => tree.map(f)))
  }
  ap<B>(fab: Tree<(a: A) => B>): Tree<B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  /**
   * Flipped version of {@link ap}
   * @since 1.6.0
   */
  ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => Tree<B>): Tree<B> {
    const { value, forest } = f(this.value)
    return new Tree(value, concat(forest, this.forest.map(t => t.chain(f))))
  }
  extract(): A {
    return this.value
  }
  extend<B>(f: (fa: Tree<A>) => B): Tree<B> {
    return new Tree(f(this), this.forest.map(t => t.extend(f)))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    let r: B = f(b, this.value)
    const len = this.forest.length
    for (let i = 0; i < len; i++) {
      r = this.forest[i].reduce(r, f)
    }
    return r
  }
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `new Tree(${toString(this.value)}, ${toString(this.forest)})`
  }
}

const map = <A, B>(fa: Tree<A>, f: (a: A) => B): Tree<B> => {
  return fa.map(f)
}

const of = <A>(a: A): Tree<A> => {
  return new Tree(a, empty)
}

const ap = <A, B>(fab: Tree<(a: A) => B>, fa: Tree<A>): Tree<B> => {
  return fa.ap(fab)
}

const chain = <A, B>(fa: Tree<A>, f: (a: A) => Tree<B>): Tree<B> => {
  return fa.chain(f)
}

const extract = <A>(fa: Tree<A>): A => {
  return fa.extract()
}

const extend = <A, B>(fa: Tree<A>, f: (fa: Tree<A>) => B): Tree<B> => {
  return fa.extend(f)
}

const reduce = <A, B>(fa: Tree<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>) => <A>(fa: Tree<A>, f: (a: A) => M): M => {
  return fa.reduce(M.empty, (acc, a) => M.concat(acc, f(a)))
}

const foldr = <A, B>(fa: Tree<A>, b: B, f: (a: A, b: B) => B): B => {
  let r: B = b
  const len = fa.forest.length
  for (let i = len - 1; i >= 0; i--) {
    r = foldr(fa.forest[i], r, f)
  }
  return f(fa.value, r)
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>) => HKT<F, Tree<B>> {
  const traverseF = arrayTraverse(F)
  const r = <A, B>(ta: Tree<A>, f: (a: A) => HKT<F, B>): HKT<F, Tree<B>> =>
    F.ap(
      F.map(f(ta.value), (value: B) => (forest: Forest<B>) => new Tree(value, forest)),
      traverseF(ta.forest, t => r(t, f))
    )
  return r
}

function sequence<F>(F: Applicative<F>): <A>(ta: Tree<HKT<F, A>>) => HKT<F, Tree<A>> {
  const traverseF = traverse(F)
  return ta => traverseF(ta, identity)
}

/**
 * @since 1.6.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<Tree<A>> => {
  let SA: Setoid<Array<Tree<A>>>
  const R: Setoid<Tree<A>> = fromEquals((x, y) => S.equals(x.value, y.value) && SA.equals(x.forest, y.forest))
  SA = getArraySetoid(R)
  return R
}

/**
 * @since 1.6.0
 */
export const tree: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr,
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
 * @since 1.6.0
 */
export const drawForest = (forest: Forest<string>): string => {
  return draw('\n', forest)
}

/**
 * Neat 2-dimensional drawing of a tree
 *
 * @example
 * import { Tree, drawTree, tree } from 'fp-ts/lib/Tree'
 *
 * const fa = new Tree('a', [
 *   tree.of('b'),
 *   tree.of('c'),
 *   new Tree('d', [tree.of('e'), tree.of('f')])
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
 * @since 1.6.0
 */
export const drawTree = (tree: Tree<string>): string => {
  return tree.value + drawForest(tree.forest)
}

/**
 * Build a tree from a seed value
 *
 * @since 1.6.0
 */
export const unfoldTree = <A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> => {
  const [a, bs] = f(b)
  return new Tree(a, unfoldForest(bs, f))
}

/**
 * Build a tree from a seed value
 *
 * @since 1.6.0
 */
export const unfoldForest = <A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> => {
  return bs.map(b => unfoldTree(b, f))
}

/**
 * Monadic tree builder, in depth-first order
 *
 * @since 1.6.0
 */
export function unfoldTreeM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(b: B, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Tree<A>>
export function unfoldTreeM<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>
): <A, B>(b: B, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Tree<A>>
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
  return (b, f) => M.chain(f(b), ([a, bs]) => M.chain(unfoldForestMM(bs, f), ts => M.of(new Tree(a, ts))))
}

/**
 * Monadic forest builder, in depth-first order
 *
 * @since 1.6.0
 */
export function unfoldForestM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(bs: Array<B>, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Forest<A>>
export function unfoldForestM<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>
): <A, B>(bs: Array<B>, f: (b: B) => Type3<M, U, L, [A, Array<B>]>) => Type3<M, U, L, Forest<A>>
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
  const traverseM = arrayTraverse(M)
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
 * @since 1.14.0
 */
export function elem<A>(S: Setoid<A>): (a: A, fa: Tree<A>) => boolean {
  const go = (a: A, fa: Tree<A>): boolean => {
    if (S.equals(a, fa.value)) {
      return true
    }
    return fa.forest.some(tree => go(a, tree))
  }
  return go
}
