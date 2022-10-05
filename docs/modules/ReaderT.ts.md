---
title: ReaderT.ts
nav_order: 76
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ReaderT (interface)](#readert-interface)
  - [ap](#ap)
  - [flatMap](#flatmap)
  - [fromReader](#fromreader)
  - [map](#map)
  - [succeed](#succeed)

---

# utils

## ReaderT (interface)

**Signature**

```ts
export interface ReaderT<F extends TypeLambda, R> extends TypeLambda {
  readonly type: Reader<R, Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  Apply: Apply<F>
) => <R2, S, FR2, O2, E2, A>(
  fa: Reader<R2, Kind<F, S, FR2, O2, E2, A>>
) => <R1, FR1, O1, E1, B>(
  fab: Reader<R1, Kind<F, S, FR1, O1, E1, (a: A) => B>>
) => Reader<R1 & R2, Kind<F, S, FR1 & FR2, O2 | O1, E2 | E1, B>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <A, R2, S, FR2, O2, E2, B>(
  f: (a: A) => Reader<R2, Kind<F, S, FR2, O2, E2, B>>
) => <R1, FR1, O1, E1>(
  ma: Reader<R1, Kind<F, S, FR1, O1, E1, A>>
) => Reader<R1 & R2, Kind<F, S, FR1 & FR2, O2 | O1, E2 | E1, B>>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <R, A, S>(fa: Reader<R, A>) => Reader<R, Kind<F, S, unknown, never, never, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  Functor: Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <R, S, FR, O, E>(fa: Reader<R, Kind<F, S, FR, O, E, A>>) => Reader<R, Kind<F, S, FR, O, E, B>>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A, R, S, FR, O, E>(a: A) => Reader<R, Kind<F, S, FR, O, E, A>>
```

Added in v3.0.0
