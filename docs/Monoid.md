---
id: Monoid
title: Monoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

**Signature** (type class)

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v1.0.0

## monoidAll

Boolean monoid under conjunction

**Signature** (constant)

```ts
export const monoidAll: Monoid<boolean> = ...
```

Added in v1.0.0

## monoidAny

Boolean monoid under disjunction

**Signature** (constant)

```ts
export const monoidAny: Monoid<boolean> = ...
```

Added in v1.0.0

## monoidProduct

Number monoid under multiplication

**Signature** (constant)

```ts
export const monoidProduct: Monoid<number> = ...
```

Added in v1.0.0

## monoidString

**Signature** (constant)

```ts
export const monoidString: Monoid<string> = ...
```

Added in v1.0.0

## monoidSum

Number monoid under addition

**Signature** (constant)

```ts
export const monoidSum: Monoid<number> = ...
```

Added in v1.0.0

## monoidVoid

**Signature** (constant)

```ts
export const monoidVoid: Monoid<void> = ...
```

Added in v1.0.0

## unsafeMonoidArray

**Signature** (constant)

```ts
export const unsafeMonoidArray: Monoid<Array<any>> = ...
```

Added in v1.0.0

## fold

**Signature** (function)

```ts
export const fold = <A>(M: Monoid<A>): ((as: Array<A>) => A) => { ... }
```

Added in v1.0.0

## getArrayMonoid

`Monoid` under array concatenation

**Signature** (function)

```ts
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => { ... }
```

Added in v1.0.0

## ~~getDictionaryMonoid~~

Use [Record](./Record.md)'s `getMonoid`

**Signature** (function)

```ts
export function getDictionaryMonoid<A>(S: Semigroup<A>): Monoid< { ... }
```

Added in v1.4.0

## getDualMonoid

**Signature** (function)

```ts
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => { ... }
```

Added in v1.0.0

## getEndomorphismMonoid

**Signature** (function)

```ts
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => { ... }
```

Added in v1.0.0

## getFunctionMonoid

**Signature** (function)

```ts
export const getFunctionMonoid = <M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M> => { ... }
```

Added in v1.0.0

## getJoinMonoid

**Signature** (function)

```ts
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## getMeetMonoid

**Signature** (function)

```ts
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## ~~getProductMonoid~~

Use [getTupleMonoid](#gettuplemonoid) instead

**Signature** (function)

```ts
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => { ... }
```

Added in v1.0.0

## ~~getRecordMonoid~~

Use [getStructMonoid](#getstructmonoid) instead

**Signature** (function)

```ts
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => { ... }
```

Added in v1.0.0

## getStructMonoid

**Signature** (function)

```ts
export const getStructMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => { ... }
```

Added in v1.14.0

## getTupleMonoid

**Signature** (function)

```ts
export const getTupleMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => { ... }
```

Added in v1.0.0
