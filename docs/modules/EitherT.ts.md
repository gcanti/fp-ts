---
title: EitherT.ts
nav_order: 25
parent: Modules
---

## EitherT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [alt](#alt)
  - [altValidation](#altvalidation)
  - [ap](#ap)
  - [bimap](#bimap)
  - [bracket](#bracket)
  - [chain](#chain)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [left](#left)
  - [leftF](#leftf)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [match](#match)
  - [matchE](#matche)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orLeft](#orleft)
  - [right](#right)
  - [rightF](#rightf)
  - [swap](#swap)
  - [toUnion](#tounion)

---

# utils

## alt

**Signature**

```ts
export declare function alt<M extends HKT>(
  M: Monad<M>
): <S, R, W, ME, E, A>(
  second: Lazy<Kind<M, S, R, W, ME, Either<E, A>>>
) => (first: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, Either<E, A>>
```

Added in v3.0.0

## altValidation

**Signature**

```ts
export declare function altValidation<M extends HKT, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <S, R, W, ME, A>(
  second: Lazy<Kind<M, S, R, W, ME, Either<E, A>>>
) => (first: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, Either<E, A>>
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare function ap<F extends HKT>(
  F: Apply<F>
): <S, R, W, FE, E, A>(
  fa: Kind<F, S, R, W, FE, Either<E, A>>
) => <B>(fab: Kind<F, S, R, W, FE, Either<E, (a: A) => B>>) => Kind<F, S, R, W, FE, Either<E, B>>
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
export declare function bracket<M extends HKT>(
  M: Monad<M>
): <S, R, W, ME, E, A, B>(
  acquire: Kind<M, S, R, W, ME, Either<E, A>>,
  use: (a: A) => Kind<M, S, R, W, ME, Either<E, B>>,
  release: (a: A, e: Either<E, B>) => Kind<M, S, R, W, ME, Either<E, void>>
) => Kind<M, S, R, W, ME, Either<E, B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends HKT>(
  M: Monad<M>
): <A, S, R, W, ME, E, B>(
  f: (a: A) => Kind<M, S, R, W, ME, Either<E, B>>
) => (ma: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, Either<E, B>>
```

Added in v3.0.0

## chainNullableK

**Signature**

```ts
export declare function chainNullableK<M extends HKT>(
  M: Monad<M>
): <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, FE>(ma: Kind<M, S, R, W, FE, Either<E, A>>) => Kind<M, S, R, W, FE, Either<E, NonNullable<B>>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare function fromNullable<F extends HKT>(
  F: Pointed<F>
): <E>(e: E) => <A, S, R, W, FE>(a: A) => Kind<F, S, R, W, FE, Either<E, NonNullable<A>>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, W, FE>(...a: A) => Kind<F, S, R, W, FE, Either<E, NonNullable<B>>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare function getOrElse<F extends HKT>(
  F: Functor<F>
): <E, A>(onLeft: (e: E) => A) => <S, R, W, ME>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare function getOrElseE<M extends HKT>(
  M: Monad<M>
): <E, S, R, W, ME, A>(
  onLeft: (e: E) => Kind<M, S, R, W, ME, A>
) => (ma: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, A>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare function left<F extends HKT>(
  F: Pointed<F>
): <E, S, R, W, FE, A = never>(e: E) => Kind<F, S, R, W, FE, Either<E, A>>
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
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, W, FE, E>(fa: Kind<F, S, R, W, FE, Either<E, A>>) => Kind<F, S, R, W, FE, Either<E, B>>
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
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <S, R, W, ME>(ma: Kind<F, S, R, W, ME, Either<E, A>>) => Kind<F, S, R, W, ME, B>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare function matchE<M extends HKT>(
  M: Chain<M>
): <E, S, R, W, ME, B, A>(
  onLeft: (e: E) => Kind<M, S, R, W, ME, B>,
  onRight: (a: A) => Kind<M, S, R, W, ME, B>
) => (ma: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, B>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare function orElse<M extends HKT>(
  M: Monad<M>
): <E1, S, R, W, ME, E2, A>(
  onLeft: (e: E1) => Kind<M, S, R, W, ME, Either<E2, A>>
) => (ma: Kind<M, S, R, W, ME, Either<E1, A>>) => Kind<M, S, R, W, ME, Either<E2, A>>
```

Added in v3.0.0

## orElseFirst

**Signature**

```ts
export declare function orElseFirst<M extends HKT>(
  M: Monad<M>
): <E, S, R, W, ME, B>(
  onLeft: (e: E) => Kind<M, S, R, W, ME, Either<E, B>>
) => <A>(ma: Kind<M, S, R, W, ME, Either<E, A>>) => Kind<M, S, R, W, ME, Either<E, A>>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare function orLeft<M extends HKT>(
  M: Monad<M>
): <E1, S, R, W, ME, E2>(
  onLeft: (e: E1) => Kind<M, S, R, W, ME, E2>
) => <A>(fa: Kind<M, S, R, W, ME, Either<E1, A>>) => Kind<M, S, R, W, ME, Either<E2, A>>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare function right<F extends HKT>(
  F: Pointed<F>
): <A, S, R, W, FE, E = never>(a: A) => Kind<F, S, R, W, FE, Either<E, A>>
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
