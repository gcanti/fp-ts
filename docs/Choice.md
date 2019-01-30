---
id: Choice
title: Module Choice
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Choice.ts)

# Choice

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Choice.ts#L38-L41)

```ts
export interface Choice<F> extends Profunctor<F> {
  readonly left: <A, B, C>(pab: HKT2<F, A, B>) => HKT2<F, Either<A, C>, Either<B, C>>
  readonly right: <A, B, C>(pbc: HKT2<F, B, C>) => HKT2<F, Either<A, B>, Either<A, C>>
}
```

The `Choice` class extends `Profunctor` with combinators for working with
sum types.

`left` and `right` lift values in a `Profunctor` to act on the `Left` and
`Right` components of a sum, respectively.

Looking at `Choice` through the intuition of inputs and outputs
yields the following type signature:

```purescript
left ::  forall input output a. p input output -> p (Either input a) (Either output a)
right :: forall input output a. p input output -> p (Either a input) (Either a output)
```

If we specialize the profunctor `p` to the `function` arrow, we get the following type
signatures:

```purescript
left ::  forall input output a. (input -> output) -> (Either input a) -> (Either output a)
right :: forall input output a. (input -> output) -> (Either a input) -> (Either a output)
```

When the `profunctor` is `Function` application, `left` allows you to map a function over the
left side of an `Either`, and `right` maps it over the right side (same as `map` would do).

Added in v1.11.0

## fanin

Compose a value which eliminates a sum from two values, each eliminating
one side of the sum.

This combinator is useful when assembling values from smaller components,
because it provides a way to support two different types of input.

Specializing `(|||)` to function application would look like this:

```purescript
(|||) :: forall a b c d. (a -> c) -> (b -> c) -> Either a b -> c
```

We take two functions, `f` and `g`, which both return the same type `c` and we transform them into a
single function which takes an `Either` value with the parameter type of `f` on the left side and
the parameter type of `g` on the right side. The function then runs either `f` or `g`, depending on
whether the `Either` value is a `Left` or a `Right`.
This allows us to bundle two different computations which both have the same result type into one
function which will run the approriate computation based on the parameter supplied in the `Either` value.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Choice.ts#L124-L135)

```ts
export function fanin<F>(
  F: Category<F> & Choice<F>
): <A, B, C>(pac: HKT2<F, A, C>, pbc: HKT2<F, B, C>) => HKT2<F, Either<A, B>, C>  { ... }
```

Added in v1.11.0

## splitChoice

Compose a value acting on a sum from two values, each acting on one of
the components of the sum.

Specializing `(+++)` to function application would look like this:

```purescript
(+++) :: forall a b c d. (a -> b) -> (c -> d) -> (Either a c) -> (Either b d)
```

We take two functions, `f` and `g`, and we transform them into a single function which
takes an `Either`and maps `f` over the left side and `g` over the right side. Just like
`bi-map` would do for the `bi-functor` instance of `Either`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Choice.ts#L83-L91)

```ts
export function splitChoice<F>(
  F: Category<F> & Choice<F>
): <A, B, C, D>(pab: HKT2<F, A, B>, pcd: HKT2<F, C, D>) => HKT2<F, Either<A, C>, Either<B, D>>  { ... }
```

Added in v1.11.0
