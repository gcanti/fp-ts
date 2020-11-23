---
title: Either.ts
nav_order: 25
parent: Modules
---

## Either overview

```ts
type Either<E, A> = Left<E> | Right<A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Extend](#extend)
  - [extend](#extend)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [Traversable](#traversable)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [chainNullableK](#chainnullablek)
  - [duplicate](#duplicate)
  - [filterOrElse](#filterorelse)
  - [flatten](#flatten)
  - [fromNullableK](#fromnullablek)
  - [orElse](#orelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [parseJSON](#parsejson)
  - [right](#right)
  - [stringifyJSON](#stringifyjson)
  - [tryCatch](#trycatch)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [guards](#guards)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative-1)
  - [Bifunctor](#bifunctor-1)
  - [ChainRec](#chainrec)
  - [Extend](#extend-1)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadThrow](#monadthrow-1)
  - [Traversable](#traversable-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [either](#either)
  - [getAltValidation](#getaltvalidation)
  - [getApplicativeValidation](#getapplicativevalidation)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getValidation](#getvalidation)
  - [getValidationMonoid](#getvalidationmonoid)
  - [getValidationSemigroup](#getvalidationsemigroup)
  - [getWitherable](#getwitherable)
- [model](#model)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [utils](#utils)
  - [Do](#do)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (interface)](#jsonarray-interface)
  - [JsonRecord (interface)](#jsonrecord-interface)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [elem](#elem)
  - [exists](#exists)
  - [filterOrElseW](#filterorelsew)
  - [sequenceArray](#sequencearray)
  - [toError](#toerror)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(fa: Either<E1, A>) => Either<E2 | E1, B | A>
```

Added in v2.9.0

# Applicative

## of

Wrap a value into the type constructor.

Equivalent to [`right`](#right).

**Signature**

```ts
export declare const of: <E, A>(a: A) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

assert.deepStrictEqual(E.of('a'), E.right('a'))
```

Added in v2.7.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <D, A>(fa: Either<D, A>) => <E, B>(fab: Either<E, (a: A) => B>) => Either<D | E, B>
```

Added in v2.8.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A>
```

Added in v2.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# Foldable

## foldMap

Map each element of the structure to a monoid, and combine the results.

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { monoidString } from 'fp-ts/Monoid'

const yell = (a: string) => `${a}!`

assert.deepStrictEqual(pipe(E.right('a'), E.foldMap(monoidString)(yell)), 'a!')

assert.deepStrictEqual(pipe(E.left('e'), E.foldMap(monoidString)(yell)), monoidString.empty)
```

Added in v2.0.0

## reduce

Left-associative fold of a structure.

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

const startWith = 'prefix'
const concat = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduce(startWith, concat)), 'prefix:a')

assert.deepStrictEqual(pipe(E.left('e'), E.reduce(startWith, concat)), 'prefix')
```

Added in v2.0.0

## reduceRight

Right-associative fold of a structure.

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

const startWith = 'postfix'
const concat = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduceRight(startWith, concat)), 'a:postfix')

assert.deepStrictEqual(pipe(E.left('e'), E.reduceRight(startWith, concat)), 'postfix')
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, B>
```

Added in v2.6.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => Either<E, A>
```

Added in v2.6.3

# Traversable

## sequence

Evaluate each monadic action in the structure from left to right, and collect the results.

**Signature**

```ts
export declare const sequence: Sequence2<'Either'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(O.some('a')), E.sequence(O.option)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right(O.none), E.sequence(O.option)), O.none)
```

Added in v2.6.3

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: PipeableTraverse2<'Either'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(['a']), E.traverse(O.option)(A.head)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right([]), E.traverse(O.option)(A.head)), O.none)
```

Added in v2.6.3

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(fb: Either<E, B>) => <A>(fa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst)

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirstW: <D, A, B>(f: (a: A) => Either<D, B>) => <E>(ma: Either<E, A>) => Either<D | E, A>
```

