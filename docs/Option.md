---
id: Option
title: Module Option
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts)

## Data

### Option

_data_

_since 1.0.0_

_Signature_

```ts
type Option<A> = None<A> | Some<A>
```

_Description_

Represents optional values. Instances of `Option` are either an instance of `Some` or `None`

The most idiomatic way to use an `Option` instance is to treat it as a collection or monad and use `map`, `flatMap`
or `filter`.

## Methods

### alt

_method_

_since 1.0.0_

_Signature_

```ts
(fa: Option<A>): Option<A>
```

_Description_

`alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.

_Example_

```ts
const someFn = (o: Option<number>) => o.alt(some(4))
assert.deepEqual(someFn(some(2)), some(2))
assert.deepEqual(someFn(none), none)
```

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Option<(a: A) => B>): Option<B>
```

_Description_

`ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.

_Example_

```ts
assert.deepEqual(some(2).ap(some(x => x + 1)), some(3))
assert.deepEqual(none.ap(some(x => x + 1)), none)
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>
```

_Description_

Similar to `ap` but instead of taking a function it takes `some` value or `none`, then applies this `Option`'s
wrapped function to the `some` or `none`. If the `Option` calling `ap_` is `none` it will return `none`.

_Example_

```ts
assert.deepEqual(some(x => x + 1).ap_(some(2)), some(3))
assert.deepEqual(none.ap_(some(2)), none)
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Option<B>): Option<B>
```

_Description_

Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
`Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
`None`)

### contains

_method_

_since 1.0.0_

_Signature_

```ts
(S: Setoid<A>, a: A): boolean
```

_Description_

Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise

### exists

_method_

_since 1.0.0_

_Signature_

```ts
(p: (a: A) => boolean): boolean
```

_Description_

Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (ea: Option<A>) => B): Option<B>
```

### filter

_method_

_since 1.0.0_

_Signature_

```ts
(p: Predicate<A>): Option<A>
```

_Description_

Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
Otherwise returns `None`

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, whenSome: (a: A) => B): B
```

_Description_

Applies a function to each case in the data structure

_Example_

```ts
import { none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
```

### foldL

_method_

_since 1.0.0_

_Signature_

```ts
<B>(whenNone: () => B, whenSome: (a: A) => B): B
```

_Description_

Lazy version of `fold`

### getOrElse

_method_

_since 1.0.0_

_Signature_

```ts
(a: A): A
```

_Description_

Returns the value from this `Some` or the given argument if this is a `None`

_Example_

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

assert.strictEqual(some(1).getOrElse(0), 1)
assert.strictEqual((none as Option<number>).getOrElse(0), 0)
```

### getOrElseL

_method_

_since 1.0.0_

_Signature_

```ts
(f: () => A): A
```

_Description_

Lazy version of `getOrElse`

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### isNone

_method_

_since 1.0.0_

_Signature_

```ts
(): this is None<A>
```

_Description_

Returns `true` if the option is `None`, `false` otherwise

### isSome

_method_

_since 1.0.0_

_Signature_

```ts
(): this is Some<A>
```

_Description_

Returns `true` if the option is an instance of `Some`, `false` otherwise

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Option<B>
```

_Description_

Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.

_Example_

```ts
assert.deepEqual(some(1).map(n => n * 2), some(2))
```

### mapNullable

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B | null | undefined): Option<B>
```

_Description_

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

### orElse

_method_

_since 1.6.0_

_Signature_

```ts
(fa: Lazy<Option<A>>): Option<A>
```

_Description_

Lazy version of [alt](#alt)

_Example_

```ts
assert.deepEqual(some(1).orElse(() => some(2)), some(1))
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### refine

_method_

_since 1.3.0_

_Signature_

```ts
<B extends A>(refinement: Refinement<A, B>): Option<B>
```

_Description_

Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
this Option's value. Otherwise returns `None`

### toNullable

_method_

_since 1.0.0_

_Signature_

```ts
(): A | null
```

_Description_

Returns the value from this `Some` or `null` if this is a `None`

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### toUndefined

_method_

_since 1.0.0_

_Signature_

```ts
(): A | undefined
```

_Description_

Returns the value from this `Some` or `undefined` if this is a `None`

