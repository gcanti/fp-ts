---
title: Contravariant.ts
nav_order: 22
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

---

# Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

Added in v2.0.0

# Contravariant1 (interface)

**Signature**

```ts
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: Type<F, A>, f: (b: B) => A) => Type<F, B>
}
```

# Contravariant2 (interface)

**Signature**

```ts
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <L, A, B>(fa: Type2<F, L, A>, f: (b: B) => A) => Type2<F, L, B>
}
```

# Contravariant2C (interface)

**Signature**

```ts
export interface Contravariant2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly contramap: <A, B>(fa: Type2<F, L, A>, f: (b: B) => A) => Type2<F, L, B>
}
```

# Contravariant3 (interface)

**Signature**

```ts
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (b: B) => A) => Type3<F, U, L, B>
}
```

# Contravariant3C (interface)

**Signature**

```ts
export interface Contravariant3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly contramap: <A, B>(fa: Type3<F, U, L, A>, f: (b: B) => A) => Type3<F, U, L, B>
}
```