Added in v2.8.0

## chainNullableK

**Signature**

```ts
export declare function chainNullableK<E>(
  e: E
): <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

Added in v2.9.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

Added in v2.0.0

## filterOrElse

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
}
```

**Example**

```ts
import { filterOrElse, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    right(1),
    filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    right(-1),
    filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('error')
)
assert.deepStrictEqual(
  pipe(
    left('a'),
    filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('a')
)
```

Added in v2.0.0

## flatten

The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
```

Added in v2.0.0

## fromNullableK

**Signature**

```ts
export declare function fromNullableK<E>(
  e: E
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B | null | undefined) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v2.9.0

## orElse

Useful for recovering from errors.

**Signature**

```ts
export declare function orElse<E, A, M>(onLeft: (e: E) => Either<M, A>): (ma: Either<E, A>) => Either<M, A>
```

Added in v2.0.0

## swap

Returns a `Right` if is a `Left` (and vice versa).

**Signature**

```ts
export declare function swap<E, A>(ma: Either<E, A>): Either<A, E>
```

Added in v2.0.0

# constructors

## fromNullable

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare function fromNullable<E>(e: E): <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import { fromNullable, left, right } from 'fp-ts/Either'

const parse = fromNullable('nully')

assert.deepStrictEqual(parse(1), right(1))
assert.deepStrictEqual(parse(null), left('nully'))
```

Added in v2.0.0

## fromOption

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Either<E, A>
```

**Example**

```ts
import { fromOption, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { none, some } from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    some(1),
    fromOption(() => 'error')
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    none,
    fromOption(() => 'error')
  ),
  left('error')
)
```

Added in v2.0.0

## fromPredicate

Derivable from `MonadThrow`.

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
}
```

**Example**

```ts
import { fromPredicate, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    1,
    fromPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    fromPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('error')
)
```

Added in v2.0.0

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => Either<E, A>
```

Added in v2.0.0

## parseJSON

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export declare function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, Json>
```

**Example**

```ts
import { parseJSON, toError, right, left } from 'fp-ts/Either'

assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v2.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => Either<E, A>
```

Added in v2.0.0

## stringifyJSON

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare function stringifyJSON<E>(u: unknown, onError: (reason: unknown) => E): Either<E, string>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

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

## tryCatch

Constructs a new `Either` from a function that might throw.

**Signature**

```ts
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A>
```

**Example**

```ts
import { Either, left, right, tryCatch } from 'fp-ts/Either'

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

# destructors

## fold

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare function fold<E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B): (ma: Either<E, A>) => B
```

**Example**

```ts
import { fold, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

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

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A
```

**Example**

```ts
import { getOrElse, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    right(1),
    getOrElse(() => 0)
  ),
  1
)
assert.deepStrictEqual(
  pipe(
    left('error'),
    getOrElse(() => 0)
  ),
  0
)
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

Added in v2.6.0

# guards

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E, A>(ma: Either<E, A>) => ma is Left<E>
```

Added in v2.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <E, A>(ma: Either<E, A>) => ma is Right<A>
```

Added in v2.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'Either'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Either'>
```

Added in v2.7.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Either'>
```

