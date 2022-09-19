---
title: FromTask.ts
nav_order: 39
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
export declare const chainFirstTaskK: <M extends HKT>(
  F: FromTask<M>,
  M: ChainModule.Chain<M>
) => <A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <M extends HKT>(
  F: FromTask<M>,
  M: ChainModule.Chain<M>
) => <A, B>(f: (a: A) => Task<B>) => <S, R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <F extends HKT>(
  F: FromTask<F>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => Task<B>
) => <S, R = unknown, W = never, E = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# type classes

## FromTask (interface)

**Signature**

```ts
export interface FromTask<F extends HKT> extends FromIO<F> {
  readonly fromTask: <A, S, R = unknown, W = never, E = never>(fa: Task<A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
