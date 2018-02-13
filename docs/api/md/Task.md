MODULE [Task](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)

# Task

_data_

```ts
constructor(readonly run: Lazy<Promise<A>>) {}
```

## Methods

### ap

```ts
<B>(fab: Task<(a: A) => B>): Task<B>
```

### ap_

```ts
<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>
```

### chain

```ts
<B>(f: (a: A) => Task<B>): Task<B>
```

### inspect

```ts
(): string
```

### map

```ts
<B>(f: (a: A) => B): Task<B>
```

### toString

```ts
(): string
```

# task

_instance_

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
