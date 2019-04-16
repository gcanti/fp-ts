---
title: Show.ts
nav_order: 80
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Show (interface)](#show-interface)
- [showBoolean (constant)](#showboolean-constant)
- [showNumber (constant)](#shownumber-constant)
- [showString (constant)](#showstring-constant)
- [getStructShow (function)](#getstructshow-function)
- [getTupleShow (function)](#gettupleshow-function)

---

# Show (interface)

The `Show` type class represents those types which can be converted into
a human-readable `string` representation.

While not required, it is recommended that for any expression `x`, the
string `show x` be executable TypeScript code which evaluates to the same
value as the expression `x`.

**Signature**

```ts
export interface Show<A> {
  show: (a: A) => string
}
```

# showBoolean (constant)

**Signature**

```ts
export const showBoolean: Show<boolean> = ...
```

Added in v1.17.0

# showNumber (constant)

**Signature**

```ts
export const showNumber: Show<number> = ...
```

Added in v1.17.0

# showString (constant)

**Signature**

```ts
export const showString: Show<string> = ...
```

Added in v1.17.0

# getStructShow (function)

**Signature**

```ts
export const getStructShow = <O extends { [key: string]: any }>(shows: { [K in keyof O]: Show<O[K]> }): Show<O> => ...
```

Added in v1.17.0

# getTupleShow (function)

**Signature**

```ts
export const getTupleShow = <T extends Array<Show<any>>>(
  ...shows: T
): Show<{ [K in keyof T]: T[K] extends Show<infer A> ? A : never }> => ...
```

Added in v1.17.0
