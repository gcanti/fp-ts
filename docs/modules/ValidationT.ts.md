---
title: ValidationT.ts
nav_order: 92
parent: Modules
---

# ValidationT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ValidationM (interface)](#validationm-interface)
- [ValidationM1 (interface)](#validationm1-interface)
- [ValidationM2 (interface)](#validationm2-interface)
- [ValidationT (interface)](#validationt-interface)
- [ValidationT1 (type alias)](#validationt1-type-alias)
- [ValidationT2 (type alias)](#validationt2-type-alias)
- [getValidationM (function)](#getvalidationm-function)

---

# ValidationM (interface)

**Signature**

```ts
export interface ValidationM<M, E> extends ApplicativeCompositionHKT2C<M, URI, E> {
  readonly chain: <A, B>(ma: ValidationT<M, E, A>, f: (a: A) => ValidationT<M, E, B>) => ValidationT<M, E, B>
  readonly alt: <A>(fx: ValidationT<M, E, A>, f: () => ValidationT<M, E, A>) => ValidationT<M, E, A>
}
```

Added in v2.0.0

# ValidationM1 (interface)

**Signature**

```ts
export interface ValidationM1<M extends URIS, E> extends ApplicativeComposition12C<M, URI, E> {
  readonly chain: <A, B>(ma: ValidationT1<M, E, A>, f: (a: A) => ValidationT1<M, E, B>) => ValidationT1<M, E, B>
  readonly alt: <A>(fx: ValidationT1<M, E, A>, f: () => ValidationT1<M, E, A>) => ValidationT1<M, E, A>
}
```

Added in v2.0.0

# ValidationM2 (interface)

**Signature**

```ts
export interface ValidationM2<M extends URIS2, E> extends ApplicativeComposition22C<M, URI, E> {
  readonly chain: <R, A, B>(
    ma: ValidationT2<M, R, E, A>,
    f: (a: A) => ValidationT2<M, R, E, B>
  ) => ValidationT2<M, R, E, B>
  readonly alt: <R, A>(fx: ValidationT2<M, R, E, A>, f: () => ValidationT2<M, R, E, A>) => ValidationT2<M, R, E, A>
}
```

Added in v2.0.0

# ValidationT (interface)

**Signature**

```ts
export interface ValidationT<M, E, A> extends HKT<M, Either<E, A>> {}
```

Added in v2.0.0

# ValidationT1 (type alias)

**Signature**

```ts
export type ValidationT1<M extends URIS, E, A> = Kind<M, Either<E, A>>
```

Added in v2.0.0

# ValidationT2 (type alias)

**Signature**

```ts
export type ValidationT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>
```

Added in v2.0.0

# getValidationM (function)

**Signature**

```ts
export function getValidationM<E, M extends URIS2>(S: Semigroup<E>, M: Monad2<M>): ValidationM2<M, E>
export function getValidationM<E, M extends URIS>(S: Semigroup<E>, M: Monad1<M>): ValidationM1<M, E>
export function getValidationM<E, M>(S: Semigroup<E>, M: Monad<M>): ValidationM<M, E> { ... }
```

Added in v2.0.0
