MODULE [Chain](https://github.com/gcanti/fp-ts/blob/master/src/Chain.ts)

# Chain

_type class_

```ts
interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

The `Chain` type class extends the `Apply` type class with a
"chain" operation which composes computations in sequence, using
the return value of one computation to determine the next computation.

Instances must satisfy the following law in addition to the `Apply` laws:

1.  Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`

Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(f, fa))`

# flatten

_function_

```ts
flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
```
