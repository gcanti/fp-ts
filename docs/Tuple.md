---
id: Tuple
title: Module Tuple
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)

# Tuple

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L36-L72)

```ts
export class Tuple<L, A> {
  constructor(readonly fst: L, readonly snd: A) {}
  ...
}
```

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L47-L49)

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>  { ... }
```

Added in v1.0.0

## compose

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L41-L43)

```ts
compose<B>(ab: Tuple<A, B>): Tuple<L, B>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L53-L55)

```ts
extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>  { ... }
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L50-L52)

```ts
extract(): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L63-L65)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L44-L46)

```ts
map<B>(f: (a: A) => B): Tuple<L, B>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L56-L58)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## swap

Exchange the first and second components of a tuple

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L60-L62)

```ts
swap(): Tuple<A, L>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L66-L68)

```ts
toString(): string  { ... }
```

Added in v1.0.0

## toTuple

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L69-L71)

```ts
toTuple(): [L, A]  { ... }
```

Added in v1.0.0

Added in v1.0.0

## tuple

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L236-L248)

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

## getApplicative

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L173-L178)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => { ... }
```

Added in v1.0.0

## getApply

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L157-L164)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => { ... }
```

Added in v1.0.0

## getChain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L188-L193)

```ts
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => { ... }
```

Added in v1.0.0

## getChainRec

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L218-L223)

```ts
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => { ... }
```

Added in v1.0.0

## getMonad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L198-L203)

```ts
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => { ... }
```

Added in v1.0.0

## getMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L143-L148)

```ts
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getOrd

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L127-L129)

```ts
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L134-L138)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts#L115-L119)

```ts
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => { ... }
```

Added in v1.0.0
