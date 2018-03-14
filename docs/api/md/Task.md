MODULE [Task](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)

# Task

_data_
_since 1.0.0_

```ts
constructor(readonly run: Lazy<Promise<A>>) {}
```

## Methods

### ap

_method_
_since 1.0.0_

```ts
<B>(fab: Task<(a: A) => B>): Task<B>
```

### ap\_

_method_
_since 1.0.0_

```ts
<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>
```

### chain

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => Task<B>): Task<B>
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
<B>(f: (a: A) => B): Task<B>
```

### toString

_method_
_since 1.0.0_

```ts
(): string
```

# task

_instance_
_since 1.0.0_

```ts
Monad1<URI>
```

# fromIO

_function_

```ts
<A>(io: IO<A>): Task<A>
```

Lifts an IO action into a Task

# getMonoid

_function_

```ts
<A>(M: Monoid<A>): Monoid<Task<A>>
```

# getRaceMonoid

_function_

```ts
<A = never>(): Monoid<Task<A>>
```

# getSemigroup

_function_

```ts
<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

# tryCatch

_function_

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): Task<Either<L, A>>
```
