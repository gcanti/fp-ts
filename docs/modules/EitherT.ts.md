---
title: EitherT.ts
nav_order: 27
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherM (interface)](#eitherm-interface)
- [EitherM1 (interface)](#eitherm1-interface)
- [EitherM2 (interface)](#eitherm2-interface)
- [EitherT (interface)](#eithert-interface)
- [EitherT1 (type alias)](#eithert1-type-alias)
- [EitherT2 (type alias)](#eithert2-type-alias)
- [getEitherM (function)](#geteitherm-function)

---

# EitherM (interface)

**Signature**

```ts
export interface EitherM<M> extends ApplicativeComposition02<M, URI> {
  readonly chain: <L, A, B>(ma: EitherT<M, L, A>, f: (a: A) => EitherT<M, L, B>) => EitherT<M, L, B>
  readonly alt: <L, A>(fx: EitherT<M, L, A>, f: () => EitherT<M, L, A>) => EitherT<M, L, A>
  readonly fold: <L, A, R>(
    onLeft: (l: L) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>
  ) => (ma: EitherT<M, L, A>) => HKT<M, R>
  readonly bimap: <L, A, N, B>(ma: EitherT<M, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <L, A, N>(ma: EitherT<M, L, A>, f: (l: L) => N) => EitherT<M, N, A>
  readonly getOrElse: <L, A>(f: (l: L) => HKT<M, A>) => (ma: EitherT<M, L, A>) => HKT<M, A>
  readonly orElse: <L, A, N>(f: (l: L) => EitherT<M, N, A>) => (ma: EitherT<M, L, A>) => EitherT<M, N, A>
  readonly swap: <L, A>(ma: EitherT<M, L, A>) => EitherT<M, A, L>
  readonly rightM: <L, A>(ma: HKT<M, A>) => EitherT<M, L, A>
  readonly leftM: <L, A>(ml: HKT<M, L>) => EitherT<M, L, A>
  readonly left: <L, A>(l: L) => EitherT<M, L, A>
  readonly bracket: <L, A, B>(
    acquire: EitherT<M, L, A>,
    use: (a: A) => EitherT<M, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT<M, L, void>
  ) => EitherT<M, L, B>
}
```

Added in v2.0.0

# EitherM1 (interface)

**Signature**

```ts
export interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, URI> {
  readonly chain: <L, A, B>(ma: EitherT1<M, L, A>, f: (a: A) => EitherT1<M, L, B>) => EitherT1<M, L, B>
  readonly alt: <L, A>(fx: EitherT1<M, L, A>, f: () => EitherT1<M, L, A>) => EitherT1<M, L, A>
  readonly fold: <L, A, R>(
    onLeft: (l: L) => Type<M, R>,
    onRight: (a: A) => Type<M, R>
  ) => (ma: EitherT1<M, L, A>) => Type<M, R>
  readonly bimap: <L, A, N, B>(ma: EitherT1<M, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT1<M, N, B>
  readonly mapLeft: <L, A, N>(ma: EitherT1<M, L, A>, f: (l: L) => N) => EitherT1<M, N, A>
  readonly getOrElse: <L, A>(f: (l: L) => Type<M, A>) => (ma: EitherT1<M, L, A>) => Type<M, A>
  readonly orElse: <L, A, N>(f: (l: L) => EitherT1<M, N, A>) => (ma: EitherT1<M, L, A>) => EitherT1<M, N, A>
  readonly swap: <L, A>(ma: EitherT1<M, L, A>) => EitherT1<M, A, L>
  readonly rightM: <L, A>(ma: Type<M, A>) => EitherT1<M, L, A>
  readonly leftM: <L, A>(ml: Type<M, L>) => EitherT1<M, L, A>
  readonly left: <L, A>(l: L) => EitherT1<M, L, A>
  readonly bracket: <L, A, B>(
    acquire: EitherT1<M, L, A>,
    use: (a: A) => EitherT1<M, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT1<M, L, void>
  ) => EitherT1<M, L, B>
}
```

Added in v2.0.0

# EitherM2 (interface)

**Signature**

```ts
export interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, URI> {
  readonly chain: <LM, L, A, B>(ma: EitherT2<M, LM, L, A>, f: (a: A) => EitherT2<M, LM, L, B>) => EitherT2<M, LM, L, B>
  readonly alt: <LM, L, A>(fx: EitherT2<M, LM, L, A>, f: () => EitherT2<M, LM, L, A>) => EitherT2<M, LM, L, A>
  readonly fold: <LM, L, A, R>(
    onLeft: (l: L) => Type2<M, LM, R>,
    onRight: (a: A) => Type2<M, LM, R>
  ) => (ma: EitherT2<M, LM, L, A>) => Type2<M, LM, R>
  readonly bimap: <LM, L, A, N, B>(ma: EitherT2<M, LM, L, A>, f: (l: L) => N, g: (a: A) => B) => EitherT2<M, LM, N, B>
  readonly mapLeft: <LM, L, A, N>(ma: EitherT2<M, LM, L, A>, f: (l: L) => N) => EitherT2<M, LM, N, A>
  readonly getOrElse: <LM, L, A>(f: (l: L) => Type2<M, LM, A>) => (ma: EitherT2<M, LM, L, A>) => Type2<M, LM, A>
  readonly orElse: <LM, L, A, N>(
    f: (l: L) => EitherT2<M, LM, N, A>
  ) => (ma: EitherT2<M, LM, L, A>) => EitherT2<M, LM, N, A>
  readonly swap: <LM, L, A>(ma: EitherT2<M, LM, L, A>) => EitherT2<M, LM, A, L>
  readonly rightM: <LM, L, A>(ma: Type2<M, LM, A>) => EitherT2<M, LM, L, A>
  readonly leftM: <LM, L, A>(ml: Type2<M, LM, L>) => EitherT2<M, LM, L, A>
  readonly left: <LM, L, A>(l: L) => EitherT2<M, LM, L, A>
  readonly bracket: <LM, L, A, B>(
    acquire: EitherT2<M, LM, L, A>,
    use: (a: A) => EitherT2<M, LM, L, B>,
    release: (a: A, e: Either<L, B>) => EitherT2<M, LM, L, void>
  ) => EitherT2<M, LM, L, B>
}
```

Added in v2.0.0

# EitherT (interface)

**Signature**

```ts
export interface EitherT<M, L, A> extends HKT<M, Either<L, A>> {}
```

Added in v2.0.0

# EitherT1 (type alias)

**Signature**

```ts
export type EitherT1<M extends URIS, L, A> = Type<M, Either<L, A>>
```

Added in v2.0.0

# EitherT2 (type alias)

**Signature**

```ts
export type EitherT2<M extends URIS2, LM, L, A> = Type2<M, LM, Either<L, A>>
```

Added in v2.0.0

# getEitherM (function)

**Signature**

```ts
export function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export function getEitherM<M>(M: Monad<M>): EitherM<M> { ... }
```

Added in v2.0.0
