MODULE [Monoidal](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts)

# Monoidal

_type class_

```ts
interface Monoidal<F> extends Functor<F> {
  unit: () => HKT<F, void>
  mult<A, B>(fa: HKT<F, A>, fb: HKT<F, B>): HKT<F, [A, B]>
}
```

Applicative functors are equivalent to strong lax monoidal functors

* https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
* https://bartoszmilewski.com/2017/02/06/applicative-functors/
