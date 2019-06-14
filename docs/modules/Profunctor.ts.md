---
title: Profunctor.ts
nav_order: 70
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Profunctor (interface)](#profunctor-interface)
- [Profunctor2 (interface)](#profunctor2-interface)
- [Profunctor2C (interface)](#profunctor2c-interface)
- [Profunctor3 (interface)](#profunctor3-interface)
- [Profunctor4 (interface)](#profunctor4-interface)
- [~~lmap~~ (function)](#lmap-function)
- [~~rmap~~ (function)](#rmap-function)

---

# Profunctor (interface)

**Signature**

```ts
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B) => HKT2<F, L, B>
  readonly promap: <A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>
}
```

Added in v1.0.0

# Profunctor2 (interface)

**Signature**

```ts
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
  readonly promap: <A, B, C, D>(fbc: Kind2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => Kind2<F, A, D>
}
```

# Profunctor2C (interface)

**Signature**

```ts
export interface Profunctor2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly promap: <A, C, D>(flc: Kind2<F, L, C>, f: (a: A) => L, g: (c: C) => D) => Kind2<F, A, D>
}
```

# Profunctor3 (interface)

**Signature**

```ts
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
  readonly promap: <U, A, B, C, D>(fbc: Kind3<F, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Kind3<F, U, A, D>
}
```

# Profunctor4 (interface)

**Signature**

```ts
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
  readonly promap: <X, U, A, B, C, D>(fbc: Kind4<F, X, U, B, C>, f: (a: A) => B, g: (c: C) => D) => Kind4<F, X, U, A, D>
}
```

# ~~lmap~~ (function)

**Signature**

```ts
export function lmap<F extends URIS3>(
  profunctor: Profunctor3<F>
): <U, A, B, C>(fbc: Kind3<F, U, B, C>, f: (a: A) => B) => Kind3<F, U, A, C>
export function lmap<F extends URIS2>(
  profunctor: Profunctor2<F>
): <A, B, C>(fbc: Kind2<F, B, C>, f: (a: A) => B) => Kind2<F, A, C>
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C> { ... }
```

Added in v1.0.0

# ~~rmap~~ (function)

**Signature**

```ts
export function rmap<F extends URIS3>(
  profunctor: Profunctor3<F>
): <U, B, C, D>(fbc: Kind3<F, U, B, C>, g: (c: C) => D) => Kind3<F, U, B, D>
export function rmap<F extends URIS2>(
  profunctor: Profunctor2<F>
): <B, C, D>(fbc: Kind2<F, B, C>, g: (c: C) => D) => Kind2<F, B, D>
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D> { ... }
```

Added in v1.0.0
