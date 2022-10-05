---
title: number.ts
nav_order: 62
parent: Modules
---

## number overview

Added in v3.0.0

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
export declare const Bounded: bounded.Bounded<number>
```

Added in v3.0.0

## Eq

**Signature**

```ts
export declare const Eq: eq.Eq<number>
```

Added in v3.0.0

## Field

**Signature**

```ts
export declare const Field: field.Field<number>
```

Added in v3.0.0

## MagmaSub

**Signature**

```ts
export declare const MagmaSub: Magma<number>
```

Added in v3.0.0

## MonoidProduct

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const MonoidProduct: Monoid<number>
```

Added in v3.0.0

## MonoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const MonoidSum: Monoid<number>
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: ord.Ord<number>
```

Added in v3.0.0

## SemigroupProduct

`number` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupProduct: Semigroup<number>
```

**Example**

```ts
import { SemigroupProduct } from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(2, SemigroupProduct.combine(3)), 6)
```

Added in v3.0.0

## SemigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: Semigroup<number>
```

**Example**

```ts
import { SemigroupSum } from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: show_.Show<number>
```

Added in v3.0.0

# refinements

## isNumber

**Signature**

```ts
export declare const isNumber: Refinement<unknown, number>
```

Added in v3.0.0
