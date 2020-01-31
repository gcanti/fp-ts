---
title: Option.ts
nav_order: 57
parent: Modules
---

# Option overview

If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
some time (other languages will throw similarly named errors in such a case). Usually this happens because some
function returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
your client code.

```ts
const as: Array<string> = []
as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
```

`fp-ts` models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.

`Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
instance of `None`.

```ts
import { lookup } from 'fp-ts/lib/Array'

const as: Array<string> = []
lookup(0, as) // => Option<string>
```

An option could be looked at as a collection or foldable structure with either one or zero elements.
Another way to look at option is: it represents the effect of a possibly failing computation.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [None (interface)](#none-interface)
- [Some (interface)](#some-interface)
- [Option (type alias)](#option-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [compact](#compact)
- [duplicate](#duplicate)
- [elem](#elem)
- [exists](#exists)
- [extend](#extend)
- [filter](#filter)
- [filterMap](#filtermap)
- [flatten](#flatten)
- [fold](#fold)
- [foldMap](#foldmap)
- [fromEither](#fromeither)
- [fromNullable](#fromnullable)
- [fromPredicate](#frompredicate)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getEq](#geteq)
- [getFirstMonoid](#getfirstmonoid)
- [getLastMonoid](#getlastmonoid)
- [getLeft](#getleft)
- [getMonoid](#getmonoid)
- [getOrElse](#getorelse)
- [getOrd](#getord)
- [getRefinement](#getrefinement)
- [getRight](#getright)
- [getShow](#getshow)
- [isNone](#isnone)
- [isSome](#issome)
- [map](#map)
- [mapNullable](#mapnullable)
- [none](#none)
- [option](#option)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [reduce](#reduce)
- [reduceRight](#reduceright)
- [separate](#separate)
- [some](#some)
- [toNullable](#tonullable)
- [toUndefined](#toundefined)
- [tryCatch](#trycatch)

---

# None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

Added in v2.0.0

# Some (interface)

**Signature**

```ts
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v2.0.0

# Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
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
export const URI: "Option" = ...
```

Added in v2.0.0

# alt

**Signature**

```ts
<A>(that: () => Option<A>) => (fa: Option<A>) => Option<A>
```

Added in v2.0.0

# ap

**Signature**

```ts
<A>(fa: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<B>(fb: Option<B>) => <A>(fa: Option<A>) => Option<B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>
```

Added in v2.0.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<A>
```

Added in v2.0.0

# compact

**Signature**

```ts
<A>(fa: Option<Option<A>>) => Option<A>
```

Added in v2.0.0

# duplicate

**Signature**

```ts
<A>(ma: Option<A>) => Option<Option<A>>
```

Added in v2.0.0

# elem

Returns `true` if `ma` contains `a`

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, ma: Option<A>) => boolean { ... }
```

**Example**

```ts
import { some, none, elem } from 'fp-ts/lib/Option'
import { eqNumber } from 'fp-ts/lib/Eq'

assert.strictEqual(elem(eqNumber)(1, some(1)), true)
assert.strictEqual(elem(eqNumber)(2, some(1)), false)
assert.strictEqual(elem(eqNumber)(1, none), false)
```

Added in v2.0.0

# exists

Returns `true` if the predicate is satisfied by the wrapped value

**Signature**

```ts
export function exists<A>(predicate: Predicate<A>): (ma: Option<A>) => boolean { ... }
```

**Example**

```ts
import { some, none, exists } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

assert.strictEqual(
  pipe(
    some(1),
    exists(n => n > 0)
  ),
  true
)
assert.strictEqual(
  pipe(
    some(1),
    exists(n => n > 1)
  ),
  false
)
assert.strictEqual(
  pipe(
    none,
    exists(n => n > 0)
  ),
  false
)
```

Added in v2.0.0

# extend

**Signature**

```ts
<A, B>(f: (fa: Option<A>) => B) => (ma: Option<A>) => Option<B>
```

Added in v2.0.0

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Option<A>) => Option<B>; <A>(predicate: Predicate<A>): (fa: Option<A>) => Option<A>; }
```

Added in v2.0.0

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: Option<A>) => Option<B>
```

Added in v2.0.0

# flatten

**Signature**

```ts
<A>(mma: Option<Option<A>>) => Option<A>
```

Added in v2.0.0

# fold

Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
returned, otherwise the function is applied to the value inside the `Some` and the result is returned.

**Signature**

```ts
export function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Option<A>) => B { ... }
```

**Example**

```ts
import { some, none, fold } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

