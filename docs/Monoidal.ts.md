---
title: Monoidal.ts
nav_order: 58
---

# Overview

`Applicative` functors are equivalent to strong lax monoidal functors

- https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
- https://bartoszmilewski.com/2017/02/06/applicative-functors/

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Monoidal](#monoidal)
- [Monoidal1](#monoidal1)
- [Monoidal2](#monoidal2)
- [Monoidal2C](#monoidal2c)
- [Monoidal3](#monoidal3)
- [Monoidal3C](#monoidal3c)
- [fromApplicative](#fromapplicative)
- [toApplicative](#toapplicative)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Monoidal

**Signature** (interface)

```ts
export interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}
```

Added in v1.0.0

# Monoidal1

**Signature** (interface)

```ts
export interface Monoidal1<F extends URIS> extends Functor1<F> {
  readonly unit: () => Type<F, void>
  readonly mult: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, [A, B]>
}
```

# Monoidal2

**Signature** (interface)

```ts
export interface Monoidal2<F extends URIS2> extends Functor2<F> {
  readonly unit: <L>() => Type2<F, L, void>
  readonly mult: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}
```

# Monoidal2C

**Signature** (interface)

```ts
export interface Monoidal2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly unit: () => Type2<F, L, void>
  readonly mult: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, [A, B]>
}
```

# Monoidal3

**Signature** (interface)

```ts
export interface Monoidal3<F extends URIS3> extends Functor3<F> {
  readonly unit: <U, L>() => Type3<F, U, L, void>
  readonly mult: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>
}
```

# Monoidal3C

**Signature** (interface)

```ts
export interface Monoidal3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly unit: () => Type3<F, U, L, void>
  readonly mult: <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, [A, B]>
}
```

# fromApplicative

**Signature** (function)

```ts
export function fromApplicative<F extends URIS3>(applicative: Applicative3<F>): Monoidal3<F>
export function fromApplicative<F extends URIS2>(applicative: Applicative2<F>): Monoidal2<F>
export function fromApplicative<F extends URIS>(applicative: Applicative1<F>): Monoidal1<F>
export function fromApplicative<F>(applicative: Applicative<F>): Monoidal<F>
export function fromApplicative<F>(applicative: Applicative<F>): Monoidal<F> { ... }
```

Added in v1.0.0

# toApplicative

**Signature** (function)

```ts
export function toApplicative<F extends URIS3>(monoidal: Monoidal3<F>): Applicative3<F>
export function toApplicative<F extends URIS2>(monoidal: Monoidal2<F>): Applicative2<F>
export function toApplicative<F extends URIS>(monoidal: Monoidal1<F>): Applicative1<F>
export function toApplicative<F>(monoidal: Monoidal<F>): Applicative<F>
export function toApplicative<F>(monoidal: Monoidal<F>): Applicative<F> { ... }
```

Added in v1.0.0
