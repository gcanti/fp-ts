---
title: tuple.ts
nav_order: 103
parent: Modules
---

## tuple overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [evolve](#evolve)
  - [tuple](#tuple)

---

# utils

## evolve

Creates a new tuple by recursively evolving a shallow copy of `as`, according to the `transformation` functions.

**Signature**

```ts
export declare const evolve: <A extends readonly unknown[], F extends { [K in keyof A]: (a: A[K]) => unknown }>(
  ...transformations: F
) => (as: A) => { [K in keyof F]: ReturnType<F[K]> }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { evolve } from 'fp-ts/tuple'

assert.deepStrictEqual(
  pipe(
    ['a', 1] as const,
    evolve(
      (s) => s.length,
      (n) => n * 2
    )
  ),
  [1, 2]
)
```

Added in v3.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly unknown[]>(...t: T) => T
```

Added in v3.0.0
