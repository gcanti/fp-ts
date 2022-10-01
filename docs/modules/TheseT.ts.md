---
title: TheseT.ts
nav_order: 102
parent: Modules
---

## TheseT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [mapping](#mapping)
  - [mapBoth](#mapboth)
- [type class operations](#type-class-operations)
  - [mapLeft](#mapleft)
- [utils](#utils)
  - [ap](#ap)
  - [both](#both)
  - [flatMap](#flatmap)
  - [left](#left)
  - [leftKind](#leftkind)
  - [map](#map)
  - [match](#match)
  - [matchKind](#matchkind)
  - [right](#right)
  - [rightKind](#rightkind)
  - [swap](#swap)
  - [toTuple2](#totuple2)

---

# mapping

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  F: Functor<F>
) => <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, T.These<E, A>>) => Kind<F, S, R, O, FE, T.These<G, B>>
```

Added in v3.0.0

# type class operations

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends TypeLambda>(
  F: Functor<F>
) => <E, G>(
  f: (e: E) => G
) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, T.These<E, A>>) => Kind<F, S, R, O, FE, T.These<G, A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda, E>(
  F: Apply<F>,
  S: Semigroup<E>
) => <S, R2, O2, FE2, A>(
  fa: Kind<F, S, R2, O2, FE2, T.These<E, A>>
) => <R1, O1, FE1, B>(
  self: Kind<F, S, R1, O1, FE1, T.These<E, (a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, T.These<E, B>>
```

Added in v3.0.0

## both

**Signature**

```ts
export declare const both: <F extends TypeLambda>(
  F: Pointed<F>
) => <E, A, S>(e: E, a: A) => Kind<F, S, unknown, never, never, T.These<E, A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends TypeLambda, E>(
  M: Monad<M>,
  S: Semigroup<E>
) => <A, S, R2, O2, FE2, B>(
  f: (a: A) => Kind<M, S, R2, O2, FE2, T.These<E, B>>
) => <R1, O1, FE1>(
  self: Kind<M, S, R1, O1, FE1, T.These<E, A>>
) => Kind<M, S, R1 & R2, O2 | O1, FE2 | FE1, T.These<E, B>>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <F extends TypeLambda>(
  F: Pointed<F>
) => <E, S>(e: E) => Kind<F, S, unknown, never, never, T.These<E, never>>
```

Added in v3.0.0

## leftKind

**Signature**

```ts
export declare function leftKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, L>(fl: Kind<F, S, R, O, E, L>) => Kind<F, S, R, O, E, These<L, never>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<E, B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends TypeLambda>(
  F: Functor<F>
): <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, B | C | D>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <M extends TypeLambda>(
  M: Flattenable<M>
) => <E, S, R2, O2, FE2, B, A, R3, W3, FE3, R4, W4, FE4, C = B, D = B>(
  onError: (e: E) => Kind<M, S, R2, O2, FE2, B>,
  onSuccess: (a: A) => Kind<M, S, R3, W3, FE3, C>,
  onBoth: (e: E, a: A) => Kind<M, S, R4, W4, FE4, D>
) => <R1, O1, FE1>(
  self: Kind<M, S, R1, O1, FE1, T.These<E, A>>
) => Kind<M, S, R1 & R2 & R3 & R4, O2 | W3 | W4 | O1, FE2 | FE3 | FE4 | FE1, B | C | D>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <F extends TypeLambda>(
  F: Pointed<F>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, T.These<never, A>>
```

Added in v3.0.0

## rightKind

**Signature**

```ts
export declare function rightKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, These<never, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<A, E>>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare function toTuple2<F extends TypeLambda>(
  F: Functor<F>
): <E, A>(
  e: LazyArg<E>,
  a: LazyArg<A>
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, readonly [E, A]>
```

Added in v3.0.0
