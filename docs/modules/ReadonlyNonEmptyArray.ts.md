---
title: ReadonlyNonEmptyArray.ts
nav_order: 71
parent: Modules
---

## ReadonlyNonEmptyArray overview

Data structure which represents non-empty arrays

Added in v2.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Extend](#extend)
  - [duplicate](#duplicate)
  - [extend](#extend)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [FoldableWithIndex](#foldablewithindex)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [group](#group)
  - [groupSort](#groupsort)
  - [reverse](#reverse)
  - [sort](#sort)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [concat](#concat)
  - [cons](#cons)
  - [fromArray](#fromarray)
  - [fromReadonlyArray](#fromreadonlyarray)
  - [groupBy](#groupby)
  - [snoc](#snoc)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [FoldableWithIndex](#foldablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Monad](#monad-1)
  - [Traversable](#traversable)
  - [TraversableWithIndex](#traversablewithindex)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [readonlyNonEmptyArray](#readonlynonemptyarray)
- [model](#model)
  - [ReadonlyNonEmptyArray (type alias)](#readonlynonemptyarray-type-alias)
- [utils](#utils)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [extract](#extract)
  - [filter](#filter)
  - [filterWithIndex](#filterwithindex)
  - [fold](#fold)
  - [head](#head)
  - [init](#init)
  - [insertAt](#insertat)
  - [last](#last)
  - [max](#max)
  - [min](#min)
  - [modifyAt](#modifyat)
  - [sequence](#sequence)
  - [tail](#tail)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
  - [unzip](#unzip)
  - [updateAt](#updateat)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(
  that: Lazy<ReadonlyNonEmptyArray<A>>
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.6.2

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(
  fa: ReadonlyNonEmptyArray<A>
) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(
  fb: ReadonlyNonEmptyArray<B>
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(
  fb: ReadonlyNonEmptyArray<B>
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(
  f: (fa: ReadonlyNonEmptyArray<A>) => B
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# FoldableWithIndex

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <S>(
  S: Semigroup<S>
) => <A>(f: (i: number, a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) => S
```

Added in v2.5.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <A, B>(
  b: B,
  f: (i: number, a: A, b: B) => B
) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <A, B>(
  b: B,
  f: (i: number, b: B, a: A) => B
) => (fa: ReadonlyNonEmptyArray<A>) => B
```

Added in v2.5.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# FunctorWithIndex

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B>
```

Added in v2.5.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

# combinators

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature**

```ts
export declare function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
```

**Example**

```ts
import { cons, group } from 'fp-ts/ReadonlyNonEmptyArray'
import { ordNumber } from 'fp-ts/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [cons(1, []), cons(2, []), cons(1, [1])])
```

Added in v2.5.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature**

```ts
export declare function groupSort<B>(
  O: Ord<B>
): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
```

**Example**

```ts
import { cons, groupSort } from 'fp-ts/ReadonlyNonEmptyArray'
import { ordNumber } from 'fp-ts/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
```

Added in v2.5.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## sort

**Signature**

```ts
export declare function sort<B>(O: Ord<B>): <A extends B>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## zip

**Signature**

```ts
export declare const zip: {
  <B>(bs: ReadonlyNonEmptyArray<B>): <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>
  <A, B>(as: ReadonlyNonEmptyArray<A>, bs: ReadonlyNonEmptyArray<B>): ReadonlyNonEmptyArray<readonly [A, B]>
}
```

Added in v2.5.1

## zipWith

**Signature**

```ts
export declare const zipWith: <A, B, C>(
  fa: ReadonlyNonEmptyArray<A>,
  fb: ReadonlyNonEmptyArray<B>,
  f: (a: A, b: B) => C
) => ReadonlyNonEmptyArray<C>
```

Added in v2.5.1

# constructors

## concat

**Signature**

```ts
export declare function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export declare function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
```

Added in v2.5.0

## cons

Append an element to the front of an array, creating a new non empty array

**Signature**

```ts
export declare const cons: <A>(head: A, tail: readonly A[]) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { cons } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
```

Added in v2.5.0

## fromArray

**Signature**

```ts
export declare function fromArray<A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## fromReadonlyArray

Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array

**Signature**

```ts
export declare function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature**

```ts
export declare function groupBy<B>(
  f: (a: B) => string
): <A extends B>(as: ReadonlyArray<A>) => ReadonlyRecord<string, ReadonlyNonEmptyArray<A>>
```

**Example**

```ts
import { cons, groupBy } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
  '3': cons('foo', ['bar']),
  '6': cons('foobar', []),
})
```

Added in v2.5.0

## snoc

Append an element to the end of an array, creating a new non empty array

**Signature**

```ts
export declare const snoc: <A>(init: readonly A[], end: A) => ReadonlyNonEmptyArray<A>
```

**Example**

```ts
import { snoc } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
```

Added in v2.5.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## FoldableWithIndex

**Signature**

```ts
export declare const FoldableWithIndex: FoldableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'ReadonlyNonEmptyArray'>
```

Added in v2.7.0

## TraversableWithIndex

**Signature**

```ts
export declare const TraversableWithIndex: TraversableWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'ReadonlyNonEmptyArray'
```

Added in v2.5.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.5.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>>
```

**Example**

```ts
import { getEq, cons } from 'fp-ts/ReadonlyNonEmptyArray'
import { eqNumber } from 'fp-ts/Eq'

const E = getEq(eqNumber)
assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
```

Added in v2.5.0

## getSemigroup

Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`

**Signature**

```ts
export declare function getSemigroup<A = never>(): Semigroup<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## readonlyNonEmptyArray

**Signature**

```ts
export declare const readonlyNonEmptyArray: Monad1<'ReadonlyNonEmptyArray'> &
  Comonad1<'ReadonlyNonEmptyArray'> &
  TraversableWithIndex1<'ReadonlyNonEmptyArray', number> &
  FunctorWithIndex1<'ReadonlyNonEmptyArray', number> &
  FoldableWithIndex1<'ReadonlyNonEmptyArray', number> &
  Alt1<'ReadonlyNonEmptyArray'>
```

Added in v2.5.0

# model

## ReadonlyNonEmptyArray (type alias)

**Signature**

```ts
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}
```

Added in v2.5.0

# utils

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: ReadonlyNonEmptyArray<B>
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<{ [K in N]: A }>
```

Added in v2.8.0

## extract

**Signature**

```ts
export declare const extract: <A>(wa: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.6.3

## filter

**Signature**

```ts
export declare function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export declare function filter<A>(
  predicate: Predicate<A>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## filterWithIndex

**Signature**

```ts
export declare function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## fold

**Signature**

```ts
export declare function fold<A>(S: Semigroup<A>): (fa: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## head

**Signature**

```ts
export declare function head<A>(nea: ReadonlyNonEmptyArray<A>): A
```

Added in v2.5.0

## init

Get all but the last element of a non empty array, creating a new array.

**Signature**

```ts
export declare function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>
```

**Example**

```ts
import { init } from 'fp-ts/ReadonlyNonEmptyArray'

assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
assert.deepStrictEqual(init([1]), [])
```

Added in v2.5.0

## insertAt

**Signature**

```ts
export declare function insertAt<A>(
  i: number,
  a: A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## last

**Signature**

```ts
export declare function last<A>(nea: ReadonlyNonEmptyArray<A>): A
```

Added in v2.5.0

## max

**Signature**

```ts
export declare function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## min

**Signature**

```ts
export declare function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A
```

Added in v2.5.0

## modifyAt

**Signature**

```ts
export declare function modifyAt<A>(
  i: number,
  f: (a: A) => A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'ReadonlyNonEmptyArray'>
```

Added in v2.6.3

## tail

**Signature**

```ts
export declare function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A>
```

Added in v2.5.0

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'ReadonlyNonEmptyArray'>
```

Added in v2.6.3

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: PipeableTraverseWithIndex1<'ReadonlyNonEmptyArray', number>
```

Added in v2.6.3

## unzip

**Signature**

```ts
export declare const unzip: <A, B>(
  as: ReadonlyNonEmptyArray<readonly [A, B]>
) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>]
```

Added in v2.5.1

## updateAt

**Signature**

```ts
export declare function updateAt<A>(
  i: number,
  a: A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
```

Added in v2.5.0
