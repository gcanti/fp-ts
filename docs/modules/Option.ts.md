---
title: Option.ts
nav_order: 60
parent: Modules
---

# Overview

If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
some time (other languages will throw similarly named errors in such a case). Usually this happens because some
method returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
your client code.

```ts
const as: Array<string> = []
as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
```

fp-ts models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.

`Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
instance of `None<A>`.

An option could be looked at as a collection or foldable structure with either one or zero elements.
Another way to look at option is: it represents the effect of a possibly failing computation.

```ts
import { Option, some, none } from 'fp-ts/lib/Option'

const someValue: Option<string> = some('foo')
const emptyValue: Option<string> = none
```

Let's write a function that may or not give us a string, thus returning `Option<string>`

```ts
const head = (as: Array<string>): Option<string> => {
  return as.length > 0 ? some(as[0]) : none
}
```

Using `getOrElse` we can provide a default value `"No value"` when the optional argument `None` does not exist:

```ts
const value1 = head(['foo', 'bar']) // some('foo)
const value2 = head([]) // none
value1.getOrElse('No value') // 'foo'
value2.getOrElse('No value') // 'No value'
```

Checking whether option has value:

```ts
value1.isNone() // false
value2.isNone() // true
```

We can pattern match using the `fold` method

```ts
const number: Option<number> = some(3)
const noNumber: Option<number> = none
number.fold(1, n => n * 3) // 9
noNumber.fold(1, n => n * 3) // 1
```

You can chain several possibly failing computations using the `chain` method

```ts
const inverse = (n: number): Option<number> => {
  return n === 0 ? none : some(1 / n)
}

number.chain(inverse) // 1/3
noNumber.chain(inverse) // none
some(0).chain(inverse) // none
```

Computing over independent values

```ts
const sum = (a: number) => (b: number): number => a + b
const sumLifted = (oa: Option<number>, ob: Option<number>): Option<number> => ob.ap(oa.map(sum))
sumLifted(some(1), some(2)) // some(3)
sumLifted(some(1), none) // none
```

---

<h2 class="text-delta">Table of contents</h2>

- [None (interface)](#none-interface)
- [Some (interface)](#some-interface)
- [Option (type alias)](#option-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [none (constant)](#none-constant)
- [option (constant)](#option-constant)
- [contains (function)](#contains-function)
- [exists (function)](#exists-function)
- [fold (function)](#fold-function)
- [foldL (function)](#foldl-function)
- [fromEither (function)](#fromeither-function)
- [fromNullable (function)](#fromnullable-function)
- [fromPredicate (function)](#frompredicate-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getFirstMonoid (function)](#getfirstmonoid-function)
- [getLastMonoid (function)](#getlastmonoid-function)
- [getMonoid (function)](#getmonoid-function)
- [getOrElse (function)](#getorelse-function)
- [getOrElseL (function)](#getorelsel-function)
- [getOrd (function)](#getord-function)
- [getRefinement (function)](#getrefinement-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [isNone (function)](#isnone-function)
- [isSome (function)](#issome-function)
- [mapNullable (function)](#mapnullable-function)
- [orElse (function)](#orelse-function)
- [some (function)](#some-function)
- [toNullable (function)](#tonullable-function)
- [toUndefined (function)](#toundefined-function)
- [tryCatch (function)](#trycatch-function)

---

# None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

# Some (interface)

**Signature**

```ts
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

# Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# none (constant)

**Signature**

```ts
export const none: Option<never> = ...
```

Added in v1.0.0

# option (constant)

**Signature**

```ts
export const option: Monad1<URI> &
  Foldable1<URI> &
  Plus1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> = ...
```

Added in v1.0.0

# contains (function)

**Signature**

```ts
export function contains<A>(S: Setoid<A>): (ma: Option<A>, a: A) => boolean { ... }
```

Added in v2.0.0

# exists (function)

**Signature**

```ts
export function exists<A>(ma: Option<A>, predicate: (a: A) => boolean): boolean { ... }
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<A, R>(ma: Option<A>, onNone: R, onSome: (a: A) => R): R { ... }
```

Added in v2.0.0

# foldL (function)

**Signature**

```ts
export function foldL<A, R>(ma: Option<A>, onNone: () => R, onSome: (a: A) => R): R { ... }
```

Added in v2.0.0

# fromEither (function)

Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
value wrapped in a `Some`

