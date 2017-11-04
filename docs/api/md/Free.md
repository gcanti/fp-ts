MODULE [Free](https://github.com/gcanti/fp-ts/blob/master/src/Free.ts)
# Free
*data*
```ts
type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```
## Methods

### ap
```ts
<B>(fab: Free<F, (a: A) => B>): Free<F, B> 
```
### ap_
```ts
<B, C>(this: Free<F, (a: B) => C>, fb: Free<F, B>): Free<F, C> 
```
### chain
```ts
<B>(f: (a: A) => Free<F, B>): Free<F, B> 
```
### foldFree
```ts
<M>(M: Monad<M>): (f: NaturalTransformation<F, M>) => HKT<M, A> 
```
### inspect
```ts
(): string 
```
### map
```ts
<B>(f: (a: A) => B): Free<F, B> 
```
### toString
```ts
(): string 
```
# foldFree
*function*
```ts
foldFree<M>(
  M: Monad<M>
): <F>(f: any /* NaturalTransformation<F, M> */) => <A>(fa: Free<F, A>) => HKT<M, A> 
```
Note. This function is overloaded so, despite the argument `f` being ill-typed, is type safe

# hoistFree
*function*
```ts
hoistFree<F, G>(nt: NaturalTransformation<F, G>): (<A>(fa: Free<F, A>) => Free<G, A>) 
```
Use a natural transformation to change the generating type constructor of a free monad

# liftF
*function*
```ts
<F, A>(fa: HKT<F, A>): Free<F, A>
```
Lift an impure value described by the generating type constructor `F` into the free monad

# of
*function*
```ts
<F, A>(a: A): Free<F, A>
```

# substFree
*function*
```ts
<F, G>(f: <A>(fa: HKT<F, A>) => Free<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
```