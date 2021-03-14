---
title: string.ts
nav_order: 91
parent: Modules
---

## string overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Ord](#ord)
  - [Semigroup](#semigroup)
  - [Show](#show)
- [utils](#utils)
  - [empty](#empty)
  - [isEmpty](#isempty)
  - [size](#size)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<string>
```

Added in v3.0.0

## Monoid

`string` monoid under concatenation.

The `empty` value is `''`.

**Signature**

```ts
export declare const Monoid: M.Monoid<string>
```

**Example**

```ts
import { Monoid } from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', Monoid.concat('b')), 'ab')
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: O.Ord<string>
```

Added in v3.0.0

## Semigroup

`string` semigroup under concatenation.

**Signature**

```ts
export declare const Semigroup: S.Semigroup<string>
```

**Example**

```ts
import { Semigroup } from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', Semigroup.concat('b')), 'ab')
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: Sh.Show<string>
```

Added in v3.0.0

# utils

## empty

An empty `string`.

**Signature**

```ts
export declare const empty: string
```

Added in v3.0.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (s: string) => boolean
```

Added in v3.0.0

## size

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const size: (s: string) => number
```

Added in v3.0.0
