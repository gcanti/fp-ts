---
id: StrMap
title: Module StrMap
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts)

# StrMap

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L47-L146)

```ts
export class StrMap<A> {
  constructor(readonly value: { [key: string]: A }) {}
  ...
}
```

## every

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L137-L139)

```ts
every(predicate: (a: A) => boolean): boolean  { ... }
```

Added in v1.14.0

## filter

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L83-L85)

```ts
filter(p: Predicate<A>): StrMap<A>  { ... }
```

Added in v1.4.0

## filterMap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L89-L91)

```ts
filterMap<B>(f: (a: A) => Option<B>): StrMap<B>  { ... }
```

Added in v1.12.0

## filterMapWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L125-L127)

```ts
filterMapWithIndex<B>(f: (i: string, a: A) => Option<B>): StrMap<B>  { ... }
```

Added in v1.12.0

## filterWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L131-L133)

```ts
filterWithIndex(p: (i: string, a: A) => boolean): StrMap<A>  { ... }
```

Added in v1.12.0

## foldr

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L63-L65)

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## foldrWithKey

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L75-L77)

```ts
foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L54-L56)

```ts
map<B>(f: (a: A) => B): StrMap<B>  { ... }
```

Added in v1.0.0

## mapWithKey

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L51-L53)

```ts
mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B>  { ... }
```

Added in v1.0.0

## partition

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L95-L97)

```ts
partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>>  { ... }
```

Added in v1.12.0

## partitionMap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L101-L103)

```ts
partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## partitionMapWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L113-L115)

```ts
partitionMapWithIndex<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## partitionWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L119-L121)

```ts
partitionWithIndex(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>>  { ... }
```

Added in v1.12.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L57-L59)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## reduceWithKey

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L69-L71)

```ts
reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## separate

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L107-L109)

```ts
separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>>  { ... }
```

Added in v1.12.0

## some

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L143-L145)

```ts
some(predicate: (a: A) => boolean): boolean  { ... }
```

Added in v1.14.0

Added in v1.0.0

## strmap

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L441-L472)

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L317-L319)

```ts
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => { ... }
```

Added in v1.0.0

## fromFoldable

Create a dictionary from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L305-L311)

```ts
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>  { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L163-L168)

```ts
export const getMonoid = <A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L265-L268)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => { ... }
```

Added in v1.0.0

## insert

Insert or replace a key/value pair in a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L346-L349)

```ts
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => { ... }
```

Added in v1.0.0

## isEmpty

Test whether a dictionary is empty

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L257-L259)

```ts
export const isEmpty = <A>(d: StrMap<A>): boolean => { ... }
```

Added in v1.0.0

## isMember

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L373-L375)

```ts
export function isMember<A>(S: Setoid<A>): (a: A, fa: StrMap<A>) => boolean  { ... }
```

Added in v1.14.0

## isSubdictionary

Test whether one dictionary contains all of the keys and values contained in another dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L238-L241)

```ts
export const isSubdictionary = <A>(S: Setoid<A>): ((d1: StrMap<A>, d2: StrMap<A>) => boolean) => { ... }
```

Added in v1.0.0

## lookup

Lookup the value for a key in a dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L284-L286)

```ts
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => { ... }
```

Added in v1.0.0

## pop

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L366-L368)

```ts
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => { ... }
```

Added in v1.0.0

## remove

Delete a key and value from a map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L356-L359)

```ts
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => { ... }
```

Added in v1.0.0

## singleton

Create a dictionary with one key/value pair

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L275-L277)

```ts
export const singleton = <A>(k: string, a: A): StrMap<A> => { ... }
```

Added in v1.0.0

## size

Calculate the number of key/value pairs in a dictionary

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L248-L250)

```ts
export const size = <A>(d: StrMap<A>): number => { ... }
```

Added in v1.0.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L325-L327)

```ts
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => { ... }
```

Added in v1.0.0

## toUnfoldable

Unfolds a dictionary into a list of key/value pairs

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L336-L339)

```ts
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>)  { ... }
```

Added in v1.0.0

## traverseWithKey

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StrMap.ts#L216-L221)

```ts
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>  { ... }
```

Added in v1.0.0
