---
id: Either
title: Module Either
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)

# Either

```ts
type Either<L, A> = Left<L, A> | Right<L, A>
```

Added in v1.0.0 (data)

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

## alt

```ts
(fy: Either<L, A>): Either<L, A>
```

Added in v1.0.0 (method)

## ap

```ts
<B>(fab: Either<L, (a: A) => B>): Either<L, B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>
```

Added in v1.0.0 (method)

## bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>
```

Added in v1.0.0 (method)

## chain

```ts
<B>(f: (a: A) => Either<L, B>): Either<L, B>
```

Added in v1.0.0 (method)

Binds the given function across `Right`

## extend

```ts
<B>(f: (ea: Either<L, A>) => B): Either<L, B>
```

Added in v1.0.0 (method)

## filterOrElse

```ts
(p: Predicate<A>, zero: L): Either<L, A>
```

Added in v1.3.0 (method)

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
value, returns `Left` with the existing value of `Left` if this is a `Left`.

```ts
right(12).filterOrElse(n => n > 10, -1) // right(12)
right(7).filterOrElse(n => n > 10, -1) // left(-1)
left(12).filterOrElse(n => n > 10, -1) // left(12)
```

## filterOrElseL

```ts
(p: Predicate<A>, zero: (a: A) => L): Either<L, A>
```

Added in v1.3.0 (method)

Lazy version of [filterOrElse](#filterorelse)

## fold

```ts
<B>(whenLeft: (l: L) => B, whenRight: (a: A) => B): B
```

Added in v1.0.0 (method)

Applies a function to each case in the data structure

## getOrElse

```ts
(a: A): A
```

Added in v1.0.0 (method)

Returns the value from this `Right` or the given argument if this is a `Left`

## getOrElseL

```ts
(f: (l: L) => A): A
```

Added in v1.0.0 (method)

Returns the value from this `Right` or the result of given argument if this is a `Left`

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isLeft

```ts
(): this is Left<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the either is an instance of `Left`, `false` otherwise

## isRight

```ts
(): this is Right<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the either is an instance of `Right`, `false` otherwise

## map

```ts
<B>(f: (a: A) => B): Either<L, B>
```

Added in v1.0.0 (method)

The given function is applied if this is a `Right`

## mapLeft

```ts
<M>(f: (l: L) => M): Either<M, A>
```

Added in v1.0.0 (method)

Maps the left side of the disjunction

## orElse

```ts
<M>(fy: (l: L) => Either<M, A>): Either<M, A>
```

Added in v1.6.0 (method)

Lazy version of [alt](#alt)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## refineOrElse

```ts
<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>
```

Added in v1.6.0 (method)

## refineOrElseL

```ts
<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>
```

Added in v1.6.0 (method)

Lazy version of [refineOrElse](#refineorelse)

## swap

```ts
(): Either<A, L>
```

Added in v1.0.0 (method)

Swaps the disjunction values

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## either

```ts
Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI>
```

Added in v1.0.0 (instance)

## fromNullable

```ts
<L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A>
```

Added in v1.0.0 (function)

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

## fromOption

```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```

Added in v1.0.0 (function)

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
the provided default as a `Left`

## fromOptionL

```ts
<L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A>
```

Added in v1.3.0 (function)

Lazy version of [fromOption](#fromoption)

## fromPredicate

```ts
<L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (a: A): Either<L, A>
```

Added in v1.0.0 (function)

## fromRefinement

```ts
<L, A, B extends A>(refinement: Refinement<A, B>, whenFalse: (a: A) => L) => (
  a: A
): Either<L, B>
```

Added in v1.6.0 (function)

## fromValidation

```ts
<L, A>(fa: Validation<L, A>): Either<L, A>
```

Added in v1.0.0 (function)

## getApplyMonoid

```ts
<L, A>(M: Monoid<A>): Monoid<Either<L, A>>
```

Added in v1.7.0 (function)

## getApplySemigroup

```ts
<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>>
```

Added in v1.7.0 (function)

[Apply](./Apply.md) semigroup

_Example_

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup<string, number>(semigroupSum)
assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepEqual(S.concat(left('a'), right(2)), left('a'))
assert.deepEqual(S.concat(right(1), left('b')), left('b'))
assert.deepEqual(S.concat(right(1), right(2)), right(3))
```

## getCompactable

```ts
getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Compactable](./Compactable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

## getFilterable

```ts
getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Filterable](./Filterable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

## getSemigroup

```ts
<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>>
```

Added in v1.7.0 (function)

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

_Example_

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getSemigroup<string, number>(semigroupSum)
assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepEqual(S.concat(left('a'), right(2)), right(2))
assert.deepEqual(S.concat(right(1), left('b')), right(1))
assert.deepEqual(S.concat(right(1), right(2)), right(3))
```

## getSetoid

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>>
```

Added in v1.0.0 (function)

## getWitherable

```ts
getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>
```

Added in v1.7.0 (function)

Builds [Witherable](./Witherable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

## isLeft

```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the either is an instance of `Left`, `false` otherwise

## isRight

```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the either is an instance of `Right`, `false` otherwise

## left

```ts
<L, A>(l: L): Either<L, A>
```

Added in v1.0.0 (function)

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

## right

Alias of [of](#of)

Added in v1.0.0 (function)

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

## toError

```ts
(e: {}): Error
```

Added in v1.0.0 (function)

Default value for the optional `onerror` argument of `tryCatch`

## tryCatch

```ts
<A>(f: Lazy<A>, onerror: (e: {}) => Error = toError): Either<Error, A>
```

Added in v1.0.0 (function)

Note: `onerror` is typed with `{}` for backward compatibility, however if you are
running typescript@3.0.0+ it is recommended to add an explicit type annotation
leveraging the `unknown` type

```ts
tryCatch(() => ..., (e: unknown) => ...)
```
