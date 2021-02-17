---
title: Monad.ts
nav_order: 52
parent: Modules
---

## Monad overview

`Monad` instances represent type constructors which support sequential composition.

Instances must satisfy the following laws in addition to the `Functor`:

1. Associativity: `flow(chain(afb), chain(bfc)) <-> chain(flow(afb, chain(bfc)))`
2. Left identity: `of(a) |> chain(f) <-> f(a)`
3. Right identity: `fa |> chain(of) <-> fa`

Note. `Functor`'s `map` can be derived: `map = f => chain(flow(f, of))`

Added in v3.0.0

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
export interface Monad<M> extends Pointed<M>, Chain<M> {}
```

Added in v3.0.0

## Monad1 (interface)

**Signature**

```ts
export interface Monad1<M extends URIS> extends Pointed1<M>, Chain1<M> {}
```

Added in v3.0.0

## Monad2 (interface)

**Signature**

```ts
export interface Monad2<M extends URIS2> extends Pointed2<M>, Chain2<M> {}
```

Added in v3.0.0

## Monad2C (interface)

**Signature**

```ts
export interface Monad2C<M extends URIS2, E> extends Pointed2C<M, E>, Chain2C<M, E> {}
```

Added in v3.0.0

## Monad3 (interface)

**Signature**

```ts
export interface Monad3<M extends URIS3> extends Pointed3<M>, Chain3<M> {}
```

Added in v3.0.0

## Monad3C (interface)

**Signature**

```ts
export interface Monad3C<M extends URIS3, E> extends Pointed3C<M, E>, Chain3C<M, E> {}
```

Added in v3.0.0

## Monad4 (interface)

**Signature**

```ts
export interface Monad4<M extends URIS4> extends Pointed4<M>, Chain4<M> {}
```

Added in v3.0.0
