---
title: FromIO.ts
nav_order: 35
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [fromIOK](#fromiok)
- [type classes](#type-classes)
  - [FromIO (interface)](#fromio-interface)

---

# combinators

## chainFirstIOK

**Signature**

```ts
export declare function chainFirstIOK<M extends HKT>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare function chainIOK<M extends HKT>(
  F: FromIO<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => IO<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare function fromIOK<F extends HKT>(
  F: FromIO<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) => <S, R, E>(...a: A) => Kind<F, S, R, E, B>
```

Added in v3.0.0

# type classes

## FromIO (interface)

**Signature**

```ts
export interface FromIO<F extends HKT> extends Typeclass<F> {
  readonly fromIO: <A, S, R, E>(fa: IO<A>) => Kind<F, S, R, E, A>
}
```

Added in v3.0.0
