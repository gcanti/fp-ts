---
title: Migrate from PureScript/Haskell
parent: Guides
nav_order: 3
---

# Migrate from PureScript/Haskell

This guide shows you how to use `fp-ts` concepts if you have prior experience with [PureScript](http://www.purescript.org/) or [Haskell](https://www.haskell.org/).
{: .fs-6 .fw-300 }

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
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'

declare function print(s: string): T.Task<void>
declare const readLine: T.Task<string>

pipe(
  print('foo'),
  T.chain(_ => print('bar')),
  T.chain(_ => readLine),
  T.chain(print)
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
<<<<<<< HEAD:docs/guides/purescript.md
  type: 'Bar'
  value: string
}
interface Baz {
  type: 'Baz'
  value: boolean
=======
  readonly type: 'Bar'
  readonly value: string
}
interface Baz {
  readonly type: 'Baz'
  readonly value: boolean
>>>>>>> add readonly modules:docs/recipes/purescript.md
}
// type
type Foo = Bar | Baz
// constructors
const Bar = (value: string): Foo => ({ type: 'Bar', value })
const Baz = (value: boolean): Foo => ({ type: 'Baz', value })
```

## Polymorphic data

PureScript

```purescript
data Option a = None | Some a
```

TypeScript

```ts
declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly Option: Option<A>
  }
}

export const URI = 'Option'

export type URI = typeof URI

export type Option<A> = None | Some<A>

export interface None {
  readonly _tag: 'None'
}

export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}

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
function maybe<A, B>(whenNone: () => B, whenSome: (a: A) => B, fa: Option<A>): B {
  switch (fa._tag) {
    case 'None':
      return whenNone()
    case 'Some':
      return whenSome(fa.value)
  }
}
```

Here TypeScript also provides exhaustiveness check as the function would otherwise
lack ending return statement and its return type does not include 'undefined'.

Alternatively you can provide a default case using `absurd` function
from `fp-ts/lib/function` which would force unification of unmatched cases
with type `never`:

```ts
    default:
      return absurd(fa)
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

export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}

export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B) => Kind3<F, R, E, B>
}
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
const functorOption: Functor1<'Option'> = {
  map: (fa, f) =>
    maybe(
      () => none,
      a => some(f(fa.value)),
      fa
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

## Newtypes

See [newtype-ts](https://github.com/gcanti/newtype-ts)

## Functional optics

See [monocle-ts](https://github.com/gcanti/monocle-ts)

## Where's my `f <$> fa <*> fb`?

A few options:

```ts
import { sequenceS, sequenceT } from 'fp-ts/lib/Apply'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

const fa = O.some(1)
const fb = O.some('foo')
const f = (a: number) => (b: string): boolean => a + b.length > 2

const fc1 = pipe(O.some(f), O.ap(fa), O.ap(fb))

const fc2 = pipe(fa, O.map(f), O.ap(fb))

const fc3 = pipe(
  sequenceT(O.option)(fa, fb),
  O.map(([a, b]) => f(a)(b))
)

const fc4 = pipe(
  sequenceS(O.option)({ fa, fb }),
  O.map(({ fa: a, fb: b }) => f(a)(b))
)
```
