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
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainTaskK](#chaintaskk)
  - [fromTaskK](#fromtaskk)
- [type classes](#type-classes)
  - [FromTask (interface)](#fromtask-interface)

---

# combinators

## chainFirstTaskK

**Signature**

```ts
export declare function chainFirstTaskK<M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare function chainTaskK<M extends HKT>(
  F: FromTask<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => Task<B>) => <S, R, E>(first: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare function fromTaskK<F extends HKT>(
  F: FromTask<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Task<B>) => <S, R, E>(...a: A) => Kind<F, S, R, E, B>
```

Added in v3.0.0

# type classes

## FromTask (interface)

**Signature**

```ts
export interface FromTask<F extends HKT> extends FromIO<F> {
  readonly fromTask: <A, S, R, E>(fa: Task<A>) => Kind<F, S, R, E, A>
}
```

Added in v3.0.0
