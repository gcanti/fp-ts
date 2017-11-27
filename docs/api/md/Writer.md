MODULE [Writer](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)

# Writer

_data_

```ts
constructor(readonly monoid: Monoid<W>, readonly run: Lazy<[A, W]>) {}
```

## Methods

### ap

```ts
<B>(fab: Writer<W, (a: A) => B>): Writer<W, B>
```

### ap_

```ts
<B, C>(this: Writer<W, (b: B) => C>, fb: Writer<W, B>): Writer<W, C>
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

_instance_

```ts
Functor<URI>
```

# ap

_function_

```ts
<W, A, B>(fab: Writer<W, (a: A) => B>, fa: Writer<W, A>): Writer<W, B>
```

# chain

_function_

```ts
<W, A, B>(f: (a: A) => Writer<W, B>, fa: Writer<W, A>): Writer<W, B>
```

# getMonad

_function_

```ts
<W>(M: Monoid<W>): Monad<URI>
```

# map

_function_

```ts
<W, A, B>(f: (a: A) => B, fa: Writer<W, A>): Writer<W, B>
```

# of

_function_

```ts
<W>(M: Monoid<W>) => <A>(a: A): Writer<W, A>
```

# tell

_function_

```ts
<W>(M: Monoid<W>) => (w: W): Writer<W, void>
```
