---
title: Option.ts
nav_order: 65
parent: Modules
---

## Option overview

```ts
type Option<A> = None | Some<A>
```

`Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
instance of `None`.

An option could be looked at as a collection or foldable structure with either one or zero elements.
Another way to look at `Option` is: it represents the effect of a possibly failing computation.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [getFailure](#getfailure)
  - [getSuccess](#getsuccess)
  - [none](#none)
  - [some](#some)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromResult](#fromresult)
  - [toNull](#tonull)
  - [toResult](#toresult)
  - [toUndefined](#toundefined)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [guard](#guard)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [getOrElse](#getorelse)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
  - [traverseFilter](#traversefilter)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartition](#traversepartition)
  - [traversePartitionMap](#traversepartitionmap)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instance operations](#instance-operations)
  - [orElse](#orelse)
- [instances](#instances)
  - [Alt](#alt)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [Compactable](#compactable)
  - [Extendable](#extendable)
  - [Filterable](#filterable)
  - [Flattenable](#flattenable)
  - [Foldable](#foldable)
  - [FromIdentity](#fromidentity)
  - [FromOption](#fromoption)
  - [FromResult](#fromresult)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [Traversable](#traversable)
  - [TraversableFilterable](#traversablefilterable)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getShow](#getshow)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftNullable](#liftnullable)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [Some (interface)](#some-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isNone](#isnone)
  - [isSome](#issome)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapResult](#flatmapresult)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverse](#traverse)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [OptionTypeLambda (interface)](#optiontypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [duplicate](#duplicate)
  - [elem](#elem)
  - [exists](#exists)
  - [extend](#extend)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [tap](#tap)

---

# constructors

## getFailure

Returns the `Failure` value of a `Result` if possible.

**Signature**

```ts
export declare const getFailure: <E>(ma: Result<E, unknown>) => Option<E>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Result'

assert.deepStrictEqual(O.getFailure(E.succeed(1)), O.none)
assert.deepStrictEqual(O.getFailure(E.fail('a')), O.some('a'))
```

Added in v3.0.0

## getSuccess

Returns the `Success` value of an `Result` if possible.

**Signature**

```ts
export declare const getSuccess: <A>(ma: Result<unknown, A>) => Option<A>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Result'

assert.deepStrictEqual(O.getSuccess(E.succeed(1)), O.some(1))
assert.deepStrictEqual(O.getSuccess(E.fail('a')), O.none)
```

Added in v3.0.0

## none

`None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.

**Signature**

```ts
export declare const none: Option<never>
```

Added in v3.0.0

## some

Constructs a `Some`. Represents an optional value that exists.

**Signature**

```ts
export declare const some: <A>(a: A) => Option<A>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => Option<A>
```

Added in v3.0.0

# conversions

## fromNullable

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`.

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => Option<NonNullable<A>>
```

**Example**

```ts
import { none, some, fromNullable } from 'fp-ts/Option'

assert.deepStrictEqual(fromNullable(undefined), none)
assert.deepStrictEqual(fromNullable(null), none)
assert.deepStrictEqual(fromNullable(1), some(1))
```

Added in v3.0.0

## fromResult

Converts an `Result` to an `Option` discarding the error.

