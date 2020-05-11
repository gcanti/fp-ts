---
title: Either.ts
nav_order: 25
parent: Modules
---

# Either overview

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.

```ts
import { Either, left, right } from 'fp-ts/lib/Either'

function parse(input: string): Either<Error, number> {
  const n = parseInt(input, 10)
  return isNaN(n) ? left(new Error('not a number')) : right(n)
}
```

`Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
operations like `map`, `chain`, ... return the `Left` value unchanged:

```ts
import { map, left, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

pipe(right(12), map(double)) // right(24)
pipe(left(23), map(double)) // left(23)
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Left (interface)](#left-interface)
- [Right (interface)](#right-interface)
- [Either (type alias)](#either-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [bimap](#bimap)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainW](#chainw)
- [duplicate](#duplicate)
- [either](#either)
- [elem](#elem)
- [exists](#exists)
- [extend](#extend)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fold](#fold)
- [foldMap](#foldmap)
- [fromNullable](#fromnullable)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getEq](#geteq)
- [getOrElse](#getorelse)
- [getOrElseW](#getorelsew)
- [getSemigroup](#getsemigroup)
- [getShow](#getshow)
- [getValidation](#getvalidation)
- [getValidationMonoid](#getvalidationmonoid)
- [getValidationSemigroup](#getvalidationsemigroup)
- [getWitherable](#getwitherable)
- [isLeft](#isleft)
- [isRight](#isright)
- [left](#left)
- [map](#map)
- [mapLeft](#mapleft)
- [orElse](#orelse)
- [parseJSON](#parsejson)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [right](#right)
- [stringifyJSON](#stringifyjson)
- [swap](#swap)
- [toError](#toerror)
- [tryCatch](#trycatch)

---

# Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v2.0.0

# Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v2.0.0

# Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export declare const URI: 'Either'
```

Added in v2.0.0

# alt

**Signature**

```ts
export declare const alt: <E, A>(that: () => Either<E, A>) => (fa: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B>
```

Added in v2.0.0

# chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

# chainW

**Signature**

```ts
export declare const chainW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, B>
```

Added in v2.6.0

# duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

Added in v2.0.0

# either

**Signature**

```ts
export declare const either: Monad2<'Either'> &
  Foldable2<'Either'> &
  Traversable2<'Either'> &
  Bifunctor2<'Either'> &
  Alt2<'Either'> &
  Extend2<'Either'> &
  ChainRec2<'Either'> &
  MonadThrow2<'Either'>
```

Added in v2.0.0

# elem

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean
```

Added in v2.0.0

# exists

Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean
```

**Example**

```ts
import { exists, left, right } from 'fp-ts/lib/Either'

const gt2 = exists((n: number) => n > 2)

assert.strictEqual(gt2(left('a')), false)
assert.strictEqual(gt2(right(1)), false)
assert.strictEqual(gt2(right(3)), true)
```

Added in v2.0.0

# extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (fa: Either<E, A>) => B) => (ma: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
}
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A>
```

Added in v2.0.0

# fold

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare function fold<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B): (ma: Either<E, A>) => B
```

**Example**

```ts
import { fold, left, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

function onLeft(errors: Array<string>): string {
  return `Errors: ${errors.join(', ')}`
}

function onRight(value: number): string {
  return `Ok: ${value}`
}

assert.strictEqual(pipe(right(1), fold(onLeft, onRight)), 'Ok: 1')
assert.strictEqual(pipe(left(['error 1', 'error 2']), fold(onLeft, onRight)), 'Errors: error 1, error 2')
```

Added in v2.0.0

# foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M
```

Added in v2.0.0

# fromNullable

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`

**Signature**

```ts
export declare function fromNullable<E>(e: E): <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import { fromNullable, left, right } from 'fp-ts/lib/Either'

const parse = fromNullable('nully')

assert.deepStrictEqual(parse(1), right(1))
assert.deepStrictEqual(parse(null), left('nully'))
```

Added in v2.0.0

# fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => Either<E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
}
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<Either<E, A>>
```

Added in v2.0.0

# getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are appended using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
```

**Example**

```ts
import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v2.0.0

# getEq

**Signature**

```ts
export declare function getEq<E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>>
```

Added in v2.0.0

# getOrElse

**Signature**

```ts
export declare function getOrElse<E, A>(onLeft: (e: E) => A): (ma: Either<E, A>) => A
```

Added in v2.0.0

# getOrElseW

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

Added in v2.6.0

# getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
```

**Example**

```ts
import { getSemigroup, left, right } from 'fp-ts/lib/Either'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getSemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v2.0.0

# getShow

**Signature**

```ts
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>>
```

Added in v2.0.0

# getValidation

**Signature**

```ts
export declare function getValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2C<URI, E> &
  Extend2<URI> &
  ChainRec2C<URI, E> &
  MonadThrow2C<URI, E>
```

Added in v2.0.0

# getValidationMonoid

**Signature**

```ts
export declare function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>>
```

Added in v2.0.0

# getValidationSemigroup

**Signature**

```ts
export declare function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>>
```

Added in v2.0.0

# getWitherable

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E>
```

Added in v2.0.0

# isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise

**Signature**

```ts
export declare function isLeft<E, A>(ma: Either<E, A>): ma is Left<E>
```

Added in v2.0.0

# isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise

**Signature**

```ts
export declare function isRight<E, A>(ma: Either<E, A>): ma is Right<A>
```

Added in v2.0.0

# left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

**Signature**

```ts
export declare function left<E = never, A = never>(e: E): Either<E, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A>
```

Added in v2.0.0

# orElse

**Signature**

```ts
export declare function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A>
```

Added in v2.0.0

# parseJSON

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export declare function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, unknown>
```

**Example**

```ts
import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'

assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v2.0.0

# reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B
```

Added in v2.0.0

# right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure

**Signature**

```ts
export declare function right<E = never, A = never>(a: A): Either<E, A>
```

Added in v2.0.0

# stringifyJSON

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string>
```

**Example**

```ts
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(
  pipe(
    E.stringifyJSON(circular, E.toError),
    E.mapLeft((e) => e.message.includes('Converting circular structure to JSON'))
  ),
  E.left(true)
)
```

Added in v2.0.0

# swap

**Signature**

```ts
export declare function swap<E, A>(ma: Either<E, A>): Either<A, E>
```

Added in v2.0.0

# toError

Default value for the `onError` argument of `tryCatch`

**Signature**

```ts
export declare function toError(e: unknown): Error
```

Added in v2.0.0

# tryCatch

Constructs a new `Either` from a function that might throw

**Signature**

```ts
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A>
```

**Example**

```ts
import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'

const unsafeHead = <A>(as: Array<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: Array<A>): Either<Error, A> => {
  return tryCatch(
    () => unsafeHead(as),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )
}

assert.deepStrictEqual(head([]), left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), right(1))
```

Added in v2.0.0
