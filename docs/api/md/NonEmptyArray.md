MODULE [NonEmptyArray](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)
# NonEmptyArray
*data*
```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```
## Methods

### ap
```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B> 
```
### ap_
```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C> 
```
### chain
```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B> 
```
### concat
```ts
(y: NonEmptyArray<A>): NonEmptyArray<A> 
```
### concatArray
```ts
(as: Array<A>): NonEmptyArray<A> 
```
### extend
```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B> 
```
### extract
```ts
(): A 
```
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): NonEmptyArray<B> 
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B 
```
### toArray
```ts
(): Array<A> 
```
### toString
```ts
(): string 
```
### traverse
```ts
<F>(applicative: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, NonEmptyArray<B>> 
```
# nonEmptyArray
*instance*
```ts
Monad<URI> & Comonad<URI> & Semigroup<any> & Foldable<URI> & Traversable<URI>
```
# ap
*function*
```ts
<A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>): NonEmptyArray<B>
```

# chain
*function*
```ts
<A, B>(f: (a: A) => NonEmptyArray<B>, fa: NonEmptyArray<A>): NonEmptyArray<B>
```

# concat
*function*
```ts
<A>(fx: NonEmptyArray<A>) => (fy: NonEmptyArray<A>): NonEmptyArray<A>
```

# extend
*function*
```ts
<A, B>(f: (fa: NonEmptyArray<A>) => B, fa: NonEmptyArray<A>): NonEmptyArray<B>
```

# extract
*function*
```ts
<A>(fa: NonEmptyArray<A>): A
```

# fromArray
*function*
```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

# map
*function*
```ts
<A, B>(f: (a: A) => B, fa: NonEmptyArray<A>): NonEmptyArray<B>
```

# of
*function*
```ts
<A>(a: A): NonEmptyArray<A>
```

# reduce
*function*
```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: NonEmptyArray<A>): B
```