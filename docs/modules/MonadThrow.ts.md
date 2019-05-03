---
title: MonadThrow.ts
nav_order: 56
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [MonadThrow (interface)](#monadthrow-interface)
- [MonadThrow2 (interface)](#monadthrow2-interface)
- [MonadThrow2C (interface)](#monadthrow2c-interface)
- [MonadThrow3 (interface)](#monadthrow3-interface)
- [MonadThrow3C (interface)](#monadthrow3c-interface)

---

# MonadThrow (interface)

The `MonadThrow` type class represents those monads which support errors via
`throwError`, where `throwError(e)` halts, yielding the error `e`.

Laws:

- Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`

**Signature**

```ts
export interface MonadThrow<M> {
  readonly URI: M
  readonly map: <L, A, B>(fa: HKT2<M, L, A>, f: (a: A) => B) => HKT2<M, L, B>
  readonly ap: <L, A, B>(fab: HKT2<M, L, (a: A) => B>, fa: HKT2<M, L, A>) => HKT2<M, L, B>
  readonly of: <L, A>(a: A) => HKT2<M, L, A>
  readonly chain: <L, A, B>(fa: HKT2<M, L, A>, f: (a: A) => HKT2<M, L, B>) => HKT2<M, L, B>
  readonly throwError: <E, A>(e: E) => HKT2<M, E, A>
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<M, E, A>
  readonly fromOption: <E, A>(o: Option<A>, onNone: () => E) => HKT2<M, E, A>
}
```

Added in v2.0.0

# MonadThrow2 (interface)

**Signature**

```ts
export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <E, A>(e: E) => Type2<M, E, A>
  readonly fromEither: <E, A>(e: Either<E, A>) => Type2<M, E, A>
  readonly fromOption: <E, A>(o: Option<A>, onNone: () => E) => Type2<M, E, A>
}
```

# MonadThrow2C (interface)

**Signature**

```ts
export interface MonadThrow2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly throwError: <A>(e: E) => Type2<M, E, A>
  readonly fromEither: <A>(e: Either<E, A>) => Type2<M, E, A>
  readonly fromOption: <A>(o: Option<A>, onNone: () => E) => Type2<M, E, A>
}
```

# MonadThrow3 (interface)

**Signature**

```ts
export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <U, E, A>(e: E) => Type3<M, U, E, A>
  readonly fromEither: <U, E, A>(e: Either<E, A>) => Type3<M, U, E, A>
  readonly fromOption: <U, E, A>(o: Option<A>, onNone: () => E) => Type3<M, U, E, A>
}
```

# MonadThrow3C (interface)

**Signature**

```ts
export interface MonadThrow3C<M extends URIS3, U, E> extends Monad3C<M, U, E> {
  readonly throwError: <A>(e: E) => Type3<M, U, E, A>
  readonly fromEither: <A>(e: Either<E, A>) => Type3<M, U, E, A>
  readonly fromOption: <A>(o: Option<A>, onNone: () => E) => Type3<M, U, E, A>
}
```
