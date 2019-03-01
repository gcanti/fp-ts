---
title: Record.ts
nav_order: 71
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [empty](#empty)
- [~~isSubdictionary~~](#issubdictionary)
- [collect](#collect)
- [compact](#compact)
- [elem](#elem)
- [every](#every)
- [filter](#filter)
- [filterMap](#filtermap)
- [~~filterMapWithIndex~~](#filtermapwithindex)
- [filterMapWithKey](#filtermapwithkey)
- [~~filterWithIndex~~](#filterwithindex)
- [filterWithKey](#filterwithkey)
- [foldMap](#foldmap)
- [foldMapWithKey](#foldmapwithkey)
- [foldr](#foldr)
- [foldrWithKey](#foldrwithkey)
- [fromFoldable](#fromfoldable)
- [getMonoid](#getmonoid)
- [getSetoid](#getsetoid)
- [insert](#insert)
- [isEmpty](#isempty)
- [isSubrecord](#issubrecord)
- [lookup](#lookup)
- [map](#map)
- [mapWithKey](#mapwithkey)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [~~partitionMapWithIndex~~](#partitionmapwithindex)
- [partitionMapWithKey](#partitionmapwithkey)
- [~~partitionWithIndex~~](#partitionwithindex)
- [partitionWithKey](#partitionwithkey)
- [pop](#pop)
- [reduce](#reduce)
- [reduceWithKey](#reducewithkey)
- [remove](#remove)
- [separate](#separate)
- [sequence](#sequence)
- [singleton](#singleton)
- [size](#size)
- [some](#some)
- [toArray](#toarray)
- [toUnfoldable](#tounfoldable)
- [traverse](#traverse)
- [traverseWithKey](#traversewithkey)
- [wilt](#wilt)
- [wither](#wither)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# empty

**Signature** (constant)

```ts
export const empty: Record<string, never> = ...
```

Added in v1.10.0

# ~~isSubdictionary~~

Use `isSubrecord` instead

**Signature** (constant)

```ts
export const isSubdictionary: <A>(
  S: Setoid<A>
) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = ...
```

Added in v1.10.0

# collect

**Signature** (function)

```ts
export function collect<K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B>
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B> { ... }
```

Added in v1.10.0

# compact

**Signature** (function)

```ts
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => ...
```

Added in v1.10.0

# elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa: { ... }
```

Added in v1.14.0

# every

**Signature** (function)

```ts
export function every<A>(fa: { ... }
```

Added in v1.14.0

# filter

**Signature** (function)

```ts
export function filter<A, B extends A>(fa: Record<string, A>, p: Refinement<A, B>): Record<string, B>
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A> { ... }
```

Added in v1.10.0

# filterMap

**Signature** (function)

```ts
export const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => ...
```

Added in v1.10.0

# ~~filterMapWithIndex~~

Use `filterMapWithKey` instead

**Signature** (function)

```ts
export function filterMapWithIndex<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B> { ... }
```

Added in v1.12.0

# filterMapWithKey

**Signature** (function)

```ts
export function filterMapWithKey<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> { ... }
```

Added in v1.14.0

# ~~filterWithIndex~~

Use `filterWithKey` instead

**Signature** (function)

```ts
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> { ... }
```

Added in v1.12.0

# filterWithKey

**Signature** (function)

```ts
export function filterWithKey<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> { ... }
```

Added in v1.14.0

# foldMap

**Signature** (function)

```ts
export const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => ...
```

Added in v1.10.0

# foldMapWithKey

**Signature** (function)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => ...
```

Added in v1.12.0

# foldr

**Signature** (function)

```ts
export const foldr = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => ...
```

Added in v1.10.0

# foldrWithKey

**Signature** (function)

```ts
export function foldrWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B { ... }
```

Added in v1.12.0

# fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K extends string, U, L, A>(ta: Type3<F, U, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K extends string, L, A>(ta: Type2<F, L, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K extends string, A>(ta: Type<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <K extends string, A>(ta: HKT<F, [K, A]>, f: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A> { ... }
```

Added in v1.10.0

# getMonoid

Returns a `Semigroup` instance for records given a `Semigroup` instance for their values

**Signature** (function)

```ts
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>> { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/Record'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v1.10.0

# getSetoid

**Signature** (function)

```ts
export function getSetoid<K extends string, A>(S: Setoid<A>): Setoid<Record<K, A>>
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>>
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>> { ... }
```

Added in v1.10.0

# insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A> { ... }
```

Added in v1.10.0

# isEmpty

Test whether a record is empty

**Signature** (function)

```ts
export const isEmpty = <A>(d: Record<string, A>): boolean => ...
```

Added in v1.10.0

# isSubrecord

Test whether one record contains all of the keys and values contained in another record

**Signature** (function)

```ts
export const isSubrecord = <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => ...
```

Added in v1.14.0

# lookup

Lookup the value for a key in a dictionary

**Signature** (function)

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => ...
```

Added in v1.10.0

# map

**Signature** (function)

```ts
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B> { ... }
```

Added in v1.10.0

# mapWithKey

**Signature** (function)

```ts
export function mapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B> { ... }
```

Added in v1.10.0

# partition

**Signature** (function)

```ts
export const partition = <A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => ...
```

Added in v1.10.0

# partitionMap

**Signature** (function)

```ts
export const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => ...
```

Added in v1.10.0

# ~~partitionMapWithIndex~~

Use `partitionMapWithKey` instead

**Signature** (function)

```ts
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.12.0

# partitionMapWithKey

**Signature** (function)

```ts
export function partitionMapWithKey<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.14.0

# ~~partitionWithIndex~~

Use `partitionWithKey` instead

**Signature** (function)

```ts
export function partitionWithIndex<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v1.12.0

# partitionWithKey

**Signature** (function)

```ts
export function partitionWithKey<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v1.14.0

# pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> => ...
```

Added in v1.10.0

# reduce

**Signature** (function)

```ts
export const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => ...
```

Added in v1.10.0

# reduceWithKey

**Signature** (function)

```ts
export function reduceWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B { ... }
```

Added in v1.12.0

# remove

Delete a key and value from a map

**Signature** (function)

```ts
export function remove<KS extends string, K extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A> { ... }
```

Added in v1.10.0

# separate

**Signature** (function)

```ts
export const separate = <RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> => ...
```

Added in v1.10.0

# sequence

**Signature** (function)

```ts
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(ta: Record<string, Type3<F, U, L, A>>) => Type3<F, U, L, Record<string, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A>(ta: Record<string, Type2<F, L, A>>) => Type2<F, L, Record<string, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <A>(ta: Record<string, Type<F, A>>) => Type<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> { ... }
```

Added in v1.10.0

# singleton

Create a dictionary with one key/value pair

**Signature** (function)

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => ...
```

Added in v1.10.0

# size

Calculate the number of key/value pairs in a record

**Signature** (function)

```ts
export const size = <A>(d: Record<string, A>): number => ...
```

Added in v1.10.0

# some

**Signature** (function)

```ts
export function some<A>(fa: { ... }
```

Added in v1.14.0

# toArray

**Signature** (function)

```ts
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]> { ... }
```

Added in v1.10.0

# toUnfoldable

Unfolds a record into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]> { ... }
```

Added in v1.10.0

# traverse

**Signature** (function)

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => Type<F, B>) => Type<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>> { ... }
```

Added in v1.10.0

# traverseWithKey

**Signature** (function)

```ts
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<string, B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, Record<string, B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => Type<F, B>) => Type<F, Record<string, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>> { ... }
```

Added in v1.10.0

# wilt

**Signature** (function)

```ts
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): (<L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F extends URIS>(
  F: Applicative1<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>) { ... }
```

Added in v1.10.0

# wither

**Signature** (function)

```ts
export function wither<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>)
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, Record<string, B>>)
export function wither<F extends URIS2>(
  F: Applicative2<F>
): (<L, A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>)
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, Record<string, B>>)
export function wither<F extends URIS>(
  F: Applicative1<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Record<string, B>>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>) { ... }
```

Added in v1.10.0
