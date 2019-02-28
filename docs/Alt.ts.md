---
title: Alt.ts
nav_order: 1
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Alt](#alt)
- [Alt1](#alt1)
- [Alt2](#alt2)
- [Alt2C](#alt2c)
- [Alt3](#alt3)
- [Alt3C](#alt3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Alt

The `Alt` type class identifies an associative operation on a type constructor. It is similar to `Semigroup`, except
that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
`number`.

`Alt` instances are required to satisfy the following laws:

1. Associativity: `A.alt(A.alt(fa, ga), ha) = A.alt(fa, A.alt(ga, ha))`
2. Distributivity: `A.map(A.alt(fa, ga), ab) = A.alt(A.map(fa, ab), A.map(ga, ab))`

**Signature** (interface)

```ts
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
}
```

Added in v1.0.0

# Alt1

**Signature** (interface)

```ts
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fx: Type<F, A>, fy: Type<F, A>) => Type<F, A>
}
```

# Alt2

**Signature** (interface)

```ts
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <L, A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}
```

# Alt2C

**Signature** (interface)

```ts
export interface Alt2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly alt: <A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}
```

# Alt3

**Signature** (interface)

```ts
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <U, L, A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}
```

# Alt3C

**Signature** (interface)

```ts
export interface Alt3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly alt: <A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}
```
