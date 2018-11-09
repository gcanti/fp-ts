---
id: Option
title: Module Option
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)

## option

```ts
Monad1<URI> &
  Foldable2v1<URI> &
  Plus1<URI> &
  Traversable2v1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI>
```

Added in v1.0.0 (instance)

# Option

```ts
type Option<A> = None<A> | Some<A>
```

Added in v1.0.0 (data)

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

## alt

```ts
(fa: Option<A>): Option<A>
```

Added in v1.0.0 (method)

`alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.

_Example_

```ts
import { Option, some, none } from 'fp-ts/lib/Option'

assert.deepEqual(some(2).alt(some(4)), some(2))
const fa: Option<number> = none
assert.deepEqual(fa.alt(some(4)), some(4))
```

## ap

```ts
<B>(fab: Option<(a: A) => B>): Option<B>
```

Added in v1.0.0 (method)

`ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.

_Example_

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(some(2).ap(some((x: number) => x + 1)), some(3))
assert.deepEqual(none.ap(some((x: number) => x + 1)), none)
```

## ap\_

```ts
<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

_Example_

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
assert.deepEqual(none.ap_(some(2)), none)
```

## chain

```ts
<B>(f: (a: A) => Option<B>): Option<B>
```

Added in v1.0.0 (method)

Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
`Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
`None`)

## contains

```ts
(S: Setoid<A>, a: A): boolean
```

Added in v1.0.0 (method)

Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise

## exists

```ts
(p: (a: A) => boolean): boolean
```

Added in v1.0.0 (method)

Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value

## extend

```ts
<B>(f: (ea: Option<A>) => B): Option<B>
```

Added in v1.0.0 (method)

## filter

```ts
(p: Predicate<A>): Option<A>
```

Added in v1.0.0 (method)

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns `None`

## fold

```ts
<B>(b: B, whenSome: (a: A) => B): B
```

Added in v1.0.0 (method)

Applies a function to each case in the data structure

_Example_

```ts
import { none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
```

## foldL

```ts
<B>(whenNone: () => B, whenSome: (a: A) => B): B
```

Added in v1.0.0 (method)

Lazy version of [fold](#fold)

## getOrElse

```ts
(a: A): A
```

Added in v1.0.0 (method)

Returns the value from this `Some` or the given argument if this is a `None`

_Example_

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).getOrElse(0), 1)
const fa: Option<number> = none
assert.strictEqual(fa.getOrElse(0), 0)
```

## getOrElseL

```ts
(f: () => A): A
```

Added in v1.0.0 (method)

Lazy version of [getOrElse](#getorelse)

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isNone

```ts
(): this is None<A>
```

Added in v1.0.0 (method)

Returns `true` if the option is `None`, `false` otherwise

## isSome

```ts
(): this is Some<A>
```

Added in v1.0.0 (method)

Returns `true` if the option is an instance of `Some`, `false` otherwise

## map

```ts
<B>(f: (a: A) => B): Option<B>
```

Added in v1.0.0 (method)

Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.

_Example_

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(some(1).map(n => n * 2), some(2))
```

## mapNullable

```ts
<B>(f: (a: A) => B | null | undefined): Option<B>
```

Added in v1.0.0 (method)

Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`

_Example_

```ts
import { none, some } from 'fp-ts/lib/Option'

interface Foo {
  bar?: {
    baz?: string
  }
}

assert.deepEqual(
  some<Foo>({ bar: { baz: 'quux' } })
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  some('quux')
)
assert.deepEqual(
  some<Foo>({ bar: {} })
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  none
)
assert.deepEqual(
  some<Foo>({})
    .mapNullable(foo => foo.bar)
    .mapNullable(bar => bar.baz),
  none
)
```

## orElse

```ts
(fa: Lazy<Option<A>>): Option<A>
```

Added in v1.6.0 (method)

Lazy version of [alt](#alt)

_Example_

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(some(1).orElse(() => some(2)), some(1))
```

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## refine

```ts
<B extends A>(refinement: Refinement<A, B>): Option<B>
```

Added in v1.3.0 (method)

Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
this Option's value. Otherwise returns `None`

## toNullable

```ts
(): A | null
```

Added in v1.0.0 (method)

Returns the value from this `Some` or `null` if this is a `None`

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## toUndefined

```ts
(): A | undefined
```

Added in v1.0.0 (method)

Returns the value from this `Some` or `undefined` if this is a `None`

