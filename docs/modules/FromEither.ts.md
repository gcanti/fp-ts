---
title: FromEither.ts
nav_order: 33
parent: Modules
---

## FromEither overview

The `FromEither` type class represents those data types which support typed errors.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flatMapEitherK](#flatmapeitherk)
  - [flatMapOptionK](#flatmapoptionk)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [constructors](#constructors)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [type classes](#type-classes)
  - [FromEither (interface)](#fromeither-interface)

---

# combinators

## filter

**Signature**

```ts
export declare const filter: <M extends TypeLambda>(
  F: FromEither<M>,
  M: Flattenable<M>
) => {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <S, R, O, E1>(
    self: Kind<M, S, R, O, E1, C>
  ) => Kind<M, S, R, O, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <S, R, O, E1>(
    self: Kind<M, S, R, O, E1, B>
  ) => Kind<M, S, R, O, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <F extends TypeLambda>(
  F: FromEither<F>,
  M: Flattenable<F>
) => <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## flatMapEitherK

**Signature**

```ts
export declare const flatMapEitherK: <M extends TypeLambda>(
  F: FromEither<M>,
  M: Flattenable<M>
) => <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>) => Kind<M, S, R, O, E2 | E1, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <M extends TypeLambda>(
  F: FromEither<M>,
  M: Flattenable<M>
) => <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R, O>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <F extends TypeLambda>(
  F: FromEither<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <F extends TypeLambda>(
  F: FromEither<F>
) => <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  F: FromEither<F>,
  M: Flattenable<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S, R, O>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S, R, O>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends TypeLambda>(
  F: FromEither<F>,
  M: Flattenable<F>
) => <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
```

Added in v3.0.0

# constructors

## fromOption

**Signature**

```ts
export declare const fromOption: <F extends TypeLambda>(
  F: FromEither<F>
) => <E>(onNone: LazyArg<E>) => <A, S>(fa: Option<A>) => Kind<F, S, unknown, never, E, A>
```

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <F extends TypeLambda>(
  F: FromEither<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S>(
    c: C
  ) => Kind<F, S, unknown, never, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S>(b: B) => Kind<F, S, unknown, never, E, B>
}
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <M extends TypeLambda>(
  F: FromEither<M>,
  M: Flattenable<M>
) => <E>(
  onNullable: LazyArg<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, O>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends TypeLambda>(
  F: FromEither<F>
) => <E>(onNullable: LazyArg<E>) => <A, S>(a: A) => Kind<F, S, unknown, never, E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <F extends TypeLambda>(
  F: FromEither<F>
) => <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <S>(...a: A) => Kind<F, S, unknown, never, E, NonNullable<B>>
```

Added in v3.0.0

# type classes

## FromEither (interface)

**Signature**

```ts
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <E, A, S>(fa: Either<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0
