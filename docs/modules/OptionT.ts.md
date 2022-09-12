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
export declare function alt<M extends HKT>(
  M: Monad<M>
): <S, R, E, A>(
  second: Lazy<Kind<M, S, R, E, Option<A>>>
) => (first: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<A>>
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare function ap<F extends HKT>(
  F: Apply<F>
): <S, R, E, A>(
  fa: Kind<F, S, R, E, Option<A>>
) => <B>(fab: Kind<F, S, R, E, Option<(a: A) => B>>) => Kind<F, S, R, E, Option<B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends HKT>(
  M: Monad<M>
): <A, S, R, E, B>(
  f: (a: A) => Kind<M, S, R, E, Option<B>>
) => (ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<B>>
```

Added in v3.0.0

## chainNullableK

**Signature**

```ts
export declare function chainNullableK<M extends HKT>(
  M: Monad<M>
): <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, E>(ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<NonNullable<B>>>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare function chainOptionK<M extends HKT>(
  M: Monad<M>
): <A, B>(f: (a: A) => Option<B>) => <S, R, E>(ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, Option<B>>
```

Added in v3.0.0

## fromEither

**Signature**

```ts
export declare function fromEither<F extends HKT>(
  F: Pointed<F>
): <A, S, R, E>(e: Either<unknown, A>) => Kind<F, S, R, E, Option<A>>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends HKT>(
  F: Functor<F>
): <S, R, E, A>(ma: Kind<F, S, R, E, A>) => Kind<F, S, R, E, Option<A>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare function fromNullable<F extends HKT>(
  F: Pointed<F>
): <A, S, R, E>(a: A) => Kind<F, S, R, E, Option<NonNullable<A>>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare function fromNullableK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <S, R, E>(...a: A) => Kind<F, S, R, E, Option<NonNullable<B>>>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare function fromOptionK<F extends HKT>(
  F: Pointed<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <S, R, E>(...a: A) => Kind<F, S, R, E, Option<B>>
```

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare function fromPredicate<F extends HKT>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R, E>(a: A) => Kind<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A, S, R, E>(b: B) => Kind<F, S, R, E, Option<B>>
  <A>(predicate: Predicate<A>): <S, R, E>(a: A) => Kind<F, S, R, E, Option<A>>
}
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare function getOrElse<F extends HKT>(
  F: Functor<F>
): <A>(onNone: Lazy<A>) => <S, R, E>(fa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare function getOrElseE<M extends HKT>(
  M: Monad<M>
): <S, R, E, A>(onNone: Lazy<Kind<M, S, R, E, A>>) => (fa: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, Option<B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends HKT>(
  F: Functor<F>
): <B, A>(onNone: () => B, onSome: (a: A) => B) => <S, R, E>(ma: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, B>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare function matchE<M extends HKT>(
  M: Chain<M>
): <S, R, E, B, A>(
  onNone: () => Kind<M, S, R, E, B>,
  onSome: (a: A) => Kind<M, S, R, E, B>
) => (ma: Kind<M, S, R, E, Option<A>>) => Kind<M, S, R, E, B>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare function some<F extends HKT>(F: Pointed<F>): <A, S, R, E>(a: A) => Kind<F, S, R, E, Option<A>>
```

Added in v3.0.0

## zero

**Signature**

```ts
export declare function zero<F extends HKT>(F: Pointed<F>): <S, R, E, A>() => Kind<F, S, R, E, Option<A>>
```

Added in v3.0.0
