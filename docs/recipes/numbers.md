---
title: Numbers
parent: Recipes
nav_order: 3
---

# Working with numbers

`fp-ts` is not a math library, but there are some good facilities we can use to work with numbers. Because the examples below use abstract concepts, e.g. [Monoid](../modules/Monoid.ts)s, many of the examples below would work with other types of data, not just numbers.

## Min/max

```ts
import { boundedNumber } from 'fp-ts/lib/Bounded'
import { fold, getJoinMonoid, getMeetMonoid } from 'fp-ts/lib/Monoid'

const min = fold(getMeetMonoid(boundedNumber))
const max = fold(getJoinMonoid(boundedNumber))

min([5, 2, 3]) // 2
max([5, 2, 3]) // 5
```

## Sums and products

```ts
import { fold, monoidProduct, monoidSum } from 'fp-ts/lib/Monoid'

const sum = fold(monoidSum)
const product = fold(monoidProduct)

sum([1, 2, 3, 4]) // 10
product([1, 2, 3, 4]) // 24
```

## Working with nested structures

```ts
import { getStructMonoid, Monoid, monoidSum } from 'fp-ts/lib/Monoid'

type Point = {
  x: number
  y: number
}

const monoidPoint: Monoid<Point> = getStructMonoid({
  x: monoidSum,
  y: monoidSum
})

monoidPoint.concat({ x: 0, y: 3 }, { x: 2, y: 4 }) // { x: 2, y: 7 }
```

To check whether the resulting `Point` is positive, create a predicate:

```ts
import { getFunctionMonoid, Monoid, monoidAll } from 'fp-ts/lib/Monoid'

type Point = {
  x: number
  y: number
}

const monoidPredicate: Monoid<(p: Point) => boolean> = getFunctionMonoid(monoidAll)<Point>()

const isPositiveX = (p: Point): boolean => p.x >= 0
const isPositiveY = (p: Point): boolean => p.y >= 0

const isPositiveXY = monoidPredicate.concat(isPositiveX, isPositiveY)

isPositiveXY({ x: 1, y: 1 }) // true
isPositiveXY({ x: 1, y: -1 }) // false
isPositiveXY({ x: -1, y: 1 }) // false
isPositiveXY({ x: -1, y: -1 }) // false
```

## Working with optional values

```ts
import { fold, monoidProduct, monoidSum } from 'fp-ts/lib/Monoid'
import { getApplyMonoid, none, some } from 'fp-ts/lib/Option'

const sum = fold(getApplyMonoid(monoidSum))
const product = fold(getApplyMonoid(monoidProduct))

sum([some(2), none, some(4)]) // none
sum([some(2), some(3), some(4)]) // some(9)

product([some(2), none, some(4)]) // none
product([some(2), some(3), some(4)]) // some(24)
```

This also works for [Either](../modules/Either.ts)s, but note that folding on `Left` values does not work the same way as folding on `Right` values.

```ts
import { getApplyMonoid, left, right } from 'fp-ts/lib/Either'
import { fold, monoidProduct, monoidSum } from 'fp-ts/lib/Monoid'

const sum = fold(getApplyMonoid(monoidSum))
const product = fold(getApplyMonoid(monoidProduct))

sum([right(2), left(3), right(4)]) // left(3)
sum([right(2), right(3), right(4)]) // right(9)
product([right(2), left(3), left(4)]) // left(3) <- it's the first left value
product([right(2), right(3), right(4)]) // right(24)
```
