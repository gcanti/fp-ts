---
title: Foldable.ts
nav_order: 31
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [~~Foldable~~](#foldable)
- [Foldable1](#foldable1)
- [Foldable2](#foldable2)
- [Foldable2C](#foldable2c)
- [Foldable3](#foldable3)
- [Foldable3C](#foldable3c)
- [FoldableComposition](#foldablecomposition)
- [FoldableComposition11](#foldablecomposition11)
- [FoldableComposition12](#foldablecomposition12)
- [FoldableComposition12C](#foldablecomposition12c)
- [FoldableComposition21](#foldablecomposition21)
- [FoldableComposition22](#foldablecomposition22)
- [FoldableComposition22C](#foldablecomposition22c)
- [FoldableComposition2C1](#foldablecomposition2c1)
- [FoldableComposition3C1](#foldablecomposition3c1)
- [elem](#elem)
- [find](#find)
- [fold](#fold)
- [foldM](#foldm)
- [foldMap](#foldmap)
- [foldr](#foldr)
- [getFoldableComposition](#getfoldablecomposition)
- [intercalate](#intercalate)
- [maximum](#maximum)
- [minimum](#minimum)
- [oneOf](#oneof)
- [product](#product)
- [sequence\_](#sequence%5C_)
- [sum](#sum)
- [toArray](#toarray)
- [traverse](#traverse)
- [~~traverse\_~~](#traverse%5C_)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ~~Foldable~~

Use `Foldable2v`

**Signature** (interface)

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

Added in v1.0.0

# Foldable1

**Signature** (interface)

```ts
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# Foldable2

**Signature** (interface)

```ts
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# Foldable2C

**Signature** (interface)

```ts
export interface Foldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly reduce: <A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# Foldable3

**Signature** (interface)

```ts
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# Foldable3C

**Signature** (interface)

```ts
export interface Foldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly reduce: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition

**Signature** (interface)

```ts
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition11

**Signature** (interface)

```ts
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition12

**Signature** (interface)

```ts
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition12C

**Signature** (interface)

```ts
export interface FoldableComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly reduce: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition21

**Signature** (interface)

```ts
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition22

**Signature** (interface)

```ts
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <LF, LG, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition22C

**Signature** (interface)

```ts
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly reduce: <LF, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition2C1

**Signature** (interface)

```ts
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly reduce: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# FoldableComposition3C1

**Signature** (interface)

```ts
export interface FoldableComposition3C1<F extends URIS3, G extends URIS, UF, LF> {
  readonly reduce: <A, B>(fga: Type3<F, UF, LF, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# elem

Test whether a value is an element of a data structure

**Signature** (function)

```ts
export function elem<F extends URIS3, A>(F: Foldable3<F>, S: Setoid<A>): <U, L>(a: A, fa: Type3<F, U, L, A>) => boolean
export function elem<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  S: Setoid<A>
): (a: A, fa: Type3<F, U, L, A>) => boolean
export function elem<F extends URIS2, A>(F: Foldable2<F>, S: Setoid<A>): <L>(a: A, fa: Type2<F, L, A>) => boolean
export function elem<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Setoid<A>): (a: A, fa: Type2<F, L, A>) => boolean
export function elem<F extends URIS, A>(F: Foldable1<F>, S: Setoid<A>): (a: A, fa: Type<F, A>) => boolean
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean { ... }
```

Added in v1.0.0

# find

Try to find an element in a data structure which satisfies a predicate

**Signature** (function)

```ts
export function find<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS3, U, L>(
  F: Foldable3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Option<A>
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> { ... }
```

Added in v1.0.0

# fold

**Signature** (function)

```ts
export function fold<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): <U, L>(fa: Type3<F, U, L, M>) => M
export function fold<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): (fa: Type3<F, U, L, M>) => M
export function fold<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): <L>(fa: Type2<F, L, M>) => M
export function fold<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): (fa: Type2<F, L, M>) => M
export function fold<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (fa: Type<F, M>) => M
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M { ... }
```

Added in v1.0.0

# foldM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature** (function)

```ts
export function foldM<F extends URIS, M extends URIS3>(
  F: Foldable1<F>,
  M: Monad3<M>
): <U, L, A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS3, U, L>(
  F: Foldable1<F>,
  M: Monad3C<M, U, L>
): <A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS2>(
  F: Foldable1<F>,
  M: Monad2<M>
): <L, A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>
export function foldM<F extends URIS, M extends URIS2, L>(
  F: Foldable1<F>,
  M: Monad2C<M, L>
): <A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>
export function foldM<F extends URIS, M extends URIS>(
  F: Foldable1<F>,
  M: Monad1<M>
): <A, B>(f: (b: B, a: A) => Type<M, B>, b: B, fa: Type<F, A>) => Type<M, B>
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B> { ... }
```

Added in v1.0.0

# foldMap

A default implementation of `foldMap` using `foldl`.
Map each element of the structure to a monoid, and combine the results.

**Signature** (function)

```ts
export function foldMap<F extends URIS3, M>(
  F: Foldable3<F>,
  M: Monoid<M>
): <U, L, A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS3, M, U, L>(
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): <A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M>(
  F: Foldable2<F>,
  M: Monoid<M>
): <L, A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M, L>(
  F: Foldable2C<F, L>,
  M: Monoid<M>
): <A>(fa: Type2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): <A>(fa: Type<F, A>, f: (a: A) => M) => M
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M { ... }
```

Added in v1.0.0

# foldr

A default implementation of `foldr` using `foldMap`

**Signature** (function)

```ts
export function foldr<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS3, U, L>(
  F: Foldable3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2>(F: Foldable2<F>): <L, A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2, L>(
  F: Foldable2C<F, L>
): <A, B>(fa: Type2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS>(F: Foldable1<F>): <A, B>(fa: Type<F, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B { ... }
```

Added in v1.0.0

# getFoldableComposition

**Signature** (function)

```ts
export function getFoldableComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Foldable3C<F, UF, LF>,
  G: Foldable1<G>
): FoldableComposition3C1<F, G, UF, LF>
export function getFoldableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Foldable2C<F, LG>,
  G: Foldable2<G>
): FoldableComposition22C<F, G, LG>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2<F>,
  G: Foldable2<G>
): FoldableComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2<F>,
  G: Foldable1<G>
): FoldableComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable1<F>,
  G: Foldable2<G>
): FoldableComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): FoldableComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> { ... }
```

Added in v1.0.0

# intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature** (function)

```ts
export function intercalate<F extends URIS3, M>(
  F: Foldable3<F>,
  M: Monoid<M>
): (sep: M) => <U, L>(fm: Type3<F, U, L, M>) => M
export function intercalate<F extends URIS3, M, U, L>(
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): (sep: M) => (fm: Type3<F, U, L, M>) => M
export function intercalate<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): (sep: M) => <L>(fm: Type2<F, L, M>) => M
export function intercalate<F extends URIS2, M, L>(
  F: Foldable2C<F, L>,
  M: Monoid<M>
): (sep: M) => (fm: Type2<F, L, M>) => M
export function intercalate<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (sep: M) => (fm: Type<F, M>) => M
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M { ... }
```

Added in v1.0.0

# maximum

Find the largest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function maximum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Type3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>
export function maximum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>
export function maximum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> { ... }
```

Added in v1.0.0

# minimum

Find the smallest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function minimum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS3, A, U, L>(
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Type3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>
export function minimum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>
export function minimum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> { ... }
```

Added in v1.0.0

# oneOf

Combines a collection of elements using the `Alt` operation

**Signature** (function)

```ts
export function oneOf<F extends URIS, P extends URIS3>(
  F: Foldable1<F>,
  P: Plus3<P>
): <U, L, A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS3, U, L>(
  F: Foldable1<F>,
  P: Plus3C<P, U, L>
): <A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS2>(
  F: Foldable1<F>,
  P: Plus2<P>
): <L, A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<F extends URIS, P extends URIS2, L>(
  F: Foldable1<F>,
  P: Plus2C<P, L>
): <A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>
export function oneOf<F extends URIS, P extends URIS>(
  F: Foldable1<F>,
  P: Plus1<P>
): <A>(fga: Type<F, Type<P, A>>) => Type<P, A>
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> { ... }
```

Added in v1.0.0

# product

Find the product of the numeric values in a data structure

**Signature** (function)

```ts
export function product<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A
export function product<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A
export function product<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A
export function product<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A
export function product<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A { ... }
```

Added in v1.0.0

# sequence\_

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

**Signature** (function)

```ts
export function sequence_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>
export function sequence_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>
export function sequence_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A>(fa: Type<F, Type<M, A>>) => Type<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> { ... }
```

Added in v1.0.0

# sum

Find the sum of the numeric values in a data structure

**Signature** (function)

```ts
export function sum<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A
export function sum<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A
export function sum<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A
export function sum<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A { ... }
```

Added in v1.0.0

# toArray

**Signature** (function)

```ts
export function toArray<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A>(fa: Type3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>) => Array<A>
export function toArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>) => Array<A>
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A> { ... }
```

Added in v1.0.0

# traverse

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature** (function)

```ts
export function traverse<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, void>
export function traverse<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, void>
export function traverse<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A, B>(fa: Type<F, A>, f: (a: A) => Type<M, B>) => Type<M, void>
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> { ... }
```

Added in v1.7.0

# ~~traverse\_~~

Use `traverse` instead

**Signature** (function)

```ts
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <U, L, A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>
export function traverse_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <L, A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>
export function traverse_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A, B>(f: (a: A) => Type<M, B>, fa: Type<F, A>) => Type<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> { ... }
```

Added in v1.0.0
