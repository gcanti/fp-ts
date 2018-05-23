---
id: ReaderTaskEither
title: Module ReaderTaskEither
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts)

## Data

### ReaderTaskEither

_data_

_since 1.6.0_

_Signature_

```ts
constructor(readonly value: (e: E) => TaskEither<L, A>) {}
```

## Methods

### alt

_method_

_since 1.6.0_

_Signature_

```ts
(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>
```

### ap

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>
```

### ap\_

_method_

_since 1.6.0_

_Signature_

```ts
<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>
```

### applyFirst

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A>
```

_Description_

Combine two effectful actions, keeping only the result of the first

### applySecond

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>
```

_Description_

Combine two effectful actions, keeping only the result of the second

### bimap

_method_

_since 1.6.0_

_Signature_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B>
```

### chain

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>
```

### fold

_method_

_since 1.6.0_

_Signature_

```ts
<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>>
```

### map

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>
```

### mapLeft

_method_

_since 1.6.0_

_Signature_

```ts
<M>(f: (l: L) => M): ReaderTaskEither<E, M, A>
```

### orElse

_method_

_since 1.6.0_

_Signature_

```ts
<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>
```

_Description_

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

### run

_method_

_since 1.0.0_

_Signature_

```ts
(e: E): Promise<Either<L, A>>
```

_Description_

Runs the inner `TaskEither`

## Instances

### readerTaskEither

_instance_

_since 1.6.0_

_Signature_

```ts
Monad3<URI> & Bifunctor3<URI> & Alt3<URI>
```

## Functions

### ask

_function_

_since 1.6.0_

_Signature_

```ts
<E, L>(): ReaderTaskEither<E, L, E>
```

### asks

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A>
```

### fromEither

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A>
```

### fromIO

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A>
```

### fromIOEither

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A>
```

### fromLeft

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(l: L): ReaderTaskEither<E, L, A>
```

### fromPredicate

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (
  a: A
): ReaderTaskEither<E, L, A>
```

### fromReader

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A>
```

### fromTaskEither

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A>
```

### left

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A>
```

### local

_function_

_since 1.6.0_

_Signature_

```ts
<E>(f: (e: E) => E) => <L, A>(fa: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>
```

### right

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A>
```

### tryCatch

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: {}) => L
): ReaderTaskEither<E, L, A>
```
