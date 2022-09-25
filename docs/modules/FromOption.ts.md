---
title: FromOption.ts
nav_order: 35
parent: Modules
---

## FromOption overview

The `FromEither` type class represents those data types which support untyped errors.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromOptionK](#fromoptionk)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [fromRefinement](#fromrefinement)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
- [type classes](#type-classes)
  - [FromOption (interface)](#fromoption-interface)

---

# combinators

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <F extends TypeLambda>(
  F: FromOption<F>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => Option<B>
) => <S>(...a: A) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: <F extends TypeLambda>(
  F: FromOption<F>
) => <B extends A, A = B>(predicate: Predicate<A>) => <S>(b: B) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

## fromRefinement

**Signature**

```ts
export declare const fromRefinement: <F extends TypeLambda>(
  F: FromOption<F>
) => <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => <S>(c: C) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <F extends TypeLambda>(
  F: FromOption<F>,
  C: Flattenable<F>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <F extends TypeLambda>(
  F: FromOption<F>
) => <A, S, R, W, E>(a: A) => Kind<F, S, R, W, E, NonNullable<A>>
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <F extends TypeLambda>(
  F: FromOption<F>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <S, R, W, E>(...a: A) => Kind<F, S, R, W, E, NonNullable<B>>
```

Added in v3.0.0

# type classes

## FromOption (interface)

**Signature**

```ts
export interface FromOption<F extends TypeLambda> extends TypeClass<F> {
  readonly fromOption: <A, S>(fa: Option<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
