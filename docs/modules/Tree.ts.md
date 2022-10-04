---
title: Tree.ts
nav_order: 106
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

- [Extract](#extract)
  - [extract](#extract)
- [constructors](#constructors)
  - [make](#make)
  - [of](#of)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [Comonad](#comonad)
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [Traversable](#traversable)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [Forest (interface)](#forest-interface)
  - [NonEmptyForest (type alias)](#nonemptyforest-type-alias)
  - [Tree (interface)](#tree-interface)
- [pattern matching](#pattern-matching)
  - [fold](#fold)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [TreeTypeLambda (interface)](#treetypelambda-interface)
- [unfolding](#unfolding)
  - [unfoldForest](#unfoldforest)
  - [unfoldForestKind](#unfoldforestkind)
  - [unfoldNonEmptyForest](#unfoldnonemptyforest)
  - [unfoldNonEmptyForestKind](#unfoldnonemptyforestkind)
  - [unfoldTree](#unfoldtree)
  - [unfoldTreeKind](#unfoldtreekind)
- [utils](#utils)
  - [ap](#ap)
  - [composeKind](#composekind)
  - [drawForest](#drawforest)
  - [drawTree](#drawtree)
  - [duplicate](#duplicate)
  - [elem](#elem)
  - [exists](#exists)
  - [extend](#extend)
  - [flatten](#flatten)
  - [idKind](#idkind)

---

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: Tree<A>) => A
```

Added in v3.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(value: A, forest?: Forest<A>) => Tree<A>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Tree<A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Tree<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Tree<A>) => Tree<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# folding

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

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<TreeTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<TreeTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<TreeTypeLambda>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<TreeTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<TreeTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<TreeTypeLambda>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<TreeTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TreeTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<TreeTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TreeTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<TreeTypeLambda>
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

# lifting

## lift2

Lifts a binary function into `Tree`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Tree<A>, fb: Tree<B>) => Tree<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Tree`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Tree<A>, fb: Tree<B>, fc: Tree<C>) => Tree<D>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: Tree<unknown>) => Tree<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v3.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Tree<A>) => Tree<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: Tree<unknown>) => Tree<void>
```

Added in v3.0.0

# model

## Forest (interface)

**Signature**

```ts
export interface Forest<A> extends ReadonlyArray<Tree<A>> {}
```

Added in v3.0.0

## NonEmptyForest (type alias)

**Signature**

```ts
export type NonEmptyForest<A> = ReadonlyNonEmptyArray<Tree<A>>
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

# pattern matching

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
import * as N from 'fp-ts/number'
import { combineAll } from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/Function'
import { isEmpty } from 'fp-ts/ReadonlyArray'

const tree = make(1, [make(2), make(3)])

const sum = combineAll(N.MonoidSum)

assert.deepStrictEqual(
  pipe(
    tree,
    fold((a, bs) => a + sum(bs))
  ),
  6
)
assert.deepStrictEqual(
  pipe(
    tree,
    fold((a, bs) => bs.reduce((b, acc) => Math.max(b, acc), a))
  ),
  3
)
assert.deepStrictEqual(
  pipe(
    tree,
    fold((_, bs) => (isEmpty(bs) ? 1 : sum(bs)))
  ),
  2
)
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Tree<B>) => (self: Tree<A>) => Tree<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <_>(that: Tree<_>) => <A>(self: Tree<A>) => Tree<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: Tree<A>) => <_>(self: Tree<_>) => Tree<A>
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <S, R, O, E, A>(self: Tree<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Tree<A>>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Tree<A>) => Kind<F, S, R, O, E, Tree<B>>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Tree<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Tree<A>) => Tree<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: Tree<B>
) => <A extends readonly unknown[]>(self: Tree<A>) => Tree<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: Tree<B>, f: (a: A, b: B) => C) => (self: Tree<A>) => Tree<C>
```

Added in v3.0.0

# type lambdas

## TreeTypeLambda (interface)

**Signature**

```ts
export interface TreeTypeLambda extends TypeLambda {
  readonly type: Tree<this['Out1']>
}
```

Added in v3.0.0

# unfolding

## unfoldForest

Build a (possibly infinite) forest from a `ReadonlyArray` of seed values in breadth-first order.

**Signature**

```ts
export declare const unfoldForest: <B, A>(f: (b: B) => readonly [A, readonly B[]]) => (bs: readonly B[]) => Forest<A>
```

Added in v3.0.0

## unfoldForestKind

Monadic forest builder, in depth-first order.

**Signature**

```ts
export declare const unfoldForestKind: <F extends TypeLambda>(
  Monad: monad.Monad<F>,
  Apply: apply.Apply<F>
) => <B, S, R, O, E, A>(
  f: (b: B) => Kind<F, S, R, O, E, readonly [A, readonly B[]]>
) => (bs: readonly B[]) => Kind<F, S, R, O, E, Forest<A>>
```

Added in v3.0.0

## unfoldNonEmptyForest

Build a (possibly infinite) forest from a `ReadonlyNonEmptyArray` of seed values in breadth-first order.

**Signature**

```ts
export declare const unfoldNonEmptyForest: <B, A>(
  f: (b: B) => readonly [A, readonly B[]]
) => (bs: readonly [B, ...B[]]) => readonly [Tree<A>, ...Tree<A>[]]
```

Added in v3.0.0

## unfoldNonEmptyForestKind

Monadic non empty forest builder, in depth-first order.

**Signature**

```ts
export declare const unfoldNonEmptyForestKind: <F extends TypeLambda>(
  Monad: monad.Monad<F>,
  Apply: apply.Apply<F>
) => <B, S, R, O, E, A>(
  f: (b: B) => Kind<F, S, R, O, E, readonly [A, readonly B[]]>
) => (bs: readonly [B, ...B[]]) => Kind<F, S, R, O, E, readonly [Tree<A>, ...Tree<A>[]]>
```

Added in v3.0.0

## unfoldTree

Build a (possibly infinite) tree from a seed value in breadth-first order.

**Signature**

```ts
export declare const unfoldTree: <B, A>(f: (b: B) => readonly [A, readonly B[]]) => (b: B) => Tree<A>
```

Added in v3.0.0

## unfoldTreeKind

Monadic tree builder, in depth-first order.

**Signature**

```ts
export declare const unfoldTreeKind: <F extends TypeLambda>(
  Monad: monad.Monad<F>,
  Apply: apply.Apply<F>
) => <B, S, R, O, E, A>(
  f: (b: B) => Kind<F, S, R, O, E, readonly [A, readonly B[]]>
) => (b: B) => Kind<F, S, R, O, E, Tree<A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Tree<A>) => <B>(self: Tree<(a: A) => B>) => Tree<B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, C>(bfc: (b: B) => Tree<C>) => <A>(afb: (a: A) => Tree<B>) => (a: A) => Tree<C>
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

const tree = make('a', [make('b'), make('c'), make('d', [make('e'), make('f')])])

assert.strictEqual(
  drawTree(tree),
  `a
├─ b
├─ c
└─ d
   ├─ e
   └─ f`
)
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Tree`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (fa: Tree<A>) => boolean
```

Added in v3.0.0

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Tree<A>) => boolean
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Tree<A>) => B) => (wa: Tree<A>) => Tree<B>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => Tree<A>
```

Added in v3.0.0
