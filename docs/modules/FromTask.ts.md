---
title: FromTask.ts
nav_order: 36
parent: Modules
---

## FromTask overview

Lift a computation from the `Task` monad

Added in v2.10.0

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
export interface FromTask<F> extends FromIO<F> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<F, A>
}
```

Added in v2.10.0

## FromTask1 (interface)

**Signature**

```ts
export interface FromTask1<F extends URIS> extends FromIO1<F> {
  readonly fromTask: <A>(fa: Task<A>) => Kind<F, A>
}
```

Added in v2.10.0

## FromTask2 (interface)

**Signature**

```ts
export interface FromTask2<F extends URIS2> extends FromIO2<F> {
  readonly fromTask: <E, A>(fa: Task<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromTask2C (interface)

**Signature**

```ts
export interface FromTask2C<F extends URIS2, E> extends FromIO2C<F, E> {
  readonly fromTask: <A>(fa: Task<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromTask3 (interface)

**Signature**

```ts
export interface FromTask3<F extends URIS3> extends FromIO3<F> {
  readonly fromTask: <R, E, A>(fa: Task<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromTask3C (interface)

**Signature**

```ts
export interface FromTask3C<F extends URIS3, E> extends FromIO3C<F, E> {
  readonly fromTask: <R, A>(fa: Task<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromTask4 (interface)

**Signature**

```ts
export interface FromTask4<F extends URIS4> extends FromIO4<F> {
  readonly fromTask: <S, R, E, A>(fa: Task<A>) => Kind4<F, S, R, E, A>
}
```

Added in v2.10.0
