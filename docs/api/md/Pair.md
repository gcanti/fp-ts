MODULE [Pair](https://github.com/gcanti/fp-ts/blob/master/src/Pair.ts)
# Pair
*data*
```ts
constructor(readonly fst: A, readonly snd: A) {}
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
### map
```ts
<B>(f: (a: A) => B): Pair<B> 
```
### reduce
```ts
<B>(b: B, f: (b: B, a: A) => B): B 
```
### second
```ts
(f: Endomorphism<A>): Pair<A> 
```
Map a function over the second field of a pair
### swap
```ts
(): Pair<A> 
```
Swaps the elements in a pair
# pair
*instance*
```ts
Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>
```
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