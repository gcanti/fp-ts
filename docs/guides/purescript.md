---
title: Migrate from PureScript/Haskell
parent: Guides
nav_order: 3
---

# Migrate from PureScript/Haskell

This guide shows you how to use `fp-ts` concepts if you have prior experience with [PureScript](http://www.purescript.org/) or [Haskell](https://www.haskell.org/).

---

## Do notation

PureScript

```purescript
do
  print "foo"
  print "bar"
  x <- readLine
  print x
```

TypeScript

```ts
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'

declare const print: (s: string) => T.Task<void>
declare const readLine: T.Task<string>

pipe(
  T.Do,
  T.chainFirst(() => print('foo')),
  T.chainFirst(() => print('bar')),
  T.bind('x', () => readLine),
  T.chain(({ x }) => print(x))
)
```

## Data

PureScript

```purescript
--   ↓-- type
data Foo = Bar String | Baz Boolean
--         ↑------------↑-- constructors
```

TypeScript

```ts
interface Bar {
  readonly _tag: 'Bar'
  readonly value: string
}

interface Baz {
  readonly _tag: 'Baz'
  readonly value: boolean
}

// type
type Foo = Bar | Baz

// constructors
const Bar = (value: string): Foo => ({ _tag: 'Bar', value })

const Baz = (value: boolean): Foo => ({ _tag: 'Baz', value })
```

## Polymorphic data

PureScript

```purescript
data Option a = None | Some a
```

TypeScript

```ts
export const URI = 'Option'

export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [URI]: Option<A>
  }
}

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

export type Option<A> = None | Some<A>

export const none: Option<never> = { _tag: 'None' }

export const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a })
```

## Pattern matching

PureScript

```purescript
maybe :: forall a b. b -> (a -> b) -> Option a -> b
maybe b _ None = b
maybe _ f (Some a) = f a
```

TypeScript

```ts
// here TypeScript also provides exhaustiveness check
const maybe = <A, B>(onNone: () => B, onSome: (a: A) => B) => (fa: Option<A>): B => {
  switch (fa._tag) {
    case 'None':
      return onNone()
    case 'Some':
      return onSome(fa.value)
  }
}
```

## Type classes

PureScript

```purescript
class Functor f where
  map :: forall a b. (a -> b) -> f a -> f b
```

TypeScript

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}

export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

// etc...
```

## Instances

PureScript

```purescript
instance functorOption :: Functor Option where
  map fn (Some x) = Some (fn x)
  map _  _        = None
```

TypeScript

```ts
import { Functor1 } from 'fp-ts/Functor'
import { pipe } from 'fp-ts/function'

const functorOption: Functor1<URI> = {
  URI,
  map: (fa, f) =>
    pipe(
      fa,
      maybe(
        () => none,
        (a) => some(f(a))
      )
    )
}
```

## Type constraints

PureScript

```purescript
instance semigroupOption :: Semigroup a => Semigroup (Option a) where
  append None y = y
  append x None = x
  append (Some x) (Some y) = Some (x <> y)

instance monoidOption :: Semigroup a => Monoid (Option a) where
  mempty = None
```

TypeScript

```ts
import { Semigroup } from 'fp-ts/Semigroup'
import { Monoid } from 'fp-ts/Monoid'

//                    ↓ the constraint is implemented as an additional parameter
function getMonoid<A>(S: Semigroup<A>): Monoid<Option<A>> {
  return {
    concat: (x, y) => {
      if (x._tag === 'Some' && y._tag === 'Some') {
        return some(S.concat(x.value, y.value))
      } else if (x._tag === 'Some') {
        return y
      } else {
        return x
      }
    },
    empty: none
  }
}
```

## Where's my `f <$> fa <*> fb`?

A few options:

```ts
import * as T from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'

declare const fa: T.Task<number>
declare const fb: T.Task<string>
declare const f: (a: number) => (b: string) => boolean

const result1 = pipe(fa, T.map(f), T.ap(fb))

// ..or..
const result2 = pipe(T.of(f), T.ap(fa), T.ap(fb))
```
