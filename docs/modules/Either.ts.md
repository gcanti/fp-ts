---
title: Either.ts
nav_order: 25
parent: Modules
---

## Either overview

```ts
type Either<E, A> = Left<E> | Right<A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
`None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
dictates that `Left` is used for failure and `Right` is used for success.

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const double = (n: number): number => n * 2

export const imperative = (as: ReadonlyArray<number>): string => {
  const head = (as: ReadonlyArray<number>): number => {
    if (as.length === 0) {
      throw new Error('empty array')
    }
    return as[0]
  }
  const inverse = (n: number): number => {
    if (n === 0) {
      throw new Error('cannot divide by zero')
    }
    return 1 / n
  }
  try {
    return `Result is ${inverse(double(head(as)))}`
  } catch (err: any) {
    return `Error is ${err.message}`
  }
}

export const functional = (as: ReadonlyArray<number>): string => {
  const head = <A>(as: ReadonlyArray<A>): E.Either<string, A> =>
    as.length === 0 ? E.left('empty array') : E.right(as[0])
  const inverse = (n: number): E.Either<string, number> => (n === 0 ? E.left('cannot divide by zero') : E.right(1 / n))
  return pipe(
    as,
    head,
    E.map(double),
    E.chain(inverse),
    E.match(
      (err) => `Error is ${err}`, // onLeft handler
      (head) => `Result is ${head}` // onRight handler
    )
  )
}

assert.deepStrictEqual(imperative([1, 2, 3]), functional([1, 2, 3]))
assert.deepStrictEqual(imperative([]), functional([]))
assert.deepStrictEqual(imperative([0]), functional([0]))
```

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [chainOptionK](#chainoptionk)
  - [duplicate](#duplicate)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromOptionK](#fromoptionk)
  - [orElse](#orelse)
  - [orElseW](#orelsew)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [right](#right)
  - [~~parseJSON~~](#parsejson)
  - [~~stringifyJSON~~](#stringifyjson)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchW](#matchw)
- [instance operations](#instance-operations)
  - [alt](#alt)
  - [altW](#altw)
  - [ap](#ap)
  - [apW](#apw)
  - [bimap](#bimap)
  - [chain](#chain)
  - [chainW](#chainw)
  - [extend](#extend)
  - [foldMap](#foldmap)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [of](#of)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [sequence](#sequence)
  - [throwError](#throwerror)
  - [traverse](#traverse)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [Chain](#chain)
  - [ChainRec](#chainrec)
  - [Extend](#extend)
  - [Foldable](#foldable)
  - [FromEither](#fromeither)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadThrow](#monadthrow)
  - [Pointed](#pointed)
  - [Traversable](#traversable)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltValidation](#getaltvalidation)
  - [getApplicativeValidation](#getapplicativevalidation)
  - [getCompactable](#getcompactable)
  - [getEq](#geteq)
  - [getFilterable](#getfilterable)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getWitherable](#getwitherable)
  - [~~either~~](#either)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getValidationMonoid~~](#getvalidationmonoid)
  - [~~getValidationSemigroup~~](#getvalidationsemigroup)
  - [~~getValidation~~](#getvalidation)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [natural transformations](#natural-transformations)
  - [fromOption](#fromoption)
- [refinements](#refinements)
  - [isLeft](#isleft)
  - [isRight](#isright)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [elem](#elem)
  - [exists](#exists)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [toError](#toerror)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [~~JsonArray~~ (interface)](#jsonarray-interface)
  - [~~JsonRecord~~ (interface)](#jsonrecord-interface)
  - [~~Json~~ (type alias)](#json-type-alias)

---

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: Either<E, B>) => <A>(first: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst)

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: Either<E, B>) => <A>(first: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond)

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E2 | E1, B>
```

Added in v2.12.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst)

The `W` suffix (short for **W**idening) means that the error types will be merged.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: Either<E1, A>) => Either<E2 | E1, A>
```

Added in v2.8.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v2.11.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>>
```

Added in v2.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B>(mb: Either<E, B>) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Either<E, A>) => Either<E, A>
}
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(-1),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('error')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.filterOrElse(
      (n) => n > 0,
      () => 'error'
    )
  ),
  E.left('a')
)
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(mb: Either<E1, B>) => Either<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E2 | E1, A>
}
```

Added in v2.9.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v2.10.0

## flatten

The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const flattenW: <E1, E2, A>(mma: Either<E1, Either<E2, A>>) => Either<E1 | E2, A>
```

