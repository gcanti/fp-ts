---
id: StrMap
title: StrMap
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts)

# StrMap

**Signature** (data type)

```ts
export class StrMap<A> {
  constructor(readonly value: { [key: string]: A }) {}
  ...
}
```

## every

**Signature** (method)

```ts
every(predicate: (a: A) => boolean): boolean  { ... }
```

Added in v1.14.0

## filter

**Signature** (method)

```ts
filter(p: Predicate<A>): StrMap<A>  { ... }
```

Added in v1.4.0

## filterMap

**Signature** (method)

```ts
filterMap<B>(f: (a: A) => Option<B>): StrMap<B>  { ... }
```

Added in v1.12.0

## ~~filterMapWithIndex~~

Use [filterMapWithKey](#filtermapwithkey) instead

**Signature** (method)

```ts
filterMapWithIndex<B>(f: (i: string, a: A) => Option<B>): StrMap<B>  { ... }
```

Added in v1.12.0

## filterMapWithKey

**Signature** (method)

```ts
filterMapWithKey<B>(f: (i: string, a: A) => Option<B>): StrMap<B>  { ... }
```

Added in v1.14.0

## ~~filterWithIndex~~

Use [filterWithKey](#filterwithkey) instead

**Signature** (method)

```ts
filterWithIndex(p: (i: string, a: A) => boolean): StrMap<A>  { ... }
```

Added in v1.12.0

## filterWithKey

**Signature** (method)

```ts
filterWithKey(p: (i: string, a: A) => boolean): StrMap<A>  { ... }
```

Added in v1.14.0

## foldr

**Signature** (method)

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## foldrWithKey

**Signature** (method)

```ts
foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): StrMap<B>  { ... }
```

Added in v1.0.0

## mapWithKey

**Signature** (method)

```ts
mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B>  { ... }
```

Added in v1.0.0

## partition

**Signature** (method)

```ts
partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>>  { ... }
```

Added in v1.12.0

## partitionMap

**Signature** (method)

```ts
partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## ~~partitionMapWithIndex~~

Use [partitionMapWithKey](#partitionmapwithkey) instead

**Signature** (method)

```ts
partitionMapWithIndex<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## partitionMapWithKey

**Signature** (method)

```ts
partitionMapWithKey<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.14.0

## ~~partitionWithIndex~~

Use [partitionWithKey](#partitionwithkey) instead

**Signature** (method)

```ts
partitionWithIndex(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>>  { ... }
```

Added in v1.12.0

## partitionWithKey

**Signature** (method)

```ts
partitionWithKey(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>>  { ... }
```

Added in v1.14.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## reduceWithKey

**Signature** (method)

```ts
reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## separate

**Signature** (method)

```ts
separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## some

**Signature** (method)

```ts
some(predicate: (a: A) => boolean): boolean  { ... }
```

Added in v1.14.0

Added in v1.0.0

## strmap

**Signature** (constant)

```ts
export const strmap: FunctorWithIndex1<URI, string> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = ...
```

Added in v1.0.0

## collect

**Signature** (function)

```ts
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => { ... }
```

Added in v1.0.0

## elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: StrMap<A>) => boolean  { ... }
```

Added in v1.14.0

## fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>  { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => { ... }
```

Added in v1.0.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => { ... }
```

Added in v1.0.0

## isEmpty

Test whether a dictionary is empty

**Signature** (function)

```ts
export const isEmpty = <A>(d: StrMap<A>): boolean => { ... }
```

Added in v1.0.0

## isSubdictionary

Test whether one dictionary contains all of the keys and values contained in another dictionary

**Signature** (function)

```ts
export const isSubdictionary = <A>(S: Setoid<A>): ((d1: StrMap<A>, d2: StrMap<A>) => boolean) => { ... }
```

Added in v1.0.0

## lookup

Lookup the value for a key in a dictionary

**Signature** (function)

```ts
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => { ... }
```

Added in v1.0.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => { ... }
```

Added in v1.0.0

## remove

Delete a key and value from a map

**Signature** (function)

```ts
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => { ... }
```

Added in v1.0.0

## singleton

Create a dictionary with one key/value pair

**Signature** (function)

```ts
export const singleton = <A>(k: string, a: A): StrMap<A> => { ... }
```

Added in v1.0.0

## size

Calculate the number of key/value pairs in a dictionary

**Signature** (function)

```ts
export const size = <A>(d: StrMap<A>): number => { ... }
```

Added in v1.0.0

## toArray

**Signature** (function)

```ts
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => { ... }
```

Added in v1.0.0

## toUnfoldable

Unfolds a dictionary into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>)  { ... }
```

Added in v1.0.0

## ~~traverseWithKey~~

Use [strmap.traverseWithIndex](#strmap.traversewithindex)

**Signature** (function)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>  { ... }
```

Added in v1.0.0
