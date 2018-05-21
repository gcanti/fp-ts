MODULE [NonEmptyArray](https://github.com/gcanti/fp-ts/blob/master/src/NonEmptyArray.ts)

# NonEmptyArray

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly head: A, readonly tail: Array<A>) {}
```

_Description_

Data structure which represents non-empty arrays

## Methods

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Apply](./Apply.md)

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

_Description_

Same as {@link ap} but works on [NonEmptyArray](./NonEmptyArray.md) of functions and accepts [NonEmptyArray](./NonEmptyArray.md) of values instead

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Chain](./Chain.md)

### concat

_method_

_since 1.0.0_

_Signature_

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

_Description_

Instance-bound implementation of [Semigroup](./Semigroup.md)

_Example_

```ts
const x = new NonEmptyArray(1, [2])
const y = new NonEmptyArray(3, [4])
assert.deepEqual(x.concat(y).toArray(), [1, 2, 3, 4])
```

### concatArray

_method_

_since 1.0.0_

_Signature_

```ts
(as: Array<A>): NonEmptyArray<A>
```

_Description_

Concatenates this [NonEmptyArray](./NonEmptyArray.md) and passed [Array](./Array.md)

_Example_

```ts
assert.deepEqual(new NonEmptyArray(1, []).concatArray([2]), new NonEmptyArray(1, [2]))
```

### extend

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Extend](./Extend.md)

### extract

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

_Description_

Instance-bound implementation of [Comonad](./Comonad.md)

_Example_

```ts
assert.strictEqual(new NonEmptyArray(1, [2, 3]).extract(), 1)
```

### inspect

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

_Description_

Same as {@link toString}

### last

_method_

_since 1.6.0_

_Signature_

```ts
(): A
```

_Description_

Gets last element of this [NonEmptyArray](./NonEmptyArray.md)

_Example_

```ts
const last = new NonEmptyArray(1, [2, 3]).last() // 3
const last = new NonEmptyArray(1, []).last() // 1
```

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of [Functor](./Functor.md)

### max

_method_

_since 1.3.0_

_Signature_

```ts
(ord: Ord<A>): A
```

_Description_

Gets maximum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const maximum = new NonEmptyArray(1, [2, 3]).max(ordNumber) // 3
```

### min

_method_

_since 1.3.0_

_Signature_

```ts
(ord: Ord<A>): A
```

_Description_

Gets minimum of this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const minimum = new NonEmptyArray(1, [2, 3]).min(ordNumber) // 1
```

### reduce

_method_

_since 1.0.0_

_Signature_

```ts
<B>(b: B, f: (b: B, a: A) => B): B
```

_Description_

Instance-bound implementation of [Foldable](./Foldable.md)

### sort

_method_

_since 1.6.0_

_Signature_

```ts
(ord: Ord<A>): NonEmptyArray<A>
```

_Description_

Sorts this [NonEmptyArray](./NonEmptyArray.md) using specified [Ord](./Ord.md) instance

_Example_

```ts
const result = new NonEmptyArray(3, [2, 1]).sort(ordNumber)
const expected = new NonEmptyArray(1, [2, 3])
assert.deepEqual(result, expected)
```

### toArray

_method_

_since 1.0.0_

_Signature_

```ts
(): Array<A>
```

_Description_

Converts this [NonEmptyArray](./NonEmptyArray.md) to plain [Array](./Array.md)

_Example_

```ts
assert.deepEqual(new NonEmptyArray(1, [2, 3]), [1, 2, 3])
```

### toString

_method_

_since 1.0.0_

_Signature_

```ts
(): string
```

_Description_

Return stringified representation of this [NonEmptyArray](./NonEmptyArray.md)

# nonEmptyArray

_instance_

_since 1.0.0_

_Signature_

```ts
Monad1<URI> & Comonad1<URI> & Foldable1<URI> & Traversable1<URI>
```

# fromArray

_function_

_since 1.0.0_

_Signature_

```ts
<A>(as: Array<A>): Option<NonEmptyArray<A>>
```

_Description_

Builds [NonEmptyArray](./NonEmptyArray.md) from [Array](./Array.md) returning {@link none} or {@link some} depending on amount of values in passed array

# getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```

_Description_

Builds [Semigroup](./Semigroup.md) instance for [NonEmptyArray](./NonEmptyArray.md) of specified type arument
