A mix of

- [fantasy-land](https://github.com/fantasyland/fantasy-land)
- [static-land](https://github.com/rpominov/static-land)
- PureScript
- Scala

The idea (faking higher kinded types in TypeScript) is based on the paper [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf), [elm-brands](https://github.com/joneshf/elm-brands) and [flow-static-land](https://github.com/gcanti/flow-static-land).

See the section "Technical overview" below for an explanation of the technique.

# Algebraic types

|     | Array | Option | Either | NEA(*) | Task | Const | Identity | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Setoid          | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Semigroup       | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Monoid          | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Functor         | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contravariant   | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| PointedFunctor  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Apply           | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Applicative     | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Alt             | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Plus            | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Alternative     | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Foldable        | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Traversable     | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Chain           | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| ChainRec        | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Extract         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Extend          | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Comonad         | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Bifunctor       | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Profunctor      | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

(*) NonEmptyArray

# Monads

- Array
- Either
- Identity
- Option
- Reader
- State
- Task
- Writer

# Comonads

- Identity
- Traced

# Technical overview

## A basic `Option` type

```ts
// definition
type None = {
  __tag: 'None'
}

type Some<A> = {
  __tag: 'Some',
  value: A
}

type Option<A> = None | Some<A>

// helpers
const none: None = { __tag: 'None' }

function some<A>(a: A): Option<A> {
  return { __tag: 'Some', value: a }
}

// a specialised map for Option
function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  switch (fa.tag) {
    case 'None' :
      return fa
    case 'Some' :
      return some(f(fa.value))
  }
}
```

Usage

```ts
const double = (n: number): number => n * 2
const length = (s: string): number => s.length

console.log(map(double, some(1))) // { __tag: 'Some', value: 2 }
console.log(map(double, none)) // { __tag: 'None' }
console.log(map(length, some(2))) // <= error
```

## Adding static land support

TypeScript doesn't support higher kinded types

```ts
interface Functor {
  map<A, B>(f: (a: A) => B, fa: ?): ?
}
```

but we can fake them with an interface

```ts
interface HKT<F, A> {
  __hkt: F
  __hkta: A
}
```

where `F` is a unique identifier representing the type constructor and `A` its type parameter.

Now we can define a generic `Functor` interface

```ts
interface Functor<F> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}
```

and a new `Option` type

```ts
// unique identifier
type URI = 'Option'

type None = {
  __tag: 'None'
  __hkt: URI
  __hkta: any
}

type Some<A> = {
  __tag: 'Some',
  __hkt: URI
  __hkta: A
  value: A
}

type Option<A> = None | Some<A>

const none: None = {
  __tag: 'None',
  __hkt: 'Option',
  __hkta: undefined as any
}

function some<A>(a: A): Option<A> {
  return {
    __tag: 'Some',
    __hkt: 'Option',
    __hkta: a,
    value: a
  }
}

function map<A, B>(f: (a: A) => B, fa: Option<A>): Option<B> {
  switch (fa.__tag) {
    case 'None' :
      return fa
    case 'Some' :
      return some(f(fa.value))
  }
}
```

Let's check the implementation

```ts
// if this type-checks the implementation is likely correct
;({ map } as Functor<URI>)
```

Usage

```ts
console.log(map(double, some(1))) // { __tag: 'Some', __hkt: 'Option', __hkta: 2, value: 2 }
console.log(map(double, none)) // { __tag: 'None', __hkt: 'Option', __hkta: undefined }
console.log(map(length, some(2))) // <= error
```

Exports can be directly used as a static land dictionary

```ts
import * as option from './Option' // option contains map
```

There's a problem though. Let's define a generic `lift` function based on the `Functor` interface

```ts
function lift<F, A, B>(functor: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
  return fa => functor.map(f, fa)
}
```

If we try to use `lift` and `map` together TypeScript raises an error

```ts
const maybeDouble = lift({ map }, double)

map(double, maybeDouble(some(1)))
/*
Argument of type 'HKT<"Option", number>' is not assignable to parameter of type 'Option<number>'.
  Type 'HKT<"Option", number>' is not assignable to type 'Some<number>'.
    Property '__tag' is missing in type 'HKT<"Option", number>'.
*/
```

Every `Option<A>` is a `HKT<"Option", A>` but the converse is not true. In order to fix this (we **know** that `Option<A> = HKT<"Option", A>`) functions like `map` should accept the more general version `HKT<"Option", A>` and return the more specific version `Option<A>`

```ts
type HKTOption<A> = HKT<URI, A>

function map<A, B>(f: (a: A) => B, fa: HKTOption<A>): Option<B> {
  const option = fa as Option<A>
  switch (option.__tag) {
    case 'None' :
      return option
    case 'Some' :
      return some(f(option.value))
  }
}

map(double, maybeDouble(some(1))) // ok
```

## Adding fantasy land support

We must change the implementation of `None` and `Some`

```ts
type URI = 'Option'

class None<A> {
  __tag: 'None'
  __hkt: URI
  __hkta: any
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
}

class Some<A> {
  __tag: 'Some'
  __hkt: URI
  __hkta: A
  constructor(public value: A) { }
  map<B>(f: (a: A) => B): Option<B> {
    return some(f(this.value))
  }
}

type Option<A> = None<A> | Some<A>

const none = new None<any>()

function some<A>(a: A): Option<A> {
  return new Some(a)
}
```

Note that `None` has a type parameter, because the signature of `map` (the method) must be the same for both `None` and `Some` otherwise TypeScript will complain.

The implementation of `map` (the static function) is now trivial.

```ts
function map<A, B>(f: (a: A) => B, fa: HKTOption<A>): Option<B> {
  return (fa as Option<A>).map(f)
}
```

Let's add a custom `toString` method for better formatting (and a `inspect` method for node)

```ts
class None<A> {
  ...
  inspect(): string {
    return this.toString()
  }
  toString() {
    return 'None'
  }
}

class Some<A> {
  ...
  inspect(): string {
    return this.toString()
  }
  toString() {
    return `Some(${this.value})`
  }
}
```

Usage

```ts
console.log(some(1).map(double)) // Some(2)
console.log(none.map(double)) // None
```

# License

The MIT License (MIT)

