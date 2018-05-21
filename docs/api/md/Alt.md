MODULE [Alt](https://github.com/gcanti/fp-ts/blob/master/src/Alt.ts)

# Alt

_type class_

_Signature_

```ts
interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
}
```

_Description_

The `Alt` type class identifies an associative operation on a type constructor. It is similar to `Semigroup`, except
that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
`number`.

`Alt` instances are required to satisfy the following laws:

1.  Associativity: `A.alt(A.alt(fa, ga), ha) = A.alt(fa, A.alt(ga, ha))`
2.  Distributivity: `A.map(A.alt(fa, ga), ab) = A.alt(A.map(fa, ab), A.map(ga, ab))`
