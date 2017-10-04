MODULE [Monad](https://github.com/gcanti/fp-ts/blob/master/src/Monad.ts)
# Monad
```ts
interface Monad<F> extends Applicative<F>, Chain<F> {}
```
# MonadAlt
```ts
interface FantasyMonad<F, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
```