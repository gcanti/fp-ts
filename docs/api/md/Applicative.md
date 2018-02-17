MODULE [Applicative](https://github.com/gcanti/fp-ts/blob/master/src/Applicative.ts)

# Applicative

_type class_

```ts
interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}
```

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values of
type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are wrapped
using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the function
which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for any number of
function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1. Identity: `A.ap(A.of(x => x), v) = v`
2. Homomorphism: `A.ap(A.of(f), A.of(x)) = A.of(f(x))`
3. Interchange: A.ap(u, A.of(y)) = A.ap(A.of(f => f(y)), u)

Note. `Functor`'s `map` can be derived: `A.map(u, f) = A.ap(A.of(f), u)`

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
