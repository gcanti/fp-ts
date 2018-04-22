MODULE [Alternative](https://github.com/gcanti/fp-ts/blob/master/src/Alternative.ts)

# Alternative

_type class_

```ts
interface Alternative<F> extends Applicative<F>, Plus<F> {}
```

The `Alternative` type class has no members of its own; it just specifies that the type constructor has both
`Applicative` and `Plus` instances.

Types which have `Alternative` instances should also satisfy the following laws:

1.  Distributivity: `A.ap(A.alt(fab, gab), fa) = A.alt(A.ap(fab, fa), A.ap(gab, fa))`
2.  Annihilation: `A.ap(zero, fa) = zero`
