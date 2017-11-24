MODULE [Semigroup](https://github.com/gcanti/fp-ts/blob/master/src/Semigroup.ts)

# Semigroup

_type class_

```ts
interface Semigroup<A> {
  concat: (x: A) => (y: A) => A
}
```

# semigroupAll

_instance_

```ts
Semigroup<boolean>
```

Boolean semigroup under conjunction

# semigroupAny

_instance_

```ts
Semigroup<boolean>
```

Boolean semigroup under disjunction

# semigroupArray

_instance_

```ts
Semigroup<Array<any>>
```

Semigroup under array concatenation (`Array<any>`)

# semigroupProduct

_instance_

```ts
Semigroup<number>
```

Number Semigroup under multiplication

# semigroupString

_instance_

```ts
Semigroup<string>
```

# semigroupSum

_instance_

```ts
Semigroup<number>
```

Number Semigroup under addition

# fold

_function_

```ts
<A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A
```

# getDualSemigroup

_function_

```ts
<A>(S: Semigroup<A>): Semigroup<A>
```

# getFirstSemigroup

_function_

```ts
<A>(): Semigroup<A>
```

# getJoinSemigroup

_function_

```ts
<A>(O: Ord<A>): Semigroup<A>
```

# getLastSemigroup

_function_

```ts
<A>(): Semigroup<A>
```

# getMeetSemigroup

_function_

```ts
<A>(O: Ord<A>): Semigroup<A>
```

# getProductSemigroup

_function_

```ts
<A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]>
```

# getRecordSemigroup

_function_

```ts
<O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<O>
```
