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
  readonly chain: <E, A, B>(ma: EitherT<M, E, A>, f: (a: A) => EitherT<M, E, B>) => EitherT<M, E, B>
  readonly alt: <E, A>(fx: EitherT<M, E, A>, f: () => EitherT<M, E, A>) => EitherT<M, E, A>
  readonly fold: <E, A, R>(
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>
  ) => (ma: EitherT<M, E, A>) => HKT<M, R>
  readonly bimap: <E, A, N, B>(ma: EitherT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT<M, E, A>, f: (e: E) => N) => EitherT<M, N, A>
  readonly getOrElse: <E, A>(f: (e: E) => HKT<M, A>) => (ma: EitherT<M, E, A>) => HKT<M, A>
  readonly orElse: <E, A, N>(f: (e: E) => EitherT<M, N, A>) => (ma: EitherT<M, E, A>) => EitherT<M, N, A>
  readonly swap: <E, A>(ma: EitherT<M, E, A>) => EitherT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => EitherT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => EitherT<M, E, A>
  readonly left: <E, A>(e: E) => EitherT<M, E, A>
  readonly bracket: <E, A, B>(
    acquire: EitherT<M, E, A>,
    use: (a: A) => EitherT<M, E, B>,
    release: (a: A, e: Either<E, B>) => EitherT<M, E, void>
  ) => EitherT<M, E, B>
}
```

Added in v2.0.0

# EitherM1 (interface)

**Signature**

```ts
export interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, URI> {
  readonly chain: <E, A, B>(ma: EitherT1<M, E, A>, f: (a: A) => EitherT1<M, E, B>) => EitherT1<M, E, B>
  readonly alt: <E, A>(fx: EitherT1<M, E, A>, f: () => EitherT1<M, E, A>) => EitherT1<M, E, A>
  readonly fold: <E, A, R>(
    onLeft: (e: E) => Type<M, R>,
    onRight: (a: A) => Type<M, R>
  ) => (ma: EitherT1<M, E, A>) => Type<M, R>
  readonly bimap: <E, A, N, B>(ma: EitherT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT1<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT1<M, E, A>, f: (e: E) => N) => EitherT1<M, N, A>
  readonly getOrElse: <E, A>(f: (e: E) => Type<M, A>) => (ma: EitherT1<M, E, A>) => Type<M, A>
  readonly orElse: <E, A, N>(f: (e: E) => EitherT1<M, N, A>) => (ma: EitherT1<M, E, A>) => EitherT1<M, N, A>
  readonly swap: <E, A>(ma: EitherT1<M, E, A>) => EitherT1<M, A, E>
  readonly rightM: <E, A>(ma: Type<M, A>) => EitherT1<M, E, A>
  readonly leftM: <E, A>(me: Type<M, E>) => EitherT1<M, E, A>
  readonly left: <E, A>(e: E) => EitherT1<M, E, A>
  readonly bracket: <E, A, B>(
    acquire: EitherT1<M, E, A>,
    use: (a: A) => EitherT1<M, E, B>,
    release: (a: A, e: Either<E, B>) => EitherT1<M, E, void>
  ) => EitherT1<M, E, B>
}
```

Added in v2.0.0

# EitherM2 (interface)

**Signature**

```ts
export interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, URI> {
  readonly chain: <L, E, A, B>(ma: EitherT2<M, L, E, A>, f: (a: A) => EitherT2<M, L, E, B>) => EitherT2<M, L, E, B>
  readonly alt: <L, E, A>(fx: EitherT2<M, L, E, A>, f: () => EitherT2<M, L, E, A>) => EitherT2<M, L, E, A>
  readonly fold: <L, E, A, R>(
    onLeft: (e: E) => Type2<M, L, R>,
    onRight: (a: A) => Type2<M, L, R>
  ) => (ma: EitherT2<M, L, E, A>) => Type2<M, L, R>
  readonly bimap: <L, E, A, N, B>(ma: EitherT2<M, L, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT2<M, L, N, B>
  readonly mapLeft: <L, E, A, N>(ma: EitherT2<M, L, E, A>, f: (e: E) => N) => EitherT2<M, L, N, A>
  readonly getOrElse: <L, E, A>(f: (e: E) => Type2<M, L, A>) => (ma: EitherT2<M, L, E, A>) => Type2<M, L, A>
  readonly orElse: <L, E, A, N>(f: (e: E) => EitherT2<M, L, N, A>) => (ma: EitherT2<M, L, E, A>) => EitherT2<M, L, N, A>
  readonly swap: <L, E, A>(ma: EitherT2<M, L, E, A>) => EitherT2<M, L, A, E>
  readonly rightM: <L, E, A>(ma: Type2<M, L, A>) => EitherT2<M, L, E, A>
  readonly leftM: <L, E, A>(me: Type2<M, L, E>) => EitherT2<M, L, E, A>
  readonly left: <L, E, A>(e: E) => EitherT2<M, L, E, A>
  readonly bracket: <L, E, A, B>(
    acquire: EitherT2<M, L, E, A>,
    use: (a: A) => EitherT2<M, L, E, B>,
    release: (a: A, e: Either<E, B>) => EitherT2<M, L, E, void>
  ) => EitherT2<M, L, E, B>
}
```

Added in v2.0.0

# EitherT (interface)

**Signature**

```ts
export interface EitherT<M, E, A> extends HKT<M, Either<E, A>> {}
```

Added in v2.0.0

# EitherT1 (type alias)

**Signature**

```ts
export type EitherT1<M extends URIS, E, A> = Type<M, Either<E, A>>
```

Added in v2.0.0

# EitherT2 (type alias)

**Signature**

```ts
export type EitherT2<M extends URIS2, L, E, A> = Type2<M, L, Either<E, A>>
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
