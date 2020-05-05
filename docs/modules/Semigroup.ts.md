---
title: Semigroup.ts
nav_order: 77
parent: Modules
---

# Semigroup overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Semigroup (interface)](#semigroup-interface)
- [fold](#fold)
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

---

# Semigroup (interface)

A `Semigroup` is a `Magma` where `concat` is associative, that is:

Associativiy: `concat(concat(x, y), z) = concat(x, concat(y, z))`

**Signature**

```ts
export interface Semigroup<A> extends Magma<A> {}
```

Added in v2.0.0

# fold

**Signature**

```ts
export declare function fold<A>(S: Semigroup<A>): (a: A, as: ReadonlyArray<A>) => A
```

Added in v2.0.0

# getDualSemigroup

The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare function getDualSemigroup<A>(S: Semigroup<A>): Semigroup<A>
```

**Example**

```ts
import { getDualSemigroup, semigroupString } from 'fp-ts/lib/Semigroup'

assert.deepStrictEqual(getDualSemigroup(semigroupString).concat('a', 'b'), 'ba')
```

Added in v2.0.0

# getFirstSemigroup

**Signature**

```ts
export declare function getFirstSemigroup<A = never>(): Semigroup<A>
```

Added in v2.0.0

# getFunctionSemigroup

**Signature**

```ts
export declare function getFunctionSemigroup<S>(S: Semigroup<S>): <A = never>() => Semigroup<(a: A) => S>
```

Added in v2.0.0

# getIntercalateSemigroup

You can glue items between and stay associative

**Signature**

```ts
export declare function getIntercalateSemigroup<A>(a: A): (S: Semigroup<A>) => Semigroup<A>
```

**Example**

```ts
import { getIntercalateSemigroup, semigroupString } from 'fp-ts/lib/Semigroup'

const S = getIntercalateSemigroup(' ')(semigroupString)

assert.strictEqual(S.concat('a', 'b'), 'a b')
assert.strictEqual(S.concat(S.concat('a', 'b'), 'c'), S.concat('a', S.concat('b', 'c')))
```

Added in v2.5.0

# getJoinSemigroup

**Signature**

```ts
export declare function getJoinSemigroup<A>(O: Ord<A>): Semigroup<A>
```

Added in v2.0.0

# getLastSemigroup

**Signature**

```ts
export declare function getLastSemigroup<A = never>(): Semigroup<A>
```

Added in v2.0.0

# getMeetSemigroup

**Signature**

```ts
export declare function getMeetSemigroup<A>(O: Ord<A>): Semigroup<A>
```

Added in v2.0.0

# getObjectSemigroup

Returns a `Semigroup` instance for objects preserving their type

**Signature**

```ts
export declare function getObjectSemigroup<A extends object = never>(): Semigroup<A>
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

# getStructSemigroup

**Signature**

```ts
export declare function getStructSemigroup<O extends ReadonlyRecord<string, any>>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```

Added in v2.0.0

# getTupleSemigroup

Given a tuple of semigroups returns a semigroup for the tuple

**Signature**

```ts
export declare function getTupleSemigroup<T extends ReadonlyArray<Semigroup<any>>>(
  ...semigroups: T
): Semigroup<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }>
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

# semigroupAll

Boolean semigroup under conjunction

**Signature**

```ts
export declare const semigroupAll: Semigroup<boolean>
```

Added in v2.0.0

# semigroupAny

Boolean semigroup under disjunction

**Signature**

```ts
export declare const semigroupAny: Semigroup<boolean>
```

Added in v2.0.0

# semigroupProduct

Number `Semigroup` under multiplication

**Signature**

```ts
export declare const semigroupProduct: Semigroup<number>
```

Added in v2.0.0

# semigroupString

**Signature**

```ts
export declare const semigroupString: Semigroup<string>
```

Added in v2.0.0

# semigroupSum

Number `Semigroup` under addition

**Signature**

```ts
export declare const semigroupSum: Semigroup<number>
```

Added in v2.0.0

# semigroupVoid

**Signature**

```ts
export declare const semigroupVoid: Semigroup<void>
```

Added in v2.0.0
