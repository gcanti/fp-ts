MODULE [State](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)

# State

_data_

_since 1.0.0_

```ts
constructor(readonly run: (s: S) => [A, S]) {}
```

## Methods

### ap

_method_

_since 1.0.0_

```ts
<B>(fab: State<S, (a: A) => B>): State<S, B>
```

### ap\_

_method_

_since 1.0.0_

```ts
<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>
```

### chain

_method_

_since 1.0.0_

```ts
<B>(f: (a: A) => State<S, B>): State<S, B>
```

### eval

_method_

_since 1.0.0_

```ts
(s: S): A
```

### exec

_method_

_since 1.0.0_

```ts
(s: S): S
```

### map

_method_

_since 1.0.0_

```ts
<B>(f: (a: A) => B): State<S, B>
```

# state

_instance_

_since 1.0.0_

```ts
Monad2<URI>
```

# get

_function_

_since 1.0.0_

```ts
<S>(): State<S, S>
```

Get the current state

# gets

_function_

_since 1.0.0_

```ts
<S, A>(f: (s: S) => A): State<S, A>
```

Get a value which depends on the current state

# modify

_function_

_since 1.0.0_

```ts
<S>(f: (s: S) => S): State<S, undefined>
```

Modify the state by applying a function to the current state

# put

_function_

_since 1.0.0_

```ts
<S>(s: S): State<S, void>
```

Set the state
