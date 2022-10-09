---
title: TheseT.ts
nav_order: 80
parent: Modules
---

## TheseT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [TheseT (interface)](#theset-interface)
  - [ap](#ap)
  - [both](#both)
  - [fail](#fail)
  - [failKind](#failkind)
  - [flatMap](#flatmap)
  - [fromKind](#fromkind)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [match](#match)
  - [matchKind](#matchkind)
  - [succeed](#succeed)
  - [swap](#swap)
  - [toTuple2](#totuple2)

---

# utils

## TheseT (interface)

**Signature**

```ts
export interface TheseT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], These<E, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda, E>(
  Apply: Apply<F>,
  Semigroup: Semigroup<E>
) => <S, R2, O2, FE2, A>(
  fa: Kind<F, S, R2, O2, FE2, These<E, A>>
) => <R1, O1, FE1, B>(
  self: Kind<F, S, R1, O1, FE1, These<E, (a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, These<E, B>>
```

Added in v3.0.0

## both

**Signature**

```ts
export declare const both: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <E, A, S>(e: E, a: A) => Kind<F, S, unknown, never, never, These<E, A>>
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <E, S>(e: E) => Kind<F, S, unknown, never, never, These<E, never>>
```

Added in v3.0.0

## failKind

**Signature**

```ts
export declare const failKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, E>(fl: Kind<F, S, R, O, FE, E>) => Kind<F, S, R, O, FE, These<E, never>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda, E>(
  Monad: Monad<F>,
  Semigroup: Semigroup<E>
) => <A, S, R2, O2, FE2, B>(
  f: (a: A) => Kind<F, S, R2, O2, FE2, These<E, B>>
) => <R1, O1, FE1>(self: Kind<F, S, R1, O1, FE1, These<E, A>>) => Kind<F, S, R1 & R2, O2 | O1, FE2 | FE1, These<E, B>>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, A>(fa: Kind<F, S, R, O, FE, A>) => Kind<F, S, R, O, FE, These<never, A>>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  Functor: Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <S, R, O, FE, E>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<E, B>>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<G, B>>
```

Added in v3.0.0

## mapError

**Signature**

```ts
export declare const mapError: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, G>(
  f: (e: E) => G
) => <S, R, O, FE, A>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, B | C | D>
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <E, S, R2, O2, FE2, B, A, R3, O3, FE3, R4, O4, FE4, C = B, D = B>(
  onError: (e: E) => Kind<F, S, R2, O2, FE2, B>,
  onSuccess: (a: A) => Kind<F, S, R3, O3, FE3, C>,
  onBoth: (e: E, a: A) => Kind<F, S, R4, O4, FE4, D>
) => <R1, O1, FE1>(
  self: Kind<F, S, R1, O1, FE1, These<E, A>>
) => Kind<F, S, R1 & R2 & R3 & R4, O2 | O3 | O4 | O1, FE2 | FE3 | FE4 | FE1, B | C | D>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, These<never, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, FE, E, A>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, These<A, E>>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <F extends TypeLambda>(
  Functor: Functor<F>
) => <E, A>(
  e: E,
  a: A
) => <S, R, O, FE>(self: Kind<F, S, R, O, FE, These<E, A>>) => Kind<F, S, R, O, FE, readonly [E, A]>
```

Added in v3.0.0
