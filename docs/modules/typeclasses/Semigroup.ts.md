---
title: typeclasses/Semigroup.ts
nav_order: 73
parent: Modules
---

## Semigroup overview

If a type `A` can form a `Semigroup` it has an **associative** binary operation.

```ts
interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
}
```

Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.

```ts
(x |> combine(y)) |> combine(z) <-> x |> combine(y |> combine(z))
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [constant](#constant)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [first](#first)
  - [last](#last)
- [model](#model)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [combineAll](#combineall)
  - [intercalate](#intercalate)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## constant

**Signature**

```ts
export declare const constant: <S>(s: S) => Semigroup<S>
```

Added in v3.0.0

## max

Get a semigroup where `combine` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const max: <A>(Ord: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { max } from 'fp-ts/typeclasses/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

const S = max(N.Ord)

assert.deepStrictEqual(pipe(1, S.combine(2)), 2)
```

Added in v3.0.0

## min

Get a semigroup where `combine` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const min: <A>(Ord: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { min } from 'fp-ts/typeclasses/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

const S = min(N.Ord)

assert.deepStrictEqual(pipe(1, S.combine(2)), 1)
```

Added in v3.0.0

# instances

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/typeclasses/Semigroup'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(1, S.first<number>().combine(2)), 1)
```

Added in v3.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/typeclasses/Semigroup'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(1, S.last<number>().combine(2)), 2)
```

Added in v3.0.0

# model

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
}
```

Added in v3.0.0

# utils

## combineAll

Given a sequence of `as`, combine them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const combineAll: <S>(Semigroup: Semigroup<S>) => (startWith: S) => (collection: Iterable<S>) => S
```

**Example**

```ts
import { combineAll } from 'fp-ts/typeclasses/Semigroup'
import * as N from 'fp-ts/number'

const sum = combineAll(N.SemigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v3.0.0

## intercalate

You can glue items between and stay associative.

**Signature**

```ts
export declare const intercalate: <A>(separator: A) => (Semigroup: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { intercalate } from 'fp-ts/typeclasses/Semigroup'
import { pipe } from 'fp-ts/Function'
import * as S from 'fp-ts/string'

const S1 = pipe(S.Semigroup, intercalate(' + '))

assert.strictEqual(pipe('a', S1.combine('b')), 'a + b')
assert.strictEqual(pipe('a', S1.combine('b'), S1.combine('c')), 'a + b + c')
```

Added in v3.0.0

## reverse

The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <S>(Semigroup: Semigroup<S>) => Semigroup<S>
```

**Example**

```ts
import { reverse } from 'fp-ts/typeclasses/Semigroup'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).combine('b')), 'ba')
```

Added in v3.0.0

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
import { struct } from 'fp-ts/typeclasses/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

interface Point {
  readonly x: number
  readonly y: number
}

const S = struct<Point>({
  x: N.SemigroupSum,
  y: N.SemigroupSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, S.combine({ x: 3, y: 4 })), { x: 4, y: 6 })
```

Added in v3.0.0

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
import { tuple } from 'fp-ts/typeclasses/Semigroup'
import { pipe } from 'fp-ts/Function'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const S1 = tuple(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])

const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAnd)
assert.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0
