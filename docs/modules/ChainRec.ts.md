---
title: ChainRec.ts
nav_order: 15
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ChainRec (interface)](#chainrec-interface)
- [ChainRec1 (interface)](#chainrec1-interface)
- [ChainRec2 (interface)](#chainrec2-interface)
- [ChainRec2C (interface)](#chainrec2c-interface)
- [ChainRec3 (interface)](#chainrec3-interface)
- [tailRec (function)](#tailrec-function)

---

# ChainRec (interface)

**Signature**

```ts
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

Added in v2.0.0

# ChainRec1 (interface)

**Signature**

```ts
export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Type<F, Either<A, B>>) => Type<F, B>
}
```

# ChainRec2 (interface)

**Signature**

```ts
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
  readonly chainRec: <L, A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>
}
```

# ChainRec2C (interface)

**Signature**

```ts
export interface ChainRec2C<F extends URIS2, L> extends Chain2C<F, L> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>
}
```

# ChainRec3 (interface)

**Signature**

```ts
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
  readonly chainRec: <U, L, A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>
}
```

# tailRec (function)

**Signature**

```ts
export const tailRec = <A, B>(a: A, f: (a: A) => Either<A, B>): B => ...
```

Added in v2.0.0
