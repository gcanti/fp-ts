MODULE [Applicative](https://github.com/gcanti/fp-ts/blob/master/src/Applicative.ts)
# Applicative
*type class*
```ts
interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}
```
# getApplicativeComposition
*function*
```ts
getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> 
```

# when
*function*
```ts
when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> 
```
Perform a applicative action when a condition is true