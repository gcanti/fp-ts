MODULE [Validation](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)
# Validation
*data*
```ts
type Validation<L, A> = Failure<L, A> | Success<L, A>
```
The `Validation` functor, used for applicative validation

The `Applicative` instance collects multiple failures in
an arbitrary `Semigroup`.
## Methods

### bimap
```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B> 
```
### fold
```ts
<B>(failure: (l: L) => B, success: (a: A) => B): B 
```
### getOrElse
```ts
(a: A): A 
```
Returns the value from this `Success` or the given argument if this is a `Failure`
### getOrElseL
```ts
(f: (l: L) => A): A 
```
Returns the value from this `Success` or the result of given argument if this is a `Failure`
### inspect
```ts
(): string 
```
### isFailure
```ts
(): this is Failure<L, A> 
```
Returns `true` if the validation is an instance of `Failure`, `false` otherwise
### isSuccess
```ts
(): this is Success<L, A> 
```
Returns `true` if the validation is an instance of `Success`, `false` otherwise
### map
```ts
<B>(f: (a: A) => B): Validation<L, B> 
```
### mapFailure
```ts
<M>(f: (l: L) => M): Validation<M, A> 
```
### reduce
```ts
<B>(b: B, f: (b: B, a: A) => B): B 
```
### swap
```ts
(): Validation<A, L> 
```
### toString
```ts
(): string 
```
# validation
*instance*
```ts
Functor2<URI> & Foldable2<URI> & Traversable2<URI>
```
# failure
*function*
```ts
<L, A>(l: L): Validation<L, A>
```

# fromEither
*function*
```ts
<L, A>(e: Either<L, A>): Validation<L, A>
```

# fromPredicate
*function*
```ts
<L, A>(predicate: Predicate<A>, f: (a: A) => L) => (a: A): Validation<L, A>
```

# getAlt
*function*
```ts
<L>(S: Semigroup<L>): Alt2C<URI, L>
```

# getApplicative
*function*
```ts
<L>(S: Semigroup<L>): Applicative2C<URI, L>
```

# getMonad
*function*
```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

# getMonoid
*function*
```ts
<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Validation<L, A>>
```

# getSemigroup
*function*
```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Validation<L, A>>
```

# getSetoid
*function*
```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Validation<L, A>>
```

# isFailure
*function*
```ts
<L, A>(fa: Validation<L, A>): fa is Failure<L, A>
```
Returns `true` if the validation is an instance of `Failure`, `false` otherwise

# isSuccess
*function*
```ts
<L, A>(fa: Validation<L, A>): fa is Success<L, A>
```
Returns `true` if the validation is an instance of `Success`, `false` otherwise

# success
*function*
Alias of
```ts
of
```