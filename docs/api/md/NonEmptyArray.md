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

Instance-bound implementation of {@link Apply}

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>
```

_Description_

Same as {@link ap} but works on {@link NonEmptyArray} of functions and accepts {@link NonEmptyArray} of values instead

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>
```

_Description_

Instance-bound implementation of {@link Chain}

### concat

_method_

_since 1.0.0_

_Signature_

```ts
(y: NonEmptyArray<A>): NonEmptyArray<A>
```

_Description_

Instance-bound implementation of {@link Semigroup}

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

Concatenates this {@link NonEmptyArray} and passed {@link Array}

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

Instance-bound implementation of {@link Extend}

### extract

_method_

_since 1.0.0_

_Signature_

```ts
(): A
```

_Description_

Instance-bound implementation of {@link Comonad}

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

Gets last element of this {@link NonEmptyArray}

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

Instance-bound implementation of {@link Functor}

### max

_method_

_since 1.3.0_

_Signature_

```ts
(ord: Ord<A>): A
```

_Description_

Gets maximum of this {@link NonEmptyArray} using specified {@link Ord} instance

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

Gets minimum of this {@link NonEmptyArray} using specified {@link Ord} instance

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

Instance-bound implementation of {@link Foldable}

### sort

_method_

_since 1.6.0_

_Signature_

```ts
(ord: Ord<A>): NonEmptyArray<A>
```

_Description_

Sorts this {@link NonEmptyArray} using specified {@link Ord} instance

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

Converts this {@link NonEmptyArray} to plain {@link Array}

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

Return stringified representation of this {@link NonEmptyArray}

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

Builds {@link NonEmptyArray} from {@link Array} returning {@link none} or {@link some} depending on amount of values in passed array

# getSemigroup

_function_

_since 1.0.0_

_Signature_

```ts
<A = never>(): Semigroup<NonEmptyArray<A>>
```

_Description_

Builds {@link Semigroup} instance for {@link NonEmptyArray} of specified type arument
