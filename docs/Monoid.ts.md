---
title: Monoid.ts
nav_order: 57
---

**Table of contents**

- [Monoid (interface)](#monoid-interface)
- [monoidAll (constant)](#monoidall-constant)
- [monoidAny (constant)](#monoidany-constant)
- [monoidProduct (constant)](#monoidproduct-constant)
- [monoidString (constant)](#monoidstring-constant)
- [monoidSum (constant)](#monoidsum-constant)
- [monoidVoid (constant)](#monoidvoid-constant)
- [unsafeMonoidArray (constant)](#unsafemonoidarray-constant)
- [fold (function)](#fold-function)
- [getArrayMonoid (function)](#getarraymonoid-function)
- [~~getDictionaryMonoid~~ (function)](#getdictionarymonoid-function)
- [getDualMonoid (function)](#getdualmonoid-function)
- [getEndomorphismMonoid (function)](#getendomorphismmonoid-function)
- [getFunctionMonoid (function)](#getfunctionmonoid-function)
- [getJoinMonoid (function)](#getjoinmonoid-function)
- [getMeetMonoid (function)](#getmeetmonoid-function)
- [~~getProductMonoid~~ (function)](#getproductmonoid-function)
- [~~getRecordMonoid~~ (function)](#getrecordmonoid-function)
- [getStructMonoid (function)](#getstructmonoid-function)
- [getTupleMonoid (function)](#gettuplemonoid-function)

# Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v1.0.0

# monoidAll (constant)

Boolean monoid under conjunction

**Signature**

```ts
export const monoidAll: Monoid<boolean> = ...
```

Added in v1.0.0

# monoidAny (constant)

Boolean monoid under disjunction

**Signature**

```ts
export const monoidAny: Monoid<boolean> = ...
```

Added in v1.0.0

# monoidProduct (constant)

Number monoid under multiplication

**Signature**

```ts
export const monoidProduct: Monoid<number> = ...
```

Added in v1.0.0

# monoidString (constant)

**Signature**

```ts
export const monoidString: Monoid<string> = ...
```

Added in v1.0.0

# monoidSum (constant)

Number monoid under addition

**Signature**

```ts
export const monoidSum: Monoid<number> = ...
```

Added in v1.0.0

# monoidVoid (constant)

**Signature**

```ts
export const monoidVoid: Monoid<void> = ...
```

Added in v1.0.0

# unsafeMonoidArray (constant)

**Signature**

```ts
export const unsafeMonoidArray: Monoid<Array<any>> = ...
```

Added in v1.0.0

# fold (function)

**Signature**

```ts
export const fold = <A>(M: Monoid<A>): ((as: Array<A>) => A) => ...
```

Added in v1.0.0

# getArrayMonoid (function)

`Monoid` under array concatenation

**Signature**

```ts
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => ...
```

Added in v1.0.0

# ~~getDictionaryMonoid~~ (function)

Use `Record`'s `getMonoid`

**Signature**

```ts
export function getDictionaryMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getDictionaryMonoid<A>(S: Semigroup<A>): Monoid<{ [key: string]: A }>
export function getDictionaryMonoid<A>(S: Semigroup<A>): Monoid< { ... }
```

Added in v1.4.0

# getDualMonoid (function)

**Signature**

```ts
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => ...
```

Added in v1.0.0

# getEndomorphismMonoid (function)

**Signature**

```ts
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => ...
```

Added in v1.0.0

# getFunctionMonoid (function)

**Signature**

```ts
export const getFunctionMonoid = <M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M> => ...
```

Added in v1.0.0

# getJoinMonoid (function)

**Signature**

```ts
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => ...
```

Added in v1.9.0

# getMeetMonoid (function)

**Signature**

```ts
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => ...
```

Added in v1.9.0

# ~~getProductMonoid~~ (function)

Use `getTupleMonoid` instead

**Signature**

```ts
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => ...
```

Added in v1.0.0

# ~~getRecordMonoid~~ (function)

Use `getStructMonoid` instead

**Signature**

```ts
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => ...
```

Added in v1.0.0

# getStructMonoid (function)

**Signature**

```ts
export const getStructMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => ...
```

Added in v1.14.0

# getTupleMonoid (function)

**Signature**

```ts
export const getTupleMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => ...
```

Added in v1.0.0
