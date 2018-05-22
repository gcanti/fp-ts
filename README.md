[![build status](https://img.shields.io/travis/gcanti/fp-ts/master.svg?style=flat-square)](https://travis-ci.org/gcanti/fp-ts)
[![dependency status](https://img.shields.io/david/gcanti/fp-ts.svg?style=flat-square)](https://david-dm.org/gcanti/fp-ts)
![npm downloads](https://img.shields.io/npm/dm/fp-ts.svg)

<a href="docs/api/md/index.md">
  <img src="fp-ts-logo.png">
</a>

Inspired by

* [PureScript](http://www.purescript.org)
* [fantasy-land](https://github.com/fantasyland/fantasy-land)
* [static-land](https://github.com/rpominov/static-land)
* Scala

# Installation

To install the stable version:

```
npm install --save fp-ts
```

# TypeScript compatibility

The stable version is tested against TypeScript 2.8.x, but should run with TypeScript 2.2.2+ too

# Technical overview

The idea (faking higher kinded types in TypeScript) is based on

* [Lightweight higher-kinded polymorphism](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf)
* [elm-brands](https://github.com/joneshf/elm-brands)
* [Higher kinded types in TypeScript, static and fantasy land](https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe)
* [flow-static-land](https://github.com/gcanti/flow-static-land)

# Ecosystem

* [io-ts](https://github.com/gcanti/io-ts) - TypeScript compatible runtime type system for IO validation
* [monocle-ts](https://github.com/gcanti/monocle-ts) - Functional optics: a (partial) porting of scala monocle to
  TypeScript
* [newtype-ts](https://github.com/gcanti/newtype-ts) - Implementation of newtypes in TypeScript
* [logging-ts](https://github.com/gcanti/logging-ts) - Composable loggers for TypeScript
* [fp-ts-routing](https://github.com/gcanti/fp-ts-routing) - A type-safe bidirectional routing library for TypeScript
* [parser-ts](https://github.com/gcanti/parser-ts) - String parser combinators for TypeScript
* [remote-data-ts](https://github.com/devex-web-frontend/remote-data-ts) - RemoteData type (check [this article](https://medium.com/@gcanti/slaying-a-ui-antipattern-with-flow-5eed0cfb627b))

## Bindings

* [fp-ts-rxjs](https://github.com/gcanti/fp-ts-rxjs) - fp-ts bindings for RxJS
* [fp-ts-fluture](https://github.com/gcanti/fp-ts-fluture) - fp-ts bindings for Fluture

# Documentation

* [API](docs/index.md)

## Internals

* [How `HKT`, `URI2HKT`, `URIS` and `Type` work](HKT.md)

## Examples

* [Free monad](examples/Free.ts)
* [MTL-style](examples/mtl.ts)
* OptionT monad transformer
  * [ArrayOption](examples/ArrayOption.ts)
  * [TaskOption](examples/TaskOption.ts)
* EitherT monad transformer
  * [EitherOption](examples/EitherOption.ts)
* StateT monad transformer
  * [StateIO](examples/StateIO.ts)
  * [StateTaskEither](examples/StateTaskEither.ts)
* ReaderT monad transformer
  * [ReaderIO](examples/ReaderIO.ts)
* Applicative composition
  * [TaskValidation](examples/TaskValidation.ts)
* [Type safe finite state machines with `IxIO`](examples/ixIO.ts)
* [Moore machines](examples/Moore.ts)
* [Debugging with `Trace`](examples/debugging-with-Trace.ts)
* [fantas-eel-and-specification](fantas-eel-and-specification) - Code for the
  [Fantas, Eel, and Specification](http://www.tomharding.me/2017/03/03/fantas-eel-and-specification/) blog series on
  functional programming by Tom Harding

# License

The MIT License (MIT)
