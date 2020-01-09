---
title: Category
parent: Getting started
nav_order: 5
---

# Getting started with fp-ts: Category

In the last posts we saw some basic abstractions used in functional programming: [Eq](../Eq.md), [Ord](../Ord.md), [Semigroup](../Semigroup.md) and [Monoid](../Monoid.md).

In the next posts we will explore some advanced abstractions that make functional programming even more interesting.

Storically the first advanced abstraction contained in [fp-ts](https://github.com/gcanti/fp-ts) is `Functor`, but before we can talk about functors we need to learn something about **categories** since functors are built upon them.

A corner stone of functional programming is **composition**. But what does that exactely mean? When we can say that two things _compose_? And when we can say that things compose _well_?

We need a **formal definition** of composition. That's what categories are all about.

> Categories capture the essence of composition.

# Categories

The definition of category is a bit long so I'm going to split its definition in two parts:

- the first is technical (first of all we need to define its constituents)
- the second part will contain what we are most interested in: a notion of composition

### Part I (Definition)

A category is a pair `(Objects, Morphisms)` where:

- `Objects` is a collection of **objects**
- `Morphisms` is a collection of **morphisms** (or arrows) between the objects

**Note**. The term "object" here has nothing to do with OOP, you can think of objects as black boxes you can't inspect, or even as some kind of ancillary placeholders for morphisms.

Each morphism `f` has a source object `A` and a target object `B` where `A` and `B` are in `Objects`.

We write `f: A ⟼ B`, and we say "f is a morphism from A to B".

### Part II (Composition)

There's an operation `∘`, named "composition", such that the following properties must hold

- (**composition of morphisms**) whenever `f: A ⟼ B` and `g: B ⟼ C` are two morphism in `Morphisms` then it must exist a third morphism `g ∘ f: A ⟼ C` in `Morphisms` which is the _composition_ of `f` and `g`
- (**associativity**) if `f: A ⟼ B`, `g: B ⟼ C` and `h: C ⟼ D` then `h ∘ (g ∘ f) = (h ∘ g) ∘ f`
- (**identity**) for every object `X`, there exists a morphism `identity: X ⟼ X` called the _identity morphism_ for `X`, such that for every morphism `f: A ⟼ X` and every morphism `g: X ⟼ B`, we have `identity ∘ f = f` and `g ∘ identity` = g.

**Example**

<img src="./images/Category.png" width="300" alt="a simple category" />

<center>(source: [category on wikipedia.org](https://en.wikipedia.org/wiki/Category_(mathematics)))</center>

This category is quite simple, there are only three objects and six morphisms (1<sub>A</sub>, 1<sub>B</sub>, 1<sub>C</sub> are the identity morphisms of `A`, `B`, `C`).

## Categories as programming languages

A category can be interpreted as a simplified model of a **typed programming language**, where:

- objects are **types**
- morphisms are **functions**
- `∘` is the usual **function composition**

The diagram

<img src="./images/Category.png" width="300" alt="a simple programming language" />

can be interpreted as a fairly simple, immaginary programming language with only three types and a small bunch of functions.

For example:

- `A = string`
- `B = number`
- `C = boolean`
- `f = string => number`
- `g = number => boolean`
- `g ∘ f = string => boolean`

The implementation could be something like

```ts
function f(s: string): number {
  return s.length
}

function g(n: number): boolean {
  return n > 2
}

// h = g ∘ f
function h(s: string): boolean {
  return g(f(s))
}
```

## A category for TypeScript

We can define a category, named _TS_, as a model for the TypeScript language, where:

- **objects** are all the TypeScript types: `string`, `number`, `Array<string>`, ...
- **morphisms** are all the TypeScript functions: `(a: A) => B`, `(b: B) => C`, ... where `A`, `B`, `C`, ... are TypeScript types
- **identity morphisms** are all encoded as a single polymorphic function `const identity = <A>(a: A): A => a`
- **composition of morphisms** is the usual function composition (which is associative)

As a model for TypeScript, _TS_ might seems too limited: no loops, no `if`s, _almost_ nothing... Nonetheless this simplified model is rich enough for our main purpose: reason about a well defined notion of composition.

## The central problem with composition

In _TS_ we can compose two generic functions `f: (a: A) => B` and `g: (c: C) => D` as long as `B = C`

```ts
function compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C {
  return a => g(f(a))
}
```

But what if `B != C`? How can we _compose_ such functions? Should we just give up?

In the [next post](./Functor.md) we'll see under which conditions such a composition is possible. We'll talk about **functors**.