Added in v2.11.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => Either<E, B>
```

Added in v2.10.0

## orElse

Useful for recovering from errors.

**Signature**

```ts
export declare const orElse: <E1, A, E2>(onLeft: (e: E1) => Either<E2, A>) => (ma: Either<E1, A>) => Either<E2, A>
```

Added in v2.0.0

## orElseW

Less strict version of [`orElse`](#orelse).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => Either<E2, B>
) => <A>(ma: Either<E1, A>) => Either<E2, B | A>
```

Added in v2.10.0

## swap

Returns a `Right` if is a `Left` (and vice versa).

**Signature**

```ts
export declare const swap: <E, A>(ma: Either<E, A>) => Either<A, E>
```

Added in v2.0.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
}
```

**Example**

```ts
import { fromPredicate, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    1,
    fromPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    fromPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('error')
)
```

Added in v2.0.0

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => Either<E, A>
```

Added in v2.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => Either<E, A>
```

Added in v2.0.0

## ~~parseJSON~~

Use [`parse`](./Json.ts.html#parse) instead.

**Signature**

```ts
export declare function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, Json>
```

Added in v2.0.0

## ~~stringifyJSON~~

Use [`stringify`](./Json.ts.html#stringify) instead.

**Signature**

```ts
export declare const stringifyJSON: <E>(u: unknown, onError: (reason: unknown) => E) => Either<E, string>
```

Added in v2.0.0

# destructors

## fold

Alias of [`match`](#match).

**Signature**

```ts
export declare const fold: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B
```

Added in v2.0.0

## foldW

Alias of [`matchW`](#matchw).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>) => B | C
```

Added in v2.10.0

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A
```

**Example**

```ts
import { getOrElse, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    right(1),
    getOrElse(() => 0)
  ),
  1
)
assert.deepStrictEqual(
  pipe(
    left('error'),
    getOrElse(() => 0)
  ),
  0
)
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>) => B | A
```

Added in v2.6.0

## match

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B
```

**Example**

```ts
import { match, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

function onLeft(errors: Array<string>): string {
  return `Errors: ${errors.join(', ')}`
}

function onRight(value: number): string {
  return `Ok: ${value}`
}

assert.strictEqual(pipe(right(1), match(onLeft, onRight)), 'Ok: 1')
assert.strictEqual(pipe(left(['error 1', 'error 2']), match(onLeft, onRight)), 'Errors: error 1, error 2')
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>) => B | C
```

Added in v2.10.0

# instance operations

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).

| x        | y        | pipe(x, alt(() => y) |
| -------- | -------- | -------------------- |
| left(a)  | left(b)  | left(b)              |
| left(a)  | right(2) | right(2)             |
| right(1) | left(b)  | right(1)             |
| right(1) | right(2) | right(1)             |

**Signature**

```ts
export declare const alt: <E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.alt(() => E.left('b'))
  ),
  E.left('b')
)
assert.deepStrictEqual(
  pipe(
    E.left('a'),
    E.alt(() => E.right(2))
  ),
  E.right(2)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.alt(() => E.left('b'))
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.alt(() => E.right(2))
  ),
  E.right(1)
)
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(fa: Either<E1, A>) => Either<E2, B | A>
```

Added in v2.9.0

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apW: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
```

Added in v2.8.0

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B>
```

Added in v2.0.0

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const chainW: <E2, A, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>) => Either<E2 | E1, B>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

const e1: E.Either<string, number> = E.right(1)
const e2: E.Either<number, number> = E.right(2)

export const result1 = pipe(
  // @ts-expect-error
  e1,
  E.chain(() => e2)
)

// merged error types -----v-------------v
// const result2: E.Either<string | number, number>
export const result2 = pipe(
  e1, // no error
  E.chainW(() => e2)
)
```

Added in v2.6.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## foldMap

Map each element of the structure to a monoid, and combine the results.

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as S from 'fp-ts/string'

const yell = (a: string) => `${a}!`

assert.deepStrictEqual(pipe(E.right('a'), E.foldMap(S.Monoid)(yell)), 'a!')

assert.deepStrictEqual(pipe(E.left('e'), E.foldMap(S.Monoid)(yell)), S.Monoid.empty)
```

Added in v2.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B>
```

Added in v2.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A>
```

