---
title: Monoid.ts
nav_order: 55
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}

interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `x`.

```ts
concat(x, empty) = concat(empty, x) = x
```

Many types that form a `Semigroup` also form a `Monoid`, such as `number`s (with `0`) and `string`s (with `''`).

```ts
import { Monoid } from 'fp-ts/Monoid'

const monoidString: Monoid<string> = {
  concat: (x, y) => x + y,
  empty: '',
}
```

_Adapted from https://typelevel.org/cats_

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

Endomorphism form a monoid where the `empty` value is the identity function.

**Signature**

```ts
export declare function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>>
```

Added in v2.0.0

## getFunctionMonoid

Unary functions form a monoid as long as you can provide a monoid for the codomain.

**Signature**

```ts
export declare function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M>
```

**Example**

```ts
import { Predicate } from 'fp-ts/function'
import * as M from 'fp-ts/Monoid'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const M1 = M.getFunctionMonoid(M.monoidAll)<number>()

assert.deepStrictEqual(M1.concat(f, g)(1), true)
assert.deepStrictEqual(M1.concat(f, g)(3), false)

const M2 = M.getFunctionMonoid(M.monoidAny)<number>()

assert.deepStrictEqual(M2.concat(f, g)(1), true)
assert.deepStrictEqual(M2.concat(f, g)(3), true)
```

Added in v2.0.0

## getJoinMonoid

Get a monoid where `concat` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare function getJoinMonoid<A>(B: Bounded<A>): Monoid<A>
```

**Example**

```ts
import * as B from 'fp-ts/Bounded'
import * as M from 'fp-ts/Monoid'

const M1 = M.getJoinMonoid(B.boundedNumber)

assert.deepStrictEqual(M1.concat(1, 2), 2)
```

Added in v2.0.0

## getMeetMonoid

Get a monoid where `concat` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare function getMeetMonoid<A>(B: Bounded<A>): Monoid<A>
```

**Example**

```ts
import * as B from 'fp-ts/Bounded'
import * as M from 'fp-ts/Monoid'

const M1 = M.getMeetMonoid(B.boundedNumber)

assert.deepStrictEqual(M1.concat(1, 2), 1)
```

Added in v2.0.0

## getStructMonoid

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare function getStructMonoid<O extends ReadonlyRecord<string, any>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

interface Point {
  readonly x: number
  readonly y: number
}

const monoidPoint = M.getStructMonoid<Point>({
  x: M.monoidSum,
  y: M.monoidSum,
})

assert.deepStrictEqual(monoidPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.0.0

## getTupleMonoid

Given a tuple of monoids returns a monoid for the tuple

**Signature**

```ts
export declare function getTupleMonoid<T extends ReadonlyArray<Monoid<any>>>(
  ...monoids: T
): Monoid<{ [K in keyof T]: T[K] extends S.Semigroup<infer A> ? A : never }>
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

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const monoidAll: Monoid<boolean>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.monoidAll.concat(true, true), true)
assert.deepStrictEqual(M.monoidAll.concat(true, false), false)
```

Added in v2.0.0

## monoidAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const monoidAny: Monoid<boolean>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.monoidAny.concat(true, true), true)
assert.deepStrictEqual(M.monoidAny.concat(true, false), true)
assert.deepStrictEqual(M.monoidAny.concat(false, false), false)
```

Added in v2.0.0

## monoidProduct

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const monoidProduct: Monoid<number>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.monoidProduct.concat(2, 3), 6)
```

Added in v2.0.0

## monoidString

`string` monoid under concatenation.

The `empty` value is `''`.

**Signature**

```ts
export declare const monoidString: Monoid<string>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.monoidString.concat('a', 'b'), 'ab')
```

Added in v2.0.0

## monoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const monoidSum: Monoid<number>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.monoidSum.concat(2, 3), 5)
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
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}
```

Added in v2.0.0

# utils

## fold

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare function fold<A>(M: Monoid<A>): (as: ReadonlyArray<A>) => A
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.fold(M.monoidSum)([1, 2, 3]), 6)
assert.deepStrictEqual(M.fold(M.monoidSum)([]), 0)
```

Added in v2.0.0
