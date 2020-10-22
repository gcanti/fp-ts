---
title: Semigroup.ts
nav_order: 77
parent: Modules
---

## Semigroup overview

If a type `A` can form a `Semigroup` it has an **associative** binary operation.

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.

```ts
concat(x, concat(y, z)) = concat(concat(x, y), z)
```

A common example of a semigroup is the type `string` with the operation `+`.

```ts
import { Semigroup } from 'fp-ts/Semigroup'

const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y,
}

const x = 'x'
const y = 'y'
const z = 'z'

semigroupString.concat(x, y) // 'xy'

semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'

semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
```

_Adapted from https://typelevel.org/cats_

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getDualSemigroup](#getdualsemigroup)
  - [getFirstSemigroup](#getfirstsemigroup)
  - [getFunctionSemigroup](#getfunctionsemigroup)
  - [getIntercalateSemigroup](#getintercalatesemigroup)
  - [getJoinSemigroup](#getjoinsemigroup)
  - [getLastSemigroup](#getlastsemigroup)
  - [getMeetSemigroup](#getmeetsemigroup)
  - [getObjectSemigroup](#getobjectsemigroup)
  - [getStructSemigroup](#getstructsemigroup)
  - [getTupleSemigroup](#gettuplesemigroup)
  - [semigroupAll](#semigroupall)
  - [semigroupAny](#semigroupany)
  - [semigroupProduct](#semigroupproduct)
  - [semigroupString](#semigroupstring)
  - [semigroupSum](#semigroupsum)
  - [semigroupVoid](#semigroupvoid)
- [type classes](#type-classes)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [fold](#fold)

---

# instances

## getDualSemigroup

The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare function getDualSemigroup<A>(S: Semigroup<A>): Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.getDualSemigroup(S.semigroupString).concat('a', 'b'), 'ba')
```

Added in v2.0.0

## getFirstSemigroup

Always return the first argument.

**Signature**

```ts
export declare function getFirstSemigroup<A = never>(): Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.getFirstSemigroup<number>().concat(1, 2), 1)
```

Added in v2.0.0

## getFunctionSemigroup

Unary functions form a semigroup as long as you can provide a semigroup for the codomain.

**Signature**

```ts
export declare function getFunctionSemigroup<S>(S: Semigroup<S>): <A = never>() => Semigroup<(a: A) => S>
```

**Example**

```ts
import { Predicate } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const S1 = S.getFunctionSemigroup(S.semigroupAll)<number>()

assert.deepStrictEqual(S1.concat(f, g)(1), true)
assert.deepStrictEqual(S1.concat(f, g)(3), false)

const S2 = S.getFunctionSemigroup(S.semigroupAny)<number>()

assert.deepStrictEqual(S2.concat(f, g)(1), true)
assert.deepStrictEqual(S2.concat(f, g)(3), true)
```

Added in v2.0.0

## getIntercalateSemigroup

You can glue items between and stay associative.

**Signature**

```ts
export declare function getIntercalateSemigroup<A>(a: A): (S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

const S1 = S.getIntercalateSemigroup(' ')(S.semigroupString)

assert.strictEqual(S1.concat('a', 'b'), 'a b')
assert.strictEqual(S1.concat(S1.concat('a', 'b'), 'c'), S1.concat('a', S1.concat('b', 'c')))
```

Added in v2.5.0

## getJoinSemigroup

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare function getJoinSemigroup<A>(O: Ord<A>): Semigroup<A>
```

**Example**

```ts
import * as O from 'fp-ts/Ord'
import * as S from 'fp-ts/Semigroup'

const S1 = S.getJoinSemigroup(O.ordNumber)

assert.deepStrictEqual(S1.concat(1, 2), 2)
```

Added in v2.0.0

## getLastSemigroup

Always return the last argument.

**Signature**

```ts
export declare function getLastSemigroup<A = never>(): Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.getLastSemigroup<number>().concat(1, 2), 2)
```

Added in v2.0.0

## getMeetSemigroup

Get a semigroup where `concat` will return the minimum, based on the provided order.

**Signature**

```ts
export declare function getMeetSemigroup<A>(O: Ord<A>): Semigroup<A>
```

**Example**

```ts
import * as O from 'fp-ts/Ord'
import * as S from 'fp-ts/Semigroup'

const S1 = S.getMeetSemigroup(O.ordNumber)

assert.deepStrictEqual(S1.concat(1, 2), 1)
```

Added in v2.0.0

## getObjectSemigroup

Return a semigroup for objects, preserving their type.

**Signature**

```ts
export declare function getObjectSemigroup<A extends object = never>(): Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

interface Person {
  name: string
  age: number
}

const S1 = S.getObjectSemigroup<Person>()
assert.deepStrictEqual(S1.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
```

Added in v2.0.0

## getStructSemigroup

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare function getStructSemigroup<O extends ReadonlyRecord<string, any>>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

interface Point {
  readonly x: number
  readonly y: number
}

const semigroupPoint = S.getStructSemigroup<Point>({
  x: S.semigroupSum,
  y: S.semigroupSum,
})

assert.deepStrictEqual(semigroupPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.0.0

## getTupleSemigroup

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare function getTupleSemigroup<T extends ReadonlyArray<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

const S1 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum)
assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])

const S2 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum, S.semigroupAll)
assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0

## semigroupAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const semigroupAll: Semigroup<boolean>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.semigroupAll.concat(true, true), true)
assert.deepStrictEqual(S.semigroupAll.concat(true, false), false)
```

Added in v2.0.0

## semigroupAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const semigroupAny: Semigroup<boolean>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.semigroupAny.concat(true, true), true)
assert.deepStrictEqual(S.semigroupAny.concat(true, false), true)
assert.deepStrictEqual(S.semigroupAny.concat(false, false), false)
```

Added in v2.0.0

## semigroupProduct

`number` semigroup under multiplication.

**Signature**

```ts
export declare const semigroupProduct: Semigroup<number>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.semigroupProduct.concat(2, 3), 6)
```

Added in v2.0.0

## semigroupString

`string` semigroup under concatenation.

**Signature**

```ts
export declare const semigroupString: Semigroup<string>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.semigroupString.concat('a', 'b'), 'ab')
```

Added in v2.0.0

## semigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const semigroupSum: Semigroup<number>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.semigroupSum.concat(2, 3), 5)
```

Added in v2.0.0

## semigroupVoid

**Signature**

```ts
export declare const semigroupVoid: Semigroup<void>
```

Added in v2.0.0

# type classes

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> extends Magma<A> {}
```

Added in v2.0.0

# utils

## fold

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare function fold<A>(
  S: Semigroup<A>
): {
  (startWith: A): (as: ReadonlyArray<A>) => A
  (startWith: A, as: ReadonlyArray<A>): A
}
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

const sum = S.fold(S.semigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v2.0.0
