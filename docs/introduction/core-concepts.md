---
title: Core Concepts
parent: Introduction
nav_order: 1
has_toc: false
---

# Core Concepts

The goal of fp-ts is to empower developers to write pure FP apps and libraries built atop higher order abstractions. It includes the most popular data types, type classes, and abstractions from languages like [Haskell](https://haskell-lang.org), [PureScript](http://www.purescript.org), and [Scala](https://www.scala-lang.org/).
{: .fs-6 .fw-300 }

---

Don't panic. If "higher order abstractions" and "type classes" sound like insanely complicated words to you, the first thing you should know is that you don't have to understand all the intricate details of `fp-ts` in order to make good use of it. There is a learning curve, certainly, but don't fear that you can't learn to use `fp-ts` effectively, even as a beginner in functional programming. The trick is to start using the parts that are easier to understand and then gradually expand your knowledge.

We recommend you take the [basic tutorial](../basics/) to get started with using this library. There's also a list of [recipes](../recipes/) to help you find quick solutions to common problems.

## Functions

Functional programming is all about pure functions and how to compose them into bigger structures. `fp-ts` provides a few general [functions](../modules/functions.ts) to support you with composition, currying, and more.

## Data Types

Data types are the practical part of `fp-ts`: you can instantiate them with your data to gain properties and functionality that are useful for solving a specific need. Because data types all share common interfaces (through [type classes](#type-classes)), once you learn how to use one data type, you can apply the same concepts to the others.

Many functions in `fp-ts` use [ad hoc polymorphism](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism), meaning that they have a single implementation that can deal with arguments of different types. To make this work, it is often necessary to provide a data type _instance_ that provides functionality that is specific to the data type. Here is an example:

```ts
import { option, apply } from 'fp-ts'

// liftA2 is an ad hoc polymorphic function and requires an Option instance.
// This is what option.option provides.
const liftA2Option = apply.liftA2(option.option)
```

Here's a small list of some commonly used data types, you can find more in the [API reference](../modules/).

* [Option](../modules/Option.ts) – is used to explicitely express that a value can be absent.
* [Either](../modules/Either.ts) – represents a value of one of two possible types: `Left<A>` and `Right<B>`.
* [NonEmptyArray](../modules/NonEmptyArray.ts) – an array that is guaranteed to contain at least one element.
* [Task](../modules/Task.ts) – represents an asynchronous computation that yields a value and _never fails_.

It can be useful to define your own data types, in which case you could use a tool like [fp-ts-codegen](https://gcanti.github.io/fp-ts-codegen/) as a starting point.

## Type Classes

Type classes provide the theoretical underpinnings of `fp-ts`: they describe what you can do with your data. To guarantee that they can be safely composed, they are built on laws rooted in [category theory](https://en.wikipedia.org/wiki/Category_theory).

A concrete example: A [Functor](../modules/Functor.ts) is a type constructor which supports a mapping operation `map`. Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) = fa`
2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`

Besides `Functor` the following type classes are a good starting point:

* [Apply](../modules/Apply.ts) - allows applying a function to an argument under a type constructor.
* [Chain](../modules/Chain.ts) - extends the `Apply` type class with a `chain` operation which composes computations in sequence, using the return value of one computation to determine the next computation.
* [Setoid](../modules/Setoid.ts) - represents types which support decidable equality with the `equals` operation.

If you're interested in learning more about this topic, have a look at the [learning resources](./learning-resources).

### Type Class Diagram

Click the image for a larger view with nodes that link to the respective documentation pages.

<a href="../type-classes.svg" target="_blank" title="Click to open diagram in new window"><img alt="Type class diagram" src="../type-classes.svg" style="display: block; width: 100%; margin-bottom: 2em;"></a>

## Higher Kinded Types

A distinctive feature of `fp-ts` with respect to other functional libraries is its implementation of [Higher Kinded Types](<https://en.wikipedia.org/wiki/Kind_(type_theory)>), which TypeScript doesn't support natively. The idea for emulating higher kinded types in TypeScript is based on [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf).
