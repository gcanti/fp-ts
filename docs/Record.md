---
id: Record
title: Module Record
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L188-L188)

```ts
export const empty: Record<string, never> = ...
```

Added in v1.10.0

## isSubdictionary

Use [isSubrecord](#issubrecord) instead

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L135-L137)

```ts
export const isSubdictionary: <A>(
  S: Setoid<A>
) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = ...
```

Added in v1.10.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L36-L43)

```ts
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>  { ... }
```

Added in v1.10.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L382-L392)

```ts
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => { ... }
```

Added in v1.10.0

## elem

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L684-L686)

```ts
export function elem<A>(S: Setoid<A>): (a: A, fa:  { ... }
```

Added in v1.14.0

## every

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L660-L667)

```ts
export function every<A>(fa:  { ... }
```

Added in v1.14.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L181-L183)

```ts
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>  { ... }
```

Added in v1.10.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L517-L519)

```ts
export const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => { ... }
```

Added in v1.10.0

## ~~filterMapWithIndex~~ (deprecated)

Use [filterMapWithKey](#filtermapwithkey) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L738-L743)

```ts
export function filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B>  { ... }
```

Added in v1.12.0

## filterMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L593-L603)

```ts
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>  { ... }
```

Added in v1.14.0

## ~~filterWithIndex~~ (deprecated)

Use [filterWithKey](#filterwithkey) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L752-L754)

```ts
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>  { ... }
```

Added in v1.12.0

## filterWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L610-L624)

```ts
export function filterWithKey<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>  { ... }
```

Added in v1.14.0

## foldMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L223-L226)

```ts
export const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => { ... }
```

Added in v1.10.0

## foldMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L254-L263)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => { ... }
```

Added in v1.12.0

## foldr

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L231-L233)

```ts
export const foldr = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => { ... }
```

Added in v1.10.0

## foldrWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L270-L279)

```ts
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L645-L655)

```ts
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A>  { ... }
```

Added in v1.10.0

## getMonoid

Returns a [Semigroup](./Semigroup.md) instance for records given a [Semigroup](./Semigroup.md) instance for their values

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L163-L166)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L144-L147)

```ts
export function getSetoid<A>(S: Setoid<A>): Setoid<Record<string, A>>  { ... }
```

Added in v1.10.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L78-L85)

```ts
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## isEmpty

Test whether a record is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L27-L29)

```ts
export const isEmpty = <A>(d: Record<string, A>): boolean => { ... }
```

Added in v1.10.0

## isSubrecord

Test whether one record contains all of the keys and values contained in another record

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L121-L128)

```ts
export const isSubrecord = <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => { ... }
```

Added in v1.14.0

## lookup

Lookup the value for a key in a dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L172-L174)

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => { ... }
```

Added in v1.10.0

## map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L209-L211)

```ts
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## mapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L195-L202)

```ts
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L407-L412)

```ts
export const partition = <A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => { ... }
```

Added in v1.10.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L397-L402)

```ts
export const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## ~~partitionMapWithIndex~~ (deprecated)

Use [partitionMapWithKey](#partitionmapwithkey) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L701-L706)

```ts
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>  { ... }
```

Added in v1.12.0

## partitionMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L532-L551)

```ts
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>  { ... }
```

Added in v1.14.0

## ~~partitionWithIndex~~ (deprecated)

Use [partitionWithKey](#partitionwithkey) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L721-L726)

```ts
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>  { ... }
```

Added in v1.12.0

## partitionWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L564-L583)

```ts
export function partitionWithKey<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>  { ... }
```

Added in v1.14.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L111-L114)

```ts
export const pop = <A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> => { ... }
```

Added in v1.10.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L216-L218)

```ts
export const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => { ... }
```

Added in v1.10.0

## reduceWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L240-L249)

```ts
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L97-L104)

```ts
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L417-L435)

```ts
export const separate = <RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## sequence

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L374-L377)

```ts
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>  { ... }
```

Added in v1.10.0

## singleton

Create a dictionary with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L286-L288)

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => { ... }
```

Added in v1.10.0

## size

Calculate the number of key/value pairs in a record

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L18-L20)

```ts
export const size = <A>(d: Record<string, A>): number => { ... }
```

Added in v1.10.0

## some

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L672-L679)

```ts
export function some<A>(fa:  { ... }
```

Added in v1.14.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L50-L52)

```ts
export function toArray<A>(d: Record<string, A>): Array<[string, A]>  { ... }
```

Added in v1.10.0

## toUnfoldable

Unfolds a record into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L63-L69)

```ts
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <A>(d: Record<string, A>) => HKT<F, [string, A]>  { ... }
```

Added in v1.10.0

## traverse

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L348-L353)

```ts
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## traverseWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L305-L325)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## wilt

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L504-L512)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L458-L463)

```ts
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)  { ... }
```

Added in v1.10.0
