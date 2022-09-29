---
title: IO.ts
nav_order: 52
parent: Modules
---

## IO overview

```ts
interface IO<A> {
  (): A
}
```

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**.

If you want to represent a synchronous computation that may fail, please see `IOEither`.
If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [FlattenableRec](#flattenablerec)
  - [flatMapRec](#flatmaprec)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [ap](#ap)
  - [flap](#flap)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [tap](#tap)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec-1)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [model](#model)
  - [IO (interface)](#io-interface)
- [struct sequencing](#struct-sequencing)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [tuple sequencing](#tuple-sequencing)
  - [DoTuple](#dotuple)
  - [bindTuple](#bindtuple)
  - [bindTupleRight](#bindtupleright)
  - [tupled](#tupled)
- [type lambdas](#type-lambdas)
  - [IOTypeLambda (interface)](#iotypelambda-interface)
- [utils](#utils)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [unit](#unit)

---

# FlattenableRec

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, B>(f: (a: A) => IO<Either<A, B>>) => (a: A) => IO<B>
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v3.0.0

# combinators

## ap

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => IO<B>) => (self: IO<A>) => IO<B>
```

Added in v3.0.0

## flatten

Derivable from `Flattenable`.

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => IO<_>) => (self: IO<A>) => IO<A>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <_>(that: IO<_>) => <A>(self: IO<A>) => IO<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: IO<A>) => <_>(self: IO<_>) => IO<A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IOTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<IOTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<IOTypeLambda>
```

Added in v3.0.0

## FlattenableRec

**Signature**

```ts
export declare const FlattenableRec: flatMapableRec.FlattenableRec<IOTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<IOTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<IOTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IOTypeLambda>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IOTypeLambda>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => IO<void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => IO<void>
```

Added in v3.0.0

# model

## IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v3.0.0

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: IO<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: IO<A>) => IO<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: IO<A>) => IO<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# tuple sequencing

## DoTuple

**Signature**

```ts
export declare const DoTuple: IO<readonly []>
```

Added in v3.0.0

## bindTuple

**Signature**

```ts
export declare const bindTuple: <A extends readonly unknown[], B>(
  f: (a: A) => IO<B>
) => (self: IO<A>) => IO<readonly [...A, B]>
```

Added in v3.0.0

## bindTupleRight

**Signature**

```ts
export declare const bindTupleRight: <B>(
  fb: IO<B>
) => <A extends readonly unknown[]>(self: IO<A>) => IO<readonly [...A, B]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: IO<A>) => IO<readonly [A]>
```

Added in v3.0.0

# type lambdas

## IOTypeLambda (interface)

**Signature**

```ts
export interface IOTypeLambda extends TypeLambda {
  readonly type: IO<this['Out1']>
}
```

Added in v3.0.0

# utils

## lift2

Lifts a binary function into `IO`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: IO<A>, fb: IO<B>) => IO<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `IO`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: IO<A>, fb: IO<B>, fc: IO<C>) => IO<D>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly IO<A>[]) => IO<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => IO<B>) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => IO<B>
) => (as: readonly [A, ...A[]]) => IO<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: readonly [A, ...A[]]) => IO<readonly [B, ...B[]]>
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: IO<void>
```

Added in v3.0.0
