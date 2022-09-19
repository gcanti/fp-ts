---
title: FromWriter.ts
nav_order: 41
parent: Modules
---

## FromWriter overview

The `FromWriter` type class represents those data types which support accumulators.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromWriterK](#fromwriterk)
- [type classes](#type-classes)
  - [FromWriter (interface)](#fromwriter-interface)

---

# combinators

## fromWriterK

**Signature**

```ts
export declare const fromWriterK: <F extends HKT>(
  F: FromWriter<F>
) => <A extends readonly unknown[], E, B>(
  f: (...a: A) => Writer<E, B>
) => <S, R = unknown, W = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# type classes

## FromWriter (interface)

**Signature**

```ts
export interface FromWriter<F extends HKT> extends Typeclass<F> {
  readonly fromWriter: <E, A, S, R = unknown, W = never>(fa: Writer<E, A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
