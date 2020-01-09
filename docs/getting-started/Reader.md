---
title: Reader
parent: Getting started
nav_order: 11
---

# Getting started with fp-ts: Reader

The purpose of the `Reader` monad is to avoid threading arguments through multiple functions in order to only get them where they are needed.

One of the ideas presented here is to use the `Reader` monad for **dependency injection**.

The first thing you need to know is that the type `Reader<R, A>` represents a function `(r: R) => A`

```ts
interface Reader<R, A> {
  (r: R): A
}
```

where `R` represents an "environment" needed for the computation (we can "read" from it) and `A` is the result.

## Example

Let's say we have the following piece of code

```ts
const f = (b: boolean): string => (b ? 'true' : 'false')

const g = (n: number): string => f(n > 2)

const h = (s: string): string => g(s.length + 1)

console.log(h('foo')) // 'true'
```

What if we want to internationalise `f`? Well, we could add an additional parameter

```ts
interface Dependencies {
  i18n: {
    true: string
    false: string
  }
}

const f = (b: boolean, deps: Dependencies): string => (b ? deps.i18n.true : deps.i18n.false)
```

Now we have a problem though, `g` doesn't compile anymore

```ts
const g = (n: number): string => f(n > 2) // error: An argument for 'deps' was not provided
```

We must add an additional parameter to `g` as well

```ts
const g = (n: number, deps: Dependencies): string => f(n > 2, deps) // ok
```

We haven't finished yet, now it's `h` that doesn't compile, we must add an additional parameter to `h` as well

```ts
const h = (s: string, deps: Dependencies): string => g(s.length + 1, deps)
```

finally we can run `h` by providing an actual instance of the `Dependencies` interface

```ts
const instance: Dependencies = {
  i18n: {
    true: 'vero',
    false: 'falso'
  }
}

console.log(h('foo', instance)) // 'vero'
```

As you can see, `h` and `g` must have knowledge about `f` dependencies despite not using them.

Can we improve this part? Yes we can, we can move `Dependencies` from the parameter list to the return type.

## `Reader`

Let's start by rewriting our functions, putting the `deps` parameter alone

```ts
const f = (b: boolean): ((deps: Dependencies) => string) => deps => (b ? deps.i18n.true : deps.i18n.false)

const g = (n: number): ((deps: Dependencies) => string) => f(n > 2)

const h = (s: string): ((deps: Dependencies) => string) => g(s.length + 1)
```

Note that `(deps: Dependencies) => string` is just `Reader<Dependencies, string>`

```ts
import { Reader } from 'fp-ts/lib/Reader'

const f = (b: boolean): Reader<Dependencies, string> => deps => (b ? deps.i18n.true : deps.i18n.false)

const g = (n: number): Reader<Dependencies, string> => f(n > 2)

const h = (s: string): Reader<Dependencies, string> => g(s.length + 1)

console.log(h('foo')(instance)) // 'vero'
```

## `ask`

What if we want to also inject the lower bound (`2` in our example) in `g`? Let's add a new field to `Dependencies` first

```ts
export interface Dependencies {
  i18n: {
    true: string
    false: string
  }
  lowerBound: number
}

const instance: Dependencies = {
  i18n: {
    true: 'vero',
    false: 'falso'
  },
  lowerBound: 2
}
```

Now we can read `lowerBound` from the environment using `ask`

```ts
import { pipe } from 'fp-ts/lib/pipeable'
import { ask, chain, Reader } from 'fp-ts/lib/Reader'

const g = (n: number): Reader<Dependencies, string> =>
  pipe(
    ask<Dependencies>(),
    chain(deps => f(n > deps.lowerBound))
  )

console.log(h('foo')(instance)) // 'vero'
console.log(h('foo')({ ...instance, lowerBound: 4 })) // 'falso'
```

p.s.

As a curiosity, `Reader`'s `map` is (the usual) function composition

```ts
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { map } from 'fp-ts/lib/Reader'

const len = (s: string): number => s.length
const double = (n: number): number => n * 2
const gt2 = (n: number): boolean => n > 2

const composition = flow(len, double, gt2)
// equivalent to
const composition = pipe(len, map(double), map(gt2))
```

