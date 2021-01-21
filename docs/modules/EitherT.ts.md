---
title: EitherT.ts
nav_order: 26
parent: Modules
---

## EitherT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [EitherT (interface)](#eithert-interface)
  - [EitherT1 (type alias)](#eithert1-type-alias)
  - [EitherT2 (type alias)](#eithert2-type-alias)
- [utils](#utils)
  - [EitherM (interface)](#eitherm-interface)
  - [EitherM1 (interface)](#eitherm1-interface)
  - [EitherM2 (interface)](#eitherm2-interface)
  - [altValidation\_](#altvalidation_)
  - [alt\_](#alt_)
  - [ap\_](#ap_)
  - [bimap\_](#bimap_)
  - [chain\_](#chain_)
  - [fold\_](#fold_)
  - [getEitherM](#geteitherm)
  - [getOrElse\_](#getorelse_)
  - [leftF\_](#leftf_)
  - [left\_](#left_)
  - [mapLeft\_](#mapleft_)
  - [map\_](#map_)
  - [orElse\_](#orelse_)
  - [rightF\_](#rightf_)
  - [right\_](#right_)
  - [swap\_](#swap_)
  - [toUnion\_](#tounion_)

---

# model

## EitherT (interface)

**Signature**

```ts
export interface EitherT<M, E, A> extends HKT<M, Either<E, A>> {}
```

Added in v2.0.0

## EitherT1 (type alias)

**Signature**

```ts
export type EitherT1<M extends URIS, E, A> = Kind<M, Either<E, A>>
```

Added in v2.0.0

## EitherT2 (type alias)

**Signature**

```ts
export type EitherT2<M extends URIS2, R, E, A> = Kind2<M, R, Either<E, A>>
```

Added in v2.0.0

# utils

## EitherM (interface)

**Signature**

```ts
export interface EitherM<M> extends ApplicativeCompositionHKT2<M, URI> {
  readonly chain: <E, A, B>(ma: EitherT<M, E, A>, f: (a: A) => EitherT<M, E, B>) => EitherT<M, E, B>
  readonly alt: <E, A>(fa: EitherT<M, E, A>, that: Lazy<EitherT<M, E, A>>) => EitherT<M, E, A>
  readonly bimap: <E, A, N, B>(ma: EitherT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT<M, E, A>, f: (e: E) => N) => EitherT<M, N, A>
  readonly fold: <E, A, R>(ma: EitherT<M, E, A>, onLeft: (e: E) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <E, A>(ma: EitherT<M, E, A>, onLeft: (e: E) => HKT<M, A>) => HKT<M, A>
  readonly orElse: <E, A, N>(ma: EitherT<M, E, A>, onLeft: (e: E) => EitherT<M, N, A>) => EitherT<M, N, A>
  readonly swap: <E, A>(ma: EitherT<M, E, A>) => EitherT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => EitherT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => EitherT<M, E, A>
  readonly left: <E, A>(e: E) => EitherT<M, E, A>
}
```

Added in v2.0.0

## EitherM1 (interface)

**Signature**

```ts
export interface EitherM1<M extends URIS> extends ApplicativeComposition12<M, URI> {
  readonly chain: <E, A, B>(ma: EitherT1<M, E, A>, f: (a: A) => EitherT1<M, E, B>) => EitherT1<M, E, B>
  readonly alt: <E, A>(fa: EitherT1<M, E, A>, that: Lazy<EitherT1<M, E, A>>) => EitherT1<M, E, A>
  readonly bimap: <E, A, N, B>(ma: EitherT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT1<M, N, B>
  readonly mapLeft: <E, A, N>(ma: EitherT1<M, E, A>, f: (e: E) => N) => EitherT1<M, N, A>
  readonly fold: <E, A, R>(
    ma: EitherT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly getOrElse: <E, A>(ma: EitherT1<M, E, A>, onLeft: (e: E) => Kind<M, A>) => Kind<M, A>
  readonly orElse: <E, A, N>(ma: EitherT1<M, E, A>, onLeft: (e: E) => EitherT1<M, N, A>) => EitherT1<M, N, A>
  readonly swap: <E, A>(ma: EitherT1<M, E, A>) => EitherT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => EitherT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => EitherT1<M, E, A>
  readonly left: <E, A>(e: E) => EitherT1<M, E, A>
}
```

Added in v2.0.0

## EitherM2 (interface)

**Signature**

```ts
export interface EitherM2<M extends URIS2> extends ApplicativeComposition22<M, URI> {
  readonly chain: <R, E, A, B>(ma: EitherT2<M, R, E, A>, f: (a: A) => EitherT2<M, R, E, B>) => EitherT2<M, R, E, B>
  readonly alt: <R, E, A>(fa: EitherT2<M, R, E, A>, that: Lazy<EitherT2<M, R, E, A>>) => EitherT2<M, R, E, A>
  readonly bimap: <R, E, A, N, B>(ma: EitherT2<M, R, E, A>, f: (e: E) => N, g: (a: A) => B) => EitherT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(ma: EitherT2<M, R, E, A>, f: (e: E) => N) => EitherT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly getOrElse: <R, E, A>(ma: EitherT2<M, R, E, A>, onLeft: (e: E) => Kind2<M, R, A>) => Kind2<M, R, A>
  readonly orElse: <R, E, A, F>(
    ma: EitherT2<M, R, E, A>,
    onLeft: (e: E) => EitherT2<M, R, F, A>
  ) => EitherT2<M, R, F, A>
  readonly swap: <R, E, A>(ma: EitherT2<M, R, E, A>) => EitherT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => EitherT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => EitherT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => EitherT2<M, R, E, A>
}
```

Added in v2.0.0

## altValidation\_

**Signature**

```ts
export declare function altValidation_<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <R, A>(second: Lazy<Kind2<M, R, Either<E, A>>>) => (first: Kind2<M, R, Either<E, A>>) => Kind2<M, R, Either<E, A>>
export declare function altValidation_<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export declare function altValidation_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
```

Added in v2.10.0

## alt\_

**Signature**

```ts
export declare function alt_<M extends URIS2>(
  M: Monad2<M>
): <ME, E, A>(
  second: Lazy<Kind2<M, ME, Either<E, A>>>
) => (first: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, A>>
export declare function alt_<M extends URIS>(
  M: Monad1<M>
): <E, A>(second: Lazy<Kind<M, Either<E, A>>>) => (first: Kind<M, Either<E, A>>) => Kind<M, Either<E, A>>
export declare function alt_<M>(
  M: Monad<M>
): <E, A>(second: Lazy<HKT<M, Either<E, A>>>) => (first: HKT<M, Either<E, A>>) => HKT<M, Either<E, A>>
```

Added in v2.10.0

## ap\_

**Signature**

```ts
export declare function ap_<F extends URIS2>(
  F: Apply2<F>
): <FE, E, A>(
  fa: Kind2<F, FE, Either<E, A>>
) => <B>(fab: Kind2<F, FE, Either<E, (a: A) => B>>) => Kind2<F, FE, Either<E, B>>
export declare function ap_<F extends URIS>(
  F: Apply1<F>
): <E, A>(fa: Kind<F, Either<E, A>>) => <B>(fab: Kind<F, Either<E, (a: A) => B>>) => Kind<F, Either<E, B>>
export declare function ap_<F>(
  F: Apply<F>
): <E, A>(fa: HKT<F, Either<E, A>>) => <B>(fab: HKT<F, Either<E, (a: A) => B>>) => HKT<F, Either<E, B>>
```

Added in v2.10.0

## bimap\_

**Signature**

```ts
export declare function bimap_<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, B>>
export declare function bimap_<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, B>>
export declare function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, B>>
```

Added in v2.10.0

## chain\_

**Signature**

```ts
export declare function chain_<M extends URIS2>(
  M: Monad2<M>
): <A, ME, E, B>(
  f: (a: A) => Kind2<M, ME, Either<E, B>>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, Either<E, B>>
export declare function chain_<M extends URIS>(
  M: Monad1<M>
): <A, E, B>(f: (a: A) => Kind<M, Either<E, B>>) => (ma: Kind<M, Either<E, A>>) => Kind<M, Either<E, B>>
export declare function chain_<M>(
  M: Monad<M>
): <A, E, B>(f: (a: A) => HKT<M, Either<E, B>>) => (ma: HKT<M, Either<E, A>>) => HKT<M, Either<E, B>>
```

Added in v2.10.0

## fold\_

**Signature**

```ts
export declare function fold_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, R, A>(
  onLeft: (e: E) => Kind2<M, ME, R>,
  onRight: (a: A) => Kind2<M, ME, R>
) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, R>
export declare function fold_<M extends URIS>(
  M: Monad1<M>
): <E, R, A>(onLeft: (e: E) => Kind<M, R>, onRight: (a: A) => Kind<M, R>) => (ma: Kind<M, Either<E, A>>) => Kind<M, R>
export declare function fold_<M>(
  M: Monad<M>
): <E, R, A>(onLeft: (e: E) => HKT<M, R>, onRight: (a: A) => HKT<M, R>) => (ma: HKT<M, Either<E, A>>) => HKT<M, R>
```

Added in v2.10.0

## getEitherM

**Signature**

```ts
export declare function getEitherM<M extends URIS2>(M: Monad2<M>): EitherM2<M>
export declare function getEitherM<M extends URIS>(M: Monad1<M>): EitherM1<M>
export declare function getEitherM<M>(M: Monad<M>): EitherM<M>
```

Added in v2.0.0

## getOrElse\_

**Signature**

```ts
export declare function getOrElse_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, A>(onLeft: (e: E) => Kind2<M, ME, A>) => (ma: Kind2<M, ME, Either<E, A>>) => Kind2<M, ME, A>
export declare function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <E, A>(onLeft: (e: E) => Kind<M, A>) => (ma: Kind<M, Either<E, A>>) => Kind<M, A>
export declare function getOrElse_<M>(
  M: Monad<M>
): <E, A>(onLeft: (e: E) => HKT<M, A>) => (ma: HKT<M, Either<E, A>>) => HKT<M, A>
```

Added in v2.10.0

## leftF\_

**Signature**

```ts
export declare function leftF_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export declare function leftF_<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, Either<E, A>>
export declare function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>>
```

Added in v2.10.0

## left\_

**Signature**

```ts
export declare function left_<M extends URIS2>(M: Pointed2<M>): <E, FE, A = never>(e: E) => Kind2<M, FE, Either<E, A>>
export declare function left_<M extends URIS>(M: Pointed1<M>): <E, A = never>(e: E) => Kind<M, Either<E, A>>
export declare function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, Either<E, A>>
```

Added in v2.10.0

## mapLeft\_

**Signature**

```ts
export declare function mapLeft_<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<G, A>>
export declare function mapLeft_<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, Either<E, A>>) => Kind<F, Either<G, A>>
export declare function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, Either<E, A>>) => HKT<F, Either<G, A>>
```

Added in v2.10.0

## map\_

**Signature**

```ts
export declare function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<E, B>>
export declare function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Either<E, A>>) => Kind<F, Either<E, B>>
export declare function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Either<E, A>>) => HKT<F, Either<E, B>>
```

Added in v2.10.0

## orElse\_

**Signature**

```ts
export declare function orElse_<M extends URIS2>(
  M: Monad2<M>
): <E1, ME, E2, A>(
  onLeft: (e: E1) => Kind2<M, ME, Either<E2, A>>
) => (ma: Kind2<M, ME, Either<E1, A>>) => Kind2<M, ME, Either<E2, A>>
export declare function orElse_<M extends URIS>(
  M: Monad1<M>
): <E1, E2, A>(onLeft: (e: E1) => Kind<M, Either<E2, A>>) => (ma: Kind<M, Either<E1, A>>) => Kind<M, Either<E2, A>>
export declare function orElse_<M>(
  M: Monad<M>
): <E1, E2, A>(onLeft: (e: E1) => HKT<M, Either<E2, A>>) => (ma: HKT<M, Either<E1, A>>) => HKT<M, Either<E2, A>>
```

Added in v2.10.0

## rightF\_

**Signature**

```ts
export declare function rightF_<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export declare function rightF_<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, Either<E, A>>
export declare function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>>
```

Added in v2.10.0

## right\_

**Signature**

```ts
export declare function right_<M extends URIS2>(M: Pointed2<M>): <A, FE, E = never>(a: A) => Kind2<M, FE, Either<E, A>>
export declare function right_<M extends URIS>(M: Pointed1<M>): <A, E = never>(a: A) => Kind<M, Either<E, A>>
export declare function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, Either<E, A>>
```

Added in v2.10.0

## swap\_

**Signature**

```ts
export declare function swap_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, Either<E, A>>) => Kind2<F, FE, Either<A, E>>
export declare function swap_<F extends URIS>(
  F: Functor1<F>
): <E, A>(ma: Kind<F, Either<E, A>>) => Kind<F, Either<A, E>>
export declare function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, Either<E, A>>) => HKT<F, Either<A, E>>
```

Added in v2.10.0

## toUnion\_

**Signature**

```ts
export declare function toUnion_<F extends URIS2>(
  F: Functor2<F>
): <R, E, A>(fa: Kind2<F, R, Either<E, A>>) => Kind2<F, R, E | A>
export declare function toUnion_<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, Either<E, A>>) => Kind<F, E | A>
export declare function toUnion_<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A>
```

Added in v2.10.0
