---
title: EitherT.ts
nav_order: 23
parent: Modules
---

## EitherT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tapLeft](#tapleft)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
  - [getValidatedCombineKind](#getvalidatedcombinekind)
- [mapping](#mapping)
  - [mapBoth](#mapboth)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
- [type class operations](#type-class-operations)
  - [mapLeft](#mapleft)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [getOrElseKind](#getorelsekind)
  - [left](#left)
  - [leftKind](#leftkind)
  - [map](#map)
  - [match](#match)
  - [matchKind](#matchkind)
  - [orElse](#orelse)
  - [right](#right)
  - [rightKind](#rightkind)
  - [swap](#swap)
  - [toUnion](#tounion)

---

# combinators

## tapLeft

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapLeft: <M extends TypeLambda>(
  M: Monad<M>
) => <E1, S, R2, O2, ME2, E2, _>(
  onError: (e: E1) => Kind<M, S, R2, O2, ME2, either.Either<E2, _>>
) => <R1, O1, ME1, A>(
  self: Kind<M, S, R1, O1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, either.Either<E1 | E2, A>>
```

Added in v3.0.0

# error handling

## catchAll

**Signature**

```ts
export declare const catchAll: <M extends TypeLambda>(
  M: Monad<M>
) => <E1, S, R2, O2, ME2, E2, B>(
  onError: (e: E1) => Kind<M, S, R2, O2, ME2, either.Either<E2, B>>
) => <R1, O1, ME1, A>(
  self: Kind<M, S, R1, O1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, either.Either<E2, B | A>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends TypeLambda>(
  F: functor.Functor<F>
) => <E, B>(
  onError: (e: E) => B
) => <S, R, O, ME, A>(self: Kind<F, S, R, O, ME, either.Either<E, A>>) => Kind<F, S, R, O, ME, B | A>
```

Added in v3.0.0

## getValidatedCombineKind

**Signature**

```ts
export declare const getValidatedCombineKind: <M extends TypeLambda, E>(
  M: Monad<M>,
  S: Semigroup<E>
) => <S, R2, O2, ME2, B>(
  that: Kind<M, S, R2, O2, ME2, either.Either<E, B>>
) => <R1, O1, ME1, A>(
  first: Kind<M, S, R1, O1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, either.Either<E, B | A>>
```

Added in v3.0.0

# mapping

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  F: functor.Functor<F>
) => <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, either.Either<E, A>>) => Kind<F, S, R, O, FE, either.Either<G, B>>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends TypeLambda>(
  M: Monad<M>
) => <A, S, R2, O2, ME2, E2, B>(
  f: (a: A) => Kind<M, S, R2, O2, ME2, either.Either<E2, B>>
) => <R1, O1, ME1, E1>(
  self: Kind<M, S, R1, O1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, either.Either<E2 | E1, B>>
```

Added in v3.0.0

# type class operations

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends TypeLambda>(
  F: functor.Functor<F>
) => <E, G>(
  f: (e: E) => G
) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, either.Either<E, A>>) => Kind<F, S, R, O, FE, either.Either<G, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <S, R2, O2, FE2, E2, A>(
  fa: Kind<F, S, R2, O2, FE2, either.Either<E2, A>>
) => <R1, O1, FE1, E1, B>(
  self: Kind<F, S, R1, O1, FE1, either.Either<E1, (a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, either.Either<E2 | E1, B>>
```

Added in v3.0.0

## bracket

**Signature**

```ts
export declare const bracket: <M extends TypeLambda>(
  M: Monad<M>
) => <S, R1, O1, ME1, E1, A, R2, O2, ME2, E2, B, R3, W3, ME3, E3>(
  acquire: Kind<M, S, R1, O1, ME1, either.Either<E1, A>>,
  use: (a: A) => Kind<M, S, R2, O2, ME2, either.Either<E2, B>>,
  release: (a: A, e: either.Either<E2, B>) => Kind<M, S, R3, W3, ME3, either.Either<E3, void>>
) => Kind<M, S, R1 & R2 & R3, O1 | O2 | W3, ME1 | ME2 | ME3, either.Either<E1 | E2 | E3, B>>
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <M extends TypeLambda>(
  M: Monad<M>
) => <E, S, R2, O2, ME2, B>(
  onError: (e: E) => Kind<M, S, R2, O2, ME2, B>
) => <R1, O1, ME1, A>(
  self: Kind<M, S, R1, O1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, B | A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <F extends TypeLambda>(
  F: Pointed<F>
) => <E, S>(e: E) => Kind<F, S, unknown, never, never, either.Either<E, never>>
```

Added in v3.0.0

## leftKind

**Signature**

```ts
export declare function leftKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, L>(fl: Kind<F, S, R, O, E, L>) => Kind<F, S, R, O, E, Either<L, never>>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  F: functor.Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, either.Either<E, A>>) => Kind<F, S, R, O, FE, either.Either<E, B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends TypeLambda>(
  F: Functor<F>
): <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <S, R, O, ME>(self: Kind<F, S, R, O, ME, Either<E, A>>) => Kind<F, S, R, O, ME, B | C>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <M extends TypeLambda>(
  M: Flattenable<M>
) => <E, S, R2, O2, ME2, B, A, R3, W3, ME3, C = B>(
  onError: (e: E) => Kind<M, S, R2, O2, ME2, B>,
  onSuccess: (a: A) => Kind<M, S, R3, W3, ME3, C>
) => <R1, O1, ME1>(
  self: Kind<M, S, R1, O1, ME1, either.Either<E, A>>
) => Kind<M, S, R1 & R2 & R3, O2 | W3 | O1, ME2 | ME3 | ME1, B | C>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <M extends TypeLambda>(
  M: Monad<M>
) => <S, R2, O2, ME2, E2, B>(
  that: Kind<M, S, R2, O2, ME2, either.Either<E2, B>>
) => <R1, O1, ME1, E1, A>(
  first: Kind<M, S, R1, O1, ME1, either.Either<E1, A>>
) => Kind<M, S, R1 & R2, O2 | O1, ME2 | ME1, either.Either<E2, B | A>>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <F extends TypeLambda>(
  F: Pointed<F>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, either.Either<never, A>>
```

Added in v3.0.0

## rightKind

**Signature**

```ts
export declare function rightKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Either<never, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, Either<A, E>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare function toUnion<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Either<E, A>>) => Kind<F, S, R, O, FE, E | A>
```

Added in v3.0.0
