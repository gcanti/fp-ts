---
title: Semigroup.ts
nav_order: 69
parent: Modules
---

## Semigroup overview

If a type `A` can form a `Semigroup` it has an **associative** binary operation.

```ts
interface Semigroup<A> {
  readonly concat: (second: A) => (first: A) => A
}
```

Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.

```ts
(x |> concat(y)) |> concat(z) <-> x |> concat(y |> concat(z))
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getDual](#getdual)
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
- [type classes](#type-classes)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [fold](#fold)

---

# combinators

## getDual

The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const getDual: <A>(S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { getDual } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', getDual(S.Semigroup).concat('b')), 'ba')
```

Added in v3.0.0

## getIntercalateSemigroup

You can glue items between and stay associative.

**Signature**

```ts
export declare const getIntercalateSemigroup: <A>(a: A) => Endomorphism<Semigroup<A>>
```

**Example**

```ts
import { getIntercalateSemigroup } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'

const S1 = getIntercalateSemigroup(' ')(S.Semigroup)

assert.strictEqual(pipe('a', S1.concat('b')), 'a b')
assert.strictEqual(pipe('a', S1.concat('b'), S1.concat('c')), 'a b c')
```

Added in v3.0.0

## getStructSemigroup

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const getStructSemigroup: <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }) => Semigroup<A>
```

**Example**

```ts
import { getStructSemigroup } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

interface Point {
  readonly x: number
  readonly y: number
}

const S = getStructSemigroup<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, S.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
```

Added in v3.0.0

## getTupleSemigroup

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare const getTupleSemigroup: <A extends readonly unknown[]>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<A>
```

**Example**

```ts
import { getTupleSemigroup } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const S1 = getTupleSemigroup(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])

const S2 = getTupleSemigroup(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
assert.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

# constructors

## getConstantSemigroup

**Signature**

```ts
export declare const getConstantSemigroup: <A>(a: A) => Semigroup<A>
```

Added in v3.0.0

## getJoinSemigroup

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const getJoinSemigroup: <A>(O: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { getJoinSemigroup } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = getJoinSemigroup(N.Ord)

assert.deepStrictEqual(pipe(1, S.concat(2)), 2)
```

Added in v3.0.0

## getMeetSemigroup

Get a semigroup where `concat` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const getMeetSemigroup: <A>(O: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { getMeetSemigroup } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = getMeetSemigroup(N.Ord)

assert.deepStrictEqual(pipe(1, S.concat(2)), 1)
```

Added in v3.0.0

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
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.getFirstSemigroup<number>().concat(2)), 1)
```

Added in v3.0.0

## getLastSemigroup

Always return the last argument.

**Signature**

```ts
export declare const getLastSemigroup: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.getLastSemigroup<number>().concat(2)), 2)
```

Added in v3.0.0

## getObjectSemigroup

Return a semigroup for objects, preserving their type.

**Signature**

```ts
export declare const getObjectSemigroup: <A extends object = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

interface Person {
  name: string
  age: number
}

const S1 = S.getObjectSemigroup<Person>()
assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S1.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
```

Added in v3.0.0

# type classes

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> extends Magma<A> {}
```

Added in v3.0.0

# utils

## fold

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const fold: <A>(S: Semigroup<A>) => (startWith: A) => (as: readonly A[]) => A
```

**Example**

```ts
import { fold } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'

const sum = fold(N.SemigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v3.0.0
