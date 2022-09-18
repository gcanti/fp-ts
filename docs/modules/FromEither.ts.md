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
- [constructors](#constructors)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
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
export declare function filterOrElse<M extends HKT>(
  F: FromEither<M>,
  M: Chain<M>
): {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, R, W, E1>(
    ma: Kind<M, S, R, W, E1, A>
  ) => Kind<M, S, R, W, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, W, E1, B extends A>(
    mb: Kind<M, S, R, W, E1, B>
  ) => Kind<M, S, R, W, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, R, W, E1>(
    ma: Kind<M, S, R, W, E1, A>
  ) => Kind<M, S, R, W, E1 | E2, A>
}
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
) => {
  <A, B extends A>(refinement: Refinement<A, B>): <S, R = unknown, W = never>(a: A) => Kind<F, S, R, W, A, B>
  <A>(predicate: Predicate<A>): <B extends A, S, R = unknown, W = never>(b: B) => Kind<F, S, R, W, B, B>
}
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
