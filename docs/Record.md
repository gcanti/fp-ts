---
id: Record
title: Module Record
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## empty

```ts
const empty: Record<string, never>
```

Added in v1.10.0 (constant)

## collect

```ts
collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>
```

Added in v1.10.0 (function)

## compact

```ts
<A>(fa: Record<string, Option<A>>): Record<string, A>
```

Added in v1.10.0 (function)

## filterMap

```ts
<A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B>
```

Added in v1.10.0 (function)

## filterMapWithIndex

```ts
filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B>
```

Added in v1.12.0 (function)

## filterWithIndex

```ts
filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
```

Added in v1.12.0 (function)

## foldMap

```ts
<M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M)
```

Added in v1.10.0 (function)

## foldMapWithKey

```ts
<M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M
```

Added in v1.12.0 (function)

## foldr

```ts
<A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B
```

Added in v1.10.0 (function)

## foldrWithKey

```ts
foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B
```

Added in v1.12.0 (function)

## fromFoldable

```ts
fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A>
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
<A>(S: Setoid<A>): Setoid<Record<string, A>>
```

Added in v1.10.0 (function)

## insert

```ts
insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>
```

Added in v1.10.0 (function)

Insert or replace a key/value pair in a map

## isEmpty

```ts
<A>(d: Record<string, A>): boolean
```

Added in v1.10.0 (function)

Test whether a dictionary is empty

## isSubdictionary

```ts
<A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean
```

Added in v1.10.0 (function)

Test whether one dictionary contains all of the keys and values contained in another dictionary

## map

```ts
map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>
```

Added in v1.10.0 (function)

## mapWithKey

```ts
mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>
```

Added in v1.10.0 (function)

## partition

```ts
<A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>>
```

Added in v1.10.0 (function)

## partitionMap

```ts
<RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
```

Added in v1.10.0 (function)

## partitionMapWithIndex

```ts
partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
```

Added in v1.12.0 (function)

## partitionWithIndex

```ts
partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
```

Added in v1.12.0 (function)

## pop

```ts
<A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]>
```

Added in v1.10.0 (function)

Delete a key and value from a map, returning the value as well as the subsequent map

## reduce

```ts
<A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B
```

Added in v1.10.0 (function)

## reduceWithKey

```ts
reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B
```

Added in v1.12.0 (function)

## remove

```ts
remove<A>(k: string, d: Record<string, A>): Record<string, A>
```

Added in v1.10.0 (function)

Delete a key and value from a map

## separate

```ts
<RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>>
```

Added in v1.10.0 (function)

## sequence

```ts
sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>
```

Added in v1.10.0 (function)

## singleton

```ts
<K extends string, A>(k: K, a: A): Record<K, A>
```

Added in v1.10.0 (function)

Create a dictionary with one key/value pair

## size

```ts
<A>(d: Record<string, A>): number
```

Added in v1.10.0 (function)

Calculate the number of key/value pairs in a dictionary

## toArray

```ts
toArray<A>(d: Record<string, A>): Array<[string, A]>
```

Added in v1.10.0 (function)

## toUnfoldable

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: Record<string, A>): HKT<F, [string, A]>
```

Added in v1.10.0 (function)

Unfolds a dictionary into a list of key/value pairs

## traverse

```ts
traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
```

Added in v1.10.0 (function)

## traverseWithKey

```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
```

Added in v1.10.0 (function)

## wilt

```ts
wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>)
```

Added in v1.10.0 (function)

## wither

```ts
wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)
```

Added in v1.10.0 (function)
