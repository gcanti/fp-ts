---
title: TheseT.ts
nav_order: 102
parent: Modules
---

## TheseT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ap](#ap)
  - [bimap](#bimap)
  - [both](#both)
  - [flatMap](#flatmap)
  - [left](#left)
  - [leftF](#leftf)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [match](#match)
  - [matchE](#matche)
  - [right](#right)
  - [rightF](#rightf)
  - [swap](#swap)
  - [toTuple2](#totuple2)

---

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends HKT, E>(
  F: Apply<F>,
  S: Semigroup<E>
) => <S, R2, W2, FE2, A>(
  fa: Kind<F, S, R2, W2, FE2, T.These<E, A>>
) => <R1, W1, FE1, B>(
  fab: Kind<F, S, R1, W1, FE1, T.These<E, (a: A) => B>>
) => Kind<F, S, R1 & R2, W2 | W1, FE2 | FE1, T.These<E, B>>
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
) => <S, R, W, FE>(fea: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, B>>
```

Added in v3.0.0

## both

**Signature**

```ts
export declare const both: <F extends HKT>(
  F: Pointed<F>
) => <E, A, S, R = unknown, W = never, FE = never>(e: E, a: A) => Kind<F, S, R, W, FE, T.These<E, A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
) => <A, S, R2, W2, FE2, B>(
  f: (a: A) => Kind<M, S, R2, W2, FE2, T.These<E, B>>
) => <R1, W1, FE1>(ma: Kind<M, S, R1, W1, FE1, T.These<E, A>>) => Kind<M, S, R1 & R2, W2 | W1, FE2 | FE1, T.These<E, B>>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <F extends HKT>(
  F: Pointed<F>
) => <E, S, R = unknown, W = never, FE = never, A = never>(e: E) => Kind<F, S, R, W, FE, T.These<E, A>>
```

Added in v3.0.0

## leftF

**Signature**

```ts
export declare function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A = never>(fe: Kind<F, S, R, W, FE, E>) => Kind<F, S, R, W, FE, These<E, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, W, FE, E>(fa: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<E, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(
  f: (e: E) => G
) => <S, R, W, FE, A>(fea: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends HKT>(
  F: Functor<F>
): <E, B, A, C = B, D = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, W, FE>(ma: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, B | C | D>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <M extends HKT>(
  M: Flat<M>
) => <E, S, R2, W2, FE2, B, A, R3, W3, FE3, R4, W4, FE4, C = B, D = B>(
  onLeft: (e: E) => Kind<M, S, R2, W2, FE2, B>,
  onRight: (a: A) => Kind<M, S, R3, W3, FE3, C>,
  onBoth: (e: E, a: A) => Kind<M, S, R4, W4, FE4, D>
) => <R1, W1, FE1>(
  ma: Kind<M, S, R1, W1, FE1, T.These<E, A>>
) => Kind<M, S, R1 & R2 & R3 & R4, W2 | W3 | W4 | W1, FE2 | FE3 | FE4 | FE1, B | C | D>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R = unknown, W = never, FE = never, E = never>(a: A) => Kind<F, S, R, W, FE, T.These<E, A>>
```

Added in v3.0.0

## rightF

**Signature**

```ts
export declare function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, A, E = never>(fa: Kind<F, S, R, W, FE, A>) => Kind<F, S, R, W, FE, These<E, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends HKT>(
  F: Functor<F>
): <S, R, W, FE, E, A>(ma: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, These<A, E>>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare function toTuple2<F extends HKT>(
  F: Functor<F>
): <E, A>(
  e: Lazy<E>,
  a: Lazy<A>
) => <S, R, W, FE>(fa: Kind<F, S, R, W, FE, These<E, A>>) => Kind<F, S, R, W, FE, readonly [E, A]>
```

Added in v3.0.0
