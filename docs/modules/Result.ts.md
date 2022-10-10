---
title: Result.ts
nav_order: 66
parent: Modules
---

## Result overview

```ts
type Result<E, A> = Failure<E> | Success<A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Result` is either an instance of `Failure` or `Success`.

A common use of `Result` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Failure` which can contain useful information. `Success` takes the place of `Some`. Convention
dictates that `Failure` is used for failure and `Success` is used for success.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fail](#fail)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [toNull](#tonull)
  - [toOption](#tooption)
  - [toReadonlyArray](#toreadonlyarray)
  - [toUndefined](#toundefined)
  - [toUnion](#tounion)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [firstSuccessOf](#firstsuccessof)
  - [getOrElse](#getorelse)
  - [getValidatedAlt](#getvalidatedalt)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [mapError](#maperror)
  - [orElse](#orelse)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartitionMap](#traversepartitionmap)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [Extendable](#extendable)
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec)
  - [FromIdentity](#fromidentity)
  - [FromResult](#fromresult)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [Traversable](#traversable)
  - [getCompactable](#getcompactable)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getTraversableFilterable](#gettraversablefilterable)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [Failure (interface)](#failure-interface)
  - [Result (type alias)](#result-type-alias)
  - [Success (interface)](#success-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapRec](#flatmaprec)
  - [flatten](#flatten)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverse](#traverse)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ResultTypeLambda (interface)](#resulttypelambda-interface)
  - [ResultTypeLambdaFix (interface)](#resulttypelambdafix-interface)
  - [ValidatedT (interface)](#validatedt-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [duplicate](#duplicate)
  - [elem](#elem)
  - [exists](#exists)
  - [extend](#extend)
  - [idKleisli](#idkleisli)
  - [reverse](#reverse)
  - [tap](#tap)

---

# constructors

## fail

Constructs a new `Result` holding a `Failure` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const fail: <E>(e: E) => Result<E, never>
```

Added in v3.0.0

## succeed

Constructs a new `Result` holding a `Success` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const succeed: <A>(a: A) => Result<never, A>
```

Added in v3.0.0

# conversions

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Success`, if the value is nully use
the provided default as a `Failure`.

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => Result<E, NonNullable<A>>
```

**Example**

```ts
import * as E from 'fp-ts/Result'

const parse = E.fromNullable('nully')

assert.deepStrictEqual(parse(1), E.succeed(1))
assert.deepStrictEqual(parse(null), E.fail('nully'))
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A>(fa: Option<A>) => Result<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(O.some(1), E.fromOption('error')), E.succeed(1))
assert.deepStrictEqual(pipe(O.none, E.fromOption('error')), E.fail('error'))
```

Added in v3.0.0

## toNull

**Signature**

```ts
export declare const toNull: <E, A>(self: Result<E, A>) => A | null
```

Added in v3.0.0

## toOption

**Signature**

```ts
export declare const toOption: <E, A>(self: Result<E, A>) => Option<A>
```

Added in v3.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <E, A>(self: Result<E, A>) => readonly A[]
```

Added in v3.0.0

## toUndefined

**Signature**

```ts
export declare const toUndefined: <E, A>(self: Result<E, A>) => A | undefined
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: Result<E, A>) => E | A
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Result<never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Result<E2, B>
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Result<E2, B>
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(self: Result<E, A>) => Result<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: Result<E, A>) => Result<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(
  onError: (e: E1) => Result<E2, B>
) => <A>(self: Result<E1, A>) => Result<E2, B | A>
```

Added in v3.0.0

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <E, A>(
  startWith: Result<E, A>
) => (collection: Iterable<Result<E, A>>) => Result<E, A>
```

Added in v3.0.0

## getOrElse

Returns the wrapped value if it's a `Success` or a default value if is a `Failure`.

**Signature**

```ts
export declare const getOrElse: <B>(onError: B) => <A>(self: Result<unknown, A>) => B | A
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(E.succeed(1), E.getOrElse(0)), 1)
assert.deepStrictEqual(pipe(E.fail('error'), E.getOrElse(0)), 0)
```

Added in v3.0.0

## getValidatedAlt

The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedAlt: <E>(Semigroup: Semigroup<E>) => alt.Alt<ValidatedT<ResultTypeLambda, E>>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Result<string, string> =>
  typeof u === 'string' ? E.succeed(u) : E.fail('not a string')

const parseNumber = (u: unknown): E.Result<string, number> =>
  typeof u === 'number' ? E.succeed(u) : E.fail('not a number')

const parse = (u: unknown): E.Result<string, string | number> =>
  pipe(parseString(u), E.orElse<string, string | number>(parseNumber(u)))

assert.deepStrictEqual(parse(true), E.fail('not a number')) // <= last error

const Alt = E.getValidatedAlt(pipe(string.Semigroup, S.intercalate(', ')))

const parseAll = (u: unknown): E.Result<string, string | number> =>
  pipe(parseString(u), Alt.orElse(parseNumber(u) as E.Result<string, string | number>))

assert.deepStrictEqual(parseAll(true), E.fail('not a string, not a number')) // <= all errors
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(
  Semigroup: Semigroup<E>
) => applicative.Applicative<ValidatedT<ResultTypeLambda, E>>
```

