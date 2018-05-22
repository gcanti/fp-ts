//
// Code for http://www.tomharding.me/2017/05/01/fantas-eel-and-specification-11/
//

import { toString } from '../src/function'

declare module '../src/HKT' {
  interface URI2HKT<A> {
    BTree: BTree<A>
  }
}

export const URI = 'BTree'

export type URI = typeof URI

export class Leaf<A> {
  static value = new Leaf<never>()
  readonly _tag: 'Leaf' = 'Leaf'
  readonly '-A': A
  readonly '-URI' = URI
  private constructor() {}
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `leaf`
  }
}

export class Node<A> {
  readonly _tag: 'Node' = 'Node'
  readonly '-A': A
  readonly '-URI' = URI
  constructor(readonly left: BTree<A>, readonly value: A, readonly right: BTree<A>) {}
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `node(${toString(this.left)}, ${toString(this.value)}, ${toString(this.right)})`
  }
}

export type BTree<A> = Leaf<A> | Node<A>

export const leaf = Leaf.value

export const node = <A>(left: BTree<A>, value: A, right: BTree<A>): BTree<A> => new Node(left, value, right)

export const fold = <A, R>(leaf: () => R, node: (left: BTree<A>, value: A, right: BTree<A>) => R, fa: BTree<A>): R => {
  switch (fa._tag) {
    case 'Leaf':
      return leaf()
    case 'Node':
      return node(fa.left, fa.value, fa.right)
  }
}

const myTree = node(node(leaf, 1, new Node<number>(leaf, 2, leaf)), 3, node(node<number>(leaf, 4, leaf), 5, leaf))

console.log(myTree)
// => node(node(leaf, 1, node(leaf, 2, leaf)), 3, node(node(leaf, 4, leaf), 5, leaf))

export const reduce = <A, B>(fa: BTree<A>, b: B, f: (acc: B, a: A) => B): B =>
  fold(
    () => b,
    (l, v, r) => {
      // Reduce the tree on the left...
      const left = reduce(l, b, f)
      // Plus the middle element...
      const leftAndMiddle = f(left, v)
      // And then the right tree...
      return reduce(r, leftAndMiddle, f)
    },
    fa
  )

console.log(reduce(myTree, 0, (acc, a) => acc + a)) // => 15

import { Foldable1, foldMap } from '../src/Foldable'

export const btree: Foldable1<URI> = {
  URI,
  reduce
}

import { monoidSum } from '../src/Monoid'

console.log(foldMap(btree, monoidSum)(myTree, (a: number) => a)) // => 15
