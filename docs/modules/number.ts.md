---
title: number.ts
nav_order: 68
parent: Modules
---

## number overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Bounded](#bounded)
  - [Eq](#eq)
  - [Field](#field)
  - [MagmaSub](#magmasub)
  - [MonoidProduct](#monoidproduct)
  - [MonoidSum](#monoidsum)
  - [Ord](#ord)
  - [SemigroupProduct](#semigroupproduct)
  - [SemigroupSum](#semigroupsum)
  - [Show](#show)
- [refinements](#refinements)
  - [isNumber](#isnumber)

---

# instances

## Bounded

**Signature**

```ts
export declare const Bounded: B.Bounded<number>
```

Added in v2.10.0

## Eq

**Signature**

```ts
export declare const Eq: E.Eq<number>
```

Added in v2.10.0

## Field

**Signature**

```ts
export declare const Field: F.Field<number>
```

Added in v2.10.0

## MagmaSub

**Signature**

```ts
export declare const MagmaSub: Magma<number>
```

Added in v2.11.0

## MonoidProduct

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const MonoidProduct: Monoid<number>
```

**Example**

```ts
import { MonoidProduct } from 'fp-ts/number'

assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
```

Added in v2.10.0

## MonoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const MonoidSum: Monoid<number>
```

**Example**

```ts
import { MonoidSum } from 'fp-ts/number'

assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
```

Added in v2.10.0

## Ord

**Signature**

```ts
export declare const Ord: O.Ord<number>
```

Added in v2.10.0

## SemigroupProduct

`number` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupProduct: Semigroup<number>
```

**Example**

```ts
import { SemigroupProduct } from 'fp-ts/number'

assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
```

Added in v2.10.0

## SemigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: Semigroup<number>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'

assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
```

Added in v2.10.0

## Show

**Signature**

```ts
export declare const Show: S.Show<number>
```

Added in v2.10.0

# refinements

## isNumber

**Signature**

```ts
export declare const isNumber: Refinement<unknown, number>
```

Added in v2.11.0
