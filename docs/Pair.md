---
id: Pair
title: Module Pair
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)

## pair

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L155-L167)

```ts
export const pair: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = { ... }
```

Added in v1.0.0

# Pair

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L30-L67)

```ts
export class Pair<A> {
  constructor(readonly fst: A, readonly snd: A) {}
  ...
}
```

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L49-L51)

```ts
ap<B>(fab: Pair<(a: A) => B>): Pair<B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L55-L57)

```ts
ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L64-L66)

```ts
extend<B>(f: (fb: Pair<A>) => B): Pair<B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L61-L63)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## first

Map a function over the first field of a pair

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L35-L37)

```ts
first(f: Endomorphism<A>): Pair<A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L46-L48)

```ts
map<B>(f: (a: A) => B): Pair<B>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L58-L60)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## second

Map a function over the second field of a pair

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L39-L41)

```ts
second(f: Endomorphism<A>): Pair<A>  { ... }
```

Added in v1.0.0

## swap

Swaps the elements in a pair

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L43-L45)

```ts
swap(): Pair<A>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L136-L141)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => { ... }
```

Added in v1.0.0

## getOrd

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L115-L120)

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L126-L130)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts#L105-L109)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => { ... }
```

Added in v1.0.0
