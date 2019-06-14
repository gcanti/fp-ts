---
title: Migrate from PureScript/Haskell
parent: Recipes
nav_order: 8
---

# Migrate from PureScript/Haskell

This guide shows you how to use fp-ts concepts if you have prior experience with [PureScript](http://www.purescript.org/) or [Haskell](https://www.haskell.org/).
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
// print: (s: string) => Task<void>
// readLine: Task<string>

print('foo')
  .chain(_ => print('bar'))
  .chain(_ => readLine)
  .chain(print)
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
interface Bar { type: 'Bar'; value: string }
interface Baz { type: 'Baz'; value: boolean }
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
    Option: Option<A>
  }
}

const URI = 'Option'

type URI = typeof URI

class None<A> {
  static value: Option<never> = new None()
  readonly _tag: 'None' = 'None'
  readonly _A!: A
  readonly _URI!: URI
  private constructor() {}
}

class Some<A> {
  readonly _tag: 'Some' = 'Some'
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: A) {}
}

type Option<A> = None<A> | Some<A>

const none = None.value

const some = <A>(a: A): Option<A> => new Some(a)
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
const maybe = <A, B>(whenNone: B, whenSome: (a: A) => B, fa: Option<A>): B => {
  switch (fa.type) {
    case 'None' :
      return whenNone
    case 'Some' :
      return whenSome(fa.value)
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
  readonly map: <L, A, B>(fa: Kind2<F, L, A>, f: (a: A) => B) => Kind2<F, L, B>
}

export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <U, L, A, B>(fa: Kind3<F, U, L, A>, f: (a: A) => B) => Kind3<F, U, L, B>
}

export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly map: <A, B>(fa: Kind2<F, L, A>, f: (a: A) => B) => Kind2<F, L, B>
}

export interface Functor3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly map: <A, B>(fa: Kind3<F, U, L, A>, f: (a: A) => B) => Kind3<F, U, L, B>
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
  map: (fa, f) => maybe(none, a => some(f(fa.value)), fa)
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
const getMonoid = <A>(S: Semigroup<A>): Monoid<Option<A>> => {
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

A few options

```ts
import { some, option } from 'fp-ts/lib/Option'
import { liftA2, sequenceT, sequenceS } from 'fp-ts/lib/Apply'

const fa = some(1)
const fb = some('foo')
const f = (a: number) => (b: string): boolean => a + b.length > 2

const fc1 = some(f)
  .ap_(fa)
  .ap_(fb)
const fc2 = fb.ap(fa.ap(some(f)))
const fc3 = fb.ap(fa.map(f))
const fc4 = liftA2(option)(f)(fa)(fb)
const fc5 = sequenceT(option)(fa, fb).map(([a, b]) => f(a)(b))
const fc6 = sequenceS(option)({ fa, fb }).map(({ fa: a, fb: b }) => f(a)(b))
```
