---
title: FromTask.ts
nav_order: 38
parent: Modules
---

## FromTask overview

Lift a computation from the `Task` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [flatMapTaskK](#flatmaptaskk)
  - [fromTaskK](#fromtaskk)
- [type classes](#type-classes)
  - [FromTask (interface)](#fromtask-interface)

---

# combinators

## flatMapTaskK

**Signature**

```ts
export declare const flatMapTaskK: <M extends TypeLambda>(
  F: FromTask<M>,
  M: Flattenable<M>
) => <A, B>(f: (a: A) => Task<B>) => <S, R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <F extends TypeLambda>(
  F: FromTask<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => Task<B>) => <S>(...a: A) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# type classes

## FromTask (interface)

**Signature**

```ts
export interface FromTask<F extends TypeLambda> extends FromIO<F> {
  readonly fromTask: <A, S>(fa: Task<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
