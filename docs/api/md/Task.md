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
*instance*
```ts
Monad<URI> & Monoid<Task<any>>
```
# ap
*function*
```ts
<A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B>
```

# chain
*function*
```ts
<A, B>(f: (a: A) => Task<B>, fa: Task<A>): Task<B>
```

# concat
*function*
```ts
<A>(fx: Task<A>) => (fy: Task<A>): Task<A>
```
Selects the earlier of two Tasks

# empty
*function*
```ts
<A>(): Task<A>
```
Returns a task that never completes

# fromIO
*function*
```ts
<A>(io: IO<A>): Task<A>
```
Lifts an IO action into a Task

# map
*function*
```ts
<A, B>(f: (a: A) => B, fa: Task<A>): Task<B>
```

# of
*function*
```ts
<A>(a: A): Task<A>
```

# tryCatch
*function*
```ts
<A>(f: Lazy<Promise<A>>) => <L>(onrejected: (reason: {}) => L): Task<Either<L, A>>
```