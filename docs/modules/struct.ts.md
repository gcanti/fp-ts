---
title: struct.ts
nav_order: 103
parent: Modules
---

## struct overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)
- [utils](#utils)
  - [evolve](#evolve)
  - [prop](#prop)

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
import { getAssignSemigroup } from 'fp-ts/struct'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
```

Added in v2.10.0

# utils

## evolve

Creates a new object by recursively evolving a shallow copy of `a`, according to the `transformation` functions.

**Signature**

```ts
export declare const evolve: <A, F extends { [K in keyof A]: (a: A[K]) => unknown }>(
  transformations: F
) => (a: A) => { [K in keyof F]: ReturnType<F[K]> }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { evolve } from 'fp-ts/struct'

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

Added in v2.11.0

## prop

Accesses a property of an object

**Signature**

```ts
export declare const prop: <Path extends keyof A extends never ? string : keyof A, A>(
  path: Path
) => <B extends { [k in Path]: unknown }>(
  obj: keyof A extends never ? B : A
) => Path extends keyof A ? A[Path] : B[Path]
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { prop } from 'fp-ts/struct'

type Person = {
  readonly name: string
  readonly age: number
}

const person: Person = { name: 'Jane', age: 62 }
assert.deepStrictEqual(prop('name')(person), 'Jane')
assert.deepStrictEqual(pipe(person, prop('age')), 62)
```

Added in v2.11.0
