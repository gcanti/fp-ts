---
title: Contravariant.ts
nav_order: 21
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant (interface)](#contravariant-interface)
- [Contravariant1 (interface)](#contravariant1-interface)
- [Contravariant2 (interface)](#contravariant2-interface)
- [Contravariant2C (interface)](#contravariant2c-interface)
- [Contravariant3 (interface)](#contravariant3-interface)
- [Contravariant3C (interface)](#contravariant3c-interface)
- [Contravariant4 (interface)](#contravariant4-interface)
- [~~lift~~ (function)](#lift-function)

---

# Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

Added in v1.0.0

# Contravariant1 (interface)

**Signature**

```ts
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: Kind<F, A>, f: (b: B) => A) => Kind<F, B>
}
```

# Contravariant2 (interface)

**Signature**

```ts
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <L, A, B>(fa: Kind2<F, L, A>, f: (b: B) => A) => Kind2<F, L, B>
}
```

# Contravariant2C (interface)

**Signature**

```ts
export interface Contravariant2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly contramap: <A, B>(fa: Kind2<F, L, A>, f: (b: B) => A) => Kind2<F, L, B>
}
```

# Contravariant3 (interface)

**Signature**

```ts
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <U, L, A, B>(fa: Kind3<F, U, L, A>, f: (b: B) => A) => Kind3<F, U, L, B>
}
```

# Contravariant3C (interface)

**Signature**

```ts
export interface Contravariant3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly contramap: <A, B>(fa: Kind3<F, U, L, A>, f: (b: B) => A) => Kind3<F, U, L, B>
}
```

# Contravariant4 (interface)

**Signature**

```ts
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, f: (b: B) => A) => Kind4<F, X, U, L, B>
}
```

# ~~lift~~ (function)

Use `pipeable`'s `contramap`

**Signature**

```ts
export function lift<F extends URIS3>(
  contravariant: Contravariant3<F>
): <A, B>(f: (b: B) => A) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
export function lift<F extends URIS3, U, L>(
  contravariant: Contravariant3C<F, U, L>
): <A, B>(f: (b: B) => A) => (fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
export function lift<F extends URIS2>(
  contravariant: Contravariant2<F>
): <A, B>(f: (b: B) => A) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
export function lift<F extends URIS2, L>(
  contravariant: Contravariant2C<F, L>
): <A, B>(f: (b: B) => A) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
export function lift<F extends URIS>(
  contravariant: Contravariant1<F>
): <A, B>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B> { ... }
```

Added in v1.0.0
