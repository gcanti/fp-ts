---
title: Either.ts
nav_order: 24
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

- [Apply](#apply)
  - [ap](#ap)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Chain](#chain)
  - [chain](#chain)
- [ChainRec](#chainrec)
  - [chainRec](#chainrec)
- [Extend](#extend)
  - [extend](#extend)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [EitherF (interface)](#eitherf-interface)
  - [EitherFFixedE (interface)](#eitherffixede-interface)
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [chainOptionK](#chainoptionk)
  - [filterOrElse](#filterorelse)
  - [flap](#flap)
  - [fromOptionK](#fromoptionk)
  - [orElse](#orelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [right](#right)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [match](#match)
- [guards](#guards)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [instance operations](#instance-operations)
  - [alt](#alt)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain-1)
  - [ChainRec](#chainrec-1)
  - [Extend](#extend-1)
  - [Foldable](#foldable-1)
  - [FromEither](#fromeither)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [getAltValidation](#getaltvalidation)
  - [getApplicativeValidation](#getapplicativevalidation)
  - [getCompactable](#getcompactable)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getWitherable](#getwitherable)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
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
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [elem](#elem)
  - [exists](#exists)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
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

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E2, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v3.0.0

# ChainRec

## chainRec

**Signature**

```ts
export declare const chainRec: <A, E, B>(f: (a: A) => Either<E, Either<A, B>>) => (a: A) => Either<E, B>
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

# HKT

## EitherF (interface)

**Signature**

```ts
export interface EitherF extends HKT {
  readonly type: Either<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## EitherFFixedE (interface)

**Signature**

```ts
export interface EitherFFixedE<E> extends HKT {
  readonly type: Either<E, this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E = never>(a: A) => Either<E, A>
```

Added in v3.0.0

# Traversable

## sequence

**Signature**

```ts
export declare const sequence: <F extends HKT>(
  F: ApplicativeModule.Applicative<F>
) => <E, FS, FR, FW, FE, A>(fa: Either<E, Kind<F, FS, FR, FW, FE, A>>) => Kind<F, FS, FR, FW, FE, Either<E, A>>
```

Added in v3.0.0

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: <F extends HKT>(
  F: ApplicativeModule.Applicative<F>
) => <A, FS, FR, FW, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FW, FE, B>
) => <E>(ta: Either<E, A>) => Kind<F, FS, FR, FW, FE, Either<E, B>>
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

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(mb: Either<E1, B>) => Either<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E2 | E1, A>
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

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v3.0.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => Either<E, B>
```

Added in v3.0.0

## orElse

Useful for recovering from errors.

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  onLeft: (e: E1) => Either<E2, B>
) => <A>(ma: Either<E1, A>) => Either<E2, B | A>
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

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Either<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => Either<B, B>
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

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <A, E = never>(a: A) => Either<E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(first: Either<E1, A>) => Either<E2 | E1, A>
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

Derivable from `Chain`.

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

# destructors

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
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
export declare const match: <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>) => B | C
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const onLeft = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.strictEqual(pipe(E.right(1), E.match(onLeft, onRight)), 'Ok: 1')
assert.strictEqual(pipe(E.left(['error 1', 'error 2']), E.match(onLeft, onRight)), 'Errors: error 1, error 2')
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

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).

| x        | y        | pipe(x, alt(() => y) |
| -------- | -------- | -------------------- |
| left(a)  | left(b)  | left(b)              |
| left(a)  | right(2) | right(2)             |
| right(1) | left(b)  | right(1)             |
| right(1) | right(2) | right(1)             |

**Signature**

```ts
export declare const alt: <E2, B>(second: Lazy<Either<E2, B>>) => <E1, A>(first: Either<E1, A>) => Either<E2, B | A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.alt(() => E.left('b'))
  ),
  E.left('b')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.alt(() => E.right(2))
  ),
  E.right(2)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.alt(() => E.left('b'))
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.alt(() => E.right(2))
  ),
  E.right(1)
)
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: AltModule.Alt<EitherF>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: ApplicativeModule.Applicative<EitherF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: ApplyModule.Apply<EitherF>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: BifunctorModule.Bifunctor<EitherF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: ChainModule.Chain<EitherF>
```

Added in v3.0.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRecModule.ChainRec<EitherF>
```

Added in v3.0.0

## Extend

**Signature**

```ts
export declare const Extend: ExtendModule.Extend<EitherF>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: FoldableModule.Foldable<EitherF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEitherModule.FromEither<EitherF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: FunctorModule.Functor<EitherF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: MonadModule.Monad<EitherF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: PointedModule.Pointed<EitherF>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: TraversableModule.Traversable<EitherF>
```

Added in v3.0.0

## getAltValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare const getAltValidation: <E>(S: Semigroup<E>) => AltModule.Alt<EitherFFixedE<E>>
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
    E.alt<string, string | number>(() => parseNumber(u))
  )

assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error

const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))

const parseAll = (u: unknown): E.Either<string, string | number> =>
  pipe(
    parseString(u),
    Alt.alt(() => parseNumber(u) as E.Either<string, string | number>)
  )

assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
```

Added in v3.0.0

## getApplicativeValidation

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare const getApplicativeValidation: <E>(S: Semigroup<E>) => ApplicativeModule.Applicative<EitherFFixedE<E>>
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
  pipe(E.Do, E.apS('name', parseString(input.name)), E.apS('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error

const Applicative = E.getApplicativeValidation(pipe(string.Semigroup, S.intercalate(', ')))

const apS = A.apS(Applicative)

const parsePersonAll = (input: Record<string, unknown>): E.Either<string, Person> =>
  pipe(E.Do, apS('name', parseString(input.name)), apS('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
```

Added in v3.0.0

## getCompactable

Builds a `Compactable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => CompactableModule.Compactable<EitherFFixedE<E>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: EqModule.Eq<E>, EA: EqModule.Eq<A>) => EqModule.Eq<Either<E, A>>
```

Added in v3.0.0

## getFilterable

Builds a `Filterable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => FilterableModule.Filterable<EitherFFixedE<E>>
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
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const S = E.getSemigroup<number, string>(N.SemigroupSum)
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
export declare const getWitherable: <E>(M: Monoid<E>) => WitherableModule.Witherable<EitherFFixedE<E>>
```

Added in v3.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: Lazy<E>
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

Added in v3.0.0

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

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: Lazy<E>
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

See also [`tryCatchK`](#tryCatchK).

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
    throw new Error('empty array')
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> => E.tryCatch(() => unsafeHead(as))

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
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => Either<E, A>
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

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E2, B>(
  fb: Either<E2, B>
) => <E1, A extends readonly unknown[]>(fas: Either<E1, A>) => Either<E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: Either<E, A>) => Either<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Either`.

**Signature**

```ts
export declare const elem: <A>(E: EqModule.Eq<A>) => (a: A) => <E>(ma: Either<E, A>) => boolean
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

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
) => (as: ReadonlyNonEmptyArray<A>) => Either<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => Either<E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(fa: Either<E, A>) => Either<E, readonly [A]>
```

Added in v3.0.0
