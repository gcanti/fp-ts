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

- [combinators](#combinators)
  - [flatMapFirstReaderK](#flatmapfirstreaderk)
  - [flatMapReaderK](#flatmapreaderk)
  - [fromReaderK](#fromreaderk)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [type classes](#type-classes)
  - [FromReader (interface)](#fromreader-interface)

---

# combinators

## flatMapFirstReaderK

**Signature**

```ts
export declare const flatMapFirstReaderK: <M extends HKT>(
  F: FromReader<M>,
  M: flat.Flat<M>
) => <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, W, E>(first: Kind<M, S, R1, W, E, A>) => Kind<M, S, R1 & R2, W, E, A>
```

Added in v3.0.0

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <M extends HKT>(
  F: FromReader<M>,
  M: flat.Flat<M>
) => <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, W, E>(ma: Kind<M, S, R1, W, E, A>) => Kind<M, S, R1 & R2, W, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <F extends HKT>(
  F: FromReader<F>
) => <A extends readonly unknown[], R, B>(
  f: (...a: A) => Reader<R, B>
) => <S, W = never, E = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# constructors

## ask

**Signature**

```ts
export declare function ask<F extends HKT>(
  F: FromReader<F>
): <S, R = unknown, W = never, E = never>() => Kind<F, S, R, W, E, R>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare function asks<F extends HKT>(
  F: FromReader<F>
): <R, A, S, W = never, E = never>(f: (r: R) => A) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0

# type classes

## FromReader (interface)

**Signature**

```ts
export interface FromReader<F extends HKT> extends Typeclass<F> {
  readonly fromReader: <R, A, S, W = never, E = never>(fa: Reader<R, A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
