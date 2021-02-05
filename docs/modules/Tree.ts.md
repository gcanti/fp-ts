---
title: Tree.ts
nav_order: 103
parent: Modules
---

## Tree overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = Array<Tree<A>>
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [make](#make)
  - [unfoldForest](#unfoldforest)
  - [unfoldForestM](#unfoldforestm)
  - [unfoldTree](#unfoldtree)
  - [unfoldTreeM](#unfoldtreem)
- [destructors](#destructors)
  - [fold](#fold)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getShow](#getshow)
  - [~~tree~~](#tree)
- [model](#model)
  - [Forest (type alias)](#forest-type-alias)
  - [Tree (interface)](#tree-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [drawForest](#drawforest)
  - [drawTree](#drawtree)
  - [elem](#elem)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B>
```

Added in v2.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: Tree<A>) => A
```

Added in v2.6.2

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>
```

Added in v2.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Tree<A>
```

Added in v2.7.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Tree<B>) => (first: Tree<A>) => Tree<A>
```

Added in v2.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>>
```

Added in v2.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v2.10.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>
```

Added in v2.0.0

# constructors

## make

**Signature**

```ts
export declare function make<A>(value: A, forest: Forest<A> = A.empty): Tree<A>
```

Added in v2.0.0

## unfoldForest

Build a (possibly infinite) forest from a list of seed values in breadth-first order.

**Signature**

```ts
export declare function unfoldForest<A, B>(bs: Array<B>, f: (b: B) => [A, Array<B>]): Forest<A>
```

Added in v2.0.0

## unfoldForestM

Monadic forest builder, in depth-first order

**Signature**

```ts
export declare function unfoldForestM<M extends URIS4>(
  M: Monad4<M>
): <S, R, E, A, B>(bs: Array<B>, f: (b: B) => Kind4<M, S, R, E, [A, Array<B>]>) => Kind4<M, S, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(bs: Array<B>, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS2>(
  M: Monad2<M>
): <R, E, B>(bs: Array<B>, f: (b: B) => Kind2<M, R, [E, Array<B>]>) => Kind2<M, R, Forest<E>>
export declare function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(bs: Array<B>, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Forest<A>>
export declare function unfoldForestM<M extends URIS>(
  M: Monad1<M>
): <A, B>(bs: Array<B>, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Forest<A>>
export declare function unfoldForestM<M>(
  M: MonadHKT<M>
): <A, B>(bs: Array<B>, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Forest<A>>
```

Added in v2.0.0

## unfoldTree

Build a (possibly infinite) tree from a seed value in breadth-first order.

**Signature**

```ts
export declare function unfoldTree<A, B>(b: B, f: (b: B) => [A, Array<B>]): Tree<A>
```

Added in v2.0.0

## unfoldTreeM

Monadic tree builder, in depth-first order

**Signature**

```ts
export declare function unfoldTreeM<M extends URIS4>(
  M: Monad4<M>
): <S, R, E, A, B>(b: B, f: (b: B) => Kind4<M, S, R, E, [A, Array<B>]>) => Kind4<M, S, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3>(
  M: Monad3<M>
): <R, E, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E>
): <R, A, B>(b: B, f: (b: B) => Kind3<M, R, E, [A, Array<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2>(
  M: Monad2<M>
): <E, A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E>
): <A, B>(b: B, f: (b: B) => Kind2<M, E, [A, Array<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS>(
  M: Monad1<M>
): <A, B>(b: B, f: (b: B) => Kind<M, [A, Array<B>]>) => Kind<M, Tree<A>>
export declare function unfoldTreeM<M>(
  M: MonadHKT<M>
): <A, B>(b: B, f: (b: B) => HKT<M, [A, Array<B>]>) => HKT<M, Tree<A>>
```

Added in v2.0.0

# destructors

## fold

Fold a tree into a "summary" value in depth-first order.

For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.

This is also known as the catamorphism on trees.

**Signature**

```ts
export declare function fold<A, B>(f: (a: A, bs: Array<B>) => B): (tree: Tree<A>) => B
```

**Example**

```ts
import { fold, make } from 'fp-ts/Tree'

const t = make(1, [make(2), make(3)])

const sum = (as: Array<number>) => as.reduce((a, acc) => a + acc, 0)

// Sum the values in a tree:
assert.deepStrictEqual(fold((a: number, bs: Array<number>) => a + sum(bs))(t), 6)

// Find the maximum value in the tree:
assert.deepStrictEqual(fold((a: number, bs: Array<number>) => bs.reduce((b, acc) => Math.max(b, acc), a))(t), 3)

// Count the number of leaves in the tree:
assert.deepStrictEqual(fold((_: number, bs: Array<number>) => (bs.length === 0 ? 1 : sum(bs)))(t), 2)
```

Added in v2.6.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Tree'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Tree'>
```

Added in v2.10.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'Tree'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Tree'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Tree'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Tree'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Tree'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Tree'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Tree'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getEq

**Signature**

```ts
export declare function getEq<A>(E: Eq<A>): Eq<Tree<A>>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare function getShow<A>(S: Show<A>): Show<Tree<A>>
```

Added in v2.0.0

## ~~tree~~

Use small, specific instances instead.

**Signature**

```ts
export declare const tree: Monad1<'Tree'> & Foldable1<'Tree'> & Traversable1<'Tree'> & Comonad1<'Tree'>
```

Added in v2.0.0

# model

## Forest (type alias)

**Signature**

```ts
export type Forest<A> = Array<Tree<A>>
```

Added in v2.0.0

## Tree (interface)

**Signature**

```ts
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: Tree<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (fa: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (ma: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: Tree<A>) => Tree<{ [K in N]: A }>
```

Added in v2.8.0

## drawForest

Neat 2-dimensional drawing of a forest

**Signature**

```ts
export declare function drawForest(forest: Forest<string>): string
```

Added in v2.0.0

## drawTree

Neat 2-dimensional drawing of a tree

**Signature**

```ts
export declare function drawTree(tree: Tree<string>): string
```

**Example**

```ts
import { make, drawTree, tree } from 'fp-ts/Tree'

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

## elem

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): (a: A, fa: Tree<A>) => boolean
```

Added in v2.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Tree'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'Tree'>
```

Added in v2.6.3
