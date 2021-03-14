---
title: string.ts
nav_order: 94
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

# utils

## empty

An empty `string`.

**Signature**

```ts
export declare const empty: string
```

Added in v2.10.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (s: string) => boolean
```

Added in v2.10.0

## size

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const size: (s: string) => number
```

Added in v2.10.0
