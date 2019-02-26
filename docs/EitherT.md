---
id: EitherT
title: EitherT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts)

## ~~bimap~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L207-L211)

```ts
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>  { ... }
```

Added in v1.2.0

## ~~chain~~ (deprecated)

Use [getEitherT2v](#geteithert2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L96-L98)

```ts
export function chain<F>(F: Monad<F>): EitherT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L42-L46)

```ts
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## ~~fromEither~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L165-L167)

```ts
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## ~~getEitherT~~ (deprecated)

Use [getEitherT2v](#geteithert2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L115-L123)

```ts
export function getEitherT<M>(M: Monad<M>): EitherT<M>  { ... }
```

Added in v1.0.0

## getEitherT2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L54-L61)

```ts
export function getEitherT2v<M>(M: Monad<M>): EitherT2v<M>  { ... }
```

Added in v1.14.0

## ~~left~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L149-L151)

```ts
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## ~~mapLeft~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L185-L189)

```ts
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>  { ... }
```

Added in v1.0.0

## ~~right~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L135-L137)

```ts
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0