## Instances

### option

_instance_

_since 1.0.0_

_Signature_

```ts
Monad1<URI> &
  Foldable1<URI> &
  Plus1<URI> &
  Traversable1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI>
```

## Constants

### none

_constant_

_since 1.0.0_

_Signature_

```ts
none: Option<never>
```

## Functions

### fromEither

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Either<L, A>): Option<A>
```

_Description_

Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
value wrapped in a `Some`

_Example_

```ts
import { none, some, fromEither } from 'fp-ts/lib/Option'
import { left, right } from 'fp-ts/lib/Either'

assert.deepEqual(fromEither(left(1)), none)
assert.deepEqual(fromEither(right(1)), some(1))
```

### fromNullable

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A | null | undefined): Option<A>
```

_Description_

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`

_Example_

```ts
import { none, some, fromNullable } from 'fp-ts/lib/Option'

assert.deepEqual(fromNullable(undefined), none)
assert.deepEqual(fromNullable(null), none)
assert.deepEqual(fromNullable(1), some(1))
```

### fromPredicate

_function_

_since 1.0.0_

_Signature_

```ts
<A>(predicate: Predicate<A>) => (a: A): Option<A>
```

_Example_

```ts
import { none, some, fromPredicate } from 'fp-ts/lib/Option'

const positive = fromPredicate((n: number) => n >= 0)

assert.deepEqual(positive(-1), none)
assert.deepEqual(positive(1), some(1))
```

### fromRefinement

_function_

_since 1.3.0_

_Signature_

```ts
<A, B extends A>(refinement: Refinement<A, B>) => (a: A): Option<B>
```

_Description_

Refinement version of `fromPredicate`

### getApplyMonoid

_function_

_since 1.7.0_

_Signature_

```ts
<A>(M: Monoid<A>): Monoid<Option<A>>
```

### getApplySemigroup

_function_

_since 1.7.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<Option<A>>
```

_Description_

[Apply](./Apply.md) semigroup

_Example_

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const S = getSemigroup(semigroupSum)
assert.deepEqual(S.concat(none, none), none)
assert.deepEqual(S.concat(some(1), none), none)
assert.deepEqual(S.concat(none, some(1)), none)
assert.deepEqual(S.concat(some(1), some(2)), some(3))
```

### getFirstMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Option<A>>
```

_Description_

Monoid returning the left-most non-`None` value

_Example_

```ts
const M = getFirstMonoid<number>()
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(1))
```

### getLastMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Option<A>>
```

_Description_

Monoid returning the right-most non-`None` value

_Example_

```ts
const M = getLastMonoid<number>()
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(2))
```

### getMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Monoid<Option<A>>
```

_Description_

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
appended using the provided `Semigroup`

_Example_

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'

const M = getMonoid(semigroupSum)
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), some(1))
assert.deepEqual(M.concat(none, some(1)), some(1))
assert.deepEqual(M.concat(some(1), some(2)), some(3))
```

### getOrd

_function_

_since 1.2.0_

_Signature_

```ts
<A>(O: Ord<A>): Ord<Option<A>>
```

_Description_

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

### getRefinement

_function_

_since 1.7.0_

_Signature_

```ts
<A, B extends A>(getOption: (a: A) => Option<B>): Refinement<A, B>
```

_Description_

Returns a refinement from a prism.
This function ensures that a custom type guard definition is type-safe.

_Example_

```ts
type A = { type: 'A' }
type B = { type: 'B' }
type C = A | B

const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
```

### isNone

_function_

_since 1.0.0_

_Signature_

```ts
<A>(fa: Option<A>): fa is None<A>
```

_Description_

Returns `true` if the option is `None`, `false` otherwise

### isSome

_function_

_since 1.0.0_

_Signature_

```ts
<A>(fa: Option<A>): fa is Some<A>
```

_Description_

Returns `true` if the option is an instance of `Some`, `false` otherwise

### some

_function_

_since 1.0.0_
Alias of

_Signature_

```ts
of
```

### tryCatch

_function_

_since 1.0.0_

_Signature_

```ts
<A>(f: Lazy<A>): Option<A>
```

_Description_

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
