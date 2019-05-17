---
title: Tree.ts
nav_order: 89
parent: Modules
---

# Overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

---

<h2 class="text-delta">Table of contents</h2>

- [Tree (interface)](#tree-interface)
- [Forest (type alias)](#forest-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [tree (constant)](#tree-constant)
- [drawForest (function)](#drawforest-function)
- [drawTree (function)](#drawtree-function)
- [elem (function)](#elem-function)
- [getEq (function)](#geteq-function)
- [getShow (function)](#getshow-function)
- [make (function)](#make-function)
- [unfoldForest (function)](#unfoldforest-function)
- [unfoldForestM (function)](#unfoldforestm-function)
- [unfoldTree (function)](#unfoldtree-function)
- [unfoldTreeM (function)](#unfoldtreem-function)

---

# Tree (interface)

**Signature**

```ts
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
```

Added in v2.0.0

# Forest (type alias)

**Signature**

```ts
export type Forest<A> = Array<Tree<A>>
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# tree (constant)

**Signature**

```ts
export const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = ...
```

Added in v2.0.0

# drawForest (function)

Neat 2-dimensional drawing of a forest

**Signature**

```ts
export function drawForest(forest: Forest<string>): string { ... }
```

Added in v2.0.0

# drawTree (function)

Neat 2-dimensional drawing of a tree

**Signature**

```ts
export function drawTree(tree: Tree<string>): string { ... }
```

**Example**

```ts
import { make, drawTree, tree } from 'fp-ts/lib/Tree'

const fa = make('a', [tree.of('b'), tree.of('c'), make('d', [tree.of('e'), tree.of('f')])])

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

Added in v2.0.0

# elem (function)

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean { ... }
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export function getEq<A>(E: Eq<A>): Eq<Tree<A>> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Tree<A>> { ... }
```

Added in v2.0.0

# make (function)

**Signature**

```ts
export function make<A>(value: A, forest: Forest<A> = empty): Tree<A> { ... }
```

Added in v2.0.0

# unfoldForest (function)

Build a tree from a seed value

**Signature**

```ts
export function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> { ... }
```

Added in v2.0.0

# unfoldForestM (function)

Monadic forest builder, in depth-first order

**Signature**

```ts
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
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> { ... }
```

Added in v2.0.0

# unfoldTree (function)

Build a tree from a seed value

**Signature**

```ts
export function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> { ... }
```

Added in v2.0.0

# unfoldTreeM (function)

Monadic tree builder, in depth-first order

**Signature**

```ts
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
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> { ... }
```

Added in v2.0.0
