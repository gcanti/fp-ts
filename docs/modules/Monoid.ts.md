---
title: Monoid.ts
nav_order: 55
parent: Modules
---

## Monoid overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getDualMonoid](#getdualmonoid)
- [instances](#instances)
  - [getEndomorphismMonoid](#getendomorphismmonoid)
  - [getFunctionMonoid](#getfunctionmonoid)
  - [getJoinMonoid](#getjoinmonoid)
  - [getMeetMonoid](#getmeetmonoid)
  - [getStructMonoid](#getstructmonoid)
  - [getTupleMonoid](#gettuplemonoid)
  - [monoidAll](#monoidall)
  - [monoidAny](#monoidany)
  - [monoidProduct](#monoidproduct)
  - [monoidString](#monoidstring)
  - [monoidSum](#monoidsum)
  - [monoidVoid](#monoidvoid)
- [type classes](#type-classes)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [fold](#fold)

---

# combinators

## getDualMonoid

The dual of a `Monoid`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare function getDualMonoid<A>(M: Monoid<A>): Monoid<A>
```

**Example**

```ts
import { getDualMonoid, monoidString } from 'fp-ts/Monoid'

assert.deepStrictEqual(getDualMonoid(monoidString).concat('a', 'b'), 'ba')
```

Added in v2.0.0

# instances

## getEndomorphismMonoid

**Signature**

```ts
export declare function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>>
```

Added in v2.0.0

## getFunctionMonoid

**Signature**

```ts
export declare function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M>
```

Added in v2.0.0

## getJoinMonoid

**Signature**

```ts
export declare function getJoinMonoid<A>(B: Bounded<A>): Monoid<A>
```

Added in v2.0.0

## getMeetMonoid

**Signature**

```ts
export declare function getMeetMonoid<A>(B: Bounded<A>): Monoid<A>
```

Added in v2.0.0

## getStructMonoid

**Signature**

```ts
export declare function getStructMonoid<O extends ReadonlyRecord<string, any>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O>
```

Added in v2.0.0

## getTupleMonoid

Given a tuple of monoids returns a monoid for the tuple

**Signature**

```ts
export declare function getTupleMonoid<T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
): Monoid<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/Monoid'

const M1 = getTupleMonoid(monoidString, monoidSum)
assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])

const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0

## monoidAll

Boolean monoid under conjunction

**Signature**

```ts
export declare const monoidAll: Monoid<boolean>
```

Added in v2.0.0

## monoidAny

Boolean monoid under disjunction

**Signature**

```ts
export declare const monoidAny: Monoid<boolean>
```

Added in v2.0.0

## monoidProduct

Number monoid under multiplication

**Signature**

```ts
export declare const monoidProduct: Monoid<number>
```

Added in v2.0.0

## monoidString

**Signature**

```ts
export declare const monoidString: Monoid<string>
```

Added in v2.0.0

## monoidSum

Number monoid under addition

**Signature**

```ts
export declare const monoidSum: Monoid<number>
```

Added in v2.0.0

## monoidVoid

**Signature**

```ts
export declare const monoidVoid: Monoid<void>
```

Added in v2.0.0

# type classes

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v2.0.0

# utils

## fold

**Signature**

```ts
export declare function fold<A>(M: Monoid<A>): (as: ReadonlyArray<A>) => A
```

Added in v2.0.0
