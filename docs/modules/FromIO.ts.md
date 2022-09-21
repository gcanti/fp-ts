---
title: FromIO.ts
nav_order: 34
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [flatMapFirstIOK](#flatmapfirstiok)
  - [flatMapIOK](#flatmapiok)
  - [fromIOK](#fromiok)
- [type classes](#type-classes)
  - [FromIO (interface)](#fromio-interface)

---

# combinators

## flatMapFirstIOK

**Signature**

```ts
export declare const flatMapFirstIOK: <M extends HKT>(
  F: FromIO<M>,
  M: flat.Flat<M>
) => <A, B>(f: (a: A) => IO<B>) => <S, R, W, E>(first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>
```

Added in v3.0.0

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <M extends HKT>(
  F: FromIO<M>,
  M: flat.Flat<M>
) => <A, B>(f: (a: A) => IO<B>) => <S, R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <F extends HKT>(
  F: FromIO<F>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <S, R = unknown, W = never, E = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# type classes

## FromIO (interface)

**Signature**

```ts
export interface FromIO<F extends HKT> extends Typeclass<F> {
  readonly fromIO: <A, S, R = unknown, W = never, E = never>(fa: IO<A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
