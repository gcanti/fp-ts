---
id: OptionT
title: Module OptionT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)

## chain

```ts
chain<F>(F: Monad<F>): OptionT<F>['chain']
```

Added in v1.0.0 (function)

## fold

```ts
fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
```

Added in v1.0.0 (function)

## fromOption

```ts
fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
```

Added in v1.0.0 (function)

## getOptionT

```ts
getOptionT<M>(M: Monad<M>): OptionT<M>
```

Added in v1.0.0 (function)

## getOrElse

```ts
getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
```

Added in v1.0.0 (function)

## liftF

```ts
liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
```

Added in v1.0.0 (function)

## none

```ts
none<F>(F: Applicative<F>): () => HKT<F, Option<never>>
```

Added in v1.0.0 (function)

## some

```ts
some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
```

Added in v1.0.0 (function)
