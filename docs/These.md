---
id: These
title: Module These
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)

## these

```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI>
```

Added in v1.0.0 (instance)

# These

```ts
type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```

Added in v1.0.0 (data)

A data structure providing "inclusive-or" as opposed to [Either](./Either.md)'s "exclusive-or".

If you interpret `Either<L, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<L, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the both case:

- You can think of a computation that has a non-fatal error.
- You can think of a computation that went as far as it could before erroring.
- You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<L, A>` is saying that we want to handle `L` kind of data, `A` kind of data, or
both `L` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

(description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)

## bimap

```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>
```

Added in v1.0.0 (method)

## fold

```ts
<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B
```

Added in v1.0.0 (method)

Applies a function to each case in the data structure

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

## isBoth

```ts
(): this is Both<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the these is `Both`, `false` otherwise

## isThat

```ts
(): this is That<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the these is `That`, `false` otherwise

## isThis

```ts
(): this is This<L, A>
```

Added in v1.0.0 (method)

Returns `true` if the these is `This`, `false` otherwise

## map

```ts
<B>(f: (a: A) => B): These<L, B>
```

Added in v1.0.0 (method)

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

## toString

```ts
(): string
```

Added in v1.0.0 (method)

## both

```ts
<L, A>(l: L, a: A): These<L, A>
```

Added in v1.0.0 (function)

## fromEither

```ts
<L, A>(fa: Either<L, A>): These<L, A>
```

Added in v1.13.0 (function)

_Example_

```ts
import { fromEither, this_, that } from 'fp-ts/lib/These'
import { left, right } from 'fp-ts/lib/Either'

assert.deepEqual(fromEither(left('a')), this_('a'))
assert.deepEqual(fromEither(right(1)), that(1))
```

## fromOptions

```ts
<L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>>
```

Added in v1.13.0 (function)

Takes a pair of `Option`s and attempts to create a `These` from them

_Example_

```ts
import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(fromOptions(none, none), none)
assert.deepEqual(fromOptions(some('a'), none), some(this_('a')))
assert.deepEqual(fromOptions(none, some(1)), some(that(1)))
assert.deepEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

## fromThese

```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

Added in v1.0.0 (function)

_Example_

```ts
import { fromThese, this_, that, both } from 'fp-ts/lib/These'

const from = fromThese('a', 1)
assert.deepEqual(from(this_('b')), ['b', 1])
assert.deepEqual(from(that(2)), ['a', 2])
assert.deepEqual(from(both('b', 2)), ['b', 2])
```

## getMonad

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

Added in v1.0.0 (function)

## getSemigroup

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

Added in v1.0.0 (function)

## getSetoid

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

Added in v1.0.0 (function)

## isBoth

```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the these is an instance of `Both`, `false` otherwise

## isThat

```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the these is an instance of `That`, `false` otherwise

## isThis

```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

Added in v1.0.0 (function)

Returns `true` if the these is an instance of `This`, `false` otherwise

## that

Alias of [of](#of)

Added in v1.0.0 (function)

## thatOrBoth

```ts
<L, A>(defaultThat: A, ml: Option<L>): These<L, A>
```

Added in v1.13.0 (function)

_Example_

```ts
import { thatOrBoth, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(thatOrBoth(1, none), that(1))
assert.deepEqual(thatOrBoth(1, some('a')), both('a', 1))
```

## theseLeft

```ts
<L, A>(fa: These<L, A>): Option<L>
```

Added in v1.0.0 (function)

Returns an `L` value if possible

_Example_

```ts
import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseLeft(this_('a')), some('a'))
assert.deepEqual(theseLeft(that(1)), none)
assert.deepEqual(theseLeft(both('a', 1)), some('a'))
```

## theseRight

```ts
<L, A>(fa: These<L, A>): Option<A>
```

Added in v1.0.0 (function)

Returns an `A` value if possible

_Example_

```ts
import { theseRight, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseRight(this_('a')), none)
assert.deepEqual(theseRight(that(1)), some(1))
assert.deepEqual(theseRight(both('a', 1)), some(1))
```

## theseThat

```ts
<L, A>(fa: These<L, A>): Option<A>
```

Added in v1.13.0 (function)

Returns the `A` value if and only if the value is constructed with `That`

_Example_

```ts
import { theseThat, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseThat(this_('a')), none)
assert.deepEqual(theseThat(that(1)), some(1))
assert.deepEqual(theseThat(both('a', 1)), none)
```

## theseThis

```ts
<L, A>(fa: These<L, A>): Option<L>
```

Added in v1.13.0 (function)

Returns the `L` value if and only if the value is constructed with `This`

_Example_

```ts
import { theseThis, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseThis(this_('a')), some('a'))
assert.deepEqual(theseThis(that(1)), none)
assert.deepEqual(theseThis(both('a', 1)), none)
```

## thisOrBoth

```ts
<L, A>(defaultThis: L, ma: Option<A>): These<L, A>
```

Added in v1.13.0 (function)

_Example_

```ts
import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(thisOrBoth('a', none), this_('a'))
assert.deepEqual(thisOrBoth('a', some(1)), both('a', 1))
```

## this\_

```ts
<L, A>(l: L): These<L, A>
```

Added in v1.0.0 (function)
