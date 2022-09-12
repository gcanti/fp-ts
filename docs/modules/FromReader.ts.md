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
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainReaderK](#chainreaderk)
  - [fromReaderK](#fromreaderk)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [type classes](#type-classes)
  - [FromReader (interface)](#fromreader-interface)

---

# combinators

## chainFirstReaderK

**Signature**

```ts
export declare function chainFirstReaderK<M extends HKT>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare function chainReaderK<M extends HKT>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare function fromReaderK<F extends HKT>(
  F: FromReader<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => <S, E>(...a: A) => Kind<F, S, R, E, B>
```

Added in v3.0.0

# constructors

## ask

**Signature**

```ts
export declare function ask<F extends HKT>(F: FromReader<F>): <S, R, E>() => Kind<F, S, R, E, R>
```

Added in v3.0.0

## asks

**Signature**

```ts
export declare function asks<F extends HKT>(F: FromReader<F>): <R, A, S, E>(f: (r: R) => A) => Kind<F, S, R, E, A>
```

Added in v3.0.0

# type classes

## FromReader (interface)

**Signature**

```ts
export interface FromReader<F extends HKT> extends Typeclass<F> {
  readonly fromReader: <R, A, S, E>(fa: Reader<R, A>) => Kind<F, S, R, E, A>
}
```

Added in v3.0.0
