---
title: object.ts
nav_order: 63
parent: Modules
---

## object overview

Added in v2.10.0

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
export declare const getAssignSemigroup: <A extends object = never>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/object'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
```

Added in v2.10.0
