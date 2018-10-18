---
id: Tuple
title: Module Tuple
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)

# Tuple

```ts
constructor(readonly fst: L, readonly snd: A) {}
```

Added in v1.0.0 (data)

## bimap

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>
```

Added in v1.0.0 (method)

## compose

```ts
<B>(ab: Tuple<A, B>): Tuple<L, B>
```

Added in v1.0.0 (method)

## extend

```ts
<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>
```

Added in v1.0.0 (method)

## extract

```ts
(): A
```

Added in v1.0.0 (method)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## map

```ts
<B>(f: (a: A) => B): Tuple<L, B>
```

Added in v1.0.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## swap

```ts
(): Tuple<A, L>
```

Added in v1.0.0 (method)

Exchange the first and second components of a tuple

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## toTuple

```ts
(): [L, A]
```

Added in v1.0.0 (method)

## tuple

```ts
Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>
```

Added in v1.0.0 (instance)

## getApplicative

```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

Added in v1.0.0 (function)

## getApply

```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

Added in v1.0.0 (function)

## getChain

```ts
<L>(S: Semigroup<L>): Chain2C<URI, L>
```

Added in v1.0.0 (function)

## getChainRec

```ts
<L>(M: Monoid<L>): ChainRec2C<URI, L>
```

Added in v1.0.0 (function)

## getMonad

```ts
<L>(M: Monoid<L>): Monad2C<URI, L>
```

Added in v1.0.0 (function)

## getMonoid

```ts
<L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>>
```

Added in v1.0.0 (function)

## getOrd

```ts
<L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>>
```

Added in v1.0.0 (function)

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

## getSemigroup

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>>
```

Added in v1.0.0 (function)
