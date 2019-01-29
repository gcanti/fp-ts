---
id: Foldable
title: Module Foldable
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)

# ~~Foldable~~ (deprecated)

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L19-L22)

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

Use [Foldable2v](./Foldable2v.md)

Added in v1.0.0

## elem

Test whether a value is an element of a data structure

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L401-L403)

```ts
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean  { ... }
```

Added in v1.0.0

## find

Try to find an element in a data structure which satisfies a predicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L418-L427)

```ts
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>  { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L183-L185)

```ts
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M  { ... }
```

Added in v1.0.0

## foldM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L218-L223)

```ts
export function foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>  { ... }
```

Added in v1.0.0

## foldMap

A default implementation of `foldMap` using `foldl`.
Map each element of the structure to a monoid, and combine the results.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L147-L149)

```ts
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M  { ... }
```

Added in v1.0.0

## foldr

A default implementation of `foldr` using `foldMap`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L168-L171)

```ts
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B  { ... }
```

Added in v1.0.0

## getFoldableComposition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L117-L121)

```ts
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>  { ... }
```

Added in v1.0.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L348-L355)

```ts
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M  { ... }
```

Added in v1.0.0

## maximum

Find the largest element of a structure, according to its `Ord` instance

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L462-L465)

```ts
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>  { ... }
```

Added in v1.0.0

## minimum

Find the smallest element of a structure, according to its `Ord` instance

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L443-L446)

```ts
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>  { ... }
```

Added in v1.0.0

## oneOf

Combines a collection of elements using the `Alt` operation

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L322-L324)

```ts
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>  { ... }
```

Added in v1.0.0

## product

Find the product of the numeric values in a data structure

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L383-L385)

```ts
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A  { ... }
```

Added in v1.0.0

## sequence\_

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L291-L294)

```ts
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>  { ... }
```

Added in v1.0.0

## sum

Find the sum of the numeric values in a data structure

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L368-L370)

```ts
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A  { ... }
```

Added in v1.0.0

## toArray

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L477-L480)

```ts
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>  { ... }
```

Added in v1.0.0

## traverse

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L512-L518)

```ts
export function traverse<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>  { ... }
```

Added in v1.7.0

## ~~traverse\_~~ (deprecated)

Use [traverse](#traverse)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts#L255-L263)

```ts
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>  { ... }
```

Added in v1.0.0
