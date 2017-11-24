MODULE [Validation](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)

# Validation

_data_

```ts
type Validation<L, A> = Failure<L, A> | Success<L, A>
```

A data-type like Either but with an accumulating `Applicative`

## Methods

### alt

```ts
(fy: Validation<L, A>): Validation<L, A>
```

### ap

```ts
<B>(fab: Validation<L, (a: A) => B>): Validation<L, B>
```

### ap_

```ts
<B, C>(this: Validation<L, (b: B) => C>, fb: Validation<L, B>): Validation<L, C>
```

### bimap

```ts
<M>(S: Semigroup<M>): <B>(f: (l: L) => M, g: (a: A) => B) => Validation<M, B>
```

### concat

```ts
(fy: Validation<L, A>): Validation<L, A>
```

### equals

```ts
(SL: Setoid<L>, SA: Setoid<A>): (fy: Validation<L, A>) => boolean
```

### fold

```ts
<B>(failure: (l: L) => B, success: (a: A) => B): B
```

### inspect

```ts
(): string
```

### isFailure

```ts
(): boolean
```

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

### isSuccess

```ts
(): boolean
```

Returns `true` if the validation is an instance of `Success`, `false` otherwise

### map

```ts
<B>(f: (a: A) => B): Validation<L, B>
```

### mapFailure

```ts
<M>(S: Semigroup<M>): (f: (l: L) => M) => Validation<M, A>
```

### reduce

```ts
<B>(f: (b: B, a: A) => B, b: B): B
```

### swap

```ts
(S: Semigroup<A>): Validation<A, L>
```

### toEither

```ts
(): Either<L, A>
```

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
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Validation<L, B>>
```

# validation

_instance_

```ts
Semigroup<Validation<any, any>> &
  Functor<URI> &
  Applicative<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Alt<URI>
```

# alt

_function_

```ts
<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A>
```

# ap

_function_

```ts
<L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B>
```

# bimap

_function_

```ts
<M>(S: Semigroup<M>) => <L, A, B>(f: (l: L) => M, g: (a: A) => B) => (
  fa: Validation<L, A>
): Validation<M, B>
```

# concat

_function_

```ts
<L, A>(fx: Validation<L, A>) => (fy: Validation<L, A>): Validation<L, A>
```

# failure

_function_

```ts
<L>(L: Semigroup<L>) => <A>(l: L): Validation<L, A>
```

# fold

_function_

```ts
<L, A, B>(failure: (l: L) => B, success: (a: A) => B) => (fa: Validation<L, A>): B
```

# fromEither

_function_

```ts
<L>(S: Semigroup<L>): (<A>(e: Either<L, A>) => Validation<L, A>)
```

# fromPredicate

_function_

```ts
<L>(S: Semigroup<L>) => <A>(predicate: Predicate<A>, f: (a: A) => L) => (
  a: A
): Validation<L, A>
```

# getSemigroup

_function_

```ts
<L, A>(): Semigroup<Validation<L, A>>
```

# getSetoid

_function_

```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>>
```

# isFailure

_function_

```ts
<L, A>(fa: Validation<L, A>): fa is Failure<L, A>
```

Returns `true` if the validation is an instance of `Failure`, `false` otherwise

# isSuccess

_function_

```ts
<L, A>(fa: Validation<L, A>): fa is Success<L, A>
```

Returns `true` if the validation is an instance of `Success`, `false` otherwise

# map

_function_

```ts
<L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B>
```

# mapFailure

_function_

```ts
<M>(S: Semigroup<M>) => <L>(f: (l: L) => M) => <A>(
  fa: Validation<L, A>
): Validation<M, A>
```

# of

_function_

```ts
<L, A>(a: A): Validation<L, A>
```

# reduce

_function_

```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B
```

# success

_function_ Alias of

```ts
of
```

# swap

_function_

```ts
<A>(S: Semigroup<A>) => <L>(fa: Validation<L, A>): Validation<A, L>
```

# toEither

_function_

```ts
<L, A>(fa: Validation<L, A>): Either<L, A>
```

# toOption

_function_

```ts
<L, A>(fa: Validation<L, A>): Option<A>
```

# traverse

_function_

```ts
traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>>
```
