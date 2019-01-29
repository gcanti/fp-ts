---
id: StateT
title: Module StateT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts)

## ap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L120-L126)

```ts
export function ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L150-L154)

```ts
export function chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## fromState

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L222-L224)

```ts
export function fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.2.0

## get

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L164-L166)

```ts
export function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>  { ... }
```

Added in v1.0.0

## getStateT

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L248-L255)

```ts
export function getStateT<M>(M: Monad<M>): StateT<M>  { ... }
```

Added in v1.0.0

## gets

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L206-L208)

```ts
export function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.0.0

## liftF

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L236-L238)

```ts
export function liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.2.0

## map

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L80-L84)

```ts
export function map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>  { ... }
```

Added in v1.0.0

## modify

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L192-L194)

```ts
export function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>  { ... }
```

Added in v1.0.0

## of

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L94-L96)

```ts
export function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>  { ... }
```

Added in v1.0.0

## put

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts#L176-L178)

```ts
export function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>  { ... }
```

Added in v1.0.0
