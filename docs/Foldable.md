---
id: Foldable
title: Module Foldable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)

## Type classes

### ~~Foldable~~ (deprecated)

_type class_

_since 1.0.0_

_Signature_

```ts
interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

_Description_

Use [Foldable2v](./Foldable2v.md)

## Functions

### elem

_function_

_since 1.0.0_

_Signature_

```ts
elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean
```

_Description_

Test whether a value is an element of a data structure

### find

_function_

_since 1.0.0_

_Signature_

```ts
find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
```

_Description_

Try to find an element in a data structure which satisfies a predicate

### fold

_function_

_since 1.0.0_

_Signature_

```ts
fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M
```

### foldM

_function_

_since 1.0.0_

_Signature_

```ts
foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>
```

_Description_

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

### foldMap

_function_

_since 1.0.0_

_Signature_

```ts
foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M
```

_Description_

A default implementation of `foldMap` using `foldl`.
Map each element of the structure to a monoid, and combine the results.

### foldr

_function_

_since 1.0.0_

_Signature_

```ts
foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
```

_Description_

A default implementation of `foldr` using `foldMap`

### getFoldableComposition

_function_

_since 1.0.0_

_Signature_

```ts
getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
```

### intercalate

_function_

_since 1.0.0_

_Signature_

```ts
intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M
```

_Description_

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

### maximum

_function_

_since 1.0.0_

_Signature_

```ts
maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
```

_Description_

Find the largest element of a structure, according to its `Ord` instance

### minimum

_function_

_since 1.0.0_

_Signature_

```ts
minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
```

_Description_

Find the smallest element of a structure, according to its `Ord` instance

### oneOf

_function_

_since 1.0.0_

_Signature_

```ts
oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
```

_Description_

Combines a collection of elements using the `Alt` operation

### product

_function_

_since 1.0.0_

_Signature_

```ts
product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
```

_Description_

Find the product of the numeric values in a data structure

### sequence\_

_function_

_since 1.0.0_

_Signature_

```ts
sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
```

_Description_

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

### sum

_function_

_since 1.0.0_

_Signature_

```ts
sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
```

_Description_

Find the sum of the numeric values in a data structure

### toArray

_function_

_since 1.0.0_

_Signature_

```ts
toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>
```

### traverse

_function_

_since 1.7.0_

_Signature_

```ts
traverse<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
```

_Description_

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

### ~~traverse\_~~ (deprecated)

_function_

_since 1.0.0_

_Signature_

```ts
traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
```

_Description_

Use [traverse](#traverse)
