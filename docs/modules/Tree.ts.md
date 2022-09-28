---
title: Tree.ts
nav_order: 105
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

- [Extendable](#extendable)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [ap](#ap)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [constructors](#constructors)
  - [make](#make)
  - [unfoldForest](#unfoldforest)
  - [unfoldForestWithEffect](#unfoldforestwitheffect)
  - [unfoldTree](#unfoldtree)
  - [unfoldTreeWithEffect](#unfoldtreewitheffect)
- [destructors](#destructors)
  - [fold](#fold)
- [do notation](#do-notation)
  - [bindT](#bindt)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Comonad](#comonad)
  - [Flattenable](#flattenable)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [model](#model)
  - [Forest (interface)](#forest-interface)
  - [Tree (interface)](#tree-interface)
- [type lambdas](#type-lambdas)
  - [TreeTypeLambda (interface)](#treetypelambda-interface)
- [utils](#utils)
  - [Do](#do)
  - [DoT](#dot)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTPar](#bindtpar)
  - [bindTo](#bindto)
  - [drawForest](#drawforest)
  - [drawTree](#drawtree)
  - [elem](#elem)
  - [exists](#exists)
  - [let](#let)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [sequence](#sequence)
  - [tupled](#tupled)
  - [unit](#unit)

---

# Extendable

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

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Tree<A>
```

Added in v3.0.0

# Traversable

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Tree<A>) => Kind<F, S, R, O, E, Tree<B>>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Tree<A>) => <B>(self: Tree<(a: A) => B>) => Tree<B>
```

Added in v3.0.0

## duplicate

Derivable from `Extendable`.

**Signature**

```ts
export declare const duplicate: <A>(wa: Tree<A>) => Tree<Tree<A>>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Tree<(a: A) => B>) => Tree<B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Tree<B>) => (self: Tree<A>) => Tree<B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <A>(mma: Tree<Tree<A>>) => Tree<A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: <B>(second: Tree<B>) => <A>(self: Tree<A>) => Tree<A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <B>(second: Tree<B>) => <A>(self: Tree<A>) => Tree<B>
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

## unfoldForestWithEffect

Monadic forest builder, in depth-first order.

**Signature**

```ts
export declare const unfoldForestWithEffect: <M extends TypeLambda>(
  M: monad.Monad<M>,
  A: applicative.Applicative<M>
) => <B, S, R, O, E, A>(
  f: (b: B) => Kind<M, S, R, O, E, readonly [A, readonly B[]]>
) => (bs: readonly B[]) => Kind<M, S, R, O, E, Forest<A>>
```

Added in v3.0.0

## unfoldTree

Build a (possibly infinite) tree from a seed value in breadth-first order.

**Signature**

```ts
export declare const unfoldTree: <B, A>(f: (b: B) => readonly [A, readonly B[]]) => (b: B) => Tree<A>
```

Added in v3.0.0

## unfoldTreeWithEffect

Monadic tree builder, in depth-first order.

**Signature**

```ts
export declare const unfoldTreeWithEffect: <M extends TypeLambda>(
  M: monad.Monad<M>,
  A: applicative.Applicative<M>
) => <B, S, R, O, E, A>(
  f: (b: B) => Kind<M, S, R, O, E, readonly [A, readonly B[]]>
) => (b: B) => Kind<M, S, R, O, E, Tree<A>>
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
import * as N from 'fp-ts/number'
import { combineAll } from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'
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

# do notation

## bindT

**Signature**

```ts
export declare const bindT: <A extends readonly unknown[], B>(
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<readonly [...A, B]>
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

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<TreeTypeLambda>
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

# type lambdas

## TreeTypeLambda (interface)

**Signature**

```ts
export interface TreeTypeLambda extends TypeLambda {
  readonly type: Tree<this['Out1']>
}
```

Added in v3.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: Tree<{}>
```

Added in v3.0.0

## DoT

**Signature**

```ts
export declare const DoT: Tree<readonly []>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Tree<B>
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTPar

**Signature**

```ts
export declare const bindTPar: <B>(
  fb: Tree<B>
) => <A extends readonly unknown[]>(self: Tree<A>) => Tree<readonly [...A, B]>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Tree<A>) => Tree<{ readonly [K in N]: A }>
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

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Tree<A>) => Tree<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

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

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <S, R, O, E, A>(self: Tree<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Tree<A>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Tree<A>) => Tree<readonly [A]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: Tree<void>
```

Added in v3.0.0
