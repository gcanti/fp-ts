---
title: Invariant.ts
nav_order: 44
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Invariant (interface)](#invariant-interface)
- [Invariant1 (interface)](#invariant1-interface)
- [Invariant2 (interface)](#invariant2-interface)
- [Invariant2C (interface)](#invariant2c-interface)
- [Invariant3 (interface)](#invariant3-interface)
- [Invariant3C (interface)](#invariant3c-interface)

---

# Invariant (interface)

**Signature**

```ts
export interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => HKT<F, B>
}
```

Added in v2.0.0

# Invariant1 (interface)

**Signature**

```ts
export interface Invariant1<F extends URIS> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => Type<F, B>
}
```

# Invariant2 (interface)

**Signature**

```ts
export interface Invariant2<F extends URIS2> {
  readonly URI: F
  readonly imap: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B, g: (b: B) => A) => Type2<F, L, B>
}
```

# Invariant2C (interface)

**Signature**

```ts
export interface Invariant2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly imap: <A, B>(fa: HKT2<F, L, A>, f: (a: A) => B, g: (b: B) => A) => Type2<F, L, B>
}
```

# Invariant3 (interface)

**Signature**

```ts
export interface Invariant3<F extends URIS3> {
  readonly URI: F
  readonly imap: <U, L, A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B, g: (b: B) => A) => Type3<F, U, L, B>
}
```

# Invariant3C (interface)

**Signature**

```ts
export interface Invariant3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly imap: <A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B, g: (b: B) => A) => Type3<F, U, L, B>
}
```
