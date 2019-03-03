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

- [Option (type alias)](#option-type-alias)
- [URI (type alias)](#uri-type-alias)
- [None (class)](#none-class)
  - [map (method)](#map-method)
  - [mapNullable (method)](#mapnullable-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [reduce (method)](#reduce-method)
  - [alt (method)](#alt-method)
  - [orElse (method)](#orelse-method)
  - [extend (method)](#extend-method)
  - [fold (method)](#fold-method)
  - [foldL (method)](#foldl-method)
  - [getOrElse (method)](#getorelse-method)
  - [getOrElseL (method)](#getorelsel-method)
  - [toNullable (method)](#tonullable-method)
  - [toUndefined (method)](#toundefined-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [contains (method)](#contains-method)
  - [isNone (method)](#isnone-method)
  - [isSome (method)](#issome-method)
  - [exists (method)](#exists-method)
  - [filter (method)](#filter-method)
  - [~~refine~~ (method)](#refine-method)
- [Some (class)](#some-class)
  - [map (method)](#map-method-1)
  - [mapNullable (method)](#mapnullable-method-1)
  - [ap (method)](#ap-method-1)
  - [ap\_ (method)](#ap_-method-1)
  - [chain (method)](#chain-method-1)
  - [reduce (method)](#reduce-method-1)
  - [alt (method)](#alt-method-1)
  - [orElse (method)](#orelse-method-1)
  - [extend (method)](#extend-method-1)
  - [fold (method)](#fold-method-1)
  - [foldL (method)](#foldl-method-1)
  - [getOrElse (method)](#getorelse-method-1)
  - [getOrElseL (method)](#getorelsel-method-1)
  - [toNullable (method)](#tonullable-method-1)
  - [toUndefined (method)](#toundefined-method-1)
  - [inspect (method)](#inspect-method-1)
  - [toString (method)](#tostring-method-1)
  - [contains (method)](#contains-method-1)
  - [isNone (method)](#isnone-method-1)
  - [isSome (method)](#issome-method-1)
  - [exists (method)](#exists-method-1)
  - [filter (method)](#filter-method-1)
  - [refine (method)](#refine-method)
- [URI (constant)](#uri-constant)
- [none (constant)](#none-constant)
- [option (constant)](#option-constant)
- [fromEither (function)](#fromeither-function)
- [fromNullable (function)](#fromnullable-function)
- [fromPredicate (function)](#frompredicate-function)
- [~~fromRefinement~~ (function)](#fromrefinement-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getFirstMonoid (function)](#getfirstmonoid-function)
- [getLastMonoid (function)](#getlastmonoid-function)
- [getMonoid (function)](#getmonoid-function)
- [getOrd (function)](#getord-function)
- [getRefinement (function)](#getrefinement-function)
- [getSetoid (function)](#getsetoid-function)
- [isNone (function)](#isnone-function)
- [isSome (function)](#issome-function)
- [some (function)](#some-function)
- [tryCatch (function)](#trycatch-function)

---

# Option (type alias)

**Signature**

```ts
export type Option<A> = None<A> | Some<A>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# None (class)

**Signature**

```ts
export class None<A> {
  private constructor() { ... }
  ...
}
```

## map (method)

Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.

**Signature**

```ts
map<B>(f: (a: A) => B): Option<B> { ... }
```

**Example**

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(1).map(n => n * 2), some(2))
```

## mapNullable (method)

Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`

**Signature**

```ts
mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> { ... }
```

**Example**

```ts
import { none, some } from 'fp-ts/lib/Option'

interface Foo {
  bar?: {
    baz?: string
  }
}

assert.deepStrictEqual(
  some<Foo>({ bar: { baz: 'quux' } })
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  some('quux')
)
assert.deepStrictEqual(
  some<Foo>({ bar: {} })
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  none
)
assert.deepStrictEqual(
  some<Foo>({})
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  none
)
```

## ap (method)

`ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.

**Signature**

```ts
ap<B>(fab: Option<(a: A) => B>): Option<B> { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(2).ap(some((x: number) => x + 1)), some(3))
assert.deepStrictEqual(none.ap(some((x: number) => x + 1)), none)
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
assert.deepStrictEqual(none.ap_(some(2)), none)
```

## chain (method)

Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
`Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
`None`)

**Signature**

```ts
chain<B>(f: (a: A) => Option<B>): Option<B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## alt (method)

`alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.

**Signature**

```ts
alt(fa: Option<A>): Option<A> { ... }
```

**Example**

```ts
import { Option, some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(2).alt(some(4)), some(2))
const fa: Option<number> = none
assert.deepStrictEqual(fa.alt(some(4)), some(4))
```

## orElse (method)

Lazy version of `alt`

**Signature**

```ts
orElse(fa: Lazy<Option<A>>): Option<A> { ... }
```

**Example**

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
```

Added in v1.6.0

## extend (method)

**Signature**

```ts
extend<B>(f: (ea: Option<A>) => B): Option<B> { ... }
```

## fold (method)

Applies a function to each case in the data structure

**Signature**

```ts
fold<B>(b: B, onSome: (a: A) => B): B { ... }
```

**Example**

```ts
import { none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
```

## foldL (method)

Lazy version of `fold`

**Signature**

```ts
foldL<B>(onNone: () => B, onSome: (a: A) => B): B { ... }
```

## getOrElse (method)

Returns the value from this `Some` or the given argument if this is a `None`

**Signature**

```ts
getOrElse(a: A): A { ... }
```

**Example**

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).getOrElse(0), 1)
const fa: Option<number> = none
assert.strictEqual(fa.getOrElse(0), 0)
```

## getOrElseL (method)

Lazy version of `getOrElse`

**Signature**

```ts
getOrElseL(f: () => A): A { ... }
```

## toNullable (method)

Returns the value from this `Some` or `null` if this is a `None`

**Signature**

```ts
toNullable(): A | null { ... }
```

## toUndefined (method)

Returns the value from this `Some` or `undefined` if this is a `None`

**Signature**

```ts
toUndefined(): A | undefined { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## contains (method)

Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise

**Signature**

```ts
contains(S: Setoid<A>, a: A): boolean { ... }
```

## isNone (method)

Returns `true` if the option is `None`, `false` otherwise

**Signature**

```ts
isNone(): this is None<A> { ... }
```

## isSome (method)

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature**

```ts
isSome(): this is Some<A> { ... }
```

## exists (method)

Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value

**Signature**

```ts
exists(p: (a: A) => boolean): boolean { ... }
```

## filter (method)

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns `None`

**Signature**

```ts
filter<B extends A>(p: Refinement<A, B>): Option<B>
filter(p: Predicate<A>): Option<A>
filter(p: Predicate<A>): Option<A> { ... }
```

## ~~refine~~ (method)

Use `filter` instead.
Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
this Option's value. Otherwise returns `None`

**Signature**

```ts
refine<B extends A>(refinement: Refinement<A, B>): Option<B> { ... }
```

Added in v1.3.0

# Some (class)

**Signature**

```ts
export class Some<A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Option<B> { ... }
```

## mapNullable (method)

**Signature**

```ts
mapNullable<B>(f: (a: A) => B | null | undefined): Option<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Option<(a: A) => B>): Option<B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Option<B>): Option<B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## alt (method)

**Signature**

```ts
alt(fa: Option<A>): Option<A> { ... }
```

## orElse (method)

**Signature**

```ts
orElse(fa: Lazy<Option<A>>): Option<A> { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (ea: Option<A>) => B): Option<B> { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(b: B, onSome: (a: A) => B): B { ... }
```

## foldL (method)

**Signature**

```ts
foldL<B>(onNone: () => B, onSome: (a: A) => B): B { ... }
```

## getOrElse (method)

**Signature**

```ts
getOrElse(a: A): A { ... }
```

## getOrElseL (method)

**Signature**

```ts
getOrElseL(f: () => A): A { ... }
```

## toNullable (method)

**Signature**

```ts
toNullable(): A | null { ... }
```

## toUndefined (method)

**Signature**

```ts
toUndefined(): A | undefined { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## contains (method)

**Signature**

```ts
contains(S: Setoid<A>, a: A): boolean { ... }
```

## isNone (method)

**Signature**

```ts
isNone(): this is None<A> { ... }
```

## isSome (method)

**Signature**

```ts
isSome(): this is Some<A> { ... }
```

## exists (method)

**Signature**

```ts
exists(p: (a: A) => boolean): boolean { ... }
```

## filter (method)

**Signature**

```ts
filter<B extends A>(p: Refinement<A, B>): Option<B>
filter(p: Predicate<A>): Option<A>
filter(p: Predicate<A>): Option<A> { ... }
```

## refine (method)

**Signature**

```ts
refine<B extends A>(refinement: Refinement<A, B>): Option<B> { ... }
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
  Foldable2v1<URI> &
  Plus1<URI> &
  Traversable2v1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> = ...
```

Added in v1.0.0

# fromEither (function)

Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
value wrapped in a `Some`

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): Option<A> => ...
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
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>
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

# ~~fromRefinement~~ (function)

Use `fromPredicate` instead.
Refinement version of `fromPredicate`

**Signature**

```ts
export const fromRefinement = <A, B extends A>(refinement: Refinement<A, B>) => (a: A): Option<B> => ...
```

Added in v1.3.0

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

# isNone (function)

Returns `true` if the option is `None`, `false` otherwise

**Signature**

```ts
export const isNone = <A>(fa: Option<A>): fa is None<A> => ...
```

Added in v1.0.0

# isSome (function)

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature**

```ts
export const isSome = <A>(fa: Option<A>): fa is Some<A> => ...
```

Added in v1.0.0

# some (function)

**Signature**

```ts
export const some = <A>(a: A): Option<A> => ...
```

Added in v1.0.0

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
