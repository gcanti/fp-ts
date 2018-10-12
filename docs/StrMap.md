---
id: StrMap
title: Module StrMap
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts)

# StrMap

```ts
constructor(readonly value: { [key: string]: A }) {}
```

Added in v1.0.0 (data)

## filter

```ts
(p: Predicate<A>): StrMap<A>
```

Added in v1.4.0 (method)

## map

```ts
<B>(f: (a: A) => B): StrMap<B>
```

Added in v1.0.0 (method)

## mapWithKey

```ts
<B>(f: (k: string, a: A) => B): StrMap<B>
```

Added in v1.0.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## strmap

```ts
Functor1<URI> &
  Foldable2v1<URI> &
  Traversable1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI>
```

Added in v1.0.0 (instance)

## collect

```ts
<A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B>
```

Added in v1.0.0 (function)

## fromFoldable

```ts
fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
```

Added in v1.0.0 (function)

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

## getMonoid

```ts
<A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<StrMap<A>>
```

Added in v1.0.0 (function)

## insert

```ts
<A>(k: string, a: A, d: StrMap<A>): StrMap<A>
```

Added in v1.0.0 (function)

Insert or replace a key/value pair in a map

## isEmpty

```ts
<A>(d: StrMap<A>): boolean
```

Added in v1.0.0 (function)

Test whether a dictionary is empty

## isSubdictionary

```ts
<A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>): boolean
```

Added in v1.0.0 (function)

Test whether one dictionary contains all of the keys and values contained in another dictionary

## lookup

```ts
<A>(k: string, d: StrMap<A>): Option<A>
```

Added in v1.0.0 (function)

Lookup the value for a key in a dictionary

## pop

```ts
<A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]>
```

Added in v1.0.0 (function)

Delete a key and value from a map, returning the value as well as the subsequent map

## remove

```ts
<A>(k: string, d: StrMap<A>): StrMap<A>
```

Added in v1.0.0 (function)

Delete a key and value from a map

## singleton

```ts
<A>(k: string, a: A): StrMap<A>
```

Added in v1.0.0 (function)

Create a dictionary with one key/value pair

## size

```ts
<A>(d: StrMap<A>): number
```

Added in v1.0.0 (function)

Calculate the number of key/value pairs in a dictionary

## toArray

```ts
<A>(d: StrMap<A>): Array<[string, A]>
```

Added in v1.0.0 (function)

## toUnfoldable

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]>
```

Added in v1.0.0 (function)

Unfolds a dictionary into a list of key/value pairs

## traverseWithKey

```ts
traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>
```

Added in v1.0.0 (function)
