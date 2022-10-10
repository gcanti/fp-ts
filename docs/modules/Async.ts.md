---
title: Async.ts
nav_order: 1
parent: Modules
---

## Async overview

`Async<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.

```ts
interface Async<A> {
  (): Promise<A>
}
```

If you want to represent an asynchronous computation that may fail, please see `AsyncResult`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [of](#of)
  - [sleep](#sleep)
- [conversions](#conversions)
  - [fromSync](#fromsync)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindRightPar](#bindrightpar)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [ApplicativePar](#applicativepar)
  - [Apply](#apply)
  - [ApplyPar](#applypar)
  - [CategoryKind](#categorykind)
  - [Flattenable](#flattenable)
  - [FromAsync](#fromasync)
  - [FromIdentity](#fromidentity)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [getRaceMonoid](#getracemonoid)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift2Par](#lift2par)
  - [lift3](#lift3)
  - [lift3Par](#lift3par)
  - [liftSync](#liftsync)
- [logging](#logging)
  - [log](#log)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [Async (interface)](#async-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapSync](#flatmapsync)
  - [zipLeft](#zipleft)
  - [zipLeftPar](#zipleftpar)
  - [zipRight](#zipright)
  - [zipRightPar](#ziprightpar)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayPar](#traversenonemptyreadonlyarraypar)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseNonEmptyReadonlyArrayWithIndexPar](#traversenonemptyreadonlyarraywithindexpar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipFlattenPar](#zipflattenpar)
  - [zipWith](#zipwith)
  - [zipWithPar](#zipwithpar)
- [type lambdas](#type-lambdas)
  - [AsyncTypeLambda (interface)](#asynctypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [apPar](#appar)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [never](#never)
  - [tap](#tap)

---

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Async<A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => Async<void>
```

Added in v3.0.0

# conversions

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(fa: Sync<A>) => Async<A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Async<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRightPar

A variant of `bind` that ignores the scope in parallel.

**Signature**

```ts
export declare const bindRightPar: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Async<A>) => Async<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<AsyncTypeLambda>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<AsyncTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<AsyncTypeLambda>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: apply.Apply<AsyncTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: kleisliCategory.KleisliCategory<AsyncTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<AsyncTypeLambda>
```

Added in v3.0.0

## FromAsync

**Signature**

```ts
export declare const FromAsync: fromAsync_.FromAsync<AsyncTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<AsyncTypeLambda>
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: fromSync_.FromSync<AsyncTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<AsyncTypeLambda>
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: kleisliComposable.KleisliComposable<AsyncTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<AsyncTypeLambda>
```

Added in v3.0.0

## getRaceMonoid

Monoid returning the first completed async.

Note: uses `Promise.race` internally.

**Signature**

```ts
export declare const getRaceMonoid: <A>() => Monoid<Async<A>>
```

**Example**

```ts
import * as T from 'fp-ts/Async'
import { pipe } from 'fp-ts/Function'

async function test() {
  const S = T.getRaceMonoid<string>()
  const fa = T.delay(20)(T.of('a'))
  const fb = T.delay(10)(T.of('b'))
  assert.deepStrictEqual(await pipe(fa, S.combine(fb))(), 'b')
}

test()
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Async`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C>
```

Added in v3.0.0

## lift2Par

Lifts a binary function into `Async` in parallel.

**Signature**

```ts
export declare const lift2Par: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Async`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D>
```

Added in v3.0.0

## lift3Par

Lifts a ternary function into `Async` in parallel.

**Signature**

```ts
export declare const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(f: (...a: A) => Sync<B>) => (...a: A) => Async<B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <A extends readonly unknown[]>(...x: A) => Async<void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: Async<unknown>) => Async<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Async<A>) => Async<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: Async<unknown>) => Async<void>
```

Added in v3.0.0

# model

## Async (interface)

**Signature**

```ts
export interface Async<A> {
  (): Promise<A>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Async<B>) => (self: Async<A>) => Async<B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: Async<A>) => Async<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly Async<A>[]) => Async<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <A>(arr: readonly Async<A>[]) => Async<readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayPar

Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayPar: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndexPar

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => Async<B>) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Async<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Async<A>) => Async<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: Async<B>
) => <A extends readonly unknown[]>(self: Async<A>) => Async<readonly [...A, B]>
```

Added in v3.0.0

## zipFlattenPar

Zips this effect with the specified effect in parallel.

**Signature**

```ts
export declare const zipFlattenPar: <B>(
  fb: Async<B>
) => <A extends readonly unknown[]>(self: Async<A>) => Async<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C>
```

Added in v3.0.0

## zipWithPar

Zips this effect with the specified effect using the specified combiner function in parallel.

**Signature**

```ts
export declare const zipWithPar: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C>
```

Added in v3.0.0

# type lambdas

## AsyncTypeLambda (interface)

**Signature**

```ts
export interface AsyncTypeLambda extends TypeLambda {
  readonly type: Async<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Async<A>) => <B>(self: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## apPar

**Signature**

```ts
export declare const apPar: <A>(fa: Async<A>) => <B>(fab: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(
  bfc: (b: B) => Async<C>
) => <A>(afb: (a: A) => Async<B>) => (a: A) => Async<C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <A>(self: Async<A>) => Async<A>
```

**Example**

```ts
import { pipe } from 'fp-ts/Function'
import * as T from 'fp-ts/Async'

async function test() {
  const log: Array<string> = []

  const append = (message: string): T.Async<void> =>
    T.fromSync(() => {
      log.push(message)
    })

  await pipe(
    T.Do,
    T.bindRightPar('a', append('a')),
    T.bindRightPar('b', pipe(append('b'), T.delay(20))),
    T.bindRightPar('c', pipe(append('c'), T.delay(10)))
  )()
  assert.deepStrictEqual(log, ['a', 'c', 'b'])
}

test()
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Async<Async<A>>) => Async<A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => Async<A>
```

Added in v3.0.0

## never

An `Async` that never completes.

**Signature**

```ts
export declare const never: Async<never>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => Async<unknown>) => (self: Async<A>) => Async<A>
```

Added in v3.0.0