assert.strictEqual(
  pipe(
    some(1),
    fold(
      () => 'a none',
      a => `a some containing ${a}`
    )
  ),
  'a some containing 1'
)

assert.strictEqual(
  pipe(
    none,
    fold(
      () => 'a none',
      a => `a some containing ${a}`
    )
  ),
  'a none'
)
```

Added in v2.0.0

# foldMap

**Signature**

```ts
;<M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Option<A>) => M
```

Added in v2.0.0

# fromEither

**Signature**

```ts
<E, A>(ma: Either<E, A>) => Option<A>
```

Added in v2.0.0

# fromNullable

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`

**Signature**

```ts
export function fromNullable<A>(a: A): Option<NonNullable<A>> { ... }
```

**Example**

```ts
import { none, some, fromNullable } from 'fp-ts/lib/Option'

assert.deepStrictEqual(fromNullable(undefined), none)
assert.deepStrictEqual(fromNullable(null), none)
assert.deepStrictEqual(fromNullable(1), some(1))
```

Added in v2.0.0

# fromPredicate

Returns a smart constructor based on the given predicate

**Signature**

```ts
export function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => Option<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> { ... }
```

**Example**

```ts
import { none, some, fromPredicate } from 'fp-ts/lib/Option'

const getOption = fromPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), none)
assert.deepStrictEqual(getOption(1), some(1))
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export function getApplyMonoid<A>(M: Monoid<A>): Monoid<Option<A>> { ... }
```

Added in v2.0.0

# getApplySemigroup

`Apply` semigroup

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | none               |
| none    | some(a) | none               |
| some(a) | some(b) | some(concat(a, b)) |

**Signature**

```ts
export function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<Option<A>> { ... }
```

**Example**

```ts
import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup(semigroupSum)
assert.deepStrictEqual(S.concat(none, none), none)
assert.deepStrictEqual(S.concat(some(1), none), none)
assert.deepStrictEqual(S.concat(none, some(1)), none)
assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
```

Added in v2.0.0

# getEq

**Signature**

```ts
export function getEq<A>(E: Eq<A>): Eq<Option<A>> { ... }
```

**Example**

```ts
import { none, some, getEq } from 'fp-ts/lib/Option'
import { eqNumber } from 'fp-ts/lib/Eq'

const E = getEq(eqNumber)
assert.strictEqual(E.equals(none, none), true)
assert.strictEqual(E.equals(none, some(1)), false)
assert.strictEqual(E.equals(some(1), none), false)
assert.strictEqual(E.equals(some(1), some(2)), false)
assert.strictEqual(E.equals(some(1), some(1)), true)
```

Added in v2.0.0

# getFirstMonoid

Monoid returning the left-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(a)      |

**Signature**

```ts
export function getFirstMonoid<A = never>(): Monoid<Option<A>> { ... }
```

**Example**

```ts
import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'

const M = getFirstMonoid<number>()
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(1)), some(1))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
```

Added in v2.0.0

# getLastMonoid

Monoid returning the right-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(b)      |

**Signature**

```ts
export function getLastMonoid<A = never>(): Monoid<Option<A>> { ... }
```

**Example**

```ts
import { getLastMonoid, some, none } from 'fp-ts/lib/Option'

const M = getLastMonoid<number>()
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(1)), some(1))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
```

Added in v2.0.0

# getLeft

Returns an `E` value if possible

**Signature**

```ts
export function getLeft<E, A>(ma: Either<E, A>): Option<E> { ... }
```

Added in v2.0.0

# getMonoid

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
appended using the provided `Semigroup`

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | some(a)            |
| none    | some(a) | some(a)            |
| some(a) | some(b) | some(concat(a, b)) |

**Signature**

```ts
export function getMonoid<A>(S: Semigroup<A>): Monoid<Option<A>> { ... }
```

**Example**

```ts
import { getMonoid, some, none } from 'fp-ts/lib/Option'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), some(1))
assert.deepStrictEqual(M.concat(none, some(1)), some(1))
assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
```

Added in v2.0.0

# getOrElse

Extracts the value out of the structure, if it exists. Otherwise returns the given default value

**Signature**

```ts
export function getOrElse<A>(onNone: () => A): (ma: Option<A>) => A { ... }
```

**Example**

```ts
import { some, none, getOrElse } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

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

# getOrd

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export function getOrd<A>(O: Ord<A>): Ord<Option<A>> { ... }
```

**Example**

