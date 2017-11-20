MODULE [TaskEither](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts)
# TaskEither
*data*
```ts
constructor(readonly value: Task<Either<L, A>>) {}
```
## Methods

### ap
```ts
<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B> 
```
### ap_
```ts
<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C> 
```
### chain
```ts
<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B> 
```
### fold
```ts
<R>(left: (l: L) => R, right: (a: A) => R): Task<R> 
```
### map
```ts
<B>(f: (a: A) => B): TaskEither<L, B> 
```
### mapLeft
```ts
<M>(f: (l: L) => M): TaskEither<M, A> 
```
### orElse
```ts
<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A> 
```
Transforms the failure value of the `TaskEither` into a new `TaskEither`
### run
```ts
(): Promise<Either<L, A>> 
```
Runs the inner task
### toOption
```ts
(): Task<Option<A>> 
```
# taskEither
*instance*
```ts
Monad<URI>
```
# ap
*function*
```ts
<L, A, B>(fab: TaskEither<L, (a: A) => B>, fa: TaskEither<L, A>): TaskEither<L, B>
```

# chain
*function*
```ts
<L, A, B>(f: (a: A) => TaskEither<L, B>, fa: TaskEither<L, A>): TaskEither<L, B>
```

# fromEither
*function*
```ts
<L, A>(fa: Either<L, A>): TaskEither<L, A>
```

# left
*function*
```ts
<L, A>(fa: Task<L>): TaskEither<L, A>
```

# map
*function*
```ts
<L, A, B>(f: (a: A) => B, fa: TaskEither<L, A>): TaskEither<L, B>
```

# of
*function*
```ts
<L, A>(a: A): TaskEither<L, A>
```

# orElse
*function*
```ts
<L, M, A>(f: (l: L) => TaskEither<M, A>) => (fa: TaskEither<L, A>): TaskEither<M, A>
```
Transforms the failure value of the `TaskEither` into a new `TaskEither`

# right
*function*
```ts
<L, A>(fa: Task<A>): TaskEither<L, A>
```

# tryCatch
*function*
```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A>
```