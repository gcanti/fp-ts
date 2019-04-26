---
title: Filterable.ts
nav_order: 29
parent: Modules
---

# Overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs

---

<h2 class="text-delta">Table of contents</h2>

- [Filterable (interface)](#filterable-interface)
- [Filterable1 (interface)](#filterable1-interface)
- [Filterable2 (interface)](#filterable2-interface)
- [Filterable2C (interface)](#filterable2c-interface)
- [Filterable3 (interface)](#filterable3-interface)
- [Filterable3C (interface)](#filterable3c-interface)
- [FilterableComposition (interface)](#filterablecomposition-interface)
- [FilterableComposition11 (interface)](#filterablecomposition11-interface)
- [FilterableComposition12 (interface)](#filterablecomposition12-interface)
- [FilterableComposition12C (interface)](#filterablecomposition12c-interface)
- [FilterableComposition21 (interface)](#filterablecomposition21-interface)
- [FilterableComposition22 (interface)](#filterablecomposition22-interface)
- [FilterableComposition22C (interface)](#filterablecomposition22c-interface)
- [FilterableComposition2C1 (interface)](#filterablecomposition2c1-interface)
- [FilterableComposition3C1 (interface)](#filterablecomposition3c1-interface)
- [getFilterableComposition (function)](#getfilterablecomposition-function)

---

# Filterable (interface)

**Signature**

```ts
export interface Filterable<F> extends Functor<F>, Compactable<F> {
  /**
   * Partition a data structure based on an either predicate.
   */
  readonly partitionMap: <RL, RR, A>(fa: HKT<F, A>, f: (a: A) => Either<RL, RR>) => Separated<HKT<F, RL>, HKT<F, RR>>
  /**
   * Partition a data structure based on a boolean predicate.
   */
  readonly partition: Partition<F>
  /**
   * Map over a data structure and filter based on an option predicate.
   */
  readonly filterMap: <A, B>(fa: HKT<F, A>, f: (a: A) => Option<B>) => HKT<F, B>
  /**
   * Filter a data structure based on a boolean predicate.
   */
  readonly filter: Filter<F>
}
```

Added in v1.7.0

# Filterable1 (interface)

**Signature**

```ts
export interface Filterable1<F extends URIS> extends Functor1<F>, Compactable1<F> {
  readonly partitionMap: <RL, RR, A>(fa: Type<F, A>, f: (a: A) => Either<RL, RR>) => Separated<Type<F, RL>, Type<F, RR>>
  readonly partition: Partition1<F>
  readonly filterMap: <A, B>(fa: Type<F, A>, f: (a: A) => Option<B>) => Type<F, B>
  readonly filter: Filter1<F>
}
```

Added in v1.7.0

# Filterable2 (interface)

**Signature**

```ts
export interface Filterable2<F extends URIS2> extends Functor2<F>, Compactable2<F> {
  readonly partitionMap: <RL, RR, L, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: Partition2<F>
  readonly filterMap: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: Filter2<F>
}
```

Added in v1.7.0

# Filterable2C (interface)

**Signature**

```ts
export interface Filterable2C<F extends URIS2, L> extends Functor2C<F, L>, Compactable2C<F, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  readonly partition: Partition2C<F, L>
  readonly filterMap: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Option<B>) => Type2<F, L, B>
  readonly filter: Filter2C<F, L>
}
```

Added in v1.7.0

# Filterable3 (interface)

**Signature**

```ts
export interface Filterable3<F extends URIS3> extends Functor3<F>, Compactable3<F> {
  readonly partitionMap: <RL, RR, U, L, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: Partition3<F>
  readonly filterMap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: Filter3<F>
}
```

Added in v1.7.0

# Filterable3C (interface)

**Signature**

```ts
export interface Filterable3C<F extends URIS3, U, L> extends Functor3C<F, U, L>, Compactable3C<F, U, L> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type3<F, U, L, A>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
  readonly partition: Partition3C<F, U, L>
  readonly filterMap: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Option<B>) => Type3<F, U, L, B>
  readonly filter: Filter3C<F, U, L>
}
```

Added in v1.7.0

# FilterableComposition (interface)

**Signature**

```ts
export interface FilterableComposition<F, G> extends FunctorComposition<F, G>, CompactableComposition<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: HKT<F, HKT<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<HKT<F, HKT<G, RL>>, HKT<F, HKT<G, RR>>>
  readonly partition: <A>(
    fa: HKT<F, HKT<G, A>>,
    predicate: Predicate<A>
  ) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, A>>>
  readonly filterMap: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => Option<B>) => HKT<F, HKT<G, B>>
  readonly filter: <A>(fa: HKT<F, HKT<G, A>>, predicate: Predicate<A>) => HKT<F, HKT<G, A>>
}
```

# FilterableComposition11 (interface)

**Signature**

```ts
export interface FilterableComposition11<F extends URIS, G extends URIS>
  extends FunctorComposition11<F, G>,
    CompactableComposition11<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type<F, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type<G, RL>>, Type<F, Type<G, RR>>>
  readonly partition: <A>(
    fa: Type<F, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type<G, A>>, Type<F, Type<G, A>>>
  readonly filterMap: <A, B>(fa: Type<F, Type<G, A>>, f: (a: A) => Option<B>) => Type<F, Type<G, B>>
  readonly filter: <A>(fa: Type<F, Type<G, A>>, predicate: Predicate<A>) => Type<F, Type<G, A>>
}
```

# FilterableComposition12 (interface)

**Signature**

```ts
export interface FilterableComposition12<F extends URIS, G extends URIS2>
  extends FunctorComposition12<F, G>,
    CompactableComposition12<F, G> {
  readonly partitionMap: <LG, RL, RR, A>(
    fa: Type<F, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type2<G, LG, RL>>, Type<F, Type2<G, LG, RR>>>
  readonly partition: <LG, A>(
    fa: Type<F, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, A>>>
  readonly filterMap: <LG, A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => Option<B>) => Type<F, Type2<G, LG, B>>
  readonly filter: <LG, A>(fa: Type<F, Type2<G, LG, A>>, predicate: Predicate<A>) => Type<F, Type2<G, LG, A>>
}
```

# FilterableComposition12C (interface)

**Signature**

```ts
export interface FilterableComposition12C<F extends URIS, G extends URIS2, LG>
  extends FunctorComposition12C<F, G, LG>,
    CompactableComposition12C<F, G, LG> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type<F, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type<F, Type2<G, LG, RL>>, Type<F, Type2<G, LG, RR>>>
  readonly partition: <A>(
    fa: Type<F, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type<F, Type2<G, LG, A>>, Type<F, Type2<G, LG, A>>>
  readonly filterMap: <A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => Option<B>) => Type<F, Type2<G, LG, B>>
  readonly filter: <A>(fa: Type<F, Type2<G, LG, A>>, predicate: Predicate<A>) => Type<F, Type2<G, LG, A>>
}
```

# FilterableComposition21 (interface)

**Signature**

```ts
export interface FilterableComposition21<F extends URIS2, G extends URIS>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <LF, RL, RR, A>(
    fa: Type2<F, LF, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type<G, RL>>, Type2<F, LF, Type<G, RR>>>
  readonly partition: <LF, A>(
    fa: Type2<F, LF, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, A>>>
  readonly filterMap: <LF, A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => Option<B>) => Type2<F, LF, Type<G, B>>
  readonly filter: <LF, A>(fa: Type2<F, LF, Type<G, A>>, predicate: Predicate<A>) => Type2<F, LF, Type<G, A>>
}
```

# FilterableComposition22 (interface)

**Signature**

```ts
export interface FilterableComposition22<F extends URIS2, G extends URIS2>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <LF, LG, RL, RR, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type2<G, LG, RL>>, Type2<F, LF, Type2<G, LG, RR>>>
  readonly partition: <LF, LG, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, A>>>
  readonly filterMap: <LF, LG, A, B>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Option<B>
  ) => Type2<F, LF, Type2<G, LG, B>>
  readonly filter: <LF, LG, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Type2<F, LF, Type2<G, LG, A>>
}
```

# FilterableComposition22C (interface)

**Signature**

```ts
export interface FilterableComposition22C<F extends URIS2, G extends URIS2, LG>
  extends FunctorComposition22<F, G>,
    CompactableComposition22<F, G> {
  readonly partitionMap: <LF, RL, RR, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type2<G, LG, RL>>, Type2<F, LF, Type2<G, LG, RR>>>
  readonly partition: <LF, A>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type2<G, LG, A>>, Type2<F, LF, Type2<G, LG, A>>>
  readonly filterMap: <LF, A, B>(
    fa: Type2<F, LF, Type2<G, LG, A>>,
    f: (a: A) => Option<B>
  ) => Type2<F, LF, Type2<G, LG, B>>
  readonly filter: <LF, A>(fa: Type2<F, LF, Type2<G, LG, A>>, predicate: Predicate<A>) => Type2<F, LF, Type2<G, LG, A>>
}
```

# FilterableComposition2C1 (interface)

**Signature**

```ts
export interface FilterableComposition2C1<F extends URIS2, G extends URIS, LF>
  extends FunctorComposition21<F, G>,
    CompactableComposition21<F, G> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type2<F, LF, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type2<F, LF, Type<G, RL>>, Type2<F, LF, Type<G, RR>>>
  readonly partition: <A>(
    fa: Type2<F, LF, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type2<F, LF, Type<G, A>>, Type2<F, LF, Type<G, A>>>
  readonly filterMap: <A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => Option<B>) => Type2<F, LF, Type<G, B>>
  readonly filter: <A>(fa: Type2<F, LF, Type<G, A>>, predicate: Predicate<A>) => Type2<F, LF, Type<G, A>>
}
```

# FilterableComposition3C1 (interface)

**Signature**

```ts
export interface FilterableComposition3C1<F extends URIS3, G extends URIS, UF, LF>
  extends FunctorComposition3C1<F, G, UF, LF>,
    CompactableComposition3C1<F, G, UF, LF> {
  readonly partitionMap: <RL, RR, A>(
    fa: Type3<F, UF, LF, Type<G, A>>,
    f: (a: A) => Either<RL, RR>
  ) => Separated<Type3<F, UF, LF, Type<G, RL>>, Type3<F, UF, LF, Type<G, RR>>>
  readonly partition: <A>(
    fa: Type3<F, UF, LF, Type<G, A>>,
    predicate: Predicate<A>
  ) => Separated<Type3<F, UF, LF, Type<G, A>>, Type3<F, UF, LF, Type<G, A>>>
  readonly filterMap: <A, B>(fa: Type3<F, UF, LF, Type<G, A>>, f: (a: A) => Option<B>) => Type3<F, UF, LF, Type<G, B>>
  readonly filter: <A>(fa: Type3<F, UF, LF, Type<G, A>>, predicate: Predicate<A>) => Type3<F, UF, LF, Type<G, A>>
}
```

# getFilterableComposition (function)

**Signature**

```ts
export function getFilterableComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Functor3C<F, UF, LF>,
  G: Filterable1<G>
): FilterableComposition3C1<F, G, UF, LF>
export function getFilterableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Functor2<F>,
  G: Filterable2C<G, LG>
): FilterableComposition22C<F, G, LG>
export function getFilterableComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Filterable2<G>
): FilterableComposition22<F, G>
export function getFilterableComposition<F extends URIS2, G extends URIS, LF>(
  F: Functor2C<F, LF>,
  G: Filterable1<G>
): FilterableComposition2C1<F, G, LF>
export function getFilterableComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Filterable1<G>
): FilterableComposition21<F, G>
export function getFilterableComposition<F extends URIS, G extends URIS2, LG>(
  F: Functor1<F>,
  G: Filterable2C<G, LG>
): FilterableComposition12C<F, G, LG>
export function getFilterableComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Filterable2<G>
): FilterableComposition12<F, G>
export function getFilterableComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Filterable1<G>
): FilterableComposition11<F, G>
export function getFilterableComposition<F, G>(F: Functor<F>, G: Filterable<G>): FilterableComposition<F, G> { ... }
```

Added in v1.12.0
