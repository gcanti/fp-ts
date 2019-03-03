---
title: ReaderT.ts
nav_order: 69
parent: Modules
---

<h2 class="text-delta">Table of contents</h2>

- [~~ReaderT~~ (interface)](#readert-interface)
- [~~ReaderT1~~ (interface)](#readert1-interface)
- [~~ReaderT2~~ (interface)](#readert2-interface)
- [ReaderT2v (interface)](#readert2v-interface)
- [ReaderT2v1 (interface)](#readert2v1-interface)
- [ReaderT2v2 (interface)](#readert2v2-interface)
- [ReaderT2v3 (interface)](#readert2v3-interface)
- [~~ReaderT3~~ (interface)](#readert3-interface)
- [~~ap~~ (function)](#ap-function)
- [~~ask~~ (function)](#ask-function)
- [~~asks~~ (function)](#asks-function)
- [~~chain~~ (function)](#chain-function)
- [fromReader (function)](#fromreader-function)
- [~~getReaderT~~ (function)](#getreadert-function)
- [getReaderT2v (function)](#getreadert2v-function)
- [~~map~~ (function)](#map-function)
- [~~of~~ (function)](#of-function)

# ~~ReaderT~~ (interface)

**Signature**

```ts
export interface ReaderT<M> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
}
```

# ~~ReaderT1~~ (interface)

**Signature**

```ts
export interface ReaderT1<M extends URIS> {
  readonly map: <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(f: (a: A) => (e: E) => Type<M, B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
}
```

# ~~ReaderT2~~ (interface)

**Signature**

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

# ReaderT2v (interface)

**Signature**

```ts
export interface ReaderT2v<M> {
  readonly map: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => B) => (e: E) => HKT<M, B>
  readonly of: <E, A>(a: A) => (e: E) => HKT<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => HKT<M, A>, f: (a: A) => (e: E) => HKT<M, B>) => (e: E) => HKT<M, B>
}
```

# ReaderT2v1 (interface)

**Signature**

```ts
export interface ReaderT2v1<M extends URIS> {
  readonly map: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => B) => (e: E) => Type<M, B>
  readonly of: <E, A>(a: A) => (e: E) => Type<M, A>
  readonly ap: <E, A, B>(fab: (e: E) => Type<M, (a: A) => B>, fa: (e: E) => Type<M, A>) => (e: E) => Type<M, B>
  readonly chain: <E, A, B>(fa: (e: E) => Type<M, A>, f: (a: A) => (e: E) => Type<M, B>) => (e: E) => Type<M, B>
}
```

# ReaderT2v2 (interface)

**Signature**

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

# ReaderT2v3 (interface)

**Signature**

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

# ~~ReaderT3~~ (interface)

**Signature**

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

# ~~ap~~ (function)

**Signature**

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

# ~~ask~~ (function)

**Signature**

```ts
export function ask<F extends URIS3>(F: Applicative3<F>): <U, L, E>() => (e: E) => Type3<F, U, L, E>
export function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Type2<F, L, E>
export function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Type<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
export function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E> { ... }
```

Added in v1.0.0

# ~~asks~~ (function)

**Signature**

```ts
export function asks<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(f: (e: E) => A) => (e: E) => Type3<F, U, L, A>
export function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Type2<F, L, A>
export function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Type<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
export function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A> { ... }
```

Added in v1.0.0

# ~~chain~~ (function)

Use `getReaderT2v` instead

**Signature**

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

# fromReader (function)

**Signature**

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

# ~~getReaderT~~ (function)

Use `getReaderT2v` instead

**Signature**

```ts
export function getReaderT<M extends URIS3>(M: Monad3<M>): ReaderT3<M>
export function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>
export function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M>
export function getReaderT<M>(M: Monad<M>): ReaderT<M> { ... }
```

Added in v1.0.0

# getReaderT2v (function)

**Signature**

```ts
export function getReaderT2v<M extends URIS3>(M: Monad3<M>): ReaderT2v3<M>
export function getReaderT2v<M extends URIS2>(M: Monad2<M>): ReaderT2v2<M>
export function getReaderT2v<M extends URIS>(M: Monad1<M>): ReaderT2v1<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M>
export function getReaderT2v<M>(M: Monad<M>): ReaderT2v<M> { ... }
```

Added in v1.14.0

# ~~map~~ (function)

Use `map2v` instead

**Signature**

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

# ~~of~~ (function)

**Signature**

```ts
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, E, A>(a: A) => (e: E) => Type3<F, U, L, A>
export function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Type2<F, L, A>
export function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Type<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
export function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A> { ... }
```

Added in v1.0.0
