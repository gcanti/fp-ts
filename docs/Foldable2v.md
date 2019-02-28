---
id: Foldable2v
title: Foldable2v
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable2v.ts)

# Foldable2v

**Signature** (type class)

```ts
export interface Foldable2v<F> extends Foldable<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v1.10.0

## elem

Test whether a value is an element of a data structure

**Signature** (function)

```ts
export function elem<F, A>(S: Setoid<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean  { ... }
```

**Example**

```ts
import { elem } from 'fp-ts/lib/Foldable2v'
import { setoidNumber } from 'fp-ts/lib/Setoid'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(elem(setoidNumber, tree)(2, t), true)
assert.strictEqual(elem(setoidNumber, tree)(5, t), false)
```

Added in v1.14.0

## findFirst

Find the first element which satisfies a predicate function

**Signature** (function)

```ts
export function findFirst<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>  { ... }
```

**Example**

```ts
import { findFirst } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'
import { some } from 'fp-ts/lib/Option'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(findFirst(tree)(t, a => a > 2), some(3))
```

Added in v1.10.0

## fold

A generalization of monoidal `fold`

**Signature** (function)

```ts
export function fold<M, F>(M: Monoid<M>, F: Foldable2v<F>): (fa: HKT<F, M>) => M  { ... }
```

**Example**

```ts
import { fold } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'
import { monoidSum } from 'fp-ts/lib/Monoid'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(fold(monoidSum, tree)(t), 10)
```

Added in v1.10.0

## foldM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature** (function)

```ts
export function foldM<M, F>(
  M: Monad<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B>  { ... }
```

**Example**

```ts
import { foldM } from 'fp-ts/lib/Foldable2v'
import { option, some } from 'fp-ts/lib/Option'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(foldM(option, tree)(t, 0, (b, a) => (a > 2 ? some(b + a) : some(b))), some(7))
```

Added in v1.10.0

## getFoldableComposition

Returns the composition of two foldables

**Signature** (function)

```ts
export function getFoldableComposition<F, G>(F: Foldable2v<F>, G: Foldable2v<G>): Foldable2vComposition<F, G>  { ... }
```

**Example**

```ts
import { getFoldableComposition } from 'fp-ts/lib/Foldable2v'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidString } from 'fp-ts/lib/Monoid'

const F = getFoldableComposition(array, option)
assert.strictEqual(F.reduce([some('a'), some('b'), some('c')], '', monoidString.concat), 'abc')
assert.strictEqual(F.reduce([some('a'), none, some('c')], '', monoidString.concat), 'ac')
```

Added in v1.10.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature** (function)

```ts
export function intercalate<M, F>(M: Monoid<M>, F: Foldable2v<F>): (sep: M, fm: HKT<F, M>) => M  { ... }
```

**Example**

```ts
import { intercalate } from 'fp-ts/lib/Foldable2v'
import { monoidString } from 'fp-ts/lib/Monoid'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree('a', [new Tree('b', []), new Tree('c', []), new Tree('d', [])])
assert.strictEqual(intercalate(monoidString, tree)('|', t), 'a|b|c|d')
```

Added in v1.10.0

## max

Find the largest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function max<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>  { ... }
```

**Example**

```ts
import { max } from 'fp-ts/lib/Foldable2v'
import { some } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(max(ordNumber, tree)(t), some(4))
```

Added in v1.10.0

## ~~member~~

Use [elem](#elem) instead

**Signature** (function)

```ts
export function member<F, A>(S: Setoid<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean  { ... }
```

Added in v1.10.0

## min

Find the smallest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function min<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>  { ... }
```

**Example**

```ts
import { min } from 'fp-ts/lib/Foldable2v'
import { some } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(min(ordNumber, tree)(t), some(1))
```

Added in v1.10.0

## oneOf

Combines a collection of elements using the `Alt` operation

**Signature** (function)

```ts
export function oneOf<P, F>(P: Plus<P>, F: Foldable2v<F>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { oneOf } from 'fp-ts/lib/Foldable2v'
import { option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(oneOf(option, array)([some(2), some(1)]), some(2))
```

Added in v1.10.0

## product

Find the product of the numeric values in a data structure

**Signature** (function)

```ts
export function product<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A  { ... }
```

**Example**

```ts
import { fieldNumber } from 'fp-ts/lib/Field'
import { product } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(product(fieldNumber, tree)(t), 24)
```

Added in v1.10.0

## sequence\_

Perform all of the effects in some data structure in the order given by the `Foldable2v` instance, ignoring the final result.

**Signature** (function)

```ts
export function sequence_<M, F>(M: Applicative<M>, F: Foldable2v<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { sequence_ } from 'fp-ts/lib/Foldable2v'
import { io, IO } from 'fp-ts/lib/IO'

let log = ''
const append = (s: string) => new IO(() => (log += s))
sequence_(io, array)([append('a'), append('b'), append('c')]).run()
assert.strictEqual(log, 'abc')
```

Added in v1.10.0

## sum

Find the sum of the numeric values in a data structure

**Signature** (function)

```ts
export function sum<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A  { ... }
```

**Example**

```ts
import { fieldNumber } from 'fp-ts/lib/Field'
import { sum } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(sum(fieldNumber, tree)(t), 10)
```

Added in v1.10.0

## toArray

Transforms a foldable into an array

**Signature** (function)

```ts
export function toArray<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>) => Array<A>  { ... }
```

**Example**

```ts
import { toArray } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(toArray(tree)(t), [1, 2, 3, 4])
```

Added in v1.10.0

## traverse\_

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature** (function)

```ts
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>  { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { traverse_ } from 'fp-ts/lib/Foldable2v'
import { io, IO } from 'fp-ts/lib/IO'

let log = ''
const append = (s: string) => new IO(() => (log += s))
traverse_(io, array)(['a', 'b', 'c'], append).run()
assert.strictEqual(log, 'abc')
```

Added in v1.10.0
