MODULE [IO](https://github.com/gcanti/fp-ts/blob/master/src/IO.ts)
# IO
*data*
```ts
constructor(readonly run: Lazy<A>) {}
```
## Methods

### ap
```ts
<B>(fab: IO<(a: A) => B>): IO<B> 
```
### ap_
```ts
<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> 
```
### chain
```ts
<B>(f: (a: A) => IO<B>): IO<B> 
```
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): IO<B> 
```
### toString
```ts
(): string 
```
# io
*instance*
```ts
Monad<URI>
```
# ap
*function*
```ts
<A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B>
```

# chain
*function*
```ts
<A, B>(f: (a: A) => IO<B>, fa: IO<A>): IO<B>
```

# getMonoid
*function*
```ts
<A>(M: Monoid<A>): Monoid<IO<A>>
```

# getSemigroup
*function*
```ts
<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

# map
*function*
```ts
<A, B>(f: (a: A) => B, fa: IO<A>): IO<B>
```

# of
*function*
```ts
<A>(a: A): IO<A>
```