---
id: Strong
title: Module Strong
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Strong.ts)

# Strong

```ts
interface Strong<F> extends Profunctor<F> {
  readonly first: <A, B, C>(pab: HKT2<F, A, B>) => HKT2<F, [A, C], [B, C]>
  readonly second: <A, B, C>(pab: HKT2<F, B, C>) => HKT2<F, [A, B], [A, C]>
}
```

Added in v1.11.0 (type class)

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

## fanout

```ts
fanout<F>(
  F: Category<F> & Strong<F>
): <A, B, C>(pab: HKT2<F, A, B>, pac: HKT2<F, A, C>) => HKT2<F, A, [B, C]>
```

Added in v1.11.0 (function)

Compose a value which introduces a tuple from two values, each introducing one side of the tuple.

This combinator is useful when assembling values from smaller components, because it provides a way to support two
different types of output.

Specializing `(&&&)` to function application would look like this:

```purescript
(&&&) :: forall a b c. (a -> b) -> (a -> c) -> (a -> (Tuple b c))
```

We take two functions, `f` and `g`, with the same parameter type and we transform them into a single function which
takes one parameter and returns a tuple of the results of running `f` and `g` on the parameter, respectively. This
allows us to run two parallel computations on the same input and return both results in a tuple.

## splitStrong

```ts
splitStrong<F>(
  F: Category<F> & Strong<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, [A, C], [B, D]>
```

Added in v1.11.0 (function)

Compose a value acting on a tuple from two values, each acting on one of the components of the tuple.

Specializing `(***)` to function application would look like this:

```purescript
(***) :: forall a b c d. (a -> b) -> (c -> d) -> (Tuple a c) -> (Tuple b d)
```

We take two functions, `f` and `g`, and we transform them into a single function which takes a tuple and maps `f`
over the first element and `g` over the second. Just like `bi-map` would do for the `bi-functor` instance of tuple.
