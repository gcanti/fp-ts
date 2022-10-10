---
title: boolean.ts
nav_order: 10
parent: Modules
---

## boolean overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [MonoidAnd](#monoidand)
  - [MonoidOr](#monoidor)
  - [Ord](#ord)
  - [SemigroupAnd](#semigroupand)
  - [SemigroupOr](#semigroupor)
  - [Show](#show)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isBoolean](#isboolean)
- [utils](#utils)
  - [and](#and)
  - [andAll](#andall)
  - [or](#or)
  - [orAll](#orall)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: eq.Eq<boolean>
```

Added in v3.0.0

## MonoidAnd

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidAnd: Monoid<boolean>
```

Added in v3.0.0

## MonoidOr

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidOr: Monoid<boolean>
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: ord.Ord<boolean>
```

Added in v3.0.0

## SemigroupAnd

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupAnd: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAnd } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(true, SemigroupAnd.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAnd.combine(false)), false)
```

Added in v3.0.0

## SemigroupOr

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupOr: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupOr } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(true, SemigroupOr.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupOr.combine(false)), true)
assert.deepStrictEqual(pipe(false, SemigroupOr.combine(false)), false)
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: show_.Show<boolean>
```

Added in v3.0.0

# pattern matching

## match

Defines the match over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare const match: <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) => (value: boolean) => A | B
```

**Example**

```ts
import { some, map } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'
import { match } from 'fp-ts/boolean'

assert.deepStrictEqual(
  pipe(
    some(true),
    map(
      match(
        () => 'false',
        () => 'true'
      )
    )
  ),
  some('true')
)
```

Added in v3.0.0

# refinements

## isBoolean

**Signature**

```ts
export declare const isBoolean: Refinement<unknown, boolean>
```

Added in v3.0.0

# utils

## and

**Signature**

```ts
export declare const and: (that: boolean) => (self: boolean) => boolean
```

Added in v3.0.0

## andAll

**Signature**

```ts
export declare const andAll: (collection: Iterable<boolean>) => boolean
```

Added in v3.0.0

## or

**Signature**

```ts
export declare const or: (that: boolean) => (self: boolean) => boolean
```

Added in v3.0.0

## orAll

**Signature**

```ts
export declare const orAll: (collection: Iterable<boolean>) => boolean
```

Added in v3.0.0
