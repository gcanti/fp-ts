---
title: Semigroup.ts
nav_order: 82
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
- [type classes](#type-classes)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [concatAll](#concatall)

---

# combinators

## intercalate

You can glue items between and stay associative.

**Signature**

```ts
export declare const intercalate: <A>(middle: A) => Endomorphism<Semigroup<A>>
```

**Example**

```ts
import { intercalate } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/string'

const S1 = pipe(S.Semigroup, intercalate(' + '))

assert.strictEqual(pipe('a', S1.concat('b')), 'a + b')
assert.strictEqual(pipe('a', S1.concat('b'), S1.concat('c')), 'a + b + c')
```

Added in v3.0.0

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
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', reverse(S.Semigroup).concat('b')), 'ba')
```

Added in v3.0.0

## struct

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const struct: <A>(
  semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<{ readonly [K in keyof A]: A[K] }>
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

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, S.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
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
import { tuple } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const S1 = tuple(S.Semigroup, N.SemigroupSum)
assert.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])

const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
assert.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

# constructors

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => Semigroup<A>
```

Added in v3.0.0

## max

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const max: <A>(o: O.Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { max } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = max(N.Ord)

assert.deepStrictEqual(pipe(1, S.concat(2)), 2)
```

Added in v3.0.0

## min

Get a semigroup where `concat` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const min: <A>(o: O.Ord<A>) => Semigroup<A>
```

**Example**

```ts
import { min } from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = min(N.Ord)

assert.deepStrictEqual(pipe(1, S.concat(2)), 1)
```

Added in v3.0.0

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
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.first<number>().concat(2)), 1)
```

Added in v3.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A = never>() => Semigroup<A>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(1, S.last<number>().concat(2)), 2)
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

Added in v3.0.0
