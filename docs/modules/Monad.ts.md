---
title: Monad.ts
nav_order: 60
parent: Modules
---

## Monad overview

`Monad` instances represent type constructors which support sequential composition.

Instances must satisfy the following laws in addition to the `Functor`:

1. Associativity: `flow(flatMap(afb), flatMap(bfc)) <-> flatMap(flow(afb, flatMap(bfc)))`
2. Left identity: `of(a) |> flatMap(f) <-> f(a)`
3. Right identity: `fa |> flatMap(of) <-> fa`

Note. `Functor`'s `map` can be derived: `map = f => flatMap(flow(f, of))`

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
export interface Monad<M extends HKT> extends Pointed<M>, Flat<M> {}
```

Added in v3.0.0
