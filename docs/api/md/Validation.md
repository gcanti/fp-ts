MODULE [Validation](https://github.com/gcanti/fp-ts/blob/master/src/Validation.ts)
# Validation
*data*
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
*instance*
```ts
Semigroup<Validation<any, any>> &
  Functor<URI> &
  Applicative<URI> &
  Foldable<URI> &
  Traversable<URI> &
  Alt<URI>
```
# alt
*function*
```ts
<L, A>(fx: Validation<L, A>, fy: Validation<L, A>): Validation<L, A>
```

# ap
*function*
```ts
<L, A, B>(fab: Validation<L, (a: A) => B>, fa: Validation<L, A>): Validation<L, B>
```

# bimap
*function*
```ts
<M>(S: Semigroup<M>) => <L, A, B>(f: (l: L) => M, g: (a: A) => B) => (
  fa: Validation<L, A>
): Validation<M, B>
```

# concat
*function*
```ts
<L, A>(fx: Validation<L, A>) => (fy: Validation<L, A>): Validation<L, A>
```

# failure
*function*
```ts
<L>(L: Semigroup<L>) => <A>(l: L): Validation<L, A>
```

# fold
*function*
```ts
<L, A, B>(failure: (l: L) => B, success: (a: A) => B) => (fa: Validation<L, A>): B
```

# fromEither
*function*
```ts
<L>(S: Semigroup<L>): (<A>(e: Either<L, A>) => Validation<L, A>)
```

# fromPredicate
*function*
```ts
<L>(S: Semigroup<L>) => <A>(predicate: Predicate<A>, f: (a: A) => L) => (
  a: A
): Validation<L, A>
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

# map
*function*
```ts
<L, A, B>(f: (a: A) => B, fa: Validation<L, A>): Validation<L, B>
```

# mapFailure
*function*
```ts
<M>(S: Semigroup<M>) => <L>(f: (l: L) => M) => <A>(
  fa: Validation<L, A>
): Validation<M, A>
```

# of
*function*
```ts
<L, A>(a: A): Validation<L, A>
```

# reduce
*function*
```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Validation<L, A>): B
```

# success
*function*
Alias of
```ts
of
```

# swap
*function*
```ts
<L, A>(S: Semigroup<A>) => (fa: Validation<L, A>): Validation<A, L>
```

# toEither
*function*
```ts
<L, A>(fa: Validation<L, A>): Either<L, A>
```

# toOption
*function*
```ts
<L, A>(fa: Validation<L, A>): Option<A>
```

# traverse
*function*
```ts
traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: Validation<L, A>) => HKT<F, Validation<L, B>> 
```