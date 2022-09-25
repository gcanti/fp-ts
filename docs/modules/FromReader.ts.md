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
  - [flatMapReaderK](#flatmapreaderk)
  - [fromReaderK](#fromreaderk)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [type classes](#type-classes)
  - [FromReader (interface)](#fromreader-interface)

---

# combinators

## flatMapReaderK

**Signature**

```ts
export declare const flatMapReaderK: <M extends TypeLambda>(
  F: FromReader<M>,
  M: Flattenable<M>
) => <A, R2, B>(
  f: (a: A) => Reader<R2, B>
) => <S, R1, W, E>(self: Kind<M, S, R1, W, E, A>) => Kind<M, S, R1 & R2, W, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <F extends TypeLambda>(
  F: FromReader<F>
) => <A extends readonly unknown[], R, B>(
  f: (...a: A) => Reader<R, B>
) => <S>(...a: A) => Kind<F, S, R, never, never, B>
```

Added in v3.0.0

# constructors

## ask

**Signature**

```ts
export declare function ask<F extends TypeLambda>(F: FromReader<F>): <S, R>() => Kind<F, S, R, never, never, R>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare function asks<F extends TypeLambda>(
  F: FromReader<F>
): <R, A, S>(f: (r: R) => A) => Kind<F, S, R, never, never, A>
```

Added in v3.0.0

# type classes

## FromReader (interface)

**Signature**

```ts
export interface FromReader<F extends TypeLambda> extends Typeclass<F> {
  readonly fromReader: <R, A, S>(fa: Reader<R, A>) => Kind<F, S, R, never, never, A>
}
```

Added in v3.0.0
