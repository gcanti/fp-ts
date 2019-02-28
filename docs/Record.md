---
id: Record
title: Record
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## empty

**Signature** (constant)

```ts
export const empty: Record<string, never> = ...
```

Added in v1.10.0

## isSubdictionary

Use [isSubrecord](#issubrecord) instead

**Signature** (constant)

```ts
export const isSubdictionary: <A>(
  S: Setoid<A>
) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = ...
```

Added in v1.10.0

## collect

**Signature** (function)

```ts
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>  { ... }
```

Added in v1.10.0

## compact

**Signature** (function)

```ts
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => { ... }
```

Added in v1.10.0

## elem

**Signature** (function)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa:  { ... }
```

Added in v1.14.0

## every

**Signature** (function)

```ts
export function every<A>(fa:  { ... }
```

Added in v1.14.0

## filter

**Signature** (function)

```ts
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>  { ... }
```

Added in v1.10.0

## filterMap

**Signature** (function)

```ts
export const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => { ... }
```

Added in v1.10.0

## ~~filterMapWithIndex~~

Use [filterMapWithKey](#filtermapwithkey) instead

**Signature** (function)

```ts
export function filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B>  { ... }
```

Added in v1.12.0

## filterMapWithKey

**Signature** (function)

```ts
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>  { ... }
```

Added in v1.14.0

## ~~filterWithIndex~~

Use [filterWithKey](#filterwithkey) instead

**Signature** (function)

```ts
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>  { ... }
```

Added in v1.12.0

## filterWithKey

**Signature** (function)

```ts
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>  { ... }
```

Added in v1.14.0

## foldMap

**Signature** (function)

```ts
export const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => { ... }
```

Added in v1.10.0

## foldMapWithKey

**Signature** (function)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => { ... }
```

Added in v1.12.0

## foldr

**Signature** (function)

```ts
export const foldr = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => { ... }
```

Added in v1.10.0

## foldrWithKey

**Signature** (function)

```ts
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function)

```ts
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A>  { ... }
```

Added in v1.10.0

## getMonoid

Returns a [Semigroup](./Semigroup.md) instance for records given a [Semigroup](./Semigroup.md) instance for their values

**Signature** (function)

```ts
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>>  { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/Record'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v1.10.0

## getSetoid

**Signature** (function)

```ts
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>>  { ... }
```

Added in v1.10.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function)

```ts
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## isEmpty

Test whether a record is empty

**Signature** (function)

```ts
export const isEmpty = <A>(d: Record<string, A>): boolean => { ... }
```

Added in v1.10.0

## isSubrecord

Test whether one record contains all of the keys and values contained in another record

**Signature** (function)

```ts
export const isSubrecord = <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a dictionary

**Signature** (function)

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => { ... }
```

Added in v1.10.0

## map

**Signature** (function)

```ts
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## mapWithKey

**Signature** (function)

```ts
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## partition

**Signature** (function)

```ts
export const partition = <A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => { ... }
```

Added in v1.10.0

## partitionMap

**Signature** (function)

```ts
export const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## ~~partitionMapWithIndex~~

Use [partitionMapWithKey](#partitionmapwithkey) instead

**Signature** (function)

```ts
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>  { ... }
```

Added in v1.12.0

## partitionMapWithKey

**Signature** (function)

```ts
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>  { ... }
```

Added in v1.14.0

## ~~partitionWithIndex~~

Use [partitionWithKey](#partitionwithkey) instead

**Signature** (function)

```ts
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>  { ... }
```

Added in v1.12.0

## partitionWithKey

**Signature** (function)

```ts
export function partitionWithKey<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>  { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function)

```ts
export const pop = <A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> => { ... }
```

Added in v1.10.0

## reduce

**Signature** (function)

```ts
export const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => { ... }
```

Added in v1.10.0

## reduceWithKey

**Signature** (function)

```ts
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## remove

Delete a key and value from a map

**Signature** (function)

```ts
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## separate

**Signature** (function)

```ts
export const separate = <RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## sequence

**Signature** (function)

```ts
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>  { ... }
```

Added in v1.10.0

## singleton

Create a dictionary with one key/value pair

**Signature** (function)

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => { ... }
```

Added in v1.10.0

## size

Calculate the number of key/value pairs in a record

**Signature** (function)

```ts
export const size = <A>(d: Record<string, A>): number => { ... }
```

Added in v1.10.0

## some

**Signature** (function)

```ts
export function some<A>(fa:  { ... }
```

Added in v1.14.0

## toArray

**Signature** (function)

```ts
export function toArray<A>(d: Record<string, A>): Array<[string, A]>  { ... }
```

Added in v1.10.0

## toUnfoldable

Unfolds a record into a list of key/value pairs

**Signature** (function)

```ts
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]>  { ... }
```

Added in v1.10.0

## traverse

**Signature** (function)

```ts
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## traverseWithKey

**Signature** (function)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## wilt

**Signature** (function)

```ts
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>>)  { ... }
```

Added in v1.10.0

## wither

**Signature** (function)

```ts
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)  { ... }
```

Added in v1.10.0
