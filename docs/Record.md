---
id: Record
title: Module Record
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts)

## empty

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L155-L155)

```ts
export const empty: Record<string, never> = ...
```

Added in v1.10.0

## collect

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L36-L43)

```ts
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B>  { ... }
```

Added in v1.10.0

## compact

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L340-L350)

```ts
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => { ... }
```

Added in v1.10.0

## filter

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L148-L150)

```ts
export function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>  { ... }
```

Added in v1.10.0

## filterMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L475-L477)

```ts
export const filterMap = <A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> => { ... }
```

Added in v1.10.0

## filterMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L551-L564)

```ts
export function filterMapWithIndex<A, B>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Option<B>
): Record<string, B>  { ... }
```

Added in v1.12.0

## filterWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L571-L581)

```ts
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>  { ... }
```

Added in v1.12.0

## foldMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L190-L193)

```ts
export const foldMap = <M>(M: Monoid<M>): (<A>(fa: Record<string, A>, f: (a: A) => M) => M) => { ... }
```

Added in v1.10.0

## foldMapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L221-L230)

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => { ... }
```

Added in v1.12.0

## foldr

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L198-L200)

```ts
export const foldr = <A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B => { ... }
```

Added in v1.10.0

## foldrWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L237-L246)

```ts
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L601-L610)

```ts
export function fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => Record<string, A>  { ... }
```

Added in v1.10.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L131-L133)

```ts
export const getMonoid = <A>(S: Semigroup<A>): Monoid<{ [key: string]: A }> => { ... }
```

Added in v1.10.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L121-L126)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Record<string, A>> => { ... }
```

Added in v1.10.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L72-L76)

```ts
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## isEmpty

Test whether a dictionary is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L27-L29)

```ts
export const isEmpty = <A>(d: Record<string, A>): boolean => { ... }
```

Added in v1.10.0

## isSubdictionary

Test whether one dictionary contains all of the keys and values contained in another dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L109-L116)

```ts
export const isSubdictionary = <A>(S: Setoid<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => { ... }
```

Added in v1.10.0

## lookup

Lookup the value for a key in a dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L139-L141)

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => { ... }
```

Added in v1.10.0

## map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L176-L178)

```ts
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## mapWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L162-L169)

```ts
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B>  { ... }
```

Added in v1.10.0

## partition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L365-L370)

```ts
export const partition = <A>(
  fa: Record<string, A>,
  p: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> => { ... }
```

Added in v1.10.0

## partitionMap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L355-L360)

```ts
export const partitionMap = <RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## partitionMapWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L490-L509)

```ts
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>  { ... }
```

Added in v1.12.0

## partitionWithIndex

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L522-L541)

```ts
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>  { ... }
```

Added in v1.12.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L99-L102)

```ts
export const pop = <A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> => { ... }
```

Added in v1.10.0

## reduce

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L183-L185)

```ts
export const reduce = <A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B => { ... }
```

Added in v1.10.0

## reduceWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L207-L216)

```ts
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L88-L92)

```ts
export function remove<A>(k: string, d: Record<string, A>): Record<string, A>  { ... }
```

Added in v1.10.0

## separate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L375-L393)

```ts
export const separate = <RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> => { ... }
```

Added in v1.10.0

## sequence

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L332-L335)

```ts
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>>  { ... }
```

Added in v1.10.0

## singleton

Create a dictionary with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L253-L255)

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => { ... }
```

Added in v1.10.0

## size

Calculate the number of key/value pairs in a dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L18-L20)

```ts
export const size = <A>(d: Record<string, A>): number => { ... }
```

Added in v1.10.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L50-L52)

```ts
export function toArray<A>(d: Record<string, A>): Array<[string, A]>  { ... }
```

Added in v1.10.0

## toUnfoldable

Unfolds a dictionary into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L59-L63)

```ts
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <A>(d: Record<string, A>): HKT<F, [string, A]> => { ... }
```

Added in v1.10.0

## traverse

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L306-L311)

```ts
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## traverseWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L272-L283)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>>  { ... }
```

Added in v1.10.0

## wilt

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L462-L470)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Record.ts#L416-L421)

```ts
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>>)  { ... }
```

Added in v1.10.0
