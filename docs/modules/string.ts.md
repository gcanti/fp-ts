---
title: string.ts
nav_order: 101
parent: Modules
---

## string overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Ord](#ord)
  - [Semigroup](#semigroup)
  - [Show](#show)
- [refinements](#refinements)
  - [isString](#isstring)
- [utils](#utils)
  - [empty](#empty)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [isEmpty](#isempty)
  - [replace](#replace)
  - [size](#size)
  - [slice](#slice)
  - [split](#split)
  - [startsWith](#startswith)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimLeft](#trimleft)
  - [trimRight](#trimright)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<string>
```

Added in v2.10.0

## Monoid

`string` monoid under concatenation.

The `empty` value is `''`.

**Signature**

```ts
export declare const Monoid: M.Monoid<string>
```

**Example**

```ts
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
```

Added in v2.10.0

## Ord

**Signature**

```ts
export declare const Ord: O.Ord<string>
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
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
```

Added in v2.10.0

## Show

**Signature**

```ts
export declare const Show: Sh.Show<string>
```

Added in v2.10.0

# refinements

## isString

**Signature**

```ts
export declare const isString: Refinement<unknown, string>
```

Added in v2.11.0

# utils

## empty

An empty `string`.

**Signature**

```ts
export declare const empty: string
```

Added in v2.10.0

## endsWith

**Signature**

```ts
export declare const endsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

Added in v2.11.0

## includes

**Signature**

```ts
export declare const includes: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

Added in v2.11.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (s: string) => boolean
```

Added in v2.10.0

## replace

**Signature**

```ts
export declare const replace: (searchValue: string | RegExp, replaceValue: string) => (s: string) => string
```

Added in v2.11.0

## size

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const size: (s: string) => number
```

Added in v2.10.0

## slice

**Signature**

```ts
export declare const slice: (start: number, end: number) => (s: string) => string
```

Added in v2.11.0

## split

**Signature**

```ts
export declare const split: (separator: string | RegExp) => (s: string) => ReadonlyNonEmptyArray<string>
```

Added in v2.11.0

## startsWith

**Signature**

```ts
export declare const startsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

Added in v2.11.0

## toLowerCase

**Signature**

```ts
export declare const toLowerCase: (s: string) => string
```

Added in v2.11.0

## toUpperCase

**Signature**

```ts
export declare const toUpperCase: (s: string) => string
```

Added in v2.11.0

## trim

**Signature**

```ts
export declare const trim: (s: string) => string
```

Added in v2.11.0

## trimLeft

**Signature**

```ts
export declare const trimLeft: (s: string) => string
```

Added in v2.11.0

## trimRight

**Signature**

```ts
export declare const trimRight: (s: string) => string
```

Added in v2.11.0
