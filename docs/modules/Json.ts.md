---
title: Json.ts
nav_order: 14
parent: Modules
---

## Json overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Json (type alias)](#json-type-alias)
  - [parse](#parse)
  - [stringify](#stringify)

---

# utils

## Json (type alias)

**Signature**

```ts
export type Json =
  | boolean
  | number
  | string
  | null
  | ReadonlyArray<Json>
  | {
      readonly [key: string]: Json
    }
```

Added in v3.0.0

## parse

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export declare const parse: (s: string) => Result<unknown, Json>
```

**Example**

```ts
import * as J from 'fp-ts/Json'
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.succeed({ a: 1 }))
assert.deepStrictEqual(pipe('{"a":}', J.parse), E.fail(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v3.0.0

## stringify

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare const stringify: <A>(value: A) => Result<unknown, string>
```

Added in v3.0.0
