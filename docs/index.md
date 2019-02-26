# What is fp-ts?

`fp-ts` is a library for **typed functional programming** in TypeScript.

`fp-ts` aims to allow developers to use **popular patterns and abstractions** that are available in most functional languages. For this, it includes the most popular data types, type classes and abstractions such as `Option`, `Either`, `IO`, `Task`, `Functor`, `Applicative`, `Monad` to empower users to write pure FP apps and libraries built atop higher order abstractions.

A distinctive feature of `fp-ts` with respect to other functional libraries is its implementation of [Higher Kinded Types](<https://en.wikipedia.org/wiki/Kind_(type_theory)>) (TypeScript doesn't support HKT natively).

The idea (faking higher kinded types in TypeScript) is based on [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf)

**Inspired by**

- [Haskell](https://haskell-lang.org)
- [PureScript](http://www.purescript.org)
- [Scala](https://www.scala-lang.org/)
