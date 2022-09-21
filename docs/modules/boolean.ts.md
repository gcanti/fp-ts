---
title: boolean.ts
nav_order: 4
parent: Modules
---

## boolean overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [destructors](#destructors)
  - [match](#match)
- [instances](#instances)
  - [BooleanAlgebra](#booleanalgebra)
  - [Eq](#eq)
  - [MonoidAll](#monoidall)
  - [MonoidAny](#monoidany)
  - [Ord](#ord)
  - [SemigroupAll](#semigroupall)
  - [SemigroupAny](#semigroupany)
  - [Show](#show)
- [refinements](#refinements)
  - [isBoolean](#isboolean)

---

# destructors

## match

Defines the match over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare const match: <A, B = A>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean) => A | B
```

**Example**

```ts
import { some, map } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
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
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(true, SemigroupAll.concat(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAll.concat(false)), false)
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
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(true, SemigroupAny.concat(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAny.concat(false)), true)
assert.deepStrictEqual(pipe(false, SemigroupAny.concat(false)), false)
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: show_.Show<boolean>
```

Added in v3.0.0

# refinements

## isBoolean

**Signature**

```ts
export declare const isBoolean: Refinement<unknown, boolean>
```

Added in v3.0.0
