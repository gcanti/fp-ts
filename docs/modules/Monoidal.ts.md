---
title: Monoidal.ts
nav_order: 57
parent: Modules
---

# Overview

`Applicative` functors are equivalent to strong lax monoidal functors

- https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
- https://bartoszmilewski.com/2017/02/06/applicative-functors/

---

<h2 class="text-delta">Table of contents</h2>

- [Monoidal (interface)](#monoidal-interface)
- [Monoidal1 (interface)](#monoidal1-interface)
- [Monoidal2 (interface)](#monoidal2-interface)
- [Monoidal2C (interface)](#monoidal2c-interface)
- [Monoidal3 (interface)](#monoidal3-interface)
- [fromApplicative (function)](#fromapplicative-function)
- [toApplicative (function)](#toapplicative-function)

---

# Monoidal (interface)

**Signature**

```ts
export interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}
```

Added in v2.0.0

# Monoidal1 (interface)

**Signature**

```ts
export interface Monoidal1<F extends URIS> extends Functor1<F> {
  readonly unit: () => Type<F, void>
  readonly mult: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, [A, B]>
}
```

Added in v2.0.0

# Monoidal2 (interface)

**Signature**

```ts
export interface Monoidal2<F extends URIS2> extends Functor2<F> {
  readonly unit: <L>() => Type2<F, L, void>
  readonly mult: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}
```

Added in v2.0.0

# Monoidal2C (interface)

**Signature**

```ts
export interface Monoidal2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly unit: () => Type2<F, L, void>
  readonly mult: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}
```

Added in v2.0.0

# Monoidal3 (interface)

**Signature**

```ts
export interface Monoidal3<F extends URIS3> extends Functor3<F> {
  readonly unit: <U, L>() => Type3<F, U, L, void>
  readonly mult: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>
}
```

Added in v2.0.0

# fromApplicative (function)

**Signature**

```ts
export function fromApplicative<F extends URIS3>(F: Applicative3<F>): Monoidal3<F>
export function fromApplicative<F extends URIS2>(F: Applicative2<F>): Monoidal2<F>
export function fromApplicative<F extends URIS>(F: Applicative1<F>): Monoidal1<F>
export function fromApplicative<F>(F: Applicative<F>): Monoidal<F> { ... }
```

Added in v2.0.0

# toApplicative (function)

**Signature**

```ts
export function toApplicative<F extends URIS3>(M: Monoidal3<F>): Applicative3<F>
export function toApplicative<F extends URIS2>(M: Monoidal2<F>): Applicative2<F>
export function toApplicative<F extends URIS>(M: Monoidal1<F>): Applicative1<F>
export function toApplicative<F>(M: Monoidal<F>): Applicative<F> { ... }
```

Added in v2.0.0
