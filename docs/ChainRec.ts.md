---
title: ChainRec.ts
nav_order: 15
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [ChainRec](#chainrec)
- [ChainRec1](#chainrec1)
- [ChainRec2](#chainrec2)
- [ChainRec2C](#chainrec2c)
- [ChainRec3](#chainrec3)
- [ChainRec3C](#chainrec3c)
- [tailRec](#tailrec)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ChainRec

**Signature** (interface)

```ts
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

Added in v1.0.0

# ChainRec1

**Signature** (interface)

```ts
export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Type<F, Either<A, B>>) => Type<F, B>
}
```

# ChainRec2

**Signature** (interface)

```ts
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
  readonly chainRec: <L, A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>
}
```

# ChainRec2C

**Signature** (interface)

```ts
export interface ChainRec2C<F extends URIS2, L> extends Chain2C<F, L> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>
}
```

# ChainRec3

**Signature** (interface)

```ts
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
  readonly chainRec: <U, L, A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>
}
```

# ChainRec3C

**Signature** (interface)

```ts
export interface ChainRec3C<F extends URIS3, U, L> extends Chain3C<F, U, L> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>
}
```

# tailRec

**Signature** (function)

```ts
export const tailRec = <A, B>(f: (a: A) => Either<A, B>, a: A): B => ...
```

Added in v1.0.0
