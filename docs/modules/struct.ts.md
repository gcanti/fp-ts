---
title: struct.ts
nav_order: 92
parent: Modules
---

## struct overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [getAssignSemigroup](#getassignsemigroup)
- [utils](#utils)
  - [insertAt](#insertat)
  - [mapAt](#mapat)
  - [mapAtE](#mapate)
  - [modifyAt](#modifyat)
  - [omit](#omit)
  - [pick](#pick)
  - [renameAt](#renameat)
  - [updateAt](#updateat)

---

# instances

## getAssignSemigroup

Return a semigroup which works like `Object.assign`.

**Signature**

```ts
export declare const getAssignSemigroup: <A = never>() => Semigroup<A>
```

**Example**

```ts
import { getAssignSemigroup } from 'fp-ts/struct'
import { pipe } from 'fp-ts/function'

interface Person {
  readonly name: string
  readonly age: number
}

const S = getAssignSemigroup<Person>()
assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
```

Added in v3.0.0

# utils

## insertAt

Insert an element at the specified key.

**Signature**

```ts
export declare const insertAt: <Key extends string, Obj1, Val>(
  prop: Key extends keyof Obj1 ? never : Key,
  value: Val
) => <Obj2 extends {}>(
  obj: keyof Obj1 extends never ? EnsurePropertyNotExist<Obj2, Key> : Obj1
) => keyof Obj1 extends never
  ? { readonly [K in Key | keyof Obj2]: K extends keyof Obj2 ? Obj2[K] : Val }
  : { readonly [K in Key | keyof Obj1]: K extends keyof Obj1 ? Obj1[K] : Val }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { insertAt } from 'fp-ts/struct'

assert.deepStrictEqual(pipe({ a: 'a', b: 1 }, insertAt('c', true)), { a: 'a', b: 1, c: true })
```

Added in v3.0.0

## mapAt

Map an element at the specified key. The new element's type may be different from its original.

**Signature**

```ts
export declare const mapAt: <Obj1, Key extends keyof Obj1 extends never ? string : keyof Obj1, ValOut, ValIn>(
  prop: Key extends string ? EnsureLiteral<Key> : never,
  f: Key extends keyof Obj1 ? (ap: Obj1[Key]) => ValOut : (ap: ValIn) => ValOut
) => <Obj2 extends { [k in Key]: ValIn }>(
  a: keyof Obj1 extends never ? Obj2 : Obj1
) => Key extends keyof Obj1
  ? { readonly [K in keyof Obj1]: K extends Key ? ValOut : Obj1[K] }
  : { readonly [K in keyof Obj2]: K extends Key ? ValOut : Obj2[K] }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { mapAt } from 'fp-ts/struct'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: true },
    mapAt('c', (c) => (c ? 'true' : 'false'))
  ),
  { a: 'a', b: 1, c: 'true' }
)
```

Added in v3.0.0

## mapAtE

Map an element at a specified key inside an `F` context. The new element's type may be different from its original.

**Signature**

```ts
export declare function mapAtE<F extends URIS4>(
  F: Functor4<F>
): {
  <S, R, E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind4<F, S, R, E, B>): (
    a: A
  ) => Kind4<F, S, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export declare function mapAtE<F extends URIS3>(
  F: Functor3<F>
): {
  <R, E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind3<F, R, E, B>): (
    a: A
  ) => Kind3<F, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export declare function mapAtE<F extends URIS3, E>(
  F: Functor3C<F, E>
): {
  <R, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind3<F, R, E, B>): (
    a: A
  ) => Kind3<F, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export declare function mapAtE<F extends URIS2>(
  F: Functor2<F>
): {
  <E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind2<F, E, B>): (
    a: A
  ) => Kind2<F, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export declare function mapAtE<F extends URIS2, E>(
  F: Functor2C<F, E>
): {
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind2<F, E, B>): (
    a: Kind2<F, E, A>
  ) => Kind2<F, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export declare function mapAtE<F extends URIS>(
  F: Functor1<F>
): {
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind<F, B>): (
    a: A
  ) => Kind<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { mapAtE } from 'fp-ts/struct'
import { Functor, fromPredicate, some } from 'fp-ts/Option'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: true },
    mapAtE(Functor)('c', (c) => fromPredicate(() => c)('true'))
  ),
  some({ a: 'a', b: 1, c: 'true' })
)
```

Added in v3.0.0

## modifyAt

Modify an element at the specified key. The new element's type must be the same as its original.

**Signature**

```ts
export declare const modifyAt: <Obj1, Key extends keyof Obj1 extends never ? string : keyof Obj1, Val>(
  prop: Key extends string ? EnsureLiteral<Key> : never,
  f: Key extends keyof Obj1 ? (o: Obj1[Key]) => Obj1[Key] : (o: Val) => Val
) => <Obj2 extends { [k in Key]: Val }>(
  o: keyof Obj1 extends never ? Obj2 : Obj1
) => keyof Obj1 extends never ? Obj2 : Obj1
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { modifyAt } from 'fp-ts/struct'

assert.deepStrictEqual(
  pipe(
    { a: 'a', b: 1, c: true },
    modifyAt('c', (c) => !c)
  ),
  { a: 'a', b: 1, c: false }
)
```

Added in v3.0.0

## omit

Omit a set of keys from a `Record`. The value-level equivalent of the `Omit`
type.

**Signature**

```ts
export declare const omit: <Keys extends string[]>(
  ...ks: EnsureLiteralTuple<Keys>
) => <A extends { readonly [key in Keys[number]]: unknown }>(
  x: A
) => { readonly [K in Exclude<keyof A, Keys[number]>]: A[K] }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { omit } from 'fp-ts/struct'

assert.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, omit('b', 'c')), { a: 'a' })
```

Added in v3.0.0

## pick

Pick a set of keys from a `Record`. The value-level equivalent of the `Pick`
type.

**Signature**

```ts
export declare const pick: <Keys extends string[]>(
  ...ks: EnsureLiteralTuple<Keys>
) => <A extends { readonly [key in Keys[number]]: unknown }>(x: A) => { readonly [K in Keys[number]]: A[K] }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { pick } from 'fp-ts/struct'

assert.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, pick('a', 'b')), { a: 'a', b: 1 })
```

Added in v3.0.0

## renameAt

Rename a struct's key.

**Signature**

```ts
export declare const renameAt: <
  Obj1,
  OldKey extends keyof Obj1 extends never ? string : keyof Obj1,
  NewKey extends string
>(
  from: OldKey,
  to: Exclude<NewKey, keyof Obj1>
) => <Obj2 extends { readonly [k in OldKey]: unknown }>(
  obj: keyof Obj1 extends never ? EnsurePropertyNotExist<Obj2, NewKey> : Obj1
) => OldKey extends keyof Obj1
  ? { readonly [K in NewKey | Exclude<keyof Obj1, OldKey>]: K extends keyof Obj1 ? Obj1[K] : Obj1[OldKey] }
  : { readonly [K in NewKey | Exclude<keyof Obj2, OldKey>]: K extends keyof Obj2 ? Obj2[K] : Obj2[OldKey] }
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { renameAt } from 'fp-ts/struct'

assert.deepStrictEqual(pipe({ a: 'a', b: 1, z: true }, renameAt('z', 'c')), { a: 'a', b: 1, c: true })
```

Added in v3.0.0

## updateAt

Update an element at the specified key.

**Signature**

```ts
export declare const updateAt: <Obj1, Key extends keyof Obj1 extends never ? string : keyof Obj1, Val>(
  prop: Key extends string ? EnsureLiteral<Key> : never,
  ap: Key extends keyof Obj1 ? Obj1[Key] : Val
) => <Obj2 extends { [k in Key]: Val }>(
  o: keyof Obj1 extends never ? Obj2 : Obj1
) => keyof Obj1 extends never ? Obj2 : Obj1
```

**Example**

```ts
import { pipe } from 'fp-ts/function'
import { updateAt } from 'fp-ts/struct'

assert.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, updateAt('c', false)), { a: 'a', b: 1, c: false })
```

Added in v3.0.0
