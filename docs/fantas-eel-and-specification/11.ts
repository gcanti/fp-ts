//
// Code for http://www.tomharding.me/2017/05/01/fantas-eel-and-specification-11/
//

import { toString } from '../../src/function'

export const URI = 'BTree'

export type URI = typeof URI

export class Leaf<A> {
  static value = new Leaf<never>()
  public readonly _tag: 'Leaf' = 'Leaf'
  public readonly _A: A
  public readonly _URI = URI
  private constructor() {}
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `leaf`
  }
}

export class Node<A> {
  public readonly _tag: 'Node' = 'Node'
  public readonly _A: A
  public readonly _URI = URI
  constructor(public readonly left: BTree<A>, public readonly value: A, public readonly right: BTree<A>) {}
  inspect(): string {
    return this.toString()
  }
  toString(): string {
    return `node(${toString(this.left)}, ${toString(this.value)}, ${toString(this.right)})`
  }
}

export type BTree<A> = Leaf<A> | Node<A>

export const leaf = Leaf.value

export function node<A>(left: BTree<A>, value: A, right: BTree<A>): BTree<A> {
  return new Node(left, value, right)
}

export function fold<A, R>(leaf: () => R, node: (left: BTree<A>, value: A, right: BTree<A>) => R, fa: BTree<A>): R {
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

function reduce<A, B>(f: (acc: B, a: A) => B, b: B, fa: BTree<A>): B {
  return fold(
    () => b,
    (l, v, r) => {
      // Reduce the tree on the left...
      const left = reduce(f, b, l)
      // Plus the middle element...
      const leftAndMiddle = f(left, v)
      // And then the right tree...
      return reduce(f, leftAndMiddle, r)
    },
    fa
  )
}

console.log(reduce((acc, a) => acc + a, 0, myTree)) // => 15

import { Foldable, foldMap } from '../../src/Foldable'

export const btree: Foldable<URI> = {
  URI,
  reduce
}

import { monoidSum } from '../../src/Monoid'

console.log(foldMap(btree, monoidSum)(a => a, myTree)) // => 15
