---
title: EitherT.ts
nav_order: 25
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherT (interface)](#eithert-interface)
- [EitherT1 (interface)](#eithert1-interface)
- [EitherT2 (interface)](#eithert2-interface)
- [fold (function)](#fold-function)
- [getEitherT (function)](#geteithert-function)

---

# EitherT (interface)

**Signature**

```ts
export interface EitherT<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(fa: HKT<F, Either<L, A>>, f: (a: A) => HKT<F, Either<L, B>>) => HKT<F, Either<L, B>>
}
```

# EitherT1 (interface)

**Signature**

```ts
export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(fa: Type<F, Either<L, A>>, f: (a: A) => Type<F, Either<L, B>>) => Type<F, Either<L, B>>
}
```

# EitherT2 (interface)

**Signature**

```ts
export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
  readonly chain: <L, M, A, B>(
    fa: Type2<F, M, Either<L, A>>,
    f: (a: A) => Type2<F, M, Either<L, B>>
  ) => Type2<F, M, Either<L, B>>
}
```

# fold (function)

**Signature**

```ts
export function fold<F extends URIS2>(
  F: Functor2<F>
): <R, L, M, A>(fa: Type2<F, M, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => Type2<F, M, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, L, A>(fa: Type<F, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => Type<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(fa: HKT<F, Either<L, A>>, left: (l: L) => R, right: (a: A) => R) => HKT<F, R> { ... }
```

Added in v1.0.0

# getEitherT (function)

**Signature**

```ts
export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> { ... }
```

Added in v1.14.0
