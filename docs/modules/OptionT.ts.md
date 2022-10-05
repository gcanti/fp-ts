---
title: OptionT.ts
nav_order: 67
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [OptionT (interface)](#optiont-interface)
  - [ap](#ap)
  - [catchAll](#catchall)
  - [emptyKind](#emptykind)
  - [flatMap](#flatmap)
  - [fromKind](#fromkind)
  - [fromResult](#fromresult)
  - [getOrElse](#getorelse)
  - [getOrElseKind](#getorelsekind)
  - [map](#map)
  - [match](#match)
  - [matchKind](#matchkind)
  - [orElse](#orelse)
  - [some](#some)
  - [tapError](#taperror)

---

# utils

## OptionT (interface)

**Signature**

```ts
export interface OptionT<F extends TypeLambda> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Option<this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  Apply: Apply<F>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, Option<A>>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, Option<(a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, Option<B>>
```

Added in v3.0.0

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, E2, B>(
  that: LazyArg<Kind<F, S, R2, O2, E2, Option<B>>>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, Option<A>>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, Option<B | A>>
```

Added in v3.0.0

## emptyKind

**Signature**

```ts
export declare const emptyKind: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <S, A>() => Kind<F, S, unknown, never, never, Option<A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  Monad: Monad<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => (self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Option<A>>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A, S>(e: Result<unknown, A>) => Kind<F, S, unknown, never, never, Option<A>>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends TypeLambda>(
  Functor: Functor<F>
) => <B>(onNone: B) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, B | A>
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, E2, B>(
  onNone: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, Option<A>>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, B | A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  Functor: Functor<F>
) => <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <F extends TypeLambda>(
  Functor: Functor<F>
) => <B, A, C = B>(
  onNone: LazyArg<B>,
  onSome: (a: A) => C
) => <S, R, O, E>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, B | C>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2, B, A, R3, O3, E3, C = B>(
  onNone: LazyArg<Kind<F, S, R2, O2, E2, B>>,
  onSome: (a: A) => Kind<F, S, R3, O3, E3, C>
) => <R1, O1, E1>(
  self: Kind<F, S, R1, O1, E1, Option<A>>
) => Kind<F, S, R1 & R2 & R3, O2 | O3 | O1, E2 | E3 | E1, B | C>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, E2, B>(
  that: Kind<F, S, R2, O2, E2, Option<B>>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, Option<A>>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, Option<B | A>>
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, Option<A>>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <F extends TypeLambda>(
  Monad: Monad<F>
) => <S, R2, O2, E2>(
  onNone: Kind<F, S, R2, O2, E2, Option<unknown>>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, Option<A>>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, Option<A>>
```

Added in v3.0.0
