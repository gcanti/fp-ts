---
title: StrMap.ts
nav_order: 85
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-maps

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [StrMap (class)](#strmap-class)
  - [mapWithKey (method)](#mapwithkey-method)
  - [map (method)](#map-method)
  - [reduce (method)](#reduce-method)
  - [foldr (method)](#foldr-method)
  - [reduceWithKey (method)](#reducewithkey-method)
  - [foldrWithKey (method)](#foldrwithkey-method)
  - [filter (method)](#filter-method)
  - [filterMap (method)](#filtermap-method)
  - [partition (method)](#partition-method)
  - [partitionMap (method)](#partitionmap-method)
  - [separate (method)](#separate-method)
  - [~~partitionMapWithIndex~~ (method)](#partitionmapwithindex-method)
  - [partitionMapWithKey (method)](#partitionmapwithkey-method)
  - [~~partitionWithIndex~~ (method)](#partitionwithindex-method)
  - [partitionWithKey (method)](#partitionwithkey-method)
  - [~~filterMapWithIndex~~ (method)](#filtermapwithindex-method)
  - [filterMapWithKey (method)](#filtermapwithkey-method)
  - [~~filterWithIndex~~ (method)](#filterwithindex-method)
  - [filterWithKey (method)](#filterwithkey-method)
  - [every (method)](#every-method)
  - [some (method)](#some-method)
- [URI (constant)](#uri-constant)
- [strmap (constant)](#strmap-constant)
- [collect (function)](#collect-function)
- [elem (function)](#elem-function)
- [fromFoldable (function)](#fromfoldable-function)
- [getMonoid (function)](#getmonoid-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [insert (function)](#insert-function)
- [isEmpty (function)](#isempty-function)
- [isSubdictionary (function)](#issubdictionary-function)
- [lookup (function)](#lookup-function)
- [pop (function)](#pop-function)
- [remove (function)](#remove-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [toArray (function)](#toarray-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [~~traverseWithKey~~ (function)](#traversewithkey-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# StrMap (class)

**Signature**

```ts
export class StrMap<A> {
  constructor(readonly value: { [key: string]: A }) { ... }
  ...
}
```

Added in v1.0.0

## mapWithKey (method)

**Signature**

```ts
mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): StrMap<B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## foldr (method)

**Signature**

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## reduceWithKey (method)

**Signature**

```ts
reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B { ... }
```

Added in v1.12.0

## foldrWithKey (method)

**Signature**

```ts
foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B { ... }
```

Added in v1.12.0

## filter (method)

**Signature**

```ts
filter<B extends A>(p: Refinement<A, B>): StrMap<B>
filter(p: Predicate<A>): StrMap<A> { ... }
```

Added in v1.4.0

## filterMap (method)

**Signature**

```ts
filterMap<B>(f: (a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.12.0

## partition (method)

**Signature**

```ts
partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.12.0

## partitionMap (method)

**Signature**

```ts
partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## separate (method)

**Signature**

```ts
separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## ~~partitionMapWithIndex~~ (method)

Use `partitionMapWithKey` instead

**Signature**

```ts
partitionMapWithIndex<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.12.0

## partitionMapWithKey (method)

**Signature**

```ts
partitionMapWithKey<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> { ... }
```

Added in v1.14.0

## ~~partitionWithIndex~~ (method)

Use `partitionWithKey` instead

**Signature**

```ts
partitionWithIndex(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.12.0

## partitionWithKey (method)

**Signature**

```ts
partitionWithKey(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> { ... }
```

Added in v1.14.0

## ~~filterMapWithIndex~~ (method)

Use `filterMapWithKey` instead

**Signature**

```ts
filterMapWithIndex<B>(f: (i: string, a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.12.0

## filterMapWithKey (method)

**Signature**

```ts
filterMapWithKey<B>(f: (i: string, a: A) => Option<B>): StrMap<B> { ... }
```

Added in v1.14.0

## ~~filterWithIndex~~ (method)

Use `filterWithKey` instead

**Signature**

```ts
filterWithIndex(p: (i: string, a: A) => boolean): StrMap<A> { ... }
```

Added in v1.12.0

## filterWithKey (method)

**Signature**

```ts
filterWithKey(p: (i: string, a: A) => boolean): StrMap<A> { ... }
```

Added in v1.14.0

## every (method)

**Signature**

```ts
every(predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

## some (method)

**Signature**

```ts
some(predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# strmap (constant)

**Signature**

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

# collect (function)

**Signature**

```ts
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => ...
```

Added in v1.0.0

# elem (function)

**Signature**

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: StrMap<A>) => boolean { ... }
```

Added in v1.14.0

# fromFoldable (function)

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A>(ta: Type3<F, U, L, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <L, A>(ta: Type2<F, L, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <A>(ta: Type<F, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, onConflict: (existing: A, a: A) => A) => StrMap<A> { ... }
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => ...
```

Added in v1.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(S: Show<A>): Show<StrMap<A>> => ...
```

Added in v1.17.0

# insert (function)

Insert or replace a key/value pair in a map

**Signature**

```ts
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => ...
```

Added in v1.0.0

# isEmpty (function)

Test whether a dictionary is empty

**Signature**

```ts
export const isEmpty = <A>(d: StrMap<A>): boolean => ...
```

Added in v1.0.0

# isSubdictionary (function)

Test whether one dictionary contains all of the keys and values contained in another dictionary

**Signature**

```ts
export const isSubdictionary = <A>(S: Setoid<A>): ((d1: StrMap<A>, d2: StrMap<A>) => boolean) => ...
```

Added in v1.0.0

# lookup (function)

Lookup the value for a key in a dictionary

**Signature**

```ts
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => ...
```

Added in v1.0.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => ...
```

Added in v1.0.0

# remove (function)

Delete a key and value from a map

**Signature**

```ts
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => ...
```

Added in v1.0.0

# singleton (function)

Create a dictionary with one key/value pair

**Signature**

```ts
export const singleton = <A>(k: string, a: A): StrMap<A> => ...
```

Added in v1.0.0

# size (function)

Calculate the number of key/value pairs in a dictionary

**Signature**

```ts
export const size = <A>(d: StrMap<A>): number => ...
```

Added in v1.0.0

# toArray (function)

**Signature**

```ts
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => ...
```

Added in v1.0.0

# toUnfoldable (function)

Unfolds a dictionary into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(U: Unfoldable1<F>): <A>(d: StrMap<A>) => Type<F, [string, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <A>(d: StrMap<A>) => HKT<F, [string, A]> { ... }
```

Added in v1.0.0

# ~~traverseWithKey~~ (function)

Use `strmap.traverseWithIndex` instead

**Signature**

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
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> { ... }
```

Added in v1.0.0
