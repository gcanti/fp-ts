---
id: Pair
title: Pair
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)

# Pair

**Signature** (data type)

```ts
export class Pair<A> {
  constructor(readonly fst: A, readonly snd: A) {}
  ...
}
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Pair<(a: A) => B>): Pair<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method)

```ts
ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method)

```ts
extend<B>(f: (fb: Pair<A>) => B): Pair<B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## first

Map a function over the first field of a pair

**Signature** (method)

```ts
first(f: Endomorphism<A>): Pair<A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Pair<B>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## second

Map a function over the second field of a pair

**Signature** (method)

```ts
second(f: Endomorphism<A>): Pair<A>  { ... }
```

Added in v1.0.0

## swap

Swaps the elements in a pair

**Signature** (method)

```ts
swap(): Pair<A>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## pair

**Signature** (constant)

```ts
export const pair: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => { ... }
```

Added in v1.0.0

## getOrd

**Signature** (function)

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => { ... }
```

Added in v1.0.0
