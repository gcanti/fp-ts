---
title: Ord
parent: Getting started
nav_order: 2
---

# Getting started with fp-ts: Ord

In the previous blog post about [Eq](./Eq.md) we were dealing with the concept of **equality**. In this blog post we are going to deal with the concept of **order**.

A type class `Ord`, intended to contain types that admit a **total ordering**, is declared in the following way

```ts
import { Eq } from 'fp-ts/lib/Eq'

type Ordering = -1 | 0 | 1

interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

We say that

- `x < y` if and only if `compare(x, y)` is equal to `-1`
- `x` is equal to `y` if and only if `compare(x, y)` is equal to `0`
- `x > y` if and only if `compare(x, y)` is equal to `1`

As a consequence we can say that `x <= y` if and only if `compare(x, y) <= 0`

As an example here's the instance of `Ord` for the type `number`

```ts
const ordNumber: Ord<number> = {
  equals: (x, y) => x === y,
  compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
}
```

Instances must satisfy the following laws:

1. **Reflexivity**: `compare(x, x) === 0`, for all `x` in `A`
2. **Antisymmetry**: if `compare(x, y) <= 0` and `compare(y, x) <= 0` then `x` is equal to `y`, for all `x`, `y` in `A`
3. **Transitivity**: if `compare(x, y) <= 0` and `compare(y, z) <= 0` then `compare(x, z) <= 0`, for all `x`, `y`, `z` in `A`

Additionally `compare` must comply with `Eq`'s `equals`:

`compare(x, y) === 0` if and only if `equals(x, y) === true`, for all `x`, `y` in `A`

Note. A lawful `equals` can be derived from `compare` in the following way

```ts
equals: (x, y) => compare(x, y) === 0
```

Indeed the module `fp-ts/lib/Ord` exports an handy `fromCompare` helper which allows you to define an `Ord` instance by simply specifying a `compare` function

```ts
import { Ord, fromCompare } from 'fp-ts/lib/Ord'

const ordNumber: Ord<number> = fromCompare((x, y) => (x < y ? -1 : x > y ? 1 : 0))
```

A programmer could then define a function `min` (which takes the minimum of two values) in the following way

```ts
function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x)
}

min(ordNumber)(2, 1) // 1
```

**Totality** might seem obvious (i.e. either `x <= y` or `y <= x`) when we're talking about numbers, but this isn't always the case. Let's consider a more complex type

```ts
type User = {
  name: string
  age: number
}
```

How can we define an `Ord<User>`?

Well it really depends, but a possible choice is to sort users by their `age`

```ts
const byAge: Ord<User> = fromCompare((x, y) => ordNumber.compare(x.age, y.age))
```

We can avoid some boilerplate by using the `contramap` [combinator](../functional-design/combinators-part-I): given an instance of `Ord` for `A` and a function from `B` to `A`, we can derive an instance of `Ord` for `B`

```ts
import { contramap } from 'fp-ts/lib/Ord'

const byAge: Ord<User> = contramap((user: User) => user.age)(ordNumber)
```

Now we can pick the younger of two users using `min`

```ts
const getYounger = min(byAge)

getYounger({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 }) // { name: 'Giulio', age: 45 }
```

What if we want to pick the older instead? We'd need to "reverse the order", or more technically speaking, get the **dual** order.

Fortunately there's another exported combinator for this

```ts
import { getDualOrd } from 'fp-ts/lib/Ord'

function max<A>(O: Ord<A>): (x: A, y: A) => A {
  return min(getDualOrd(O))
}

const getOlder = max(byAge)

getOlder({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 }) // { name: 'Guido', age: 48 }
```

Next article: [Semigroup](./Semigroup.md)
