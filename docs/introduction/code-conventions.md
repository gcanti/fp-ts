---
title: Code Conventions
parent: Introduction
nav_order: 4
has_toc: false
---

# Code Conventions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Module structure](#module-structure)
- [FAQ](#faq)
  - [What a `C` suffix means, e.g. `Functor2C` vs `Functor2`](#what-a-c-suffix-means-eg-functor2c-vs-functor2)
  - [What a `T` suffix means, e.g. `sequenceT`](#what-a-t-suffix-means-eg-sequencet)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Module structure

In general a module containing the definition of a data structure has the following structure

- `URI` definition and module augmentation
- data structure definition
- companion functions
- instance functions (private)
- type class instance definitions (either constants or functions)

## FAQ

### What a `C` suffix means, e.g. `Functor2C` vs `Functor2`

The naming convention is:

- the number means the kind
- `C` means *C*urried

| Kind               | Type class           | Type defunctionalization | Note                                                    |
| ------------------ | -------------------- | ------------------------ | ------------------------------------------------------- |
| all                | `Functor<F>`         | `HKT<F, A>`              |                                                         |
| `* -> *`           | `Functor1<F>`        | `Kind<F, A>`             |                                                         |
| `* -> * -> *`      | `Functor2<F>`        | `Kind2<F, E, A>`         |                                                         |
| `* -> * -> *`      | `Functor2C<F, E>`    | `Kind2<F, E, A>`         | A variant of `Functor2` where `E` is fixed              |
| `* -> * -> * -> *` | `Functor3<F>`        | `Kind3<F, R, E, A>`      |                                                         |
| `* -> * -> * -> *` | `Functor3C<F, R, E>` | `Kind3<F, R, E, A>`      | A variant of `Functor3` where both `R` and `E` are fixed |

**Example** `Functor`

The base definition

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

The definition for type constructors of kind `* -> * -> *` (e.g. `Either`)

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  //             v-- here E is free
  readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

The definition for type constructors that start with kind `* -> * -> *` but need to be constrained in order to admit an instance (e.g. `Validation`).

```ts
//                           this fixes E --v
export interface Functor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  //                                v-- here E is fixed ---------------v
  readonly map: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>
}
```

For example, `Validation` admits a `Functor` instance only if you provide a `Semigroup` instance for the failure part

```ts
//   this fixes E --v                                            v-- here E is fixed
const getFunctor = <E>(S: Semigroup<E>): Functor2C<"Validation", E> = { ... }
```

### What a `T` suffix means, e.g. `sequenceT`

in `sequenceT` means *T*uple, I borrowed the name from the corresponding [Haskell function](http://hackage.haskell.org/package/tuple-0.3.0.2/docs/Data-Tuple-Sequence.html)

However usually it means *T*ransformer like in "monad transformers" (e.g. `OptionT`, `EitherT`, `ReaderT`, `StateT`)
