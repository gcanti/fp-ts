MODULE [OptionT](https://github.com/gcanti/fp-ts/blob/master/src/OptionT.ts)
# chain
*function*
```ts
chain<F>(F: Monad<F>): OptionT<F>['chain'] 
```

# fold
*function*
```ts
fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> 
```

# fromOption
*function*
```ts
fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> 
```

# getOptionT
*function*
```ts
getOptionT<M>(M: Monad<M>): OptionT<M> 
```

# getOrElse
*function*
```ts
getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A> 
```

# liftF
*function*
```ts
liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> 
```

# none
*function*
```ts
none<F>(F: Applicative<F>): () => HKT<F, Option<never>> 
```

# some
*function*
```ts
some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> 
```