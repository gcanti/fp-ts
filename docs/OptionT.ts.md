---
title: OptionT.ts
nav_order: 61
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [~~OptionT~~](#optiont)
- [~~OptionT1~~](#optiont1)
- [~~OptionT2~~](#optiont2)
- [~~OptionT2C~~](#optiont2c)
- [OptionT2v](#optiont2v)
- [OptionT2v1](#optiont2v1)
- [OptionT2v2](#optiont2v2)
- [OptionT2v2C](#optiont2v2c)
- [OptionT2v3C](#optiont2v3c)
- [~~OptionT3C~~](#optiont3c)
- [~~chain~~](#chain)
- [fold](#fold)
- [~~fromOption~~](#fromoption)
- [~~getOptionT~~](#getoptiont)
- [getOptionT2v](#getoptiont2v)
- [~~getOrElse~~](#getorelse)
- [~~liftF~~](#liftf)
- [~~none~~](#none)
- [~~some~~](#some)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ~~OptionT~~

**Signature** (interface)

```ts
export interface OptionT<M> extends ApplicativeComposition<M, URI> {
  readonly chain: <A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>) => HKT<M, Option<B>>
}
```

# ~~OptionT1~~

**Signature** (interface)

```ts
export interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(f: (a: A) => Type<M, Option<B>>, fa: Type<M, Option<A>>) => Type<M, Option<B>>
}
```

# ~~OptionT2~~

**Signature** (interface)

```ts
export interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(f: (a: A) => Type2<M, L, Option<B>>, fa: Type2<M, L, Option<A>>) => Type2<M, L, Option<B>>
}
```

# ~~OptionT2C~~

**Signature** (interface)

```ts
export interface OptionT2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(f: (a: A) => Type2<M, L, Option<B>>, fa: Type2<M, L, Option<A>>) => Type2<M, L, Option<B>>
}
```

# OptionT2v

**Signature** (interface)

```ts
export interface OptionT2v<M> extends ApplicativeComposition<M, URI> {
  readonly chain: <A, B>(fa: HKT<M, Option<A>>, f: (a: A) => HKT<M, Option<B>>) => HKT<M, Option<B>>
}
```

# OptionT2v1

**Signature** (interface)

```ts
export interface OptionT2v1<M extends URIS> extends ApplicativeComposition11<M, URI> {
  readonly chain: <A, B>(fa: Type<M, Option<A>>, f: (a: A) => Type<M, Option<B>>) => Type<M, Option<B>>
}
```

# OptionT2v2

**Signature** (interface)

```ts
export interface OptionT2v2<M extends URIS2> extends ApplicativeComposition21<M, URI> {
  readonly chain: <L, A, B>(fa: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
}
```

# OptionT2v2C

**Signature** (interface)

```ts
export interface OptionT2v2C<M extends URIS2, L> extends ApplicativeComposition2C1<M, URI, L> {
  readonly chain: <A, B>(fa: Type2<M, L, Option<A>>, f: (a: A) => Type2<M, L, Option<B>>) => Type2<M, L, Option<B>>
}
```

# OptionT2v3C

**Signature** (interface)

```ts
export interface OptionT2v3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(
    fa: Type3<M, U, L, Option<A>>,
    f: (a: A) => Type3<M, U, L, Option<B>>
  ) => Type3<M, U, L, Option<B>>
}
```

# ~~OptionT3C~~

**Signature** (interface)

```ts
export interface OptionT3C<M extends URIS3, U, L> extends ApplicativeComposition3C1<M, URI, U, L> {
  readonly chain: <A, B>(
    f: (a: A) => Type3<M, U, L, Option<B>>,
    fa: Type3<M, U, L, Option<A>>
  ) => Type3<M, U, L, Option<B>>
}
```

# ~~chain~~

Use `getOptionT2v` instead

**Signature** (function)

```ts
export function chain<F extends URIS3, U, L>(F: Monad3C<F, U, L>): OptionT3C<F, U, L>['chain']
export function chain<F extends URIS2>(F: Monad2<F>): OptionT2<F>['chain']
export function chain<F extends URIS2, L>(F: Monad2C<F, L>): OptionT2C<F, L>['chain']
export function chain<F extends URIS>(F: Monad1<F>): OptionT1<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain'] { ... }
```

Added in v1.0.0

# fold

**Signature** (function)

```ts
export function fold<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, R>
export function fold<F extends URIS2>(
  F: Functor2<F>
): <L, R, A>(onNone: R, onSome: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS2, L>(
  F: Functor2C<F, L>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>
export function fold<F extends URIS>(
  F: Functor1<F>
): <R, A>(onNone: R, onSome: (a: A) => R, fa: Type<F, Option<A>>) => Type<F, R>
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> { ... }
```

Added in v1.0.0

# ~~fromOption~~

**Signature** (function)

```ts
export function fromOption<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(fa: Option<A>) => Type3<F, U, L, Option<A>>
export function fromOption<F extends URIS2>(F: Applicative2<F>): <L, A>(fa: Option<A>) => Type2<F, L, Option<A>>
export function fromOption<F extends URIS2, L>(F: Applicative2C<F, L>): <A>(fa: Option<A>) => Type2<F, L, Option<A>>
export function fromOption<F extends URIS>(F: Applicative1<F>): <A>(fa: Option<A>) => Type<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> { ... }
```

Added in v1.0.0

# ~~getOptionT~~

Use `getOptionT2v` instead

**Signature** (function)

```ts
export function getOptionT<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT3C<M, U, L>
export function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>
export function getOptionT<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2C<M, L>
export function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M> { ... }
```

Added in v1.0.0

# getOptionT2v

**Signature** (function)

```ts
export function getOptionT2v<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionT2v3C<M, U, L>
export function getOptionT2v<M extends URIS2>(M: Monad2<M>): OptionT2v2<M>
export function getOptionT2v<M extends URIS2, L>(M: Monad2C<M, L>): OptionT2v2C<M, L>
export function getOptionT2v<M extends URIS>(M: Monad1<M>): OptionT2v1<M>
export function getOptionT2v<M>(M: Monad<M>): OptionT2v<M>
export function getOptionT2v<M>(M: Monad<M>): OptionT2v<M> { ... }
```

Added in v1.14.0

# ~~getOrElse~~

**Signature** (function)

```ts
export function getOrElse<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A>(a: A) => (fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
export function getOrElse<F extends URIS2>(
  F: Functor2<F>
): <A>(a: A) => <L>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
export function getOrElse<F extends URIS2, L>(
  F: Functor2C<F, L>
): <A>(a: A) => (fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
export function getOrElse<F extends URIS>(F: Functor1<F>): <A>(a: A) => (fa: Type<F, Option<A>>) => Type<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A> { ... }
```

Added in v1.0.0

# ~~liftF~~

**Signature** (function)

```ts
export function liftF<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, Option<A>>
export function liftF<F extends URIS2>(F: Functor2<F>): <L, A>(fa: Type2<F, L, A>) => Type2<F, L, Option<A>>
export function liftF<F extends URIS2, L>(F: Functor2C<F, L>): <A>(fa: Type2<F, L, A>) => Type2<F, L, Option<A>>
export function liftF<F extends URIS>(F: Functor1<F>): <A>(fa: Type<F, A>) => Type<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> { ... }
```

Added in v1.0.0

# ~~none~~

**Signature** (function)

```ts
export function none<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): () => Type3<F, U, L, Option<never>>
export function none<F extends URIS2>(F: Applicative2<F>): <L>() => Type2<F, L, Option<never>>
export function none<F extends URIS2, L>(F: Applicative2C<F, L>): () => Type2<F, L, Option<never>>
export function none<F extends URIS>(F: Applicative1<F>): () => Type<F, Option<never>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>> { ... }
```

Added in v1.0.0

# ~~some~~

**Signature** (function)

```ts
export function some<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A>(a: A) => Type3<F, U, L, Option<A>>
export function some<F extends URIS2>(F: Applicative2<F>): <L, A>(a: A) => Type2<F, L, Option<A>>
export function some<F extends URIS2, L>(F: Applicative2C<F, L>): <A>(a: A) => Type2<F, L, Option<A>>
export function some<F extends URIS>(F: Applicative1<F>): <A>(a: A) => Type<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> { ... }
```

Added in v1.0.0
