MODULE [Setoid](https://github.com/gcanti/fp-ts/blob/master/src/Setoid.ts)

# Setoid

_type class_

```ts
interface Setoid<A> {
  equals: (x: A) => (y: A) => boolean
}
```

# setoidBoolean

_instance_

```ts
Setoid<boolean>
```

# setoidNumber

_instance_

```ts
Setoid<number>
```

# setoidString

_instance_

```ts
Setoid<string>
```

# getArraySetoid

_function_

```ts
<A>(S: Setoid<A>): Setoid<Array<A>>
```

# getProductSetoid

_function_

```ts
<A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]>
```

# getRecordSetoid

_function_

```ts
<O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O>
```

# strictEqual

_function_

```ts
(a: any) => (b: any): boolean
```
