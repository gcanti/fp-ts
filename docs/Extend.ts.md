---
title: Extend.ts
nav_order: 27
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Extend](#extend)
- [Extend1](#extend1)
- [Extend2](#extend2)
- [Extend2C](#extend2c)
- [Extend3](#extend3)
- [Extend3C](#extend3c)
- [duplicate](#duplicate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Extend

**Signature** (interface)

```ts
export interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v1.0.0

# Extend1

**Signature** (interface)

```ts
export interface Extend1<F extends URIS> extends Functor1<F> {
  readonly extend: <A, B>(ea: Type<F, A>, f: (fa: Type<F, A>) => B) => Type<F, B>
}
```

# Extend2

**Signature** (interface)

```ts
export interface Extend2<F extends URIS2> extends Functor2<F> {
  readonly extend: <L, A, B>(ea: Type2<F, L, A>, f: (fa: Type2<F, L, A>) => B) => Type2<F, L, B>
}
```

# Extend2C

**Signature** (interface)

```ts
export interface Extend2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly extend: <A, B>(ea: Type2<F, L, A>, f: (fa: Type2<F, L, A>) => B) => Type2<F, L, B>
}
```

# Extend3

**Signature** (interface)

```ts
export interface Extend3<F extends URIS3> extends Functor3<F> {
  readonly extend: <U, L, A, B>(ea: Type3<F, U, L, A>, f: (fa: Type3<F, U, L, A>) => B) => Type3<F, U, L, B>
}
```

# Extend3C

**Signature** (interface)

```ts
export interface Extend3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly extend: <A, B>(ea: Type3<F, U, L, A>, f: (fa: Type3<F, U, L, A>) => B) => Type3<F, U, L, B>
}
```

# duplicate

**Signature** (function)

```ts
export function duplicate<F extends URIS3>(
  E: Extend3<F>
): <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
export function duplicate<F extends URIS3, U, L>(
  E: Extend3C<F, U, L>
): <A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
export function duplicate<F extends URIS2>(E: Extend2<F>): <L, A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
export function duplicate<F extends URIS2, L>(E: Extend2C<F, L>): <A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
export function duplicate<F extends URIS>(E: Extend1<F>): <A>(ma: Type<F, A>) => Type<F, Type<F, A>>
export function duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
export function duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> { ... }
```

Added in v1.0.0
