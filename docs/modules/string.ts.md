---
title: string.ts
nav_order: 90
parent: Modules
---

## string overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Semigroup](#semigroup)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<string>
```

Added in v2.10.0

## Semigroup

`string` semigroup under concatenation.

**Signature**

```ts
export declare const Semigroup: S.Semigroup<string>
```

**Example**

```ts
import { Semigroup } from 'fp-ts/string'

assert.deepStrictEqual(Semigroup.concat('a', 'b'), 'ab')
```

Added in v2.10.0
