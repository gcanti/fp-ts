---
id: NonEmptyArray
title: Module NonEmptyArray
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

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

## ap\_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

Added in v1.0.0 (method)

Same as [ap](#ap) but works on [NonEmptyArray](./NonEmptyArray.md) of functions and accepts [NonEmptyArray](./NonEmptyArray.md) of values instead

## chain

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Chain](./Chain.md)

## concat

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Semigroup](./Semigroup.md)

_Example_

```ts
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
assert.deepEqual(new NonEmptyArray(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

## extend

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
```

Added in v1.0.0 (method)

Instance-bound implementation of [Extend](./Extend.md)

## extract

```ts
(): A
```

Added in v1.0.0 (method)

Instance-bound implementation of [Comonad](./Comonad.md)

_Example_

```ts
assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
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
const last = new NonEmptyArray(1, [2, 3]).last() // 3
const last = new NonEmptyArray(1, []).last() // 1
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

## max

```ts
(ord: Ord<A>): A
```

Added in v1.3.0 (method)

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const maximum = new NonEmptyArray(1, [2, 3]).max(ordNumber) // 3
```

## min

```ts
(ord: Ord<A>): A
```

Added in v1.3.0 (method)

Gets minimum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const minimum = new NonEmptyArray(1, [2, 3]).min(ordNumber) // 1
```

## reduce

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

Added in v1.0.0 (method)

Instance-bound implementation of [Foldable](./Foldable.md)

## reverse

```ts
(): NonEmptyArray<A>
```

Added in v1.6.0 (method)

Reverts this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
const result = new NonEmptyArray(1, [2, 3]).reverse()
const expected = new NonEmptyArray(3, [2, 1])
assert.deepEqual(result, expected)
```

## sort

```ts
(ord: Ord<A>): NonEmptyArray<A>
```

Added in v1.6.0 (method)

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const result = new NonEmptyArray(3, [2, 1]).sort(ordNumber)
const expected = new NonEmptyArray(1, [2, 3])
assert.deepEqual(result, expected)
```

## toArray

```ts
(): Array<A>
```

Added in v1.0.0 (method)

Converts this [NonEmptyArray](./NonEmptyArray.md) to plain [Array](./Array.md)

_Example_

```ts
assert.deepEqual(new NonEmptyArray(1, [2, 3]), [1, 2, 3])
```

## toString

```ts
(): string
```

Added in v1.0.0 (method)

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

## nonEmptyArray

```ts
Monad1<URI> & Comonad1<URI> & Foldable2v1<URI> & Traversable2v1<URI>
```

Added in v1.0.0 (instance)

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
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```
