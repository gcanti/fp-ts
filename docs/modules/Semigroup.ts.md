---
title: Semigroup.ts
nav_order: 93
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
  - [intercalate](#intercalate)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
  - [~~getDualSemigroup~~](#getdualsemigroup)
  - [~~getIntercalateSemigroup~~](#getintercalatesemigroup)
  - [~~getStructSemigroup~~](#getstructsemigroup)
  - [~~getTupleSemigroup~~](#gettuplesemigroup)
- [constructors](#constructors)
  - [constant](#constant)
  - [max](#max)
  - [min](#min)
  - [~~getJoinSemigroup~~](#getjoinsemigroup)
  - [~~getMeetSemigroup~~](#getmeetsemigroup)
- [instances](#instances)
  - [first](#first)
  - [last](#last)
  - [~~getFirstSemigroup~~](#getfirstsemigroup)
  - [~~getFunctionSemigroup~~](#getfunctionsemigroup)
  - [~~getLastSemigroup~~](#getlastsemigroup)
  - [~~getObjectSemigroup~~](#getobjectsemigroup)
  - [~~semigroupAll~~](#semigroupall)
  - [~~semigroupAny~~](#semigroupany)
  - [~~semigroupProduct~~](#semigroupproduct)
  - [~~semigroupString~~](#semigroupstring)
  - [~~semigroupSum~~](#semigroupsum)
  - [~~semigroupVoid~~](#semigroupvoid)
- [type classes](#type-classes)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [concatAll](#concatall)
  - [~~fold~~](#fold)

---

# combinators

## intercalate

Between each pair of elements insert `middle`.

**Signature**

```ts
export declare const intercalate: <A>(middle: A) => (S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { intercalate } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

const S1 = pipe(S.Semigroup, intercalate(' + '))

assert.strictEqual(S1.concat('a', 'b'), 'a + b')
```

Added in v2.10.0

## reverse

The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const reverse: <A>(S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { reverse } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
```

Added in v2.10.0

## struct

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const struct: <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }) => Semigroup<{
  readonly [K in keyof A]: A[K]
}>
```

**Example**

```ts
import { struct } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const S = struct<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.10.0

## tuple

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<Readonly<A>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Semigroup'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const S1 = tuple(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])

const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.10.0

## ~~getDualSemigroup~~

Use [`reverse`](#reverse) instead.

**Signature**

```ts
export declare const getDualSemigroup: <A>(S: Semigroup<A>) => Semigroup<A>
```

Added in v2.0.0

## ~~getIntercalateSemigroup~~

Use [`intercalate`](#intercalate) instead.

**Signature**

```ts
export declare const getIntercalateSemigroup: <A>(middle: A) => (S: Semigroup<A>) => Semigroup<A>
```

Added in v2.5.0

## ~~getStructSemigroup~~

Use [`struct`](#struct) instead.

**Signature**

```ts
export declare const getStructSemigroup: <O extends Readonly<Record<string, any>>>(semigroups: {
  [K in keyof O]: Semigroup<O[K]>
}) => Semigroup<O>
```

Added in v2.0.0

## ~~getTupleSemigroup~~

Use [`tuple`](#tuple) instead.

**Signature**

```ts
export declare const getTupleSemigroup: <T extends readonly Semigroup<any>[]>(
  ...semigroups: T
) => Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }>
```

Added in v2.0.0

# constructors

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => Semigroup<A>
```

Added in v2.10.0

## max

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const max: <A>(O: Or.Ord<A>) => Semigroup<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/Semigroup'

const S1 = S.max(N.Ord)

assert.deepStrictEqual(S1.concat(1, 2), 2)
```

Added in v2.10.0

## min

Get a semigroup where `concat` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const min: <A>(O: Or.Ord<A>) => Semigroup<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/Semigroup'

const S1 = S.min(N.Ord)

assert.deepStrictEqual(S1.concat(1, 2), 1)
```

Added in v2.10.0

## ~~getJoinSemigroup~~

Use [`max`](#max) instead.

**Signature**

```ts
export declare const getJoinSemigroup: <A>(O: Or.Ord<A>) => Semigroup<A>
```

Added in v2.0.0

## ~~getMeetSemigroup~~

Use [`min`](#min) instead.

**Signature**

```ts
export declare const getMeetSemigroup: <A>(O: Or.Ord<A>) => Semigroup<A>
```

Added in v2.0.0

# instances

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
```

Added in v2.10.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'

assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
```

Added in v2.10.0

## ~~getFirstSemigroup~~

Use [`first`](#first) instead.

**Signature**

```ts
export declare const getFirstSemigroup: <A = never>() => Semigroup<A>
```

Added in v2.0.0

## ~~getFunctionSemigroup~~

Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.

**Signature**

```ts
export declare const getFunctionSemigroup: <S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S>
```

Added in v2.0.0

## ~~getLastSemigroup~~

Use [`last`](#last) instead.

**Signature**

```ts
export declare const getLastSemigroup: <A = never>() => Semigroup<A>
```

Added in v2.0.0

## ~~getObjectSemigroup~~

Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.

**Signature**

```ts
export declare const getObjectSemigroup: <A extends object = never>() => Semigroup<A>
```

Added in v2.0.0

## ~~semigroupAll~~

Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.

**Signature**

```ts
export declare const semigroupAll: Semigroup<boolean>
```

Added in v2.0.0

## ~~semigroupAny~~

Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.

**Signature**

```ts
export declare const semigroupAny: Semigroup<boolean>
```

Added in v2.0.0

## ~~semigroupProduct~~

Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.

**Signature**

```ts
export declare const semigroupProduct: Semigroup<number>
```

Added in v2.0.0

## ~~semigroupString~~

Use [`Semigroup`](./string.ts.html#Semigroup) instead.

**Signature**

```ts
export declare const semigroupString: Semigroup<string>
```

Added in v2.0.0

## ~~semigroupSum~~

Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.

**Signature**

```ts
export declare const semigroupSum: Semigroup<number>
```

Added in v2.0.0

## ~~semigroupVoid~~

Use `void` module instead.

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

Use [`concatAll`](#concatall) instead.

**Signature**

```ts
export declare function fold<A>(S: Semigroup<A>): {
  (startWith: A): (as: ReadonlyArray<A>) => A
  (startWith: A, as: ReadonlyArray<A>): A
}
```

Added in v2.0.0
