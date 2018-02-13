MODULE [Writer](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)

# Writer

_data_

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

_instance_

```ts
Functor2<URI>
```

# getMonad

_function_

```ts
<W>(M: Monoid<W>): Monad2C<URI, W>
```

# tell

_function_

```ts
<W>(w: W): Writer<W, void>
```
