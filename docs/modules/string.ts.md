---
title: string.ts
nav_order: 86
parent: Modules
---

# string overview

Added in v2.6.0

---

<h2 class="text-delta">Table of contents</h2>

- [join](#join)
- [split](#split)

---

# join

Takes a `delimiter` string and joins given string values with the delimiter.

**Signature**

```ts
export declare function join(delimiter: string): (values: NonEmptyArray<string>) => string
```

**Example**

```ts
import { pipe } from 'fp-ts/lib/pipeable'
import { join } from 'fp-ts/lib/string'

assert.deepStrictEqual(pipe(['foo', 'bar'], join('.')), 'foo.bar')
```

Added in v2.6.0

# split

Takes a `delimiter` string and splits a given string value at the delimiter
returning one or more substrings.

**Signature**

```ts
export declare function split(delimiter: string): (value: string) => NonEmptyArray<string>
```

**Example**

```ts
import { pipe } from 'fp-ts/lib/pipeable'
import { split } from 'fp-ts/lib/string'

assert.deepStrictEqual(pipe('foo.bar', split('.')), ['foo', 'bar'])
```

Added in v2.6.0
