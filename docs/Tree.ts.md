---
title: Tree.ts
nav_order: 90
---

# Overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Forest](#forest)
- [URI](#uri)
- [Tree](#tree)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [extract](#extract)
  - [extend](#extend)
  - [reduce](#reduce)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [tree](#tree)
- [drawForest](#drawforest)
- [drawTree](#drawtree)
- [elem](#elem)
- [getSetoid](#getsetoid)
- [unfoldForest](#unfoldforest)
- [unfoldForestM](#unfoldforestm)
- [unfoldTree](#unfoldtree)
- [unfoldTreeM](#unfoldtreem)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Forest

**Signature** (type alias)

```ts
export type Forest<A> = Array<Tree<A>>
```

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Tree

**Signature** (class)

```ts
export class Tree<A> {
  constructor(readonly value: A, readonly forest: Forest<A>) { ... }
  ...
}
```

Added in v1.6.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Tree<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Tree<(a: A) => B>): Tree<B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C> { ... }
```

Added in v1.6.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Tree<B>): Tree<B> { ... }
```

## extract

**Signature** (method)

```ts
extract(): A { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (fa: Tree<A>) => B): Tree<B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# tree

**Signature** (constant)

```ts
export const tree: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.6.0

# drawForest

Neat 2-dimensional drawing of a forest

**Signature** (function)

```ts
export const drawForest = (forest: Forest<string>): string => ...
```

Added in v1.6.0

# drawTree

Neat 2-dimensional drawing of a tree

**Signature** (function)

```ts
export const drawTree = (tree: Tree<string>): string => ...
```

**Example**

```ts
import { Tree, drawTree, tree } from 'fp-ts/lib/Tree'

const fa = new Tree('a', [tree.of('b'), tree.of('c'), new Tree('d', [tree.of('e'), tree.of('f')])])

assert.strictEqual(
  drawTree(fa),
  `a
├─ b
├─ c
└─ d
   ├─ e
   └─ f`
)
```

Added in v1.6.0

# elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: Tree<A>) => boolean { ... }
```

Added in v1.14.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Tree<A>> => ...
```

Added in v1.6.0

# unfoldForest

Build a tree from a seed value

**Signature** (function)

```ts
export const unfoldForest = <A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> => ...
```

Added in v1.6.0

# unfoldForestM

Monadic forest builder, in depth-first order

**Signature** (function)

```ts
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
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> { ... }
```

Added in v1.6.0

# unfoldTree

Build a tree from a seed value

**Signature** (function)

```ts
export const unfoldTree = <A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> => ...
```

Added in v1.6.0

# unfoldTreeM

Monadic tree builder, in depth-first order

**Signature** (function)

```ts
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
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> { ... }
```

Added in v1.6.0
