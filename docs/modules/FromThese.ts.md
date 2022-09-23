---
title: FromThese.ts
nav_order: 39
parent: Modules
---

## FromThese overview

The `FromThese` type class represents those data types which support errors and warnings.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromTheseK](#fromthesek)
- [type classes](#type-classes)
  - [FromThese (interface)](#fromthese-interface)

---

# combinators

## fromTheseK

**Signature**

```ts
export declare const fromTheseK: <F extends HKT>(
  F: FromThese<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => These<E, B>
) => <S>(...a: A) => Kind<F, S, unknown, never, E, B>
```

Added in v3.0.0

# type classes

## FromThese (interface)

**Signature**

```ts
export interface FromThese<F extends HKT> extends Typeclass<F> {
  readonly fromThese: <E, A, S>(fa: These<E, A>) => Kind<F, S, unknown, never, E, A>
}
```

Added in v3.0.0
