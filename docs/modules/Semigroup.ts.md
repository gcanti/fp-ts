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
  - [getJoinSemigroup](#getjoinsemigroup)
  - [getMeetSemigroup](#getmeetsemigroup)
  - [getUnitSemigroup](#getunitsemigroup)
- [instances](#instances)
  - [getFirstSemigroup](#getfirstsemigroup)
  - [getFunctionSemigroup](#getfunctionsemigroup)
  - [getLastSemigroup](#getlastsemigroup)
  - [getObjectSemigroup](#getobjectsemigroup)
  - [semigroupProduct](#semigroupproduct)
  - [semigroupString](#semigroupstring)
  - [semigroupSum](#semigroupsum)
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
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', S.getDual(S.semigroupString).concat('b')), 'ba')
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
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

const S1 = S.getIntercalateSemigroup(' ')(S.semigroupString)

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
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

interface Point {
  readonly x: number
  readonly y: number
}

const semigroupPoint = S.getStructSemigroup<Point>({
  x: S.semigroupSum,
  y: S.semigroupSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, semigroupPoint.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
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
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'

const S1 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum)
assert.deepStrictEqual(pipe(['a', 1], S1.concat(['b', 2])), ['ab', 3])

const S2 = S.getTupleSemigroup(S.semigroupString, S.semigroupSum, B.SemigroupAll)
assert.deepStrictEqual(pipe(['a', 1, true], S2.concat(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

# constructors

## getJoinSemigroup

Get a semigroup where `concat` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const getJoinSemigroup: <A>(O: Ord<A>) => Semigroup<A>
```

**Example**

```ts
import * as O from 'fp-ts/Ord'
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

const S1 = S.getJoinSemigroup(O.ordNumber)

assert.deepStrictEqual(pipe(1, S1.concat(2)), 2)
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
import * as O from 'fp-ts/Ord'
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

const S1 = S.getMeetSemigroup(O.ordNumber)

assert.deepStrictEqual(pipe(1, S1.concat(2)), 1)
```

Added in v3.0.0

## getUnitSemigroup

**Signature**

```ts
export declare const getUnitSemigroup: <A>(a: A) => Semigroup<A>
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

## getFunctionSemigroup

Unary functions form a semigroup as long as you can provide a semigroup for the codomain.

**Signature**

```ts
export declare const getFunctionSemigroup: <S>(S: Semigroup<S>) => <A = never>() => Semigroup<(a: A) => S>
```

**Example**

```ts
import { Predicate, pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as B from 'fp-ts/boolean'

const f: Predicate<number> = (n) => n <= 2
const g: Predicate<number> = (n) => n >= 0

const S1 = S.getFunctionSemigroup(B.SemigroupAll)<number>()

assert.deepStrictEqual(pipe(f, S1.concat(g))(1), true)
assert.deepStrictEqual(pipe(f, S1.concat(g))(3), false)

const S2 = S.getFunctionSemigroup(B.SemigroupAny)<number>()

assert.deepStrictEqual(pipe(f, S2.concat(g))(1), true)
assert.deepStrictEqual(pipe(f, S2.concat(g))(3), true)
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

## semigroupProduct

`number` semigroup under multiplication.

**Signature**

```ts
export declare const semigroupProduct: Semigroup<number>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(2, S.semigroupProduct.concat(3)), 6)
```

Added in v3.0.0

## semigroupString

`string` semigroup under concatenation.

**Signature**

```ts
export declare const semigroupString: Semigroup<string>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('a', S.semigroupString.concat('b')), 'ab')
```

Added in v3.0.0

## semigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const semigroupSum: Semigroup<number>
```

**Example**

```ts
import * as S from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(2, S.semigroupSum.concat(3)), 5)
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
import * as S from 'fp-ts/Semigroup'

const sum = S.fold(S.semigroupSum)(0)

assert.deepStrictEqual(sum([1, 2, 3]), 6)
assert.deepStrictEqual(sum([]), 0)
```

Added in v3.0.0
