---
title: Eq.ts
nav_order: 23
parent: Modules
---

## Eq overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `equals(a)(a) === true`
2. Symmetry: `equals(b)(a) === equals(a)(b)`
3. Transitivity: if `equals(b)(a) === true` and `equals(c)(b) === true`, then `equals(c)(a) === true`

Added in v3.0.0

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

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Eq<A>) => Eq<B>
```

Added in v3.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare function fromEquals<A>(equals: Eq<A>['equals']): Eq<A>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Eq'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'Eq'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## eqBoolean

**Signature**

```ts
export declare const eqBoolean: Eq<boolean>
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
export declare function getMonoid<A>(): Monoid<Eq<A>>
```

Added in v3.0.0

## getStructEq

**Signature**

```ts
export declare function getStructEq<O extends ReadonlyRecord<string, any>>(eqs: { [K in keyof O]: Eq<O[K]> }): Eq<O>
```

Added in v3.0.0

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
assert.strictEqual(E.equals(['a', 1, true])(['a', 1, true]), true)
assert.strictEqual(E.equals(['a', 1, true])(['b', 1, true]), false)
assert.strictEqual(E.equals(['a', 1, true])(['a', 2, true]), false)
assert.strictEqual(E.equals(['a', 1, true])(['a', 1, false]), false)
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
