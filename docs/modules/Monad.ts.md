---
title: Monad.ts
nav_order: 59
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

---

# type classes

## Monad (interface)

**Signature**

```ts
export interface Monad<M extends HKT> extends Pointed<M>, Chain<M> {}
```

Added in v3.0.0
