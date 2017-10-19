MODULE [Reader](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)
# Reader
*data*
```ts
constructor(readonly run: (e: E) => A) {}
```
## Methods

### ap
```ts
<B>(fab: Reader<E, (a: A) => B>): Reader<E, B> 
```
### chain
```ts
<B>(f: (a: A) => Reader<E, B>): Reader<E, B> 
```
### map
```ts
<B>(f: (a: A) => B): Reader<E, B> 
```
# reader
*instance*
```ts
Monad<URI>
```
# ap
*function*
```ts
<E, A, B>(fab: Reader<E, (a: A) => B>, fa: Reader<E, A>): Reader<E, B>
```

# ask
*function*
```ts
<E>(): Reader<E, E>
```
reads the current context

# asks
*function*
```ts
<E, A>(f: (e: E) => A): Reader<E, A>
```
Projects a value from the global context in a Reader

# chain
*function*
```ts
<E, A, B>(f: (a: A) => Reader<E, B>, fa: Reader<E, A>): Reader<E, B>
```

# local
*function*
```ts
<E>(f: (e: E) => E) => <A>(fa: Reader<E, A>): Reader<E, A>
```
changes the value of the local context during the execution of the action `fa`

# map
*function*
```ts
<E, A, B>(f: (a: A) => B, fa: Reader<E, A>): Reader<E, B>
```

# of
*function*
```ts
<E, A>(a: A): Reader<E, A>
```