Alias of [getSuccess](#getsuccess)

**Signature**

```ts
export declare const fromResult: <A>(ma: Result<unknown, A>) => Option<A>
```

Added in v3.0.0

## toNull

Extracts the value out of the structure, if it exists. Otherwise returns `null`.

**Signature**

```ts
export declare const toNull: <A>(self: Option<A>) => A | null
```

**Example**

```ts
import { some, none, toNull } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(pipe(some(1), toNull), 1)
assert.strictEqual(pipe(none, toNull), null)
```

Added in v3.0.0

## toResult

**Signature**

```ts
export declare const toResult: <E>(onNone: E) => <A>(fa: Option<A>) => Result<E, A>
```

Added in v3.0.0

## toUndefined

Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.

**Signature**

```ts
export declare const toUndefined: <A>(self: Option<A>) => A | undefined
```

**Example**

```ts
import { some, none, toUndefined } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(pipe(some(1), toUndefined), 1)
assert.strictEqual(pipe(none, toUndefined), undefined)
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Option<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Option<A>) => Option<{ readonly [K in N]: A }>
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => Option<void>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <B>(that: LazyArg<Option<B>>) => <A>(self: Option<A>) => Option<B | A>
```

Added in v3.0.0

## getOrElse

Extracts the value out of the structure, if it exists. Otherwise returns the given default value

**Signature**

```ts
export declare const getOrElse: <B>(onNone: B) => <A>(ma: Option<A>) => B | A
```

**Example**

```ts
import { some, none, getOrElse } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(pipe(some(1), getOrElse(0)), 1)
assert.strictEqual(pipe(none, getOrElse(0)), 0)
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(foa: Option<Option<A>>) => Option<A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => Option<B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: Option<C>) => readonly [Option<C>, Option<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: Option<B>) => readonly [Option<B>, Option<B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: Option<A>) => readonly [Option<B>, Option<C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: Option<Result<A, B>>) => readonly [Option<A>, Option<B>]
```

Added in v3.0.0

## traverseFilter

**Signature**

```ts
export declare const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## traversePartition

**Signature**

```ts
export declare const traversePartition: <F extends TypeLambda>(
  ApplicativeF: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: Option<B>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<B>]>
```

Added in v3.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (wa: Option<A>) => Kind<F, S, R, O, E, readonly [Option<B>, Option<C>]>
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B
```

Added in v3.0.0

# instance operations

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Option` returns the left-most non-`None` value.

| x       | y       | pipe(x, orElse(y) |
| ------- | ------- | ----------------- |
| none    | none    | none              |
| some(a) | none    | some(a)           |
| none    | some(b) | some(b)           |
| some(a) | some(b) | some(a)           |

**Signature**

```ts
export declare const orElse: <B>(that: Option<B>) => <A>(self: Option<A>) => Option<B | A>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.deepStrictEqual(pipe(O.none, O.orElse(O.none)), O.none)
assert.deepStrictEqual(pipe(O.some('a'), O.orElse<string>(O.none)), O.some('a'))
assert.deepStrictEqual(pipe(O.none, O.orElse(O.some('b'))), O.some('b'))
assert.deepStrictEqual(pipe(O.some('a'), O.orElse(O.some('b'))), O.some('a'))
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: alt.Alt<OptionTypeLambda>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: alternative.Alternative<OptionTypeLambda>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<OptionTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<OptionTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<OptionTypeLambda>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<OptionTypeLambda>
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: extendable.Extendable<OptionTypeLambda>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<OptionTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<OptionTypeLambda>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<OptionTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<OptionTypeLambda>
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: fromOption_.FromOption<OptionTypeLambda>
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: fromResult_.FromResult<OptionTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<OptionTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<OptionTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<OptionTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<OptionTypeLambda>
```

Added in v3.0.0

## TraversableFilterable

**Signature**

```ts
export declare const TraversableFilterable: traversableFilterable.TraversableFilterable<OptionTypeLambda>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: eq.Eq<A>) => eq.Eq<Option<A>>
```

**Example**

```ts
import { none, some, getEq } from 'fp-ts/Option'
import * as N from 'fp-ts/number'

const E = getEq(N.Eq)
assert.strictEqual(E.equals(none)(none), true)
assert.strictEqual(E.equals(none)(some(1)), false)
assert.strictEqual(E.equals(some(1))(none), false)
assert.strictEqual(E.equals(some(1))(some(2)), false)
assert.strictEqual(E.equals(some(1))(some(1)), true)
```

Added in v3.0.0

## getMonoid

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
combined using the provided `Semigroup`

| x       | y       | combine(y)(x)       |
| ------- | ------- | ------------------- |
| none    | none    | none                |
| some(a) | none    | some(a)             |
| none    | some(a) | some(a)             |
| some(a) | some(b) | some(combine(b)(a)) |

**Signature**

```ts
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>
```

**Example**

```ts
import { getMonoid, some, none } from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

const M = getMonoid(N.SemigroupSum)
assert.deepStrictEqual(pipe(none, M.combine(none)), none)
assert.deepStrictEqual(pipe(some(1), M.combine(none)), some(1))
assert.deepStrictEqual(pipe(none, M.combine(some(1))), some(1))
assert.deepStrictEqual(pipe(some(1), M.combine(some(2))), some(3))
```

Added in v3.0.0

## getOrd

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export declare const getOrd: <A>(O: ord.Ord<A>) => ord.Ord<Option<A>>
```

**Example**

```ts
import { none, some, getOrd } from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

const O = getOrd(N.Ord)
assert.strictEqual(pipe(none, O.compare(none)), 0)
assert.strictEqual(pipe(none, O.compare(some(1))), -1)
assert.strictEqual(pipe(some(1), O.compare(none)), 1)
assert.strictEqual(pipe(some(1), O.compare(some(2))), -1)
assert.strictEqual(pipe(some(1), O.compare(some(1))), 0)
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Option<A>>
```

Added in v3.0.0

# interop

## fromThrowable

Converts an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
`Some`.

**Signature**

```ts
export declare const fromThrowable: <A>(f: () => A) => Option<A>
```

**Example**

```ts
import { none, some, fromThrowable } from 'fp-ts/Option'

assert.deepStrictEqual(
  fromThrowable(() => {
    throw new Error()
  }),
  none
)
assert.deepStrictEqual(
  fromThrowable(() => 1),
  some(1)
)
```

Added in v3.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Option`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Option`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Option`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D>
```

Added in v3.0.0

## liftNullable

