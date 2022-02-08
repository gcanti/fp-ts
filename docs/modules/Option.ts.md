---
title: Option.ts
nav_order: 62
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

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Extend](#extend)
  - [extend](#extend)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [Witherable](#witherable)
  - [wilt](#wilt)
  - [wither](#wither)
- [Zero](#zero)
  - [zero](#zero)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [flap](#flap)
  - [fromEitherK](#fromeitherk)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [getLeft](#getleft)
  - [getRight](#getright)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchW](#matchw)
- [guards](#guards)
  - [isNone](#isnone)
  - [isSome](#issome)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [Compactable](#compactable-1)
  - [Extend](#extend-1)
  - [Filterable](#filterable-1)
  - [Foldable](#foldable-1)
  - [FromEither](#fromeither)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable-1)
  - [URI (type alias)](#uri-type-alias)
  - [Witherable](#witherable-1)
  - [Zero](#zero-1)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getShow](#getshow)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [Some (interface)](#some-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [elem](#elem)
  - [exists](#exists)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Option` returns the left-most non-`None` value.

**Signature**

```ts
export declare const alt: <A>(second: Lazy<Option<A>>) => (first: Option<A>) => Option<A>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    O.some('a'),
    O.alt(() => O.some('b'))
  ),
  O.some('a')
)
assert.deepStrictEqual(
  pipe(
    O.none,
    O.alt(() => O.some('b'))
  ),
  O.some('b')
)
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(second: Lazy<Option<B>>) => <A>(first: Option<A>) => Option<B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>
```

Added in v3.0.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(foa: Option<Option<A>>) => Option<A>
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>
```

Added in v3.0.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: Filter1<'Option'>
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
export declare const partition: Partition1<'Option'>
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => Separated<Option<B>, Option<C>>
```

Added in v3.0.0

# Foldable

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

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Option<A>
```

Added in v3.0.0

# Traversable

## traverse

**Signature**

```ts
export declare const traverse: Traverse1<'Option'>
```

Added in v3.0.0

# Witherable

## wilt

**Signature**

```ts
export declare const wilt: Wilt1<'Option'>
```

Added in v3.0.0

## wither

**Signature**

```ts
export declare const wither: Wither1<'Option'>
```

Added in v3.0.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => Option<A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: Option<A>) => Option<B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A, E, B>(f: (...a: A) => Either<E, B>) => (...a: A) => Option<B>
```

Added in v3.0.0

# constructors

## fromPredicate

Returns a _smart constructor_ based on the given predicate.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): (a: A) => Option<B>
  <A>(predicate: Predicate<A>): <B>(b: B) => Option<B>
  <A>(predicate: Predicate<A>): (a: A) => Option<A>
}
```

**Example**

```ts
import * as O from 'fp-ts/Option'

const getOption = O.fromPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), O.none)
assert.deepStrictEqual(getOption(1), O.some(1))
```

Added in v3.0.0

## getLeft

Returns the `Left` value of an `Either` if possible.

**Signature**

```ts
export declare const getLeft: <E, A>(ma: Either<E, A>) => Option<E>
```

**Example**

```ts
import { getLeft, none, some } from 'fp-ts/Option'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(getLeft(right(1)), none)
assert.deepStrictEqual(getLeft(left('a')), some('a'))
```

Added in v3.0.0

## getRight

Returns the `Right` value of an `Either` if possible.

**Signature**

```ts
export declare const getRight: <E, A>(ma: Either<E, A>) => Option<A>
```

**Example**

```ts
import { getRight, none, some } from 'fp-ts/Option'
import { right, left } from 'fp-ts/Either'

assert.deepStrictEqual(getRight(right(1)), some(1))
assert.deepStrictEqual(getRight(left('a')), none)
```

Added in v3.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => Option<void>
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

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Option<B>) => (first: Option<A>) => Option<A>
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>
```

Added in v3.0.0

# destructors

## getOrElse

Extracts the value out of the structure, if it exists. Otherwise returns the given default value

**Signature**

```ts
export declare const getOrElse: <A>(onNone: Lazy<A>) => (ma: Option<A>) => A
```

**Example**

```ts
import { some, none, getOrElse } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.strictEqual(
  pipe(
    some(1),
    getOrElse(() => 0)
  ),
  1
)
assert.strictEqual(
  pipe(
    none,
    getOrElse(() => 0)
  ),
  0
)
```

Added in v3.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <B>(onNone: Lazy<B>) => <A>(ma: Option<A>) => B | A
```

Added in v3.0.0

## match

Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
returned, otherwise the function is applied to the value inside the `Some` and the result is returned.

**Signature**

```ts
export declare const match: <B, A>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B
```

**Example**

```ts
import { some, none, match } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

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

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C
```

Added in v3.0.0

# guards

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

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'Option'>
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'Option'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Option'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Option'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'Option'>
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'Option'>
```

Added in v3.0.0

## Extend

**Signature**

```ts
export declare const Extend: Extend1<'Option'>
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'Option'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Option'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'Option'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Option'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Option'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Option'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Option'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Option'
```

Added in v3.0.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'Option'>
```

Added in v3.0.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'Option'>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<Option<A>>
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
concatenated using the provided `Semigroup`

| x       | y       | concat(y)(x)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | some(a)            |
| none    | some(a) | some(a)            |
| some(a) | some(b) | some(concat(b)(a)) |

**Signature**

```ts
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>
```

**Example**

```ts
import { getMonoid, some, none } from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

const M = getMonoid(N.SemigroupSum)
assert.deepStrictEqual(pipe(none, M.concat(none)), none)
assert.deepStrictEqual(pipe(some(1), M.concat(none)), some(1))
assert.deepStrictEqual(pipe(none, M.concat(some(1))), some(1))
assert.deepStrictEqual(pipe(some(1), M.concat(some(2))), some(3))
```

Added in v3.0.0

## getOrd

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export declare const getOrd: <A>(O: Ord<A>) => Ord<Option<A>>
```

**Example**

```ts
import { none, some, getOrd } from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

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

## chainNullableK

This is `chain` + `fromNullable`, useful when working with optional values.

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: Option<A>) => Option<NonNullable<B>>
```

**Example**

```ts
import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

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
    chainNullableK((company) => company.address),
    chainNullableK((address) => address.street),
    chainNullableK((street) => street.name)
  ),
  some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    fromNullable(employee2.company),
    chainNullableK((company) => company.address),
    chainNullableK((address) => address.street),
    chainNullableK((street) => street.name)
  ),
  none
)
```

Added in v3.0.0

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

## fromNullableK

Returns a _smart constructor_ from a function that returns a nullable value.

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Option<NonNullable<B>>
```

**Example**

```ts
import { fromNullableK, none, some } from 'fp-ts/Option'

const f = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const g = fromNullableK(f)

assert.deepStrictEqual(g('1'), some(1))
assert.deepStrictEqual(g('a'), none)
```

Added in v3.0.0

## toNullable

Extracts the value out of the structure, if it exists. Otherwise returns `null`.

**Signature**

```ts
export declare const toNullable: <A>(ma: Option<A>) => A | null
```

**Example**

```ts
import { some, none, toNullable } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.strictEqual(pipe(some(1), toNullable), 1)
assert.strictEqual(pipe(none, toNullable), null)
```

Added in v3.0.0

## toUndefined

Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.

**Signature**

```ts
export declare const toUndefined: <A>(ma: Option<A>) => A | undefined
```

**Example**

```ts
import { some, none, toUndefined } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.strictEqual(pipe(some(1), toUndefined), 1)
assert.strictEqual(pipe(none, toUndefined), undefined)
```

Added in v3.0.0

## tryCatch

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
`Some`.

See also [`tryCatchK`](#tryCatchK).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<A>) => Option<A>
```

**Example**

```ts
import { none, some, tryCatch } from 'fp-ts/Option'

assert.deepStrictEqual(
  tryCatch(() => {
    throw new Error()
  }),
  none
)
assert.deepStrictEqual(
  tryCatch(() => 1),
  some(1)
)
```

Added in v3.0.0

## tryCatchK

Converts a function that may throw to one returning a `Option`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
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

# natural transformations

## fromEither

Transforms an `Either` to an `Option` discarding the error.

Alias of [getRight](#getRight)

**Signature**

```ts
export declare const fromEither: NaturalTransformation21<'Either', 'Option'>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Option<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Option<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (fa: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: Option<B>) => <A>(fas: Option<A>) => Option<readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (ma: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: Option<A>) => Option<{ [K in N]: A }>
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `Option`.

**Signature**

```ts
export declare const elem: <A>(E: Eq<A>) => (a: A) => (ma: Option<A>) => boolean
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import * as N from 'fp-ts/number'
import { pipe } from 'fp-ts/function'

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
import { pipe } from 'fp-ts/function'

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

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: Option<A>) => Option<readonly [A]>
```

Added in v3.0.0
