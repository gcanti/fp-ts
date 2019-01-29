---
id: Setoid
title: Module Setoid
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)

# Setoid

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L15-L17)

```ts
export interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

The `Setoid` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `S.equals(a, a) === true`
2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`

Added in v1.0.0

## setoidBoolean

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L45-L45)

```ts
export const setoidBoolean: Setoid<boolean> = { ... }
```

Added in v1.0.0

## setoidDate

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L101-L101)

```ts
export const setoidDate: Setoid<Date> = { ... }
```

Added in v1.4.0

## setoidNumber

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L39-L39)

```ts
export const setoidNumber: Setoid<number> = { ... }
```

Added in v1.0.0

## setoidString

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L33-L33)

```ts
export const setoidString: Setoid<string> = { ... }
```

Added in v1.0.0

## contramap

Returns the `Setoid` corresponding to the partitions of `B` induced by `f`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L91-L95)

```ts
export const contramap = <A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B> => { ... }
```

Added in v1.2.0

## getArraySetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L51-L55)

```ts
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => { ... }
```

Added in v1.0.0

## getProductSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L80-L84)

```ts
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => { ... }
```

Added in v1.0.0

## getRecordSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L61-L74)

```ts
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => { ... }
```

Added in v1.0.0

## strictEqual

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts#L23-L25)

```ts
export const strictEqual = <A>(a: A, b: A): boolean => { ... }
```

Added in v1.0.0
