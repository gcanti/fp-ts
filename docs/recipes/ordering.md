---
title: Ordering
parent: Recipes
nav_order: 2
---

# How to determine the order of data

If you need to decide on the order of two values, you can make use of the `compare` method provided by `Ord` instances. Ordering builds on [equality](./equality).

Note that `compare` returns an [Ordering](../modules/Ordering.ts), which is one of these values `-1 | 0 | 1`. We say that

* `x < y` if and only if `compare(x, y)` is equal to `-1`
* `x` is equal to `y` if and only if `compare(x, y)` is equal to `0`
* `x > y` if and only if `compare(x, y)` is equal to `1`

We show the most common usages here, but if you need more ways to order your data, be sure to read the [Ord](../modules/Ord.ts) documentation page.

## Primitive comparisons

```ts
import { ordBoolean, ordDate, ordNumber, ordString } from 'fp-ts/lib/Ord'

ordNumber.compare(4, 5) // -1
ordNumber.compare(5, 5) // 0
ordNumber.compare(6, 5) // 1

ordBoolean.compare(true, false) // 1
ordDate.compare(new Date('1984-01-27'), new Date('1978-09-23')) // 1
ordString.compare('Cyndi', 'Debbie') // -1
```

Note that all `Ord` instances also define the `equals` method, because it is a prerequisite to be able to compare data.

```ts
ordBoolean.equals(false, false) // true
```

## Custom comparisons

You can create custom comparisons using `fromCompare` like so:

```ts
import { fromCompare } from 'fp-ts/lib/Ord'

const strlenOrd = fromCompare((a: string, b: string) => (a.length < b.length ? -1 : a.length > b.length ? 1 : 0))
strlenOrd.compare('Hi', 'there') // -1
strlenOrd.compare('Goodbye', 'friend') // 1
```

But most of the time, you can achieve the same result in a simpler way with `contramap`:

```ts
import { contramap, ordNumber } from 'fp-ts/lib/Ord'

const strlenOrd = contramap((s: string) => s.length, ordNumber)
strlenOrd.compare('Hi', 'there') // -1
strlenOrd.compare('Goodbye', 'friend') // 1
```

## Min, max, clamp

Take the smaller (`min`) or larger (`max`) element of two, or take the one closest to the given boundaries (`clamp`).

```ts
import { clamp, max, min, ordNumber, ordString } from 'fp-ts/lib/Ord'

min(ordNumber)(5, 2) // 2
max(ordNumber)(5, 2) // 5

clamp(ordNumber)(3, 7)(2) // 3
clamp(ordString)('Bar', 'Boat')('Ball') // Bar
```

## Less than, greater than, or in between?

```ts
import { between, greaterThanOrEq, lessThan, ordNumber } from 'fp-ts/lib/Ord'

lessThan(ordNumber)(4, 7) // true
greaterThanOrEq(ordNumber)(6, 6) // true

between(ordNumber)(6, 9)(7) // true
between(ordNumber)(6, 9)(6) // true
between(ordNumber)(6, 9)(9) // true
between(ordNumber)(6, 9)(12) // false
```


## Sort an array

```ts
import { ordNumber } from 'fp-ts/lib/Ord'
import { sort } from 'fp-ts/lib/Array'

const sortByNumber = sort(ordNumber)
sortByNumber([3,1,2]) // [1, 2, 3]
```

Sort an array of objects:

```ts
import { contramap, ordNumber } from 'fp-ts/lib/Ord'
import { sort } from 'fp-ts/lib/Array'

type Planet = {
  name: string
  diameter: number // km
  distance: number // AU from Sun
}

const planets: Array<Planet> = [
  { name: 'Earth', diameter: 12756, distance: 1 },
  { name: 'Jupiter', diameter: 142800, distance: 5.203 },
  { name: 'Mars', diameter: 6779, distance: 1.524 },
  { name: 'Mercury', diameter: 4879.4, distance: 0.39 },
  { name: 'Neptune', diameter: 49528, distance: 30.06 },
  { name: 'Saturn', diameter: 120660, distance: 9.539 },
  { name: 'Uranus', diameter: 51118, distance: 19.18 },
  { name: 'Venus', diameter: 12104, distance: 0.723 }
]

const diameterOrd = contramap((x: Planet) => x.diameter, ordNumber)
const distanceOrd = contramap((x: Planet) => x.distance, ordNumber)

console.log(sort(distanceOrd)(planets)) // Mercury, Venus, Earth, Mars, ...
console.log(sort(diameterOrd)(planets)) // Mercury, Mars, Venus, Earth, ...
```

## More Ord instances

Many data types provide `Ord` instances. Here's [Option](../modules/Option.ts):

```ts
import { getOrd, none, some } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'

const O = getOrd(ordNumber)
O.compare(none, none) // 0
O.compare(none, some(1)) // -1
O.compare(some(1), none) // 1
O.compare(some(1), some(2)) // -1
O.compare(some(1), some(1)) // 0
```

It works similarly for [Tuple](../modules/Tuple.ts)s and other types where it is possible to determine order:

```ts
import { ordNumber, ordString } from 'fp-ts/lib/Ord'
import { getOrd, Tuple } from 'fp-ts/lib/Tuple'

const O = getOrd(ordString, ordNumber)
O.compare(new Tuple('A', 10), new Tuple('A', 12)) // -1
O.compare(new Tuple('A', 10), new Tuple('A', 4)) // 1
O.compare(new Tuple('A', 10), new Tuple('B', 4)) // -1
```
