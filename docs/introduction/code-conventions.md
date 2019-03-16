---
title: Code Conventions
parent: Introduction
nav_order: 5
has_toc: false
---

# Code Conventions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Module structure](#module-structure)
- [FAQ](#faq)
  - [What a `2v` suffix means, e.g. `tryCatch2v`, `Foldable2v`](#what-a-2v-suffix-means-eg-trycatch2v-foldable2v)
  - [What a `C` suffix means, e.g. `Functor2C` vs `Functor2`](#what-a-c-suffix-means-eg-functor2c-vs-functor2)
  - [What a `T` suffix means, e.g. `sequenceT`](#what-a-t-suffix-means-eg-sequencet)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Module structure

In general a module containing the definition of a data structure has the following structure

- `URI` definition and module agumentation
- data structure definition
- companion functions
- instance functions (private)
- type class instance definitions (either constants or functions)

## FAQ

### What a `2v` suffix means, e.g. `tryCatch2v`, `Foldable2v`

`2v` means "second version", all the `2v` methods and types are breaking alternatives for `@deprecated` methods.

### What a `C` suffix means, e.g. `Functor2C` vs `Functor2`

The naming convention is:

- the number means the kind
- `C` means *C*urried

| Kind               | Type class           | Type defunctionalization | Note                                                    |
| ------------------ | -------------------- | ------------------------ | ------------------------------------------------------- |
| all                | `Functor<F>`         | `HKT<F, A>`              |                                                         |
| `* -> *`           | `Functor1<F>`        | `Type<F, A>`             |                                                         |
| `* -> * -> *`      | `Functor2<F>`        | `Type2<F, L, A>`         |                                                         |
| `* -> * -> *`      | `Functor2C<F, L>`    | `Type2<F, L, A>`         | A variant of `Functor2` where `L` is fixed              |
| `* -> * -> * -> *` | `Functor3<F>`        | `Type3<F, U, L, A>`      |                                                         |
| `* -> * -> * -> *` | `Functor3C<F, U, L>` | `Type3<F, U, L, A>`      | A variant of `Functor3` where both `U` and `L` is fixed |

**Example** `Functor`

The base definition

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

The defintion for type constructors of kind `* -> * -> *` (e.g. `Either`)

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  //             v-- here L is free
  readonly map: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

The defintion for type constructors that start with kind `* -> * -> *` but need to be constrained in order to admit an instance (e.g. `Validation`).

```ts
//                           this fixes L --v
export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  //                                v-- here L is fixed ---------------v
  readonly map: <A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

For example, `Validation` admits a `Functor` instance only if you provide a `Semigroup` instance for the failure part

```ts
//   this fixes L --v                                   v-- here L is fixed
const getFunctor = <L>(S: Semigroup<L>): Functor2C<"Validation", L> = { ... }
```

### What a `T` suffix means, e.g. `sequenceT`

in `sequenceT` means *T*uple, I borrowed the name from the corresponding [Haskell function](http://hackage.haskell.org/package/tuple-0.3.0.2/docs/Data-Tuple-Sequence.html)

However usually it means *T*ransformer like in "monad transformers" (e.g. `OptionT`, `EitherT`, `ReaderT`, `StateT`)