## none

```ts
const none: Option<never>
```

Added in v1.0.0 (constant)

## fromEither

```ts
<L, A>(fa: Either<L, A>): Option<A>
```

Added in v1.0.0 (function)

Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
value wrapped in a `Some`

_Example_

```ts
import { none, some, fromEither } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'

assert.deepEqual(fromEither(left(1)), none)
assert.deepEqual(fromEither(right(1)), some(1))
```

## fromNullable

```ts
<A>(a: A | null | undefined): Option<A>
```

Added in v1.0.0 (function)

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`

_Example_

```ts
import { none, some, fromNullable } from 'fp-ts/lib/Option'

assert.deepEqual(fromNullable(undefined), none)
assert.deepEqual(fromNullable(null), none)
assert.deepEqual(fromNullable(1), some(1))
```

## fromPredicate

```ts
<A>(predicate: Predicate<A>) => (a: A): Option<A>
```

Added in v1.0.0 (function)

_Example_

```ts
import { none, some, fromPredicate } from 'fp-ts/lib/Option'

const positive = fromPredicate((n: number) => n >= 0)

assert.deepEqual(positive(-1), none)
assert.deepEqual(positive(1), some(1))
```

## fromRefinement

```ts
<A, B extends A>(refinement: Refinement<A, B>) => (a: A): Option<B>
```

Added in v1.3.0 (function)

Refinement version of [fromPredicate](#frompredicate)

## getApplyMonoid

```ts
<A>(M: Monoid<A>): Monoid<Option<A>>
```

Added in v1.7.0 (function)

## getApplySemigroup

```ts
<A>(S: Semigroup<A>): Semigroup<Option<A>>
```

Added in v1.7.0 (function)

[Apply](./Apply.md) semigroup

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | none               |
| none    | some(a) | none               |
| some(a) | some(b) | some(concat(a, b)) |

_Example_

```ts
import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getApplySemigroup(semigroupSum)
assert.deepEqual(S.concat(none, none), none)
assert.deepEqual(S.concat(some(1), none), none)
assert.deepEqual(S.concat(none, some(1)), none)
assert.deepEqual(S.concat(some(1), some(2)), some(3))
```

## getFirstMonoid

```ts
<A = never>(): Monoid<Option<A>>
```

Added in v1.0.0 (function)

Monoid returning the left-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(a)      |

_Example_

```ts
import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'

const M = getFirstMonoid<number>()
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(1))
```

## getLastMonoid

```ts
<A = never>(): Monoid<Option<A>>
```

Added in v1.0.0 (function)

Monoid returning the right-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(b)      |

_Example_

```ts
import { getLastMonoid, some, none } from 'fp-ts/lib/Option'

const M = getLastMonoid<number>()
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(2))
```

## getMonoid

```ts
<A>(S: Semigroup<A>): Monoid<Option<A>>
```

Added in v1.0.0 (function)

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
appended using the provided `Semigroup`

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | some(a)            |
| none    | some(a) | some(a)            |
| some(a) | some(b) | some(concat(a, b)) |

_Example_

```ts
import { getMonoid, some, none } from 'fp-ts/lib/Option'
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const M = getMonoid(semigroupSum)
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(3))
```

## getOrd

```ts
<A>(O: Ord<A>): Ord<Option<A>>
```

Added in v1.2.0 (function)

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

_Example_

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

## getRefinement

```ts
<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>
```

Added in v1.7.0 (function)

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

## getSetoid

```ts
<A>(S: Setoid<A>): Setoid<Option<A>>
```

Added in v1.0.0 (function)

_Example_

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

## isNone

```ts
<A>(fa: Option<A>): fa is None<A>
```

Added in v1.0.0 (function)

Returns `true` if the option is `None`, `false` otherwise

## isSome

```ts
<A>(fa: Option<A>): fa is Some<A>
```

Added in v1.0.0 (function)

Returns `true` if the option is an instance of `Some`, `false` otherwise

## some

Alias of [of](#of)

Added in v1.0.0 (function)

## tryCatch

```ts
<A>(f: Lazy<A>): Option<A>
```

Added in v1.0.0 (function)

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
`Some`

_Example_

```ts
import { none, some, tryCatch } from 'fp-ts/lib/Option'

assert.deepEqual(
  tryCatch(() => {
    throw new Error()
  }),
  none
)
assert.deepEqual(tryCatch(() => 1), some(1))
```
