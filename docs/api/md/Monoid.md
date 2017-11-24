MODULE [Monoid](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

_type class_

```ts
interface Monoid<A> extends Semigroup<A> {
  empty: () => A
}
```

# monoidAll

_instance_

```ts
Monoid<boolean>
```

Boolean monoid under conjunction

# monoidAny

_instance_

```ts
Monoid<boolean>
```

Boolean monoid under disjunction

# monoidArray

_instance_

```ts
Monoid<Array<any>>
```

Monoid under array concatenation (`Array<any>`)

# monoidProduct

_instance_

```ts
Monoid<number>
```

Number monoid under multiplication

# monoidString

_instance_

```ts
Monoid<string>
```

# monoidSum

_instance_

```ts
Monoid<number>
```

Number monoid under addition

# fold

_function_

```ts
<A>(M: Monoid<A>) => (as: Array<A>): A
```

# getArrayMonoid

_function_

```ts
<A>(): Monoid<Array<A>>
```

Returns a monoid under array concatenation

# getDualMonoid

_function_

```ts
<A>(M: Monoid<A>): Monoid<A>
```

# getEndomorphismMonoid

_function_

```ts
<A>(): Monoid<Endomorphism<A>>
```

# getFunctionMonoid

_function_

```ts
<M>(monoid: Monoid<M>) => <A>(): Monoid<(a: A) => M>
```

# getProductMonoid

_function_

```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

# getRecordMonoid

_function_

```ts
<O extends { [key: string]: any }>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
): Monoid<O>
```
