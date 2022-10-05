---
title: boolean.ts
nav_order: 8
parent: Modules
---

## boolean overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [BooleanAlgebra](#booleanalgebra)
  - [Eq](#eq)
  - [MonoidAll](#monoidall)
  - [MonoidAny](#monoidany)
  - [Ord](#ord)
  - [SemigroupAll](#semigroupall)
  - [SemigroupAny](#semigroupany)
  - [Show](#show)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isBoolean](#isboolean)

---

# instances

## BooleanAlgebra

**Signature**

```ts
export declare const BooleanAlgebra: booleanAlgebra.BooleanAlgebra<boolean>
```

Added in v3.0.0

## Eq

**Signature**

```ts
export declare const Eq: eq.Eq<boolean>
```

Added in v3.0.0

## MonoidAll

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidAll: Monoid<boolean>
```

Added in v3.0.0

## MonoidAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidAny: Monoid<boolean>
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: ord.Ord<boolean>
```

Added in v3.0.0

## SemigroupAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupAll: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAll } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
```

Added in v3.0.0

## SemigroupAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupAny: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAny } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
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
