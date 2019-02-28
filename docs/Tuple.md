---
id: Tuple
title: Tuple
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)

# Tuple

**Signature** (data type)

```ts
export class Tuple<L, A> {
  constructor(readonly fst: L, readonly snd: A) {}
  ...
}
```

## bimap

**Signature** (method)

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>  { ... }
```

Added in v1.0.0

## compose

**Signature** (method)

```ts
compose<B>(ab: Tuple<A, B>): Tuple<L, B>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method)

```ts
extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Tuple<L, B>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## swap

Exchange the first and second components of a tuple

**Signature** (method)

```ts
swap(): Tuple<A, L>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method)

```ts
toString(): string  { ... }
```

Added in v1.0.0

## toTuple

**Signature** (method)

```ts
toTuple(): [L, A]  { ... }
```

Added in v1.0.0

Added in v1.0.0

## tuple

**Signature** (constant)

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

## getApplicative

**Signature** (function)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => { ... }
```

Added in v1.0.0

## getApply

**Signature** (function)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => { ... }
```

Added in v1.0.0

## getChain

**Signature** (function)

```ts
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => { ... }
```

Added in v1.0.0

## getChainRec

**Signature** (function)

```ts
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => { ... }
```

Added in v1.0.0

## getMonad

**Signature** (function)

```ts
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function)

```ts
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getOrd

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

**Signature** (function)

```ts
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => { ... }
```

Added in v1.0.0
