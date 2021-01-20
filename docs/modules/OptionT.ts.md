---
title: OptionT.ts
nav_order: 59
parent: Modules
---

## OptionT overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [OptionT (interface)](#optiont-interface)
  - [OptionT1 (type alias)](#optiont1-type-alias)
  - [OptionT2 (type alias)](#optiont2-type-alias)
- [utils](#utils)
  - [OptionM (interface)](#optionm-interface)
  - [OptionM1 (interface)](#optionm1-interface)
  - [OptionM2 (interface)](#optionm2-interface)
  - [OptionM2C (interface)](#optionm2c-interface)
  - [alt\_](#alt_)
  - [ap\_](#ap_)
  - [chain\_](#chain_)
  - [fold\_](#fold_)
  - [fromEither\_](#fromeither_)
  - [fromF\_](#fromf_)
  - [fromNullable\_](#fromnullable_)
  - [fromPredicate\_](#frompredicate_)
  - [getOptionM](#getoptionm)
  - [getOrElse\_](#getorelse_)
  - [map\_](#map_)
  - [none\_](#none_)
  - [some\_](#some_)

---

# model

## OptionT (interface)

**Signature**

```ts
export interface OptionT<M, A> extends HKT<M, Option<A>> {}
```

Added in v2.0.0

## OptionT1 (type alias)

**Signature**

```ts
export type OptionT1<M extends URIS, A> = Kind<M, Option<A>>
```

Added in v2.0.0

## OptionT2 (type alias)

**Signature**

```ts
export type OptionT2<M extends URIS2, E, A> = Kind2<M, E, Option<A>>
```

Added in v2.0.0

# utils

## OptionM (interface)

**Signature**

```ts
export interface OptionM<M> extends ApplicativeCompositionHKT1<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly alt: <A>(fa: OptionT<M, A>, that: Lazy<OptionT<M, A>>) => OptionT<M, A>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, R>>, onSome: (a: A) => HKT<M, R>) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, onNone: Lazy<HKT<M, A>>) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly none: <A = never>() => OptionT<M, A>
}
```

Added in v2.0.0

## OptionM1 (interface)

**Signature**

```ts
export interface OptionM1<M extends URIS> extends ApplicativeComposition11<M, O.URI> {
  readonly chain: <A, B>(ma: OptionT1<M, A>, f: (a: A) => OptionT1<M, B>) => OptionT1<M, B>
  readonly alt: <A>(fa: OptionT1<M, A>, that: Lazy<OptionT1<M, A>>) => OptionT1<M, A>
  readonly fold: <A, R>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, R>>, onSome: (a: A) => Kind<M, R>) => Kind<M, R>
  readonly getOrElse: <A>(ma: OptionT1<M, A>, onNone: Lazy<Kind<M, A>>) => Kind<M, A>
  readonly fromM: <A>(ma: Kind<M, A>) => OptionT1<M, A>
  readonly none: <A = never>() => OptionT1<M, A>
}
```

Added in v2.0.0

## OptionM2 (interface)

**Signature**

```ts
export interface OptionM2<M extends URIS2> extends ApplicativeComposition21<M, O.URI> {
  readonly chain: <E, A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <E, A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <E, A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <E, A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <E, A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <E = never, A = never>() => OptionT2<M, E, A>
}
```

Added in v2.0.0

## OptionM2C (interface)

**Signature**

```ts
export interface OptionM2C<M extends URIS2, E> extends ApplicativeComposition2C1<M, O.URI, E> {
  readonly chain: <A, B>(ma: OptionT2<M, E, A>, f: (a: A) => OptionT2<M, E, B>) => OptionT2<M, E, B>
  readonly alt: <A>(fa: OptionT2<M, E, A>, that: Lazy<OptionT2<M, E, A>>) => OptionT2<M, E, A>
  readonly fold: <A, R>(
    ma: OptionT2<M, E, A>,
    onNone: Lazy<Kind2<M, E, R>>,
    onSome: (a: A) => Kind2<M, E, R>
  ) => Kind2<M, E, R>
  readonly getOrElse: <A>(ma: OptionT2<M, E, A>, onNone: Lazy<Kind2<M, E, A>>) => Kind2<M, E, A>
  readonly fromM: <A>(ma: Kind2<M, E, A>) => OptionT2<M, E, A>
  readonly none: <A = never>() => OptionT2<M, E, A>
}
```

Added in v2.2.0

## alt\_

**Signature**

```ts
export declare function alt_<M extends URIS>(
  M: Monad1<M>
): <A>(second: Lazy<Kind<M, Option<A>>>) => (first: Kind<M, Option<A>>) => Kind<M, Option<A>>
export declare function alt_<M>(
  M: Monad<M>
): <A>(second: Lazy<HKT<M, Option<A>>>) => (first: HKT<M, Option<A>>) => HKT<M, Option<A>>
```

Added in v2.10.0

## ap\_

**Signature**

```ts
export declare function ap_<F extends URIS>(
  F: Apply1<F>
): <A>(fa: Kind<F, Option<A>>) => <B>(fab: Kind<F, Option<(a: A) => B>>) => Kind<F, Option<B>>
export declare function ap_<F>(
  F: Apply<F>
): <A>(fa: HKT<F, Option<A>>) => <B>(fab: HKT<F, Option<(a: A) => B>>) => HKT<F, Option<B>>
```

Added in v2.10.0

## chain\_

**Signature**

```ts
export declare function chain_<M extends URIS>(
  M: Monad1<M>
): <A, B>(f: (a: A) => Kind<M, Option<B>>) => (ma: Kind<M, Option<A>>) => Kind<M, Option<B>>
export declare function chain_<M>(
  M: Monad<M>
): <A, B>(f: (a: A) => HKT<M, Option<B>>) => (ma: HKT<M, Option<A>>) => HKT<M, Option<B>>
```

Added in v2.10.0

## fold\_

**Signature**

```ts
export declare function fold_<M extends URIS>(
  M: Monad1<M>
): <B, A>(onNone: () => Kind<M, B>, onSome: (a: A) => Kind<M, B>) => (ma: Kind<M, Option<A>>) => Kind<M, B>
export declare function fold_<M>(
  M: Monad<M>
): <B, A>(onNone: () => HKT<M, B>, onSome: (a: A) => HKT<M, B>) => (ma: HKT<M, Option<A>>) => HKT<M, B>
```

Added in v2.10.0

## fromEither\_

**Signature**

```ts
export declare function fromEither_<F extends URIS>(F: Pointed1<F>): <E, A>(e: Either<E, A>) => Kind<F, Option<A>>
export declare function fromEither_<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>>
```

Added in v2.10.0

## fromF\_

**Signature**

```ts
export declare function fromF_<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export declare function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
```

Added in v2.10.0

## fromNullable\_

**Signature**

```ts
export declare function fromNullable_<F extends URIS>(
  F: Pointed1<F>
): <A>(fa: Kind<F, A>) => Kind<F, Option<NonNullable<A>>>
export declare function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>>
```

Added in v2.10.0

## fromPredicate\_

**Signature**

```ts
export declare function fromPredicate_<F extends URIS>(
  F: Pointed1<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Kind<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => Kind<F, Option<A>>
}
export declare function fromPredicate_<F>(
  F: Pointed<F>
): {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => HKT<F, Option<B>>
  <A>(predicate: Predicate<A>): (a: A) => HKT<F, Option<A>>
}
```

Added in v2.10.0

## getOptionM

**Signature**

```ts
export declare function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export declare function getOptionM<M extends URIS2, E>(M: Monad2C<M, E>): OptionM2C<M, E>
export declare function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export declare function getOptionM<M>(M: Monad<M>): OptionM<M>
```

Added in v2.0.0

## getOrElse\_

**Signature**

```ts
export declare function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export declare function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
```

Added in v2.10.0

## map\_

**Signature**

```ts
export declare function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export declare function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
```

Added in v2.10.0

## none\_

**Signature**

```ts
export declare function none_<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export declare function none_<F>(F: Pointed<F>): HKT<F, Option<never>>
```

Added in v2.10.0

## some\_

**Signature**

```ts
export declare function some_<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export declare function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
```

Added in v2.10.0
