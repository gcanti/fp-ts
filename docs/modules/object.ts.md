---
title: object.ts
nav_order: 61
parent: Modules
---

## object overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)
- [utils](#utils)
  - [evolve](#evolve)

---

# instances

## getAssignSemigroup

Return a semigroup which works like `Object.assign`.

**Signature**

```ts
export declare const getAssignSemigroup: <A extends object = never>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/object'
import { pipe } from 'fp-ts/function'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
```

Added in v3.0.0

# utils

## evolve

Creates a new object by recursively evolving a shallow copy of `a`, according to the `transformation` functions.

**Signature**

```ts
export declare const evolve: <A extends object, F extends { [K in keyof A]: (a: A[K]) => unknown }>(
  transformations: F
) => (a: A) => { [K in keyof F]: ReturnType<F[K]> }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { evolve } from 'fp-ts/object'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1 },
    evolve({
      a: (a) => a.length,
      b: (b) => b * 2,
    })
  ),
  { a: 1, b: 2 }
)
```

Added in v3.0.0
