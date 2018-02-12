MODULE [State](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)
# State
*data*
```ts
constructor(readonly run: (s: S) => [A, S]) {}
```
## Methods

### ap
```ts
<B>(fab: State<S, (a: A) => B>): State<S, B> 
```
### ap_
```ts
<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C> 
```
### chain
```ts
<B>(f: (a: A) => State<S, B>): State<S, B> 
```
### eval
```ts
(s: S): A 
```
### exec
```ts
(s: S): S 
```
### map
```ts
<B>(f: (a: A) => B): State<S, B> 
```
# state
*instance*
```ts
Monad2<URI>
```
# get
*function*
```ts
<S>(): State<S, S>
```

# gets
*function*
```ts
<S, A>(f: (s: S) => A): State<S, A>
```

# modify
*function*
```ts
<S>(f: (s: S) => S): State<S, undefined>
```

# put
*function*
```ts
<S>(s: S): State<S, undefined>
```