---
title: TheseT.ts
nav_order: 94
parent: Modules
---

## TheseT overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [TheseT (interface)](#theset-interface)
  - [TheseT1 (type alias)](#theset1-type-alias)
  - [TheseT2 (type alias)](#theset2-type-alias)
- [utils](#utils)
  - [TheseM (interface)](#thesem-interface)
  - [TheseM1 (interface)](#thesem1-interface)
  - [TheseM2 (interface)](#thesem2-interface)
  - [ap\_](#ap_)
  - [bimap\_](#bimap_)
  - [both\_](#both_)
  - [chain\_](#chain_)
  - [fold\_](#fold_)
  - [getTheseM](#getthesem)
  - [leftF\_](#leftf_)
  - [left\_](#left_)
  - [mapLeft\_](#mapleft_)
  - [map\_](#map_)
  - [rightF\_](#rightf_)
  - [right\_](#right_)
  - [swap\_](#swap_)
  - [toReadonlyTuple2\_](#toreadonlytuple2_)

---

# model

## TheseT (interface)

**Signature**

```ts
export interface TheseT<M, E, A> extends HKT<M, These<E, A>> {}
```

Added in v2.4.0

## TheseT1 (type alias)

**Signature**

```ts
export type TheseT1<M extends URIS, E, A> = Kind<M, These<E, A>>
```

Added in v2.4.0

## TheseT2 (type alias)

**Signature**

```ts
export type TheseT2<M extends URIS2, R, E, A> = Kind2<M, R, These<E, A>>
```

Added in v2.4.0

# utils

## TheseM (interface)

**Signature**

```ts
export interface TheseM<M> {
  readonly map: <E, A, B>(fa: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT<M, E, A>, f: (e: E) => N) => TheseT<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT<M, E, A>,
    onLeft: (e: E) => HKT<M, R>,
    onRight: (a: A) => HKT<M, R>,
    onBoth: (e: E, a: A) => HKT<M, R>
  ) => HKT<M, R>
  readonly swap: <E, A>(fa: TheseT<M, E, A>) => TheseT<M, A, E>
  readonly rightM: <E, A>(ma: HKT<M, A>) => TheseT<M, E, A>
  readonly leftM: <E, A>(me: HKT<M, E>) => TheseT<M, E, A>
  readonly left: <E, A>(e: E) => TheseT<M, E, A>
  readonly right: <E, A>(a: A) => TheseT<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT<M, E, A>, e: E, a: A) => HKT<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => B) => TheseT<M, E, B>
    readonly of: <A>(a: A) => TheseT<M, E, A>
    readonly ap: <A, B>(mab: TheseT<M, E, (a: A) => B>, ma: TheseT<M, E, A>) => TheseT<M, E, B>
    readonly chain: <A, B>(ma: TheseT<M, E, A>, f: (a: A) => TheseT<M, E, B>) => TheseT<M, E, B>
  }
}
```

Added in v2.4.0

## TheseM1 (interface)

**Signature**

```ts
export interface TheseM1<M extends URIS> {
  readonly map: <E, A, B>(fa: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
  readonly bimap: <E, A, N, B>(fa: TheseT1<M, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT1<M, N, B>
  readonly mapLeft: <E, A, N>(fa: TheseT1<M, E, A>, f: (e: E) => N) => TheseT1<M, N, A>
  readonly fold: <E, A, R>(
    fa: TheseT1<M, E, A>,
    onLeft: (e: E) => Kind<M, R>,
    onRight: (a: A) => Kind<M, R>,
    onBoth: (e: E, a: A) => Kind<M, R>
  ) => Kind<M, R>
  readonly swap: <E, A>(fa: TheseT1<M, E, A>) => TheseT1<M, A, E>
  readonly rightM: <E, A>(ma: Kind<M, A>) => TheseT1<M, E, A>
  readonly leftM: <E, A>(me: Kind<M, E>) => TheseT1<M, E, A>
  readonly left: <E, A>(e: E) => TheseT1<M, E, A>
  readonly right: <E, A>(a: A) => TheseT1<M, E, A>
  readonly both: <E, A>(e: E, a: A) => TheseT1<M, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <E, A>(fa: TheseT1<M, E, A>, e: E, a: A) => Kind<M, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => B) => TheseT1<M, E, B>
    readonly of: <A>(a: A) => TheseT1<M, E, A>
    readonly ap: <A, B>(mab: TheseT1<M, E, (a: A) => B>, ma: TheseT1<M, E, A>) => TheseT1<M, E, B>
    readonly chain: <A, B>(ma: TheseT1<M, E, A>, f: (a: A) => TheseT1<M, E, B>) => TheseT1<M, E, B>
  }
}
```

Added in v2.4.0

## TheseM2 (interface)

**Signature**

```ts
export interface TheseM2<M extends URIS2> {
  readonly map: <R, E, A, B>(fa: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
  readonly bimap: <R, E, A, N, B>(fa: TheseT2<M, R, E, A>, f: (e: E) => N, g: (a: A) => B) => TheseT2<M, R, N, B>
  readonly mapLeft: <R, E, A, N>(fa: TheseT2<M, R, E, A>, f: (e: E) => N) => TheseT2<M, R, N, A>
  readonly fold: <R, E, A, B>(
    fa: TheseT2<M, R, E, A>,
    onLeft: (e: E) => Kind2<M, R, B>,
    onRight: (a: A) => Kind2<M, R, B>,
    onBoth: (e: E, a: A) => Kind2<M, R, B>
  ) => Kind2<M, R, B>
  readonly swap: <R, E, A>(fa: TheseT2<M, R, E, A>) => TheseT2<M, R, A, E>
  readonly rightM: <R, E, A>(ma: Kind2<M, R, A>) => TheseT2<M, R, E, A>
  readonly leftM: <R, E, A>(me: Kind2<M, R, E>) => TheseT2<M, R, E, A>
  readonly left: <R, E, A>(e: E) => TheseT2<M, R, E, A>
  readonly right: <R, E, A>(a: A) => TheseT2<M, R, E, A>
  readonly both: <R, E, A>(e: E, a: A) => TheseT2<M, R, E, A>
  // tslint:disable-next-line: readonly-array
  readonly toTuple: <R, E, A>(fa: TheseT2<M, R, E, A>, e: E, a: A) => Kind2<M, R, [E, A]>
  readonly getMonad: <E>(
    S: Semigroup<E>
  ) => {
    readonly _E: E
    readonly map: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => B) => TheseT2<M, R, E, B>
    readonly of: <R, A>(a: A) => TheseT2<M, R, E, A>
    readonly ap: <R, A, B>(mab: TheseT2<M, R, E, (a: A) => B>, ma: TheseT2<M, R, E, A>) => TheseT2<M, R, E, B>
    readonly chain: <R, A, B>(ma: TheseT2<M, R, E, A>, f: (a: A) => TheseT2<M, R, E, B>) => TheseT2<M, R, E, B>
  }
}
```

Added in v2.4.0

## ap\_

**Signature**

```ts
export declare function ap_<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <FE, A>(fa: Kind2<F, FE, These<E, A>>) => <B>(fab: Kind2<F, FE, These<E, (a: A) => B>>) => Kind2<F, FE, These<E, B>>
export declare function ap_<F extends URIS, E>(
  F: Apply1<F>,
  S: Semigroup<E>
): <A>(fa: Kind<F, These<E, A>>) => <B>(fab: Kind<F, These<E, (a: A) => B>>) => Kind<F, These<E, B>>
export declare function ap_<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>>
```

Added in v2.10.0

## bimap\_

**Signature**

```ts
export declare function bimap_<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, B>>
export declare function bimap_<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, These<E, A>>) => Kind<F, These<G, B>>
export declare function bimap_<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>>
```

Added in v2.10.0

## both\_

**Signature**

```ts
export declare function both_<M extends URIS2>(M: Pointed2<M>): <E, FE, A>(e: E, a: A) => Kind2<M, FE, These<E, A>>
export declare function both_<M extends URIS>(M: Pointed1<M>): <E, A>(e: E, a: A) => Kind<M, These<E, A>>
export declare function both_<M>(M: Pointed<M>): <E, A = never>(e: E, a: A) => HKT<M, These<E, A>>
```

Added in v2.10.0

## chain\_

**Signature**

```ts
export declare function chain_<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, ME, B>(f: (a: A) => Kind2<M, ME, These<E, B>>) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, These<E, B>>
export declare function chain_<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind<M, These<E, B>>) => (ma: Kind<M, These<E, A>>) => Kind<M, These<E, B>>
export declare function chain_<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>>
```

Added in v2.10.0

## fold\_

**Signature**

```ts
export declare function fold_<M extends URIS2>(
  M: Monad2<M>
): <E, ME, R, A>(
  onLeft: (e: E) => Kind2<M, ME, R>,
  onRight: (a: A) => Kind2<M, ME, R>,
  onBoth: (e: E, a: A) => Kind2<M, ME, R>
) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, R>
export declare function fold_<M extends URIS>(
  M: Monad1<M>
): <E, R, A>(
  onLeft: (e: E) => Kind<M, R>,
  onRight: (a: A) => Kind<M, R>,
  onBoth: (e: E, a: A) => Kind<M, R>
) => (ma: Kind<M, These<E, A>>) => Kind<M, R>
export declare function fold_<M>(
  M: Monad<M>
): <E, R, A>(
  onLeft: (e: E) => HKT<M, R>,
  onRight: (a: A) => HKT<M, R>,
  onBoth: (e: E, a: A) => HKT<M, R>
) => (ma: HKT<M, These<E, A>>) => HKT<M, R>
```

Added in v2.10.0

## getTheseM

**Signature**

```ts
export declare function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
export declare function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
export declare function getTheseM<M>(M: Monad<M>): TheseM<M>
```

Added in v2.4.0

## leftF\_

**Signature**

```ts
export declare function leftF_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, These<E, A>>
export declare function leftF_<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export declare function leftF_<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
```

Added in v2.10.0

## left\_

**Signature**

```ts
export declare function left_<M extends URIS2>(M: Pointed2<M>): <E, FE, A = never>(e: E) => Kind2<M, FE, These<E, A>>
export declare function left_<M extends URIS>(M: Pointed1<M>): <E, A = never>(e: E) => Kind<M, These<E, A>>
export declare function left_<M>(M: Pointed<M>): <E, A = never>(e: E) => HKT<M, These<E, A>>
```

Added in v2.10.0

## mapLeft\_

**Signature**

```ts
export declare function mapLeft_<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, A>>
export declare function mapLeft_<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, These<E, A>>) => Kind<F, These<G, A>>
export declare function mapLeft_<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>>
```

Added in v2.10.0

## map\_

**Signature**

```ts
export declare function map_<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<E, B>>
export declare function map_<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, These<E, A>>) => Kind<F, These<E, B>>
export declare function map_<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>>
```

Added in v2.10.0

## rightF\_

**Signature**

```ts
export declare function rightF_<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, These<E, A>>
export declare function rightF_<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export declare function rightF_<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
```

Added in v2.10.0

## right\_

**Signature**

```ts
export declare function right_<M extends URIS2>(M: Pointed2<M>): <A, FE, E = never>(a: A) => Kind2<M, FE, These<E, A>>
export declare function right_<M extends URIS>(M: Pointed1<M>): <A, E = never>(a: A) => Kind<M, These<E, A>>
export declare function right_<M>(M: Pointed<M>): <A, E = never>(a: A) => HKT<M, These<E, A>>
```

Added in v2.10.0

## swap\_

**Signature**

```ts
export declare function swap_<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<A, E>>
export declare function swap_<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export declare function swap_<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
```

Added in v2.10.0

## toReadonlyTuple2\_

**Signature**

```ts
export declare function toReadonlyTuple2_<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <FE>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, readonly [E, A]>
export declare function toReadonlyTuple2_<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export declare function toReadonlyTuple2_<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
```

Added in v2.10.0
