---
title: Strong.ts
nav_order: 95
parent: Modules
---

## Strong overview

The `Strong` class extends `Profunctor` with combinators for working with product types.

`first` and `second` lift values in a `Profunctor` to act on the first and second components of a tuple,
respectively.

Another way to think about Strong is to piggyback on the intuition of
inputs and outputs. Rewriting the type signature in this light then yields:

```purescript
first ::  forall input output a. p input output -> p (Tuple input a) (Tuple output a)
second :: forall input output a. p input output -> p (Tuple a input) (Tuple a output)
```

If we specialize the profunctor p to the function arrow, we get the following type
signatures, which may look a bit more familiar:

```purescript
first ::  forall input output a. (input -> output) -> (Tuple input a) -> (Tuple output a)
second :: forall input output a. (input -> output) -> (Tuple a input) -> (Tuple a output)
```

So, when the `profunctor` is `Function` application, `first` essentially applies your function
to the first element of a tuple, and `second` applies it to the second element (same as `map` would do).

Adapted from https://github.com/purescript/purescript-profunctor/blob/master/src/Data/Profunctor/Strong.purs

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Strong (interface)](#strong-interface)
  - [Strong2 (interface)](#strong2-interface)
  - [Strong3 (interface)](#strong3-interface)
  - [Strong4 (interface)](#strong4-interface)
- [utils](#utils)
  - [fanOut](#fanout)
  - [split](#split)

---

# type classes

## Strong (interface)

**Signature**

```ts
export interface Strong<P> extends Profunctor<P> {
  readonly first: <A, B, C>(pab: HKT2<P, A, B>) => HKT2<P, readonly [A, C], readonly [B, C]>
  readonly second: <B, C, A>(pab: HKT2<P, B, C>) => HKT2<P, readonly [A, B], readonly [A, C]>
}
```

Added in v3.0.0

## Strong2 (interface)

**Signature**

```ts
export interface Strong2<P extends URIS2> extends Profunctor2<P> {
  readonly first: <A, B, C>(pab: Kind2<P, A, B>) => Kind2<P, readonly [A, C], readonly [B, C]>
  readonly second: <B, C, A>(pab: Kind2<P, B, C>) => Kind2<P, readonly [A, B], readonly [A, C]>
}
```

Added in v3.0.0

## Strong3 (interface)

**Signature**

```ts
export interface Strong3<P extends URIS3> extends Profunctor3<P> {
  readonly first: <R, A, B, C>(pab: Kind3<P, R, A, B>) => Kind3<P, R, readonly [A, C], readonly [B, C]>
  readonly second: <R, B, C, A>(pab: Kind3<P, R, B, C>) => Kind3<P, R, readonly [A, B], readonly [A, C]>
}
```

Added in v3.0.0

## Strong4 (interface)

**Signature**

```ts
export interface Strong4<P extends URIS4> extends Profunctor4<P> {
  readonly first: <S, R, A, B, C>(pab: Kind4<P, S, R, A, B>) => Kind4<P, S, R, readonly [A, C], readonly [B, C]>
  readonly second: <S, R, B, C, A>(pab: Kind4<P, S, R, B, C>) => Kind4<P, S, R, readonly [A, B], readonly [A, C]>
}
```

Added in v3.0.0

# utils

## fanOut

Compose a value which introduces a tuple from two values, each introducing one side of the tuple.

This combinator is useful when assembling values from smaller components, because it provides a way to support two
different types of output.

Specializing `fanOut` to function application would look like this:

```purescript
fanOut :: forall a b c. (a -> b) -> (a -> c) -> (a -> (Tuple b c))
```

We take two functions, `f` and `g`, with the same parameter type and we transform them into a single function which
takes one parameter and returns a tuple of the results of running `f` and `g` on the parameter, respectively. This
allows us to run two parallel computations on the same input and return both results in a tuple.

**Signature**

```ts
export declare function fanOut<F extends URIS4>(
  S: Strong4<F>,
  C: Category4<F>
): <S, R, A, B, C>(pab: Kind4<F, S, R, A, B>, pac: Kind4<F, S, R, A, C>) => Kind4<F, S, R, A, readonly [B, C]>
export declare function fanOut<F extends URIS3>(
  S: Strong3<F>,
  C: Category3<F>
): <R, A, B, C>(pab: Kind3<F, R, A, B>, pac: Kind3<F, R, A, C>) => Kind3<F, R, A, readonly [B, C]>
export declare function fanOut<F extends URIS2>(
  S: Strong2<F>,
  C: Category2<F>
): <A, B, C>(pab: Kind2<F, A, B>, pac: Kind2<F, A, C>) => Kind2<F, A, readonly [B, C]>
export declare function fanOut<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, readonly [B, C]>
```

Added in v3.0.0

## split

Compose a value acting on a tuple from two values, each acting on one of the components of the tuple.

Specializing `split` to function application would look like this:

```purescript
split :: forall a b c d. (a -> b) -> (c -> d) -> (Tuple a c) -> (Tuple b d)
```

We take two functions, `f` and `g`, and we transform them into a single function which takes a tuple and maps `f`
over the first element and `g` over the second. Just like `bi-map` would do for the `bi-functor` instance of tuple.

**Signature**

```ts
export declare function split<F extends URIS4>(
  S: Strong4<F>,
  C: Category4<F>
): <S, R, A, B, C, D>(
  pab: Kind4<F, S, R, A, B>,
  pcd: Kind4<F, S, R, C, D>
) => Kind4<F, S, R, readonly [A, C], readonly [B, D]>
export declare function split<F extends URIS3>(
  S: Strong3<F>,
  C: Category3<F>
): <R, A, B, C, D>(pab: Kind3<F, R, A, B>, pcd: Kind3<F, R, C, D>) => Kind3<F, R, readonly [A, C], readonly [B, D]>
export declare function split<F extends URIS2>(
  S: Strong2<F>,
  C: Category2<F>
): <A, B, C, D>(pab: Kind2<F, A, B>, pcd: Kind2<F, C, D>) => Kind2<F, readonly [A, C], readonly [B, D]>
export declare function split<F>(
  S: Strong<F>,
  C: Category<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, readonly [A, C], readonly [B, D]>
```

Added in v3.0.0
