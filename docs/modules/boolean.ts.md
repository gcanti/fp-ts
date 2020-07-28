---
title: boolean.ts
nav_order: 7
parent: Modules
---

## boolean overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [destructors](#destructors)
  - [fold](#fold)

---

# destructors

## fold

Defines the fold over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare function fold<A>(onFalse: Lazy<A>, onTrue: Lazy<A>): (value: boolean) => A
```

**Example**

```ts
import { some, map } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/boolean'

assert.deepStrictEqual(
  pipe(
    some(true),
    map(
      fold(
        () => 'false',
        () => 'true'
      )
    )
  ),
  some('true')
)
```

Added in v2.2.0
