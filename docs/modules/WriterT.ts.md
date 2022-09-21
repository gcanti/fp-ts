---
title: WriterT.ts
nav_order: 112
parent: Modules
---

## WriterT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [pass](#pass)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromF](#fromf)
  - [fromIO](#fromio)
  - [fromTask](#fromtask)
  - [tell](#tell)
- [type class operations](#type-class-operations)
  - [ap](#ap)
  - [bimap](#bimap)
  - [flatMap](#flatmap)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [of](#of)
- [utils](#utils)
  - [fst](#fst)
  - [snd](#snd)

---

# combinators

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare function censor<F extends HKT>(
  F: Functor<F>
): <W>(
  f: (w: W) => W
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, A>>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare function listen<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, readonly [A, W]>>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare function listens<F extends HKT>(
  F: Functor<F>
): <W, B>(
  f: (w: W) => B
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, readonly [A, B]>>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare function pass<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(
  fwa: Kind<F, S, R, FW, E, Writer<W, readonly [A, (w: W) => W]>>
) => Kind<F, S, R, FW, E, Writer<W, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<A, W>>
```

Added in v3.0.0

# constructors

## fromF

**Signature**

```ts
export declare function fromF<F extends HKT>(
  F: Functor<F>
): <W>(w: W) => <S, R, FW, E, A>(fa: Kind<F, S, R, FW, E, A>) => Kind<F, S, R, FW, E, Writer<W, A>>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <F extends HKT>(
  F: Functor<F>,
  FT: FromIO<F>
) => <W>(w: W) => <A, S, R = unknown, FW = never, E = never>(fa: IO<A>) => Kind<F, S, R, FW, E, writer.Writer<W, A>>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <F extends HKT>(
  F: Functor<F>,
  FT: FromTask<F>
) => <W>(w: W) => <A, S, R = unknown, FW = never, E = never>(fa: Task<A>) => Kind<F, S, R, FW, E, writer.Writer<W, A>>
```

Added in v3.0.0

## tell

**Signature**

```ts
export declare const tell: <F extends HKT>(
  F: Pointed<F>
) => <W, S, R = unknown, FW = never, E = never>(w: W) => Kind<F, S, R, FW, E, writer.Writer<W, void>>
```

Added in v3.0.0

# type class operations

## ap

**Signature**

```ts
export declare const ap: <F extends HKT, W>(
  F: Apply<F>,
  S: Semigroup<W>
) => <S, R2, FW2, E2, A>(
  fa: Kind<F, S, R2, FW2, E2, writer.Writer<W, A>>
) => <R1, FW1, E1, B>(
  fab: Kind<F, S, R1, FW1, E1, writer.Writer<W, (a: A) => B>>
) => Kind<F, S, R1 & R2, FW2 | FW1, E2 | E1, writer.Writer<W, B>>
```

Added in v3.0.0

## bimap

**Signature**

```ts
export declare function bimap<F extends HKT>(
  F: Functor<F>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <S, R, FW, E>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<G, B>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends HKT, W>(
  M: Flat<M>,
  S: Semigroup<W>
) => <A, S, R1, FW1, E1, B>(
  f: (a: A) => Kind<M, S, R1, FW1, E1, writer.Writer<W, B>>
) => <R2, FW2, E2>(
  ma: Kind<M, S, R2, FW2, E2, writer.Writer<W, A>>
) => Kind<M, S, R1 & R2, FW1 | FW2, E1 | E2, writer.Writer<W, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, FW, E, W>(fa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<W, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends HKT>(
  F: Functor<F>
): <W, G>(
  mapSnd: (w: W) => G
) => <S, R, FW, E, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, Writer<G, A>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends HKT, W>(
  F: Pointed<F>,
  M: Monoid<W>
): <A, S, R = unknown, FW = never, E = never>(a: A) => Kind<F, S, R, FW, E, Writer<W, A>>
```

Added in v3.0.0

# utils

## fst

**Signature**

```ts
export declare function fst<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, A>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare function snd<F extends HKT>(
  F: Functor<F>
): <S, R, FW, E, W, A>(fwa: Kind<F, S, R, FW, E, Writer<W, A>>) => Kind<F, S, R, FW, E, W>
```

Added in v3.0.0
