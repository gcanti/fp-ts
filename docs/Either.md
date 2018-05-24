---
id: Either
title: Module Either
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)

## Data

### Either

_data_

_since 1.0.0_

_Signature_

```ts
type Either<L, A> = Left<L, A> | Right<L, A>
```

_Description_

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.

```ts
const parse = (errorMessage: string) => (input: string): Either<string, number> => {
  const n = parseInt(input, 10)
  return isNaN(n) ? left(errorMessage) : right(n)
}
```

`Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
operations like `map`, `chain`, ... return the `Left` value unchanged:

```ts
right(12).map(double) // right(24)
left(23).map(double) // left(23)
```

## Methods

### alt

_method_

_since 1.0.0_

_Signature_

```ts
(fy: Either<L, A>): Either<L, A>
```

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Either<L, (a: A) => B>): Either<L, B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>
```

### bimap

_method_

_since 1.0.0_

_Signature_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Either<L, B>): Either<L, B>
```

_Description_

Binds the given function across `Right`

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (ea: Either<L, A>) => B): Either<L, B>
```

### filterOrElse

_method_

_since 1.3.0_

_Signature_

```ts
(p: Predicate<A>, zero: L): Either<L, A>
```

_Description_

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
value, returns `Left` with the existing value of `Left` if this is a `Left`.

```ts
right(12).filterOrElse(n => n > 10, -1) // right(12)
right(7).filterOrElse(n => n > 10, -1) // left(-1)
left(12).filterOrElse(n => n > 10, -1) // left(12)
```

### filterOrElseL

_method_

_since 1.3.0_

_Signature_

```ts
(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
```

_Description_

Lazy version of [filterOrElse](#filterorelse)

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<B>(whenLeft: (l: L) => B, whenRight: (a: A) => B): B
```

_Description_

Applies a function to each case in the data structure

### getOrElse

_method_

_since 1.0.0_

_Signature_

```ts
(a: A): A
```

_Description_

Returns the value from this `Right` or the given argument if this is a `Left`

### getOrElseL

_method_

_since 1.0.0_

_Signature_

```ts
(f: (l: L) => A): A
```

_Description_

Returns the value from this `Right` or the result of given argument if this is a `Left`

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isLeft

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Left<L, A>
```

_Description_

Returns `true` if the either is an instance of `Left`, `false` otherwise

### isRight

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Right<L, A>
```

_Description_

Returns `true` if the either is an instance of `Right`, `false` otherwise

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Either<L, B>
```

_Description_

The given function is applied if this is a `Right`

### mapLeft

_method_

_since 1.0.0_

_Signature_

```ts
<M>(f: (l: L) => M): Either<M, A>
```

_Description_

Maps the left side of the disjunction

### orElse

_method_

_since 1.6.0_

_Signature_

```ts
<M>(fy: (l: L) => Either<M, A>): Either<M, A>
```

_Description_

Lazy version of [alt](#alt)

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### refineOrElse

_method_

_since 1.6.0_

_Signature_

```ts
<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
```

### refineOrElseL

_method_

_since 1.6.0_

_Signature_

```ts
<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
```

_Description_

Lazy version of [refineOrElse](#refineorelse)

### swap

_method_

_since 1.0.0_

_Signature_

```ts
(): Either<A, L>
```

_Description_

Swaps the disjunction values

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

## Instances

### either

_instance_

_since 1.0.0_

_Signature_

```ts
Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI>
```

## Functions

### fromNullable

_function_

_since 1.0.0_

_Signature_

```ts
<L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A>
```

_Description_

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

### fromOption

_function_

_since 1.0.0_

_Signature_

```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```

_Description_

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
the provided default as a `Left`

### fromOptionL

_function_

_since 1.3.0_

_Signature_

```ts
<L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A>
```

_Description_

Lazy version of `fromOption`

### fromPredicate

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (a: A): Either<L, A>
```

### fromRefinement

_function_

_since 1.6.0_

_Signature_

```ts
<L, A, B extends A>(refinement: Refinement<A, B>, whenFalse: (a: A) => L) => (
  a: A
): Either<L, B>
```

### fromValidation

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Validation<L, A>): Either<L, A>
```

### getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>>
```

### isLeft

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```

_Description_

Returns `true` if the either is an instance of `Left`, `false` otherwise

### isRight

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```

_Description_

Returns `true` if the either is an instance of `Right`, `false` otherwise

### left

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(l: L): Either<L, A>
```

_Description_

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

### right

_function_

_since 1.0.0_
Alias of

_Signature_

```ts
of
```

_Description_

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

### toError

_function_

_since 1.0.0_

_Signature_

```ts
(e: {}): Error
```

_Description_

Default value for the optional `onerror` argument of `tryCatch`

### tryCatch

_function_

_since 1.0.0_

_Signature_

```ts
<A>(f: Lazy<A>, onerror: (e: {}) => Error = toError): Either<Error, A>
```
