---
title: boolean.ts
nav_order: 7
parent: Modules
---

## boolean overview

Added in v2.2.0

---

<h2 class="text-delta">Table of contents</h2>

- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [match](#match)
  - [matchW](#matchw)
- [instances](#instances)
  - [BooleanAlgebra](#booleanalgebra)
  - [Eq](#eq)
  - [MonoidAll](#monoidall)
  - [MonoidAny](#monoidany)
  - [Ord](#ord)
  - [SemigroupAll](#semigroupall)
  - [SemigroupAny](#semigroupany)
  - [Show](#show)

---

# destructors

## fold

Alias of [`match`](#match).

**Signature**

```ts
export declare const fold: <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A
```

Added in v2.2.0

## foldW

Alias of [`matchW`](#matchW).

**Signature**

```ts
export declare const foldW: <A, B>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean) => A | B
```

Added in v2.10.0

## match

Defines the fold over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare const match: <A>(onFalse: Lazy<A>, onTrue: Lazy<A>) => (value: boolean) => A
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

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <A, B>(onFalse: Lazy<A>, onTrue: Lazy<B>) => (value: boolean) => A | B
```

Added in v2.10.0

# instances

## BooleanAlgebra

**Signature**

```ts
export declare const BooleanAlgebra: BA.BooleanAlgebra<boolean>
```

Added in v2.10.0

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<boolean>
```

Added in v2.10.0

## MonoidAll

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidAll: Monoid<boolean>
```

**Example**

```ts
import { MonoidAll } from 'fp-ts/boolean'

assert.deepStrictEqual(MonoidAll.concat(true, true), true)
assert.deepStrictEqual(MonoidAll.concat(true, false), false)
```

Added in v2.10.0

## MonoidAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidAny: Monoid<boolean>
```

**Example**

```ts
import { MonoidAny } from 'fp-ts/boolean'

assert.deepStrictEqual(MonoidAny.concat(true, true), true)
assert.deepStrictEqual(MonoidAny.concat(true, false), true)
assert.deepStrictEqual(MonoidAny.concat(false, false), false)
```

Added in v2.10.0

## Ord

**Signature**

```ts
export declare const Ord: O.Ord<boolean>
```

Added in v2.10.0

## SemigroupAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupAll: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAll } from 'fp-ts/boolean'

assert.deepStrictEqual(SemigroupAll.concat(true, true), true)
assert.deepStrictEqual(SemigroupAll.concat(true, false), false)
```

Added in v2.10.0

## SemigroupAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupAny: Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAny } from 'fp-ts/boolean'

assert.deepStrictEqual(SemigroupAny.concat(true, true), true)
assert.deepStrictEqual(SemigroupAny.concat(true, false), true)
assert.deepStrictEqual(SemigroupAny.concat(false, false), false)
```

Added in v2.10.0

## Show

**Signature**

```ts
export declare const Show: S.Show<boolean>
```

Added in v2.10.0
