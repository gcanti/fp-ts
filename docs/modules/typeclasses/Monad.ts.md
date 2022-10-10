---
title: typeclasses/Monad.ts
nav_order: 69
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

- [do notation](#do-notation)
  - [guard](#guard)
- [model](#model)
  - [Monad (interface)](#monad-interface)

---

# do notation

## guard

**Signature**

```ts
export declare const guard: <F extends TypeLambda>(
  Monad: Monad<F>,
  Alternative: Alternative<F>
) => <A, S, R2, O2, E2>(
  f: (a: A) => boolean
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

# model

## Monad (interface)

**Signature**

```ts
export interface Monad<F extends TypeLambda> extends FromIdentity<F>, flattenable.Flattenable<F> {}
```

Added in v3.0.0
