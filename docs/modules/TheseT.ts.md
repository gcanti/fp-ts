---
title: TheseT.ts
nav_order: 103
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
  - [chain](#chain)
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
export declare function ap<F extends HKT, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <S, R, FE, A>(
  fa: Kind<F, S, R, FE, These<E, A>>
) => <B>(fab: Kind<F, S, R, FE, These<E, (a: A) => B>>) => Kind<F, S, R, FE, These<E, B>>
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
) => <S, R, FE>(fea: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, These<G, B>>
```

Added in v3.0.0

## both

**Signature**

```ts
export declare function both<F extends HKT>(
  F: Pointed<F>
): <E, A, S, R, FE>(e: E, a: A) => Kind<F, S, R, FE, These<E, A>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, S, R, FE, B>(
  f: (a: A) => Kind<M, S, R, FE, These<E, B>>
) => (ma: Kind<M, S, R, FE, These<E, A>>) => Kind<M, S, R, FE, These<E, B>>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare function left<F extends HKT>(
  F: Pointed<F>
): <E, S, R, FE, A = never>(e: E) => Kind<F, S, R, FE, These<E, A>>
```

Added in v3.0.0

## leftF

**Signature**

```ts
export declare function leftF<F extends HKT>(
  F: Functor<F>
): <S, R, FE, E, A = never>(fe: Kind<F, S, R, FE, E>) => Kind<F, S, R, FE, These<E, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, FE, E>(fa: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, These<E, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends HKT>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <S, R, FE, A>(fea: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, These<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends HKT>(
  F: Functor<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S, R, FE>(ma: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, B>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare function matchE<M extends HKT>(
  M: Chain<M>
): <E, S, R, FE, B, A>(
  onLeft: (e: E) => Kind<M, S, R, FE, B>,
  onRight: (a: A) => Kind<M, S, R, FE, B>,
  onBoth: (e: E, a: A) => Kind<M, S, R, FE, B>
) => (ma: Kind<M, S, R, FE, These<E, A>>) => Kind<M, S, R, FE, B>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare function right<F extends HKT>(
  F: Pointed<F>
): <A, S, R, FE, E = never>(a: A) => Kind<F, S, R, FE, These<E, A>>
```

Added in v3.0.0

## rightF

**Signature**

```ts
export declare function rightF<F extends HKT>(
  F: Functor<F>
): <S, R, FE, A, E = never>(fa: Kind<F, S, R, FE, A>) => Kind<F, S, R, FE, These<E, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends HKT>(
  F: Functor<F>
): <S, R, FE, E, A>(ma: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, These<A, E>>
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
) => <S, R, FE>(fa: Kind<F, S, R, FE, These<E, A>>) => Kind<F, S, R, FE, readonly [E, A]>
```

Added in v3.0.0
