---
title: OptionT.ts
nav_order: 58
parent: Modules
---

## OptionT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [OptionT (interface)](#optiont-interface)
  - [OptionT1 (type alias)](#optiont1-type-alias)
  - [OptionT2 (type alias)](#optiont2-type-alias)
- [utils](#utils)
  - [OptionM (interface)](#optionm-interface)
  - [OptionM1 (interface)](#optionm1-interface)
  - [OptionM2 (interface)](#optionm2-interface)
  - [OptionM2C (interface)](#optionm2c-interface)
  - [getOptionM](#getoptionm)

---

# model

## OptionT (interface)

**Signature**

```ts
export interface OptionT<M, A> extends HKT<M, Option<A>> {}
```

Added in v2.0.0

## OptionT1 (type alias)

**Signature**

```ts
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>
```

Added in v2.0.0

## OptionT2 (type alias)

**Signature**

```ts
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>
```

Added in v2.0.0

# utils

## OptionM (interface)

**Signature**

```ts
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fa: OptionT<M, A>, that: Lazy<OptionT<M, A>>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, R>>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, A>>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}
```

Added in v2.0.0

## OptionM1 (interface)

**Signature**

```ts
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fa: OptionT1<M, A>, that: Lazy<OptionT1<M, A>>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, R>>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, A>>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}
```

Added in v2.0.0

## OptionM2 (interface)

**Signature**

```ts
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}
```

Added in v2.0.0

## OptionM2C (interface)

**Signature**

```ts
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}
```

Added in v2.2.0

## getOptionM

**Signature**

```ts
export declare function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export declare function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
export declare function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export declare function getOptionM<M>(M: Monad<M>): OptionM<M>
```

Added in v2.0.0
