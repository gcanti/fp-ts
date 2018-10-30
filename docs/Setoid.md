---
id: Setoid
title: Module Setoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)

# Setoid

```ts
interface Setoid<A> {
  readonly equals: (x: A, y: A) => boolean
}
```

Added in v1.0.0 (type class)

The `Setoid` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `S.equals(a, a) === true`
2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`

## setoidBoolean

```ts
Setoid<boolean>
```

Added in v1.0.0 (instance)

## setoidDate

```ts
Setoid<Date>
```

Added in v1.4.0 (instance)

## setoidNumber

```ts
Setoid<number>
```

Added in v1.0.0 (instance)

## setoidString

```ts
Setoid<string>
```

Added in v1.0.0 (instance)

## contramap

```ts
<A, B>(f: (b: B) => A, fa: Setoid<A>): Setoid<B>
```

Added in v1.2.0 (function)

Returns the `Setoid` corresponding to the partitions of `B` induced by `f`

## getArraySetoid

```ts
<A>(S: Setoid<A>): Setoid<Array<A>>
```

Added in v1.0.0 (function)

## getProductSetoid

```ts
<A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]>
```

Added in v1.0.0 (function)

## getRecordSetoid

```ts
<O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O>
```

Added in v1.0.0 (function)

## strictEqual

```ts
<A>(a: A, b: A): boolean
```

Added in v1.0.0 (function)
