---
title: Monoid.ts
nav_order: 58
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `a`.

```ts
a |> concat(empty) = empty |> concat(a) <-> a
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
- [constructors](#constructors)
  - [max](#max)
  - [min](#min)
- [type classes](#type-classes)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [concatAll](#concatall)

---

# combinators

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const reverse: <A>(M: Monoid<A>) => Monoid<A>
```

**Example**

```ts
import { reverse } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

const M = reverse(S.Monoid)
assert.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
```

Added in v3.0.0

## struct

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const struct: <A>(monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<{ readonly [K in keyof A]: A[K] }>
```

**Example**

```ts
import { struct } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

interface Point {
  readonly x: number
  readonly y: number
}

const M = struct<Point>({
  x: N.MonoidSum,
  y: N.MonoidSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, M.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
```

Added in v3.0.0

## tuple

Given a tuple of monoids returns a monoid for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<Readonly<A>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const M1 = tuple(S.Monoid, N.MonoidSum)
assert.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])

const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
assert.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

# constructors

## max

Get a monoid where `concat` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare const max: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import { max } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const M = max(N.Bounded)

assert.deepStrictEqual(pipe(1, M.concat(2)), 2)
```

Added in v3.0.0

## min

Get a monoid where `concat` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare const min: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import { min } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const M = min(N.Bounded)

assert.deepStrictEqual(pipe(1, M.concat(2)), 1)
```

Added in v3.0.0

# type classes

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}
```

Added in v3.0.0

# utils

## concatAll

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare const concatAll: <A>(M: Monoid<A>) => (as: readonly A[]) => A
```

**Example**

```ts
import { concatAll } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
assert.deepStrictEqual(concatAll(N.MonoidSum)([]), 0)
```

Added in v3.0.0