Added in v2.0.0

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(a: A) => Either<E, A>
```

Added in v2.7.0

## reduce

Left-associative fold of a structure.

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

const startWith = 'prefix'
const concat = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduce(startWith, concat)), 'prefix:a')

assert.deepStrictEqual(pipe(E.left('e'), E.reduce(startWith, concat)), 'prefix')
```

Added in v2.0.0

## reduceRight

Right-associative fold of a structure.

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'

const startWith = 'postfix'
const concat = (a: string, b: string) => `${a}:${b}`

assert.deepStrictEqual(pipe(E.right('a'), E.reduceRight(startWith, concat)), 'a:postfix')

assert.deepStrictEqual(pipe(E.left('e'), E.reduceRight(startWith, concat)), 'postfix')
```

Added in v2.0.0

## sequence

Evaluate each monadic action in the structure from left to right, and collect the results.

**Signature**

```ts
export declare const sequence: Sequence2<'Either'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(O.some('a')), E.sequence(O.Applicative)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right(O.none), E.sequence(O.Applicative)), O.none)
```

Added in v2.6.3

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => Either<E, A>
```

Added in v2.6.3

## traverse

Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.

**Signature**

```ts
export declare const traverse: PipeableTraverse2<'Either'>
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)), O.some(E.right('a')))

assert.deepStrictEqual(pipe(E.right([]), E.traverse(O.Applicative)(RA.head)), O.none)
```

Added in v2.6.3

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'Either'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Either'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Either'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Either'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'Either'>
```

Added in v2.10.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec2<'Either'>
```

Added in v2.7.0

## Extend

**Signature**

```ts
export declare const Extend: Extend2<'Either'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable2<'Either'>
```

Added in v2.7.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'Either'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Either'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Either'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'Either'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'Either'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable2<'Either'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Either'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getAltValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare const getAltValidation: <E>(SE: Semigroup<E>) => Alt2C<'Either', E>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Either<string, string> =>
  typeof u === 'string' ? E.right(u) : E.left('not a string')

const parseNumber = (u: unknown): E.Either<string, number> =>
  typeof u === 'number' ? E.right(u) : E.left('not a number')

const parse = (u: unknown): E.Either<string, string | number> =>
  pipe(
    parseString(u),
    E.alt<string, string | number>(() => parseNumber(u))
  )

assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error

const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))

const parseAll = (u: unknown): E.Either<string, string | number> =>
  Alt.alt<string | number>(parseString(u), () => parseNumber(u))

assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
```

Added in v2.7.0

## getApplicativeValidation

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare const getApplicativeValidation: <E>(SE: Semigroup<E>) => Applicative2C<'Either', E>
```

**Example**

```ts
import * as A from 'fp-ts/Apply'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as string from 'fp-ts/string'

const parseString = (u: unknown): E.Either<string, string> =>
  typeof u === 'string' ? E.right(u) : E.left('not a string')

const parseNumber = (u: unknown): E.Either<string, number> =>
  typeof u === 'number' ? E.right(u) : E.left('not a number')

interface Person {
  readonly name: string
  readonly age: number
}

const parsePerson = (input: Record<string, unknown>): E.Either<string, Person> =>
  pipe(E.Do, E.apS('name', parseString(input.name)), E.apS('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error

const Applicative = E.getApplicativeValidation(pipe(string.Semigroup, S.intercalate(', ')))

const apS = A.apS(Applicative)

const parsePersonAll = (input: Record<string, unknown>): E.Either<string, Person> =>
  pipe(E.Do, apS('name', parseString(input.name)), apS('age', parseNumber(input.age)))

assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
```

Added in v2.7.0

## getCompactable

Builds a `Compactable` instance for `Either` given `Monoid` for the left side.

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'Either', E>
```

Added in v2.10.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EL: Eq<E>, EA: Eq<A>) => Eq<Either<E, A>>
```

Added in v2.0.0

## getFilterable

Builds a `Filterable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable2C<'Either', E>
```

Added in v2.10.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare const getSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

**Example**

```ts
import { getSemigroup, left, right } from 'fp-ts/Either'
import { SemigroupSum } from 'fp-ts/number'

const S = getSemigroup<string, number>(SemigroupSum)
assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(SE: Show<E>, SA: Show<A>) => Show<Either<E, A>>
```

Added in v2.0.0

## getWitherable

Builds `Witherable` instance for `Either` given `Monoid` for the left side

**Signature**

