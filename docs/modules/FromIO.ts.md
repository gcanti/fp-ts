---
title: FromIO.ts
nav_order: 34
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [fromIOK](#fromiok)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [sequencing, lifting](#sequencing-lifting)
  - [flatMapIOK](#flatmapiok)
- [type classes](#type-classes)
  - [FromIO (interface)](#fromio-interface)

---

# combinators

## fromIOK

**Signature**

```ts
export declare const fromIOK: <F extends TypeLambda>(
  F: FromIO<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => IO<B>) => <S>(...a: A) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <M extends TypeLambda>(
  F: FromIO<M>
) => <S>(...x: ReadonlyArray<unknown>) => Kind<M, S, unknown, never, never, void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: <M extends TypeLambda>(
  F: FromIO<M>
) => <S>(...x: ReadonlyArray<unknown>) => Kind<M, S, unknown, never, never, void>
```

Added in v3.0.0

# sequencing, lifting

## flatMapIOK

**Signature**

```ts
export declare const flatMapIOK: <M extends TypeLambda>(
  F: FromIO<M>,
  M: Flattenable<M>
) => <A, B>(f: (a: A) => IO<B>) => <S, R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>
```

Added in v3.0.0

# type classes

## FromIO (interface)

**Signature**

```ts
export interface FromIO<F extends TypeLambda> extends TypeClass<F> {
  readonly fromIO: <A, S>(fa: IO<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
