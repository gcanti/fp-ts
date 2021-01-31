---
title: Eq.ts
nav_order: 23
parent: Modules
---

## Eq overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `a |> equals(a) === true`
2. Symmetry: `a |> equals(b) === b |> equals(a)`
3. Transitivity: if `a |> equals(b) === true` and `b |> equals(c) === true`, then `a |> equals(c) === true`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [combinators](#combinators)
  - [getStructEq](#getstructeq)
  - [getTupleEq](#gettupleeq)
- [constructors](#constructors)
  - [fromEquals](#fromequals)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI (type alias)](#uri-type-alias)
  - [eqDate](#eqdate)
  - [eqNumber](#eqnumber)
  - [eqStrict](#eqstrict)
  - [eqString](#eqstring)
  - [getMonoid](#getmonoid)
- [type classes](#type-classes)
  - [Eq (interface)](#eq-interface)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v3.0.0

# combinators

## getStructEq

**Signature**

```ts
export declare const getStructEq: <A>(eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<A>
```

Added in v3.0.0

## getTupleEq

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export declare const getTupleEq: <A extends readonly unknown[]>(...eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<A>
```

**Example**

```ts
import { getTupleEq, eqString, eqNumber } from 'fp-ts/Eq'
import * as B from 'fp-ts/boolean'

const E = getTupleEq(eqString, eqNumber, B.Eq)
assert.strictEqual(E.equals(['a', 1, true])(['a', 1, true]), true)
assert.strictEqual(E.equals(['a', 1, true])(['b', 1, true]), false)
assert.strictEqual(E.equals(['a', 1, true])(['a', 2, true]), false)
assert.strictEqual(E.equals(['a', 1, true])(['a', 1, false]), false)
```

Added in v3.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare const fromEquals: <A>(equals: (second: A) => (first: A) => boolean) => Eq<A>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Eq'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Eq'
```

Added in v3.0.0

## eqDate

**Signature**

```ts
export declare const eqDate: Eq<Date>
```

Added in v3.0.0

## eqNumber

**Signature**

```ts
export declare const eqNumber: Eq<number>
```

Added in v3.0.0

## eqStrict

**Signature**

```ts
export declare const eqStrict: Eq<unknown>
```

Added in v3.0.0

## eqString

**Signature**

```ts
export declare const eqString: Eq<string>
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<Eq<A>>
```

Added in v3.0.0

# type classes

## Eq (interface)

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (second: A) => (first: A) => boolean
}
```

Added in v3.0.0
