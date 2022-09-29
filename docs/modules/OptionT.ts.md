---
title: OptionT.ts
nav_order: 65
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tapNone](#tapnone)
- [constructors](#constructors)
  - [some](#some)
- [error handling](#error-handling)
  - [getOrElse](#getorelse)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromKind](#fromkind)
- [utils](#utils)
  - [ap](#ap)
  - [emptyKind](#emptykind)
  - [flatMap](#flatmap)
  - [getOrElseKind](#getorelsekind)
  - [map](#map)
  - [match](#match)
  - [matchKind](#matchkind)
  - [orElse](#orelse)

---

# combinators

## tapNone

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapNone: <M extends TypeLambda>(
  M: Monad<M>
) => <S, R2, O2, E2, _>(
  onNone: LazyArg<Kind<M, S, R2, O2, E2, option.Option<_>>>
) => <R1, O1, E1, A>(
  self: Kind<M, S, R1, O1, E1, option.Option<A>>
) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, option.Option<A>>
```

Added in v3.0.0

# constructors

## some

**Signature**

```ts
export declare const some: <F extends TypeLambda>(
  F: Pointed<F>
) => <A, S, R, O, E>(a: A) => Kind<F, S, R, O, E, option.Option<A>>
```

Added in v3.0.0

# error handling

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends TypeLambda>(
  F: functor.Functor<F>
) => <B>(
  onNone: LazyArg<B>
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, option.Option<A>>) => Kind<F, S, R, O, E, B | A>
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <F extends TypeLambda>(
  F: Pointed<F>
) => <A, S, R, O, E>(e: Either<unknown, A>) => Kind<F, S, R, O, E, option.Option<A>>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare function fromKind<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Option<A>>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: apply.Apply<F>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, option.Option<A>>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, option.Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, option.Option<B>>
```

Added in v3.0.0

## emptyKind

**Signature**

```ts
export declare function emptyKind<F extends TypeLambda>(
  F: Pointed<F>
): <S, R, O, E, A>() => Kind<F, S, R, O, E, Option<A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends TypeLambda>(
  M: Monad<M>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<M, S, R, O, E, option.Option<B>>
) => (self: Kind<M, S, R, O, E, option.Option<A>>) => Kind<M, S, R, O, E, option.Option<B>>
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <M extends TypeLambda>(
  M: Monad<M>
) => <S, R2, O2, E2, B>(
  onNone: LazyArg<Kind<M, S, R2, O2, E2, B>>
) => <R1, O1, E1, A>(self: Kind<M, S, R1, O1, E1, option.Option<A>>) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, B | A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends TypeLambda>(
  F: Functor<F>
): <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => <S, R, O, E>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, B | C>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <M extends TypeLambda>(
  M: Flattenable<M>
) => <S, R2, O2, E2, B, A, R3, W3, E3, C = B>(
  onNone: LazyArg<Kind<M, S, R2, O2, E2, B>>,
  onSome: (a: A) => Kind<M, S, R3, W3, E3, C>
) => <R1, O1, E1>(
  self: Kind<M, S, R1, O1, E1, option.Option<A>>
) => Kind<M, S, R1 & R2 & R3, O2 | W3 | O1, E2 | E3 | E1, B | C>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <M extends TypeLambda>(
  Monad: Monad<M>
) => <S, R2, O2, E2, B>(
  that: Kind<M, S, R2, O2, E2, option.Option<B>>
) => <R1, O1, E1, A>(
  self: Kind<M, S, R1, O1, E1, option.Option<A>>
) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, option.Option<B | A>>
```

Added in v3.0.0
