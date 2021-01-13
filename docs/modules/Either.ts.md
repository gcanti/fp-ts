---
title: Either.ts
nav_order: 21
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

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
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
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [chainFirstW](#chainfirstw)
  - [chainNullableK](#chainnullablek)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
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
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [guards](#guards)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [Extend](#extend-1)
  - [Foldable](#foldable-1)
  - [FromEither](#fromeither)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltValidation](#getaltvalidation)
  - [getApplicativeValidation](#getapplicativevalidation)
  - [getCompactable](#getcompactable)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getWitherable](#getwitherable)
- [model](#model)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [Json (type alias)](#json-type-alias)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [elem](#elem)
  - [exists](#exists)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <E, A>(second: Lazy<Either<E, A>>) => (first: Either<E, A>) => Either<E, A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <E2, B>(
  second: Lazy<Either<E2, B>>
) => <E1, A>(first: Either<E1, A>) => Either<E2 | E1, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Either<E, A>) => Either<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Either<E, A>) => Either<G, A>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

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

Added in v3.0.0

## reduce

Left-associative fold of a structure.

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B
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

Added in v3.0.0

## reduceRight

Right-associative fold of a structure.

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B
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

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, E2, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => Either<E, A>
```

Added in v3.0.0

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

assert.deepStrictEqual(pipe(E.right(O.some('a')), E.sequence(O.Applicative)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right(O.none), E.sequence(O.Applicative)), O.none)
```

Added in v3.0.0

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: Traverse2<'Either'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(['a']), E.traverse(O.Applicative)(A.head)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right([]), E.traverse(O.Applicative)(A.head)), O.none)
```

Added in v3.0.0

# combinators

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst)

**Signature**

```ts
export declare const chainFirstW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(first: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v3.0.0

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: Lazy<E>
) => <A, B>(f: (a: A) => B) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
}
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(-1),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('error')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('a')
)
```

Added in v3.0.0

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

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v3.0.0

## orElse

Useful for recovering from errors.

**Signature**

```ts
export declare const orElse: <E1, E2, A>(onLeft: (e: E1) => Either<E2, A>) => (ma: Either<E1, A>) => Either<E2, A>
```

Added in v3.0.0

## swap

Returns a `Right` if is a `Left` (and vice versa).

**Signature**

```ts
export declare const swap: <E, A>(ma: Either<E, A>) => Either<A, E>
```

Added in v3.0.0

# constructors

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare const fromNullable: <E>(e: Lazy<E>) => <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

const parse = E.fromNullable(() => 'nully')

assert.deepStrictEqual(parse(1), E.right(1))
assert.deepStrictEqual(parse(null), E.left('nully'))
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    O.some(1),
    E.fromOption(() => 'error')
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    O.none,
    E.fromOption(() => 'error')
  ),
  E.left('error')
)
```

Added in v3.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Either<A, B>
  <A>(predicate: Predicate<A>): (a: A) => Either<A, A>
}
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    1,
    E.fromPredicate((n) => n > 0)
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    E.fromPredicate((n) => n > 0)
  ),
  E.left(-1)
)
```

Added in v3.0.0

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E, A = never>(e: E) => Either<E, A>
```

Added in v3.0.0

## parseJSON

Converts a JavaScript Object Notation (JSON) string into an object.

**Signature**

```ts
export declare const parseJSON: (s: string) => Either<unknown, Json>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe('{"a":1}', E.parseJSON), E.right({ a: 1 }))
assert.deepStrictEqual(pipe('{"a":}', E.parseJSON), E.left(new SyntaxError('Unexpected token } in JSON at position 5')))
```

