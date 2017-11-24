MODULE [Either](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)

# Either

_data_

```ts
type Either<L, A> = Left<L, A> | Right<L, A>
```

## Methods

### alt

```ts
(fy: Either<L, A>): Either<L, A>
```

### ap

```ts
<B>(fab: Either<L, (a: A) => B>): Either<L, B>
```

### ap_

```ts
<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>
```

### bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>
```

### chain

```ts
<B>(f: (a: A) => Either<L, B>): Either<L, B>
```

### extend

```ts
<B>(f: (ea: Either<L, A>) => B): Either<L, B>
```

### fold

```ts
<B>(left: (l: L) => B, right: (a: A) => B): B
```

Applies a function to each case in the data structure

### getOrElse

```ts
(f: (l: L) => A): A
```

Returns the value from this `Right` or the result of given argument if this is a `Left`

### getOrElseValue

```ts
(a: A): A
```

Returns the value from this `Right` or the given argument if this is a `Left`

### inspect

```ts
(): string
```

### isLeft

```ts
(): boolean
```

Returns `true` if the either is an instance of `Left`, `false` otherwise

### isRight

```ts
(): boolean
```

Returns `true` if the either is an instance of `Right`, `false` otherwise

### map

```ts
<B>(f: (a: A) => B): Either<L, B>
```

### mapLeft

```ts
<M>(f: (l: L) => M): Either<M, A>
```

Maps the left side of the disjunction

### reduce

```ts
<B>(f: (b: B, a: A) => B, b: B): B
```

### swap

```ts
(): Either<A, L>
```

Swaps the disjunction values

### toOption

```ts
(): Option<A>
```

### toString

```ts
(): string
```

### traverse

```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>>
```

# either

_instance_

```ts
Monad<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Bifunctor<URI> &
  Alt<URI> &
  Extend<URI> &
  ChainRec<URI>
```

# alt

_function_

```ts
<L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A>
```

# ap

_function_

```ts
<L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B>
```

# bimap

_function_

```ts
<L, V, A, B>(f: (u: L) => V, g: (a: A) => B, fla: Either<L, A>): Either<V, B>
```

# chain

_function_

```ts
<L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B>
```

# chainRec

_function_

```ts
<L, A, B>(f: (a: A) => Either<L, Either<A, B>>, a: A): Either<L, B>
```

# extend

_function_

```ts
<L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B>
```

# fold

_function_

```ts
<L, A, B>(left: (l: L) => B, right: (a: A) => B) => (fa: Either<L, A>): B
```

Applies a function to each case in the data structure

# fromNullable

_function_

```ts
<L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A>
```

Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use the
provided default as a `Left`

# fromOption

_function_

```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```

Takes a default and a `Option` value, if the value is a `Some`, turn it into a `Right`, if the value is a `None` use the
provided default as a `Left`

# fromPredicate

_function_

```ts
<L, A>(predicate: Predicate<A>, l: (a: A) => L) => (a: A): Either<L, A>
```

# getOrElse

_function_

```ts
<L, A>(f: (l: L) => A) => (fa: Either<L, A>): A
```

Returns the value from this `Right` or the result of given argument if this is a `Left`

# getOrElseValue

_function_

```ts
<A>(a: A) => <L>(fa: Either<L, A>): A
```

Returns the value from this `Right` or the given argument if this is a `Left`

# getSetoid

_function_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>>
```

# isLeft

_function_

```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```

Returns `true` if the either is an instance of `Left`, `false` otherwise

# isRight

_function_

```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```

Returns `true` if the either is an instance of `Right`, `false` otherwise

# left

_function_

```ts
<L, A>(l: L): Either<L, A>
```

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure

# map

_function_

```ts
<L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B>
```

# mapLeft

_function_

```ts
<L, M>(f: (l: L) => M) => <A>(fa: Either<L, A>): Either<M, A>
```

Maps the left side of the disjunction

# of

_function_

```ts
<L, A>(a: A): Either<L, A>
```

# reduce

_function_

```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B
```

# right

_function_ Alias of

```ts
of
```

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias of
this structure

# swap

_function_

```ts
<L, A>(fa: Either<L, A>): Either<A, L>
```

Swaps the disjunction values

# toOption

_function_

```ts
<L, A>(fa: Either<L, A>): Option<A>
```

# tryCatch

_function_

```ts
<A>(f: Lazy<A>): Either<Error, A>
```
