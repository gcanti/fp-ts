---
title: ReaderT.ts
nav_order: 69
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [~~ReaderT~~](#readert)
- [~~ReaderT1~~](#readert1)
- [~~ReaderT2~~](#readert2)
- [ReaderT2v](#readert2v)
- [ReaderT2v1](#readert2v1)
- [ReaderT2v2](#readert2v2)
- [ReaderT2v3](#readert2v3)
- [~~ReaderT3~~](#readert3)
- [~~ap~~](#ap)
- [~~ask~~](#ask)
- [~~asks~~](#asks)
- [~~chain~~](#chain)
- [fromReader](#fromreader)
- [~~getReaderT~~](#getreadert)
- [getReaderT2v](#getreadert2v)
- [~~map~~](#map)
- [~~of~~](#of)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ~~ReaderT~~

**Signature** (interface)

```ts
export interface ReaderT<M> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
}
```

# ~~ReaderT1~~

**Signature** (interface)

```ts
export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => Type<M, B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
}
```

# ~~ReaderT2~~

**Signature** (interface)

```ts
export interface ReaderT2<M extends URIS2> {
  readonly map: <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<M, L, A>) => (e: E) => Type2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Type2<M, L, (a: A) => B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
  readonly chain: <L, E, A, B>(
    f: (a: A) => (e: E) => Type2<M, L, B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
}
```

# ReaderT2v

**Signature** (interface)

```ts
export interface ReaderT2v<M> {
  readonly map: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => B) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => (e: E) => HKT<M, B>) => (e: E) => HKT<M, B>
}
```

# ReaderT2v1

**Signature** (interface)

```ts
export interface ReaderT2v1<M extends URIS> {
  readonly map: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => B) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => (e: E) => Type<M, B>) => (e: E) => Type<M, B>
}
```

# ReaderT2v2

**Signature** (interface)

```ts
export interface ReaderT2v2<M extends URIS2> {
  readonly map: <L, E, A, B>(fa: (e: E) => Type2<M, L, A>, f: (a: A) => B) => (e: E) => Type2<M, L, B>
  readonly of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>
  readonly ap: <L, E, A, B>(
    fab: (e: E) => Type2<M, L, (a: A) => B>,
    fa: (e: E) => Type2<M, L, A>
  ) => (e: E) => Type2<M, L, B>
  readonly chain: <L, E, A, B>(
    fa: (e: E) => Type2<M, L, A>,
    f: (a: A) => (e: E) => Type2<M, L, B>
  ) => (e: E) => Type2<M, L, B>
}
```

# ReaderT2v3

**Signature** (interface)

```ts
export interface ReaderT2v3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(fa: (e: E) => Type3<M, U, L, A>, f: (a: A) => B) => (e: E) => Type3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Type3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Type3<M, U, L, (a: A) => B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    fa: (e: E) => Type3<M, U, L, A>,
    f: (a: A) => (e: E) => Type3<M, U, L, B>
  ) => (e: E) => Type3<M, U, L, B>
}
```

# ~~ReaderT3~~

**Signature** (interface)

```ts
export interface ReaderT3<M extends URIS3> {
  readonly map: <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type3<M, U, L, A>) => (e: E) => Type3<M, U, L, B>
  readonly of: <U, L, E, A>(a: A) => (e: E) => Type3<M, U, L, A>
  readonly ap: <U, L, E, A, B>(
    fab: (e: E) => Type3<M, U, L, (a: A) => B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
  readonly chain: <U, L, E, A, B>(
    f: (a: A) => (e: E) => Type3<M, U, L, B>,
    fa: (e: E) => Type3<M, U, L, A>
  ) => (e: E) => Type3<M, U, L, B>
}
```

# ~~ap~~

**Signature** (function)

```ts
export function ap<F extends URIS3>(
  F: Applicative3<F>
): <U, L, E, A, B>(
  fab: (e: E) => Type3<F, U, L, (a: A) => B>,
  fa: (e: E) => Type3<F, U, L, A>
) => (e: E) => Type3<F, U, L, B>
export function ap<F extends URIS2>(
  F: Applicative2<F>
): <L, E, A, B>(fab: (e: E) => Type2<F, L, (a: A) => B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function ap<F extends URIS>(
  F: Applicative1<F>
): <E, A, B>(fab: (e: E) => Type<F, (a: A) => B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> { ... }
```

Added in v1.0.0

# ~~ask~~

**Signature** (function)

```ts
export function ask<F extends URIS3>(F: Applicative3<F>): <U, L, E>() => (e: E) => Type3<F, U, L, E>
export function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Type2<F, L, E>
export function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Type<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> { ... }
```

Added in v1.0.0

# ~~asks~~

**Signature** (function)

```ts
export function asks<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(f: (e: E) => A) => (e: E) => Type3<F, U, L, A>
export function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Type2<F, L, A>
export function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Type<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> { ... }
```

Added in v1.0.0

# ~~chain~~

Use `getReaderT2v` instead

**Signature** (function)

```ts
export function chain<F extends URIS3>(
  F: Chain3<F>
): <U, L, E, A, B>(
  f: (a: A) => (e: E) => Type3<F, U, L, B>,
  fa: (e: E) => Type3<F, U, L, A>
) => (e: E) => Type3<F, U, L, B>
export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, E, A, B>(f: (a: A) => (e: E) => Type2<F, L, B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function chain<F extends URIS>(
  F: Chain1<F>
): <E, A, B>(f: (a: A) => (e: E) => Type<F, B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> { ... }
```

Added in v1.0.0

# fromReader

**Signature** (function)

```ts
export function fromReader<F extends URIS3>(
  F: Applicative3<F>
): <E, U, L, A>(fa: Reader<E, A>) => (e: E) => Type3<F, U, L, A>
export function fromReader<F extends URIS2>(F: Applicative2<F>): <E, L, A>(fa: Reader<E, A>) => (e: E) => Type2<F, L, A>
export function fromReader<F extends URIS>(F: Applicative1<F>): <E, A>(fa: Reader<E, A>) => (e: E) => Type<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A>
export function fromReader<F>(F: Applicative<F>): <E, A>(fa: Reader<E, A>) => (e: E) => HKT<F, A> { ... }
```

Added in v1.2.0

# ~~getReaderT~~

Use `getReaderT2v` instead

**Signature** (function)

```ts
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M> { ... }
```

Added in v1.0.0

# getReaderT2v

**Signature** (function)

```ts
export function getReaderT2v<M extends URIS3>(M: Monad3<M>): ReaderT2v3<M>
export function getReaderT2v<M extends URIS2>(M: Monad2<M>): ReaderT2v2<M>
export function getReaderT2v<M extends URIS>(M: Monad1<M>): ReaderT2v1<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M> { ... }
```

Added in v1.14.0

# ~~map~~

Use `map2v` instead

**Signature** (function)

```ts
export function map<F extends URIS3>(
  F: Functor3<F>
): <U, L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type3<F, U, L, A>) => (e: E) => Type3<F, U, L, B>
export function map<F extends URIS2>(
  F: Functor2<F>
): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>
export function map<F extends URIS>(
  F: Functor1<F>
): <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
export function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B> { ... }
```

Added in v1.0.0

# ~~of~~

**Signature** (function)

```ts
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(a: A) => (e: E) => Type3<F, U, L, A>
export function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Type2<F, L, A>
export function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Type<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> { ... }
```

Added in v1.0.0
