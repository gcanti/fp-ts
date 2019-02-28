---
id: Semigroup
title: Semigroup
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)

# Semigroup

**Signature** (type class)

```ts
export interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

Added in v1.0.0

## semigroupAll

Boolean semigroup under conjunction

**Signature** (constant)

```ts
export const semigroupAll: Semigroup<boolean> = ...
```

Added in v1.0.0

## semigroupAny

Boolean semigroup under disjunction

**Signature** (constant)

```ts
export const semigroupAny: Semigroup<boolean> = ...
```

Added in v1.0.0

## semigroupProduct

Number `Semigroup` under multiplication

**Signature** (constant)

```ts
export const semigroupProduct: Semigroup<number> = ...
```

Added in v1.0.0

## semigroupString

**Signature** (constant)

```ts
export const semigroupString: Semigroup<string> = ...
```

Added in v1.0.0

## semigroupSum

Number `Semigroup` under addition

**Signature** (constant)

```ts
export const semigroupSum: Semigroup<number> = ...
```

Added in v1.0.0

## semigroupVoid

**Signature** (constant)

```ts
export const semigroupVoid: Semigroup<void> = ...
```

Added in v1.0.0

## fold

**Signature** (function)

```ts
export const fold = <A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A => { ... }
```

Added in v1.0.0

## ~~getArraySemigroup~~

Use `Monoid`'s `getArrayMonoid` instead

**Signature** (function)

```ts
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => { ... }
```

Added in v1.0.0

## ~~getDictionarySemigroup~~

Use `Record`'s `getMonoid`

**Signature** (function)

```ts
export function getDictionarySemigroup<A>(S: Semigroup<A>): Semigroup< { ... }
```

Added in v1.4.0

## getDualSemigroup

**Signature** (function)

```ts
export const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getFirstSemigroup

**Signature** (function)

```ts
export const getFirstSemigroup = <A = never>(): Semigroup<A> => { ... }
```

Added in v1.0.0

## getFunctionSemigroup

**Signature** (function)

```ts
export const getFunctionSemigroup = <S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S> => { ... }
```

Added in v1.0.0

## getJoinSemigroup

**Signature** (function)

```ts
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getLastSemigroup

**Signature** (function)

```ts
export const getLastSemigroup = <A = never>(): Semigroup<A> => { ... }
```

Added in v1.0.0

## getMeetSemigroup

**Signature** (function)

```ts
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getObjectSemigroup

Returns a `Semigroup` instance for objects preserving their type

**Signature** (function)

```ts
export const getObjectSemigroup = <A extends object = never>(): Semigroup<A> => { ... }
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

Added in v1.4.0

## ~~getProductSemigroup~~

Use `getTupleSemigroup` instead

**Signature** (function)

```ts
export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => { ... }
```

Added in v1.0.0

## ~~getRecordSemigroup~~

Use `getStructSemigroup` instead

**Signature** (function)

```ts
export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => { ... }
```

Added in v1.0.0

## getStructSemigroup

**Signature** (function)

```ts
export const getStructSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => { ... }
```

Added in v1.14.0

## getTupleSemigroup

**Signature** (function)

```ts
export const getTupleSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => { ... }
```

Added in v1.14.0
