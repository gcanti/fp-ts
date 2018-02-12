MODULE [These](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)
# These
*data*
```ts
type These<L, A> = This<L, A> | That<L, A> | Both<L, A>
```
## Methods

### bimap
```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B> 
```
### fold
```ts
<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B 
```
Applies a function to each case in the data structure
### inspect
```ts
(): string 
```
### isBoth
```ts
(): this is Both<L, A> 
```
Returns `true` if the these is `Both`, `false` otherwise
### isThat
```ts
(): this is That<L, A> 
```
Returns `true` if the these is `That`, `false` otherwise
### isThis
```ts
(): this is This<L, A> 
```
Returns `true` if the these is `This`, `false` otherwise
### map
```ts
<B>(f: (a: A) => B): These<L, B> 
```
### reduce
```ts
<B>(b: B, f: (b: B, a: A) => B): B 
```
### toString
```ts
(): string 
```
# these
*instance*
```ts
Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>
```
# both
*function*
```ts
<L, A>(l: L, a: A): These<L, A>
```

# fromThese
*function*
```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

# getMonad
*function*
```ts
<L>(S: Semigroup<L>): Monad2C<URI, L>
```

# getSemigroup
*function*
```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

# getSetoid
*function*
```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

# isBoth
*function*
```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```
Returns `true` if the these is an instance of `Both`, `false` otherwise

# isThat
*function*
```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```
Returns `true` if the these is an instance of `That`, `false` otherwise

# isThis
*function*
```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```
Returns `true` if the these is an instance of `This`, `false` otherwise

# that
*function*
Alias of
```ts
of
```

# theseLeft
*function*
```ts
<L, A>(fa: These<L, A>): Option<L>
```

# theseRight
*function*
```ts
<L, A>(fa: These<L, A>): Option<A>
```

# this_
*function*
```ts
<L, A>(l: L): These<L, A>
```