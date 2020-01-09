---
title: Applicative
parent: Getting started
nav_order: 7
---

# Getting started with fp-ts: Applicative

In the [last](https://dev.to/gcanti/getting-started-with-fp-ts-functor-36ek) post we saw that we can compose an effectful program `f: (a: A) => F<B>` with a pure program `g: (b: B) => C` by lifting `g` to a function `lift(g): (fb: F<B>) => F<C>` provided that `F` admits a functor instance

| Program f | Program g    | Composition   |
| --------- | ------------ | ------------- |
| pure      | pure         | `g ∘ f`       |
| effectful | pure (unary) | `lift(g) ∘ f` |

However `g` must be unary, that is it must accept only one argument as input. What if `g` accepts two arguments? Can we still lift `g` by using only the functor instance? Well, let's try!

# Currying

First of all we must model a function that accepts two arguments, let's say of type `B` and `C` (we can use a tuple) and returns a value of type `D`

```ts
g: (args: [B, C]) => D
```

We can rewrite `g` using a technique called **currying**.

> Currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, **each with a single argument**. For example, a function that takes two arguments, one from `B` and one from `C`, and produces outputs in `D`, by currying is translated into a function that takes a single argument from `C` and produces as outputs functions from `B` to `C`.

(source: [currying on wikipedia.org](https://en.wikipedia.org/wiki/Currying))

So we can rewrite `g` to

```ts
g: (b: B) => (c: C) => D
```

What we want is a lifting operation, let't call it `liftA2` in order to distinguish it from our old `lift`, that outputs a function with the following signature

```ts
liftA2(g): (fb: F<B>) => (fc: F<C>) => F<D>
```

How can we get there? Since `g` is now unary, we can use the functor instance and our old `lift`

```ts
lift(g): (fb: F<B>) => F<(c: C) => D>
```

But now we are stuck: there's no legal operation on the functor instance which is able to **unpack** the value `F<(c: C) => D>` to a function `(fc: F<C>) => F<D>`.

# Apply

So let's introduce a new abstraction `Apply` that owns such a unpacking operation (named `ap`)

```ts
interface Apply<F> extends Functor<F> {
  ap: <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>
}
```

The `ap` function is basically `unpack` with the arguments rearranged

```ts
unpack: <C, D>(fcd: HKT<F, (c: C) => D>) => ((fc: HKT<F, C>) => HKT<F, D>)
ap:     <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>
```

so `ap` can be derived from `unpack` (and viceversa).

**Note**: the `HKT` type is the `fp-ts` way to represent a generic type constructor (a technique proposed in the [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf) paper) so when you see `HKT<F, X>` you can think to the type constructor `F` applied to the type `X` (i.e. `F<X>`).

# Applicative

Moreover it would be handy if there exists an operation which is able to **lift a value** of type `A` to a value of type `F<A>`. This way we could call the `liftA2(g)` function either by providing arguments of type `F<B>` and `F<C>` or by lifting values of type `B` and `C`.

So let's introduce the `Applicative` abstraction which builds upon `Apply` and owns such operation (named `of`)

```ts
interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}
```

Let's see the `Applicative` instances for some common data types

**Example** (`F = Array`)

```ts
import { flatten } from 'fp-ts/lib/Array'

const applicativeArray = {
  map: <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => fa.map(f),
  of: <A>(a: A): Array<A> => [a],
  ap: <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
    flatten(fab.map(f => fa.map(f)))
}
```

**Example** (`F = Option`)

```ts
import { Option, some, none, isNone } from 'fp-ts/lib/Option'

const applicativeOption = {
  map: <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> =>
    isNone(fa) ? none : some(f(fa.value)),
  of: <A>(a: A): Option<A> => some(a),
  ap: <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> =>
    isNone(fab) ? none : applicativeOption.map(fa, fab.value)
}
```

**Example** (`F = Task`)

```ts
import { Task } from 'fp-ts/lib/Task'

const applicativeTask = {
  map: <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => () => fa().then(f),
  of: <A>(a: A): Task<A> => () => Promise.resolve(a),
  ap: <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => () =>
    Promise.all([fab(), fa()]).then(([f, a]) => f(a))
}
```

# Lifting

So given an instance of `Apply` for `F` can we now write `liftA2`?

```ts
import { HKT } from 'fp-ts/lib/HKT'
import { Apply } from 'fp-ts/lib/Apply'

type Curried2<B, C, D> = (b: B) => (c: C) => D

function liftA2<F>(
  F: Apply<F>
): <B, C, D>(g: Curried2<B, C, D>) => Curried2<HKT<F, B>, HKT<F, C>, HKT<F, D>> {
  return g => fb => fc => F.ap(F.map(fb, g), fc)
}
```

Nice! But what about functions with **three** arguments? Do we need _yet another abstraction_?

The good news is that the answer is no, `Apply` is enough

```ts
type Curried3<B, C, D, E> = (b: B) => (c: C) => (d: D) => E

function liftA3<F>(
  F: Apply<F>
): <B, C, D, E>(
  g: Curried3<B, C, D, E>
) => Curried3<HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> {
  return g => fb => fc => fd => F.ap(F.ap(F.map(fb, g), fc), fd)
}
```

Actually given an instance of `Apply` we can write a `liftAn` function, **for each** `n`.

**Note**. `liftA1` is just `lift`, the `Functor` operation.

We can now update our "composition table"

| Program f | Program g     | Composition     |
| --------- | ------------- | --------------- |
| pure      | pure          | `g ∘ f`         |
| effectful | pure, `n`-ary | `liftAn(g) ∘ f` |

<center>where `liftA1 = lift`</center>

# Is the general problem solved?

Not yet. There's still an important case which is missing: what if **both** programs are effectful?

Again we need something more: in the [next](./Monad.md) post I'll talk about one of the most important abstractions of functional programming: **monads**.
