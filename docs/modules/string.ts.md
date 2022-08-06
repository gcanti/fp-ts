---
title: string.ts
nav_order: 103
parent: Modules
---

## string overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [replace](#replace)
  - [slice](#slice)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimLeft](#trimleft)
  - [trimRight](#trimright)
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
  - [size](#size)
  - [split](#split)
  - [startsWith](#startswith)

---

# combinators

## replace

**Signature**

```ts
export declare const replace: (searchValue: string | RegExp, replaceValue: string) => (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
```

Added in v2.11.0

## slice

**Signature**

```ts
export declare const slice: (start: number, end: number) => (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
```

Added in v2.11.0

## toLowerCase

**Signature**

```ts
export declare const toLowerCase: (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
```

Added in v2.11.0

## toUpperCase

**Signature**

```ts
export declare const toUpperCase: (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
```

Added in v2.11.0

## trim

**Signature**

```ts
export declare const trim: (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
```

Added in v2.11.0

## trimLeft

**Signature**

```ts
export declare const trimLeft: (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
```

Added in v2.11.0

## trimRight

**Signature**

```ts
export declare const trimRight: (s: string) => string
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
```

Added in v2.11.0

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<string>
```

**Example**

```ts
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.Eq.equals('a', 'a'), true)
assert.deepStrictEqual(S.Eq.equals('a', 'b'), false)
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
assert.deepStrictEqual(S.Monoid.concat('a', S.Monoid.empty), 'a')
```

Added in v2.10.0

## Ord

**Signature**

```ts
export declare const Ord: O.Ord<string>
```

**Example**

```ts
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.Ord.compare('a', 'a'), 0)
assert.deepStrictEqual(S.Ord.compare('a', 'b'), -1)
assert.deepStrictEqual(S.Ord.compare('b', 'a'), 1)
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

**Example**

```ts
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.Show.show('a'), '"a"')
```

Added in v2.10.0

# refinements

## isString

**Signature**

```ts
export declare const isString: Refinement<unknown, string>
```

**Example**

```ts
import * as S from 'fp-ts/string'

assert.deepStrictEqual(S.isString('a'), true)
assert.deepStrictEqual(S.isString(1), false)
```

Added in v2.11.0

# utils

## empty

An empty `string`.

**Signature**

```ts
export declare const empty: ''
```

Added in v2.10.0

## endsWith

**Signature**

```ts
export declare const endsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
```

Added in v2.11.0

## includes

**Signature**

```ts
export declare const includes: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
```

Added in v2.11.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (s: string) => boolean
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('', S.isEmpty), true)
assert.deepStrictEqual(pipe('a', S.isEmpty), false)
```

Added in v2.10.0

## size

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const size: (s: string) => number
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.size), 3)
```

Added in v2.10.0

## split

**Signature**

```ts
export declare const split: (separator: string | RegExp) => (s: string) => ReadonlyNonEmptyArray<string>
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
assert.deepStrictEqual(pipe('', S.split('')), [''])
```

Added in v2.11.0

## startsWith

**Signature**

```ts
export declare const startsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
```

Added in v2.11.0
