---
title: Json.ts
nav_order: 55
parent: Modules
---

## Json overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (interface)](#jsonarray-interface)
  - [JsonRecord (interface)](#jsonrecord-interface)
  - [parse](#parse)
  - [stringify](#stringify)

---

# utils

## Json (type alias)

**Signature**

```ts
export type Json = boolean | number | string | null | JsonArray | JsonRecord
```

Added in v3.0.0

## JsonArray (interface)

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

Added in v3.0.0

## JsonRecord (interface)

**Signature**

```ts
export interface JsonRecord {
  readonly [key: string]: Json
}
```

Added in v3.0.0

## parse

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export declare const parse: (s: string) => Either<unknown, Json>
```

**Example**

```ts
import * as J from 'fp-ts/Json'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.right({ a: 1 }))
assert.deepStrictEqual(pipe('{"a":}', J.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v3.0.0

## stringify

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare const stringify: <A>(a: A) => Either<unknown, string>
```

Added in v3.0.0
