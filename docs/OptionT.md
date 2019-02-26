---
id: OptionT
title: OptionT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)

## ~~chain~~ (deprecated)

Use [getOptionT2v](#getoptiont2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L128-L130)

```ts
export function chain<F>(F: Monad<F>): OptionT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L58-L60)

```ts
export function fold<F>(F: Functor<F>): <R, A>(onNone: R, onSome: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## ~~fromOption~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L213-L215)

```ts
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## ~~getOptionT~~ (deprecated)

Use [getOptionT2v](#getoptiont2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L152-L160)

```ts
export function getOptionT<M>(M: Monad<M>): OptionT<M>  { ... }
```

Added in v1.0.0

## getOptionT2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L70-L77)

```ts
export function getOptionT2v<M>(M: Monad<M>): OptionT2v<M>  { ... }
```

Added in v1.14.0

## ~~getOrElse~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L257-L259)

```ts
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## ~~liftF~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L233-L235)

```ts
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## ~~none~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L194-L196)

```ts
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>  { ... }
```

Added in v1.0.0

## ~~some~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L176-L178)

```ts
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0