**Example**

```ts
import * as A from 'fp-ts/Apply'
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Result<string, string> =>
  typeof u === 'string' ? E.succeed(u) : E.fail('not a string')

const parseNumber = (u: unknown): E.Result<string, number> =>
  typeof u === 'number' ? E.succeed(u) : E.fail('not a number')

interface Person {
  readonly name: string
  readonly age: number
}

const parsePerson = (input: Record<string, unknown>): E.Result<string, Person> =>
  pipe(E.Do, E.bindRight('name', parseString(input.name)), E.bindRight('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePerson({}), E.fail('not a string')) // <= first error

const Applicative = E.getValidatedApplicative(pipe(string.Semigroup, S.intercalate(', ')))

const bindRight = A.bindRight(Applicative)

const parsePersonAll = (input: Record<string, unknown>): E.Result<string, Person> =>
  pipe(E.Do, bindRight('name', parseString(input.name)), bindRight('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePersonAll({}), E.fail('not a string, not a number')) // <= all errors
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: Result<E, A>) => Result<G, A>
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Result` returns the left-most non-`Failure` value (or the right-most `Failure` value if both values are `Failure`).

| x          | y          | pipe(x, orElse(y) |
| ---------- | ---------- | ----------------- |
| fail(a)    | fail(b)    | fail(b)           |
| fail(a)    | succeed(2) | succeed(2)        |
| succeed(1) | fail(b)    | succeed(1)        |
| succeed(1) | succeed(2) | succeed(1)        |

**Signature**

```ts
export declare const orElse: <E2, B>(that: Result<E2, B>) => <E1, A>(self: Result<E1, A>) => Result<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(E.fail('a'), E.orElse(E.fail('b'))), E.fail('b'))
assert.deepStrictEqual(pipe(E.fail('a'), E.orElse(E.succeed(2))), E.succeed(2))
assert.deepStrictEqual(pipe(E.succeed(1), E.orElse(E.fail('b'))), E.succeed(1))
assert.deepStrictEqual(pipe(E.succeed(1), E.orElse(E.succeed(2))), E.succeed(1))
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, E2>(
  onError: (e: E1) => Result<E2, unknown>
) => <A>(self: Result<E1, A>) => Result<E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: E) => <A>(self: Result<E, Option<A>>) => Result<E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: E2): <E1>(
    self: Result<E1, C>
  ) => Result<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: E2): <E1>(self: Result<E1, B>) => Result<E2 | E1, B>
}
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(
  pipe(
    E.succeed(1),
    E.filter((n) => n > 0, 'error')
  ),
  E.succeed(1)
)
assert.deepStrictEqual(
  pipe(
    E.succeed(-1),
    E.filter((n) => n > 0, 'error')
  ),
  E.fail('error')
)
assert.deepStrictEqual(
  pipe(
    E.fail('a'),
    E.filter((n) => n > 0, 'error')
  ),
  E.fail('a')
)
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(f: (a: A) => Option<B>, onNone: E) => (self: Result<E, A>) => Result<E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (
    self: Result<E, C>
  ) => readonly [Result<E, C>, Result<E, B>]
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (
    self: Result<E, B>
  ) => readonly [Result<E, B>, Result<E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => Result<B, C>,
  onEmpty: E
) => (self: Result<E, A>) => readonly [Result<E, B>, Result<E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: E
) => <A, B>(self: Result<E, Result<A, B>>) => readonly [Result<E, A>, Result<E, B>]
```

Added in v3.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <A, S, R, O, FE, B, E>(
  f: (a: A) => Kind<F, S, R, O, FE, Option<B>>,
  onNone: E
) => (self: Result<E, A>) => Kind<F, S, R, O, FE, Result<E, B>>
```

Added in v3.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <A, S, R, O, FE, B, C, E>(
  f: (a: A) => Kind<F, S, R, O, FE, Result<B, C>>,
  onNone: E
) => (self: Result<E, A>) => Kind<F, S, R, O, FE, readonly [Result<E, B>, Result<E, C>]>
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <E>(self: Result<E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(self: Result<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(self: Result<E, A>) => B
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<ResultTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ResultTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<ResultTypeLambda>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ResultTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<ResultTypeLambda>
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: extendable.Extendable<ResultTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<ResultTypeLambda>
```

Added in v3.0.0

## FlattenableRec

**Signature**

```ts
export declare const FlattenableRec: flattenableRec.FlattenableRec<ResultTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<ResultTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<ResultTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ResultTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<ResultTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ResultTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<ResultTypeLambda>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(onNone: E) => Compactable<ValidatedT<ResultTypeLambda, E>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: eq.Eq<E>, EA: eq.Eq<A>) => eq.Eq<Result<E, A>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(onEmpty: E) => filterable.Filterable<ValidatedT<ResultTypeLambda, E>>
```

Added in v3.0.0

## getSemigroup

Semigroup returning the left-most non-`Failure` value. If both operands are `Success`es then the inner values are
combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Result<E, A>>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

const S = E.getSemigroup<number, string>(N.SemigroupSum)
assert.deepStrictEqual(pipe(E.fail('a'), S.combine(E.fail('b'))), E.fail('a'))
assert.deepStrictEqual(pipe(E.fail('a'), S.combine(E.succeed(2))), E.succeed(2))
assert.deepStrictEqual(pipe(E.succeed(1), S.combine(E.fail('b'))), E.succeed(1))
assert.deepStrictEqual(pipe(E.succeed(1), S.combine(E.succeed(2))), E.succeed(3))
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(SE: Show<E>, SA: Show<A>) => Show<Result<E, A>>
```

Added in v3.0.0

## getTraversableFilterable

**Signature**

```ts
export declare const getTraversableFilterable: <E>(onEmpty: E) => TraversableFilterable<ValidatedT<ResultTypeLambda, E>>
```

Added in v3.0.0

# interop

## fromThrowable

Constructs a new `Result` from a function that might throw.

**Signature**

```ts
export declare const fromThrowable: <A, E>(f: () => A, onThrow: (error: unknown) => E) => Result<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { identity } from 'fp-ts/Function'

const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Result<unknown, A> => E.fromThrowable(() => unsafeHead(as), identity)

assert.deepStrictEqual(head([]), E.fail(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), E.succeed(1))
```

Added in v3.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Result`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Result<E, B>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Result`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <E1, E2>(fa: Result<E1, A>, fb: Result<E2, B>) => Result<E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Result`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <E1, E2, E3>(fa: Result<E1, A>, fb: Result<E2, B>, fc: Result<E3, C>) => Result<E1 | E2 | E3, D>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => Result<E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: E
) => (...a: A) => Result<E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: E): (c: C) => Result<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: E): (b: B) => Result<E, B>
}
```

**Example**

```ts
import { liftPredicate, fail, succeed } from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(
  pipe(
    1,
    liftPredicate((n) => n > 0, 'error')
  ),
  succeed(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    liftPredicate((n) => n > 0, 'error')
  ),
  fail('error')
)
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E>(self: Result<E, unknown>) => Result<E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Result<E, (a: A) => B>) => Result<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Result<E, A>) => Result<E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Result<E, A>) => Result<G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <E>(self: Result<E, unknown>) => Result<E, void>
```

Added in v3.0.0

# model

## Failure (interface)

**Signature**

```ts
export interface Failure<E> {
  readonly _tag: 'Failure'
  readonly failure: E
}
```

Added in v3.0.0

## Result (type alias)

**Signature**

```ts
export type Result<E, A> = Failure<E> | Success<A>
```

Added in v3.0.0

## Success (interface)

**Signature**

```ts
export interface Success<A> {
  readonly _tag: 'Success'
  readonly success: A
}
```

Added in v3.0.0

# pattern matching

## match

Takes two functions and an `Result` value, if the value is a `Failure` the inner value is applied to the first function,
if the value is a `Success` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => (self: Result<E, A>) => B | C
```

