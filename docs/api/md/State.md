MODULE [State](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

# State

_data_

```ts
constructor(readonly run: (s: S) => [A, S]) {}
```

## Methods

### ap

```ts
<B>(fab: State<S, (a: A) => B>): State<S, B>
```

### ap_

```ts
<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>
```

### chain

```ts
<B>(f: (a: A) => State<S, B>): State<S, B>
```

### eval

```ts
(s: S): A
```

### exec

```ts
(s: S): S
```

### map

```ts
<B>(f: (a: A) => B): State<S, B>
```

# state

_instance_

```ts
Monad<URI>
```

# ap

_function_

```ts
<S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B>
```

# chain

_function_

```ts
<S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B>
```

# get

_function_

```ts
<S>(): State<S, S>
```

# gets

_function_

```ts
<S, A>(f: (s: S) => A): State<S, A>
```

# map

_function_

```ts
<S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B>
```

# modify

_function_

```ts
<S>(f: (s: S) => S): State<S, undefined>
```

# of

_function_

```ts
<S, A>(a: A): State<S, A>
```

# put

_function_

```ts
<S>(s: S): State<S, undefined>
```
