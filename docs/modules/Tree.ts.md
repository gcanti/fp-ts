---
title: Tree.ts
nav_order: 95
parent: Modules
---

# Tree overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Tree (interface)](#tree-interface)
- [Forest (type alias)](#forest-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [drawForest](#drawforest)
- [drawTree](#drawtree)
- [duplicate](#duplicate)
- [elem](#elem)
- [extend](#extend)
- [flatten](#flatten)
- [foldMap](#foldmap)
- [getEq](#geteq)
- [getShow](#getshow)
- [make](#make)
- [map](#map)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [tree](#tree)
- [unfoldForest](#unfoldforest)
- [unfoldForestM](#unfoldforestm)
- [unfoldTree](#unfoldtree)
- [unfoldTreeM](#unfoldtreem)

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

# URI

**Signature**

```ts
export const URI: "Tree" = ...
```

Added in v2.0.0

# ap

**Signature**

```ts
<A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<B>(fb: Tree<B>) => <A>(fa: Tree<A>) => Tree<B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<A>
```

Added in v2.0.0

# drawForest

Neat 2-dimensional drawing of a forest

**Signature**

```ts
export function drawForest(forest: Forest<string>): string { ... }
```

Added in v2.0.0

# drawTree

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

# duplicate

**Signature**

```ts
<A>(ma: Tree<A>) => Tree<Tree<A>>
```

Added in v2.0.0

# elem

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean { ... }
```

Added in v2.0.0

# extend

**Signature**

```ts
<A, B>(f: (fa: Tree<A>) => B) => (ma: Tree<A>) => Tree<B>
```

Added in v2.0.0

# flatten

**Signature**

```ts
<A>(mma: Tree<Tree<A>>) => Tree<A>
```

Added in v2.0.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M
```

Added in v2.0.0

# getEq

**Signature**

```ts
export function getEq<A>(E: Eq<A>): Eq<Tree<A>> { ... }
```

Added in v2.0.0

# getShow

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Tree<A>> { ... }
```

Added in v2.0.0

# make

**Signature**

```ts
export function make<A>(value: A, forest: Forest<A> = empty): Tree<A> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
```

Added in v2.0.0

# tree

**Signature**

```ts
export const tree: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI> = ...
```

Added in v2.0.0

# unfoldForest

Build a tree from a seed value

**Signature**

```ts
export function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A> { ... }
```

Added in v2.0.0

# unfoldForestM

Monadic forest builder, in depth-first order

**Signature**

```ts
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
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>> { ... }
```

Added in v2.0.0

# unfoldTree

Build a tree from a seed value

**Signature**

```ts
export function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A> { ... }
```

Added in v2.0.0

# unfoldTreeM

Monadic tree builder, in depth-first order

**Signature**

```ts
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
export function unfoldTreeM<M>(M: Monad<M>): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>> { ... }
```

Added in v2.0.0
