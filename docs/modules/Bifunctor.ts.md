---
title: Bifunctor.ts
nav_order: 3
parent: Modules
---

## Bifunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Bifunctor (interface)](#bifunctor-interface)
- [utils](#utils)
  - [map](#map)
  - [mapLeft](#mapleft)

---

# model

## Bifunctor (interface)

**Signature**

```ts
export interface Bifunctor<F extends TypeLambda> extends TypeClass<F> {
  readonly mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
}
```

Added in v3.0.0

# utils

## map

Returns a default `map` implementation.

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  Bifunctor: Bifunctor<F>
) => <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## mapLeft

Returns a default `mapLeft` implementation.

**Signature**

```ts
export declare const mapLeft: <F extends TypeLambda>(
  Bifunctor: Bifunctor<F>
) => <E, G>(f: (e: E) => G) => <S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>
```

Added in v3.0.0
