---
id: Monoid
title: Module Monoid
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L26-L28)

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v1.0.0

## monoidAll

Boolean monoid under conjunction

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L65-L68)

```ts
export const monoidAll: Monoid<boolean> = { ... }
```

Added in v1.0.0

## monoidAny

Boolean monoid under disjunction

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L75-L78)

```ts
export const monoidAny: Monoid<boolean> = { ... }
```

Added in v1.0.0

## monoidProduct

Number monoid under multiplication

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L137-L140)

```ts
export const monoidProduct: Monoid<number> = { ... }
```

Added in v1.0.0

## monoidString

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L146-L149)

```ts
export const monoidString: Monoid<string> = { ... }
```

Added in v1.0.0

## monoidSum

Number monoid under addition

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L127-L130)

```ts
export const monoidSum: Monoid<number> = { ... }
```

Added in v1.0.0

## monoidVoid

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L155-L158)

```ts
export const monoidVoid: Monoid<void> = { ... }
```

Added in v1.0.0

## unsafeMonoidArray

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L86-L89)

```ts
export const unsafeMonoidArray: Monoid<Array<any>> = { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L34-L36)

```ts
export const fold = <A>(M: Monoid<A>): ((as: Array<A>) => A) => { ... }
```

Added in v1.0.0

## getArrayMonoid

Monoid under array concatenation (`Array<any>`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L96-L98)

```ts
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => { ... }
```

Added in v1.0.0

## getDictionaryMonoid

Gets [Monoid](./Monoid.md) instance for dictionaries given [Semigroup](./Semigroup.md) instance for their values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L115-L120)

```ts
export const getDictionaryMonoid = <A>(S: Semigroup<A>): Monoid<{ [key: string]: A }> => { ... }
```

**Example**

```ts
import { getDictionaryMonoid, fold } from 'fp-ts/lib/Monoid'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const M = getDictionaryMonoid(semigroupSum)
assert.deepEqual(fold(M)([{ foo: 123 }, { foo: 456 }]), { foo: 579 })
```

Added in v1.4.0

## getDualMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L53-L58)

```ts
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => { ... }
```

Added in v1.0.0

## getEndomorphismMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L175-L180)

```ts
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => { ... }
```

Added in v1.0.0

## getFunctionMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L164-L169)

```ts
export const getFunctionMonoid = <M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M> => { ... }
```

Added in v1.0.0

## getJoinMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L215-L220)

```ts
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## getMeetMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L204-L209)

```ts
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## getProductMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L42-L47)

```ts
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => { ... }
```

Added in v1.0.0

## getRecordMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L186-L198)

```ts
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => { ... }
```

Added in v1.0.0
