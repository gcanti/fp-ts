---
title: Bifunctor.ts
nav_order: 5
parent: Modules
---

## Bifunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [defaults](#defaults)
  - [mapDefault](#mapdefault)
  - [mapLeftDefault](#mapleftdefault)
- [type classes](#type-classes)
  - [Bifunctor (interface)](#bifunctor-interface)

---

# defaults

## mapDefault

Return a default `map` implementation from `bimap`.

**Signature**

```ts
export declare const mapDefault: <F extends HKT>(
  bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S, R>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, B>
) => <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
```

Added in v3.0.0

## mapLeftDefault

Return a default `mapLeft` implementation from `bimap`.

**Signature**

```ts
export declare const mapLeftDefault: <F extends HKT>(
  bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S, R>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, B>
) => <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, A>
```

Added in v3.0.0

# type classes

## Bifunctor (interface)

**Signature**

```ts
export interface Bifunctor<F extends HKT> extends Typeclass<F> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, A>
}
```

Added in v3.0.0
