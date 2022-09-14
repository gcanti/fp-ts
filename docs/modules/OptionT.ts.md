---
title: OptionT.ts
nav_order: 65
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [alt](#alt)
  - [ap](#ap)
  - [chain](#chain)
  - [chainNullableK](#chainnullablek)
  - [chainOptionK](#chainoptionk)
  - [fromEither](#fromeither)
  - [fromF](#fromf)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [map](#map)
  - [match](#match)
  - [matchE](#matche)
  - [some](#some)
  - [zero](#zero)

---

# utils

## alt

**Signature**

```ts
export declare const alt: <M extends HKT>(
  M: Monad<M>
) => <S, R2, W2, E2, B>(
  second: Lazy<Kind<M, S, R2, W2, E2, O.Option<B>>>
) => <R1, W1, E1, A>(
  first: Kind<M, S, R1, W1, E1, O.Option<A>>
) => Kind<M, S, R1 & R2, W2 | W1, E2 | E1, O.Option<B | A>>
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends HKT>(
  F: Apply<F>
) => <S, R2, W2, E2, A>(
  fa: Kind<F, S, R2, W2, E2, O.Option<A>>
) => <R1, W1, E1, B>(
  fab: Kind<F, S, R1, W1, E1, O.Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, O.Option<B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare const chain: <M extends HKT>(
  M: Monad<M>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<M, S, R, W, E, O.Option<B>>
) => (ma: Kind<M, S, R, W, E, O.Option<A>>) => Kind<M, S, R, W, E, O.Option<B>>
```

Added in v3.0.0

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <M extends HKT>(
  M: Monad<M>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, E>(ma: Kind<M, S, R, W, E, O.Option<A>>) => Kind<M, S, R, W, E, O.Option<NonNullable<B>>>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <M extends HKT>(
  M: Monad<M>
) => <A, B>(
  f: (a: A) => O.Option<B>
) => <S, R, W, E>(ma: Kind<M, S, R, W, E, O.Option<A>>) => Kind<M, S, R, W, E, O.Option<B>>
```

Added in v3.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R, W, E>(e: Either<unknown, A>) => Kind<F, S, R, W, E, O.Option<A>>
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

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends HKT>(
  F: Pointed<F>
) => <A, S, R, W, E>(a: A) => Kind<F, S, R, W, E, O.Option<NonNullable<A>>>
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

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <F extends HKT>(
  F: Pointed<F>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => <S, R, W, E>(...a: A) => Kind<F, S, R, W, E, O.Option<B>>
```

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare function fromPredicate<F extends HKT>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, W, E>(a: A) => Kind<F, S, R, W, E, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A, S, R, W, E>(b: B) => Kind<F, S, R, W, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, W, E>(a: A) => Kind<F, S, R, W, E, Option<A>>
}
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends HKT>(
  F: Functor<F>
) => <B>(onNone: Lazy<B>) => <S, R, W, E, A>(fa: Kind<F, S, R, W, E, O.Option<A>>) => Kind<F, S, R, W, E, B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <M extends HKT>(
  M: Monad<M>
) => <S, R2, W2, E2, B>(
  onNone: Lazy<Kind<M, S, R2, W2, E2, B>>
) => <R1, W1, E1, A>(ma: Kind<M, S, R1, W1, E1, O.Option<A>>) => Kind<M, S, R1 & R2, W2 | W1, E2 | E1, B | A>
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
export declare function matchE<M extends HKT>(
  M: Chain<M>
): <S, R, W, E, B, A>(
  onNone: () => Kind<M, S, R, W, E, B>,
  onSome: (a: A) => Kind<M, S, R, W, E, B>
) => (ma: Kind<M, S, R, W, E, Option<A>>) => Kind<M, S, R, W, E, B>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <F extends HKT>(F: Pointed<F>) => <A, S, R, W, E>(a: A) => Kind<F, S, R, W, E, O.Option<A>>
```

Added in v3.0.0

## zero

**Signature**

```ts
export declare function zero<F extends HKT>(F: Pointed<F>): <S, R, W, E, A>() => Kind<F, S, R, W, E, Option<A>>
```

Added in v3.0.0
