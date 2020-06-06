---
title: MonadTask.ts
nav_order: 53
parent: Modules
---

## MonadTask overview

Lift a computation from the `Task` monad

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [MonadTask (interface)](#monadtask-interface)
  - [MonadTask1 (interface)](#monadtask1-interface)
  - [MonadTask2 (interface)](#monadtask2-interface)
  - [MonadTask2C (interface)](#monadtask2c-interface)
  - [MonadTask3 (interface)](#monadtask3-interface)
  - [MonadTask3C (interface)](#monadtask3c-interface)
  - [MonadTask4 (interface)](#monadtask4-interface)

---

# type classes

## MonadTask (interface)

**Signature**

```ts
export interface MonadTask<M> extends MonadIO<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Added in v2.0.0

## MonadTask1 (interface)

**Signature**

```ts
export interface MonadTask1<M extends URIS> extends MonadIO1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<M, A>
}
```

Added in v2.0.0

## MonadTask2 (interface)

**Signature**

```ts
export interface MonadTask2<M extends URIS2> extends MonadIO2<M> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadTask2C (interface)

**Signature**

```ts
export interface MonadTask2C<M extends URIS2, E> extends MonadIO2C<M, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadTask3 (interface)

**Signature**

```ts
export interface MonadTask3<M extends URIS3> extends MonadIO3<M> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

Added in v2.0.0

## MonadTask3C (interface)

**Signature**

```ts
export interface MonadTask3C<M extends URIS3, E> extends MonadIO3C<M, E> {
  readonly fromTask: <R, A>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

Added in v2.2.0

## MonadTask4 (interface)

**Signature**

```ts
export interface MonadTask4<M extends URIS4> extends MonadIO4<M> {
  readonly fromTask: <S, R, E, A>(fa: Task<A>) => Kind4<M, S, R, E, A>
}
```

Added in v2.4.4
