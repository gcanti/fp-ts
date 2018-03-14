MODULE [Validation](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)

# Validation

_data_
_since 1.0.0_

```ts
type Validation<L, A> = Failure<L, A> | Success<L, A>
```

The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in
an arbitrary `Semigroup`.

## Methods

### bimap

_method_
_since 1.0.0_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>
```

### fold

_method_
_since 1.0.0_

```ts
<B>(failure: (l: L) => B, success: (a: A) => B): B
```

### getOrElse

_method_
_since 1.0.0_

```ts
(a: A): A
```

Returns the value from this `Success` or the given argument if this is a `Failure`

### getOrElseL

_method_
_since 1.0.0_

```ts
(f: (l: L) => A): A
```

Returns the value from this `Success` or the result of given argument if this is a `Failure`

### inspect

_method_
_since 1.0.0_

```ts
(): string
```

### isFailure

_method_
_since 1.0.0_

```ts
(): this is Failure<L, A>
```

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

### isSuccess

_method_
_since 1.0.0_

```ts
(): this is Success<L, A>
```

Returns `true` if the validation is an instance of `Success`, `false` otherwise

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): Validation<L, B>
```

### mapFailure

_method_
_since 1.0.0_

```ts
<M>(f: (l: L) => M): Validation<M, A>
```

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
(): Validation<A, L>
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# validation

_instance_
_since 1.0.0_

```ts
Functor2<URI> & Foldable2<URI> & Traversable2<URI>
```

# failure

_function_
_since 1.0.0_

```ts
<L, A>(l: L): Validation<L, A>
```

# fromEither

_function_
_since 1.0.0_

```ts
<L, A>(e: Either<L, A>): Validation<L, A>
```

# fromPredicate

_function_
_since 1.0.0_

```ts
<L, A>(predicate: Predicate<A>, f: (a: A) => L) => (a: A): Validation<L, A>
```

# getAlt

_function_
_since 1.0.0_

```ts
<L>(S: Semigroup<L>): Alt2C<URI, L>
```

# getApplicative

_function_
_since 1.0.0_

```ts
<L>(S: Semigroup<L>): Applicative2C<URI, L>
```

# getMonad

_function_
_since 1.0.0_

```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

# getMonoid

_function_
_since 1.0.0_

```ts
<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>>
```

# getSemigroup

_function_
_since 1.0.0_

```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>>
```

# getSetoid

_function_
_since 1.0.0_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>>
```

# isFailure

_function_
_since 1.0.0_

```ts
<L, A>(fa: Validation<L, A>): fa is Failure<L, A>
```

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

# isSuccess

_function_
_since 1.0.0_

```ts
<L, A>(fa: Validation<L, A>): fa is Success<L, A>
```

Returns `true` if the validation is an instance of `Success`, `false` otherwise

# success

_function_
_since 1.0.0_
Alias of

```ts
of
```
