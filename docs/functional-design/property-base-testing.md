---
title: Introduction to property based testing
parent: Functional design
nav_order: 5
---

# Introduction to property based testing

In the articles about [Eq](../getting-started/Eq.md), [Ord](../getting-started/Ord.md), [Semigroup](../getting-started/Semigroup.md) and [Monoid](../getting-started/Monoid.md) we saw that instances must comply with some **laws**.

So how can we ensure that our instances are **lawful**?

## Property based testing

Property based testing is another way to test your code which is complementary to classical unit-test methods.

It tries to discover inputs causing a property to be falsy by testing it against **multiple generated random entries**. In case of failure, a property based testing framework provides both a counterexample and the seed causing the generation.

Let's apply property based testing to the `Semigroup` law:

**Associativity** : `concat(concat(x, y), z) = concat(x, concat(y, z))`

I'm going to use [fast-check](https://github.com/dubzzz/fast-check), a property based testing framework written in TypeScript.

## Testing a `Semigroup` instance

We need three ingredients

1. a `Semigroup<A>` instance for the type `A`
1. a _property_ that encodes the associativity law
1. a way to generate random values of type `A`

### Instance

As instance I'm going to use the following

```ts
import { Semigroup } from 'fp-ts/lib/Semigroup'

const S: Semigroup<string> = {
  concat: (x, y) => x + ' ' + y
}
```

### Property

A property is just a predicate, i.e a function that returns a `boolean`. We say that the property holds if the predicate returns `true`.

So in our case we can define the `associativity` property as

```ts
const associativity = (x: string, y: string, z: string) =>
  S.concat(S.concat(x, y), z) === S.concat(x, S.concat(y, z))
```

### `Arbitrary<A>`

An `Arbitrary<A>` is responsible to generate random values of type `A`. We need an `Arbitrary<string>`, fortunately `fast-check` provides many built-in arbitraries

```ts
import * as fc from 'fast-check'

const arb: fc.Arbitrary<string> = fc.string()
```

Let's wrap all together

```ts
it('my semigroup instance should be lawful', () => {
  fc.assert(fc.property(arb, arb, arb, associativity))
})
```

If `fast-check` doesn't raise any error we can be more confident that our instance is well defined.

## Testing a `Monoid` instance

Let's see what happens when an instance is **lawless**!

As instance I'm going to use the following

```ts
import { Monoid } from 'fp-ts/lib/Monoid'

const M: Monoid<string> = {
  ...S,
  empty: ''
}
```

We must encode the `Monoid` laws as properties:

- **Right identity** : `concat(x, empty) = x`
- **Left identity** : `concat(empty, x) = x`

```ts
const rightIdentity = (x: string) => M.concat(x, M.empty) === x

const leftIdentity = (x: string) => M.concat(M.empty, x) === x
```

and finally write a test

```ts
it('my monoid instance should be lawful', () => {
  fc.assert(fc.property(arb, rightIdentity))
  fc.assert(fc.property(arb, leftIdentity))
})
```

When we run the test we get

```ts
Error: Property failed after 1 tests
{ seed: -2056884750, path: "0:0", endOnFailure: true }
Counterexample: [""]
```

That's great, `fast-check` even gives us a counterexample: `""`

```ts
M.concat('', M.empty) = ' ' // should be ''
```

## Resources

For a library that makes easy to test type classes laws, check out [fp-ts-laws](https://github.com/gcanti/fp-ts-laws)
