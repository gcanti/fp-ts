---
title: Either.ts
nav_order: 20
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

- [Bifunctor](#bifunctor)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
- [Extendable](#extendable)
  - [extend](#extend)
- [FlattenableRec](#flattenablerec)
  - [flatMapRec](#flatmaprec)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [ap](#ap)
  - [duplicate](#duplicate)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatMapOptionK](#flatmapoptionk)
  - [flatten](#flatten)
  - [fromOptionK](#fromoptionk)
  - [orElse](#orelse)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [swap](#swap)
  - [tap](#tap)
  - [tapError](#taperror)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [right](#right)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [match](#match)
- [guards](#guards)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instance operations](#instance-operations)
  - [combineK](#combinek)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor-1)
  - [Extendable](#extendable-1)
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec-1)
  - [Foldable](#foldable-1)
  - [FromEither](#fromeither)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk)
  - [Traversable](#traversable-1)
  - [getCompactable](#getcompactable)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getFilterableWithEffect](#getfilterablewitheffect)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [getValidatedSemigroupK](#getvalidatedsemigroupk)
- [interop](#interop)
  - [flatMapNullableK](#flatmapnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [natural transformations](#natural-transformations)
  - [fromOption](#fromoption)
- [struct sequencing](#struct-sequencing)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [tuple sequencing](#tuple-sequencing)
  - [DoTuple](#dotuple)
  - [bindTuple](#bindtuple)
  - [bindTupleRight](#bindtupleright)
  - [tupled](#tupled)
- [type lambdas](#type-lambdas)
  - [EitherTypeLambda (interface)](#eithertypelambda-interface)
  - [EitherTypeLambdaFix (interface)](#eithertypelambdafix-interface)
  - [ValidatedTypeLambda (interface)](#validatedtypelambda-interface)
- [utils](#utils)
  - [elem](#elem)
  - [exists](#exists)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [map](#map)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [unit](#unit)

---

# Bifunctor

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Either<E, A>) => Either<G, B>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: Either<E, A>) => Either<G, A>
```

Added in v3.0.0

# Extendable

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

# FlattenableRec

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, E, B>(f: (a: A) => Either<E, Either<A, B>>) => (a: A) => Either<E, B>
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
import { Monoid } from 'fp-ts/string'

const yell = (a: string) => `${a}!`

assert.deepStrictEqual(pipe(E.right('a'), E.foldMap(Monoid)(yell)), 'a!')

assert.deepStrictEqual(pipe(E.left('e'), E.foldMap(Monoid)(yell)), Monoid.empty)
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
const combine = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduce(startWith, combine)), 'prefix:a')

assert.deepStrictEqual(pipe(E.left('e'), E.reduce(startWith, combine)), 'prefix')
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
const combine = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduceRight(startWith, combine)), 'a:postfix')

assert.deepStrictEqual(pipe(E.left('e'), E.reduceRight(startWith, combine)), 'postfix')
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Either<never, A>
```

Added in v3.0.0

# Traversable

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, FS, FR, FO, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FO, FE, B>
) => <E>(ta: Either<E, A>) => Kind<F, FS, FR, FO, FE, Either<E, B>>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right([]), E.traverse(O.Applicative)(RA.head)), O.none)
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
```

Added in v3.0.0

## duplicate

Derivable from `Extendable`.

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E2): <E1>(
    self: Either<E1, C>
  ) => Either<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E2): <E1>(
    self: Either<E1, B>
  ) => Either<E2 | E1, B>
}
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filter(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(-1),
    E.filter(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('error')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.filter(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('a')
)
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (self: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(f: (a: A) => Either<E2, B>) => <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v3.0.0

## flatMapOptionK

**Signature**

```ts
export declare const flatMapOptionK: <A, B, E>(
  f: (a: A) => Option<B>,
  onNone: (a: A) => E
) => (ma: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## flatten

The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: Either<E1, Either<E2, A>>) => Either<E1 | E2, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => Either<E, B>
```

Added in v3.0.0

## orElse

Useful for recovering from errors.

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  onError: (e: E1) => Either<E2, B>
) => <A>(ma: Either<E1, A>) => Either<E2, B | A>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (
    self: Either<E, C>
  ) => readonly [Either<E, C>, Either<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (
    self: Either<E, B>
  ) => readonly [Either<E, B>, Either<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => Either<B, C>,
  onEmpty: (a: A) => E
) => (self: Either<E, A>) => readonly [Either<E, B>, Either<E, C>]
```

Added in v3.0.0

## swap

Returns a `Right` if is a `Left` (and vice versa).

**Signature**

```ts
export declare const swap: <E, A>(ma: Either<E, A>) => Either<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2, _>(f: (a: A) => Either<E2, _>) => <E1>(self: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2, _>(
  onError: (e: E1) => Either<E2, _>
) => <A>(self: Either<E1, A>) => Either<E1 | E2, A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2, _>(that: Either<E2, _>) => <E1, A>(self: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(that: Either<E2, A>) => <E1, _>(self: Either<E1, _>) => Either<E2 | E1, A>
```

Added in v3.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>
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

Added in v3.0.0

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E>(e: E) => Either<E, never>
```

Added in v3.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <A>(a: A) => Either<never, A>
```

Added in v3.0.0

# destructors

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <E, B>(onError: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
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

## match

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (ma: Either<E, A>) => B | C
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const onError = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onSuccess = (value: number): string => `Ok: ${value}`

assert.strictEqual(pipe(E.right(1), E.match(onError, onSuccess)), 'Ok: 1')
assert.strictEqual(pipe(E.left(['error 1', 'error 2']), E.match(onError, onSuccess)), 'Errors: error 1, error 2')
```

Added in v3.0.0

# guards

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E>
```

Added in v3.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A>
```

Added in v3.0.0

# instance operations

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).

| x        | y        | pipe(x, combineK(() => y) |
| -------- | -------- | ------------------------- |
| left(a)  | left(b)  | left(b)                   |
| left(a)  | right(2) | right(2)                  |
| right(1) | left(b)  | right(1)                  |
| right(1) | right(2) | right(1)                  |

**Signature**

```ts
export declare const combineK: <E2, B>(
  second: LazyArg<Either<E2, B>>
) => <E1, A>(self: Either<E1, A>) => Either<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.combineK(() => E.left('b'))
  ),
  E.left('b')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.combineK(() => E.right(2))
  ),
  E.right(2)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.combineK(() => E.left('b'))
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.combineK(() => E.right(2))
  ),
  E.right(1)
)
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<EitherTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<EitherTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<EitherTypeLambda>
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: extendable.Extendable<EitherTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<EitherTypeLambda>
```

Added in v3.0.0

## FlattenableRec

**Signature**

```ts
export declare const FlattenableRec: flattenableRec.FlattenableRec<EitherTypeLambda>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<EitherTypeLambda>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<EitherTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<EitherTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<EitherTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<EitherTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<EitherTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<EitherTypeLambda>
```

Added in v3.0.0

## getCompactable

Builds a `Compactable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getCompactable: <E>(
  M: Monoid<E>
) => compactable.Compactable<ValidatedTypeLambda<EitherTypeLambda, E>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: eq.Eq<E>, EA: eq.Eq<A>) => eq.Eq<Either<E, A>>
```

Added in v3.0.0

## getFilterable

Builds a `Filterable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => filterable.Filterable<ValidatedTypeLambda<EitherTypeLambda, E>>
```

Added in v3.0.0

## getFilterableWithEffect

Builds `FilterableWithEffect` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare const getFilterableWithEffect: <E>(
  M: Monoid<E>
) => filterableWithEffect.FilterableWithEffect<ValidatedTypeLambda<EitherTypeLambda, E>>
```

Added in v3.0.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = E.getSemigroup<number, string>(N.SemigroupSum)
assert.deepStrictEqual(pipe(E.left('a'), S.combine(E.left('b'))), E.left('a'))
assert.deepStrictEqual(pipe(E.left('a'), S.combine(E.right(2))), E.right(2))
assert.deepStrictEqual(pipe(E.right(1), S.combine(E.left('b'))), E.right(1))
assert.deepStrictEqual(pipe(E.right(1), S.combine(E.right(2))), E.right(3))
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(SE: Show<E>, SA: Show<A>) => Show<Either<E, A>>
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<ValidatedTypeLambda<EitherTypeLambda, E>>
```

**Example**

```ts
import * as A from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Either<string, string> =>
  typeof u === 'string' ? E.right(u) : E.left('not a string')

const parseNumber = (u: unknown): E.Either<string, number> =>
  typeof u === 'number' ? E.right(u) : E.left('not a number')

interface Person {
  readonly name: string
  readonly age: number
}

const parsePerson = (input: Record<string, unknown>): E.Either<string, Person> =>
  pipe(E.Do, E.bindRight('name', parseString(input.name)), E.bindRight('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error

const Applicative = E.getValidatedApplicative(pipe(string.Semigroup, S.intercalate(', ')))

const bindRight = A.bindRight(Applicative)

const parsePersonAll = (input: Record<string, unknown>): E.Either<string, Person> =>
  pipe(E.Do, bindRight('name', parseString(input.name)), bindRight('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
```

Added in v3.0.0

## getValidatedSemigroupK

The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedSemigroupK: <E>(
  Semigroup: Semigroup<E>
) => semigroupK.SemigroupK<ValidatedTypeLambda<EitherTypeLambda, E>>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Either<string, string> =>
  typeof u === 'string' ? E.right(u) : E.left('not a string')

const parseNumber = (u: unknown): E.Either<string, number> =>
  typeof u === 'number' ? E.right(u) : E.left('not a number')

const parse = (u: unknown): E.Either<string, string | number> =>
  pipe(
    parseString(u),
    E.combineK<string, string | number>(() => parseNumber(u))
  )

assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error

const SemigroupK = E.getValidatedSemigroupK(pipe(string.Semigroup, S.intercalate(', ')))

const parseAll = (u: unknown): E.Either<string, string | number> =>
  pipe(
    parseString(u),
    SemigroupK.combineK(() => parseNumber(u) as E.Either<string, string | number>)
  )

assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
```

Added in v3.0.0

# interop

## flatMapNullableK

**Signature**

```ts
export declare const flatMapNullableK: <E>(
  onNullable: LazyArg<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

Added in v3.0.0

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

const parse = E.fromNullable(() => 'nully')

assert.deepStrictEqual(parse(1), E.right(1))
assert.deepStrictEqual(parse(null), E.left('nully'))
```

Added in v3.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  onNullable: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: Either<E, A>) => E | A
```

Added in v3.0.0

## tryCatch

Constructs a new `Either` from a function that might throw.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <A, E>(f: LazyArg<A>, onThrow: (error: unknown) => E) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { identity } from 'fp-ts/function'

const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> => E.tryCatch(() => unsafeHead(as), identity)

assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
```

Added in v3.0.0

## tryCatchK

Converts a function that may throw to one returning a `Either`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Either<E, B>
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

# natural transformations

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => Either<E, A>
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

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Either<E, A>) => Either<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## DoTuple

**Signature**

```ts
export declare const DoTuple: Either<never, readonly []>
```

Added in v3.0.0

## bindTuple

**Signature**

```ts
export declare const bindTuple: <A extends readonly unknown[], E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(self: Either<E1, A>) => Either<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bindTupleRight

**Signature**

```ts
export declare const bindTupleRight: <E2, B>(
  fb: Either<E2, B>
) => <E1, A extends readonly unknown[]>(self: Either<E1, A>) => Either<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: Either<E, A>) => Either<E, readonly [A]>
```

Added in v3.0.0

# type lambdas

## EitherTypeLambda (interface)

**Signature**

```ts
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

## EitherTypeLambdaFix (interface)

**Signature**

```ts
export interface EitherTypeLambdaFix<E> extends TypeLambda {
  readonly type: Either<E, this['Out1']>
}
```

Added in v3.0.0

## ValidatedTypeLambda (interface)

**Signature**

```ts
export interface ValidatedTypeLambda<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], E, this['Out1']>
}
```

Added in v3.0.0

# utils

## elem

Tests whether a value is a member of a `Either`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => <E>(ma: Either<E, A>) => boolean
```

Added in v3.0.0

## exists

Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Either<unknown, A>) => boolean
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

## lift2

Lifts a binary function into `Either`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: Either<E1, A>, fb: Either<E2, B>) => Either<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Either`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: Either<E1, A>, fb: Either<E2, B>, fc: Either<E3, C>) => Either<E1 | E2 | E3, D>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FO, FE, A>(fa: Either<E, Kind<F, FS, FR, FO, FE, A>>) => Kind<F, FS, FR, FO, FE, Either<E, A>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly Either<E, A>[]) => Either<E, readonly A[]>
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

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, E, B>(
  f: (a: A) => Either<E, B>
) => (as: readonly [A, ...A[]]) => Either<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: readonly [A, ...A[]]) => Either<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: Either<never, void>
```

Added in v3.0.0
