MODULE [IxIO](https://github.com/gcanti/fp-ts/blob/master/src/IxIO.ts)

# IxIO

_data_

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

_instance_

```ts
Monad<URI> & IxMonad<URI>
```

# ap

_function_

```ts
<I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# chain

_function_

```ts
<I, A, B>(f: (a: A) => IxIO<I, I, B>, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# ichain

_function_

```ts
<I, O, Z, A, B>(f: (a: A) => IxIO<O, Z, B>, fa: IxIO<I, O, A>): IxIO<I, Z, B>
```

# iof

_function_

```ts
<I, A>(a: A): IxIO<I, I, A>
```

# map

_function_

```ts
<I, A, B>(f: (a: A) => B, fa: IxIO<I, I, A>): IxIO<I, I, B>
```

# of

_function_ Alias of

```ts
iof
```
