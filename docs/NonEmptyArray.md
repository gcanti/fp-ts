---
id: NonEmptyArray
title: Module NonEmptyArray
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

## nonEmptyArray

```ts
Monad1<URI> &
  Comonad1<URI> &
  Foldable2v1<URI> &
  Traversable2v1<URI> &
  FunctorWithIndex1<URI, number>
```

Added in v1.0.0 (instance)

# NonEmptyArray

```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```

Added in v1.0.0 (data)

Data structure which represents non-empty arrays

## ap

```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Apply](./Apply.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number): number => n * 2
assert.deepEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
```

## ap\_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number) => n * 2
assert.deepEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
```

## chain

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Chain](./Chain.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const f = (a: number) => new NonEmptyArray(a, [4])
assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
```

## concat

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Semigroup](./Semigroup.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

## concatArray

```ts
(as: Array<A>): NonEmptyArray<A>
```

Added in v1.0.0 (method)

Concatenates this [NonEmptyArray](./NonEmptyArray.md) and passed [Array](./Array.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

## extend

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Extend](./Extend.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { fold, monoidSum } from 'fp-ts/lib/Monoid'

const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
```

## extract

```ts
(): A
```

Added in v1.0.0 (method)

Instance-bound implementation of [Comonad](./Comonad.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
```

## filter

```ts
(predicate: Predicate<A>): Option<NonEmptyArray<A>>
```

Added in v1.11.0 (method)

Filter an NonEmptyArray, keeping the elements which satisfy a predicate function, creating a new NonEmptyArray or returning `None` in case the resulting NonEmptyArray would have no remaining elements.

## findFirst

```ts
(predicate: Predicate<A>): Option<A>
```

Added in v1.11.0 (method)

Find the first element which satisfies a predicate (or a refinement) function

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findFirst(x => x.a === 1), some({ a: 1, b: 1 }))
```

## findIndex

```ts
(predicate: Predicate<A>): Option<number>
```

Added in v1.11.0 (method)

Find the first index for which a predicate holds

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).findIndex(x => x === 2), some(1))
assert.deepEqual(new NonEmptyArray<number>(1, []).findIndex(x => x === 2), none)
```

## findLast

```ts
(predicate: Predicate<A>): Option<A>
```

Added in v1.11.0 (method)

Find the last element which satisfies a predicate function

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findLast(x => x.a === 1), some({ a: 1, b: 2 }))
```

## findLastIndex

```ts
(predicate: Predicate<A>): Option<number>
```

Added in v1.11.0 (method)

Returns the index of the last element of the list which matches the predicate

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

interface X {
  a: number
  b: number
}
const xs: NonEmptyArray<X> = new NonEmptyArray({ a: 1, b: 0 }, [{ a: 1, b: 1 }])
assert.deepEqual(xs.findLastIndex(x => x.a === 1), some(1))
assert.deepEqual(xs.findLastIndex(x => x.a === 4), none)
```

## index

```ts
(i: number): Option<A>
```

Added in v1.11.0 (method)

This function provides a safe way to read a value at a particular index from an NonEmptyArray

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).index(1), some(2))
assert.deepEqual(new NonEmptyArray(1, [2, 3]).index(3), none)
```

## insertAt

```ts
(i: number, a: A): Option<NonEmptyArray<A>>
```

Added in v1.11.0 (method)

Insert an element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).insertAt(2, 5), some(new NonEmptyArray(1, [2, 5, 3, 4])))
```

## inspect

```ts
(): string
```

Added in v1.0.0 (method)

Same as [toString](#tostring)

## last

```ts
(): A
```

Added in v1.6.0 (method)

Gets last element of this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
assert.strictEqual(new NonEmptyArray(1, []).last(), 1)
```

## length

```ts
(): number
```

Added in v1.10.0 (method)

## map

```ts
<B>(f: (a: A) => B): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Functor](./Functor.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const double = (n: number): number => n * 2
assert.deepEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
```

## mapWithIndex

```ts
<B>(f: (i: number, a: A) => B): NonEmptyArray<B>
```

Added in v1.0.0 (method)

## max

```ts
(ord: Ord<A>): A
```

Added in v1.3.0 (method)

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
```

## min

```ts
(ord: Ord<A>): A
```

Added in v1.3.0 (method)

Gets minimum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
```

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

Instance-bound implementation of [Foldable](./Foldable.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray('a', ['b'])
assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
```

## reverse

```ts
(): NonEmptyArray<A>
```

Added in v1.6.0 (method)

Reverts this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
```

## sort

```ts
(ord: Ord<A>): NonEmptyArray<A>
```

Added in v1.6.0 (method)

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
```

## toArray

```ts
(): Array<A>
```

Added in v1.0.0 (method)

Converts this [NonEmptyArray](./NonEmptyArray.md) to plain [Array](./Array.md)

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
```

## toString

```ts
(): string
```

Added in v1.0.0 (method)

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

## updateAt

```ts
(i: number, a: A): Option<NonEmptyArray<A>>
```

Added in v1.11.0 (method)

Change the element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

_Example_

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).updateAt(1, 1), some(new NonEmptyArray(1, [1, 3])))
assert.deepEqual(new NonEmptyArray(1, []).updateAt(1, 1), none)
```

## fromArray

```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

Added in v1.0.0 (function)

Builds [NonEmptyArray](./NonEmptyArray.md) from [Array](./Array.md) returning [Option#none](./Option.md#none) or [Option#some](./Option.md#some) depending on amount of values in passed array

## getSemigroup

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```

Added in v1.0.0 (function)

Builds [Semigroup](./Semigroup.md) instance for [NonEmptyArray](./NonEmptyArray.md) of specified type arument

## group

```ts
<A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>>
```

Added in v1.7.0 (function)

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

## groupBy

```ts
<A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> }
```

Added in v1.10.0 (function)

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

## groupSort

```ts
<A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>)
```

Added in v1.7.0 (function)

Sort and then group the elements of an array into non empty arrays.

_Example_

```ts
import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```
