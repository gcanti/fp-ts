---
title: EitherT.ts
nav_order: 21
parent: Modules
---

## EitherT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinatorsError](#combinatorserror)
  - [tapError](#taperror)
- [utils](#utils)
  - [ap](#ap)
  - [bimap](#bimap)
  - [bracket](#bracket)
  - [combineK](#combinek)
  - [combineKValidation](#combinekvalidation)
  - [flatMap](#flatmap)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [left](#left)
  - [leftF](#leftf)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [match](#match)
  - [matchE](#matche)
  - [orElse](#orelse)
  - [orLeft](#orleft)
  - [right](#right)
  - [rightF](#rightf)
  - [swap](#swap)
  - [toUnion](#tounion)

---

# combinatorsError

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <M extends HKT>(
  M: Monad<M>
) => <E1, S, R2, W2, ME2, E2, _>(
  onError: (e: E1) => Kind<M, S, R2, W2, ME2, either.Either<E2, _>>
) => <R1, W1, ME1, A>(
  self: Kind<M, S, R1, W1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, either.Either<E1 | E2, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends HKT>(
  F: apply.Apply<F>
) => <S, R2, W2, FE2, E2, A>(
  fa: Kind<F, S, R2, W2, FE2, either.Either<E2, A>>
) => <R1, W1, FE1, E1, B>(
  fab: Kind<F, S, R1, W1, FE1, either.Either<E1, (a: A) => B>>
) => Kind<F, S, R1 & R2, W2 | W1, FE2 | FE1, either.Either<E2 | E1, B>>
```

Added in v3.0.0

## bimap

**Signature**

```ts
export declare function bimap<F extends HKT>(
  F: Functor<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, W, FE>(fea: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<G, B>>
```

Added in v3.0.0

## bracket

**Signature**

```ts
export declare const bracket: <M extends HKT>(
  M: Monad<M>
) => <S, R1, W1, ME1, E1, A, R2, W2, ME2, E2, B, R3, W3, ME3, E3>(
  acquire: Kind<M, S, R1, W1, ME1, either.Either<E1, A>>,
  use: (a: A) => Kind<M, S, R2, W2, ME2, either.Either<E2, B>>,
  release: (a: A, e: either.Either<E2, B>) => Kind<M, S, R3, W3, ME3, either.Either<E3, void>>
) => Kind<M, S, R1 & R2 & R3, W1 | W2 | W3, ME1 | ME2 | ME3, either.Either<E1 | E2 | E3, B>>
```

Added in v3.0.0

## combineK

**Signature**

```ts
export declare const combineK: <M extends HKT>(
  M: Monad<M>
) => <S, R2, W2, ME2, E2, B>(
  second: LazyArg<Kind<M, S, R2, W2, ME2, either.Either<E2, B>>>
) => <R1, W1, ME1, E1, A>(
  first: Kind<M, S, R1, W1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, either.Either<E2, B | A>>
```

Added in v3.0.0

## combineKValidation

**Signature**

```ts
export declare const combineKValidation: <M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
) => <S, R2, W2, ME2, B>(
  second: LazyArg<Kind<M, S, R2, W2, ME2, either.Either<E, B>>>
) => <R1, W1, ME1, A>(
  first: Kind<M, S, R1, W1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, either.Either<E, B | A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends HKT>(
  M: Monad<M>
) => <A, S, R2, W2, ME2, E2, B>(
  f: (a: A) => Kind<M, S, R2, W2, ME2, either.Either<E2, B>>
) => <R1, W1, ME1, E1>(
  ma: Kind<M, S, R1, W1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, either.Either<E2 | E1, B>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends HKT>(
  F: functor.Functor<F>
) => <E, B>(
  onError: (e: E) => B
) => <S, R, W, ME, A>(ma: Kind<F, S, R, W, ME, either.Either<E, A>>) => Kind<F, S, R, W, ME, B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <M extends HKT>(
  M: Monad<M>
) => <E, S, R2, W2, ME2, B>(
  onError: (e: E) => Kind<M, S, R2, W2, ME2, B>
) => <R1, W1, ME1, A>(
  ma: Kind<M, S, R1, W1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, B | A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <F extends HKT>(
  F: Pointed<F>
) => <E, S, R = unknown, W = never, FE = never, A = never>(e: E) => Kind<F, S, R, W, FE, either.Either<E, A>>
```

Added in v3.0.0

## leftF

**Signature**

```ts
export declare function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A = never>(fe: Kind<F, S, R, W, FE, E>) => Kind<F, S, R, W, FE, Either<E, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <F extends HKT>(
  F: functor.Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <S, R, W, FE, E>(fa: Kind<F, S, R, W, FE, either.Either<E, A>>) => Kind<F, S, R, W, FE, either.Either<E, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(
  f: (e: E) => G
) => <S, R, W, FE, A>(fea: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends HKT>(
  F: Functor<F>
): <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <S, R, W, ME>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <M extends HKT>(
  M: Flat<M>
) => <E, S, R2, W2, ME2, B, A, R3, W3, ME3, C = B>(
  onError: (e: E) => Kind<M, S, R2, W2, ME2, B>,
  onSuccess: (a: A) => Kind<M, S, R3, W3, ME3, C>
) => <R1, W1, ME1>(
  ma: Kind<M, S, R1, W1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2 & R3, W2 | W3 | W1, ME2 | ME3 | ME1, B | C>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <M extends HKT>(
  M: Monad<M>
) => <E1, S, R2, W2, ME2, E2, B>(
  onError: (e: E1) => Kind<M, S, R2, W2, ME2, either.Either<E2, B>>
) => <R1, W1, ME1, A>(
  ma: Kind<M, S, R1, W1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, W2 | W1, ME2 | ME1, either.Either<E2, B | A>>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare const orLeft: <M extends HKT>(
  M: Monad<M>
) => <E1, S, R, W, ME, E2>(
  onError: (e: E1) => Kind<M, S, R, W, ME, E2>
) => <A>(fa: Kind<M, S, R, W, ME, either.Either<E1, A>>) => Kind<M, S, R, W, ME, either.Either<E2, A>>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R = unknown, W = never, FE = never, E = never>(a: A) => Kind<F, S, R, W, FE, either.Either<E, A>>
```

Added in v3.0.0

## rightF

**Signature**

```ts
export declare function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, A, E = never>(fa: Kind<F, S, R, W, FE, A>) => Kind<F, S, R, W, FE, Either<E, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(ma: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<A, E>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare function toUnion<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(fa: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, E | A>
```

Added in v3.0.0
