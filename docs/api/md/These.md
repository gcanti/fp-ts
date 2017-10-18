MODULE [These](https://github.com/gcanti/fp-ts/blob/master/src/These.ts)
# These
data
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
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): These<L, B> 
```
### reduce
```ts
<B>(f: (b: B, a: A) => B, b: B): B 
```
### toString
```ts
(): string 
```
### traverse
```ts
<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, These<L, B>> 
```
# these
instance
```ts
Functor<URI> & Bifunctor<URI> & Foldable<URI> & Traversable<URI>
```
# ap
function
```ts
<L>(S: Semigroup<L>) => <A, B>(fab: These<L, (a: A) => B>, fa: These<L, A>)
```

# bimap
function
```ts
<L, M, A, B>(f: (l: L) => M, g: (a: A) => B, fla: These<L, A>): These<M, B>
```

# both
function
```ts
<L, A>(l: L, a: A): These<L, A>
```

# chain
function
```ts
<L>(S: Semigroup<L>) => <A, B>(f: (a: A) => These<L, B>, fa: These<L, A>): These<L, B>
```

# fold
function
```ts
<L, A, B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B) => (
  fa: These<L, A>
): B
```

# fromThese
function
```ts
<L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>): [L, A]
```

# getMonad
function
```ts
<L>(S: Semigroup<L>): Monad<URI>
```

# getSemigroup
function
```ts
<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>
```

# getSetoid
function
```ts
<L, A>(SL: Setoid<L>, SA: Setoid<A>): Setoid<These<L, A>>
```

# isBoth
function
```ts
<L, A>(fa: These<L, A>): fa is Both<L, A>
```

# isThat
function
```ts
<L, A>(fa: These<L, A>): fa is That<L, A>
```

# isThis
function
```ts
<L, A>(fa: These<L, A>): fa is This<L, A>
```

# map
function
```ts
<L, A, B>(f: (a: A) => B, fa: These<L, A>): These<L, B>
```

# of
function
```ts
<L, A>(a: A): These<L, A>
```

# reduce
function
```ts
<L, A, B>(f: (b: B, a: A) => B, b: B, fa: These<L, A>): B
```

# that
function
Alias of
```ts
of
```

# theseLeft
function
```ts
<L, A>(fa: These<L, A>): Option<L>
```

# theseRight
function
```ts
<L, A>(fa: These<L, A>): Option<A>
```

# this_
function
```ts
<L, A>(l: L): These<L, A>
```

# traverse
function
```ts
traverse<F>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT<F, B>, ta: These<L, A>) => HKT<F, These<L, B>> 
```