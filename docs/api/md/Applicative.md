MODULE [Applicative](https://github.com/gcanti/fp-ts/blob/master/src/Applicative.ts)

# Applicative

_type class_

```ts
interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}
```

# getApplicativeComposition

_function_

```ts
getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
```

# when

_function_

```ts
when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
```

Perform a applicative action when a condition is true
