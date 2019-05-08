---
title: EitherT.ts
nav_order: 26
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherM (interface)](#eitherm-interface)
- [EitherT (interface)](#eithert-interface)
- [getEitherM (function)](#geteitherm-function)

---

# EitherM (interface)

**Signature**

```ts
export interface EitherM<M> extends ApplicativeComposition02<M, URI> {
  readonly chain: <L, A, B>(ma: EitherT<M, L, A>, f: (a: A) => EitherT<M, L, B>) => EitherT<M, L, B>
  readonly fold: <L, A, R>(ma: EitherT<M, L, A>, onLeft: (l: L) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly bimap: <L, A, N, B>(ma: EitherT<M, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <L, A, N>(ma: EitherT<M, L, A>, f: (l: L) => N) => EitherT<M, N, A>
  readonly getOrElse: <L, A>(ma: EitherT<M, L, A>, f: (l: L) => HKT<M, A>) => HKT<M, A>
  readonly orElse: <L, A, N>(ma: EitherT<M, L, A>, f: (l: L) => EitherT<M, N, A>) => EitherT<M, N, A>
  readonly swap: <L, A>(ma: EitherT<M, L, A>) => EitherT<M, A, L>
  readonly rightM: <L, A>(ma: HKT<M, A>) => EitherT<M, L, A>
  readonly leftM: <L, A>(ml: HKT<M, L>) => EitherT<M, L, A>
  readonly left: <L, A>(l: L) => EitherT<M, L, A>
}
```

# EitherT (interface)

**Signature**

```ts
export interface EitherT<M, L, A> extends HKT<M, Either<L, A>> {}
```

# getEitherM (function)

**Signature**

```ts
export function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M> { ... }
```

Added in v2.0.0
