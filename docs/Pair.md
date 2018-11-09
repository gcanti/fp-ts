---
id: Pair
title: Module Pair
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)

## pair

```ts
Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI>
```

Added in v1.0.0 (instance)

# Pair

```ts
constructor(readonly fst: A, readonly snd: A) {}
```

Added in v1.0.0 (data)

## ap

```ts
<B>(fab: Pair<(a: A) => B>): Pair<B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## extend

```ts
<B>(f: (fb: Pair<A>) => B): Pair<B>
```

Added in v1.0.0 (method)

## extract

```ts
(): A
```

Added in v1.0.0 (method)

## first

```ts
(f: Endomorphism<A>): Pair<A>
```

Added in v1.0.0 (method)

Map a function over the first field of a pair

## map

```ts
<B>(f: (a: A) => B): Pair<B>
```

Added in v1.0.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## second

```ts
(f: Endomorphism<A>): Pair<A>
```

Added in v1.0.0 (method)

Map a function over the second field of a pair

## swap

```ts
(): Pair<A>
```

Added in v1.0.0 (method)

Swaps the elements in a pair

## getMonoid

```ts
<A>(M: Monoid<A>): Monoid<Pair<A>>
```

Added in v1.0.0 (function)

## getOrd

```ts
<A>(O: Ord<A>): Ord<Pair<A>>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<Pair<A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<Pair<A>>
```

Added in v1.0.0 (function)