**Example**

```ts
import * as E from 'fp-ts/Result'
import { pipe } from 'fp-ts/Function'

const onError = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onSuccess = (value: number): string => `Ok: ${value}`

assert.strictEqual(pipe(E.succeed(1), E.match(onError, onSuccess)), 'Ok: 1')
assert.strictEqual(pipe(E.fail(['error 1', 'error 2']), E.match(onError, onSuccess)), 'Errors: error 1, error 2')
```

Added in v3.0.0

# refinements

## isFailure

Returns `true` if the either is an instance of `Failure`, `false` otherwise.

**Signature**

```ts
export declare const isFailure: <E, A>(self: Result<E, A>) => self is Failure<E>
```

Added in v3.0.0

## isSuccess

Returns `true` if the either is an instance of `Success`, `false` otherwise.

**Signature**

```ts
export declare const isSuccess: <E, A>(self: Result<E, A>) => self is Success<A>
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(f: (a: A) => Result<E2, B>) => <E1>(self: Result<E1, A>) => Result<E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => Option<B>,
  onNone: E2
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, B>
```

Added in v3.0.0

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, E, B>(f: (a: A) => Result<E, Result<A, B>>) => (a: A) => Result<E, B>
```

Added in v3.0.0

## flatten

The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.

**Signature**

```ts
export declare const flatten: <E1, E2, A>(mma: Result<E1, Result<E2, A>>) => Result<E1 | E2, A>
```

**Example**

```ts
import * as E from 'fp-ts/Result'

