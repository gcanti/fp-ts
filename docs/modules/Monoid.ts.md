---
title: Monoid.ts
nav_order: 55
parent: Modules
---

# Monoid overview

See [Getting started with fp-ts: Monoid](https://gcanti.github.io/fp-ts/getting-started/Monoid.html)

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Monoid (interface)](#monoid-interface)
- [monoidAll (constant)](#monoidall-constant)
- [monoidAny (constant)](#monoidany-constant)
- [monoidProduct (constant)](#monoidproduct-constant)
- [monoidString (constant)](#monoidstring-constant)
- [monoidSum (constant)](#monoidsum-constant)
- [monoidVoid (constant)](#monoidvoid-constant)
- [fold (function)](#fold-function)
- [getDualMonoid (function)](#getdualmonoid-function)
- [getEndomorphismMonoid (function)](#getendomorphismmonoid-function)
- [getFunctionMonoid (function)](#getfunctionmonoid-function)
- [getJoinMonoid (function)](#getjoinmonoid-function)
- [getMeetMonoid (function)](#getmeetmonoid-function)
- [getStructMonoid (function)](#getstructmonoid-function)
- [getTupleMonoid (function)](#gettuplemonoid-function)

---

# Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v2.0.0

# monoidAll (constant)

Boolean monoid under conjunction

**Signature**

```ts
export const monoidAll: Monoid<boolean> = ...
```

Added in v2.0.0

# monoidAny (constant)

Boolean monoid under disjunction

**Signature**

```ts
export const monoidAny: Monoid<boolean> = ...
```

Added in v2.0.0

# monoidProduct (constant)

Number monoid under multiplication

**Signature**

```ts
export const monoidProduct: Monoid<number> = ...
```

Added in v2.0.0

# monoidString (constant)

**Signature**

```ts
export const monoidString: Monoid<string> = ...
```

Added in v2.0.0

# monoidSum (constant)

Number monoid under addition

**Signature**

```ts
export const monoidSum: Monoid<number> = ...
```

Added in v2.0.0

# monoidVoid (constant)

**Signature**

```ts
export const monoidVoid: Monoid<void> = ...
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<A>(M: Monoid<A>): (as: Array<A>) => A { ... }
```

Added in v2.0.0

# getDualMonoid (function)

**Signature**

```ts
export function getDualMonoid<A>(M: Monoid<A>): Monoid<A> { ... }
```

Added in v2.0.0

# getEndomorphismMonoid (function)

**Signature**

```ts
export function getEndomorphismMonoid<A = never>(): Monoid<Endomorphism<A>> { ... }
```

Added in v2.0.0

# getFunctionMonoid (function)

**Signature**

```ts
export function getFunctionMonoid<M>(M: Monoid<M>): <A = never>() => Monoid<(a: A) => M> { ... }
```

Added in v2.0.0

# getJoinMonoid (function)

**Signature**

```ts
export function getJoinMonoid<A>(B: Bounded<A>): Monoid<A> { ... }
```

Added in v2.0.0

# getMeetMonoid (function)

**Signature**

```ts
export function getMeetMonoid<A>(B: Bounded<A>): Monoid<A> { ... }
```

Added in v2.0.0

# getStructMonoid (function)

**Signature**

```ts
export function getStructMonoid<O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> { ... }
```

Added in v2.0.0

# getTupleMonoid (function)

Given a tuple of monoids returns a monoid for the tuple

**Signature**

```ts
export function getTupleMonoid<T extends Array<Monoid<any>>>(
  ...monoids: T
): Monoid<{ [K in keyof T]: T[K] extends Semigroup<infer A> ? A : never }> { ... }
```

**Example**

```ts
import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/lib/Monoid'

const M1 = getTupleMonoid(monoidString, monoidSum)
assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])

const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0
