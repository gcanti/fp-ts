---
title: Semigroup.ts
nav_order: 86
parent: Modules
---

## Semigroup overview

If a type `A` can form a `Semigroup` it has an **associative** binary operation.

```ts
interface Semigroup<A> {
  readonly combine: (second: A) => (self: A) => A
}
```

Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.

```ts
(x |> combine(y)) |> combine(z) <-> x |> combine(y |> combine(z))
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [intercalate](#intercalate)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
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

---

# combinators

## intercalate

You can glue items between and stay associative.

**Signature**

```ts
export declare const intercalate: <S>(middle: S) => Endomorphism<Semigroup<S>>
```

**Example**

```ts
import { intercalate } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'

const S1 = pipe(S.Semigroup, intercalate(' + '))

assert.strictEqual(pipe('a', S1.combine('b')), 'a + b')
assert.strictEqual(pipe('a', S1.combine('b'), S1.combine('c')), 'a + b + c')
```

Added in v3.0.0

## reverse

The dual of a `Semigroup`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <S>(S: Semigroup<S>) => Semigroup<S>
```

**Example**

```ts
import { reverse } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).combine('b')), 'ba')
```

Added in v3.0.0

## struct

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const struct: <S>(semigroups: { [K in keyof S]: Semigroup<S[K]> }) => Semigroup<{
  readonly [K in keyof S]: S[K]
}>
```

**Example**

```ts
import { struct } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

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
export declare const tuple: <S extends readonly unknown[]>(
  ...semigroups: { [K in keyof S]: Semigroup<S[K]> }
) => Semigroup<Readonly<S>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const S1 = tuple(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(pipe(['a', 1], S1.combine(['b', 2])), ['ab', 3])

const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
assert.deepStrictEqual(pipe(['a', 1, true], S2.combine(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

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
export declare const max: <S>(O: ord.Ord<S>) => Semigroup<S>
```

**Example**

```ts
import { max } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = max(N.Ord)

assert.deepStrictEqual(pipe(1, S.combine(2)), 2)
```

Added in v3.0.0

## min

Get a semigroup where `combine` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const min: <S>(O: ord.Ord<S>) => Semigroup<S>
```

**Example**

```ts
import { min } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = min(N.Ord)

assert.deepStrictEqual(pipe(1, S.combine(2)), 1)
```

Added in v3.0.0

# instances

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <S>() => Semigroup<S>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.first<number>().combine(2)), 1)
```

Added in v3.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <S>() => Semigroup<S>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.last<number>().combine(2)), 2)
```

Added in v3.0.0

# model

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<S> extends Magma<S> {}
```

Added in v3.0.0

# utils

## combineAll

Given a sequence of `as`, combine them and return the total.

If `as` is empty, return the provided `startWith` value.

**Signature**

```ts
export declare const combineAll: <S>(S: Semigroup<S>) => (startWith: S) => (elements: readonly S[]) => S
```

**Example**

```ts
import { combineAll } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'

const sum = combineAll(N.SemigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v3.0.0
