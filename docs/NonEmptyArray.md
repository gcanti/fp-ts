---
id: NonEmptyArray
title: Module NonEmptyArray
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

# NonEmptyArray

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L45-L469)

```ts
export class NonEmptyArray<A> {
  constructor(readonly head: A, readonly tail: Array<A>) {}
  ...
}
```

Data structure which represents non-empty arrays

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L111-L113)

```ts
ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number): number => n * 2
assert.deepStrictEqual(x.ap(new NonEmptyArray(double, [double])).toArray(), [2, 4, 2, 4])
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L125-L127)

```ts
ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const double = (n: number) => n * 2
assert.deepStrictEqual(new NonEmptyArray(double, [double]).ap_(x).toArray(), [2, 4, 2, 4])
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L137-L139)

```ts
chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const f = (a: number) => new NonEmptyArray(a, [4])
assert.deepStrictEqual(x.chain(f).toArray(), [1, 4, 2, 4])
```

Added in v1.0.0

## concat

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L149-L151)

```ts
concat(y: NonEmptyArray<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepStrictEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

Added in v1.0.0

## concatArray

Concatenates this [NonEmptyArray](./NonEmptyArray.md) and passed [Array](./Array.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L84-L86)

```ts
concatArray(as: Array<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray<number>(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

Added in v1.0.0

## every

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L466-L468)

```ts
every(predicate: Predicate<A>): boolean  { ... }
```

Added in v1.14.0

## extend

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L193-L195)

```ts
extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { fold, monoidSum } from 'fp-ts/lib/Monoid'

const sum = (as: NonEmptyArray<number>) => fold(monoidSum)(as.toArray())
assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).extend(sum), new NonEmptyArray(10, [9, 7, 4]))
```

Added in v1.0.0

## extract

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L203-L205)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L444-L446)

```ts
filter(predicate: Predicate<A>): Option<NonEmptyArray<A>>  { ... }
```

Added in v1.11.0

## filterWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L451-L454)

```ts
filterWithIndex(predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>>  { ... }
```

Added in v1.12.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L331-L333)

```ts
findFirst(predicate: Predicate<A>): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findFirst(x => x.a === 1),
  some({ a: 1, b: 1 })
)
```

Added in v1.11.0

## findIndex

Find the first index for which a predicate holds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L364-L371)

```ts
findIndex(predicate: Predicate<A>): Option<number>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).findIndex(x => x === 2), some(1))
assert.deepStrictEqual(new NonEmptyArray<number>(1, []).findIndex(x => x === 2), none)
```

Added in v1.11.0

## findLast

Find the last element which satisfies a predicate function

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L347-L350)

```ts
findLast(predicate: Predicate<A>): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(
  new NonEmptyArray({ a: 1, b: 1 }, [{ a: 1, b: 2 }]).findLast(x => x.a === 1),
  some({ a: 1, b: 2 })
)
```

Added in v1.11.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L390-L393)

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
assert.deepStrictEqual(xs.findLastIndex(x => x.a === 1), some(1))
assert.deepStrictEqual(xs.findLastIndex(x => x.a === 4), none)
```

Added in v1.11.0

## foldr

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L174-L176)

```ts
foldr<B>(b: B, f: (a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## foldrWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L181-L183)

```ts
foldrWithIndex<B>(b: B, f: (i: number, a: A, b: B) => B): B  { ... }
```

Added in v1.12.0

## index

This function provides a safe way to read a value at a particular index from an NonEmptyArray

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L315-L317)

```ts
index(i: number): Option<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).index(1), some(2))
assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).index(3), none)
```

Added in v1.11.0

## insertAt

Insert an element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L406-L413)

```ts
insertAt(i: number, a: A): Option<NonEmptyArray<A>>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3, 4]).insertAt(2, 5), some(new NonEmptyArray(1, [2, 5, 3, 4])))
```

Added in v1.11.0

## inspect

Same as [toString](#tostring)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L210-L212)

```ts
inspect(): string  { ... }
```

Added in v1.0.0

## last

Gets last element of this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L262-L264)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L298-L300)

```ts
length(): number  { ... }
```

Added in v1.10.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L95-L97)

```ts
map<B>(f: (a: A) => B): NonEmptyArray<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const double = (n: number): number => n * 2
assert.deepStrictEqual(new NonEmptyArray(1, [2]).map(double), new NonEmptyArray(2, [4]))
```

Added in v1.0.0

