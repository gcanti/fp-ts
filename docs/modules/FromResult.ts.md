---
title: FromResult.ts
nav_order: 38
parent: Modules
---

## FromResult overview

The `FromResult` type class represents those data types which support typed errors.

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
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
- [model](#model)
  - [FromResult (interface)](#fromresult-interface)
- [sequencing](#sequencing)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapResult](#flatmapresult)

---

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => <E>(onNullable: E) => <A, S>(a: A) => Kind<F, S, unknown, never, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => <E>(onNone: E) => <A, S>(self: Option<A>) => Kind<F, S, unknown, never, E, A>
```

Added in v3.0.0

# filtering

## filter

**Signature**

```ts
export declare const filter: <F extends TypeLambda>(
  FromResult: FromResult<F>,
  Flattenable: Flattenable<F>
) => {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <S, R, O, E1>(
    self: Kind<F, S, R, O, E1, C>
  ) => Kind<F, S, R, O, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <S, R, O, E1>(
    self: Kind<F, S, R, O, E1, B>
  ) => Kind<F, S, R, O, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <F extends TypeLambda>(
  FromResult: FromResult<F>,
  Flattenable: Flattenable<F>
) => <A, B, E>(f: (a: A) => Option<B>, onNone: E) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  FromResult: FromResult<F>,
  Flattenable: Flattenable<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S, R, O>(
    self: Kind<F, S, R, O, E, C>
  ) => readonly [Kind<F, S, R, O, E, C>, Kind<F, S, R, O, E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S, R, O>(
    self: Kind<F, S, R, O, E, B>
  ) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends TypeLambda>(
  FromResult: FromResult<F>,
  Flattenable: Flattenable<F>
) => <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => readonly [Kind<F, S, R, O, E, B>, Kind<F, S, R, O, E, C>]
```

Added in v3.0.0

# lifting

## liftNullable

**Signature**

```ts
export declare const liftNullable: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => <S>(...a: A) => Kind<F, S, unknown, never, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): <S>(
    c: C
  ) => Kind<F, S, unknown, never, E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): <S>(b: B) => Kind<F, S, unknown, never, E, B>
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <F extends TypeLambda>(
  FromResult: FromResult<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => Result<E, B>
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

# model

## FromResult (interface)

**Signature**

```ts
export interface FromResult<F extends TypeLambda> extends TypeClass<F> {
  readonly fromResult: <E, A, S>(fa: Result<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0

# sequencing

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <M extends TypeLambda>(
  FromResult: FromResult<M>,
  Flattenable: Flattenable<M>
) => <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>) => Kind<M, S, R, O, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <F extends TypeLambda>(
  FromResult: FromResult<F>,
  Flattenable: Flattenable<F>
) => <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <S, R, O, E1>(self: Kind<F, S, R, O, E1, A>) => Kind<F, S, R, O, E2 | E1, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <M extends TypeLambda>(
  FromResult: FromResult<M>,
  Flattenable: Flattenable<M>
) => <A, E2, B>(
  f: (a: A) => Result<E2, B>
) => <S, R, O, E1>(self: Kind<M, S, R, O, E1, A>) => Kind<M, S, R, O, E2 | E1, B>
```

Added in v3.0.0
