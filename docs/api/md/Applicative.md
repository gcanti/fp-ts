MODULE [Applicative](https://github.com/gcanti/fp-ts/blob/master/src/Applicative.ts)
# Applicative
```ts
interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}
```
# ApplicativeComposition
```ts
interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  of: <A>(a: A) => HKT<F, HKT<G, A>>
  ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}
```
# FantasyApplicative
```ts
interface FantasyApplicative<F, A> extends FantasyApply<F, A> {}
```
# getApplicativeComposition
```ts
<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
```
# when
```ts
<F>(F: Applicative<F>): (condition: boolean) => (fu: HKT<F, void>) => HKT<F, void>
```
Perform a applicative action when a condition is true