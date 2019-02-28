---
title: EitherT.ts
nav_order: 25
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [~~EitherT~~](#eithert)
- [~~EitherT1~~](#eithert1)
- [~~EitherT2~~](#eithert2)
- [EitherT2v](#eithert2v)
- [EitherT2v1](#eithert2v1)
- [EitherT2v2](#eithert2v2)
- [~~bimap~~](#bimap)
- [~~chain~~](#chain)
- [fold](#fold)
- [~~fromEither~~](#fromeither)
- [~~getEitherT~~](#geteithert)
- [getEitherT2v](#geteithert2v)
- [~~left~~](#left)
- [~~mapLeft~~](#mapleft)
- [~~right~~](#right)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ~~EitherT~~

**Signature** (interface)

```ts
export interface EitherT<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(f: (a: A) => HKT<F, Either<L, B>>, fa: HKT<F, Either<L, A>>) => HKT<F, Either<L, B>>
}
```

# ~~EitherT1~~

**Signature** (interface)

```ts
export interface EitherT1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(f: (a: A) => Type<F, Either<L, B>>, fa: Type<F, Either<L, A>>) => Type<F, Either<L, B>>
}
```

# ~~EitherT2~~

**Signature** (interface)

```ts
export interface EitherT2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
  readonly chain: <L, M, A, B>(
    f: (a: A) => Type2<F, M, Either<L, B>>,
    fa: Type2<F, M, Either<L, A>>
  ) => Type2<F, M, Either<L, B>>
}
```

# EitherT2v

**Signature** (interface)

```ts
export interface EitherT2v<F> extends ApplicativeComposition<F, URI> {
  readonly chain: <L, A, B>(fa: HKT<F, Either<L, A>>, f: (a: A) => HKT<F, Either<L, B>>) => HKT<F, Either<L, B>>
}
```

# EitherT2v1

**Signature** (interface)

```ts
export interface EitherT2v1<F extends URIS> extends ApplicativeComposition12<F, URI> {
  readonly chain: <L, A, B>(fa: Type<F, Either<L, A>>, f: (a: A) => Type<F, Either<L, B>>) => Type<F, Either<L, B>>
}
```

# EitherT2v2

**Signature** (interface)

```ts
export interface EitherT2v2<F extends URIS2> extends ApplicativeComposition22<F, URI> {
  readonly chain: <L, M, A, B>(
    fa: Type2<F, M, Either<L, A>>,
    f: (a: A) => Type2<F, M, Either<L, B>>
  ) => Type2<F, M, Either<L, B>>
}
```

# ~~bimap~~

**Signature** (function)

```ts
export function bimap<F extends URIS2>(
  F: Functor2<F>
): <M, L, V, A, B>(fa: Type2<F, M, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type2<F, M, Either<V, B>>
export function bimap<F extends URIS>(
  F: Functor1<F>
): <L, V, A, B>(fa: Type<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => Type<F, Either<V, B>>
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>> { ... }
```

Added in v1.2.0

# ~~chain~~

Use `getEitherT2v` instead

**Signature** (function)

```ts
export function chain<F extends URIS2>(F: Monad2<F>): EitherT2<F>['chain']
export function chain<F extends URIS>(F: Monad1<F>): EitherT1<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain']
export function chain<F>(F: Monad<F>): EitherT<F>['chain'] { ... }
```

Added in v1.0.0

# fold

**Signature** (function)

```ts
export function fold<F extends URIS2>(
  F: Functor2<F>
): <R, L, M, A>(left: (l: L) => R, right: (a: A) => R, fa: Type2<F, M, Either<L, A>>) => Type2<F, M, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: Type<F, Either<L, A>>) => Type<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R> { ... }
```

Added in v1.0.0

# ~~fromEither~~

**Signature** (function)

```ts
export function fromEither<F extends URIS2>(
  F: Applicative2<F>
): <L, M, A>(fa: Either<L, A>) => Type2<F, M, Either<L, A>>
export function fromEither<F extends URIS>(F: Applicative1<F>): <L, A>(fa: Either<L, A>) => Type<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>> { ... }
```

Added in v1.0.0

# ~~getEitherT~~

Use `getEitherT2v` instead

**Signature** (function)

```ts
export function getEitherT<M extends URIS2>(M: Monad2<M>): EitherT2<M>
export function getEitherT<M extends URIS>(M: Monad1<M>): EitherT1<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M>
export function getEitherT<M>(M: Monad<M>): EitherT<M> { ... }
```

Added in v1.0.0

# getEitherT2v

**Signature** (function)

```ts
export function getEitherT2v<M extends URIS2>(M: Monad2<M>): EitherT2v2<M>
export function getEitherT2v<M extends URIS>(M: Monad1<M>): EitherT2v1<M>
export function getEitherT2v<M>(M: Monad<M>): EitherT2v<M>
export function getEitherT2v<M>(M: Monad<M>): EitherT2v<M> { ... }
```

Added in v1.14.0

# ~~left~~

**Signature** (function)

```ts
export function left<F extends URIS2>(F: Functor2<F>): <L, M, A>(fl: Type2<F, M, L>) => Type2<F, M, Either<L, A>>
export function left<F extends URIS>(F: Functor1<F>): <L, A>(fl: Type<F, L>) => Type<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>> { ... }
```

Added in v1.0.0

# ~~mapLeft~~

**Signature** (function)

```ts
export function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <N, L, M>(f: (l: L) => N) => <A>(fa: Type2<F, M, Either<L, A>>) => Type2<F, M, Either<N, A>>
export function mapLeft<F extends URIS>(
  F: Functor1<F>
): <N, L>(f: (l: L) => N) => <A>(fa: Type<F, Either<L, A>>) => Type<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>> { ... }
```

Added in v1.0.0

# ~~right~~

**Signature** (function)

```ts
export function right<F extends URIS2>(F: Functor2<F>): <L, M, A>(fa: Type2<F, M, A>) => Type2<F, M, Either<L, A>>
export function right<F extends URIS>(F: Functor1<F>): <L, A>(fa: Type<F, A>) => Type<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>> { ... }
```

Added in v1.0.0
