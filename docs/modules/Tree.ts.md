---
title: Tree.ts
nav_order: 96
parent: Modules
---

# Overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

---

<h2 class="text-delta">Table of contents</h2>

- [Forest (type alias)](#forest-type-alias)
- [URI (type alias)](#uri-type-alias)
- [Tree (class)](#tree-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [extract (method)](#extract-method)
  - [extend (method)](#extend-method)
  - [reduce (method)](#reduce-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [tree (constant)](#tree-constant)
- [drawForest (function)](#drawforest-function)
- [drawTree (function)](#drawtree-function)
- [elem (function)](#elem-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [make (function)](#make-function)
- [unfoldForest (function)](#unfoldforest-function)
- [unfoldForestM (function)](#unfoldforestm-function)
- [unfoldTree (function)](#unfoldtree-function)
- [unfoldTreeM (function)](#unfoldtreem-function)

---

# Forest (type alias)

**Signature**

```ts
export type Forest<A> = Array<Tree<A>>
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Tree (class)

**Signature**

```ts
export class Tree<A> {
  constructor(readonly value: A, readonly forest: Forest<A>) { ... }
  ...
}
```

Added in v1.6.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Tree<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Tree<(a: A) => B>): Tree<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Tree<(b: B) => C>, fb: Tree<B>): Tree<C> { ... }
```

Added in v1.6.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Tree<B>): Tree<B> { ... }
```

## extract (method)

**Signature**

```ts
extract(): A { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (fa: Tree<A>) => B): Tree<B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# tree (constant)

**Signature**

```ts
export const tree: Monad1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.6.0

# drawForest (function)

Neat 2-dimensional drawing of a forest

**Signature**

```ts
export const drawForest = (forest: Forest<string>): string => ...
```

Added in v1.6.0

# drawTree (function)

Neat 2-dimensional drawing of a tree

**Signature**

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

# elem (function)

**Signature**

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: Tree<A>) => boolean { ... }
```

Added in v1.14.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Tree<A>> => ...
```

Added in v1.6.0

# getShow (function)

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Tree<A>> { ... }
```

Added in v1.17.0

# make (function)

**Signature**

```ts
export function make<A>(a: A, forest: Forest<A> = empty): Tree<A> { ... }
```

Added in v1.19.0

# unfoldForest (function)

Build a tree from a seed value

**Signature**

```ts
export const unfoldForest = <A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> => ...
```

Added in v1.6.0

# unfoldForestM (function)

Monadic forest builder, in depth-first order

**Signature**

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
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> { ... }
```

Added in v1.6.0

# unfoldTree (function)

Build a tree from a seed value

**Signature**

```ts
export const unfoldTree = <A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> => ...
```

Added in v1.6.0

# unfoldTreeM (function)

Monadic tree builder, in depth-first order

**Signature**

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
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> { ... }
```

Added in v1.6.0