**Signature**

```ts
export const fromEither = <L, A>(ma: Either<L, A>): Option<A> => ...
```

**Example**

```ts
import { none, some, fromEither } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(fromEither(left(1)), none)
assert.deepStrictEqual(fromEither(right(1)), some(1))
```

Added in v1.0.0

# fromNullable (function)

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`

**Signature**

```ts
export const fromNullable = <A>(a: A | null | undefined): Option<A> => ...
```

**Example**

```ts
import { none, some, fromNullable } from 'fp-ts/lib/Option'

assert.deepStrictEqual(fromNullable(undefined), none)
assert.deepStrictEqual(fromNullable(null), none)
assert.deepStrictEqual(fromNullable(1), some(1))
```

Added in v1.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<A, B extends A>(predicate: Refinement<A, B>): (a: A) => Option<B>
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A> { ... }
```

**Example**

```ts
import { none, some, fromPredicate } from 'fp-ts/lib/Option'

const positive = fromPredicate((n: number) => n >= 0)

assert.deepStrictEqual(positive(-1), none)
assert.deepStrictEqual(positive(1), some(1))
```

Added in v1.0.0

# getApplyMonoid (function)

**Signature**

```ts
export const getApplyMonoid = <A>(M: Monoid<A>): Monoid<Option<A>> => ...
```

Added in v1.7.0

# getApplySemigroup (function)

`Apply` semigroup

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | none               |
| none    | some(a) | none               |
| some(a) | some(b) | some(concat(a, b)) |

**Signature**

```ts
export const getApplySemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => ...
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

Added in v1.7.0

# getFirstMonoid (function)

Monoid returning the left-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(a)      |

**Signature**

```ts
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => ...
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

Added in v1.0.0

# getLastMonoid (function)

Monoid returning the right-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(b)      |

**Signature**

```ts
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => ...
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

Added in v1.0.0

# getMonoid (function)

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
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => ...
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

Added in v1.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<A>(ma: Option<A>, a: A): A { ... }
```

Added in v2.0.0

# getOrElseL (function)

**Signature**

```ts
export function getOrElseL<A>(ma: Option<A>, f: () => A): A { ... }
```

Added in v2.0.0

# getOrd (function)

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Option<A>> => ...
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

Added in v1.2.0

# getRefinement (function)

Returns a refinement from a prism.
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
export const getRefinement = <A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> => ...
```

Added in v1.7.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => ...
```

**Example**

```ts
import { none, some, getSetoid } from 'fp-ts/lib/Option'
import { setoidNumber } from 'fp-ts/lib/Setoid'

const S = getSetoid(setoidNumber)
assert.strictEqual(S.equals(none, none), true)
assert.strictEqual(S.equals(none, some(1)), false)
assert.strictEqual(S.equals(some(1), none), false)
assert.strictEqual(S.equals(some(1), some(2)), false)
assert.strictEqual(S.equals(some(1), some(1)), true)
```

Added in v1.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(S: Show<A>): Show<Option<A>> => ...
```

Added in v1.17.0

# isNone (function)

Returns `true` if the option is `None`, `false` otherwise

**Signature**

```ts
export const isNone = <A>(fa: Option<A>): fa is None => ...
```

Added in v1.0.0

# isSome (function)

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature**

```ts
export const isSome = <A>(fa: Option<A>): fa is Some<A> => ...
```

Added in v1.0.0

# mapNullable (function)

**Signature**

```ts
export function mapNullable<A, B>(ma: Option<A>, f: (a: A) => B | null | undefined): Option<B> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<A>(ma: Option<A>, f: () => Option<A>): Option<A> { ... }
```

Added in v2.0.0

# some (function)

**Signature**

```ts
export const some = <A>(a: A): Option<A> => ...
```

Added in v1.0.0

# toNullable (function)

**Signature**

```ts
export function toNullable<A>(ma: Option<A>): A | null { ... }
```

Added in v2.0.0

# toUndefined (function)

**Signature**

```ts
export function toUndefined<A>(ma: Option<A>): A | undefined { ... }
```

Added in v2.0.0

# tryCatch (function)

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
`Some`

**Signature**

```ts
export const tryCatch = <A>(f: Lazy<A>): Option<A> => ...
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
assert.deepStrictEqual(tryCatch(() => 1), some(1))
```

Added in v1.0.0
