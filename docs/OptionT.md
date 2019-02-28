---
id: OptionT
title: OptionT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)

## ~~chain~~

Use [getOptionT2v](#getoptiont2v) instead

**Signature** (function)

```ts
export function chain<F>(F: Monad<F>): OptionT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function)

```ts
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## ~~fromOption~~

**Signature** (function)

```ts
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## ~~getOptionT~~

Use [getOptionT2v](#getoptiont2v) instead

**Signature** (function)

```ts
export function getOptionT<M>(M: Monad<M>): OptionT<M>  { ... }
```

Added in v1.0.0

## getOptionT2v

**Signature** (function)

```ts
export function getOptionT2v<M>(M: Monad<M>): OptionT2v<M>  { ... }
```

Added in v1.14.0

## ~~getOrElse~~

**Signature** (function)

```ts
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## ~~liftF~~

**Signature** (function)

```ts
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## ~~none~~

**Signature** (function)

```ts
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>  { ... }
```

Added in v1.0.0

## ~~some~~

**Signature** (function)

```ts
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0
