---
title: fluent.ts
nav_order: 33
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Fluent1 (interface)](#fluent1-interface)
- [Fluent2 (interface)](#fluent2-interface)
- [Fluent2C (interface)](#fluent2c-interface)
- [Fluent (class)](#fluent-class)
  - [show (method)](#show-method)
  - [equals (method)](#equals-method)
  - [compare (method)](#compare-method)
  - [concat (method)](#concat-method)
  - [map (method)](#map-method)
  - [mapWithIndex (method)](#mapwithindex-method)
  - [ap (method)](#ap-method)
  - [apFirst (method)](#apfirst-method)
  - [apSecond (method)](#apsecond-method)
  - [chain (method)](#chain-method)
  - [flatten (method)](#flatten-method)
  - [extend (method)](#extend-method)
  - [duplicate (method)](#duplicate-method)
  - [reduce (method)](#reduce-method)
  - [foldMap (method)](#foldmap-method)
  - [reduceRight (method)](#reduceright-method)
  - [reduceWithIndex (method)](#reducewithindex-method)
  - [foldMapWithIndex (method)](#foldmapwithindex-method)
  - [reduceRightWithIndex (method)](#reducerightwithindex-method)
  - [alt (method)](#alt-method)
  - [compact (method)](#compact-method)
  - [separate (method)](#separate-method)
  - [filter (method)](#filter-method)
  - [filterMap (method)](#filtermap-method)
  - [partition (method)](#partition-method)
  - [partitionMap (method)](#partitionmap-method)
  - [filterWithIndex (method)](#filterwithindex-method)
  - [filterMapWithIndex (method)](#filtermapwithindex-method)
  - [partitionWithIndex (method)](#partitionwithindex-method)
  - [partitionMapWithIndex (method)](#partitionmapwithindex-method)
  - [bimap (method)](#bimap-method)
  - [mapLeft (method)](#mapleft-method)
  - [promap (method)](#promap-method)
  - [compose (method)](#compose-method)
- [fluent (function)](#fluent-function)

---

# Fluent1 (interface)

**Signature**

```ts
export interface Fluent1<F extends URIS, I, A> {
  readonly I: I
  readonly value: Type<F, A>
  show(this: Fluent1<F, Show<Type<F, A>>, A>): string
  equals(this: Fluent1<F, Eq<Type<F, A>>, A>, that: Type<F, A>): boolean
  compare(this: Fluent1<F, Ord<Type<F, A>>, A>, that: Type<F, A>): Ordering
  concat(this: Fluent1<F, Magma<Type<F, A>>, A>, that: Type<F, A>): Type<F, A>
  map<B>(this: Fluent1<F, Functor1<F>, A>, f: (a: A) => B): Fluent1<F, I, B>
  mapWithIndex<Ix, B>(this: Fluent1<F, FunctorWithIndex1<F, Ix>, A>, f: (i: Ix, a: A) => B): Fluent1<F, I, B>
  ap<B>(this: Fluent1<F, Apply1<F>, A>, fab: Type<F, (a: A) => B>): Fluent1<F, I, B>
  apFirst<B>(this: Fluent1<F, Apply1<F>, A>, that: Type<F, B>): Fluent1<F, I, A>
  apSecond<B>(this: Fluent1<F, Apply1<F>, A>, that: Type<F, B>): Fluent1<F, I, B>
  chain<B>(this: Fluent1<F, Chain1<F>, A>, f: (a: A) => Type<F, B>): Fluent1<F, I, B>
  flatten<A>(this: Fluent1<F, Chain1<F>, Type<F, A>>): Fluent1<F, I, A>
  extend<B>(this: Fluent1<F, Extend1<F>, A>, f: (fa: Type<F, A>) => B): Fluent1<F, I, B>
  duplicate(this: Fluent1<F, Extend1<F>, A>): Fluent1<F, I, Type<F, A>>
  reduce<B>(this: Fluent1<F, Foldable1<F>, A>, b: B, f: (b: B, a: A) => B): B
  foldMap<M>(this: Fluent1<F, Foldable1<F>, A>, M: Monoid<M>): (f: (a: A) => M) => M
  reduceRight<B>(this: Fluent1<F, Foldable1<F>, A>, b: B, f: (a: A, b: B) => B): B
  reduceWithIndex<Ix, B>(this: Fluent1<F, FoldableWithIndex1<F, Ix>, A>, b: B, f: (i: Ix, b: B, a: A) => B): B
  foldMapWithIndex<Ix, M>(this: Fluent1<F, FoldableWithIndex1<F, Ix>, A>, M: Monoid<M>): (f: (i: Ix, a: A) => M) => M
  reduceRightWithIndex<Ix, B>(this: Fluent1<F, FoldableWithIndex1<F, Ix>, A>, b: B, f: (i: Ix, a: A, b: B) => B): B
  alt(this: Fluent1<F, Alt1<F>, A>, that: () => Type<F, A>): Fluent1<F, I, A>
  compact<A>(this: Fluent1<F, Compactable1<F>, Option<A>>): Fluent1<F, I, A>
  separate<A, B>(this: Fluent1<F, Compactable1<F>, Either<A, B>>): Separated<Type<F, A>, Type<F, B>>
  filter<B extends A>(this: Fluent1<F, Filterable1<F>, A>, refinement: Refinement<A, B>): Fluent1<F, I, B>
  filter(this: Fluent1<F, Filterable1<F>, A>, predicate: Predicate<A>): Fluent1<F, I, A>
  filterMap<B>(this: Fluent1<F, Filterable1<F>, A>, f: (a: A) => Option<B>): Fluent1<F, I, B>
  partition<B extends A>(
    this: Fluent1<F, Filterable1<F>, A>,
    refinement: Refinement<A, B>
  ): Separated<Type<F, A>, Type<F, B>>
  partition(this: Fluent1<F, Filterable1<F>, A>, predicate: Predicate<A>): Separated<Type<F, A>, Type<F, A>>
  partitionMap<RL, RR>(
    this: Fluent1<F, Filterable1<F>, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Type<F, RL>, Type<F, RR>>
  filterWithIndex<Ix>(this: Fluent1<F, FilterableWithIndex1<F, Ix>, A>, p: (i: Ix, a: A) => boolean): Fluent1<F, I, A>
  filterMapWithIndex<Ix, B>(
    this: Fluent1<F, FilterableWithIndex1<F, Ix>, A>,
    f: (i: Ix, a: A) => Option<B>
  ): Fluent1<F, I, B>
  partitionWithIndex<Ix>(
    this: Fluent1<F, FilterableWithIndex1<F, Ix>, A>,
    p: (i: Ix, a: A) => boolean
  ): Separated<Type<F, A>, Type<F, A>>
  partitionMapWithIndex<Ix, RL, RR>(
    this: Fluent1<F, FilterableWithIndex1<F, Ix>, A>,
    f: (i: Ix, a: A) => Either<RL, RR>
  ): Separated<Type<F, RL>, Type<F, RR>>
}
```

Added in v2.0.0

# Fluent2 (interface)

**Signature**

```ts
export interface Fluent2<F extends URIS2, I, L, A> {
  readonly I: I
  readonly value: Type2<F, L, A>
  show(this: Fluent2<F, Show<Type2<F, L, A>>, L, A>): string
  equals(this: Fluent2<F, Eq<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): boolean
  compare(this: Fluent2<F, Ord<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): Ordering
  concat(this: Fluent2<F, Magma<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): Type2<F, L, A>
  map<B>(this: Fluent2<F, Functor2<F>, L, A>, f: (a: A) => B): Fluent2<F, I, L, B>
  mapWithIndex<Ix, B>(this: Fluent2<F, FunctorWithIndex2<F, Ix>, L, A>, f: (i: Ix, a: A) => B): Fluent2<F, I, L, B>
  bimap<M, B>(this: Fluent2<F, Bifunctor2<F>, L, A>, f: (l: L) => M, g: (a: A) => B): Fluent2<F, I, M, B>
  mapLeft<M>(this: Fluent2<F, Bifunctor2<F>, L, A>, f: (l: L) => M): Fluent2<F, I, M, A>
  ap<B>(this: Fluent2<F, Apply2<F>, L, A>, fab: Type2<F, L, (a: A) => B>): Fluent2<F, I, L, B>
  apFirst<B>(this: Fluent2<F, Apply2<F>, L, A>, that: Type2<F, L, B>): Fluent2<F, I, L, A>
  apSecond<B>(this: Fluent2<F, Apply2<F>, L, A>, that: Type2<F, L, B>): Fluent2<F, I, L, B>
  chain<B>(this: Fluent2<F, Chain2<F>, L, A>, f: (a: A) => Type2<F, L, B>): Fluent2<F, I, L, B>
  flatten<A>(this: Fluent2<F, Chain2<F>, L, Type2<F, L, A>>): Fluent2<F, I, L, A>
  extend<B>(this: Fluent2<F, Extend2<F>, L, A>, f: (fa: Type2<F, L, A>) => B): Fluent2<F, I, L, B>
  duplicate(this: Fluent2<F, Extend2<F>, L, A>): Fluent2<F, I, L, Type2<F, L, A>>
  reduce<B>(this: Fluent2<F, Foldable2<F>, L, A>, b: B, f: (b: B, a: A) => B): B
  foldMap<M>(this: Fluent2<F, Foldable2<F>, L, A>, M: Monoid<M>): (f: (a: A) => M) => M
  reduceRight<B>(this: Fluent2<F, Foldable2<F>, L, A>, b: B, f: (a: A, b: B) => B): B
  reduceWithIndex<Ix, B>(this: Fluent2<F, FoldableWithIndex2<F, Ix>, L, A>, b: B, f: (i: Ix, b: B, a: A) => B): B
  foldMapWithIndex<Ix, M>(this: Fluent2<F, FoldableWithIndex2<F, Ix>, L, A>, M: Monoid<M>): (i: Ix, f: (a: A) => M) => M
  reduceRightWithIndex<Ix, B>(this: Fluent2<F, FoldableWithIndex2<F, Ix>, L, A>, b: B, f: (i: Ix, a: A, b: B) => B): B
  alt(this: Fluent2<F, Alt2<F>, L, A>, that: () => Type2<F, L, A>): Fluent2<F, I, L, A>
  compact<A>(this: Fluent2<F, Compactable2<F>, L, Option<A>>): Fluent2<F, I, L, A>
  separate<A, B>(this: Fluent2<F, Compactable2<F>, L, Either<A, B>>): Separated<Type2<F, L, A>, Type2<F, L, B>>
  filter<B extends A>(this: Fluent2<F, Filterable2<F>, L, A>, refinement: Refinement<A, B>): Fluent2<F, I, L, B>
  filter(this: Fluent2<F, Filterable2<F>, L, A>, predicate: Predicate<A>): Fluent2<F, I, L, A>
  filterMap<B>(this: Fluent2<F, Filterable2<F>, L, A>, f: (a: A) => Option<B>): Fluent2<F, I, L, B>
  partition<B extends A>(
    this: Fluent2<F, Filterable2<F>, L, A>,
    refinement: Refinement<A, B>
  ): Separated<Type2<F, L, A>, Type2<F, L, B>>
  partition(this: Fluent2<F, Filterable2<F>, L, A>, predicate: Predicate<A>): Separated<Type2<F, L, A>, Type2<F, L, A>>
  partitionMap<RL, RR>(
    this: Fluent2<F, Filterable2<F>, L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  filterWithIndex<Ix>(
    this: Fluent2<F, FilterableWithIndex2<F, Ix>, L, A>,
    p: (i: Ix, a: A) => boolean
  ): Fluent2<F, I, L, A>
  filterMapWithIndex<Ix, B>(
    this: Fluent2<F, FilterableWithIndex2<F, Ix>, L, A>,
    f: (i: Ix, a: A) => Option<B>
  ): Fluent2<F, I, L, B>
  partitionWithIndex<Ix>(
    this: Fluent2<F, FilterableWithIndex2<F, Ix>, L, A>,
    p: (i: Ix, a: A) => boolean
  ): Separated<Type2<F, L, A>, Type2<F, L, A>>
  partitionMapWithIndex<Ix, RL, RR>(
    this: Fluent2<F, FilterableWithIndex2<F, Ix>, L, A>,
    f: (i: Ix, a: A) => Either<RL, RR>
  ): Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  promap<H, B>(this: Fluent2<F, Profunctor2<F>, L, A>, f: (h: H) => L, g: (a: A) => B): Fluent2<F, I, H, B>
  compose<B>(this: Fluent2<F, Semigroupoid2<F>, L, A>, that: Type2<F, A, B>): Fluent2<F, I, L, B>
}
```

Added in v2.0.0

# Fluent2C (interface)

**Signature**

```ts
export interface Fluent2C<F extends URIS2, I, L, A> {
  readonly I: I
  readonly value: Type2<F, L, A>
  show(this: Fluent2C<F, Show<Type2<F, L, A>>, L, A>): string
  equals(this: Fluent2C<F, Eq<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): boolean
  compare(this: Fluent2C<F, Ord<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): Ordering
  concat(this: Fluent2C<F, Magma<Type2<F, L, A>>, L, A>, that: Type2<F, L, A>): Type2<F, L, A>
  map<B>(this: Fluent2C<F, Functor2C<F, L>, L, A>, f: (a: A) => B): Fluent2C<F, I, L, B>
  mapWithIndex<Ix, B>(
    this: Fluent2C<F, FunctorWithIndex2C<F, Ix, L>, L, A>,
    f: (i: Ix, a: A) => B
  ): Fluent2C<F, I, L, B>
  bimap<M, B>(this: Fluent2C<F, Bifunctor2C<F, L>, L, A>, f: (l: L) => M, g: (a: A) => B): Fluent2C<F, I, M, B>
  mapLeft<M>(this: Fluent2C<F, Bifunctor2C<F, L>, L, A>, f: (l: L) => M): Fluent2C<F, I, M, A>
  ap<B>(this: Fluent2C<F, Apply2C<F, L>, L, A>, fab: Type2<F, L, (a: A) => B>): Fluent2C<F, I, L, B>
  apFirst<B>(this: Fluent2C<F, Apply2C<F, L>, L, A>, that: Type2<F, L, B>): Fluent2C<F, I, L, A>
  apSecond<B>(this: Fluent2C<F, Apply2C<F, L>, L, A>, that: Type2<F, L, B>): Fluent2C<F, I, L, B>
  chain<B>(this: Fluent2C<F, Chain2C<F, L>, L, A>, f: (a: A) => Type2<F, L, B>): Fluent2C<F, I, L, B>
  flatten<A>(this: Fluent2C<F, Chain2C<F, L>, L, Type2<F, L, A>>): Fluent2C<F, I, L, A>
  extend<B>(this: Fluent2C<F, Extend2C<F, L>, L, A>, f: (fa: Type2<F, L, A>) => B): Fluent2C<F, I, L, B>
  duplicate(this: Fluent2C<F, Extend2C<F, L>, L, A>): Fluent2C<F, I, L, Type2<F, L, A>>
  reduce<B>(this: Fluent2C<F, Foldable2C<F, L>, L, A>, b: B, f: (b: B, a: A) => B): B
  foldMap<M>(this: Fluent2C<F, Foldable2C<F, L>, L, A>, M: Monoid<M>): (f: (a: A) => M) => M
  reduceRight<B>(this: Fluent2C<F, Foldable2C<F, L>, L, A>, b: B, f: (a: A, b: B) => B): B
  reduceWithIndex<Ix, B>(this: Fluent2C<F, FoldableWithIndex2C<F, Ix, L>, L, A>, b: B, f: (i: Ix, b: B, a: A) => B): B
  foldMapWithIndex<Ix, M>(
    this: Fluent2C<F, FoldableWithIndex2C<F, Ix, L>, L, A>,
    M: Monoid<M>
  ): (i: Ix, f: (a: A) => M) => M
  reduceRightWithIndex<Ix, B>(
    this: Fluent2C<F, FoldableWithIndex2C<F, Ix, L>, L, A>,
    b: B,
    f: (i: Ix, a: A, b: B) => B
  ): B
  alt(this: Fluent2C<F, Alt2C<F, L>, L, A>, that: () => Type2<F, L, A>): Fluent2C<F, I, L, A>
  compact<A>(this: Fluent2<F, Compactable2C<F, L>, L, Option<A>>): Fluent2C<F, I, L, A>
  separate<A, B>(this: Fluent2C<F, Compactable2C<F, L>, L, Either<A, B>>): Separated<Type2<F, L, A>, Type2<F, L, B>>
  filter<B extends A>(this: Fluent2C<F, Filterable2C<F, L>, L, A>, refinement: Refinement<A, B>): Fluent2C<F, I, L, B>
  filter(this: Fluent2C<F, Filterable2C<F, L>, L, A>, predicate: Predicate<A>): Fluent2C<F, I, L, A>
  filterMap<B>(this: Fluent2C<F, Filterable2C<F, L>, L, A>, f: (a: A) => Option<B>): Fluent2C<F, I, L, B>
  partition<B extends A>(
    this: Fluent2C<F, Filterable2C<F, L>, L, A>,
    refinement: Refinement<A, B>
  ): Separated<Type2<F, L, A>, Type2<F, L, B>>
  partition(
    this: Fluent2C<F, Filterable2C<F, L>, L, A>,
    predicate: Predicate<A>
  ): Separated<Type2<F, L, A>, Type2<F, L, A>>
  partitionMap<RL, RR>(
    this: Fluent2<F, Filterable2C<F, L>, L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  filterWithIndex<Ix>(
    this: Fluent2C<F, FilterableWithIndex2C<F, Ix, L>, L, A>,
    p: (i: Ix, a: A) => boolean
  ): Fluent2C<F, I, L, A>
  filterMapWithIndex<Ix, B>(
    this: Fluent2C<F, FilterableWithIndex2C<F, Ix, L>, L, A>,
    f: (i: Ix, a: A) => Option<B>
  ): Fluent2<F, I, L, B>
  partitionWithIndex<Ix>(
    this: Fluent2C<F, FilterableWithIndex2C<F, Ix, L>, L, A>,
    p: (i: Ix, a: A) => boolean
  ): Separated<Type2<F, L, A>, Type2<F, L, A>>
  partitionMapWithIndex<Ix, RL, RR>(
    this: Fluent2C<F, FilterableWithIndex2C<F, Ix, L>, L, A>,
    f: (i: Ix, a: A) => Either<RL, RR>
  ): Separated<Type2<F, L, RL>, Type2<F, L, RR>>
  promap<H, B>(this: Fluent2C<F, Profunctor2C<F, L>, L, A>, f: (h: H) => L, g: (a: A) => B): Fluent2<F, I, H, B>
  compose<B>(this: Fluent2C<F, Semigroupoid2C<F, L>, L, A>, Type2: HKT2<F, A, B>): Fluent2C<F, I, L, B>
}
```

Added in v2.0.0

# Fluent (class)

**Signature**

```ts
export class Fluent<F, I, A> {
  constructor(readonly I: I, readonly value: HKT<F, A>) { ... }
  ...
}
```

Added in v2.0.0

## show (method)

**Signature**

```ts
show<I extends Show<HKT<F, A>>>(this: Fluent<F, I, A>): string { ... }
```

## equals (method)

**Signature**

```ts
equals<I extends Eq<HKT<F, A>>>(this: Fluent<F, I, A>, that: HKT<F, A>): boolean { ... }
```

## compare (method)

**Signature**

```ts
compare<I extends Ord<HKT<F, A>>>(this: Fluent<F, I, A>, that: HKT<F, A>): Ordering { ... }
```

## concat (method)

**Signature**

```ts
concat<I extends Magma<HKT<F, A>>>(this: Fluent<F, I, A>, that: HKT<F, A>): HKT<F, A> { ... }
```

## map (method)

**Signature**

```ts
map<I extends Functor<F>, B>(this: Fluent<F, I, A>, f: (a: A) => B): Fluent<F, I, B> { ... }
```

## mapWithIndex (method)

**Signature**

```ts
mapWithIndex<Ix, I extends FunctorWithIndex<F, Ix>, B>(
    this: Fluent<F, I, A>,
    f: (i: Ix, a: A) => B
  ): Fluent<F, I, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<I extends Apply<F>, B>(this: Fluent<F, I, A>, fab: HKT<F, (a: A) => B>): Fluent<F, I, B> { ... }
```

## apFirst (method)

**Signature**

```ts
apFirst<I extends Apply<F>, B>(this: Fluent<F, I, A>, that: HKT<F, B>): Fluent<F, I, A> { ... }
```

## apSecond (method)

**Signature**

```ts
apSecond<I extends Apply<F>, B>(this: Fluent<F, I, A>, that: HKT<F, B>): Fluent<F, I, B> { ... }
```

## chain (method)

**Signature**

```ts
chain<I extends Chain<F>, B>(this: Fluent<F, I, A>, f: (a: A) => HKT<F, B>): Fluent<F, I, B> { ... }
```

## flatten (method)

**Signature**

```ts
flatten<I extends Chain<F>, A>(this: Fluent<F, I, HKT<F, A>>): Fluent<F, I, A> { ... }
```

## extend (method)

**Signature**

```ts
extend<I extends Extend<F>, B>(this: Fluent<F, I, A>, f: (fa: HKT<F, A>) => B): Fluent<F, I, B> { ... }
```

## duplicate (method)

**Signature**

```ts
duplicate<I extends Extend<F>>(this: Fluent<F, I, A>): Fluent<F, I, HKT<F, A>> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<I extends Foldable<F>, B>(this: Fluent<F, I, A>, b: B, f: (b: B, a: A) => B): B { ... }
```

## foldMap (method)

**Signature**

```ts
foldMap<I extends Foldable<F>, M>(this: Fluent<F, I, A>, M: Monoid<M>): (f: (a: A) => M) => M { ... }
```

## reduceRight (method)

**Signature**

```ts
reduceRight<I extends Foldable<F>, B>(this: Fluent<F, I, A>, b: B, f: (a: A, b: B) => B): B { ... }
```

## reduceWithIndex (method)

**Signature**

```ts
reduceWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, B>(
    this: Fluent<F, I, A>,
    b: B,
    f: (i: Ix, b: B, a: A) => B
  ): B { ... }
```

## foldMapWithIndex (method)

**Signature**

```ts
foldMapWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, M>(
    this: Fluent<F, I, A>,
    M: Monoid<M>
  ): (f: (i: Ix, a: A) => M) => M { ... }
```

## reduceRightWithIndex (method)

**Signature**

```ts
reduceRightWithIndex<Ix, I extends FoldableWithIndex<F, Ix>, B>(
    this: Fluent<F, I, A>,
    b: B,
    f: (i: Ix, a: A, b: B) => B
  ): B { ... }
```

## alt (method)

**Signature**

```ts
alt<I extends Alt<F>>(this: Fluent<F, I, A>, that: () => HKT<F, A>): Fluent<F, I, A> { ... }
```

## compact (method)

**Signature**

```ts
compact<I extends Compactable<F>, A>(this: Fluent<F, I, Option<A>>): Fluent<F, I, A> { ... }
```

## separate (method)

**Signature**

```ts
separate<I extends Compactable<F>, A, B>(this: Fluent<F, I, Either<A, B>>): Separated<HKT<F, A>, HKT<F, B>> { ... }
```

## filter (method)

**Signature**

```ts
filter<I extends Filterable<F>>(this: Fluent<F, I, A>, predicate: Predicate<A>): Fluent<F, I, A> { ... }
```

## filterMap (method)

**Signature**

```ts
filterMap<I extends Filterable<F>, B>(this: Fluent<F, I, A>, f: (a: A) => Option<B>): Fluent<F, I, B> { ... }
```

## partition (method)

**Signature**

```ts
partition<I extends Filterable<F>>(this: Fluent<F, I, A>, predicate: Predicate<A>): Separated<HKT<F, A>, HKT<F, A>> { ... }
```

## partitionMap (method)

**Signature**

```ts
partitionMap<I extends Filterable<F>, RL, RR>(
    this: Fluent<F, I, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<HKT<F, RL>, HKT<F, RR>> { ... }
```

## filterWithIndex (method)

**Signature**

```ts
filterWithIndex<Ix, I extends FilterableWithIndex<F, Ix>>(
    this: Fluent<F, I, A>,
    p: (i: Ix, a: A) => boolean
  ): Fluent<F, I, A> { ... }
```

## filterMapWithIndex (method)

**Signature**

```ts
filterMapWithIndex<Ix, I extends FilterableWithIndex<F, Ix>, B>(
    this: Fluent<F, I, A>,
    f: (i: Ix, a: A) => Option<B>
  ): Fluent<F, I, B> { ... }
```

## partitionWithIndex (method)

**Signature**

```ts
partitionWithIndex<Ix, I extends FilterableWithIndex<F, Ix>>(
    this: Fluent<F, I, A>,
    p: (i: Ix, a: A) => boolean
  ): Separated<HKT<F, A>, HKT<F, A>> { ... }
```

## partitionMapWithIndex (method)

**Signature**

```ts
partitionMapWithIndex<Ix, I extends FilterableWithIndex<F, Ix>, RL, RR>(
    this: Fluent<F, I, A>,
    f: (i: Ix, a: A) => Either<RL, RR>
  ): Separated<HKT<F, RL>, HKT<F, RR>> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<I extends Bifunctor<F>, L, M, B>(
    this: { I: I; value: HKT2<F, L, A> },
    f: (l: L) => M,
    g: (a: A) => B
  ): Fluent<F, I, B> { ... }
```

## mapLeft (method)

**Signature**

```ts
mapLeft<I extends Bifunctor<F>, L, M>(this: { I: I; value: HKT2<F, L, A> }, f: (l: L) => M): Fluent<F, I, A> { ... }
```

## promap (method)

**Signature**

```ts
promap<I extends Profunctor<F>, H, L, B>(
    this: { I: I; value: HKT2<F, L, A> },
    f: (h: H) => L,
    g: (a: A) => B
  ): Fluent<F, I, B> { ... }
```

## compose (method)

**Signature**

```ts
compose<I extends Semigroupoid<F>, L, B>(this: { I: I; value: HKT2<F, L, A> }, that: HKT2<F, A, B>): Fluent<F, I, B> { ... }
```

# fluent (function)

**Signature**

```ts
export function fluent<F extends URIS2, I, L>(I: { URI: F; _L: L } & I): <A>(fa: Type2<F, L, A>) => Fluent2C<F, I, L, A>
export function fluent<F extends URIS2, I>(I: { URI: F } & I): <L, A>(fa: Type2<F, L, A>) => Fluent2<F, I, L, A>
export function fluent<F extends URIS, I>(I: { URI: F } & I): <A>(fa: Type<F, A>) => Fluent1<F, I, A>
export function fluent<F, I>(I: { URI: F } & I): <A>(fa: HKT<F, A>) => Fluent<F, I, A> { ... }
```

Added in v2.0.0
