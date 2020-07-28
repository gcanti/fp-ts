---
title: Eq.ts
nav_order: 27
parent: Modules
---

## Eq overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `E.equals(a, a) === true`
2. Symmetry: `E.equals(a, b) === E.equals(b, a)`
3. Transitivity: if `E.equals(a, b) === true` and `E.equals(b, c) === true`, then `E.equals(a, c) === true`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [constructors](#constructors)
  - [fromEquals](#fromequals)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [eq](#eq)
  - [eqBoolean](#eqboolean)
  - [eqDate](#eqdate)
  - [eqNumber](#eqnumber)
  - [eqStrict](#eqstrict)
  - [eqString](#eqstring)
  - [getMonoid](#getmonoid)
  - [getStructEq](#getstructeq)
  - [getTupleEq](#gettupleeq)
- [type classes](#type-classes)
  - [Eq (interface)](#eq-interface)
- [utils](#utils)
  - [~~strictEqual~~](#strictequal)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v2.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare function fromEquals<A>(equals: (x: A, y: A) => boolean): Eq<A>
```

Added in v2.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Eq'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Eq'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## eq

**Signature**

```ts
export declare const eq: Contravariant1<'Eq'>
```

Added in v2.0.0

## eqBoolean

**Signature**

```ts
export declare const eqBoolean: Eq<boolean>
```

Added in v2.0.0

## eqDate

**Signature**

```ts
export declare const eqDate: Eq<Date>
```

Added in v2.0.0

## eqNumber

**Signature**

```ts
export declare const eqNumber: Eq<number>
```

Added in v2.0.0

## eqStrict

**Signature**

```ts
export declare const eqStrict: Eq<unknown>
```

Added in v2.5.0

## eqString

**Signature**

```ts
export declare const eqString: Eq<string>
```

Added in v2.0.0

## getMonoid

**Signature**

```ts
export declare function getMonoid<A>(): Monoid<Eq<A>>
```

Added in v2.6.0

## getStructEq

**Signature**

```ts
export declare function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O>
```

Added in v2.0.0

## getTupleEq

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export declare function getTupleEq<T extends ReadonlyArray<Eq<any>>>(
  ...eqs: T
): Eq<{ [K in keyof T]: T[K] extends Eq<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/Eq'

const E = getTupleEq(eqString, eqNumber, eqBoolean)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
```

Added in v2.0.0

# type classes

## Eq (interface)

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v2.0.0

# utils

## ~~strictEqual~~

Use `eqStrict` instead

**Signature**

```ts
export declare function strictEqual<A>(a: A, b: A): boolean
```

Added in v2.0.0
