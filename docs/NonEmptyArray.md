---
id: NonEmptyArray
title: Module NonEmptyArray
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

## Data

### NonEmptyArray

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```

_Description_

Data structure which represents non-empty arrays

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Apply](./Apply.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number): number => n * 2
assert.deepEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

_Description_

Same as [ap](#ap) but works on [NonEmptyArray](./NonEmptyArray.md) of functions and accepts [NonEmptyArray](./NonEmptyArray.md) of values instead

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number) => n * 2
assert.deepEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Chain](./Chain.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const f = (a: number) => new NonEmptyArray(a, [4])
assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
```

### concat

_method_

_since 1.0.0_

_Signature_

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

_Description_

Instance-bound implementation of [Semigroup](./Semigroup.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

### concatArray

_method_

_since 1.0.0_

_Signature_

```ts
(as: Array<A>): NonEmptyArray<A>
```

_Description_

Concatenates this [NonEmptyArray](./NonEmptyArray.md) and passed [Array](./Array.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Extend](./Extend.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { fold, monoidSum } from 'fp-ts/lib/Monoid'

const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
```

### extract

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

_Description_

Instance-bound implementation of [Comonad](./Comonad.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
```

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

_Description_

Same as [toString](#tostring)

### last

_method_

_since 1.6.0_

_Signature_

```ts
(): A
```

_Description_

Gets last element of this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
assert.strictEqual(new NonEmptyArray(1, []).last(), 1)
```

### length

_method_

_since 1.10.0_

_Signature_

```ts
(): number
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Functor](./Functor.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const double = (n: number): number => n * 2
assert.deepEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
```

### max

_method_

_since 1.3.0_

_Signature_

```ts
(ord: Ord<A>): A
```

_Description_

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
```

### min

_method_

_since 1.3.0_

_Signature_

```ts
(ord: Ord<A>): A
```

_Description_

Gets minimum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

_Description_

Instance-bound implementation of [Foldable](./Foldable.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray('a', ['b'])
assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
```

### reverse

_method_

_since 1.6.0_

_Signature_

```ts
(): NonEmptyArray<A>
```

_Description_

Reverts this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
```

### sort

_method_

_since 1.6.0_

_Signature_

```ts
(ord: Ord<A>): NonEmptyArray<A>
```

_Description_

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
```

### toArray

_method_

_since 1.0.0_

_Signature_

```ts
(): Array<A>
```

_Description_

Converts this [NonEmptyArray](./NonEmptyArray.md) to plain [Array](./Array.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

_Description_

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

## Instances

### nonEmptyArray

_instance_

_since 1.0.0_

_Signature_

```ts
Monad1<URI> & Comonad1<URI> & Foldable2v1<URI> & Traversable2v1<URI>
```

## Functions

### fromArray

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

_Description_

Builds [NonEmptyArray](./NonEmptyArray.md) from [Array](./Array.md) returning [Option#none](./Option.md#none) or [Option#some](./Option.md#some) depending on amount of values in passed array

### getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```

_Description_

Builds [Semigroup](./Semigroup.md) instance for [NonEmptyArray](./NonEmptyArray.md) of specified type arument

### group

_function_

_since 1.7.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>>
```

_Description_

Group equal, consecutive elements of an array into non empty arrays.

_Example_

```ts
import { NonEmptyArray, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(group(ordNumber)([1, 2, 1, 1]), [
  new NonEmptyArray(1, []),
  new NonEmptyArray(2, []),
  new NonEmptyArray(1, [1])
])
```

### groupBy

_function_

_since 1.10.0_

_Signature_

```ts
<A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> }
```

_Description_

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

_Example_

```ts
import { NonEmptyArray, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
  '3': new NonEmptyArray('foo', ['bar']),
  '6': new NonEmptyArray('foobar', [])
})
```

### groupSort

_function_

_since 1.7.0_

_Signature_

```ts
<A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>)
```

_Description_

Sort and then group the elements of an array into non empty arrays.

_Example_

```ts
import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```
