---
id: OptionT
title: Module OptionT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L51-L53)

```ts
export function chain<F>(F: Monad<F>): OptionT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L128-L130)

```ts
export function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## fromOption

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L92-L94)

```ts
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## getOptionT

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L160-L167)

```ts
export function getOptionT<M>(M: Monad<M>): OptionT<M>  { ... }
```

Added in v1.0.0

## getOrElse

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L147-L149)

```ts
export function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## liftF

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L107-L109)

```ts
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0

## none

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L77-L79)

```ts
export function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>  { ... }
```

Added in v1.0.0

## some

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts#L64-L66)

```ts
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>  { ... }
```

Added in v1.0.0
