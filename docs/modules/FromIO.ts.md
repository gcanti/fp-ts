---
title: FromIO.ts
nav_order: 36
parent: Modules
---

## FromIO overview

Lift a computation from the `Sync` effect.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [lifting](#lifting)
  - [liftSync](#liftsync)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [FromIO (interface)](#fromio-interface)
- [sequencing](#sequencing)
  - [flatMapSync](#flatmapsync)

---

# lifting

## liftSync

**Signature**

```ts
export declare const liftSync: <F extends TypeLambda>(
  F: FromIO<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => Sync<B>) => <S>(...a: A) => Kind<F, S, unknown, never, never, B>
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

# model

## FromIO (interface)

**Signature**

```ts
export interface FromIO<F extends TypeLambda> extends TypeClass<F> {
  readonly fromIO: <A, S>(fa: Sync<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <M extends TypeLambda>(
  F: FromIO<M>,
  M: Flattenable<M>
) => <A, B>(f: (a: A) => Sync<B>) => <S, R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>
```

Added in v3.0.0
