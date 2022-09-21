---
title: Writer.ts
nav_order: 110
parent: Modules
---

## Writer overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [HKT](#hkt)
  - [WriterF (interface)](#writerf-interface)
  - [WriterFContravariant (interface)](#writerfcontravariant-interface)
  - [WriterFFixedW (interface)](#writerffixedw-interface)
- [combinators](#combinators)
  - [censor](#censor)
  - [flap](#flap)
  - [listen](#listen)
  - [listens](#listens)
  - [pass](#pass)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromIdentity](#fromidentity)
  - [tell](#tell)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Comonad](#comonad)
  - [Composable](#composable)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getFlat](#getflat)
  - [getFlatRec](#getflatrec)
  - [getMonad](#getmonad)
  - [getPointed](#getpointed)
- [model](#model)
  - [Writer (type alias)](#writer-type-alias)
- [type class operations](#type-class-operations)
  - [bimap](#bimap)
  - [compose](#compose)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [extract](#extract)
  - [foldMap](#foldmap)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [traverse](#traverse)
- [utils](#utils)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fst](#fst)
  - [mapFst](#mapfst)
  - [mapSnd](#mapsnd)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [snd](#snd)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)

---

# HKT

## WriterF (interface)

**Signature**

```ts
export interface WriterF extends HKT {
  readonly type: Writer<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## WriterFContravariant (interface)

**Signature**

```ts
export interface WriterFContravariant extends HKT {
  readonly type: Writer<this['Contravariant1'], this['Covariant1']>
}
```

Added in v3.0.0

## WriterFFixedW (interface)

**Signature**

```ts
export interface WriterFFixedW<W> extends HKT {
  readonly type: Writer<W, this['Covariant1']>
}
```

Added in v3.0.0

# combinators

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <W, B>(fab: Writer<W, (a: A) => B>) => Writer<W, B>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <W, A>(t: Writer<W, A>) => Writer<A, W>
```

Added in v3.0.0

# constructors

## fromIdentity

**Signature**

```ts
export declare const fromIdentity: <W>(w: W) => <A>(a: A) => Writer<W, A>
```

Added in v3.0.0

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
export declare const Bifunctor: bifunctor.Bifunctor<WriterF>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<WriterF>
```

Added in v3.0.0

## Composable

**Signature**

```ts
export declare const Composable: composable.Composable<WriterFContravariant>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<WriterF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<WriterF>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<WriterF>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(M: Monoid<W>) => applicative.Applicative<WriterFFixedW<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(S: Semigroup<W>) => Apply<WriterFFixedW<W>>
```

Added in v3.0.0

## getFlat

**Signature**

```ts
export declare const getFlat: <W>(S: Semigroup<W>) => Flat<WriterFFixedW<W>>
```

Added in v3.0.0

## getFlatRec

**Signature**

```ts
export declare function getFlatRec<W>(M: Monoid<W>): FlatRec<WriterFFixedW<W>>
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <W>(M: Monoid<W>) => Monad<WriterFFixedW<W>>
```

Added in v3.0.0

## getPointed

**Signature**

```ts
export declare const getPointed: <W>(M: Monoid<W>) => Pointed<WriterFFixedW<W>>
```

Added in v3.0.0

# model

## Writer (type alias)

**Signature**

```ts
export type Writer<W, A> = readonly [A, W]
```

Added in v3.0.0

# type class operations

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <W, X, A, B>(mapSnd: (w: W) => X, mapFst: (a: A) => B) => (t: Writer<W, A>) => Writer<X, B>
```

Added in v3.0.0

## compose

**Signature**

```ts
export declare const compose: <B, C>(bc: Writer<B, C>) => <A>(ab: Writer<A, B>) => Writer<A, C>
```

Added in v3.0.0

## duplicate

Derivable from `Extendable`.

**Signature**

```ts
export declare const duplicate: <W, A>(t: Writer<W, A>) => Writer<W, Writer<W, A>>
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <W, A, B>(f: (wa: Writer<W, A>) => B) => (wa: Writer<W, A>) => Writer<W, B>
```

Added in v3.0.0

## extract

**Signature**

```ts
export declare const extract: <W, A>(wa: Writer<W, A>) => A
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <W>(fa: Writer<W, A>) => M
```

Added in v3.0.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <W>(fa: Writer<W, A>) => Writer<W, B>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <W, X>(f: (w: W) => X) => <A>(fea: Writer<W, A>) => Writer<X, A>
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <W>(fa: Writer<W, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <W>(fa: Writer<W, A>) => B
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends HKT>(
  F: Apply<F>
) => <A, S, R, FW, E, B>(
  f: (a: A) => Kind<F, S, R, FW, E, B>
) => <W>(t: Writer<W, A>) => Kind<F, S, R, FW, E, Writer<W, B>>
```

Added in v3.0.0

# utils

## evaluate

Alias of [`fst`](#fst).

**Signature**

```ts
export declare const evaluate: <W, A>(fa: Writer<W, A>) => A
```

Added in v3.0.0

## execute

Alias of [`snd`](#snd).

**Signature**

```ts
export declare const execute: <W, A>(fa: Writer<W, A>) => W
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <W, A>(t: Writer<W, A>) => A
```

Added in v3.0.0

## mapFst

Maps a function over the first component of a `Writer`.

Alias of [`map`](#map)

**Signature**

```ts
export declare const mapFst: <A, B>(f: (a: A) => B) => <W>(fa: Writer<W, A>) => Writer<W, B>
```

Added in v3.0.0

## mapSnd

Maps a function over the second component of a `Writer`.

Alias of [`mapLeft`](#mapleft)

**Signature**

```ts
export declare const mapSnd: <W, X>(f: (w: W) => X) => <A>(fea: Writer<W, A>) => Writer<X, A>
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <F extends HKT>(
  F: Apply<F>
) => <W, FS, FR, FW, FE, A>(fa: Writer<W, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, Writer<W, A>>
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

## snd

**Signature**

```ts
export declare const snd: <W, A>(t: Writer<W, A>) => W
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
) => <A, B>(
  f: (a: A) => Writer<W, B>
) => (
  as: readonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<A>
) => Writer<W, readonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(getApply(M))`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <W>(
  S: Semigroup<W>
) => <A, B>(
  f: (index: number, a: A) => Writer<W, B>
) => (
  as: readonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<A>
) => Writer<W, readonlyNonEmptyArrayModule.ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0
