---
title: Semigroup.ts
nav_order: 71
parent: Modules
---

# Semigroup overview

See [Getting started with fp-ts: Semigroup](https://gcanti.github.io/fp-ts/getting-started/Semigroup.html)

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Semigroup (interface)](#semigroup-interface)
- [semigroupAll (constant)](#semigroupall-constant)
- [semigroupAny (constant)](#semigroupany-constant)
- [semigroupProduct (constant)](#semigroupproduct-constant)
- [semigroupString (constant)](#semigroupstring-constant)
- [semigroupSum (constant)](#semigroupsum-constant)
- [semigroupVoid (constant)](#semigroupvoid-constant)
- [fold (function)](#fold-function)
- [getDualSemigroup (function)](#getdualsemigroup-function)
- [getFirstSemigroup (function)](#getfirstsemigroup-function)
- [getFunctionSemigroup (function)](#getfunctionsemigroup-function)
- [getJoinSemigroup (function)](#getjoinsemigroup-function)
- [getLastSemigroup (function)](#getlastsemigroup-function)
- [getMeetSemigroup (function)](#getmeetsemigroup-function)
- [getObjectSemigroup (function)](#getobjectsemigroup-function)
- [getStructSemigroup (function)](#getstructsemigroup-function)
- [getTupleSemigroup (function)](#gettuplesemigroup-function)

---

# Semigroup (interface)

A `Semigroup` is a `Magma` where `concat` is associative, that is:

Associativiy: `concat(concat(x, y), z) = concat(x, concat(y, z))`

**Signature**

```ts
export interface Semigroup<A> extends Magma<A> {}
```

Added in v2.0.0

# semigroupAll (constant)

Boolean semigroup under conjunction

**Signature**

```ts
export const semigroupAll: Semigroup<boolean> = ...
```

Added in v2.0.0

# semigroupAny (constant)

Boolean semigroup under disjunction

**Signature**

```ts
export const semigroupAny: Semigroup<boolean> = ...
```

Added in v2.0.0

# semigroupProduct (constant)

Number `Semigroup` under multiplication

**Signature**

```ts
export const semigroupProduct: Semigroup<number> = ...
```

Added in v2.0.0

# semigroupString (constant)

**Signature**

```ts
export const semigroupString: Semigroup<string> = ...
```

Added in v2.0.0

# semigroupSum (constant)

Number `Semigroup` under addition

**Signature**

```ts
export const semigroupSum: Semigroup<number> = ...
```

Added in v2.0.0

# semigroupVoid (constant)

**Signature**

```ts
export const semigroupVoid: Semigroup<void> = ...
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<A>(S: Semigroup<A>): (a: A, as: Array<A>) => A { ... }
```

Added in v2.0.0

# getDualSemigroup (function)

**Signature**

```ts
export function getDualSemigroup<A>(S: Semigroup<A>): Semigroup<A> { ... }
```

Added in v2.0.0

# getFirstSemigroup (function)

**Signature**

```ts
export function getFirstSemigroup<A = never>(): Semigroup<A> { ... }
```

Added in v2.0.0

# getFunctionSemigroup (function)

**Signature**

```ts
export function getFunctionSemigroup<S>(S: Semigroup<S>): <A = never>() => Semigroup<(a: A) => S> { ... }
```

Added in v2.0.0

# getJoinSemigroup (function)

**Signature**

```ts
export function getJoinSemigroup<A>(O: Ord<A>): Semigroup<A> { ... }
```

Added in v2.0.0

# getLastSemigroup (function)

**Signature**

```ts
export function getLastSemigroup<A = never>(): Semigroup<A> { ... }
```

Added in v2.0.0

# getMeetSemigroup (function)

**Signature**

```ts
export function getMeetSemigroup<A>(O: Ord<A>): Semigroup<A> { ... }
```

Added in v2.0.0

# getObjectSemigroup (function)

Returns a `Semigroup` instance for objects preserving their type

**Signature**

```ts
export function getObjectSemigroup<A extends object = never>(): Semigroup<A> { ... }
```

**Example**

```ts
import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'

interface Person {
  name: string
  age: number
}

const S = getObjectSemigroup<Person>()
assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
```

Added in v2.0.0

# getStructSemigroup (function)

**Signature**

```ts
export function getStructSemigroup<O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> { ... }
```

Added in v2.0.0

# getTupleSemigroup (function)

Given a tuple of semigroups returns a semigroup for the tuple

**Signature**

```ts
export function getTupleSemigroup<T extends Array<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> { ... }
```

**Example**

```ts
import { getTupleSemigroup, semigroupString, semigroupSum, semigroupAll } from 'fp-ts/lib/Semigroup'

const S1 = getTupleSemigroup(semigroupString, semigroupSum)
assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])

const S2 = getTupleSemigroup(semigroupString, semigroupSum, semigroupAll)
assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0
