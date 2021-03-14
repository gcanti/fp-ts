---
title: FromReader.ts
nav_order: 36
parent: Modules
---

## FromReader overview

Lift a computation from the `Reader` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FromReader (interface)](#fromreader-interface)

---

# type classes

## FromReader (interface)

**Signature**

```ts
export interface FromReader<F> {
  readonly fromReader: <R, A>(fa: Reader<R, A>) => HKT2<F, R, A>
}
```

Added in v3.0.0
