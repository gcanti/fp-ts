---
title: MonadThrow.ts
nav_order: 59
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [MonadThrow (interface)](#monadthrow-interface)
- [MonadThrow1 (interface)](#monadthrow1-interface)
- [MonadThrow2 (interface)](#monadthrow2-interface)
- [MonadThrow2C (interface)](#monadthrow2c-interface)
- [MonadThrow3 (interface)](#monadthrow3-interface)
- [MonadThrow3C (interface)](#monadthrow3c-interface)
- [MonadThrow4 (interface)](#monadthrow4-interface)

---

# MonadThrow (interface)

The `MonadThrow` type class represents those monads which support errors via
`throwError`, where `throwError(e)` halts, yielding the error `e`.

Laws:

- Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`

**Signature**

```ts
export interface MonadThrow<M> extends Monad<M> {
  readonly throwError: <E, A>(e: E) => HKT<M, A>
  /** @deprecated */
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT<M, A>
  /** @deprecated */
  readonly fromOption: <E, A>(o: Option<A>, e: E) => HKT<M, A>
}
```

Added in v1.16.0

# MonadThrow1 (interface)

**Signature**

```ts
export interface MonadThrow1<M extends URIS> extends Monad1<M> {
  readonly throwError: <E, A>(e: E) => Kind<M, A>
  /** @deprecated */
  readonly fromEither: <E, A>(e: Either<E, A>) => Kind<M, A>
  /** @deprecated */
  readonly fromOption: <E, A>(o: Option<A>, e: E) => Kind<M, A>
}
```

# MonadThrow2 (interface)

**Signature**

```ts
export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <E, A>(e: E) => Kind2<M, E, A>
  /** @deprecated */
  readonly fromEither: <E, A>(e: Either<E, A>) => Kind2<M, E, A>
  /** @deprecated */
  readonly fromOption: <E, A>(o: Option<A>, e: E) => Kind2<M, E, A>
}
```

# MonadThrow2C (interface)

**Signature**

```ts
export interface MonadThrow2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly throwError: <A>(e: E) => Kind2<M, E, A>
  /** @deprecated */
  readonly fromEither: <A>(e: Either<E, A>) => Kind2<M, E, A>
  /** @deprecated */
  readonly fromOption: <A>(o: Option<A>, e: E) => Kind2<M, E, A>
}
```

# MonadThrow3 (interface)

**Signature**

```ts
export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <U, E, A>(e: E) => Kind3<M, U, E, A>
  /** @deprecated */
  readonly fromEither: <U, E, A>(e: Either<E, A>) => Kind3<M, U, E, A>
  /** @deprecated */
  readonly fromOption: <U, E, A>(o: Option<A>, e: E) => Kind3<M, U, E, A>
}
```

# MonadThrow3C (interface)

**Signature**

```ts
export interface MonadThrow3C<M extends URIS3, U, E> extends Monad3C<M, U, E> {
  readonly throwError: <A>(e: E) => Kind3<M, U, E, A>
  /** @deprecated */
  readonly fromEither: <A>(e: Either<E, A>) => Kind3<M, U, E, A>
  /** @deprecated */
  readonly fromOption: <A>(o: Option<A>, e: E) => Kind3<M, U, E, A>
}
```

# MonadThrow4 (interface)

**Signature**

```ts
export interface MonadThrow4<M extends URIS4> extends Monad4<M> {
  readonly throwError: <X, U, E, A>(e: E) => Kind4<M, X, U, E, A>
  /** @deprecated */
  readonly fromEither: <X, U, E, A>(e: Either<E, A>) => Kind4<M, X, U, E, A>
  /** @deprecated */
  readonly fromOption: <X, U, E, A>(o: Option<A>, e: E) => Kind4<M, X, U, E, A>
}
```
