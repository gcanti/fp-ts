---
title: Semigroup.ts
nav_order: 82
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

- [combinators](#combinators)
  - [getDualSemigroup](#getdualsemigroup)
  - [getIntercalateSemigroup](#getintercalatesemigroup)
  - [getStructSemigroup](#getstructsemigroup)
  - [getTupleSemigroup](#gettuplesemigroup)
- [constructors](#constructors)
  - [getConstantSemigroup](#getconstantsemigroup)
  - [getJoinSemigroup](#getjoinsemigroup)
  - [getMeetSemigroup](#getmeetsemigroup)
- [instances](#instances)
  - [getFirstSemigroup](#getfirstsemigroup)
  - [getLastSemigroup](#getlastsemigroup)
  - [getObjectSemigroup](#getobjectsemigroup)
  - [semigroupVoid](#semigroupvoid)
  - [~~getFunctionSemigroup~~](#getfunctionsemigroup)
  - [~~semigroupAll~~](#semigroupall)
  - [~~semigroupAny~~](#semigroupany)
  - [~~semigroupProduct~~](#semigroupproduct)
  - [~~semigroupString~~](#semigroupstring)
  - [~~semigroupSum~~](#semigroupsum)
- [type classes](#type-classes)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [concatAll](#concatall)
  - [~~fold~~](#fold)

---

# combinators

## getDualSemigroup

The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const getDualSemigroup: <A>(S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { getDualSemigroup } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(getDualSemigroup(S.Semigroup).concat('a', 'b'), 'ba')
```

Added in v2.0.0

## getIntercalateSemigroup

You can glue items between and stay associative.

**Signature**

```ts
export declare const getIntercalateSemigroup: <A>(a: A) => (S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { getIntercalateSemigroup } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

const S1 = getIntercalateSemigroup(' ')(S.Semigroup)

assert.strictEqual(S1.concat('a', 'b'), 'a b')
assert.strictEqual(S1.concat(S1.concat('a', 'b'), 'c'), S1.concat('a', S1.concat('b', 'c')))
```

Added in v2.5.0

## getStructSemigroup

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const getStructSemigroup: <O extends Readonly<Record<string, any>>>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
) => Semigroup<O>
```

**Example**

```ts
import { getStructSemigroup } from 'fp-ts/Semigroup'
import { SemigroupSum } from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const semigroupPoint = getStructSemigroup<Point>({
  x: SemigroupSum,
  y: SemigroupSum,
})

assert.deepStrictEqual(semigroupPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.0.0

## getTupleSemigroup

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare const getTupleSemigroup: <T extends readonly Semigroup<any>[]>(
  ...semigroups: T
) => Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleSemigroup } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'

const S1 = getTupleSemigroup(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])

const S2 = getTupleSemigroup(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0

# constructors

## getConstantSemigroup

**Signature**

```ts
export declare const getConstantSemigroup: <A>(a: A) => Semigroup<A>
```

Added in v2.10.0

## getJoinSemigroup

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const getJoinSemigroup: <A>(O: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/Semigroup'

const S1 = S.getJoinSemigroup(N.Ord)

assert.deepStrictEqual(S1.concat(1, 2), 2)
```

Added in v2.0.0

## getMeetSemigroup

Get a semigroup where `concat` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const getMeetSemigroup: <A>(O: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/Semigroup'

const S1 = S.getMeetSemigroup(N.Ord)

assert.deepStrictEqual(S1.concat(1, 2), 1)
```

Added in v2.0.0

# instances

## getFirstSemigroup

Always return the first argument.

**Signature**

```ts
export declare const getFirstSemigroup: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.getFirstSemigroup<number>().concat(1, 2), 1)
```

Added in v2.0.0

## getLastSemigroup

Always return the last argument.

**Signature**

```ts
export declare const getLastSemigroup: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.getLastSemigroup<number>().concat(1, 2), 2)
```

Added in v2.0.0

## getObjectSemigroup

Return a semigroup for objects, preserving their type.

**Signature**

```ts
export declare const getObjectSemigroup: <A extends object = never>() => Semigroup<A>
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

## semigroupVoid

**Signature**

```ts
export declare const semigroupVoid: Semigroup<void>
```

Added in v2.0.0

## ~~getFunctionSemigroup~~

Use `function.getSemigroup` instead.

**Signature**

```ts
export declare const getFunctionSemigroup: <S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S>
```

Added in v2.0.0

## ~~semigroupAll~~

Use `boolean.SemigroupAll` instead.

**Signature**

```ts
export declare const semigroupAll: Semigroup<boolean>
```

Added in v2.0.0

## ~~semigroupAny~~

Use `boolean.SemigroupAny` instead.

**Signature**

```ts
export declare const semigroupAny: Semigroup<boolean>
```

Added in v2.0.0

## ~~semigroupProduct~~

Use `number.SemigroupProduct` instead.

**Signature**

```ts
export declare const semigroupProduct: Semigroup<number>
```

Added in v2.0.0

## ~~semigroupString~~

Use `string.Semigroup` instead.

**Signature**

```ts
export declare const semigroupString: Semigroup<string>
```

Added in v2.0.0

## ~~semigroupSum~~

Use `number.SemigroupSum` instead.

**Signature**

```ts
export declare const semigroupSum: Semigroup<number>
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

## concatAll

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const concatAll: <A>(S: Semigroup<A>) => (startWith: A) => (as: readonly A[]) => A
```

**Example**

```ts
import { concatAll } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'

const sum = concatAll(N.SemigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v2.10.0

## ~~fold~~

Use `concatAll` instead.

**Signature**

```ts
export declare function fold<A>(
  S: Semigroup<A>
): {
  (startWith: A): (as: ReadonlyArray<A>) => A
  (startWith: A, as: ReadonlyArray<A>): A
}
```

Added in v2.0.0
