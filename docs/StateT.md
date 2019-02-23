---
id: StateT
title: Module StateT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts)

## ~~ap~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L269-L273)

```ts
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## ~~chain~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L301-L305)

```ts
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## fromState

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L125-L127)

```ts
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.2.0

## ~~get~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L366-L368)

```ts
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>  { ... }
```

Added in v1.0.0

## get2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L71-L73)

```ts
export function get2v<F>(F: Applicative<F>): <S>(s: S) => HKT<F, [S, S]>  { ... }
```

Added in v1.14.0

## ~~getStateT~~ (deprecated)

Use [getStateT2v](#getstatet2v) instead

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L325-L336)

```ts
export function getStateT<M>(M: Monad<M>): StateT<M>  { ... }
```

Added in v1.0.0

## getStateT2v

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L149-L156)

```ts
export function getStateT2v<M>(M: Monad<M>): StateT2v<M>  { ... }
```

Added in v1.14.0

## gets

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L110-L112)

```ts
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.0.0

## liftF

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L138-L140)

```ts
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.2.0

## ~~map~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L237-L241)

```ts
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## modify

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L97-L99)

```ts
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>  { ... }
```

Added in v1.0.0

## ~~of~~ (deprecated)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L350-L352)

```ts
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.0.0

## put

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L82-L84)

```ts
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>  { ... }
```

Added in v1.0.0
