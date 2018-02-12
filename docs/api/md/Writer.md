MODULE [Writer](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)
# Writer
*data*
```ts
constructor(readonly run: () => [A, W]) {}
```
## Methods

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
*instance*
```ts
Functor2<URI>
```
# getMonad
*function*
```ts
<W>(M: Monoid<W>): Monad2C<URI, W>
```

# tell
*function*
```ts
<W>(w: W): Writer<W, void>
```