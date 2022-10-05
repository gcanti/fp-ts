---
title: struct.ts
nav_order: 97
parent: Modules
---

## struct overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)

---

# instances

## getAssignSemigroup

Return a semigroup which works like `Object.assign`.

**Signature**

```ts
export declare const getAssignSemigroup: <A>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/struct'
import { pipe } from 'fp-ts/Function'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.combine({ name: 'name', age: 24 })), { name: 'name', age: 24 })
```

Added in v3.0.0
