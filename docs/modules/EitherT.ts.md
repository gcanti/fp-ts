---
title: EitherT.ts
nav_order: 23
parent: Modules
---

## EitherT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [EitherT (interface)](#eithert-interface)
  - [ap](#ap)
  - [bracket](#bracket)
  - [catchAll](#catchall)
  - [compact](#compact)
  - [fail](#fail)
  - [failKind](#failkind)
  - [flatMap](#flatmap)
  - [flatMapError](#flatmaperror)
  - [fromKind](#fromkind)
  - [getOrElse](#getorelse)
  - [getOrElseKind](#getorelsekind)
  - [getValidatedCombineKind](#getvalidatedcombinekind)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [match](#match)
  - [matchKind](#matchkind)
  - [orElse](#orelse)
  - [separate](#separate)
  - [succeed](#succeed)
  - [swap](#swap)
  - [tapLeft](#tapleft)
  - [toUnion](#tounion)

---

# utils

## EitherT (interface)

**Signature**

```ts
export interface EitherT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Result<E, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  Apply: Apply<F>
) => <S, R2, O2, FE2, E2, A>(
  fa: Kind<F, S, R2, O2, FE2, Result<E2, A>>
) => <R1, O1, FE1, E1, B>(
  self: Kind<F, S, R1, O1, FE1, Result<E1, (a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E2 | E1, B>>
```

Added in v3.0.0

## bracket

**Signature**

```ts
export declare const bracket: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R1, O1, FE1, E1, A, R2, O2, FE2, E2, B, R3, O3, FE3, E3>(
  acquire: Kind<F, S, R1, O1, FE1, Result<E1, A>>,
  use: (a: A) => Kind<F, S, R2, O2, FE2, Result<E2, B>>,
  release: (a: A, e: Result<E2, B>) => Kind<F, S, R3, O3, FE3, Result<E3, void>>
) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, FE1 | FE2 | FE3, Result<E1 | E2 | E3, B>>
```

Added in v3.0.0

## catchAll

**Signature**

```ts
export declare const catchAll: <F extends TypeLambda>(
  Monad: Monad<F>
) => <E1, S, R2, O2, FE2, E2, B>(
  onError: (e: E1) => Kind<F, S, R2, O2, FE2, Result<E2, B>>
) => <R1, O1, FE1, A>(
  self: Kind<F, S, R1, O1, FE1, Result<E1, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E2, B | A>>
```

Added in v3.0.0

## compact

**Signature**

```ts
export declare const compact: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E>(
  onNone: E
) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, Result<E, Option<A>>>) => Kind<F, S, R, O, FE, Result<E, A>>
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <E, S>(e: E) => Kind<F, S, unknown, never, never, Result<E, never>>
```

Added in v3.0.0

## failKind

**Signature**

```ts
export declare const failKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, E>(fe: Kind<F, S, R, O, FE, E>) => Kind<F, S, R, O, FE, Result<E, never>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  Monad: Monad<F>
) => <A, S, R2, O2, FE2, E2, B>(
  f: (a: A) => Kind<F, S, R2, O2, FE2, Result<E2, B>>
) => <R1, O1, FE1, E1>(
  self: Kind<F, S, R1, O1, FE1, Result<E1, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E2 | E1, B>>
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <F extends TypeLambda>(
  Monad: Monad<F>
) => <E1, S, R, O, FE, E2>(
  f: (e: E1) => Kind<F, S, R, O, FE, E2>
) => <A>(self: Kind<F, S, R, O, FE, Result<E1, A>>) => Kind<F, S, R, O, FE, Result<E2, A>>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, A>(fa: Kind<F, S, R, O, FE, A>) => Kind<F, S, R, O, FE, Result<never, A>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends TypeLambda>(
  Functor: Functor<F>
) => <B>(onError: B) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, Result<unknown, A>>) => Kind<F, S, R, O, FE, B | A>
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, FE2, B>(
  onError: Kind<F, S, R2, O2, FE2, B>
) => <R1, O1, FE1, A>(
  self: Kind<F, S, R1, O1, FE1, Result<unknown, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, B | A>
```

Added in v3.0.0

## getValidatedCombineKind

**Signature**

```ts
export declare const getValidatedCombineKind: <F extends TypeLambda, E>(
  Monad: Monad<F>,
  Semigroup: Semigroup<E>
) => <S, R2, O2, FE2, B>(
  that: Kind<F, S, R2, O2, FE2, Result<E, B>>
) => <R1, O1, FE1, A>(
  self: Kind<F, S, R1, O1, FE1, Result<E, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E, B | A>>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  Functor: Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, Result<E, B>>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, Result<G, B>>
```

Added in v3.0.0

## mapError

**Signature**

```ts
export declare const mapError: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, G>(
  f: (e: E) => G
) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, Result<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, B | C>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <E, S, R2, O2, FE2, B, A, R3, O3, FE3, C = B>(
  onError: (e: E) => Kind<F, S, R2, O2, FE2, B>,
  onSuccess: (a: A) => Kind<F, S, R3, O3, FE3, C>
) => <R1, O1, FE1>(
  self: Kind<F, S, R1, O1, FE1, Result<E, A>>
) => Kind<F, S, R1 & R2 & R3, O2 | O3 | O1, FE2 | FE3 | FE1, B | C>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, FE2, E2, B>(
  that: Kind<F, S, R2, O2, FE2, Result<E2, B>>
) => <R1, O1, FE1, E1, A>(
  self: Kind<F, S, R1, O1, FE1, Result<E1, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E2, B | A>>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E>(
  onEmpty: E
) => <S, R, O, FE, A, B>(
  self: Kind<F, S, R, O, FE, Result<E, Result<A, B>>>
) => readonly [Kind<F, S, R, O, FE, Result<E, A>>, Kind<F, S, R, O, FE, Result<E, B>>]
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, Result<never, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, Result<A, E>>
```

Added in v3.0.0

## tapLeft

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapLeft: <F extends TypeLambda>(
  Monad: Monad<F>
) => <E1, S, R2, O2, FE2, E2>(
  onError: (e: E1) => Kind<F, S, R2, O2, FE2, Result<E2, unknown>>
) => <R1, O1, FE1, A>(
  self: Kind<F, S, R1, O1, FE1, Result<E1, A>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, Result<E1 | E2, A>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, Result<E, A>>) => Kind<F, S, R, O, FE, E | A>
```

Added in v3.0.0
