MODULE [Pair](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)
# Pair
*data*
```ts
constructor(readonly value: [A, A]) {}
```
## Methods

### ap
```ts
<B>(fab: Pair<(a: A) => B>): Pair<B> 
```
### ap_
```ts
<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> 
```
### extend
```ts
<B>(f: (fb: Pair<A>) => B): Pair<B> 
```
### extract
```ts
(): A 
```
### first
```ts
(f: Endomorphism<A>): Pair<A> 
```
Map a function over the first field of a pair
### fst
```ts
(): A 
```
### map
```ts
<B>(f: (a: A) => B): Pair<B> 
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B 
```
### second
```ts
(f: Endomorphism<A>): Pair<A> 
```
Map a function over the second field of a pair
### snd
```ts
(): A 
```
### swap
```ts
(): Pair<A> 
```
Swaps the elements in a pair
### traverse
```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, Pair<B>> 
```
# pair
*instance*
```ts
Applicative<URI> & Foldable<URI> & Traversable<URI> & Comonad<URI>
```
# ap
*function*
```ts
<A, B>(fab: Pair<(a: A) => B>, fa: Pair<A>): Pair<B>
```

# extend
*function*
```ts
<A, B>(f: (fb: Pair<A>) => B, fa: Pair<A>): Pair<B>
```

# extract
*function*
```ts
<A>(fa: Pair<A>): A
```

# first
*function*
```ts
<A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A>
```
Map a function over the first field of a pair

# getMonoid
*function*
```ts
<A>(M: Monoid<A>): Monoid<Pair<A>>
```

# getOrd
*function*
```ts
<A>(O: Ord<A>): Ord<Pair<A>>
```

# getSemigroup
*function*
```ts
<A>(S: Semigroup<A>): Semigroup<Pair<A>>
```

# getSetoid
*function*
```ts
<A>(S: Setoid<A>): Setoid<Pair<A>>
```

# map
*function*
```ts
<A, B>(f: (a: A) => B, fa: Pair<A>): Pair<B>
```

# of
*function*
```ts
<A>(a: A): Pair<A>
```

# reduce
*function*
```ts
<A, B>(f: (b: B, a: A) => B, b: B, fa: Pair<A>): B
```

# second
*function*
```ts
<A>(f: Endomorphism<A>) => (fa: Pair<A>): Pair<A>
```
Map a function over the second field of a pair

# swap
*function*
```ts
<A>(fa: Pair<A>): Pair<A>
```
Swaps the elements in a pair

# traverse
*function*
```ts
traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: Pair<A>) => HKT<F, Pair<B>> 
```