Added in v3.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <A, E = never>(a: A) => Either<E, A>
```

Added in v3.0.0

## stringifyJSON

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

**Signature**

```ts
export declare const stringifyJSON: (u: unknown) => Either<unknown, string>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe({ a: 1 }, E.stringifyJSON), E.right('{"a":1}'))
const circular: any = { ref: null }
circular.ref = circular
assert.deepStrictEqual(
  pipe(
    circular,
    E.stringifyJSON,
    E.mapLeft((e) => String(e).includes('Converting circular structure to JSON'))
  ),
  E.left(true)
)
```

Added in v3.0.0

## tryCatch

Constructs a new `Either` from a function that might throw.

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<A>) => Either<unknown, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw 'empty array'
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> => E.tryCatch(() => unsafeHead(as))

assert.deepStrictEqual(head([]), E.left('empty array'))
assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: Either<E, B>) => <A>(first: Either<E, A>) => Either<E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: Either<E, B>) => <A>(first: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(f: (a: A) => Either<E, B>) => (first: Either<E, A>) => Either<E, A>
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

Added in v3.0.0

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

Added in v3.0.0

# destructors

## fold

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare const fold: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const onLeft = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.strictEqual(pipe(E.right(1), E.fold(onLeft, onRight)), 'Ok: 1')
assert.strictEqual(pipe(E.left(['error 1', 'error 2']), E.fold(onLeft, onRight)), 'Errors: error 1, error 2')
```

Added in v3.0.0

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.getOrElse(() => 0)
  ),
  1
)
assert.deepStrictEqual(
  pipe(
    E.left('error'),
    E.getOrElse(() => 0)
  ),
  0
)
```

Added in v3.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

Added in v3.0.0

# guards

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E, A>(ma: Either<E, A>) => ma is Left<E>
```

Added in v3.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <E, A>(ma: Either<E, A>) => ma is Right<A>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'Either'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Either'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Either'>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Either'>
```

Added in v3.0.0

## Extend

**Signature**

```ts
export declare const Extend: Extend2<'Either'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Either'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'Either'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Either'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Either'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'Either'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Either'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'Either'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getAltValidation

**Signature**

```ts
export declare const getAltValidation: <E>(S: Semigroup<E>) => Alt2C<'Either', E>
```

Added in v3.0.0

## getApplicativeValidation

**Signature**

```ts
export declare const getApplicativeValidation: <E>(S: Semigroup<E>) => Applicative2C<'Either', E>
```

Added in v3.0.0

## getCompactable

Builds a `Compactable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'Either', E>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: Eq<E>, EA: Eq<A>) => Eq<Either<E, A>>
```

Added in v3.0.0

## getFilterable

Builds a `Filterable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable2C<'Either', E>
```

Added in v3.0.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`.

**Signature**

```ts
export declare const getSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { semigroupSum } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'

const S = E.getSemigroup<number, string>(semigroupSum)
assert.deepStrictEqual(pipe(E.left('a'), S.concat(E.left('b'))), E.left('a'))
assert.deepStrictEqual(pipe(E.left('a'), S.concat(E.right(2))), E.right(2))
assert.deepStrictEqual(pipe(E.right(1), S.concat(E.left('b'))), E.right(1))
assert.deepStrictEqual(pipe(E.right(1), S.concat(E.right(2))), E.right(3))
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(SE: Show<E>, SA: Show<A>) => Show<Either<E, A>>
```

Added in v3.0.0

## getWitherable

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare const getWitherable: <E>(M: Monoid<E>) => Witherable2C<'Either', E>
```

Added in v3.0.0

# model

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v3.0.0

## Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v3.0.0

## Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Either<never, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v3.0.0

## Json (type alias)

**Signature**

```ts
export type Json = boolean | number | string | null | ReadonlyArray<Json> | Record<string, JSON>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E, B>
) => (fa: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(fb: Either<E, B>) => <A>(fas: Either<E, A>) => Either<E, readonly [any, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <E2, B>(
  fb: Either<E2, B>
) => <E1, A extends readonly unknown[]>(fas: Either<E1, A>) => Either<E2 | E1, readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E, B>
) => (ma: Either<E, A>) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: Either<E, A>) => Either<E, { [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Either`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => <E>(ma: Either<E, A>) => boolean
```

Added in v3.0.0

## exists

Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => <E>(ma: Either<E, A>) => boolean
```

**Example**

```ts
import * as E from 'fp-ts/Either'

const f = E.exists((n: number) => n > 2)

assert.strictEqual(f(E.left('a')), false)
assert.strictEqual(f(E.right(1)), false)
assert.strictEqual(f(E.right(3)), true)
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(as: readonly Either<E, A>[]) => Either<E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => Either<E, B>
) => (as: readonly A[]) => Either<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: readonly A[]) => Either<E, readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(a: Either<E, A>) => Either<E, readonly [A]>
```

Added in v3.0.0
