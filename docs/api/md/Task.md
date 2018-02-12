MODULE [Task](https://github.com/gcanti/fp-ts/blob/master/src/Task.ts)
# Task
*data*
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
*instance*
```ts
Monad1<URI>
```
# fromIO
*function*
```ts
<A>(io: IO<A>): Task<A>
```
Lifts an IO action into a Task

# getMonoid
*function*
```ts
<A>(M: Monoid<A>): Monoid<Task<A>>
```

# getRaceMonoid
*function*
```ts
<A = never>(): Monoid<Task<A>>
```

# getSemigroup
*function*
```ts
<A>(S: Semigroup<A>): Semigroup<Task<A>>
```

# tryCatch
*function*
```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): Task<Either<L, A>>
```