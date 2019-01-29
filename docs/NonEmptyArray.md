---
id: NonEmptyArray
title: Module NonEmptyArray
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

## nonEmptyArray

**Signature** (instance) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L642-L665)

```ts
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = { ... }
```

Added in v1.0.0

# NonEmptyArray

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L45-L449)

```ts
export class NonEmptyArray<A> {
  constructor(readonly head: A, readonly tail: Array<A>) {}
  ...
}
```

Data structure which represents non-empty arrays

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L97-L99)

```ts
ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number): number => n * 2
assert.deepEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L111-L113)

```ts
ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number) => n * 2
assert.deepEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L123-L125)

```ts
chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const f = (a: number) => new NonEmptyArray(a, [4])
assert.deepEqual(x.chain(f).toArray(), [1, 4, 2, 4])
```

Added in v1.0.0

## concat

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L135-L137)

```ts
concat(y: NonEmptyArray<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

Added in v1.0.0

## concatArray

Concatenates this [NonEmptyArray](./NonEmptyArray.md) and passed [Array](./Array.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L70-L72)

```ts
concatArray(as: Array<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

Added in v1.0.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L179-L181)

```ts
extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { fold, monoidSum } from 'fp-ts/lib/Monoid'

const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L189-L191)

```ts
extract(): A  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
```

Added in v1.0.0

## filter

Filter an NonEmptyArray, keeping the elements which satisfy a predicate function, creating a new NonEmptyArray or returning `None` in case the resulting NonEmptyArray would have no remaining elements.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L437-L439)

```ts
filter(predicate: Predicate<A>): Option<NonEmptyArray<A>>  { ... }
```

Added in v1.11.0

## filterWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L445-L448)

```ts
filterWithIndex(predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>>  { ... }
```

Added in v1.12.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L319-L321)

```ts
findFirst(predicate: Predicate<A>): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findFirst(x => x.a === 1), some({ a: 1, b: 1 }))
```

Added in v1.11.0

## findIndex

Find the first index for which a predicate holds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L354-L361)

```ts
findIndex(predicate: Predicate<A>): Option<number>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).findIndex(x => x === 2), some(1))
assert.deepEqual(new NonEmptyArray<number>(1, []).findIndex(x => x === 2), none)
```

Added in v1.11.0

## findLast

Find the last element which satisfies a predicate function

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L336-L339)

```ts
findLast(predicate: Predicate<A>): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findLast(x => x.a === 1), some({ a: 1, b: 2 }))
```

Added in v1.11.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L381-L384)

```ts
findLastIndex(predicate: Predicate<A>): Option<number>  { ... }
```

**Example**

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

Added in v1.11.0

## foldr

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L160-L162)

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## foldrWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L167-L169)

```ts
foldrWithIndex<B>(b: B, f: (i: number, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## index

This function provides a safe way to read a value at a particular index from an NonEmptyArray

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L302-L304)

```ts
index(i: number): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).index(1), some(2))
assert.deepEqual(new NonEmptyArray(1, [2, 3]).index(3), none)
```

Added in v1.11.0

## insertAt

Insert an element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L398-L405)

```ts
insertAt(i: number, a: A): Option<NonEmptyArray<A>>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3, 4]).insertAt(2, 5), some(new NonEmptyArray(1, [2, 5, 3, 4])))
```

Added in v1.11.0

## inspect

Same as [toString](#tostring)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L196-L198)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## last

Gets last element of this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L248-L250)

```ts
last(): A  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).last(), 3)
assert.strictEqual(new NonEmptyArray(1, []).last(), 1)
```

Added in v1.6.0

## length

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L284-L286)

```ts
length(): number  { ... }
```

Added in v1.10.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L81-L83)

```ts
map<B>(f: (a: A) => B): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const double = (n: number): number => n * 2
assert.deepEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
```

Added in v1.0.0

## mapWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L85-L87)

```ts
mapWithIndex<B>(f: (i: number, a: A) => B): NonEmptyArray<B>  { ... }
```

Added in v1.0.0

## max

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L233-L235)

```ts
max(ord: Ord<A>): A  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).max(ordNumber), 3)
```

Added in v1.3.0

## min

Gets minimum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L218-L220)

```ts
min(ord: Ord<A>): A  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.strictEqual(new NonEmptyArray(1, [2, 3]).min(ordNumber), 1)
```

Added in v1.3.0

## reduce

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L146-L148)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray('a', ['b'])
assert.strictEqual(x.reduce('', (b, a) => b + a), 'ab')
```

Added in v1.0.0

## reduceWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L153-L155)

```ts
reduceWithIndex<B>(b: B, f: (i: number, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## reverse

Reverts this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L277-L279)

```ts
reverse(): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
```

Added in v1.6.0

## sort

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L263-L265)

```ts
sort(ord: Ord<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
```

Added in v1.6.0

## toArray

Converts this [NonEmptyArray](./NonEmptyArray.md) to plain [Array](./Array.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L58-L60)

```ts
toArray(): Array<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
```

Added in v1.0.0

## toString

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L203-L205)

```ts
toString(): string  { ... }
```

Added in v1.0.0

## updateAt

Change the element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L421-L428)

```ts
updateAt(i: number, a: A): Option<NonEmptyArray<A>>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepEqual(new NonEmptyArray(1, [2, 3]).updateAt(1, 1), some(new NonEmptyArray(1, [1, 3])))
assert.deepEqual(new NonEmptyArray(1, []).updateAt(1, 1), none)
```

Added in v1.11.0

Added in v1.0.0

## fromArray

Builds [NonEmptyArray](./NonEmptyArray.md) from [Array](./Array.md) returning [Option#none](./Option.md#none) or [Option#some](./Option.md#some) depending on amount of values in passed array

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L460-L462)

```ts
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

Builds [Semigroup](./Semigroup.md) instance for [NonEmptyArray](./NonEmptyArray.md) of specified type arument

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L493-L495)

```ts
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => { ... }
```

Added in v1.0.0

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L513-L533)

```ts
export const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>> => { ... }
```

**Example**

```ts
import { NonEmptyArray, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(group(ordNumber)([1, 2, 1, 1]), [
  new NonEmptyArray(1, []),
  new NonEmptyArray(2, []),
  new NonEmptyArray(1, [1])
])
```

Added in v1.7.0

## groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L614-L625)

```ts
export const groupBy = <A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } => { ... }
```

**Example**

```ts
import { NonEmptyArray, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
  '3': new NonEmptyArray('foo', ['bar']),
  '6': new NonEmptyArray('foobar', [])
})
```

Added in v1.10.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L547-L552)

```ts
export const groupSort = <A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>) => { ... }
```

**Example**

```ts
import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```

Added in v1.7.0