Added in v2.7.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec2<'Either'>
```

Added in v2.7.0

## Extend

**Signature**

```ts
export declare const Extend: Extend2<'Either'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Either'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Either'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Either'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'Either'>
```

Added in v2.7.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Either'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Either'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## either

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

## getAltValidation

**Signature**

```ts
export declare function getAltValidation<E>(SE: Semigroup<E>): Alt2C<URI, E>
```

Added in v2.7.0

## getApplicativeValidation

**Signature**

```ts
export declare function getApplicativeValidation<E>(SE: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<Either<E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
```

**Example**

```ts
import { getApplySemigroup, left, right } from 'fp-ts/Either'
import { semigroupSum } from 'fp-ts/Semigroup'

const S = getApplySemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v2.0.0

## getEq

**Signature**

```ts
export declare function getEq<E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>>
```

Added in v2.0.0

## getFilterable

Builds a `Filterable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v3.0.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Either<E, A>>
```

**Example**

```ts
import { getSemigroup, left, right } from 'fp-ts/Either'
import { semigroupSum } from 'fp-ts/Semigroup'

const S = getSemigroup<string, number>(semigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare function getShow<E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>>
```

Added in v2.0.0

## getValidation

**Signature**

```ts
export declare function getValidation<E>(
  SE: Semigroup<E>
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

## getValidationMonoid

**Signature**

```ts
export declare function getValidationMonoid<E, A>(SE: Semigroup<E>, SA: Monoid<A>): Monoid<Either<E, A>>
```

Added in v2.0.0

## getValidationSemigroup

**Signature**

```ts
export declare function getValidationSemigroup<E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>>
```

Added in v2.0.0

## getWitherable

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare function getWitherable<E>(M: Monoid<E>): Witherable2C<URI, E>
```

Added in v2.0.0

# model

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v2.0.0

## Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v2.0.0

## Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v2.9.0

## Json (type alias)

Copied from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717

**Signature**

```ts
export type Json = boolean | number | string | null | JsonArray | JsonRecord
```

Added in v2.6.7

## JsonArray (interface)

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

Added in v2.6.7

## JsonRecord (interface)

**Signature**

```ts
export interface JsonRecord {
  readonly [key: string]: Json
}
```

Added in v2.6.7

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E, B>
) => (fa: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, D, B>(
  name: Exclude<N, keyof A>,
  fb: Either<D, B>
) => <E>(fa: Either<E, A>) => Either<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E, B>
) => (fa: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <E, A>(fa: Either<E, A>) => Either<E, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<D, B>
) => <E>(fa: Either<E, A>) => Either<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## elem

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): <E>(a: A, ma: Either<E, A>) => boolean
```

Added in v2.0.0

## exists

Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean
```

**Example**

```ts
import { exists, left, right } from 'fp-ts/Either'

const gt2 = exists((n: number) => n > 2)

assert.strictEqual(gt2(left('a')), false)
assert.strictEqual(gt2(right(1)), false)
assert.strictEqual(gt2(right(3)), true)
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterOrElse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E2 | E1, A>
}
```

Added in v2.9.0

## sequenceArray

convert an array of either to an either of array
this function have the same behavior of `A.sequence(E.either)` but it's optimized and perform better

**Signature**

```ts
export declare const sequenceArray: <E, A>(arr: readonly Either<E, A>[]) => Either<E, readonly A[]>
```

**Example**

```ts
import { sequenceArray, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

const arr = A.range(0, 10)
assert.deepStrictEqual(pipe(arr, A.map(right), sequenceArray), right(arr))
assert.deepStrictEqual(pipe(arr, A.map(right), A.cons(left('Error')), sequenceArray), left('Error'))
```

Added in v2.9.0

## toError

Default value for the `onError` argument of `tryCatch`

**Signature**

```ts
export declare function toError(e: unknown): Error
```

Added in v2.0.0

## traverseArray

map an array using provided function to Either then transform to Either of the array
this function have the same behavior of `A.traverse(E.either)` but it's optimized and perform better

**Signature**

```ts
export declare const traverseArray: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (arr: readonly A[]) => Either<E, readonly B[]>
```

**Example**

```ts
import { traverseArray, left, right, fromPredicate } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

const arr = A.range(0, 10)
assert.deepStrictEqual(
  pipe(
    arr,
    traverseArray((x) => right(x))
  ),
  right(arr)
)
assert.deepStrictEqual(
  pipe(
    arr,
    traverseArray(
      fromPredicate(
        (x) => x > 5,
        () => 'a'
      )
    )
  ),
  left('a')
)
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <E, A, B>(
  f: (index: number, a: A) => Either<E, B>
) => (arr: readonly A[]) => Either<E, readonly B[]>
```

Added in v2.9.0
