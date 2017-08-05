# fp-ts by Example

Adapted from [PureScript by Example](https://leanpub.com/purescript/read)

## Flattening Arrays

```ts
import { array, chain } from 'fp-ts'

chain.flatten(array)([[1, 2, 3], [4, 5], [6]]) // [ 1, 2, 3, 4, 5, 6 ]
```

## Array Comprehensions

Suppose we wanted to find the factors of a number `n\. One simple way to do this would be by brute force: we could generate all pairs of numbers between `1` and `n`, and try multiplying them together. If the product was `n\, we would have found a pair of factors of `n`.

We can perform this computation using an array comprehension.

The first step is to generate an array of pairs of numbers below n, which we can do using `chain`.

Let’s start by mapping each number to the array `1 .. n`:

```ts
import { chain, array } from 'fp-ts'

const range = (s: number, e: number) => Array.from(new Array(e - s + 1), (_, i) => s + i)

const pairs = (n: number) => array.chain(i => range(1, n), range(1, n))
```

We can test our function

```ts
pairs(3) // [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
```

This is not quite what we want. Instead of just returning the second element of each pair, we need to map a function over the inner copy of `1 .. n` which will allow us to keep the entire pair:

```ts
const pairs2 = (n: number) => array.chain(i => array.map(j => [i, j], range(1, n)), range(1, n))

pairs2(3)
/*
[ [ 1, 1 ],
  [ 1, 2 ],
  [ 1, 3 ],
  [ 2, 1 ],
  [ 2, 2 ],
  [ 2, 3 ],
  [ 3, 1 ],
  [ 3, 2 ],
  [ 3, 3 ] ]
*/
```

This is looking better. However, we are generating too many pairs: we keep both `[1, 2]` and `[2, 1]` for example. We can exclude the second case by making sure that `j` only ranges from `i` to `n`:

```ts
const pairs3 = (n: number) => array.chain(i => array.map(j => [i, j], range(i, n)), range(1, n))

pairs3(3) // [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 2 ], [ 2, 3 ], [ 3, 3 ] ]
```

Great! Now that we have all of the pairs of potential factors, we can use `filter` to choose the pairs which multiply to give `n`:

```ts
const factors = (n: number) => pairs3(n).filter(([i, j]) => i * j === n)

factors(10) // [ [ 1, 10 ], [ 2, 5 ] ]
```

## Folds

```ts
import { array, foldable } from 'fp-ts'

const sum = (a: number, b: number) => a + b

array.reduce(sum, 0, [1, 2, 3, 4, 5]) // 15

array.reduce((b, a) => b + String(a), '', [1, 2, 3, 4, 5]) // 12345

foldable.foldr(array, (a, b) => a + String(b), '', [1, 2, 3, 4, 5]) // 54321
```

## A Virtual Filesystem

```ts
import { option, array, either } from 'fp-ts'
import * as fs from 'fs'

class Path {
  readonly _tag: 'Path'
  constructor(public readonly filename: string) {}
  inspect() {
    return this.toString()
  }
  toString() {
    return `Path(${this.filename})`
  }
}

const path = (filename: string): option.Option<Path> => fs.existsSync(filename) ?
  option.some(new Path(filename)) :
  option.none

const ls = (path: Path): Array<Path> => either.tryCatch(() => {
  return fs.readdirSync(path.filename).map(path => new Path(path))
}).getOrElse(() => [])
```

### Listing All Files

Let's write a function which performs a deep enumeration of all files inside a directory. This function will have the following type:

```ts
declare function allFiles(path: Path): Array<Path>
```

We can define this function by recursion. First, we can use ls to enumerate the immediate children of the directory. For each child, we can recursively apply `allFiles`, which will return an array of paths. `chain` will allow us to apply `allFiles` and flatten the results at the same time.

Finally, we use the `cons` function to include the current file:

```ts
const allFiles = (path: Path): Array<Path> => array.cons(path, array.chain(allFiles, ls(path)))

path('./docs').map(allFiles).getOrElse(() => []) // [ Path(../docs), Path(Free.md), Path(OptionT.md), Path(book.md) ]
```

## Pattern Matching

The function `fold` provides a way to get a simple form of pattern matching in presence of coproducts

### Arrays

```ts
import { array } from 'fp-ts'

function isEmpty<A>(xs: Array<A>): boolean {
  return array.fold(
    () => true,  // called when xs is []
    () => false, // otherwise
    xs
  )
}
```

### Algebraic Data Types

```ts
// product
type Point = {
  x: number,
  y: number
}

// coproduct
type Shape =
  | Circle
  | Rectangle
  | Line
  | Text

class Circle {
  readonly _tag: 'Circle' = 'Circle'
  constructor(
    public readonly center: Point,
    public readonly radius: number
  ) {}
}

class Rectangle {
  readonly _tag: 'Rectangle' = 'Rectangle'
  constructor(
    public readonly lowerLeft: Point,
    public readonly width: number,
    public readonly height: number
  ) {}
}

class Line {
  readonly _tag: 'Line' = 'Line'
  constructor(
    public readonly start: Point,
    public readonly end: Point
  ) {}
}

class Text {
  readonly _tag: 'Text' = 'Text'
  constructor(
    public readonly loc: Point,
    public readonly text: string
  ) {}
}

function fold<R>(
  circle: (center: Point, radius: number) => R,
  rectangle: (lowerLeft: Point, width: number, height: number) => R,
  line: (start: Point, end: Point) => R,
  text: (loc: Point, text: string) => R): (shape: Shape) => R {

  return shape => {
    switch (shape._tag) {
      case 'Circle' :
        return circle(shape.center, shape.radius)
      case 'Rectangle' :
        return rectangle(shape.lowerLeft, shape.width, shape.height)
      case 'Line' :
        return line(shape.start, shape.end)
      case 'Text' :
        return text(shape.loc, shape.text)
    }
    throw 'err'
  }
}

const showPoint = (point: Point) => `(${point.x}, ${point.y})`

const showShape = (shape: Shape) => fold(
  (center, radius) => ...,
  (lowerLeft, width, height) => ...,
  (start, end) => ...,
  (loc, text) => ...
)(shape)
```

