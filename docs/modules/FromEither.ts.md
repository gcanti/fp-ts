---
title: FromEither.ts
nav_order: 34
parent: Modules
---

## FromEither overview

The `FromEither` type class represents those data types which support errors.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainOptionK](#chainoptionk)
  - [filterOrElse](#filterorelse)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [refineOrElse](#refineorelse)
- [constructors](#constructors)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromPredicateOrElse](#frompredicateorelse)
  - [fromRefinement](#fromrefinement)
  - [fromRefinementOrElse](#fromrefinementorelse)
- [type classes](#type-classes)
  - [FromEither (interface)](#fromeither-interface)

---

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <M extends HKT>(
  F: FromEither<M>,
  M: ChainModule.Chain<M>
) => <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, W, E1>(ma: Kind<M, S, R, W, E1, A>) => Kind<M, S, R, W, E2 | E1, B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <M extends HKT>(
  F: FromEither<M>,
  M: ChainModule.Chain<M>
) => <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, W, E1>(ma: Kind<M, S, R, W, E1, A>) => Kind<M, S, R, W, E2 | E1, A>
```

Added in v3.0.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <M extends HKT>(
  F: FromEither<M>,
  M: ChainModule.Chain<M>
) => <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <S, R, W>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: <M extends HKT>(
  F: FromEither<M>,
  M: ChainModule.Chain<M>
) => <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <S, R, W, E1>(mb: Kind<M, S, R, W, E1, B>) => Kind<M, S, R, W, E2 | E1, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <F extends HKT>(
  F: FromEither<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => <S, R = unknown, W = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <F extends HKT>(
  F: FromEither<F>
) => <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => <S, R = unknown, W = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## refineOrElse

**Signature**

```ts
export declare const refineOrElse: <M extends HKT>(
  F: FromEither<M>,
  M: ChainModule.Chain<M>
) => <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <S, R, W, E1>(ma: Kind<M, S, R, W, E1, C>) => Kind<M, S, R, W, E2 | E1, B>
```

Added in v3.0.0

# constructors

## fromOption

**Signature**

```ts
export declare const fromOption: <F extends HKT>(
  F: FromEither<F>
) => <E>(onNone: Lazy<E>) => <A, S, R = unknown, W = never>(fa: Option<A>) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <F extends HKT>(
  F: FromEither<F>
) => <B extends A, A = B>(predicate: Predicate<A>) => <S, R = unknown, W = never>(b: B) => Kind<F, S, R, W, B, B>
```

Added in v3.0.0

## fromPredicateOrElse

**Signature**

```ts
export declare const fromPredicateOrElse: <F extends HKT>(
  F: FromEither<F>
) => <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <S, R = unknown, W = never>(b: B) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## fromRefinement

**Signature**

```ts
export declare const fromRefinement: <F extends HKT>(
  F: FromEither<F>
) => <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => <S, R = unknown, W = never>(c: C) => Kind<F, S, R, W, C, B>
```

Added in v3.0.0

## fromRefinementOrElse

**Signature**

```ts
export declare const fromRefinementOrElse: <F extends HKT>(
  F: FromEither<F>
) => <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <S, R = unknown, W = never>(c: C) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# type classes

## FromEither (interface)

**Signature**

```ts
export interface FromEither<F extends HKT> extends Typeclass<F> {
  readonly fromEither: <E, A, S, R = unknown, W = never>(fa: Either<E, A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
