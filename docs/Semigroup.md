---
id: Semigroup
title: Module Semigroup
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)

# Semigroup

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L8-L10)

```ts
export interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}
```

Added in v1.0.0

## semigroupAll

Boolean semigroup under conjunction

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L100-L102)

```ts
export const semigroupAll: Semigroup<boolean> = ...
```

Added in v1.0.0

## semigroupAny

Boolean semigroup under disjunction

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L108-L110)

```ts
export const semigroupAny: Semigroup<boolean> = ...
```

Added in v1.0.0

## semigroupProduct

Number `Semigroup` under multiplication

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L178-L180)

```ts
export const semigroupProduct: Semigroup<number> = ...
```

Added in v1.0.0

## semigroupString

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L185-L187)

```ts
export const semigroupString: Semigroup<string> = ...
```

Added in v1.0.0

## semigroupSum

Number `Semigroup` under addition

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L170-L172)

```ts
export const semigroupSum: Semigroup<number> = ...
```

Added in v1.0.0

## semigroupVoid

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L192-L194)

```ts
export const semigroupVoid: Semigroup<void> = ...
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L15-L17)

```ts
export const fold = <A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A => { ... }
```

Added in v1.0.0

## ~~getArraySemigroup~~ (deprecated)

Use [Monoid](./Monoid.md)'s `getArrayMonoid` instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L117-L119)

```ts
export const getArraySemigroup = <A = never>(): Semigroup<Array<A>> => { ... }
```

Added in v1.0.0

## ~~getDictionarySemigroup~~ (deprecated)

Use [Record](./Record.md)'s `getMonoid`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L128-L141)

```ts
export function getDictionarySemigroup<A>(S: Semigroup<A>): Semigroup< { ... }
```

Added in v1.4.0

## getDualSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L45-L49)

```ts
export const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getFirstSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L22-L24)

```ts
export const getFirstSemigroup = <A = never>(): Semigroup<A> => { ... }
```

Added in v1.0.0

## getFunctionSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L54-L58)

```ts
export const getFunctionSemigroup = <S>(S: Semigroup<S>) => <A = never>(): Semigroup<(a: A) => S> => { ... }
```

Added in v1.0.0

## getJoinSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L90-L94)

```ts
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getLastSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L29-L31)

```ts
export const getLastSemigroup = <A = never>(): Semigroup<A> => { ... }
```

Added in v1.0.0

## getMeetSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L81-L85)

```ts
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => { ... }
```

Added in v1.0.0

## getObjectSemigroup

Returns a [Semigroup](./Semigroup.md) instance for objects preserving their type

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L162-L164)

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

## getProductSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L36-L40)

```ts
export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => { ... }
```

Added in v1.0.0

## getRecordSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts#L63-L76)

```ts
export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O> => { ... }
```

Added in v1.0.0
