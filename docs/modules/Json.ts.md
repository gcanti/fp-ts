---
title: Json.ts
nav_order: 56
parent: Modules
---

## Json overview

Added in v2.10.0

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

Added in v2.10.0

## JsonArray (interface)

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

Added in v2.10.0

## JsonRecord (interface)

**Signature**

```ts
export interface JsonRecord {
  readonly [key: string]: Json
}
```

Added in v2.10.0

## parse

Converts a JavaScript Object Notation (JSON) string into a `Json` type.

**Signature**

```ts
export declare const parse: (s: string) => Either<unknown, Json>
```

**Example**

```ts
import * as J from 'fp-ts/Json'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('{"a":1}', J.parse), E.right({ a: 1 }))
assert.deepStrictEqual(pipe('{"a":}', J.parse), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v2.10.0

## stringify

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare const stringify: <A>(a: A) => Either<unknown, string>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as J from 'fp-ts/Json'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(J.stringify({ a: 1 }), E.right('{"a":1}'))
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(
  pipe(
    J.stringify(circular),
    E.mapLeft((e) => e instanceof Error && e.message.includes('Converting circular structure to JSON'))
  ),
  E.left(true)
)
```

Added in v2.10.0
