---
title: Functor.ts
nav_order: 42
parent: Modules
---

## Functor overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
constructor `F` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `map(identity) <-> identity`
2. Composition: `map(flow(ab, bc)) <-> flow(map(ab), map(bc))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [flap](#flap)
  - [map](#map)
- [type classes](#type-classes)
  - [Functor (interface)](#functor-interface)
  - [Functor1 (interface)](#functor1-interface)
  - [Functor2 (interface)](#functor2-interface)
  - [Functor2C (interface)](#functor2c-interface)
  - [Functor3 (interface)](#functor3-interface)
  - [Functor3C (interface)](#functor3c-interface)
  - [Functor4 (interface)](#functor4-interface)
- [utils](#utils)
  - [bindTo](#bindto)
  - [tupled](#tupled)

---

# combinators

## flap

**Signature**

```ts
export declare function flap<F extends URIS4>(
  F: Functor4<F>
): <A>(a: A) => <S, R, E, B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
export declare function flap<F extends URIS3>(
  F: Functor3<F>
): <A>(a: A) => <R, E, B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
export declare function flap<F extends URIS2>(
  F: Functor2<F>
): <A>(a: A) => <E, B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
export declare function flap<F extends URIS>(F: Functor1<F>): <A>(a: A) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
export declare function flap<F>(F: Functor<F>): <A>(a: A) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
```

Added in v3.0.0

## map

`map` composition.

**Signature**

```ts
export declare function map<F extends URIS4, G extends URIS4>(
  F: Functor4<F>,
  G: Functor4<G>
): <A, B>(
  f: (a: A) => B
) => <SF, RF, EF, SG, RG, EG>(
  fa: Kind4<F, SF, RF, EF, Kind4<G, SG, RG, EG, A>>
) => Kind4<F, SF, RF, EF, Kind4<G, SG, RG, EG, B>>
export declare function map<F extends URIS4, G extends URIS3>(
  F: Functor4<F>,
  G: Functor3<G>
): <A, B>(
  f: (a: A) => B
) => <SF, RF, EF, RG, EG>(fa: Kind4<F, SF, RF, EF, Kind3<G, RG, EG, A>>) => Kind4<F, SF, RF, EF, Kind3<G, RF, EF, B>>
export declare function map<F extends URIS4, G extends URIS2>(
  F: Functor4<F>,
  G: Functor2<G>
): <A, B>(
  f: (a: A) => B
) => <SF, RF, EF, EG>(fa: Kind4<F, SF, RF, EF, Kind2<G, EG, A>>) => Kind4<F, SF, RF, EF, Kind2<G, EG, B>>
export declare function map<F extends URIS4, G extends URIS>(
  F: Functor4<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, Kind<G, A>>) => Kind4<F, S, R, E, Kind<G, B>>
