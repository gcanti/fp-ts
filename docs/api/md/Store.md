MODULE [Store](https://github.com/gcanti/fp-ts/blob/master/src/Store.ts)
# Store
*data*
```ts
constructor(readonly peek: (s: S) => A, readonly pos: S) {}
```
## Methods

### extend
```ts
<B>(f: (sa: Store<S, A>) => B): Store<S, B> 
```
### extract
```ts
(): A 
```
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): Store<S, B> 
```
### seek
```ts
(s: S): Store<S, A> 
```
Reposition the focus at the specified position
### toString
```ts
(): string 
```
# store
*instance*
```ts
Comonad<URI>
```
# experiment
*function*
```ts
experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> 
```

# extend
*function*
```ts
<S, A, B>(f: (sa: Store<S, A>) => B, sa: Store<S, A>): Store<S, B>
```

# extract
*function*
```ts
<S, A>(sa: Store<S, A>): A
```

# map
*function*
```ts
<S, A, B>(f: (a: A) => B, sa: Store<S, A>): Store<S, B>
```

# peek
*function*
```ts
<S, A>(sa: Store<S, A>) => (s: S): A
```
Reads the value at the specified position in the specified context

# peeks
*function*
```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A
```
Extract a value from a position which depends on the current position

# seek
*function*
```ts
<S>(s: S) => <A>(sa: Store<S, A>): Store<S, A>
```
Reposition the focus at the specified position

# seeks
*function*
```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A>
```
Reposition the focus at the specified position, which depends on the current position