assert.deepStrictEqual(E.flatten(E.succeed(E.succeed('a'))), E.succeed('a'))
assert.deepStrictEqual(E.flatten(E.succeed(E.fail('e'))), E.fail('e'))
assert.deepStrictEqual(E.flatten(E.fail('e')), E.fail('e'))
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <E2>(that: Result<E2, unknown>) => <E1, A>(self: Result<E1, A>) => Result<E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <E2, A>(that: Result<E2, A>) => <E1>(self: Result<E1, unknown>) => Result<E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FS, FR, FO, FE, A>(fa: Result<E, Kind<F, FS, FR, FO, FE, A>>) => Kind<F, FS, FR, FO, FE, Result<E, A>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(arr: readonly Result<E, A>[]) => Result<E, readonly A[]>
```

Added in v3.0.0

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, FS, FR, FO, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FO, FE, B>
) => <E>(ta: Result<E, A>) => Kind<F, FS, FR, FO, FE, Result<E, B>>
```

**Example**

```ts
import { pipe } from 'fp-ts/Function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Result'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.succeed(['a']), E.traverse(O.Applicative)(RA.head)), O.some(E.succeed('a')))

assert.deepStrictEqual(pipe(E.succeed([]), E.traverse(O.Applicative)(RA.head)), O.none)
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, E, B>(
  f: (a: A) => Result<E, B>
) => (as: readonly [A, ...A[]]) => Result<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Result<E, B>
) => (as: readonly [A, ...A[]]) => Result<E, readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => Result<E, B>
) => (as: readonly A[]) => Result<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Result<E, B>
) => (as: readonly A[]) => Result<E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Result<never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: Result<E, A>) => Result<E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <E2, B>(
  fb: Result<E2, B>
) => <E1, A extends readonly unknown[]>(self: Result<E1, A>) => Result<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <E2, B, A, C>(
  that: Result<E2, B>,
  f: (a: A, b: B) => C
) => <E1>(self: Result<E1, A>) => Result<E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## ResultTypeLambda (interface)

**Signature**

```ts
export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

## ResultTypeLambdaFix (interface)

**Signature**

```ts
export interface ResultTypeLambdaFix<E> extends TypeLambda {
  readonly type: Result<E, this['Out1']>
}
```

Added in v3.0.0

## ValidatedT (interface)

**Signature**

```ts
export interface ValidatedT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], E, this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <E2, A>(fa: Result<E2, A>) => <E1, B>(fab: Result<E1, (a: A) => B>) => Result<E2 | E1, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, E2, C>(
  bfc: (b: B) => Result<E2, C>
) => <A, E1>(afb: (a: A) => Result<E1, B>) => (a: A) => Result<E2 | E1, C>
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Result<E, A>) => Result<E, Result<E, A>>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Result`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => <E>(ma: Result<E, A>) => boolean
```

Added in v3.0.0

## exists

Returns `false` if `Failure` or returns the result of the application of the given predicate to the `Success` value.

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Result<unknown, A>) => boolean
```

**Example**

```ts
import * as E from 'fp-ts/Result'

const f = E.exists((n: number) => n > 2)

assert.strictEqual(f(E.fail('a')), false)
assert.strictEqual(f(E.succeed(1)), false)
assert.strictEqual(f(E.succeed(3)), true)
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Result<E, A>) => B) => (wa: Result<E, A>) => Result<E, B>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => Result<never, A>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(ma: Result<E, A>) => Result<A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2>(f: (a: A) => Result<E2, unknown>) => <E1>(self: Result<E1, A>) => Result<E2 | E1, A>
```

Added in v3.0.0
