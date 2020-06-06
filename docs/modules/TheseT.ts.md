---
title: TheseT.ts
nav_order: 91
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
  - [getTheseM](#getthesem)

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

## getTheseM

**Signature**

```ts
export declare function getTheseM<M extends URIS2>(M: Monad2<M>): TheseM2<M>
export declare function getTheseM<M extends URIS>(M: Monad1<M>): TheseM1<M>
export declare function getTheseM<M>(M: Monad<M>): TheseM<M>
```

Added in v2.4.0
