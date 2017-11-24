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

### concat

```ts
(fy: Task<A>): Task<A>
```

Selects the earlier of two Tasks

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
Monad<URI> & Monoid<Task<any>>
```

# ap

_function_

```ts
<A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B>
```

# chain

_function_

```ts
<A, B>(f: (a: A) => Task<B>, fa: Task<A>): Task<B>
```

# concat

_function_

```ts
<A>(fx: Task<A>) => (fy: Task<A>): Task<A>
```

Selects the earlier of two Tasks

# empty

_function_

```ts
<A>(): Task<A>
```

Returns a task that never completes

# fromIO

_function_

```ts
<A>(io: IO<A>): Task<A>
```

Lifts an IO action into a Task

# getMonoid

_function_

```ts
<A>(): Monoid<Task<A>>
```

# map

_function_

```ts
<A, B>(f: (a: A) => B, fa: Task<A>): Task<B>
```

# of

_function_

```ts
<A>(a: A): Task<A>
```

# tryCatch

_function_

```ts
<A>(f: Lazy<Promise<A>>) => <L>(onrejected: (reason: {}) => L): Task<Either<L, A>>
```
