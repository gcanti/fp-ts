MODULE [Task](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)

# Task

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly run: Lazy<Promise<A>>) {}
```

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: Task<(a: A) => B>): Task<B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>
```

### applyFirst

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: Task<B>): Task<A>
```

_Description_

Combine two effectful actions, keeping only the result of the first

### applySecond

_method_

_since 1.5.0_

_Signature_

```ts
<B>(fb: Task<B>): Task<B>
```

_Description_

Combine two effectful actions, keeping only the result of the second

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => Task<B>): Task<B>
```

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): Task<B>
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

# task

_instance_

_since 1.0.0_

_Signature_

```ts
Monad1<URI>
```

# fromIO

_function_

_since 1.0.0_

_Signature_

```ts
<A>(io: IO<A>): Task<A>
```

_Description_

Lifts an IO action into a Task

# getMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(M: Monoid<A>): Monoid<Task<A>>
```

# getRaceMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Monoid<Task<A>>
```

# getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

# tryCatch

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): Task<Either<L, A>>
```