```ts
import { none, some, getOrd } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'

const O = getOrd(ordNumber)
assert.strictEqual(O.compare(none, none), 0)
assert.strictEqual(O.compare(none, some(1)), -1)
assert.strictEqual(O.compare(some(1), none), 1)
assert.strictEqual(O.compare(some(1), some(2)), -1)
assert.strictEqual(O.compare(some(1), some(1)), 0)
```

Added in v2.0.0

# getRefinement

Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
This function ensures that a custom type guard definition is type-safe.

```ts
import { some, none, getRefinement } from 'fp-ts/lib/Option'

type A = { type: 'A' }
type B = { type: 'B' }
type C = A | B

const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
```

**Signature**

```ts
export function getRefinement<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> { ... }
```

Added in v2.0.0

# getRight

Returns an `A` value if possible

**Signature**

```ts
export function getRight<E, A>(ma: Either<E, A>): Option<A> { ... }
```

Added in v2.0.0

# getShow

**Signature**

```ts
export function getShow<A>(S: Show<A>): Show<Option<A>> { ... }
```

Added in v2.0.0

# isNone

Returns `true` if the option is `None`, `false` otherwise

**Signature**

```ts
export function isNone<A>(fa: Option<A>): fa is None { ... }
```

**Example**

```ts
import { some, none, isNone } from 'fp-ts/lib/Option'

assert.strictEqual(isNone(some(1)), false)
assert.strictEqual(isNone(none), true)
```

Added in v2.0.0

# isSome

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature**

```ts
export function isSome<A>(fa: Option<A>): fa is Some<A> { ... }
```

**Example**

```ts
import { some, none, isSome } from 'fp-ts/lib/Option'

assert.strictEqual(isSome(some(1)), true)
assert.strictEqual(isSome(none), false)
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: Option<A>) => Option<B>
```

Added in v2.0.0

# mapNullable

This is `chain` + `fromNullable`, useful when working with optional values

**Signature**

```ts
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: Option<A>) => Option<B> { ... }
```

**Example**

```ts
import { some, none, fromNullable, mapNullable } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

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
    mapNullable(company => company.address),
    mapNullable(address => address.street),
    mapNullable(street => street.name)
  ),
  some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    fromNullable(employee2.company),
    mapNullable(company => company.address),
    mapNullable(address => address.street),
    mapNullable(street => street.name)
  ),
  none
)
```

Added in v2.0.0

# none

**Signature**

```ts
export const none: Option<never> = ...
```

Added in v2.0.0

# option

**Signature**

```ts
export const option: Monad1<URI> &
  Foldable1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> &
  MonadThrow1<URI> = ...
```

Added in v2.0.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: Option<A>) => Separated<Option<A>, Option<B>>; <A>(predicate: Predicate<A>): (fa: Option<A>) => Separated<Option<A>, Option<A>>; }
```

Added in v2.0.0

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: Option<A>) => Separated<Option<B>, Option<C>>
```

Added in v2.0.0

# reduce

**Signature**

```ts
;<A, B>(b: B, f: (b: B, a: A) => B) => (fa: Option<A>) => B
```

Added in v2.0.0

# reduceRight

**Signature**

```ts
;<A, B>(b: B, f: (a: A, b: B) => B) => (fa: Option<A>) => B
```

Added in v2.0.0

# separate

**Signature**

```ts
<A, B>(fa: Option<Either<A, B>>) => Separated<Option<A>, Option<B>>
```

Added in v2.0.0

# some

**Signature**

```ts
export function some<A>(a: A): Option<A> { ... }
```

Added in v2.0.0

# toNullable

Extracts the value out of the structure, if it exists. Otherwise returns `null`.

**Signature**

```ts
export function toNullable<A>(ma: Option<A>): A | null { ... }
```

**Example**

```ts
import { some, none, toNullable } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

assert.strictEqual(pipe(some(1), toNullable), 1)
assert.strictEqual(pipe(none, toNullable), null)
```

Added in v2.0.0

# toUndefined

Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.

**Signature**

```ts
export function toUndefined<A>(ma: Option<A>): A | undefined { ... }
```

**Example**

```ts
import { some, none, toUndefined } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

assert.strictEqual(pipe(some(1), toUndefined), 1)
assert.strictEqual(pipe(none, toUndefined), undefined)
```

Added in v2.0.0

# tryCatch

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
`Some`

**Signature**

```ts
export function tryCatch<A>(f: Lazy<A>): Option<A> { ... }
```

**Example**

```ts
import { none, some, tryCatch } from 'fp-ts/lib/Option'

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
