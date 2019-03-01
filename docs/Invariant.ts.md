---
title: Invariant.ts
nav_order: 44
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Invariant](#invariant)
- [Invariant1](#invariant1)
- [Invariant2](#invariant2)
- [Invariant2C](#invariant2c)
- [Invariant3](#invariant3)
- [Invariant3C](#invariant3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Invariant

**Signature** (interface)

```ts
export interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => HKT<F, B>
}
```

Added in v1.0.0

# Invariant1

**Signature** (interface)

```ts
export interface Invariant1<F extends URIS> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => Type<F, B>
}
```

# Invariant2

**Signature** (interface)

```ts
export interface Invariant2<F extends URIS2> {
  readonly URI: F
  readonly imap: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B, g: (b: B) => A) => Type2<F, L, B>
}
```

# Invariant2C

**Signature** (interface)

```ts
export interface Invariant2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly imap: <A, B>(fa: HKT2<F, L, A>, f: (a: A) => B, g: (b: B) => A) => Type2<F, L, B>
}
```

# Invariant3

**Signature** (interface)

```ts
export interface Invariant3<F extends URIS3> {
  readonly URI: F
  readonly imap: <U, L, A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B, g: (b: B) => A) => Type3<F, U, L, B>
}
```

# Invariant3C

**Signature** (interface)

```ts
export interface Invariant3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly imap: <A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => B, g: (b: B) => A) => Type3<F, U, L, B>
}
```
