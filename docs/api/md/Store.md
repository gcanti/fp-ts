MODULE [Store](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts)

# Store

_data_
_since 1.0.0_

```ts
constructor(readonly peek: (s: S) => A, readonly pos: S) {}
```

## Methods

### extend

_method_
_since 1.0.0_

```ts
<B>(f: (sa: Store<S, A>) => B): Store<S, B>
```

### extract

_method_
_since 1.0.0_

```ts
(): A
```

### inspect

_method_
_since 1.0.0_

```ts
(): string
```

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): Store<S, B>
```

### seek

_method_
_since 1.0.0_

```ts
(s: S): Store<S, A>
```

Reposition the focus at the specified position

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# store

_instance_
_since 1.0.0_

```ts
Comonad2<URI>
```

# experiment

_function_

```ts
experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A>
```

Extract a collection of values from positions which depend on the current position

# peeks

_function_

```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A
```

Extract a value from a position which depends on the current position

# seeks

_function_

```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A>
```

Reposition the focus at the specified position, which depends on the current position
