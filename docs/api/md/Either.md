MODULE [Either](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts)
# Either
*data*
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
<B, C>(this: Either<L, (a: B) => C>, fb: Either<L, B>): Either<L, C> 
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
### getOrElse
```ts
(f: (l: L) => A): A 
```
Returns the value from this `Right` or the given argument if this is a `Left`
### getOrElseValue
```ts
(a: A): A 
```
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): Either<L, B> 
```
### mapLeft
```ts
<M>(f: (l: L) => M): Either<M, A> 
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B 
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
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Either<L, B>> 
```
# either
*instance*
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
*function*
```ts
<L, A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A>
```

# ap
*function*
```ts
<L, A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B>
```

# bimap
*function*
```ts
<L, V, A, B>(f: (u: L) => V, g: (a: A) => B, fla: Either<L, A>): Either<V, B>
```

# chain
*function*
```ts
<L, A, B>(f: (a: A) => Either<L, B>, fa: Either<L, A>): Either<L, B>
```

# chainRec
*function*
```ts
<L, A, B>(f: (a: A) => Either<L, Either<A, B>>, a: A): Either<L, B>
```

# extend
*function*
```ts
<L, A, B>(f: (ea: Either<L, A>) => B, ea: Either<L, A>): Either<L, B>
```

# fold
*function*
```ts
<L, A, B>(left: (l: L) => B, right: (a: A) => B) => (fa: Either<L, A>): B
```

# fromNullable
*function*
```ts
<L>(defaultValue: L) => <A>(a: A | null | undefined): Either<L, A>
```
Takes a default and a nullable value, if the value is not nully, turn it into
a `Right`, if the value is nully use the provided default as a `Left`

# fromOption
*function*
```ts
<L>(defaultValue: L) => <A>(fa: Option<A>): Either<L, A>
```
Takes a default and a `Option` value, if the value is a `Some`, turn it into
a `Right`, if the value is a `None` use the provided default as a `Left`

# fromPredicate
*function*
```ts
<L, A>(predicate: Predicate<A>, l: (a: A) => L) => (a: A): Either<L, A>
```

# getOrElse
*function*
```ts
<L, A>(f: (l: L) => A) => (fa: Either<L, A>): A
```
Returns the value from this `Right` or the given argument if this is a `Left`

# getOrElseValue
*function*
```ts
<L, A>(a: A) => (fa: Either<L, A>): A
```
Returns the value from this `Right` or the given argument if this is a `Left`

# getSetoid
*function*
```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<Either<L, A>>
```

# isLeft
*function*
```ts
<L, A>(fa: Either<L, A>): fa is Left<L, A>
```

# isRight
*function*
```ts
<L, A>(fa: Either<L, A>): fa is Right<L, A>
```

# left
*function*
```ts
<L, A>(l: L): Either<L, A>
```

# map
*function*
```ts
<L, A, B>(f: (a: A) => B, fa: Either<L, A>): Either<L, B>
```

# mapLeft
*function*
```ts
<L, M>(f: (l: L) => M) => <A>(fa: Either<L, A>): Either<M, A>
```

# of
*function*
```ts
<L, A>(a: A): Either<L, A>
```

# reduce
*function*
```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: Either<L, A>): B
```

# right
*function*
Alias of
```ts
of
```

# toOption
*function*
```ts
<L, A>(fa: Either<L, A>): Option<A>
```

# tryCatch
*function*
```ts
<A>(f: Lazy<A>): Either<Error, A>
```