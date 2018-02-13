MODULE [Monoid](https://github.com/gcanti/fp-ts/blob/master/src/Monoid.ts)

# Monoid

_type class_

```ts
interface Monoid<A> extends Semigroup<A> {
  empty: A
}
```

# getArrayMonoid

_instance_

```ts
getArrayMonoid = <A = never>():
```

Monoid under array concatenation (`Array<any>`)

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

# monoidVoid

_instance_

```ts
Monoid<void>
```

# unsafeMonoidArray

_instance_

```ts
Monoid<Array<any>>
```

# fold

_function_

```ts
<A>(M: Monoid<A>): ((as: Array<A>) => A)
```

# getDualMonoid

_function_

```ts
<A>(M: Monoid<A>): Monoid<A>
```

# getEndomorphismMonoid

_function_

```ts
<A = never>(): Monoid<Endomorphism<A>>
```

# getFunctionMonoid

_function_

```ts
<M>(M: Monoid<M>) => <A = never>(): Monoid<(a: A) => M>
```

# getProductMonoid

_function_

```ts
<A, B>(MA: Monoid<A>, MB: Monoid<B>): Monoid<[A, B]>
```

# getRecordMonoid

_function_

```ts
<O>(Ms: { [K in keyof O]: Monoid<O[K]> }): Monoid<O>
```
