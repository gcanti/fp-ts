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

# censor

_function_

_since 1.3.0_

```ts
<W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A>
```

Modify the final accumulator value by applying a function

# getMonad

_function_

_since 1.0.0_

```ts
<W>(M: Monoid<W>): Monad2C<URI, W>
```

# listen

_function_

_since 1.3.0_

```ts
<W, A>(fa: Writer<W, A>): Writer<W, [A, W]>
```

Modifies the result to include the changes to the accumulator

# listens

_function_

_since 1.3.0_

```ts
<W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]>
```

Projects a value from modifications made to the accumulator during an action

# pass

_function_

_since 1.3.0_

```ts
<W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A>
```

Applies the returned function to the accumulator

# tell

_function_

_since 1.0.0_

```ts
<W>(w: W): Writer<W, void>
```

Appends a value to the accumulator
