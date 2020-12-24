---
title: FromTask.ts
nav_order: 32
parent: Modules
---

## FromTask overview

Lift a computation from the `Task` monad

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FromTask (interface)](#fromtask-interface)
  - [FromTask1 (interface)](#fromtask1-interface)
  - [FromTask2 (interface)](#fromtask2-interface)
  - [FromTask2C (interface)](#fromtask2c-interface)
  - [FromTask3 (interface)](#fromtask3-interface)
  - [FromTask3C (interface)](#fromtask3c-interface)
  - [FromTask4 (interface)](#fromtask4-interface)

---

# type classes

## FromTask (interface)

**Signature**

```ts
export interface FromTask<M> extends FromIO<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Added in v3.0.0

## FromTask1 (interface)

**Signature**

```ts
export interface FromTask1<M extends URIS> extends FromIO1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<M, A>
}
```

Added in v3.0.0

## FromTask2 (interface)

**Signature**

```ts
export interface FromTask2<M extends URIS2> extends FromIO2<M> {
  readonly fromTask: <A, E>(fa: Task<A>) => Kind2<M, E, A>
}
```

Added in v3.0.0

## FromTask2C (interface)

**Signature**

```ts
export interface FromTask2C<M extends URIS2, E> extends FromIO2C<M, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<M, E, A>
}
```

Added in v3.0.0

## FromTask3 (interface)

**Signature**

```ts
export interface FromTask3<M extends URIS3> extends FromIO3<M> {
  readonly fromTask: <A, R, E>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

Added in v3.0.0

## FromTask3C (interface)

**Signature**

```ts
export interface FromTask3C<M extends URIS3, E> extends FromIO3C<M, E> {
  readonly fromTask: <A, R>(fa: Task<A>) => Kind3<M, R, E, A>
}
```

Added in v3.0.0

## FromTask4 (interface)

**Signature**

```ts
export interface FromTask4<M extends URIS4> extends FromIO4<M> {
  readonly fromTask: <A, S, R, E>(fa: Task<A>) => Kind4<M, S, R, E, A>
}
```

Added in v3.0.0
