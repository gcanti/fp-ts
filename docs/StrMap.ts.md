---
title: StrMap.ts
nav_order: 81
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [StrMap](#strmap)
  - [mapWithKey](#mapwithkey)
  - [map](#map)
  - [reduce](#reduce)
  - [foldr](#foldr)
  - [reduceWithKey](#reducewithkey)
  - [foldrWithKey](#foldrwithkey)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
  - [~~partitionMapWithIndex~~](#partitionmapwithindex)
  - [partitionMapWithKey](#partitionmapwithkey)
  - [~~partitionWithIndex~~](#partitionwithindex)
  - [partitionWithKey](#partitionwithkey)
  - [~~filterMapWithIndex~~](#filtermapwithindex)
  - [filterMapWithKey](#filtermapwithkey)
  - [~~filterWithIndex~~](#filterwithindex)
  - [filterWithKey](#filterwithkey)
  - [every](#every)
  - [some](#some)
- [URI](#uri-1)
- [strmap](#strmap)
- [collect](#collect)
- [elem](#elem)
- [fromFoldable](#fromfoldable)
- [getMonoid](#getmonoid)
- [getSetoid](#getsetoid)
- [insert](#insert)
- [isEmpty](#isempty)
- [isSubdictionary](#issubdictionary)
- [lookup](#lookup)
- [pop](#pop)
- [remove](#remove)
- [singleton](#singleton)
- [size](#size)
- [toArray](#toarray)
- [toUnfoldable](#tounfoldable)
- [~~traverseWithKey~~](#traversewithkey)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# StrMap

**Signature** (class)

```ts
export class StrMap<A> {
  constructor(readonly value: { ... }
  ...
}
```

Added in v1.0.0

## mapWithKey

**Signature** (method)

```ts
mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): StrMap<B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## foldr

**Signature** (method)

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## reduceWithKey

**Signature** (method)

```ts
reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B { ... }
```

Added in v1.12.0

## foldrWithKey

**Signature** (method)

```ts
foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## filter

**Signature** (method)

```ts
filter<B extends A>(p: Refinement<A, B>): StrMap<B>
filter(p: Predicate<A>): StrMap<A>
filter(p: Predicate<A>): StrMap<A> { ... }
```

Added in v1.4.0

## filterMap

**Signature** (method)

```ts
filterMap<B>(f: (a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.12.0

## partition

**Signature** (method)

```ts
partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.12.0

## partitionMap

**Signature** (method)

```ts
partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## separate

**Signature** (method)

```ts
separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## ~~partitionMapWithIndex~~

Use `partitionMapWithKey` instead

**Signature** (method)

```ts
partitionMapWithIndex<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## partitionMapWithKey

**Signature** (method)

```ts
partitionMapWithKey<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.14.0

## ~~partitionWithIndex~~

Use `partitionWithKey` instead

**Signature** (method)

```ts
partitionWithIndex(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.12.0

## partitionWithKey

**Signature** (method)

```ts
partitionWithKey(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.14.0

## ~~filterMapWithIndex~~

Use `filterMapWithKey` instead

**Signature** (method)

```ts
filterMapWithIndex<B>(f: (i: string, a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.12.0

## filterMapWithKey

**Signature** (method)

```ts
filterMapWithKey<B>(f: (i: string, a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.14.0

## ~~filterWithIndex~~

Use `filterWithKey` instead

**Signature** (method)

```ts
filterWithIndex(p: (i: string, a: A) => boolean): StrMap<A> { ... }
```

Added in v1.12.0

## filterWithKey

**Signature** (method)

```ts
filterWithKey(p: (i: string, a: A) => boolean): StrMap<A> { ... }
```

Added in v1.14.0

## every

**Signature** (method)

```ts
every(predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

## some

**Signature** (method)

```ts
some(predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# strmap

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

# collect

**Signature** (function)

```ts
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => ...
```

Added in v1.0.0

# elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: StrMap<A>) => boolean { ... }
```

Added in v1.14.0

# fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A>(ta: Type3<F, U, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <L, A>(ta: Type2<F, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <A>(ta: Type<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F>(F: Foldable<F>): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A> { ... }
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => ...
```

Added in v1.0.0

# insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => ...
```

Added in v1.0.0

# isEmpty

Test whether a dictionary is empty

**Signature** (function)

```ts
export const isEmpty = <A>(d: StrMap<A>): boolean => ...
```

Added in v1.0.0

# isSubdictionary

Test whether one dictionary contains all of the keys and values contained in another dictionary

**Signature** (function)

```ts
export const isSubdictionary = <A>(S: Setoid<A>): ((d1: StrMap<A>, d2: StrMap<A>) => boolean) => ...
```

Added in v1.0.0

# lookup

Lookup the value for a key in a dictionary

**Signature** (function)

```ts
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => ...
```

Added in v1.0.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => ...
```

Added in v1.0.0

# remove

Delete a key and value from a map

**Signature** (function)

```ts
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => ...
```

Added in v1.0.0

# singleton

Create a dictionary with one key/value pair

**Signature** (function)

```ts
export const singleton = <A>(k: string, a: A): StrMap<A> => ...
```

Added in v1.0.0

# size

Calculate the number of key/value pairs in a dictionary

**Signature** (function)

```ts
export const size = <A>(d: StrMap<A>): number => ...
```

Added in v1.0.0

# toArray

**Signature** (function)

```ts
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => ...
```

Added in v1.0.0

# toUnfoldable

Unfolds a dictionary into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<F extends URIS>(U: Unfoldable1<F>): (<A>(d: StrMap<A>) => Type<F, [string, A]>)
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>)
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>) { ... }
```

Added in v1.0.0

# ~~traverseWithKey~~

Use `strmap.traverseWithIndex` instead

**Signature** (function)

```ts
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, StrMap<B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, StrMap<B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type<F, B>) => Type<F, StrMap<B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> { ... }
```

Added in v1.0.0
