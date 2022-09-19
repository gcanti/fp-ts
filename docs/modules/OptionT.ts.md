---
title: OptionT.ts
nav_order: 66
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [some](#some)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromF](#fromf)
- [utils](#utils)
  - [alt](#alt)
  - [ap](#ap)
  - [chain](#chain)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [map](#map)
  - [match](#match)
  - [matchE](#matche)
  - [zero](#zero)

---

# constructors

## some

**Signature**

```ts
export declare const some: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R, W, E>(a: A) => Kind<F, S, R, W, E, OptionModule.Option<A>>
```

Added in v3.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <M extends HKT>(
  M: Monad<M>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, E>(
  ma: Kind<M, S, R, W, E, OptionModule.Option<A>>
) => Kind<M, S, R, W, E, OptionModule.Option<NonNullable<B>>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R, W, E>(a: A) => Kind<F, S, R, W, E, OptionModule.Option<NonNullable<A>>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, W, E>(...a: A) => Kind<F, S, R, W, E, Option<NonNullable<B>>>
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R, W, E>(e: Either<unknown, A>) => Kind<F, S, R, W, E, OptionModule.Option<A>>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends HKT>(
  F: Functor<F>
): <S, R, W, E, A>(ma: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, Option<A>>
```

Added in v3.0.0

# utils

## alt

**Signature**

```ts
export declare const alt: <M extends HKT>(
  M: Monad<M>
) => <S, R2, W2, E2, B>(
  second: Lazy<Kind<M, S, R2, W2, E2, OptionModule.Option<B>>>
) => <R1, W1, E1, A>(
  first: Kind<M, S, R1, W1, E1, OptionModule.Option<A>>
) => Kind<M, S, R1 & R2, W2 | W1, E2 | E1, OptionModule.Option<B | A>>
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends HKT>(
  F: ApplyModule.Apply<F>
) => <S, R2, W2, E2, A>(
  fa: Kind<F, S, R2, W2, E2, OptionModule.Option<A>>
) => <R1, W1, E1, B>(
  fab: Kind<F, S, R1, W1, E1, OptionModule.Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, OptionModule.Option<B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare const chain: <M extends HKT>(
  M: Monad<M>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<M, S, R, W, E, OptionModule.Option<B>>
) => (ma: Kind<M, S, R, W, E, OptionModule.Option<A>>) => Kind<M, S, R, W, E, OptionModule.Option<B>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends HKT>(
  F: FunctorModule.Functor<F>
) => <B>(
  onNone: Lazy<B>
) => <S, R, W, E, A>(fa: Kind<F, S, R, W, E, OptionModule.Option<A>>) => Kind<F, S, R, W, E, B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <M extends HKT>(
  M: Monad<M>
) => <S, R2, W2, E2, B>(
  onNone: Lazy<Kind<M, S, R2, W2, E2, B>>
) => <R1, W1, E1, A>(ma: Kind<M, S, R1, W1, E1, OptionModule.Option<A>>) => Kind<M, S, R1 & R2, W2 | W1, E2 | E1, B | A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, Option<B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends HKT>(
  F: Functor<F>
): <B, A, C = B>(
  onNone: () => B,
  onSome: (a: A) => C
) => <S, R, W, E>(ma: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <M extends HKT>(
  M: Chain<M>
) => <S, R2, W2, E2, B, A, R3, W3, E3, C = B>(
  onNone: () => Kind<M, S, R2, W2, E2, B>,
  onSome: (a: A) => Kind<M, S, R3, W3, E3, C>
) => <R1, W1, E1>(
  ma: Kind<M, S, R1, W1, E1, OptionModule.Option<A>>
) => Kind<M, S, R1 & R2 & R3, W2 | W3 | W1, E2 | E3 | E1, B | C>
```

Added in v3.0.0

## zero

**Signature**

```ts
export declare function zero<F extends HKT>(F: Pointed<F>): <S, R, W, E, A>() => Kind<F, S, R, W, E, Option<A>>
```

Added in v3.0.0
