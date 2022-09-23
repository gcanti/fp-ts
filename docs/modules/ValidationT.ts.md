---
title: ValidationT.ts
nav_order: 118
parent: Modules
---

## ValidationT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [~~ValidationM1~~ (interface)](#validationm1-interface)
  - [~~ValidationM2~~ (interface)](#validationm2-interface)
  - [~~ValidationM~~ (interface)](#validationm-interface)
  - [~~ValidationT1~~ (type alias)](#validationt1-type-alias)
  - [~~ValidationT2~~ (type alias)](#validationt2-type-alias)
  - [~~ValidationT~~ (interface)](#validationt-interface)
  - [~~getValidationM~~](#getvalidationm)

---

# utils

## ~~ValidationM1~~ (interface)

**Signature**

```ts
export interface ValidationM1<M extends URIS, E> extends ApplicativeComposition12C<M, E.URI, E> {
  readonly chain: <A, B>(ma: ValidationT1<M, E, A>, f: (a: A) => ValidationT1<M, E, B>) => ValidationT1<M, E, B>

  readonly alt: <A>(fa: ValidationT1<M, E, A>, that: Lazy<ValidationT1<M, E, A>>) => ValidationT1<M, E, A>
}
```

Added in v2.0.0

## ~~ValidationM2~~ (interface)

**Signature**

```ts
export interface ValidationM2<M extends URIS2, E> extends ApplicativeComposition22C<M, E.URI, E> {
  readonly chain: <R, A, B>(
    ma: ValidationT2<M, R, E, A>,

    f: (a: A) => ValidationT2<M, R, E, B>
  ) => ValidationT2<M, R, E, B>

  readonly alt: <R, A>(fa: ValidationT2<M, R, E, A>, that: Lazy<ValidationT2<M, R, E, A>>) => ValidationT2<M, R, E, A>
}
```

Added in v2.0.0

## ~~ValidationM~~ (interface)

**Signature**

```ts
export interface ValidationM<M, E> extends ApplicativeCompositionHKT2C<M, E.URI, E> {
  readonly chain: <A, B>(ma: ValidationT<M, E, A>, f: (a: A) => ValidationT<M, E, B>) => ValidationT<M, E, B>

  readonly alt: <A>(fa: ValidationT<M, E, A>, that: Lazy<ValidationT<M, E, A>>) => ValidationT<M, E, A>
}
```

Added in v2.0.0

## ~~ValidationT1~~ (type alias)

**Signature**

```ts
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>
```

Added in v2.0.0

## ~~ValidationT2~~ (type alias)

**Signature**

```ts
export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>
```

Added in v2.0.0

## ~~ValidationT~~ (interface)

**Signature**

```ts
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}
```

Added in v2.0.0

## ~~getValidationM~~

Use `EitherT` instead.

**Signature**

```ts
export declare function getValidationM<E, M extends URIS2>(S: Semigroup<E>, M: Monad2<M>): ValidationM2<M, E>
export declare function getValidationM<E, M extends URIS>(S: Semigroup<E>, M: Monad1<M>): ValidationM1<M, E>
export declare function getValidationM<E, M>(S: Semigroup<E>, M: Monad<M>): ValidationM<M, E>
```

Added in v2.0.0
