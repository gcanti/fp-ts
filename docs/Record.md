---
id: Record
title: Module Record
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## empty

```ts
const empty: Record<string, never>
```

Added in v1.10.0 (constant)

## collect

```ts
<A, B>(d: { [key: string]: A }, f: (k: string, a: A) => B): Array<B>
```

Added in v1.10.0 (function)

## compact

```ts
<A>(fa: { [key: string]: Option<A> }): { [key: string]: A }
```

Added in v1.10.0 (function)

## filterMap

```ts
<A, B>(fa: { [key: string]: A }, f: (a: A) => Option<B>): { [key: string]: B }
```

Added in v1.10.0 (function)

## foldMap

```ts
<M>(M: Monoid<M>) => <A>(fa: { [key: string]: A }, f: (a: A) => M): M
```

Added in v1.10.0 (function)

## foldr

```ts
<A, B>(fa: { [key: string]: A }, b: B, f: (a: A, b: B) => B): B
```

Added in v1.10.0 (function)

## fromFoldable

```ts
fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) =>
```

Added in v1.10.0 (function)

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

## getMonoid

```ts
getDictionaryMonoid
```

Added in v1.10.0 (function)

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<{ [key: string]: A }>
```

Added in v1.10.0 (function)

## insert

```ts
<A>(k: string, a: A, d: { [key: string]: A }): { [key: string]: A }
```

Added in v1.10.0 (function)

Insert or replace a key/value pair in a map

## isEmpty

```ts
<A>(d: { [key: string]: A }): boolean
```

Added in v1.10.0 (function)

Test whether a dictionary is empty

## isSubdictionary

```ts
<A>(S: Setoid<A>) => (d1: { [key: string]: A }, d2: { [key: string]: A }): boolean
```

Added in v1.10.0 (function)

Test whether one dictionary contains all of the keys and values contained in another dictionary

## map

```ts
<A, B>(fa: { [key: string]: A }, f: (a: A) => B): { [key: string]: B }
```

Added in v1.10.0 (function)

## mapWithKey

```ts
<A, B>(fa: { [key: string]: A }, f: (k: string, a: A) => B): { [key: string]: B }
```

Added in v1.10.0 (function)

## partition

```ts
<A>(
  fa: { [key: string]: A },
  p: Predicate<A>
): Separated<{ [key: string]: A }, { [key: string]: A }>
```

Added in v1.10.0 (function)

## partitionMap

```ts
<RL, RR, A>(
  fa: { [key: string]: A },
  f: (a: A) => Either<RL, RR>
): Separated<{ [key: string]: RL }, { [key: string]: RR }>
```

Added in v1.10.0 (function)

## pop

```ts
<A>(k: string, d: { [key: string]: A }): Option<[A, { [key: string]: A }]>
```

Added in v1.10.0 (function)

Delete a key and value from a map, returning the value as well as the subsequent map

## reduce

```ts
<A, B>(fa: { [key: string]: A }, b: B, f: (b: B, a: A) => B): B
```

Added in v1.10.0 (function)

## remove

```ts
<A>(k: string, d: { [key: string]: A }): { [key: string]: A }
```

Added in v1.10.0 (function)

Delete a key and value from a map

## separate

```ts
<RL, RR>(fa: {
  [key: string]: Either<RL, RR>
}): Separated<{ [key: string]: RL }, { [key: string]: RR }>
```

Added in v1.10.0 (function)

## sequence

```ts
sequence<F>(F: Applicative<F>): <A>(ta:
```

Added in v1.10.0 (function)

## singleton

```ts
<A>(k: string, a: A): { [key: string]: A }
```

Added in v1.10.0 (function)

Create a dictionary with one key/value pair

## size

```ts
<A>(d: { [key: string]: A }): number
```

Added in v1.10.0 (function)

Calculate the number of key/value pairs in a dictionary

## toArray

```ts
<A>(d: { [key: string]: A }): Array<[string, A]>
```

Added in v1.10.0 (function)

## toUnfoldable

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: { [key: string]: A }): HKT<F, [string, A]>
```

Added in v1.10.0 (function)

Unfolds a dictionary into a list of key/value pairs

## traverse

```ts
traverse<F>(
  F: Applicative<F>
): <A, B>(ta:
```

Added in v1.10.0 (function)

## traverseWithKey

```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta:
```

Added in v1.10.0 (function)

## wilt

```ts
wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa:
```

Added in v1.10.0 (function)

## wither

```ts
wither<F>(
  F: Applicative<F>
): (<A, B>(wa:
```

Added in v1.10.0 (function)