Returns a _smart constructor_ from a function that returns a nullable value.

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Option<NonNullable<B>>
```

**Example**

```ts
import { liftNullable, none, some } from 'fp-ts/Option'

const f = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const g = liftNullable(f)

assert.deepStrictEqual(g('1'), some(1))
assert.deepStrictEqual(g('a'), none)
```

Added in v3.0.0

## liftPredicate

Returns a _smart constructor_ based on the given predicate.

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
}
```

**Example**

```ts
import * as O from 'fp-ts/Option'

const getOption = O.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), O.none)
assert.deepStrictEqual(getOption(1), O.some(1))
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => Option<B>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: Option<unknown>) => Option<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: Option<unknown>) => Option<void>
```

Added in v3.0.0

# model

## None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

Added in v3.0.0

## Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
```

Added in v3.0.0

## Some (interface)

**Signature**

```ts
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v3.0.0

# pattern matching

## match

Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
returned, otherwise the function is applied to the value inside the `Some` and the result is returned.

**Signature**

```ts
export declare const match: <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C
```

**Example**

```ts
import { some, none, match } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(
  pipe(
    some(1),
    match(
      () => 'a none',
      (a) => `a some containing ${a}`
    )
  ),
  'a some containing 1'
)

assert.strictEqual(
  pipe(
    none,
    match(
      () => 'a none',
      (a) => `a some containing ${a}`
    )
  ),
  'a none'
)
```

Added in v3.0.0

# refinements

## isNone

Returns `true` if the option is `None`, `false` otherwise.

**Signature**

```ts
export declare const isNone: (fa: Option<unknown>) => fa is None
```

**Example**

```ts
import { some, none, isNone } from 'fp-ts/Option'

assert.strictEqual(isNone(some(1)), false)
assert.strictEqual(isNone(none), true)
```

Added in v3.0.0

## isSome

Returns `true` if the option is an instance of `Some`, `false` otherwise.

**Signature**

```ts
export declare const isSome: <A>(fa: Option<A>) => fa is Some<A>
```

**Example**

```ts
import { some, none, isSome } from 'fp-ts/Option'

assert.strictEqual(isSome(some(1)), true)
assert.strictEqual(isSome(none), false)
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B>
```

Added in v3.0.0

## flatMapNullable

This is `flatMap` + `fromNullable`, useful when working with optional values.

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: Option<A>) => Option<NonNullable<B>>
```

**Example**

```ts
import { some, none, fromNullable, flatMapNullable } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string
      }
    }
  }
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

assert.deepStrictEqual(
  pipe(
    fromNullable(employee1.company),
    flatMapNullable((company) => company.address),
    flatMapNullable((address) => address.street),
    flatMapNullable((street) => street.name)
  ),
  some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    fromNullable(employee2.company),
    flatMapNullable((company) => company.address),
    flatMapNullable((address) => address.street),
    flatMapNullable((street) => street.name)
  ),
  none
)
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E, B>(f: (a: A) => Result<E, B>) => (ma: Option<A>) => Option<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: Option<unknown>) => <A>(self: Option<A>) => Option<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: Option<A>) => (self: Option<unknown>) => Option<A>
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Option<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, Option<A>>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly Option<A>[]) => Option<readonly A[]>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: Option<A>) => Kind<F, S, R, O, E, Option<B>>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => Option<B>
) => (as: readonly [A, ...A[]]) => Option<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: readonly [A, ...A[]]) => Option<readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Option<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Option<A>) => Option<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: Option<B>
) => <A extends readonly unknown[]>(self: Option<A>) => Option<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: Option<B>, f: (a: A, b: B) => C) => (self: Option<A>) => Option<C>
```

Added in v3.0.0

# type lambdas

## OptionTypeLambda (interface)

**Signature**

```ts
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(
  bfc: (b: B) => Option<C>
) => <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Option`.

**Signature**

```ts
export declare const elem: <A>(E: eq.Eq<A>) => (a: A) => (ma: Option<A>) => boolean
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(1)), true)
assert.strictEqual(pipe(O.some(1), O.elem(N.Eq)(2)), false)
assert.strictEqual(pipe(O.none, O.elem(N.Eq)(1)), false)
```

Added in v3.0.0

## exists

Returns `true` if the predicate is satisfied by the wrapped value

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Option<A>) => boolean
```

**Example**

```ts
import { some, none, exists } from 'fp-ts/Option'
import { pipe } from 'fp-ts/Function'

assert.strictEqual(
  pipe(
    some(1),
    exists((n) => n > 0)
  ),
  true
)
assert.strictEqual(
  pipe(
    some(1),
    exists((n) => n > 1)
  ),
  false
)
assert.strictEqual(
  pipe(
    none,
    exists((n) => n > 0)
  ),
  false
)
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => Option<A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => Option<unknown>) => (self: Option<A>) => Option<A>
```

Added in v3.0.0
