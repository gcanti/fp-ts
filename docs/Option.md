---
id: Option
title: Module Option
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)

# Option

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L117-L117)

```ts
export type Option<A> = None<A> | Some<A>

export class None<A> {
  private constructor() {}
  ...
}

export class Some<A> {
  constructor(readonly value: A) {}
  ...
}
```

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

`alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L220-L222)

```ts
alt(fa: Option<A>): Option<A>  { ... }
```

**Example**

```ts
import { Option, some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(2).alt(some(4)), some(2))
const fa: Option<number> = none
assert.deepStrictEqual(fa.alt(some(4)), some(4))
```

Added in v1.0.0

## ap

`ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L183-L185)

```ts
ap<B>(fab: Option<(a: A) => B>): Option<B>  { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(2).ap(some((x: number) => x + 1)), some(3))
assert.deepStrictEqual(none.ap(some((x: number) => x + 1)), none)
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L195-L197)

```ts
ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>  { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
assert.deepStrictEqual(none.ap_(some(2)), none)
```

Added in v1.0.0

## chain

Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
`Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
`None`)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L203-L205)

```ts
chain<B>(f: (a: A) => Option<B>): Option<B>  { ... }
```

Added in v1.0.0

## contains

Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L289-L291)

```ts
contains(S: Setoid<A>, a: A): boolean  { ... }
```

Added in v1.0.0

## exists

Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L303-L305)

```ts
exists(p: (a: A) => boolean): boolean  { ... }
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L238-L240)

```ts
extend<B>(f: (ea: Option<A>) => B): Option<B>  { ... }
```

Added in v1.0.0

## filter

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L312-L314)

```ts
filter(p: Predicate<A>): Option<A>  { ... }
```

Added in v1.0.0

## fold

Applies a function to each case in the data structure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L250-L252)

```ts
fold<B>(b: B, onSome: (a: A) => B): B  { ... }
```

**Example**

```ts
import { none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
```

Added in v1.0.0

## foldL

Lazy version of [fold](#fold)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L254-L256)

```ts
foldL<B>(onNone: () => B, onSome: (a: A) => B): B  { ... }
```

Added in v1.0.0

## getOrElse

Returns the value from this `Some` or the given argument if this is a `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L267-L269)

```ts
getOrElse(a: A): A  { ... }
```

**Example**

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).getOrElse(0), 1)
const fa: Option<number> = none
assert.strictEqual(fa.getOrElse(0), 0)
```

Added in v1.0.0

## getOrElseL

Lazy version of [getOrElse](#getorelse)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L271-L273)

```ts
getOrElseL(f: () => A): A  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L282-L284)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isNone

Returns `true` if the option is `None`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L293-L295)

```ts
isNone(): this is None<A>  { ... }
```

Added in v1.0.0

## isSome

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L297-L299)

```ts
isSome(): this is Some<A>  { ... }
```

Added in v1.0.0

## map

Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L134-L136)

```ts
map<B>(f: (a: A) => B): Option<B>  { ... }
```

**Example**

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(1).map(n => n * 2), some(2))
```

Added in v1.0.0

## mapNullable

Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L169-L171)

```ts
mapNullable<B>(f: (a: A) => B | null | undefined): Option<B>  { ... }
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

Added in v1.0.0

## orElse

Lazy version of [alt](#alt)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L234-L236)

```ts
orElse(fa: Lazy<Option<A>>): Option<A>  { ... }
```

**Example**

```ts
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
```

Added in v1.6.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L206-L208)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## ~~refine~~ (deprecated)

Use [filter](#filter) instead.
Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
this Option's value. Otherwise returns `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L322-L324)

```ts
refine<B extends A>(refinement: Refinement<A, B>): Option<B>  { ... }
```

Added in v1.3.0

## toNullable

Returns the value from this `Some` or `null` if this is a `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L275-L277)

```ts
toNullable(): A | null  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L285-L287)

```ts
toString(): string  { ... }
```

Added in v1.0.0

## toUndefined

Returns the value from this `Some` or `undefined` if this is a `None`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L279-L281)

