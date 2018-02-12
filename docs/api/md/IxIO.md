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
IxMonad3<URI>
```
# getMonad
*function*
```ts
<I = never>(): Monad3C<URI, I, I>
```

# iof
*function*
```ts
<I, A>(a: A): IxIO<I, I, A>
```