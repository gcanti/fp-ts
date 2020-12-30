---
title: OptionT.ts
nav_order: 51
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [alt\_](#alt_)
  - [ap\_](#ap_)
  - [chain\_](#chain_)
  - [fold\_](#fold_)
  - [fromEither\_](#fromeither_)
  - [fromF\_](#fromf_)
  - [fromNullable\_](#fromnullable_)
  - [fromPredicate\_](#frompredicate_)
  - [getOrElse\_](#getorelse_)
  - [map\_](#map_)
  - [none\_](#none_)
  - [some\_](#some_)

---

# utils

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

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

Added in v3.0.0

## fromEither\_

**Signature**

```ts
export declare function fromEither_<F extends URIS>(F: Pointed1<F>): <E, A>(e: Either<E, A>) => Kind<F, Option<A>>
export declare function fromEither_<F>(F: Pointed<F>): <E, A>(e: Either<E, A>) => HKT<F, Option<A>>
```

Added in v3.0.0

## fromF\_

**Signature**

```ts
export declare function fromF_<F extends URIS>(F: Functor1<F>): <A>(ma: Kind<F, A>) => Kind<F, Option<A>>
export declare function fromF_<F>(F: Functor<F>): <A>(ma: HKT<F, A>) => HKT<F, Option<A>>
```

Added in v3.0.0

## fromNullable\_

**Signature**

```ts
export declare function fromNullable_<F extends URIS>(
  F: Pointed1<F>
): <A>(fa: Kind<F, A>) => Kind<F, Option<NonNullable<A>>>
export declare function fromNullable_<F>(F: Pointed<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<NonNullable<A>>>
```

Added in v3.0.0

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

Added in v3.0.0

## getOrElse\_

**Signature**

```ts
export declare function getOrElse_<M extends URIS>(
  M: Monad1<M>
): <A>(onNone: Lazy<Kind<M, A>>) => (fa: Kind<M, Option<A>>) => Kind<M, A>
export declare function getOrElse_<M>(M: Monad<M>): <A>(onNone: Lazy<HKT<M, A>>) => (fa: HKT<M, Option<A>>) => HKT<M, A>
```

Added in v3.0.0

## map\_

**Signature**

```ts
export declare function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Option<A>>) => Kind<F, Option<B>>
export declare function map_<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, Option<A>>) => HKT<F, Option<B>>
```

Added in v3.0.0

## none\_

**Signature**

```ts
export declare function none_<F extends URIS>(F: Pointed1<F>): Kind<F, Option<never>>
export declare function none_<F>(F: Pointed<F>): HKT<F, Option<never>>
```

Added in v3.0.0

## some\_

**Signature**

```ts
export declare function some_<F extends URIS>(F: Pointed1<F>): <A>(a: A) => Kind<F, Option<A>>
export declare function some_<F>(F: Pointed<F>): <A>(a: A) => HKT<F, Option<A>>
```

Added in v3.0.0
