---
id: Either
title: Module Either
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)

## either

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L688-L709)

```ts
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = { ... }
```

Added in v1.0.0

# Either

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L61-L61)

```ts
export type Either<L, A> = Left<L, A> | Right<L, A>

export class Left<L, A> {
  constructor(readonly value: L) {}
  ...
}

export class Right<L, A> {
  constructor(readonly value: A) {}
  ...
}
```

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L92-L94)

```ts
alt(fy: Either<L, A>): Either<L, A>  { ... }
```

Added in v1.0.0

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L76-L78)

```ts
ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L82-L84)

```ts
ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>  { ... }
```

Added in v1.0.0

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L89-L91)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>  { ... }
```

Added in v1.0.0

## chain

Binds the given function across `Right`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L86-L88)

```ts
chain<B>(f: (a: A) => Either<L, B>): Either<L, B>  { ... }
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L109-L111)

```ts
extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>  { ... }
```

Added in v1.0.0

## filterOrElse

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the
right value, returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right
value, returns `Left` with the existing value of `Left` if this is a `Left`.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L165-L167)

```ts
filterOrElse(_: Predicate<A>, zero: L): Either<L, A>  { ... }
```

**Example**

```ts
import { right, left } from 'fp-ts/lib/Either'

assert.deepEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
assert.deepEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
assert.deepEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
```

Added in v1.3.0

## filterOrElseL

Lazy version of [filterOrElse](#filterorelse)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L174-L176)

```ts
filterOrElseL(_: Predicate<A>, zero: (a: A) => L): Either<L, A>  { ... }
```

Added in v1.3.0

## fold

Applies a function to each case in the data structure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L116-L118)

```ts
fold<B>(onLeft: (l: L) => B, onRight: (a: A) => B): B  { ... }
```

Added in v1.0.0

## getOrElse

Returns the value from this `Right` or the given argument if this is a `Left`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L120-L122)

```ts
getOrElse(a: A): A  { ... }
```

Added in v1.0.0

## getOrElseL

Returns the value from this `Right` or the result of given argument if this is a `Left`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L124-L126)

```ts
getOrElseL(f: (l: L) => A): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L131-L133)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L138-L140)

```ts
isLeft(): this is Left<L, A>  { ... }
```

Added in v1.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L142-L144)

```ts
isRight(): this is Right<L, A>  { ... }
```

Added in v1.0.0

## map

The given function is applied if this is a `Right`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L73-L75)

```ts
map<B>(f: (a: A) => B): Either<L, B>  { ... }
```

Added in v1.0.0

## mapLeft

Maps the left side of the disjunction

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L128-L130)

```ts
mapLeft<M>(f: (l: L) => M): Either<M, A>  { ... }
```

Added in v1.0.0

## orElse

Lazy version of [alt](#alt)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L106-L108)

```ts
orElse<M>(fy: (l: L) => Either<M, A>): Either<M, A>  { ... }
```

**Example**

```ts
import { right } from 'fp-ts/lib/Either'

assert.deepEqual(right(1).orElse(() => right(2)), right(1))
```

Added in v1.6.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L112-L114)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## ~~refineOrElse~~ (deprecated)

Use [filterOrElse](#filterorelse) instead

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L182-L184)

```ts
refineOrElse<B extends A>(p: Refinement<A, B>, zero: L): Either<L, B>  { ... }
```

Added in v1.6.0

## ~~refineOrElseL~~ (deprecated)

Lazy version of [refineOrElse](#refineorelse)
Use [filterOrElseL](#filterorelsel) instead

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L191-L193)

```ts
refineOrElseL<B extends A>(p: Refinement<A, B>, zero: (a: A) => L): Either<L, B>  { ... }
```

Added in v1.6.0

## swap

Swaps the disjunction values

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L146-L148)

```ts
swap(): Either<A, L>  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L134-L136)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## fromNullable

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L475-L477)

```ts
export const fromNullable = <L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A> => { ... }
```

Added in v1.0.0

## fromOption

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use
the provided default as a `Left`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L456-L458)

```ts
export const fromOption = <L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A> => { ... }
```

Added in v1.0.0

## fromOptionL

Lazy version of [fromOption](#fromoption)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L465-L467)

```ts
export const fromOptionL = <L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A> => { ... }
```

Added in v1.3.0

## fromPredicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L434-L436)

```ts
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>  { ... }
```

Added in v1.0.0

## ~~fromRefinement~~ (deprecated)

Use [fromPredicate](#frompredicate) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L444-L448)

```ts
export const fromRefinement = <L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L) => (
  a: A
): Either<L, B> => { ... }
```

Added in v1.6.0

## fromValidation

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L518-L520)

```ts
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => { ... }
```

Added in v1.0.0

## getApplyMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L337-L342)

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<Either<L, A>> => { ... }
```

Added in v1.7.0

## getApplySemigroup

[Apply](./Apply.md) semigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L327-L331)

```ts
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => { ... }
```

**Example**

```ts
import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup<string, number>(semigroupSum)
assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepEqual(S.concat(left('a'), right(2)), left('a'))
assert.deepEqual(S.concat(right(1), left('b')), left('b'))
assert.deepEqual(S.concat(right(1), right(2)), right(3))
```

Added in v1.7.0

## getCompactable

Builds [Compactable](./Compactable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L545-L580)

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L>  { ... }
```

Added in v1.7.0

## getFilterable

Builds [Filterable](./Filterable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L587-L648)

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L>  { ... }
```

Added in v1.7.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L305-L309)

```ts
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<Either<L, A>> => { ... }
```

**Example**

```ts
import { getSemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getSemigroup<string, number>(semigroupSum)
assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepEqual(S.concat(left('a'), right(2)), right(2))
assert.deepEqual(S.concat(right(1), left('b')), right(1))
assert.deepEqual(S.concat(right(1), right(2)), right(3))
```

Added in v1.7.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L281-L286)

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>> => { ... }
```

Added in v1.0.0

## getWitherable

Builds [Witherable](./Witherable.md) instance for [Either](./Either.md) given [Monoid](./Monoid.md) for the left side

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L655-L682)

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L>  { ... }
```

Added in v1.7.0

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L527-L529)

```ts
export const isLeft = <L, A>(fa: Either<L, A>): fa is Left<L, A> => { ... }
```

Added in v1.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L536-L538)

```ts
export const isRight = <L, A>(fa: Either<L, A>): fa is Right<L, A> => { ... }
```

Added in v1.0.0

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L412-L414)

```ts
export const left = <L, A>(l: L): Either<L, A> => { ... }
```

Added in v1.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure
Alias of [of](#of)

Added in v1.0.0

## toError

Default value for the optional `onerror` argument of `tryCatch`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L484-L490)

```ts
export const toError = (e: unknown): Error => { ... }
```

Added in v1.0.0

## ~~tryCatch~~ (deprecated)

Use [tryCatch2v](#trycatch2v)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L498-L500)

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (e: unknown) => Error = toError): Either<Error, A> => { ... }
```

Added in v1.0.0

## tryCatch2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L506-L512)

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (e: unknown) => L): Either<L, A> => { ... }
```

Added in v1.11.0
