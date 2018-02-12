MODULE [Contravariant](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts)
# Contravariant
*type class*
```ts
interface Contravariant<F> {
  readonly URI: F
  contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```
# lift
*function*
```ts
lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B> 
```