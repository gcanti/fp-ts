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
Comonad2<URI>
```
# experiment
*function*
```ts
experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(sa: Store<S, A>) => HKT<F, A> 
```
Extract a collection of values from positions which depend on the current position

# peeks
*function*
```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>) => (s: S): A
```
Extract a value from a position which depends on the current position

# seeks
*function*
```ts
<S>(f: Endomorphism<S>) => <A>(sa: Store<S, A>): Store<S, A>
```
Reposition the focus at the specified position, which depends on the current position