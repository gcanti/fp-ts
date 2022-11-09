---
title: Ecosystem
permalink: /ecosystem/
nav_order: 3
has_children: false
has_toc: false
---

# Ecosystem

## Tooling

- [create-fp-ts-lib](https://github.com/no-day/create-fp-ts-lib) - Bootstrap libraries that follow common fp-ts coding, documentation and testing patterns
- [docs-ts](https://github.com/gcanti/docs-ts) - Documentation generator used by fp-ts and many fp-ts libraries

## Libraries

- [fp-ts-contrib](https://github.com/gcanti/fp-ts-contrib) - A community driven utility package for fp-ts
- [fp-ts-codegen](https://github.com/gcanti/fp-ts-codegen) - TypeScript code generation from a haskell-like syntax for ADT
- [io-ts](https://github.com/gcanti/io-ts) - TypeScript compatible runtime type system for IO validation
- [monocle-ts](https://github.com/gcanti/monocle-ts) - Functional optics: a (partial) porting of scala monocle to
  TypeScript
- [spectacles-ts](https://github.com/anthonyjoeseph/spectacles-ts/) - A simple facade built on top of monocle-ts (autocompletes possible combinators)
- [newtype-ts](https://github.com/gcanti/newtype-ts) - Implementation of newtypes in TypeScript
- [logging-ts](https://github.com/gcanti/logging-ts) - Composable loggers for TypeScript
- [logger-fp-ts](https://github.com/thewilkybarkid/logger-fp-ts) - Logger built on top of logging-ts
- [fp-ts-routing](https://github.com/gcanti/fp-ts-routing) - A type-safe bidirectional routing library for TypeScript
- [parser-ts](https://github.com/gcanti/parser-ts) - String parser combinators for TypeScript
- [remote-data-ts](https://github.com/devex-web-frontend/remote-data-ts) - RemoteData type (check [this article](https://medium.com/@gcanti/slaying-a-ui-antipattern-with-flow-5eed0cfb627b))
- [retry-ts](https://github.com/gcanti/retry-ts) - Retry combinators for monadic actions that may fail
- [fp-ts-local-storage](https://github.com/gcanti/fp-ts-local-storage) - fp-ts bindings for LocalStorage
- [circuit-breaker-monad](https://github.com/YBogomolov/circuit-breaker-monad) - Circuit Breaker pattern as a monad
- [waveguide](https://github.com/rzeigler/waveguide) - Bifunctor effect type and concurrent data structures.
- [kleisli-ts](https://github.com/YBogomolov/kleisli-ts) - Kleisli arrows for bifunctor MonadThrow (IOEither, TaskEither)
- [@nll/datum](https://github.com/nullpub/datum) - Datum and DatumEither types, another take on RemoteData and [flow](https://medium.com/@gcanti/slaying-a-ui-antipattern-with-flow-5eed0cfb627b)
- [fetcher-ts](https://github.com/YBogomolov/fetcher-ts) - Type-safe REST HTTP client with io-ts response validation
- [alga-ts](https://github.com/algebraic-graphs/typescript) – Algebraic encoding for graphs, which makes invalid graphs unrepresentable
- [morphic-ts](https://github.com/sledorze/morphic-ts) - Code first Domain modeling with extensive pattern supports (matchers, predicates, lenses) with useful, extensible, customisable derivations (Show, Eq, io-ts, fast-check, jsonSchema, ..).
- [graphics-ts](https://github.com/gcanti/graphics-ts) - A porting of purescript-{canvas, drawing} featuring fp-ts
- [expressive-ts](https://github.com/IMax153/expressive-ts) - Comonadic builders for writing complex regular expressions
- [fp-fetch](https://github.com/monstasat/fp-fetch) - Functional style, non-throwing utils for data fetching
- [fp-ts-std](https://github.com/samhh/fp-ts-std) - The missing pseudo-standard library for fp-ts.
- [fp-ts-lcg](https://github.com/no-day/fp-ts-lcg) - A seeded pseudorandom number generator
- [fp-ts-graph](https://github.com/no-day/fp-ts-graph) - Immutable, functional graph data structure
- [fp-ts-bigint](https://github.com/ericcrosson/fp-ts-bigint) - Opt-in BigInt functions
- [fp-ts-generators](https://github.com/no-day/fp-ts-generators) - Seeded pseudorandom generators for structured data
- [fp-ts-sized-vectors](https://github.com/no-day/fp-ts-sized-vectors) - Fixed size generic vector type carrying its length at the typelevel
- [fp-ts-number-instances](https://github.com/no-day/fp-ts-number-instances) - Not fully law abiding instances for the number type
- [fp-ts-react-stable-hooks](https://github.com/mblink/fp-ts-react-stable-hooks) - Reduce unnecessary rerenders when using fp-ts data types with React hooks

## Bindings

- [fp-ts-rxjs](https://github.com/gcanti/fp-ts-rxjs) - fp-ts bindings for [RxJS](https://rxjs-dev.firebaseapp.com/)
- [fp-ts-fluture](https://github.com/gcanti/fp-ts-fluture) - fp-ts bindings for [Fluture](https://github.com/fluture-js/Fluture)
- [fp-ts-most](https://github.com/joshburgess/fp-ts-most) - fp-ts bindings for [@most/core](https://github.com/cujojs/most)
- [fp-ts-ixjs](https://github.com/werk85/fp-ts-ixjs) - fp-ts bindings for [IxJS](https://github.com/ReactiveX/IxJS)

## Plugins

- [fastify-funky](https://github.com/fastify/fastify-funky) - plugin that adds support for returning fp-ts Either and Task entities as handler execution results for [fastify](https://github.com/fastify/fastify) web framework
