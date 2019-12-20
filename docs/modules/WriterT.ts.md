---
title: WriterT.ts
nav_order: 93
parent: Modules
---

# WriterT overview

Added in v2.4.0

---

<h2 class="text-delta">Table of contents</h2>

- [WriterM (interface)](#writerm-interface)
- [WriterM1 (interface)](#writerm1-interface)
- [WriterM2 (interface)](#writerm2-interface)
- [WriterT (interface)](#writert-interface)
- [WriterT1 (interface)](#writert1-interface)
- [WriterT2 (interface)](#writert2-interface)
- [getWriterM (function)](#getwriterm-function)

---

# WriterM (interface)

**Signature**

```ts
export interface WriterM<M> {
  readonly map: <W, A, B>(fa: WriterT<M, W, A>, f: (a: A) => B) => WriterT<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, A>
  readonly execWriter: <W, A>(fa: WriterT<M, W, A>) => HKT<M, W>
  readonly tell: <W>(w: W) => WriterT<M, W, void>
  readonly listen: <W, A>(fa: WriterT<M, W, A>) => WriterT<M, W, [A, W]>
  readonly pass: <W, A>(fa: WriterT<M, W, [A, (w: W) => W]>) => WriterT<M, W, A>
  readonly listens: <W, A, B>(fa: WriterT<M, W, A>, f: (w: W) => B) => WriterT<M, W, [A, B]>
  readonly censor: <W, A>(fa: WriterT<M, W, A>, f: (w: W) => W) => WriterT<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(ma: WriterT<M, W, A>, f: (a: A) => B) => WriterT<M, W, B>
    readonly of: <A>(a: A) => WriterT<M, W, A>
    readonly ap: <A, B>(mab: WriterT<M, W, (a: A) => B>, ma: WriterT<M, W, A>) => WriterT<M, W, B>
    readonly chain: <A, B>(ma: WriterT<M, W, A>, f: (a: A) => WriterT<M, W, B>) => WriterT<M, W, B>
  }
}
```

Added in v2.4.0

# WriterM1 (interface)

**Signature**

```ts
export interface WriterM1<M extends URIS> {
  readonly map: <W, A, B>(fa: WriterT1<M, W, A>, f: (a: A) => B) => WriterT1<M, W, B>
  readonly evalWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, A>
  readonly execWriter: <W, A>(fa: WriterT1<M, W, A>) => Kind<M, W>
  readonly tell: <W>(w: W) => WriterT1<M, W, void>
  readonly listen: <W, A>(fa: WriterT1<M, W, A>) => WriterT1<M, W, [A, W]>
  readonly pass: <W, A>(fa: WriterT1<M, W, [A, (w: W) => W]>) => WriterT1<M, W, A>
  readonly listens: <W, A, B>(fa: WriterT1<M, W, A>, f: (w: W) => B) => WriterT1<M, W, [A, B]>
  readonly censor: <W, A>(fa: WriterT1<M, W, A>, f: (w: W) => W) => WriterT1<M, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <A, B>(ma: WriterT1<M, W, A>, f: (a: A) => B) => WriterT1<M, W, B>
    readonly of: <A>(a: A) => WriterT1<M, W, A>
    readonly ap: <A, B>(mab: WriterT1<M, W, (a: A) => B>, ma: WriterT1<M, W, A>) => WriterT1<M, W, B>
    readonly chain: <A, B>(ma: WriterT1<M, W, A>, f: (a: A) => WriterT1<M, W, B>) => WriterT1<M, W, B>
  }
}
```

Added in v2.4.0

# WriterM2 (interface)

**Signature**

```ts
export interface WriterM2<M extends URIS2> {
  readonly map: <E, W, A, B>(fa: WriterT2<M, E, W, A>, f: (a: A) => B) => WriterT2<M, E, W, B>
  readonly evalWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, A>
  readonly execWriter: <E, W, A>(fa: WriterT2<M, E, W, A>) => Kind2<M, E, W>
  readonly tell: <E, W>(w: W) => WriterT2<M, E, W, void>
  readonly listen: <E, W, A>(fa: WriterT2<M, E, W, A>) => WriterT2<M, E, W, [A, W]>
  readonly pass: <E, W, A>(fa: WriterT2<M, E, W, [A, (w: W) => W]>) => WriterT2<M, E, W, A>
  readonly listens: <E, W, A, B>(fa: WriterT2<M, E, W, A>, f: (w: W) => B) => WriterT2<M, E, W, [A, B]>
  readonly censor: <E, W, A>(fa: WriterT2<M, E, W, A>, f: (w: W) => W) => WriterT2<M, E, W, A>
  readonly getMonad: <W>(
    M: Monoid<W>
  ) => {
    readonly _E: W
    readonly map: <E, A, B>(ma: WriterT2<M, E, W, A>, f: (a: A) => B) => WriterT2<M, E, W, B>
    readonly of: <E, A>(a: A) => WriterT2<M, E, W, A>
    readonly ap: <E, A, B>(mab: WriterT2<M, E, W, (a: A) => B>, ma: WriterT2<M, E, W, A>) => WriterT2<M, E, W, B>
    readonly chain: <E, A, B>(ma: WriterT2<M, E, W, A>, f: (a: A) => WriterT2<M, E, W, B>) => WriterT2<M, E, W, B>
  }
}
```

Added in v2.4.0

# WriterT (interface)

**Signature**

```ts
export interface WriterT<M, W, A> {
  (): HKT<M, [A, W]>
}
```

Added in v2.4.0

# WriterT1 (interface)

**Signature**

```ts
export interface WriterT1<M extends URIS, W, A> {
  (): Kind<M, [A, W]>
}
```

Added in v2.4.0

# WriterT2 (interface)

**Signature**

```ts
export interface WriterT2<M extends URIS2, E, W, A> {
  (): Kind2<M, E, [A, W]>
}
```

Added in v2.4.0

# getWriterM (function)

**Signature**

```ts
export function getWriterM<M extends URIS2>(M: Monad2<M>): WriterM2<M>
export function getWriterM<M extends URIS>(M: Monad1<M>): WriterM1<M>
export function getWriterM<M>(M: Monad<M>): WriterM<M> { ... }
```

Added in v2.4.0
