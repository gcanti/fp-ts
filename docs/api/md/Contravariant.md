MODULE [Contravariant](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts)

# Contravariant

_type class_

```ts
interface Contravariant<F> {
  readonly URI: F
  contramap<A, B>(f: (b: B) => A, fa: HKT<F, A>): HKT<F, B>
}
```

# lift

_function_

```ts
lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
```
