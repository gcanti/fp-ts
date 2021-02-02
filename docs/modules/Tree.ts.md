---
title: Tree.ts
nav_order: 87
parent: Modules
---

## Tree overview

Multi-way trees (aka rose trees) and forests, where a forest is

```ts
type Forest<A> = ReadonlyArray<Tree<A>>
```

Added in v3.0.0

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
- [constructors](#constructors)
  - [make](#make)
  - [unfoldForest](#unfoldforest)
  - [unfoldForestM](#unfoldforestm)
  - [unfoldTree](#unfoldtree)
  - [unfoldTreeM](#unfoldtreem)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
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
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [model](#model)
  - [Forest (interface)](#forest-interface)
  - [Tree (interface)](#tree-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [drawForest](#drawforest)
  - [drawTree](#drawtree)
  - [elem](#elem)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Tree<A>) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B>
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: Tree<A>) => A
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Tree<A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Tree<A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Tree<A>) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Tree<B>) => (ma: Tree<A>) => Tree<B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Tree<A>
```

Added in v3.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(value: A, forest?: Forest<A>) => Tree<A>
```

Added in v3.0.0

## unfoldForest

Build a (possibly infinite) forest from a list of seed values in breadth-first order.

**Signature**

```ts
export declare const unfoldForest: <B, A>(f: (b: B) => readonly [A, readonly B[]]) => (bs: readonly B[]) => Forest<A>
```

Added in v3.0.0

## unfoldForestM

Monadic forest builder, in depth-first order.

**Signature**

```ts
export declare function unfoldForestM<M extends URIS4>(
  M: Monad4<M> & Applicative4<M>
): <B, S, R, E, A>(
  f: (b: B) => Kind4<M, S, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind4<M, S, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <B, R, E, A>(
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <B, R, A>(
  f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind3<M, R, E, Forest<A>>
export declare function unfoldForestM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <B, R, E>(
  f: (b: B) => Kind2<M, R, readonly [E, ReadonlyArray<B>]>
) => (bs: ReadonlyArray<B>) => Kind2<M, R, Forest<E>>
export declare function unfoldForestM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <B, A>(f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => Kind2<M, E, Forest<A>>
export declare function unfoldForestM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <B, A>(f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => Kind<M, Forest<A>>
export declare function unfoldForestM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => (bs: ReadonlyArray<B>) => HKT<M, Forest<A>>
```

Added in v3.0.0

## unfoldTree

Build a (possibly infinite) tree from a seed value in breadth-first order.

**Signature**

```ts
export declare const unfoldTree: <B, A>(f: (b: B) => readonly [A, readonly B[]]) => (b: B) => Tree<A>
```

Added in v3.0.0

## unfoldTreeM

Monadic tree builder, in depth-first order.

**Signature**

```ts
export declare function unfoldTreeM<M extends URIS4>(
  M: Monad4<M> & Applicative4<M>
): <B, S, R, E, A>(b: B, f: (b: B) => Kind4<M, S, R, E, readonly [A, ReadonlyArray<B>]>) => Kind4<M, S, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3>(
  M: Monad3<M> & Applicative3<M>
): <B, R, E, A>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS3, E>(
  M: Monad3C<M, E> & Applicative3C<M, E>
): <B, R, A>(b: B, f: (b: B) => Kind3<M, R, E, readonly [A, ReadonlyArray<B>]>) => Kind3<M, R, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2>(
  M: Monad2<M> & Applicative2<M>
): <B, E, A>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS2, E>(
  M: Monad2C<M, E> & Applicative2C<M, E>
): <B, A>(b: B, f: (b: B) => Kind2<M, E, readonly [A, ReadonlyArray<B>]>) => Kind2<M, E, Tree<A>>
export declare function unfoldTreeM<M extends URIS>(
  M: Monad1<M> & Applicative1<M>
): <B, A>(b: B, f: (b: B) => Kind<M, readonly [A, ReadonlyArray<B>]>) => Kind<M, Tree<A>>
export declare function unfoldTreeM<M>(
  M: Monad_<M> & Applicative_<M>
): <B, A>(b: B, f: (b: B) => HKT<M, readonly [A, ReadonlyArray<B>]>) => HKT<M, Tree<A>>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Tree<B>) => <A>(first: Tree<A>) => Tree<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Tree<B>) => (first: Tree<A>) => Tree<A>
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>
```

Added in v3.0.0

# destructors

## fold

Fold a tree into a "summary" value in depth-first order.

For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.

This is also known as the catamorphism on trees.

**Signature**

```ts
export declare const fold: <A, B>(f: (a: A, bs: readonly B[]) => B) => (tree: Tree<A>) => B
```

**Example**

```ts
import { fold, make } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const t = make(1, [make(2), make(3)])

const sum = (as: ReadonlyArray<number>) => as.reduce((a, acc) => a + acc, 0)

// Sum the values in a tree:
assert.deepStrictEqual(
  pipe(
    t,
    fold((a, bs) => a + sum(bs))
  ),
  6
)

// Find the maximum value in the tree:
assert.deepStrictEqual(
  pipe(
    t,
    fold((a, bs) => bs.reduce((b, acc) => Math.max(b, acc), a))
  ),
  3
)

// Count the number of leaves in the tree:
assert.deepStrictEqual(
  pipe(
    t,
    fold((_, bs) => (bs.length === 0 ? 1 : sum(bs)))
  ),
  2
)
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Tree'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Tree'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'Tree'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Tree'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Tree'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Tree'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Tree'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Tree'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Tree'
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<Tree<A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Tree<A>>
```

Added in v3.0.0

# model

## Forest (interface)

**Signature**

```ts
export interface Forest<A> extends ReadonlyArray<Tree<A>> {}
```

Added in v3.0.0

## Tree (interface)

**Signature**

```ts
export interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Tree<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Tree<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (fa: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: Tree<B>) => <A>(fas: Tree<A>) => Tree<readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (ma: Tree<A>) => Tree<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: Tree<A>) => Tree<{ [K in N]: A }>
```

Added in v3.0.0

## drawForest

Neat 2-dimensional drawing of a forest

**Signature**

```ts
export declare const drawForest: (forest: Forest<string>) => string
```

Added in v3.0.0

## drawTree

Neat 2-dimensional drawing of a tree

**Signature**

```ts
export declare const drawTree: (tree: Tree<string>) => string
```

**Example**

```ts
import { make, drawTree } from 'fp-ts/Tree'

const fa = make('a', [make('b'), make('c'), make('d', [make('e'), make('f')])])

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

Added in v3.0.0

## elem

Tests whether a value is a member of a `Tree`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (fa: Tree<A>) => boolean
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Tree'>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse1<'Tree'>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: Tree<A>) => Tree<readonly [A]>
```

Added in v3.0.0
