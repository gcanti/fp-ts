---
id: These
title: Module These
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)

## these

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L488-L497)

```ts
export const these: Functor2<URI> & Bifunctor2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = { ... }
```

Added in v1.0.0

# These

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L50-L50)

```ts
export type These<L, A> = This<L, A> | That<L, A> | Both<L, A>

export class This<L, A> {
  constructor(readonly value: L) {}
  ...
}

export class That<L, A> {
  constructor(readonly value: A) {}
  ...
}

export class Both<L, A> {
  constructor(readonly l: L, readonly a: A) {}
  ...
}
```

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L61-L63)

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>  { ... }
```

Added in v1.0.0

## fold

Applies a function to each case in the data structure

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L68-L70)

```ts
fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B  { ... }
```

Added in v1.0.0

## inspect

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L71-L73)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## isBoth

Returns `true` if the these is `Both`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L86-L88)

```ts
isBoth(): this is Both<L, A>  { ... }
```

Added in v1.0.0

## isThat

Returns `true` if the these is `That`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L82-L84)

```ts
isThat(): this is That<L, A>  { ... }
```

Added in v1.0.0

## isThis

Returns `true` if the these is `This`, `false` otherwise

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L78-L80)

```ts
isThis(): this is This<L, A>  { ... }
```

Added in v1.0.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L58-L60)

```ts
map<B>(f: (a: A) => B): These<L, B>  { ... }
```

Added in v1.0.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L64-L66)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

Added in v1.0.0

## toString

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L74-L76)

```ts
toString(): string  { ... }
```

Added in v1.0.0

Added in v1.0.0

## both

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L296-L298)

```ts
export const both = <L, A>(l: L, a: A): These<L, A> => { ... }
```

Added in v1.0.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L480-L482)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): These<L, A> => { ... }
```

**Example**

```ts
import { fromEither, this_, that } from 'fp-ts/lib/These'
import { left, right } from 'fp-ts/lib/Either'

assert.deepEqual(fromEither(left('a')), this_('a'))
assert.deepEqual(fromEither(right(1)), that(1))
```

Added in v1.13.0

## fromOptions

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L462-L467)

```ts
export const fromOptions = <L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>> => { ... }
```

**Example**

```ts
import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(fromOptions(none, none), none)
assert.deepEqual(fromOptions(some('a'), none), some(this_('a')))
assert.deepEqual(fromOptions(none, some(1)), some(that(1)))
assert.deepEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

Added in v1.13.0

## fromThese

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L313-L315)

```ts
export const fromThese = <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A] => { ... }
```

**Example**

```ts
import { fromThese, this_, that, both } from 'fp-ts/lib/These'

const from = fromThese('a', 1)
assert.deepEqual(from(this_('b')), ['b', 1])
assert.deepEqual(from(that(2)), ['a', 2])
assert.deepEqual(from(both('b', 2)), ['b', 2])
```

Added in v1.0.0

## getMonad

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L234-L243)

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => { ... }
```

Added in v1.0.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L180-L201)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>> => { ... }
```

Added in v1.0.0

## getSetoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L165-L174)

```ts
export const getSetoid = <L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>> => { ... }
```

Added in v1.0.0

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L376-L378)

```ts
export const isBoth = <L, A>(fa: These<L, A>): fa is Both<L, A> => { ... }
```

Added in v1.0.0

## isThat

Returns `true` if the these is an instance of `That`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L367-L369)

```ts
export const isThat = <L, A>(fa: These<L, A>): fa is That<L, A> => { ... }
```

Added in v1.0.0

## isThis

Returns `true` if the these is an instance of `This`, `false` otherwise

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L358-L360)

```ts
export const isThis = <L, A>(fa: These<L, A>): fa is This<L, A> => { ... }
```

Added in v1.0.0

## that

Alias of [of](#of)

Added in v1.0.0

## thatOrBoth

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L406-L408)

```ts
export const thatOrBoth = <L, A>(defaultThat: A, ml: Option<L>): These<L, A> => { ... }
```

**Example**

```ts
import { thatOrBoth, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(thatOrBoth(1, none), that(1))
assert.deepEqual(thatOrBoth(1, some('a')), both('a', 1))
```

Added in v1.13.0

## theseLeft

Returns an `L` value if possible

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L331-L333)

```ts
export const theseLeft = <L, A>(fa: These<L, A>): Option<L> => { ... }
```

**Example**

```ts
import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseLeft(this_('a')), some('a'))
assert.deepEqual(theseLeft(that(1)), none)
assert.deepEqual(theseLeft(both('a', 1)), some('a'))
```

Added in v1.0.0

## theseRight

Returns an `A` value if possible

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L349-L351)

```ts
export const theseRight = <L, A>(fa: These<L, A>): Option<A> => { ... }
```

**Example**

```ts
import { theseRight, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseRight(this_('a')), none)
assert.deepEqual(theseRight(that(1)), some(1))
assert.deepEqual(theseRight(both('a', 1)), some(1))
```

Added in v1.0.0

## theseThat

Returns the `A` value if and only if the value is constructed with `That`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L443-L445)

```ts
export const theseThat = <L, A>(fa: These<L, A>): Option<A> => { ... }
```

**Example**

```ts
import { theseThat, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseThat(this_('a')), none)
assert.deepEqual(theseThat(that(1)), some(1))
assert.deepEqual(theseThat(both('a', 1)), none)
```

Added in v1.13.0

## theseThis

Returns the `L` value if and only if the value is constructed with `This`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L424-L426)

```ts
export const theseThis = <L, A>(fa: These<L, A>): Option<L> => { ... }
```

**Example**

```ts
import { theseThis, this_, that, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(theseThis(this_('a')), some('a'))
assert.deepEqual(theseThis(that(1)), none)
assert.deepEqual(theseThis(both('a', 1)), none)
```

Added in v1.13.0

## thisOrBoth

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L391-L393)

```ts
export const thisOrBoth = <L, A>(defaultThis: L, ma: Option<A>): These<L, A> => { ... }
```

**Example**

```ts
import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
import { none, some } from 'fp-ts/lib/Option'

assert.deepEqual(thisOrBoth('a', none), this_('a'))
assert.deepEqual(thisOrBoth('a', some(1)), both('a', 1))
```

Added in v1.13.0

## this\_

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/These.ts#L281-L283)

```ts
export const this_ = <L, A>(l: L): These<L, A> => { ... }
```

Added in v1.0.0
