---
title: Writer.ts
nav_order: 110
parent: Modules
---

## Writer overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [pass](#pass)
  - [swap](#swap)
- [constructors](#constructors)
  - [tell](#tell)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Comonad](#comonad)
  - [Composable](#composable)
  - [Foldable](#foldable)
  - [Functor](#functor-1)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getFlattenable](#getflattenable)
  - [getFlattenableRec](#getflattenablerec)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [mapping](#mapping)
  - [flap](#flap)
  - [mapBoth](#mapboth)
- [model](#model)
  - [Writer (type alias)](#writer-type-alias)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverse](#traverse)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [type class operations](#type-class-operations)
  - [compose](#compose)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [extract](#extract)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [type lambdas](#type-lambdas)
  - [WriterFComposable (interface)](#writerfcomposable-interface)
  - [WriterFFix (interface)](#writerffix-interface)
  - [WriterTypeLambda (interface)](#writertypelambda-interface)
- [utils](#utils)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fst](#fst)
  - [snd](#snd)

---

# Bifunctor

## mapLeft

**Signature**

```ts
export declare const mapLeft: <W, X>(f: (w: W) => X) => <A>(self: Writer<W, A>) => Writer<X, A>
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <W>(self: Writer<W, A>) => Writer<W, B>
```

Added in v3.0.0

# combinators

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare const censor: <W>(f: (w: W) => W) => <A>(self: Writer<W, A>) => Writer<W, A>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare const listen: <W, A>(self: Writer<W, A>) => Writer<W, readonly [W, A]>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare const listens: <W, B>(f: (w: W) => B) => <A>(self: Writer<W, A>) => Writer<W, readonly [A, B]>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare const pass: <W, A>(self: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <W, A>(self: Writer<W, A>) => Writer<A, W>
```

Added in v3.0.0

# constructors

## tell

Appends a value to the accumulator

**Signature**

```ts
export declare const tell: <W>(w: W) => Writer<W, void>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<WriterTypeLambda>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<WriterTypeLambda>
```

Added in v3.0.0

## Composable

**Signature**

```ts
export declare const Composable: composable.Composable<WriterFComposable>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<WriterTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<WriterTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<WriterTypeLambda>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(Monoid: Monoid<W>) => applicative.Applicative<WriterFFix<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(Semigroup: Semigroup<W>) => Apply<WriterFFix<W>>
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <W>(S: Semigroup<W>) => Flattenable<WriterFFix<W>>
```

Added in v3.0.0

## getFlattenableRec

**Signature**

```ts
export declare function getFlattenableRec<W>(M: Monoid<W>): FlattenableRec<WriterFFix<W>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad<WriterFFix<W>>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <W>(M: Monoid<W>) => Pointed<WriterFFix<W>>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <W, B>(fab: Writer<W, (a: A) => B>) => Writer<W, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) => (self: Writer<W, A>) => Writer<X, B>
```

Added in v3.0.0

# model

## Writer (type alias)

**Signature**

```ts
export type Writer<W, A> = readonly [W, A]
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: Apply<F>
) => <W, S, R, O, E, A>(self: Writer<W, Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(M))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <W>(
  M: Monoid<W>
) => <A>(arr: readonly Writer<W, A>[]) => Writer<W, readonly A[]>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: Apply<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => <W>(self: Writer<W, A>) => Kind<F, S, R, O, E, Writer<W, B>>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(M))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <W>(
  M: Monoid<W>
) => <A, B>(f: (a: A) => Writer<W, B>) => (as: readonly A[]) => Writer<W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(M))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <W>(
  M: Monoid<W>
) => <A, B>(f: (index: number, a: A) => Writer<W, B>) => (as: readonly A[]) => Writer<W, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(getApply(S))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <W>(
  S: Semigroup<W>
) => <A, B>(f: (a: A) => Writer<W, B>) => (as: readonly [A, ...A[]]) => Writer<W, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(M))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <W>(
  S: Semigroup<W>
) => <A, B>(f: (index: number, a: A) => Writer<W, B>) => (as: readonly [A, ...A[]]) => Writer<W, readonly [B, ...B[]]>
```

Added in v3.0.0

# type class operations

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>) => Writer<A, C>
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <W, A>(self: Writer<W, A>) => Writer<W, Writer<W, A>>
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <W, A, B>(f: (self: Writer<W, A>) => B) => (self: Writer<W, A>) => Writer<W, B>
```

Added in v3.0.0

## extract

**Signature**

```ts
export declare const extract: <W, A>(self: Writer<W, A>) => A
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(_M: Monoid<M>) => <A>(f: (a: A) => M) => <W>(self: Writer<W, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <W>(self: Writer<W, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <W>(self: Writer<W, A>) => B
```

Added in v3.0.0

# type lambdas

## WriterFComposable (interface)

**Signature**

```ts
export interface WriterFComposable extends TypeLambda {
  readonly type: Writer<this['In1'], this['Out1']>
}
```

Added in v3.0.0

## WriterFFix (interface)

**Signature**

```ts
export interface WriterFFix<W> extends TypeLambda {
  readonly type: Writer<W, this['Out1']>
}
```

Added in v3.0.0

## WriterTypeLambda (interface)

**Signature**

```ts
export interface WriterTypeLambda extends TypeLambda {
  readonly type: Writer<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## evaluate

Alias of [`snd`](#snd).

**Signature**

```ts
export declare const evaluate: <W, A>(self: Writer<W, A>) => A
```

Added in v3.0.0

## execute

Alias of [`fst`](#fst).

**Signature**

```ts
export declare const execute: <W, A>(self: Writer<W, A>) => W
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <W>(self: Writer<W, unknown>) => W
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <A>(self: Writer<unknown, A>) => A
```

Added in v3.0.0
