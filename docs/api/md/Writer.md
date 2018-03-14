MODULE [Writer](https://github.com/gcanti/fp-ts/blob/master/src/Writer.ts)

# Writer

_data_
_since 1.0.0_

```ts
constructor(readonly run: () => [A, W]) {}
```

## Methods

### eval

_method_
_since 1.0.0_

```ts
(): A
```

### exec

_method_
_since 1.0.0_

```ts
(): W
```

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): Writer<W, B>
```

# writer

_instance_
_since 1.0.0_

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
