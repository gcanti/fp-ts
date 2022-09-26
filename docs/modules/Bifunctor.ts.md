---
title: Bifunctor.ts
nav_order: 3
parent: Modules
---

## Bifunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [defaults](#defaults)
  - [getDefaultMap](#getdefaultmap)
  - [getDefaultMapLeft](#getdefaultmapleft)
- [type classes](#type-classes)
  - [Bifunctor (interface)](#bifunctor-interface)

---

# defaults

## getDefaultMap

Returns a default `map` implementation from `mapBoth`.

**Signature**

```ts
export declare const getDefaultMap: <F extends TypeLambda>(
  mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
) => <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

## getDefaultMapLeft

Returns a default `mapLeft` implementation from `mapBoth`.

**Signature**

```ts
export declare const getDefaultMapLeft: <F extends TypeLambda>(
  mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
) => <E, G>(f: (e: E) => G) => <S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>
```

Added in v3.0.0

# type classes

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
