---
id: Reader
title: Module Reader
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)

# Reader

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L24-L50)

```ts
export class Reader<E, A> {
  constructor(readonly run: (e: E) => A) {}
  ...
}
```

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L32-L34)

```ts
ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L38-L40)

```ts
ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>  { ... }
```

Added in v1.0.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L41-L43)

```ts
chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B>  { ... }
```

Added in v1.0.0

## local

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L47-L49)

```ts
local<E2 = E>(f: (e: E2) => E): Reader<E2, A>  { ... }
```

Added in v1.6.1

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L29-L31)

```ts
map<B>(f: (a: A) => B): Reader<E, B>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## reader

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L126-L139)

```ts
export const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI> = ...
```

Added in v1.0.0

## ask

reads the current context

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L73-L75)

```ts
export const ask = <E>(): Reader<E, E> => { ... }
```

Added in v1.0.0

## asks

Projects a value from the global context in a Reader

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L82-L84)

```ts
export const asks = <E, A>(f: (e: E) => A): Reader<E, A> => { ... }
```

Added in v1.0.0

## local

changes the value of the local context during the execution of the action `fa`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts#L91-L93)

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A> => { ... }
```

Added in v1.0.0
