---
title: WriterT.ts
nav_order: 110
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
- [mapping](#mapping)
  - [mapBoth](#mapboth)
- [type class operations](#type-class-operations)
  - [ap](#ap)
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
export declare function censor<F extends TypeLambda>(
  F: Functor<F>
): <W>(f: (w: W) => W) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare function listen<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, readonly [W, A]>>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare function listens<F extends TypeLambda>(
  F: Functor<F>
): <W, B>(
  f: (w: W) => B
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, readonly [A, B]>>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare function pass<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, W, A>(
  self: Kind<F, S, R, O, E, Writer<W, readonly [A, (w: W) => W]>>
) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<A, W>>
```

Added in v3.0.0

# constructors

## fromF

**Signature**

```ts
export declare function fromF<F extends TypeLambda>(
  F: Functor<F>
): <W>(w: W) => <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <F extends TypeLambda>(
  F: Functor<F>,
  FT: FromIO<F>
) => <W>(w: W) => <A, S>(fa: IO<A>) => Kind<F, S, unknown, never, never, writer.Writer<W, A>>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <F extends TypeLambda>(
  F: Functor<F>,
  FT: FromTask<F>
) => <W>(w: W) => <A, S>(fa: Task<A>) => Kind<F, S, unknown, never, never, writer.Writer<W, A>>
```

Added in v3.0.0

## tell

**Signature**

```ts
export declare const tell: <F extends TypeLambda>(
  F: Pointed<F>
) => <W, S>(w: W) => Kind<F, S, unknown, never, never, writer.Writer<W, void>>
```

Added in v3.0.0

# mapping

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  F: Functor<F>
) => <W, G, A, B>(
  f: (w: W) => G,
  g: (a: A) => B
) => <S, R, O, E>(self: Kind<F, S, R, O, E, writer.Writer<W, A>>) => Kind<F, S, R, O, E, writer.Writer<G, B>>
```

Added in v3.0.0

# type class operations

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda, W>(
  Apply: Apply<F>,
  Semigroup: Semigroup<W>
) => <S, R2, FO2, E2, A>(
  fa: Kind<F, S, R2, FO2, E2, writer.Writer<W, A>>
) => <R1, FO1, E1, B>(
  self: Kind<F, S, R1, FO1, E1, writer.Writer<W, (a: A) => B>>
) => Kind<F, S, R1 & R2, FO2 | FO1, E2 | E1, writer.Writer<W, B>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <M extends TypeLambda, W>(
  M: Flattenable<M>,
  S: Semigroup<W>
) => <A, S, R1, FO1, E1, B>(
  f: (a: A) => Kind<M, S, R1, FO1, E1, writer.Writer<W, B>>
) => <R2, FO2, E2>(
  self: Kind<M, S, R2, FO2, E2, writer.Writer<W, A>>
) => Kind<M, S, R1 & R2, FO1 | FO2, E1 | E2, writer.Writer<W, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(
  f: (a: A) => B
) => <S, R, O, E, W>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends TypeLambda>(
  F: Functor<F>
) => <W, G>(
  f: (w: W) => G
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, writer.Writer<W, A>>) => Kind<F, S, R, O, E, writer.Writer<G, A>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends TypeLambda, W>(
  F: Pointed<F>,
  M: Monoid<W>
): <A, S>(a: A) => Kind<F, S, unknown, never, never, Writer<W, A>>
```

Added in v3.0.0

# utils

## fst

**Signature**

```ts
export declare function fst<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, W>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare function snd<F extends TypeLambda>(
  F: Functor<F>
): <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0
