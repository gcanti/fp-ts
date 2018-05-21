MODULE [Set](https://github.com/gcanti/fp-ts/blob/master/src/Set.ts)

# chain

_function_

_since 1.2.0_

_Signature_

```ts
<B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => Set<B>): Set<B>
```

# difference

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

_Description_

Form the set difference (`y` - `x`)

# every

_function_

_since 1.0.0_

_Signature_

```ts
<A>(x: Set<A>, predicate: Predicate<A>): boolean
```

# filter

_function_

_since 1.0.0_

_Signature_

```ts
<A>(x: Set<A>, predicate: Predicate<A>): Set<A>
```

# fromArray

_function_

_since 1.2.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (as: A[]): Set<A>
```

_Description_

Create a set from an array

# getIntersectionSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): Semigroup<Set<A>>
```

# getSetoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): Setoid<Set<A>>
```

# getUnionMonoid

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): Monoid<Set<A>>
```

# insert

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): ((a: A, x: Set<A>) => Set<A>)
```

_Description_

Insert a value into a set

# intersection

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

_Description_

The set of elements which are in both the first and second set

# map

_function_

_since 1.2.0_

_Signature_

```ts
<B>(bset: Setoid<B>) => <A>(x: Set<A>, f: (x: A) => B): Set<B>
```

_Description_

Projects a Set through a function

# member

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (x: Set<A>) => (a: A): boolean
```

_Description_

Test if a value is a member of a set

# partition

_function_

_since 1.2.0_

_Signature_

```ts
<A>(x: Set<A>, predicate: Predicate<A>): { right: Set<A>; left: Set<A> }
```

# partitionMap

_function_

_since 1.2.0_

_Signature_

```ts
<A, L, R>(x: Set<A>, f: (a: A) => Either<L, R>): { left: Set<L>; right: Set<R> }
```

# reduce

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>): (<B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B)
```

# remove

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (a: A, x: Set<A>): Set<A>
```

_Description_

Delete a value from a set

# singleton

_function_

_since 1.0.0_

_Signature_

```ts
<A>(a: A): Set<A>
```

_Description_

Create a set with one element

# some

_function_

_since 1.0.0_

_Signature_

```ts
<A>(x: Set<A>, predicate: Predicate<A>): boolean
```

# subset

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>): boolean
```

_Description_

`true` if and only if every element in the first set is an element of the second set

# toArray

_function_

_since 1.0.0_

_Signature_

```ts
<A>(O: Ord<A>) => (x: Set<A>): Array<A>
```

# union

_function_

_since 1.0.0_

_Signature_

```ts
<A>(S: Setoid<A>): ((x: Set<A>, y: Set<A>) => Set<A>)
```

_Description_

Form the union of two sets
