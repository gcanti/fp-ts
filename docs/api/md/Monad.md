MODULE [Monad](https://github.com/gcanti/fp-ts/blob/master/src/Monad.ts)
# Monad
Type class
```ts
interface Monad<F> extends Applicative<F>, Chain<F> {}
```