```ts
export declare const getWitherable: <E>(M: Monoid<E>) => Witherable2C<'Either', E>
```

Added in v2.0.0

## ~~either~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
(where `E` is from `import E from 'fp-ts/Either'`)

**Signature**

```ts
export declare const either: Monad2<'Either'> &
  Foldable2<'Either'> &
  Traversable2<'Either'> &
  Bifunctor2<'Either'> &
  Alt2<'Either'> &
  Extend2<'Either'> &
  ChainRec2<'Either'> &
  MonadThrow2<'Either'>
```

Added in v2.0.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<Either<E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

Added in v2.0.0

## ~~getValidationMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getValidationMonoid: <E, A>(SE: Semigroup<E>, MA: Monoid<A>) => Monoid<Either<E, A>>
```

Added in v2.0.0

## ~~getValidationSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getValidationSemigroup: <E, A>(SE: Semigroup<E>, SA: Semigroup<A>) => Semigroup<Either<E, A>>
```

Added in v2.0.0

## ~~getValidation~~

Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.

**Signature**

```ts
export declare function getValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2C<URI, E> &
  Extend2<URI> &
  ChainRec2C<URI, E> &
  MonadThrow2C<URI, E>
```

Added in v2.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: E
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>
```

Added in v2.9.0

## fromNullable

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <A>(a: A) => Either<E, NonNullable<A>>
```

**Example**

```ts
import { fromNullable, left, right } from 'fp-ts/Either'

const parse = fromNullable('nully')

assert.deepStrictEqual(parse(1), right(1))
assert.deepStrictEqual(parse(null), left('nully'))
```

Added in v2.0.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(f: (...a: A) => B | null | undefined) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v2.9.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: Either<E, A>) => E | A
```

Added in v2.10.0

## tryCatch

Constructs a new `Either` from a function that might throw.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <E, A>(f: Lazy<A>, onThrow: (e: unknown) => E) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'

const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
  if (as.length > 0) {
    return as[0]
  } else {
    throw new Error('empty array')
  }
}

const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
  E.tryCatch(
    () => unsafeHead(as),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
```

Added in v2.0.0

## tryCatchK

Converts a function that may throw to one returning a `Either`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Either<E, B>
```

Added in v2.10.0

# model

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v2.0.0

## Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v2.0.0

## Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v2.0.0

# natural transformations

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => Either<E, A>
```

**Example**

```ts
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    O.some(1),
    E.fromOption(() => 'error')
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    O.none,
    E.fromOption(() => 'error')
  ),
  E.left('error')
)
```

Added in v2.0.0

# refinements

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E>
```

Added in v2.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A>
```

Added in v2.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Either<never, readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E, B>
) => (fa: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E, B>
) => (ma: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: Either<E, A>) => Either<E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## elem

**Signature**

```ts
export declare function elem<A>(E: Eq<A>): {
  (a: A): <E>(ma: Either<E, A>) => boolean
  <E>(a: A, ma: Either<E, A>): boolean
}
```

Added in v2.0.0

## exists

Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => (ma: Either<unknown, A>) => boolean
```

**Example**

```ts
import { exists, left, right } from 'fp-ts/Either'

const gt2 = exists((n: number) => n > 2)

assert.strictEqual(gt2(left('a')), false)
assert.strictEqual(gt2(right(1)), false)
assert.strictEqual(gt2(right(3)), true)
```

Added in v2.0.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(fa: Either<E, A>) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <E, A>(as: readonly Either<E, A>[]) => Either<E, readonly A[]>
```

Added in v2.9.0

## toError

Default value for the `onError` argument of `tryCatch`

**Signature**

```ts
export declare function toError(e: unknown): Error
```

Added in v2.0.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (as: readonly A[]) => Either<E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <E, A, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: readonly A[]) => Either<E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: readonly A[]) => Either<E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: ReadonlyNonEmptyArray<A>) => Either<E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## ~~JsonArray~~ (interface)

Use [`Json`](./Json.ts.html) module instead.

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

Added in v2.6.7

## ~~JsonRecord~~ (interface)

Use [`Json`](./Json.ts.html) module instead.

**Signature**

```ts
export interface JsonRecord {
  readonly [key: string]: Json
}
```

Added in v2.6.7

## ~~Json~~ (type alias)

Use [`Json`](./Json.ts.html) module instead.

**Signature**

```ts
export type Json = boolean | number | string | null | JsonArray | JsonRecord
```

Added in v2.6.7
