MODULE [Tuple](https://github.com/gcanti/fp-ts/blob/master/src/Tuple.ts)
# Tuple
*data*
```ts
constructor(readonly fst: L, readonly snd: A) {}
```
## Methods

### bimap
```ts
<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> 
```
### compose
```ts
<B>(ab: Tuple<A, B>): Tuple<L, B> 
```
### extend
```ts
<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> 
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
<B>(f: (a: A) => B): Tuple<L, B> 
```
### reduce
```ts
<B>(b: B, f: (b: B, a: A) => B): B 
```
### swap
```ts
(): Tuple<A, L> 
```
Exchange the first and second components of a tuple
### toString
```ts
(): string 
```
### toTuple
```ts
(): [L, A] 
```
# tuple
*instance*
```ts
Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>
```
# getApplicative
*function*
```ts
<L>(M: Monoid<L>): Applicative2C<URI, L>
```

# getApply
*function*
```ts
<L>(S: Semigroup<L>): Apply2C<URI, L>
```

# getChain
*function*
```ts
<L>(M: Monoid<L>): Chain2C<URI, L>
```

# getChainRec
*function*
```ts
<L>(M: Monoid<L>): ChainRec2C<URI, L>
```

# getMonad
*function*
```ts
<L>(M: Monoid<L>): Monad2C<URI, L>
```

# getMonoid
*function*
```ts
<L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>>
```

# getOrd
*function*
```ts
<L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>>
```
To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

# getSemigroup
*function*
```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>>
```

# getSetoid
*function*
```ts
<L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>>
```