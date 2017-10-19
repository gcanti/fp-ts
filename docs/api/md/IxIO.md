MODULE [IxIO](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)
# IxIO
*data*
```ts
constructor(readonly value: IO<A>) {}
```
## Methods

### ap
```ts
<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> 
```
### chain
```ts
<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> 
```
### ichain
```ts
<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> 
```
### map
```ts
<B>(f: (a: A) => B): IxIO<I, O, B> 
```
### run
```ts
(): A 
```
# ixIO
*instance*
```ts
Monad<URI> & IxMonad<URI>
```
# ap
*function*
```ts
<I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# chain
*function*
```ts
<I, A, B>(f: (a: A) => IxIO<I, I, B>, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# ichain
*function*
```ts
<I, O, Z, A, B>(f: (a: A) => IxIO<O, Z, B>, fa: IxIO<I, O, A>): IxIO<I, Z, B>
```

# iof
*function*
```ts
<I, A>(a: A): IxIO<I, I, A>
```

# map
*function*
```ts
<I, A, B>(f: (a: A) => B, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# of
*function*
Alias of
```ts
iof
```