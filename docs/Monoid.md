---
id: Monoid
title: Monoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L25-L27)

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v1.0.0

## monoidAll

Boolean monoid under conjunction

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L69-L72)

```ts
export const monoidAll: Monoid<boolean> = ...
```

Added in v1.0.0

## monoidAny

Boolean monoid under disjunction

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L78-L81)

```ts
export const monoidAny: Monoid<boolean> = ...
```

Added in v1.0.0

## monoidProduct

Number monoid under multiplication

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L132-L135)

```ts
export const monoidProduct: Monoid<number> = ...
```

Added in v1.0.0

## monoidString

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L140-L143)

```ts
export const monoidString: Monoid<string> = ...
```

Added in v1.0.0

## monoidSum

Number monoid under addition

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L123-L126)

```ts
export const monoidSum: Monoid<number> = ...
```

Added in v1.0.0

## monoidVoid

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L148-L151)

```ts
export const monoidVoid: Monoid<void> = ...
```

Added in v1.0.0

## unsafeMonoidArray

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L88-L91)

```ts
export const unsafeMonoidArray: Monoid<Array<any>> = ...
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L32-L34)

```ts
export const fold = <A>(M: Monoid<A>): ((as: Array<A>) => A) => { ... }
```

Added in v1.0.0

## getArrayMonoid

`Monoid` under array concatenation

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L98-L100)

```ts
export const getArrayMonoid = <A = never>(): Monoid<Array<A>> => { ... }
```

Added in v1.0.0

## ~~getDictionaryMonoid~~ (deprecated)

Use [Record](./Record.md)'s `getMonoid`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L111-L117)

```ts
export function getDictionaryMonoid<A>(S: Semigroup<A>): Monoid< { ... }
```

Added in v1.4.0

## getDualMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L58-L63)

```ts
export const getDualMonoid = <A>(M: Monoid<A>): Monoid<A> => { ... }
```

Added in v1.0.0

## getEndomorphismMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L166-L171)

```ts
export const getEndomorphismMonoid = <A = never>(): Monoid<Endomorphism<A>> => { ... }
```

Added in v1.0.0

## getFunctionMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L156-L161)

```ts
export const getFunctionMonoid = <M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M> => { ... }
```

Added in v1.0.0

## getJoinMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L213-L218)

```ts
export const getJoinMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## getMeetMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L203-L208)

```ts
export const getMeetMonoid = <A>(B: Bounded<A>): Monoid<A> => { ... }
```

Added in v1.9.0

## ~~getProductMonoid~~ (deprecated)

Use [getTupleMonoid](#gettuplemonoid) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L51-L53)

```ts
export const getProductMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => { ... }
```

Added in v1.0.0

## ~~getRecordMonoid~~ (deprecated)

Use [getStructMonoid](#getstructmonoid) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L194-L198)

```ts
export const getRecordMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => { ... }
```

Added in v1.0.0

## getStructMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L176-L187)

```ts
export const getStructMonoid = <O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O> => { ... }
```

Added in v1.14.0

## getTupleMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts#L39-L44)

```ts
export const getTupleMonoid = <A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]> => { ... }
```

Added in v1.0.0