export declare function map<F extends URIS3, G extends URIS4>(
  F: Functor3<F>,
  G: Functor4<G>
): <A, B>(
  f: (a: A) => B
) => <RF, EF, SG, RG, EG>(fa: Kind3<F, RF, EF, Kind4<G, SG, RG, EG, A>>) => Kind3<F, RF, EF, Kind4<G, SG, RG, EG, B>>
export declare function map<F extends URIS3, G extends URIS3>(
  F: Functor3<F>,
  G: Functor3<G>
): <A, B>(
  f: (a: A) => B
) => <RF, EF, RG, EG>(fa: Kind3<F, RF, EF, Kind3<G, RG, EG, A>>) => Kind3<F, RF, EF, Kind3<G, RG, EG, B>>
export declare function map<F extends URIS3, G extends URIS2>(
  F: Functor3<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <R, EF, EG>(fa: Kind3<F, R, EF, Kind2<G, EG, A>>) => Kind3<F, R, EF, Kind2<G, EG, B>>
export declare function map<F extends URIS3, G extends URIS>(
  F: Functor3<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, Kind<G, A>>) => Kind3<F, R, E, Kind<G, B>>
export declare function map<F extends URIS2, G extends URIS4>(
  F: Functor2<F>,
  G: Functor4<G>
): <A, B>(
  f: (a: A) => B
) => <EF, SG, RG, EG>(fa: Kind2<F, EF, Kind4<G, SG, RG, EG, A>>) => Kind2<F, EF, Kind4<G, SG, RG, EG, B>>
export declare function map<F extends URIS2, G extends URIS3>(
  F: Functor2<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <EF, RG, EG>(fa: Kind2<F, EF, Kind3<G, RG, EG, A>>) => Kind2<F, EF, Kind3<G, RG, EG, B>>
export declare function map<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <EF, EG>(fa: Kind2<F, EF, Kind2<G, EG, A>>) => Kind2<F, EF, Kind2<G, EG, B>>
export declare function map<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
export declare function map<F extends URIS, G extends URIS4>(
  F: Functor1<F>,
  G: Functor4<G>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, Kind4<G, S, R, E, A>>) => Kind<F, Kind4<G, S, R, E, B>>
export declare function map<F extends URIS, G extends URIS3>(
  F: Functor1<F>,
  G: Functor3<G>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind<F, Kind3<G, R, E, A>>) => Kind<F, Kind3<G, R, E, B>>
export declare function map<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
export declare function map<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
export declare function map<F, G extends URIS2>(
  F: Functor<F>,
  G: Functor2<G>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
export declare function map<F, G extends URIS>(
  F: Functor<F>,
  G: Functor1<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, Kind<G, A>>) => HKT<F, Kind<G, B>>
export declare function map<F, G>(
  F: Functor<F>,
  G: Functor<G>
): <A, B>(f: (a: A) => B) => (fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
```

Added in v3.0.0

# type classes

## Functor (interface)

**Signature**

```ts
export interface Functor<F> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v3.0.0

## Functor1 (interface)

**Signature**

```ts
export interface Functor1<F extends URIS> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v3.0.0

## Functor2 (interface)

**Signature**

```ts
export interface Functor2<F extends URIS2> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Functor2C (interface)

**Signature**

```ts
export interface Functor2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Functor3 (interface)

**Signature**

```ts
export interface Functor3<F extends URIS3> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Functor3C (interface)

**Signature**

```ts
export interface Functor3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly map: <A, B>(f: (a: A) => B) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Functor4 (interface)

**Signature**

```ts
export interface Functor4<F extends URIS4> {
  readonly URI?: F
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0

# utils

## bindTo

**Signature**

```ts
export declare function bindTo<F extends URIS4>(
  F: Functor4<F>
): <N extends string>(name: N) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS3>(
  F: Functor3<F>
): <N extends string>(name: N) => <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS3, E>(
  F: Functor3C<F, E>
): <N extends string>(name: N) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS2>(
  F: Functor2<F>
): <N extends string>(name: N) => <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS2, E>(
  F: Functor2C<F, E>
): <N extends string>(name: N) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, { readonly [K in N]: A }>
export declare function bindTo<F extends URIS>(
  F: Functor1<F>
): <N extends string>(name: N) => <A>(fa: Kind<F, A>) => Kind<F, { [K in N]: A }>
export declare function bindTo<F>(
  F: Functor<F>
): <N extends string>(name: N) => <A>(fa: HKT<F, A>) => HKT<F, { readonly [K in N]: A }>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare function tupled<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, readonly [A]>
export declare function tupled<F extends URIS3>(
  F: Functor3<F>
): <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [A]>
export declare function tupled<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [A]>
export declare function tupled<F extends URIS2>(F: Functor2<F>): <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, readonly [A]>
export declare function tupled<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A>(fa: Kind2<F, E, A>) => Kind2<F, E, readonly [A]>
export declare function tupled<F extends URIS>(F: Functor1<F>): <A>(fa: Kind<F, A>) => Kind<F, readonly [A]>
export declare function tupled<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, readonly [A]>
```

Added in v3.0.0
