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

- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [lifting](#lifting)
  - [liftEither](#lifteither)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [model](#model)
  - [FromEither (interface)](#fromeither-interface)
- [sequencing](#sequencing)
  - [flatMapEither](#flatmapeither)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)

---

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => <E>(onNullable: LazyArg<E>) => <A, S>(a: A) => Kind<F, S, unknown, never, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => <E>(onNone: LazyArg<E>) => <A, S>(self: Option<A>) => Kind<F, S, unknown, never, E, A>
```

Added in v3.0.0

# filtering

## filter

**Signature**

```ts
export declare const filter: <F extends TypeLambda>(
  FromEither: FromEither<F>,
  Flattenable: Flattenable<F>
) => {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <S, R, O, E1>(
    self: Kind<F, S, R, O, E1, C>
  ) => Kind<F, S, R, O, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <S, R, O, E1>(
    self: Kind<F, S, R, O, E1, B>
  ) => Kind<F, S, R, O, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <F extends TypeLambda>(
  FromEither: FromEither<F>,
  Flattenable: Flattenable<F>
) => <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  FromEither: FromEither<F>,
  Flattenable: Flattenable<F>
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
  FromEither: FromEither<F>,
  Flattenable: Flattenable<F>
) => <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
```

Added in v3.0.0

# lifting

## liftEither

**Signature**

```ts
export declare const liftEither: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: LazyArg<E>
) => <S>(...a: A) => Kind<F, S, unknown, never, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: <F extends TypeLambda>(
  FromEither: FromEither<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): <S>(
    c: C
  ) => Kind<F, S, unknown, never, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): <S>(b: B) => Kind<F, S, unknown, never, E, B>
}
```

Added in v3.0.0

# model

## FromEither (interface)

**Signature**

```ts
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <E, A, S>(fa: Either<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0

# sequencing

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <M extends TypeLambda>(
  FromEither: FromEither<M>,
  Flattenable: Flattenable<M>
) => <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>) => Kind<M, S, R, O, E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <M extends TypeLambda>(
  FromEither: FromEither<M>,
  Flattenable: Flattenable<M>
) => <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: LazyArg<E2>
) => <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>) => Kind<M, S, R, O, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <F extends TypeLambda>(
  FromEither: FromEither<F>,
  Flattenable: Flattenable<F>
) => <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0
