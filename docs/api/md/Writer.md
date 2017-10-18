MODULE [Writer](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)
# Writer
data
```ts
constructor(readonly monoid: Monoid<W>, readonly run: Lazy<[A, W]>) {}
```
## Methods

### ap
```ts
<B>(fab: Writer<W, (a: A) => B>): Writer<W, B> 
```
### chain
```ts
<B>(f: (a: A) => Writer<W, B>): Writer<W, B> 
```
### eval
```ts
(): A 
```
### exec
```ts
(): W 
```
### map
```ts
<B>(f: (a: A) => B): Writer<W, B> 
```
# writer
instance
```ts
Functor<URI>
```
# ap
function
```ts
<W, A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B>
```

# chain
function
```ts
<W, A, B>(f: (a: A) => Writer<W, B>, fa: Writer<W, A>): Writer<W, B>
```

# getMonad
function
```ts
<W>(monoid: Monoid<W>): Monad<URI>
```

# map
function
```ts
<W, A, B>(f: (a: A) => B, fa: Writer<W, A>): Writer<W, B>
```

# of
function
```ts
<W>(M: Monoid<W>) => <A>(a: A): Writer<W, A>
```

# tell
function
```ts
<W>(M: Monoid<W>) => (w: W): Writer<W, void>
```