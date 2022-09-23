---
title: Option.ts
nav_order: 69
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

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const double = (n: number): number => n * 2

export const imperative = (as: ReadonlyArray<number>): string => {
  const head = (as: ReadonlyArray<number>): number => {
    if (as.length === 0) {
      throw new Error()
    }
    return as[0]
  }
  const inverse = (n: number): number => {
    if (n === 0) {
      throw new Error()
    }
    return 1 / n
  }
  try {
    return `Result is ${inverse(double(head(as)))}`
  } catch (e) {
    return 'no result'
  }
}

export const functional = (as: ReadonlyArray<number>): string => {
  const head = <A>(as: ReadonlyArray<A>): O.Option<A> => (as.length === 0 ? O.none : O.some(as[0]))
  const inverse = (n: number): O.Option<number> => (n === 0 ? O.none : O.some(1 / n))
  return pipe(
    as,
    head,
    O.map(double),
    O.chain(inverse),
    O.match(
      () => 'no result', // onNone handler
      (head) => `Result is ${head}` // onSome handler
    )
  )
}

assert.deepStrictEqual(imperative([1, 2, 3]), functional([1, 2, 3]))
assert.deepStrictEqual(imperative([]), functional([]))
assert.deepStrictEqual(imperative([0]), functional([0]))
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [duplicate](#duplicate)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [~~mapNullable~~](#mapnullable)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [getLeft](#getleft)
  - [getRight](#getright)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchW](#matchw)
- [instance operations](#instance-operations)
  - [alt](#alt)
  - [altW](#altw)
  - [ap](#ap)
  - [chain](#chain)
  - [compact](#compact)
  - [extend](#extend)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [foldMap](#foldmap)
  - [map](#map)
  - [of](#of)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [separate](#separate)
  - [sequence](#sequence)
  - [throwError](#throwerror)
  - [traverse](#traverse)
  - [wilt](#wilt)
  - [wither](#wither)
  - [zero](#zero)
- [instances](#instances)
  - [Alt](#alt)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [Compactable](#compactable)
  - [Extend](#extend)
  - [Filterable](#filterable)
  - [Foldable](#foldable)
  - [FromEither](#fromeither)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadThrow](#monadthrow)
  - [Pointed](#pointed)
  - [Traversable](#traversable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [Witherable](#witherable)
  - [Zero](#zero)
  - [getEq](#geteq)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getShow](#getshow)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getFirstMonoid~~](#getfirstmonoid)
  - [~~getLastMonoid~~](#getlastmonoid)
  - [~~option~~](#option)
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
- [refinements](#refinements)
  - [isNone](#isnone)
  - [isSome](#issome)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [elem](#elem)
  - [exists](#exists)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [~~getRefinement~~](#getrefinement)

---

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: Option<B>) => <A>(first: Option<A>) => Option<B>
```

Added in v2.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Option<A>) => Option<B>
```

Added in v2.11.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => Option<B>) => (first: Option<A>) => Option<A>
```

Added in v2.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Option<A>) => Option<A>
```

Added in v2.12.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: Option<A>) => Option<Option<A>>
```

Added in v2.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: Option<Option<A>>) => Option<A>
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => Option<B>
```

Added in v2.11.0

## ~~mapNullable~~

Use [`chainNullableK`](#chainnullablek) instead.

**Signature**

```ts
export declare const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: Option<A>) => Option<NonNullable<B>>
```

Added in v2.0.0

# constructors

## fromPredicate

Returns a _smart constructor_ based on the given predicate.

**Signature**

```ts
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => Option<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
```

**Example**

```ts
import { none, some, fromPredicate } from 'fp-ts/Option'

const getOption = fromPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), none)
assert.deepStrictEqual(getOption(1), some(1))
```

Added in v2.0.0

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

Added in v2.0.0

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

Added in v2.0.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => Option<void>
```

Added in v2.11.0

## none

`None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.

**Signature**

```ts
export declare const none: Option<never>
```

Added in v2.0.0

## some

Constructs a `Some`. Represents an optional value that exists.

**Signature**

```ts
export declare const some: <A>(a: A) => Option<A>
```

Added in v2.0.0

# destructors

## fold

Alias of [`match`](#match).

**Signature**

```ts
export declare const fold: <A, B>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B
```

Added in v2.0.0

## foldW

Alias of [`matchW`](#matchw).

**Signature**

```ts
export declare const foldW: <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C
```

Added in v2.10.0

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

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <B>(onNone: Lazy<B>) => <A>(ma: Option<A>) => B | A
```

Added in v2.6.0

## match

Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
returned, otherwise the function is applied to the value inside the `Some` and the result is returned.

**Signature**

```ts
export declare const match: <A, B>(onNone: Lazy<B>, onSome: (a: A) => B) => (ma: Option<A>) => B
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

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <B, A, C>(onNone: Lazy<B>, onSome: (a: A) => C) => (ma: Option<A>) => B | C
```

Added in v2.10.0

# instance operations

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Option` returns the left-most non-`None` value.

| x       | y       | pipe(x, alt(() => y) |
| ------- | ------- | -------------------- |
| none    | none    | none                 |
| some(a) | none    | some(a)              |
| none    | some(b) | some(b)              |
| some(a) | some(b) | some(a)              |

**Signature**

```ts
export declare const alt: <A>(that: Lazy<Option<A>>) => (fa: Option<A>) => Option<A>
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    O.none,
    O.alt(() => O.none)
  ),
  O.none
)
assert.deepStrictEqual(
  pipe(
    O.some('a'),
    O.alt<string>(() => O.none)
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
assert.deepStrictEqual(
  pipe(
    O.some('a'),
    O.alt(() => O.some('b'))
  ),
  O.some('a')
)
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(that: Lazy<Option<B>>) => <A>(fa: Option<A>) => Option<B | A>
```

Added in v2.9.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v2.0.0

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>
```

Added in v2.0.0

## compact

**Signature**

```ts
export declare const compact: <A>(fa: Option<Option<A>>) => Option<A>
```

Added in v2.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: Option<A>) => B) => (wa: Option<A>) => Option<B>
```

Added in v2.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Option<B>) => Option<B>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<A>
}
```

Added in v2.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>
```

Added in v2.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M
```

Added in v2.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
```

Added in v2.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Option<A>
```

Added in v2.7.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: Option<B>) => Separated<Option<B>, Option<B>>
  <A>(predicate: Predicate<A>): (fa: Option<A>) => Separated<Option<A>, Option<A>>
}
```

Added in v2.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: Option<A>) => Separated<Option<B>, Option<C>>
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B
```

Added in v2.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(ma: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>
```

Added in v2.0.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Option'>
```

Added in v2.6.3

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => Option<A>
```

Added in v2.7.0

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'Option'>
```

Added in v2.6.3

## wilt

**Signature**

```ts
export declare const wilt: PipeableWilt1<'Option'>
```

Added in v2.6.5

## wither

**Signature**

```ts
export declare const wither: PipeableWither1<'Option'>
```

Added in v2.6.5

## zero

**Signature**

```ts
export declare const zero: <A>() => Option<A>
```

Added in v2.7.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'Option'>
```

Added in v2.7.0

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'Option'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Option'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Option'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'Option'>
```

Added in v2.10.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'Option'>
```

Added in v2.7.0

## Extend

**Signature**

```ts
export declare const Extend: Extend1<'Option'>
```

Added in v2.7.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'Option'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Option'>
```

Added in v2.7.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'Option'>
```

Added in v2.11.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Option'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Option'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow1<'Option'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Option'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Option'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Option'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## Witherable

**Signature**

```ts
export declare const Witherable: Witherable1<'Option'>
```

Added in v2.7.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'Option'>
```

Added in v2.11.0

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
assert.strictEqual(E.equals(none, none), true)
assert.strictEqual(E.equals(none, some(1)), false)
assert.strictEqual(E.equals(some(1), none), false)
assert.strictEqual(E.equals(some(1), some(2)), false)
assert.strictEqual(E.equals(some(1), some(1)), true)
```

Added in v2.0.0

## getMonoid

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
concatenated using the provided `Semigroup`

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | some(a)            |
| none    | some(b) | some(b)            |
| some(a) | some(b) | some(concat(a, b)) |

**Signature**

```ts
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>
```

**Example**

```ts
import { getMonoid, some, none } from 'fp-ts/Option'
import { SemigroupSum } from 'fp-ts/number'

const M = getMonoid(SemigroupSum)
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(1)), some(1))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
```

Added in v2.0.0

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

const O = getOrd(N.Ord)
assert.strictEqual(O.compare(none, none), 0)
assert.strictEqual(O.compare(none, some(1)), -1)
assert.strictEqual(O.compare(some(1), none), 1)
assert.strictEqual(O.compare(some(1), some(2)), -1)
assert.strictEqual(O.compare(some(1), some(1)), 0)
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<Option<A>>
```

Added in v2.0.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getApplySemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>>
```

Added in v2.0.0

## ~~getFirstMonoid~~

Use

```ts
import { first } from 'fp-ts/Semigroup'
import { getMonoid } from 'fp-ts/Option'

getMonoid(first())
```

instead.

Monoid returning the left-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(b) | some(b)      |
| some(a) | some(b) | some(a)      |

**Signature**

```ts
export declare const getFirstMonoid: <A = never>() => Monoid<Option<A>>
```

**Example**

```ts
import { getFirstMonoid, some, none } from 'fp-ts/Option'

const M = getFirstMonoid<number>()
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(2)), some(2))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
```

Added in v2.0.0

## ~~getLastMonoid~~

Use

```ts
import { last } from 'fp-ts/Semigroup'
import { getMonoid } from 'fp-ts/Option'

getMonoid(last())
```

instead.

Monoid returning the right-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(b) | some(b)      |
| some(a) | some(b) | some(b)      |

**Signature**

```ts
export declare const getLastMonoid: <A = never>() => Monoid<Option<A>>
```

**Example**

```ts
import { getLastMonoid, some, none } from 'fp-ts/Option'

const M = getLastMonoid<number>()
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(2)), some(2))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
```

Added in v2.0.0

## ~~option~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `O.Functor` instead of `O.option`
(where `O` is from `import O from 'fp-ts/Option'`)

**Signature**

```ts
export declare const option: Monad1<'Option'> &
  Foldable1<'Option'> &
  Alternative1<'Option'> &
  Extend1<'Option'> &
  Witherable1<'Option'> &
  MonadThrow1<'Option'>
```

Added in v2.0.0

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
  readonly company?: {
    readonly address?: {
      readonly street?: {
        readonly name?: string
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

Added in v2.9.0

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

Added in v2.0.0

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

Added in v2.9.0

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

Added in v2.0.0

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

Added in v2.0.0

## tryCatch

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
`Some`.

See also [`tryCatchK`](#trycatchk).

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

Added in v2.0.0

## tryCatchK

Converts a function that may throw to one returning a `Option`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

Added in v2.10.0

# model

## None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

Added in v2.0.0

## Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
```

Added in v2.0.0

## Some (interface)

**Signature**

```ts
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v2.0.0

# natural transformations

## fromEither

Transforms an `Either` to an `Option` discarding the error.

Alias of [getRight](#getright)

**Signature**

```ts
export declare const fromEither: <A>(fa: Either<unknown, A>) => Option<A>
```

Added in v2.0.0

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

Added in v2.0.0

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

Added in v2.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Option<readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: Option<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: Option<B>
) => (fa: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (ma: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: Option<A>) => Option<{ readonly [K in N]: A }>
```

Added in v2.8.0

## elem

Returns `true` if `ma` contains `a`

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): {
  (a: A): (ma: Option<A>) => boolean
  (a: A, ma: Option<A>): boolean
}
```

**Example**

```ts
import { some, none, elem } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'

assert.strictEqual(pipe(some(1), elem(N.Eq)(1)), true)
assert.strictEqual(pipe(some(1), elem(N.Eq)(2)), false)
assert.strictEqual(pipe(none, elem(N.Eq)(1)), false)
```

Added in v2.0.0

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

Added in v2.0.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: Option<A>) => Option<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <A>(arr: readonly Option<A>[]) => Option<readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => Option<B>) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: readonly A[]) => Option<readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Option<B>
) => (as: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## ~~getRefinement~~

Use `Refinement` module instead.

**Signature**

```ts
export declare function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>
```

Added in v2.0.0
