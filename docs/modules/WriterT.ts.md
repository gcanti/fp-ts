---
title: WriterT.ts
nav_order: 81
parent: Modules
---

## WriterT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [WriterT (interface)](#writert-interface)
  - [ap](#ap)
  - [censor](#censor)
  - [flatMap](#flatmap)
  - [fromAsync](#fromasync)
  - [fromKind](#fromkind)
  - [fromSync](#fromsync)
  - [fst](#fst)
  - [listen](#listen)
  - [listens](#listens)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapLeft](#mapleft)
  - [of](#of)
  - [pass](#pass)
  - [reverse](#reverse)
  - [snd](#snd)
  - [tell](#tell)

---

# utils

## WriterT (interface)

**Signature**

```ts
export interface WriterT<F extends TypeLambda, W> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Writer<W, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda, W>(
  Apply: Apply<F>,
  Semigroup: Semigroup<W>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, Writer<W, A>>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, Writer<W, (a: A) => B>>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, Writer<W, B>>
```

Added in v3.0.0

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare const censor: <F extends TypeLambda>(
  Functor: Functor<F>
) => <W>(
  f: (w: W) => W
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda, W>(
  Flattenable: Flattenable<F>,
  Semigroup: Semigroup<W>
) => <A, S, R1, FO1, E1, B>(
  f: (a: A) => Kind<F, S, R1, FO1, E1, Writer<W, B>>
) => <R2, FO2, E2>(self: Kind<F, S, R2, FO2, E2, Writer<W, A>>) => Kind<F, S, R1 & R2, FO1 | FO2, E1 | E2, Writer<W, B>>
```

Added in v3.0.0

## fromAsync

**Signature**

```ts
export declare const fromAsync: <F extends TypeLambda>(
  Functor: Functor<F>,
  FromAsync: FromAsync<F>
) => <W>(w: W) => <A, S>(fa: Async<A>) => Kind<F, S, unknown, never, never, Writer<W, A>>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends TypeLambda>(
  Functor: Functor<F>
) => <W>(w: W) => <S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <F extends TypeLambda>(
  Functor: Functor<F>,
  FromSync: FromSync<F>
) => <W>(w: W) => <A, S>(fa: Sync<A>) => Kind<F, S, unknown, never, never, Writer<W, A>>
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, W>(self: Kind<F, S, R, O, E, Writer<W, unknown>>) => Kind<F, S, R, O, E, W>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare const listen: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, readonly [W, A]>>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare const listens: <F extends TypeLambda>(
  Functor: Functor<F>
) => <W, B>(
  f: (w: W) => B
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, readonly [A, B]>>
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
) => <S, R, O, E, W>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<W, B>>
```

Added in v3.0.0

## mapBoth

**Signature**

```ts
export declare const mapBoth: <F extends TypeLambda>(
  Functor: Functor<F>
) => <W, X, A, B>(
  f: (w: W) => X,
  g: (a: A) => B
) => <S, R, O, E>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<X, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends TypeLambda>(
  Functor: Functor<F>
) => <W, X>(
  f: (w: W) => X
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<X, A>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <F extends TypeLambda, W>(
  FromIdentity: FromIdentity<F>,
  Monoid: Monoid<W>
) => <A, S>(a: A) => Kind<F, S, unknown, never, never, Writer<W, A>>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare const pass: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, W, A>(
  self: Kind<F, S, R, O, E, Writer<W, readonly [A, (w: W) => W]>>
) => Kind<F, S, R, O, E, Writer<W, A>>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, W, A>(self: Kind<F, S, R, O, E, Writer<W, A>>) => Kind<F, S, R, O, E, Writer<A, W>>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <F extends TypeLambda>(
  Functor: Functor<F>
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, Writer<unknown, A>>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0

## tell

**Signature**

```ts
export declare const tell: <F extends TypeLambda>(
  FromIdentity: FromIdentity<F>
) => <W, S>(w: W) => Kind<F, S, unknown, never, never, Writer<W, void>>
```

Added in v3.0.0