```ts
toUndefined(): A | undefined  { ... }
```

Added in v1.0.0

Added in v1.0.0

## none

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L330-L330)

```ts
export const none: Option<never> = ...
```

Added in v1.0.0

## option

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L815-L845)

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

## some

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L644-L644)

```ts
export const some = ...
```

Added in v1.0.0

## fromEither

Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
value wrapped in a `Some`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L701-L703)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): Option<A> => { ... }
```

**Example**

```ts
import { none, some, fromEither } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(fromEither(left(1)), none)
assert.deepStrictEqual(fromEither(right(1)), some(1))
```

Added in v1.0.0

## fromNullable

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L636-L638)

```ts
export const fromNullable = <A>(a: A | null | undefined): Option<A> => { ... }
```

**Example**

```ts
import { none, some, fromNullable } from 'fp-ts/lib/Option'

assert.deepStrictEqual(fromNullable(undefined), none)
assert.deepStrictEqual(fromNullable(null), none)
assert.deepStrictEqual(fromNullable(1), some(1))
```

Added in v1.0.0

## fromPredicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L659-L661)

```ts
export function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>  { ... }
```

**Example**

```ts
import { none, some, fromPredicate } from 'fp-ts/lib/Option'

const positive = fromPredicate((n: number) => n >= 0)

assert.deepStrictEqual(positive(-1), none)
assert.deepStrictEqual(positive(1), some(1))
```

Added in v1.0.0

## ~~fromRefinement~~ (deprecated)

Use [fromPredicate](#frompredicate) instead.
Refinement version of [fromPredicate](#frompredicate)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L730-L732)

```ts
export const fromRefinement = <A, B extends A>(refinement: Refinement<A, B>) => (a: A): Option<B> => { ... }
```

Added in v1.3.0

## getApplyMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L533-L538)

```ts
export const getApplyMonoid = <A>(M: Monoid<A>): Monoid<Option<A>> => { ... }
```

Added in v1.7.0

## getApplySemigroup

[Apply](./Apply.md) semigroup

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | none               |
| none    | some(a) | none               |
| some(a) | some(b) | some(concat(a, b)) |

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L524-L528)

```ts
export const getApplySemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> => { ... }
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

## getFirstMonoid

Monoid returning the left-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(a)      |

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L561-L566)

```ts
export const getFirstMonoid = <A = never>(): Monoid<Option<A>> => { ... }
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

## getLastMonoid

Monoid returning the right-most non-`None` value

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | some(a)      |
| none    | some(a) | some(a)      |
| some(a) | some(b) | some(b)      |

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L589-L591)

```ts
export const getLastMonoid = <A = never>(): Monoid<Option<A>> => { ... }
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

## getMonoid

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
appended using the provided `Semigroup`

| x       | y       | concat(x, y)       |
| ------- | ------- | ------------------ |
| none    | none    | none               |
| some(a) | none    | some(a)            |
| none    | some(a) | some(a)            |
| some(a) | some(b) | some(concat(a, b)) |

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L616-L621)

```ts
export const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => { ... }
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

## getOrd

The `Ord` instance allows `Option` values to be compared with
`compare`, whenever there is an `Ord` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L450-L452)

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Option<A>> => { ... }
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

## getRefinement

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L751-L753)

```ts
export const getRefinement = <A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B> => { ... }
```

Added in v1.7.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L426-L428)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Option<A>> => { ... }
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

## isNone

Returns `true` if the option is `None`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L719-L721)

```ts
export const isNone = <A>(fa: Option<A>): fa is None<A> => { ... }
```

Added in v1.0.0

## isSome

Returns `true` if the option is an instance of `Some`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L710-L712)

```ts
export const isSome = <A>(fa: Option<A>): fa is Some<A> => { ... }
```

Added in v1.0.0

## some

Alias of [of](#of)

Added in v1.0.0

## tryCatch

Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
`Some`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts#L680-L686)

```ts
export const tryCatch = <A>(f: Lazy<A>): Option<A> => { ... }
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
