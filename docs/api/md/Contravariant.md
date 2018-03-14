MODULE [Contravariant](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts)

# Contravariant

_type class_

```ts
interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

# lift

_function_

_since 1.0.0_

```ts
lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
```
