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
### ap_
```ts
<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C> 
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
Monad2<URI>
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

# local
*function*
```ts
<E>(f: (e: E) => E) => <A>(fa: Reader<E, A>): Reader<E, A>
```
changes the value of the local context during the execution of the action `fa`