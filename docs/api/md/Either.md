MODULE [Either](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)

# Either

_data_

_since 1.0.0_

```ts
type Either<L, A> = Left<L, A> | Right<L, A>
```

Represents a value of one of two possible types (a disjoint union).

An instance of `Either` is either an instance of `Left` or `Right`.

A common use of `Either` is as an alternative to `Option` for dealing with possible missing values.
In this usage, `None` is replaced with a `Left` which can contain useful information.
`Right` takes the place of `Some`.
Convention dictates that `Left` is used for failure and `Right` is used for success.

For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.

```ts
const parse = (errorMessage: string) => (input: string): Either<string, number> => {
  const n = parseInt(input, 10)
  return isNaN(n) ? left(errorMessage) : right(n)
}
```

`Either` is right-biased, which means that `Right` is assumed to be the default case to operate on.
If it is `Left`, operations like `map`, `chain`, ... return the `Left` value unchanged:

```ts
right(12).map(double) // right(24)
left(23).map(double) // left(23)
```

## Methods

### alt

_method_

_since 1.0.0_

```ts
(fy: Either<L, A>): Either<L, A>
```

### ap

_method_

_since 1.0.0_

```ts
<B>(fab: Either<L, (a: A) => B>): Either<L, B>
```

### ap\_

_method_

_since 1.0.0_

```ts
<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>
```

### bimap

_method_

_since 1.0.0_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>
```

### chain

_method_

_since 1.0.0_

```ts
<B>(f: (a: A) => Either<L, B>): Either<L, B>
```

Binds the given function across `Right`

### extend

_method_

_since 1.0.0_

```ts
<B>(f: (ea: Either<L, A>) => B): Either<L, B>
```

### filterOrElse

_method_

_since 1.3.0_

```ts
(p: Predicate<A>, zero: L): Either<L, A>
```

Returns `Right` with the existing value of `Right` if this is a `Right` and the given predicate `p` holds for the right value,
returns `Left(zero)` if this is a `Right` and the given predicate `p` does not hold for the right value,
returns `Left` with the existing value of `Left` if this is a `Left`.

```ts
right(12).filterOrElse(n => n > 10, -1) // right(12)
right(7).filterOrElse(n => n > 10, -1) // left(-1)
left(12).filterOrElse(n => n > 10, -1) // left(12)
```

### filterOrElseL

_method_

_since 1.3.0_

```ts
(p: Predicate<A>, zero: () => L): Either<L, A>
```

Lazy version of `filterOrElse`

### fold

_method_

_since 1.0.0_

```ts
<B>(left: (l: L) => B, right: (a: A) => B): B
```

Applies a function to each case in the data structure

### getOrElse

_method_

_since 1.0.0_

```ts
(a: A): A
```

Returns the value from this `Right` or the given argument if this is a `Left`

### getOrElseL

_method_

_since 1.0.0_

```ts
(f: (l: L) => A): A
```

Returns the value from this `Right` or the result of given argument if this is a `Left`

### inspect

_method_

_since 1.0.0_

```ts
(): string
```

### isLeft

_method_

_since 1.0.0_

```ts
(): this is Left<L, A>
```

Returns `true` if the either is an instance of `Left`, `false` otherwise

### isRight

_method_

_since 1.0.0_

```ts
(): this is Right<L, A>
```

Returns `true` if the either is an instance of `Right`, `false` otherwise

### map

_method_

_since 1.0.0_

```ts
<B>(f: (a: A) => B): Either<L, B>
```

The given function is applied if this is a `Right`

### mapLeft

_method_

_since 1.0.0_

```ts
<M>(f: (l: L) => M): Either<M, A>
```

Maps the left side of the disjunction

### reduce

_method_

_since 1.0.0_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

### swap

_method_

_since 1.0.0_

```ts
(): Either<A, L>
```

Swaps the disjunction values

### toString

_method_

_since 1.0.0_

```ts
(): string
```

# either

_instance_

_since 1.0.0_

```ts
Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI>
```

# fromNullable

_function_

_since 1.0.0_

```ts
<L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A>
```

Takes a default and a nullable value, if the value is not nully, turn it into
a `Right`, if the value is nully use the provided default as a `Left`

# fromOption

_function_

_since 1.0.0_

```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```

Takes a default and a `Option` value, if the value is a `Some`, turn it into
a `Right`, if the value is a `None` use the provided default as a `Left`

# fromOptionL

_function_

_since 1.3.0_

```ts
<L>(defaultValue: Lazy<L>) => <A>(fa: Option<A>): Either<L, A>
```

Lazy version of `fromOption`

# fromPredicate

_function_

_since 1.0.0_

```ts
<L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (a: A): Either<L, A>
```

# fromValidation

_function_

_since 1.0.0_

```ts
<L, A>(fa: Validation<L, A>): Either<L, A>
```

# getSetoid

_function_

_since 1.0.0_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>>
```

# isLeft

_function_

_since 1.0.0_

```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```

Returns `true` if the either is an instance of `Left`, `false` otherwise

# isRight

_function_

_since 1.0.0_

```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```

Returns `true` if the either is an instance of `Right`, `false` otherwise

# left

_function_

_since 1.0.0_

```ts
<L, A>(l: L): Either<L, A>
```

Constructs a new `Either` holding a `Left` value.
This usually represents a failure, due to the right-bias of this structure

# right

_function_

_since 1.0.0_
Alias of

```ts
of
```

Constructs a new `Either` holding a `Right` value.
This usually represents a successful value due to the right bias of this structure

# toError

_function_

_since 1.0.0_

```ts
(e: {}): Error
```

Default value for the optional `onerror` argument of `tryCatch`

# tryCatch

_function_

_since 1.0.0_

```ts
<A>(f: Lazy<A>, onerror: (e: {}) => Error = toError): Either<Error, A>
```