## mapWithIndex

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L99-L101)

```ts
mapWithIndex<B>(f: (i: number, a: A) => B): NonEmptyArray<B>  { ... }
```

Added in v1.0.0

## max

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L247-L249)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L232-L234)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L160-L162)

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

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L167-L169)

```ts
reduceWithIndex<B>(b: B, f: (i: number, b: B, a: A) => B): B  { ... }
```

Added in v1.12.0

## reverse

Reverts this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L291-L293)

```ts
reverse(): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).reverse(), new NonEmptyArray(3, [2, 1]))
```

Added in v1.6.0

## some

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L459-L461)

```ts
some(predicate: Predicate<A>): boolean  { ... }
```

Added in v1.14.0

## sort

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L277-L279)

```ts
sort(ord: Ord<A>): NonEmptyArray<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(new NonEmptyArray(3, [2, 1]).sort(ordNumber), new NonEmptyArray(1, [2, 3]))
```

Added in v1.6.0

## toArray

Converts this [NonEmptyArray](./NonEmptyArray.md) to a plain [Array](./Array.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L58-L60)

```ts
toArray(): Array<A>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).toArray(), [1, 2, 3])
```

Added in v1.0.0

## toArrayMap

Converts this [NonEmptyArray](./NonEmptyArray.md) to a plain [Array](./Array.md) using the given map function

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L72-L74)

```ts
toArrayMap<B>(f: (a: A) => B): Array<B>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(new NonEmptyArray('a', ['bb', 'ccc']).toArrayMap(s => s.length), [1, 2, 3])
```

Added in v1.14.0

## toString

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L217-L219)

```ts
toString(): string  { ... }
```

Added in v1.0.0

## updateAt

Change the element at the specified index, creating a new NonEmptyArray, or returning `None` if the index is out of bounds

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L428-L435)

```ts
updateAt(i: number, a: A): Option<NonEmptyArray<A>>  { ... }
```

**Example**

```ts
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { some, none } from 'fp-ts/lib/Option'

assert.deepStrictEqual(new NonEmptyArray(1, [2, 3]).updateAt(1, 1), some(new NonEmptyArray(1, [1, 3])))
assert.deepStrictEqual(new NonEmptyArray(1, []).updateAt(1, 1), none)
```

Added in v1.11.0

Added in v1.0.0

## nonEmptyArray

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L658-L681)

```ts
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = ...
```

Added in v1.0.0

## fromArray

Builds [NonEmptyArray](./NonEmptyArray.md) from [Array](./Array.md) returning [Option#none](./Option.md#none) or [Option#some](./Option.md#some) depending on amount of values in passed array

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L480-L482)

```ts
export const fromArray = <A>(as: Array<A>): Option<NonEmptyArray<A>> => { ... }
```

Added in v1.0.0

## getSemigroup

Builds [Semigroup](./Semigroup.md) instance for [NonEmptyArray](./NonEmptyArray.md) of specified type arument

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L513-L515)

```ts
export const getSemigroup = <A = never>(): Semigroup<NonEmptyArray<A>> => { ... }
```

Added in v1.0.0

## group

Group equal, consecutive elements of an array into non empty arrays.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L532-L552)

```ts
export const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<NonEmptyArray<A>> => { ... }
```

**Example**

```ts
import { NonEmptyArray, group } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
  new NonEmptyArray(1, []),
  new NonEmptyArray(2, []),
  new NonEmptyArray(1, [1])
])
```

Added in v1.7.0

## groupBy

Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
function on each element, and grouping the results according to values returned

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L631-L642)

```ts
export const groupBy = <A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } => { ... }
```

**Example**

```ts
import { NonEmptyArray, groupBy } from 'fp-ts/lib/NonEmptyArray'

assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
  '3': new NonEmptyArray('foo', ['bar']),
  '6': new NonEmptyArray('foobar', [])
})
```

Added in v1.10.0

## groupSort

Sort and then group the elements of an array into non empty arrays.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts#L565-L570)

```ts
export const groupSort = <A>(O: Ord<A>): ((as: Array<A>) => Array<NonEmptyArray<A>>) => { ... }
```

**Example**

```ts
import { NonEmptyArray, groupSort } from 'fp-ts/lib/NonEmptyArray'
import { ordNumber } from 'fp-ts/lib/Ord'

assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [new NonEmptyArray(1, [1, 1]), new NonEmptyArray(2, [])])
```

Added in v1.7.0
