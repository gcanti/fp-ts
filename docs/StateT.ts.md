---
title: StateT.ts
nav_order: 79
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [~~StateT~~](#statet)
- [~~StateT1~~](#statet1)
- [~~StateT2~~](#statet2)
- [StateT2v](#statet2v)
- [StateT2v1](#statet2v1)
- [StateT2v2](#statet2v2)
- [StateT2v3](#statet2v3)
- [~~StateT3~~](#statet3)
- [~~ap~~](#ap)
- [~~chain~~](#chain)
- [fromState](#fromstate)
- [~~get~~](#get)
- [get2v](#get2v)
- [~~getStateT~~](#getstatet)
- [getStateT2v](#getstatet2v)
- [gets](#gets)
- [liftF](#liftf)
- [~~map~~](#map)
- [modify](#modify)
- [~~of~~](#of)
- [put](#put)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ~~StateT~~

**Signature** (interface)

```ts
export interface StateT<M> {
  readonly map: <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => HKT<M, [(a: A) => B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
  readonly chain: <S, A, B>(
    f: (a: A) => (s: S) => HKT<M, [B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
}
```

# ~~StateT1~~

**Signature** (interface)

```ts
export interface StateT1<M extends URIS> {
  readonly map: <S, A, B>(f: (a: A) => B, fa: (s: S) => Type<M, [A, S]>) => (s: S) => Type<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => Type<M, [(a: A) => B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
  readonly chain: <S, A, B>(
    f: (a: A) => (s: S) => Type<M, [B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
}
```

# ~~StateT2~~

**Signature** (interface)

```ts
export interface StateT2<M extends URIS2> {
  readonly map: <L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>
  readonly of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>
  readonly ap: <L, S, A, B>(
    fab: (s: S) => Type2<M, L, [(a: A) => B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
  readonly chain: <L, S, A, B>(
    f: (a: A) => (s: S) => Type2<M, L, [B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
}
```

# StateT2v

**Signature** (interface)

```ts
export interface StateT2v<M> {
  readonly map: <S, A, B>(fa: (s: S) => HKT<M, [A, S]>, f: (a: A) => B) => (s: S) => HKT<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => HKT<M, [(a: A) => B, S]>,
    fa: (s: S) => HKT<M, [A, S]>
  ) => (s: S) => HKT<M, [B, S]>
  readonly chain: <S, A, B>(
    fa: (s: S) => HKT<M, [A, S]>,
    f: (a: A) => (s: S) => HKT<M, [B, S]>
  ) => (s: S) => HKT<M, [B, S]>
}
```

# StateT2v1

**Signature** (interface)

```ts
export interface StateT2v1<M extends URIS> {
  readonly map: <S, A, B>(fa: (s: S) => Type<M, [A, S]>, f: (a: A) => B) => (s: S) => Type<M, [B, S]>
  readonly of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>
  readonly ap: <S, A, B>(
    fab: (s: S) => Type<M, [(a: A) => B, S]>,
    fa: (s: S) => Type<M, [A, S]>
  ) => (s: S) => Type<M, [B, S]>
  readonly chain: <S, A, B>(
    fa: (s: S) => Type<M, [A, S]>,
    f: (a: A) => (s: S) => Type<M, [B, S]>
  ) => (s: S) => Type<M, [B, S]>
}
```

# StateT2v2

**Signature** (interface)

```ts
export interface StateT2v2<M extends URIS2> {
  readonly map: <L, S, A, B>(fa: (s: S) => Type2<M, L, [A, S]>, f: (a: A) => B) => (s: S) => Type2<M, L, [B, S]>
  readonly of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>
  readonly ap: <L, S, A, B>(
    fab: (s: S) => Type2<M, L, [(a: A) => B, S]>,
    fa: (s: S) => Type2<M, L, [A, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
  readonly chain: <L, S, A, B>(
    fa: (s: S) => Type2<M, L, [A, S]>,
    f: (a: A) => (s: S) => Type2<M, L, [B, S]>
  ) => (s: S) => Type2<M, L, [B, S]>
}
```

# StateT2v3

**Signature** (interface)

```ts
export interface StateT2v3<M extends URIS3> {
  readonly map: <U, L, S, A, B>(
    fa: (s: S) => Type3<M, U, L, [A, S]>,
    f: (a: A) => B
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly of: <U, L, S, A>(a: A) => (s: S) => Type3<M, U, L, [A, S]>
  readonly ap: <U, L, S, A, B>(
    fab: (s: S) => Type3<M, U, L, [(a: A) => B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly chain: <U, L, S, A, B>(
    fa: (s: S) => Type3<M, U, L, [A, S]>,
    f: (a: A) => (s: S) => Type3<M, U, L, [B, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
}
```

# ~~StateT3~~

**Signature** (interface)

```ts
export interface StateT3<M extends URIS3> {
  readonly map: <U, L, S, A, B>(
    f: (a: A) => B,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly of: <U, L, S, A>(a: A) => (s: S) => Type3<M, U, L, [A, S]>
  readonly ap: <U, L, S, A, B>(
    fab: (s: S) => Type3<M, U, L, [(a: A) => B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
  readonly chain: <U, L, S, A, B>(
    f: (a: A) => (s: S) => Type3<M, U, L, [B, S]>,
    fa: (s: S) => Type3<M, U, L, [A, S]>
  ) => (s: S) => Type3<M, U, L, [B, S]>
}
```

# ~~ap~~

**Signature** (function)

```ts
export function ap<F extends URIS3>(
  F: Chain3<F>
): <U, L, S, A, B>(
  fab: (s: S) => Type3<F, U, L, [(a: A) => B, S]>,
  fa: (s: S) => Type3<F, U, L, [A, S]>
) => (s: S) => Type3<F, U, L, [B, S]>
export function ap<F extends URIS2>(
  F: Chain2<F>
): <L, S, A, B>(
  fab: (s: S) => Type2<F, L, [(a: A) => B, S]>,
  fa: (s: S) => Type2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function ap<F extends URIS>(
  F: Chain1<F>
): <S, A, B>(fab: (s: S) => Type<F, [(a: A) => B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> { ... }
```

Added in v1.0.0

# ~~chain~~

**Signature** (function)

```ts
export function chain<F extends URIS3>(
  F: Chain3<F>
): <U, L, S, A, B>(
  f: (a: A) => (s: S) => Type3<F, U, L, [B, S]>,
  fa: (s: S) => Type3<F, U, L, [A, S]>
) => (s: S) => Type3<F, U, L, [B, S]>
export function chain<F extends URIS2>(
  F: Chain2<F>
): <L, S, A, B>(
  f: (a: A) => (s: S) => Type2<F, L, [B, S]>,
  fa: (s: S) => Type2<F, L, [A, S]>
) => (s: S) => Type2<F, L, [B, S]>
export function chain<F extends URIS>(
  F: Chain1<F>
): <S, A, B>(f: (a: A) => (s: S) => Type<F, [B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> { ... }
```

Added in v1.0.0

# fromState

**Signature** (function)

```ts
export function fromState<F extends URIS3>(
  F: Applicative3<F>
): <S, A, U, L>(fa: State<S, A>) => (s: S) => Type3<F, U, L, [A, S]>
export function fromState<F extends URIS2>(
  F: Applicative2<F>
): <S, A, L>(fa: State<S, A>) => (s: S) => Type2<F, L, [A, S]>
export function fromState<F extends URIS>(F: Applicative1<F>): <S, A>(fa: State<S, A>) => (s: S) => Type<F, [A, S]>
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]> { ... }
```

Added in v1.2.0

# ~~get~~

**Signature** (function)

```ts
export function get<F extends URIS3>(F: Applicative3<F>): <S>() => <U, L>(s: S) => Type3<F, U, L, [S, S]>
export function get<F extends URIS2>(F: Applicative2<F>): <S>() => <L>(s: S) => Type2<F, L, [S, S]>
export function get<F extends URIS>(F: Applicative1<F>): <S>() => (s: S) => Type<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> { ... }
```

Added in v1.0.0

# get2v

**Signature** (function)

```ts
export function get2v<F extends URIS3>(F: Applicative3<F>): <S, U, L>(s: S) => Type3<F, U, L, [S, S]>
export function get2v<F extends URIS2>(F: Applicative2<F>): <S, L>(s: S) => Type2<F, L, [S, S]>
export function get2v<F extends URIS>(F: Applicative1<F>): <S>(s: S) => Type<F, [S, S]>
export function get2v<F>(F: Applicative<F>): <S>(s: S) => HKT<F, [S, S]>
export function get2v<F>(F: Applicative<F>): <S>(s: S) => HKT<F, [S, S]> { ... }
```

Added in v1.14.0

# ~~getStateT~~

Use `getStateT2v` instead

**Signature** (function)

```ts
export function getStateT<M extends URIS3>(M: Monad3<M>): StateT3<M>
export function getStateT<M extends URIS2>(M: Monad2<M>): StateT2<M>
export function getStateT<M extends URIS>(M: Monad1<M>): StateT1<M>
export function getStateT<M>(M: Monad<M>): StateT<M>
export function getStateT<M>(M: Monad<M>): StateT<M> { ... }
```

Added in v1.0.0

# getStateT2v

**Signature** (function)

```ts
export function getStateT2v<M extends URIS3>(M: Monad3<M>): StateT2v3<M>
export function getStateT2v<M extends URIS2>(M: Monad2<M>): StateT2v2<M>
export function getStateT2v<M extends URIS>(M: Monad1<M>): StateT2v1<M>
export function getStateT2v<M>(M: Monad<M>): StateT2v<M>
export function getStateT2v<M>(M: Monad<M>): StateT2v<M> { ... }
```

Added in v1.14.0

# gets

**Signature** (function)

```ts
export function gets<F extends URIS3>(
  F: Applicative3<F>
): <S, A>(f: (s: S) => A) => <U, L>(s: S) => Type3<F, U, L, [A, S]>
export function gets<F extends URIS2>(F: Applicative2<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<F, L, [A, S]>
export function gets<F extends URIS>(F: Applicative1<F>): <S, A>(f: (s: S) => A) => (s: S) => Type<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> { ... }
```

Added in v1.0.0

# liftF

**Signature** (function)

```ts
export function liftF<F extends URIS3>(
  F: Functor3<F>
): <U, L, S, A>(fa: Type3<F, U, L, A>) => (s: S) => Type3<F, U, L, [A, S]>
export function liftF<F extends URIS2>(F: Functor2<F>): <L, S, A>(fa: Type2<F, L, A>) => (s: S) => Type2<F, L, [A, S]>
export function liftF<F extends URIS>(F: Functor1<F>): <S, A>(fa: Type<F, A>) => (s: S) => Type<F, [A, S]>
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]> { ... }
```

Added in v1.2.0

# ~~map~~

**Signature** (function)

```ts
export function map<F extends URIS3>(
  F: Functor3<F>
): <U, L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type3<F, U, L, [A, S]>) => (s: S) => Type3<F, U, L, [B, S]>
export function map<F extends URIS2>(
  F: Functor2<F>
): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>
export function map<F extends URIS>(
  F: Functor1<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> { ... }
```

Added in v1.0.0

# modify

**Signature** (function)

```ts
export function modify<F extends URIS3>(
  F: Applicative3<F>
): <S>(f: Endomorphism<S>) => <U, L>(s: S) => Type3<F, U, L, [void, S]>
export function modify<F extends URIS2>(
  F: Applicative2<F>
): <S>(f: Endomorphism<S>) => <L>(s: S) => Type2<F, L, [void, S]>
export function modify<F extends URIS>(F: Applicative1<F>): <S>(f: Endomorphism<S>) => (s: S) => Type<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> { ... }
```

Added in v1.0.0

# ~~of~~

**Signature** (function)

```ts
export function of<F extends URIS3>(F: Applicative3<F>): <U, L, S, A>(a: A) => (s: S) => Type3<F, U, L, [A, S]>
export function of<F extends URIS2>(F: Applicative2<F>): <L, S, A>(a: A) => (s: S) => Type2<F, L, [A, S]>
export function of<F extends URIS>(F: Applicative1<F>): <S, A>(a: A) => (s: S) => Type<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> { ... }
```

Added in v1.0.0

# put

**Signature** (function)

```ts
export function put<F extends URIS3>(F: Applicative3<F>): <S>(s: S) => <U, L>() => Type3<F, U, L, [void, S]>
export function put<F extends URIS2>(F: Applicative2<F>): <S>(s: S) => <L>() => Type2<F, L, [void, S]>
export function put<F extends URIS>(F: Applicative1<F>): <S>(s: S) => () => Type<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]> { ... }
```

Added in v1.0.0
