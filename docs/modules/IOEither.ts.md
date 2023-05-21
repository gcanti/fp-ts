---
title: IOEither.ts
nav_order: 51
parent: Modules
---

## IOEither overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`.

If you want to represent a synchronous computation that never fails, please see `IO`.
If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [tap](#tap)
  - [tapEither](#tapeither)
  - [tapIO](#tapio)
- [constructors](#constructors)
  - [left](#left)
  - [leftIO](#leftio)
  - [of](#of)
  - [right](#right)
  - [rightIO](#rightio)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromOption](#fromoption)
  - [toUnion](#tounion)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [let](#let)
- [error handling](#error-handling)
  - [alt](#alt)
  - [altW](#altw)
  - [getAltIOValidation](#getaltiovalidation)
  - [getApplicativeIOValidation](#getapplicativeiovalidation)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [orElse](#orelse)
  - [orElseFirstIOK](#orelsefirstiok)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [instances](#instances)
  - [Alt](#alt)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [Bifunctor](#bifunctor)
  - [Chain](#chain)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [MonadThrow](#monadthrow)
  - [Pointed](#pointed)
- [interop](#interop)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [legacy](#legacy)
  - [bimap](#bimap)
  - [chain](#chain)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstW](#chainfirstw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainOptionKW](#chainoptionkw)
  - [chainW](#chainw)
  - [fromOptionK](#fromoptionk)
  - [mapLeft](#mapleft)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstW](#orelsefirstw)
- [lifting](#lifting)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromPredicate](#frompredicate)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [IOEither (interface)](#ioeither-interface)
- [pattern matching](#pattern-matching)
  - [fold](#fold)
  - [foldW](#foldw)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapIO](#flatmapio)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [apW](#apw)
  - [bracket](#bracket)
  - [bracketW](#bracketw)
  - [swap](#swap)
  - [throwError](#throwerror)
- [zone of death](#zone-of-death)
  - [~~Applicative~~](#applicative)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getIOValidation~~](#getiovalidation)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~ioEither~~](#ioeither)

---

# combinators

## tap

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tap: {
  <E1, A, E2, _>(self: IOEither<E1, A>, f: (a: A) => IOEither<E2, _>): IOEither<E1 | E2, A>
  <A, E2, _>(f: (a: A) => IOEither<E2, _>): <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, A>
}
```

Added in v2.15.0

## tapEither

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapEither: {
  <E1, A, E2, _>(self: IOEither<E1, A>, f: (a: A) => E.Either<E2, _>): IOEither<E1 | E2, A>
  <A, E2, _>(f: (a: A) => E.Either<E2, _>): <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, A>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'

const compute = (value: string) =>
  pipe(
    IOE.of(value),
    IOE.tapEither(() => (value.length > 0 ? E.right('ok') : E.left('error')))
  )

assert.deepStrictEqual(compute('')(), E.left('error'))
assert.deepStrictEqual(compute('fp-ts')(), E.right('fp-ts'))
```

Added in v2.16.0

## tapIO

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const tapIO: {
  <E, A, _>(self: IOEither<E, A>, f: (a: A) => I.IO<_>): IOEither<E, A>
  <A, _>(f: (a: A) => I.IO<_>): <E>(self: IOEither<E, A>) => IOEither<E, A>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import * as Console from 'fp-ts/Console'

const sayHello = (value: string) => Console.log(`Hello, ${value}`)

// Will produce `Hello, fp-ts` to the stdout
const effectA = IOE.tapIO(IOE.of('fp-ts'), sayHello)

// No output to the stdout
const effectB = pipe(IOE.left<string>('error'), IOE.tapIO(sayHello))

assert.deepStrictEqual(effectA(), E.right('fp-ts'))
assert.deepStrictEqual(effectB(), E.left('error'))
```

Added in v2.16.0

# constructors

## left

**Signature**

```ts
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: I.IO<E>) => IOEither<E, A>
```

Added in v2.0.0

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(a: A) => IOEither<E, A>
```

Added in v2.8.5

## right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>
```

Added in v2.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: I.IO<A>) => IOEither<E, A>
```

Added in v2.0.0

# conversions

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(fa: E.Either<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E = never>(fa: I.IO<A>) => IOEither<E, A>
```

Added in v2.7.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(fa: Option<A>) => IOEither<E, A>
```

Added in v2.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: IOEither<E, A>) => I.IO<E | A>
```

Added in v2.10.0

# do notation

## Do

**Signature**

```ts
export declare const Do: IOEither<never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: IOEither<E, A>) => IOEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

# error handling

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <E, A>(that: LazyArg<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <E2, B>(
  that: LazyArg<IOEither<E2, B>>
) => <E1, A>(fa: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v2.9.0

## getAltIOValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare function getAltIOValidation<E>(S: Semigroup<E>): Alt2C<URI, E>
```

Added in v2.7.0

## getApplicativeIOValidation

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare function getApplicativeIOValidation<E>(S: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => I.IO<A>) => (ma: IOEither<E, A>) => I.IO<A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => I.IO<B>) => <A>(ma: IOEither<E, A>) => I.IO<B | A>
```

Added in v2.6.0

## mapBoth

Returns a `IOEither` whose failure and success channels have been mapped by the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: {
  <E, G, A, B>(f: (e: E) => G, g: (a: A) => B): (self: IOEither<E, A>) => IOEither<G, B>
  <E, A, G, B>(self: IOEither<E, A>, f: (e: E) => G, g: (a: A) => B): IOEither<G, B>
}
```

**Example**

```ts
import * as IOEither from 'fp-ts/IOEither'
import * as Either from 'fp-ts/Either'

const f = (s: string) => new Error(s)
const g = (n: number) => n * 2

assert.deepStrictEqual(IOEither.mapBoth(IOEither.right(1), f, g)(), Either.right(2))
assert.deepStrictEqual(IOEither.mapBoth(IOEither.left('err'), f, g)(), Either.left(new Error('err')))
```

Added in v2.16.0

## mapError

Returns a `IOEither` with its error channel mapped using the specified function.

**Signature**

```ts
export declare const mapError: {
  <E, G>(f: (e: E) => G): <A>(self: IOEither<E, A>) => IOEither<G, A>
  <E, A, G>(self: IOEither<E, A>, f: (e: E) => G): IOEither<G, A>
}
```

**Example**

```ts
import * as IOEither from 'fp-ts/IOEither'
import * as Either from 'fp-ts/Either'

const f = (s: string) => new Error(s)

assert.deepStrictEqual(IOEither.mapError(IOEither.right(1), f)(), Either.right(1))
assert.deepStrictEqual(IOEither.mapError(IOEither.left('err'), f)(), Either.left(new Error('err')))
```

Added in v2.16.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, A, E2>(onLeft: (e: E1) => IOEither<E2, A>) => (ma: IOEither<E1, A>) => IOEither<E2, A>
```

Added in v2.0.0

## orElseFirstIOK

**Signature**

```ts
export declare const orElseFirstIOK: <E, B>(onLeft: (e: E) => I.IO<B>) => <A>(ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.12.0

## orElseW

Less strict version of [`orElse`](#orelse).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v2.10.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, E2>(onLeft: (e: E1) => I.IO<E2>) => <A>(fa: IOEither<E1, A>) => IOEither<E2, A>
```

Added in v2.11.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: {
  <E1, E2, _>(onLeft: (e: E1) => IOEither<E2, _>): <A>(self: IOEither<E1, A>) => IOEither<E1 | E2, A>
  <E1, A, E2, _>(self: IOEither<E1, A>, onLeft: (e: E1) => IOEither<E2, _>): IOEither<E1 | E2, A>
}
```

Added in v2.15.0

# filtering

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(mb: IOEither<E, B>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: IOEither<E1, B>
  ) => IOEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, A>
}
```

Added in v2.9.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'IOEither', E>
```

Added in v2.10.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'IOEither'>
```

Added in v2.7.0

## ApplicativePar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'IOEither'>
```

Added in v2.8.4

## ApplicativeSeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'IOEither'>
```

Added in v2.8.4

## ApplyPar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplyPar: Apply2<'IOEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'IOEither'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: chainable.Chain2<'IOEither'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'IOEither'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'IOEither'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'IOEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'IOEither'>
```

Added in v2.7.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'IOEither'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'IOEither'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'IOEither'>
```

Added in v2.10.0

# interop

## tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <E, A>(f: LazyArg<A>, onThrow: (reason: unknown) => E) => IOEither<E, A>
```

Added in v2.0.0

## tryCatchK

Converts a function that may throw to one returning a `IOEither`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (reason: unknown) => E
) => (...a: A) => IOEither<E, B>
```

Added in v2.10.0

# legacy

## bimap

Alias of `mapBoth`.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
```

Added in v2.0.0

## chain

Alias of `flatMap`.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

## chainEitherK

Alias of `flatMapEither`.

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.4.0

## chainEitherKW

Alias of `flatMapEither`.

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Alias of `tap`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## chainFirstEitherK

Alias of `tapEither`.

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(f: (a: A) => E.Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.12.0

## chainFirstEitherKW

Alias of `tapEither`.

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v2.12.0

## chainFirstIOK

Alias of `tapIO`.

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.10.0

## chainFirstW

Alias of `tap`.

**Signature**

```ts
export declare const chainFirstW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v2.8.0

## chainIOK

Alias of `flatMapIO`.

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.10.0

## chainOptionK

Use `flatMapOption`.

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: LazyArg<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.10.0

## chainOptionKW

Use `flatMapOption`.

**Signature**

```ts
export declare const chainOptionKW: <E2>(
  onNone: LazyArg<E2>
) => <A, B>(f: (a: A) => Option<B>) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.13.2

## chainW

Alias of `flatMap`.

**Signature**

```ts
export declare const chainW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.6.0

## fromOptionK

Use `liftOption`.

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: LazyArg<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => IOEither<E, B>
```

Added in v2.10.0

## mapLeft

Alias of `mapError`.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
```

Added in v2.0.0

## orElseFirst

Alias of `tapError`.

**Signature**

```ts
export declare const orElseFirst: <E, B>(onLeft: (e: E) => IOEither<E, B>) => <A>(ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.11.0

## orElseFirstW

Alias of `tapError`.

**Signature**

```ts
export declare const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
```

Added in v2.11.0

# lifting

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => IOEither<E, B>
```

Added in v2.4.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => I.IO<B>
) => <E = never>(...a: A) => IOEither<E, B>
```

Added in v2.10.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
}
```

Added in v2.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => IOEither<E, NonNullable<B>>
```

Added in v2.15.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => IOEither<E, B>
```

Added in v2.15.0

# mapping

## as

Maps the `Right` value of this `IOEither` to the specified constant value.

**Signature**

```ts
export declare const as: {
  <E, A, _>(self: IOEither<E, _>, a: A): IOEither<E, A>
  <A>(a: A): <E, _>(self: IOEither<E, _>) => IOEither<E, A>
}
```

Added in v2.16.0

## asUnit

Maps the `Right` value of this `IOEither` to the void constant value.

**Signature**

```ts
export declare const asUnit: <E, _>(self: IOEither<E, _>) => IOEither<E, void>
```

Added in v2.16.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# model

## IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

Added in v2.0.0

# pattern matching

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.0.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<C>
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v2.10.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`IO`).

**Signature**

```ts
export declare const matchE: <E, A, B>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <E, B, A, C>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<C>
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v2.10.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, E2, B>(f: (a: A) => IOEither<E2, B>): <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
  <E1, A, E2, B>(ma: IOEither<E1, A>, f: (a: A) => IOEither<E2, B>): IOEither<E1 | E2, B>
}
```

Added in v2.14.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: {
  <A, B, E2>(f: (a: A) => E.Either<E2, B>): <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, B>
  <E1, A, B, E2>(self: IOEither<E1, A>, f: (a: A) => E.Either<E2, B>): IOEither<E1 | E2, B>
}
```

Added in v2.15.0

## flatMapIO

**Signature**

```ts
export declare const flatMapIO: {
  <A, B>(f: (a: A) => I.IO<B>): <E>(self: IOEither<E, A>) => IOEither<E, B>
  <E, A, B>(self: IOEither<E, A>, f: (a: A) => I.IO<B>): IOEither<E, B>
}
```

Added in v2.16.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: {
  <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): <E1>(
    self: IOEither<E1, A>
  ) => IOEither<E2 | E1, NonNullable<B>>
  <E1, A, B, E2>(self: IOEither<E1, A>, f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): IOEither<
    E1 | E2,
    NonNullable<B>
  >
}
```

Added in v2.15.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: {
  <A, B, E2>(f: (a: A) => Option<B>, onNone: (a: A) => E2): <E1>(self: IOEither<E1, A>) => IOEither<E2 | E1, B>
  <E1, A, B, E2>(self: IOEither<E1, A>, f: (a: A) => Option<B>, onNone: (a: A) => E2): IOEither<E1 | E2, B>
}
```

Added in v2.15.0

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const flattenW: <E1, E2, A>(mma: IOEither<E1, IOEither<E2, A>>) => IOEither<E1 | E2, A>
```

Added in v2.11.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v2.9.0

## sequenceSeqArray

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceSeqArray: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => IOEither<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseSeqArray

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseSeqArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'IOEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: IOEither<never, readonly []>
```

Added in v2.11.0

## ap

**Signature**

```ts
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <E2, B>(
  second: IOEither<E2, B>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.12.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apW: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E2 | E1, B>
```

Added in v2.8.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => IOEither<E, void>
) => IOEither<E, B>
```

Added in v2.0.0

## bracketW

Less strict version of [`bracket`](#bracket).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const bracketW: <E1, A, E2, B, E3>(
  acquire: IOEither<E1, A>,
  use: (a: A) => IOEither<E2, B>,
  release: (a: A, e: E.Either<E2, B>) => IOEither<E3, void>
) => IOEither<E1 | E2 | E3, B>
```

Added in v2.12.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

Added in v2.0.0

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => IOEither<E, A>
```

Added in v2.7.0

# zone of death

## ~~Applicative~~

Use [`ApplicativePar`](#applicativepar) instead

**Signature**

```ts
export declare const Applicative: Applicative2<'IOEither'>
```

Added in v2.7.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<IOEither<E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## ~~getIOValidation~~

Use [`getApplicativeIOValidation`](#getapplicativeiovalidation) and [`getAltIOValidation`](#getaltiovalidation).

**Signature**

```ts
export declare function getIOValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## ~~ioEither~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `IOE.Functor` instead of `IOE.ioEither`
(where `IOE` is from `import IOE from 'fp-ts/IOEither'`)

**Signature**

```ts
export declare const ioEither: Monad2<'IOEither'> &
  Bifunctor2<'IOEither'> &
  Alt2<'IOEither'> &
  MonadIO2<'IOEither'> &
  MonadThrow2<'IOEither'>
```

Added in v2.0.0
