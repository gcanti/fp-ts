---
title: Monad.ts
nav_order: 61
parent: Modules
---

## Monad overview

The `Monad` type class combines the operations of the `Chain` and
`Applicative` type classes. Therefore, `Monad` instances represent type
constructors which support sequential composition, and also lifting of
functions of arbitrary arity.

Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:

1. Left identity: `M.chain(M.of(a), f) <-> f(a)`
2. Right identity: `M.chain(fa, M.of) <-> fa`

Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Monad (interface)](#monad-interface)
  - [Monad1 (interface)](#monad1-interface)
  - [Monad2 (interface)](#monad2-interface)
  - [Monad2C (interface)](#monad2c-interface)
  - [Monad3 (interface)](#monad3-interface)
  - [Monad3C (interface)](#monad3c-interface)
  - [Monad4 (interface)](#monad4-interface)

---

# type classes

## Monad (interface)

**Signature**

```ts
export interface Monad<F> extends Applicative<F>, Chain<F> {}
```

Added in v2.0.0

## Monad1 (interface)

**Signature**

```ts
export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}
```

Added in v2.0.0

## Monad2 (interface)

**Signature**

```ts
export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}
```

Added in v2.0.0

## Monad2C (interface)

**Signature**

```ts
export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}
```

Added in v2.0.0

## Monad3 (interface)

**Signature**

```ts
export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}
```

Added in v2.0.0

## Monad3C (interface)

**Signature**

```ts
export interface Monad3C<M extends URIS3, E> extends Applicative3C<M, E>, Chain3C<M, E> {}
```

Added in v2.2.0

## Monad4 (interface)

**Signature**

```ts
export interface Monad4<M extends URIS4> extends Applicative4<M>, Chain4<M> {}
```

Added in v2.0.0
