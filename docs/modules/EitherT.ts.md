---
title: EitherT.ts
nav_order: 22
parent: Modules
---

## EitherT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [altValidation\_](#altvalidation_)
  - [alt\_](#alt_)
  - [ap\_](#ap_)
  - [bimap\_](#bimap_)
  - [chain\_](#chain_)
  - [fold\_](#fold_)
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

# utils

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

## fold\_

**Signature**

```ts
export declare function fold_<M extends URIS2>(
  M: Monad2<M>
): <E, R, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, Either<E, A>>) => Kind2<M, R, B>
export declare function fold_<M extends URIS>(
  M: Monad1<M>
): <E, B, A>(onLeft: (e: E) => Kind<M, B>, onRight: (a: A) => Kind<M, B>) => (ma: Kind<M, Either<E, A>>) => Kind<M, B>
export declare function fold_<M>(
  M: Monad<M>
): <E, B, A>(onLeft: (e: E) => HKT<M, B>, onRight: (a: A) => HKT<M, B>) => (ma: HKT<M, Either<E, A>>) => HKT<M, B>
```

Added in v3.0.0

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

Added in v3.0.0

## leftF\_

**Signature**

```ts
export declare function leftF_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, Either<E, A>>
export declare function leftF_<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, Either<E, A>>
export declare function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, Either<E, A>>
```

Added in v3.0.0

## left\_

**Signature**

```ts
export declare function left_<M extends URIS2>(M: Pointed2<M>): <E, FE, A = never>(e: E) => Kind2<M, FE, Either<E, A>>
export declare function left_<M extends URIS>(M: Pointed1<M>): <E, A = never>(e: E) => Kind<M, Either<E, A>>
export declare function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, Either<E, A>>
```

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

## rightF\_

**Signature**

```ts
export declare function rightF_<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, Either<E, A>>
export declare function rightF_<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, Either<E, A>>
export declare function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, Either<E, A>>
```

Added in v3.0.0

## right\_

**Signature**

```ts
export declare function right_<M extends URIS2>(M: Pointed2<M>): <A, FE, E = never>(a: A) => Kind2<M, FE, Either<E, A>>
export declare function right_<M extends URIS>(M: Pointed1<M>): <A, E = never>(a: A) => Kind<M, Either<E, A>>
export declare function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, Either<E, A>>
```

Added in v3.0.0

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

Added in v3.0.0

## toUnion\_

**Signature**

```ts
export declare function toUnion_<F extends URIS2>(
  F: Functor2<F>
): <R, E, A>(fa: Kind2<F, R, Either<E, A>>) => Kind2<F, R, E | A>
export declare function toUnion_<F extends URIS>(F: Functor1<F>): <E, A>(fa: Kind<F, Either<E, A>>) => Kind<F, E | A>
export declare function toUnion_<F>(F: Functor<F>): <E, A>(fa: HKT<F, Either<E, A>>) => HKT<F, E | A>
```

Added in v3.0.0
