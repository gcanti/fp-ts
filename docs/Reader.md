---
id: Reader
title: Module Reader
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Reader.ts)

## reader

```ts
Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI>
```

Added in v1.0.0 (instance)

# Reader

```ts
constructor(readonly run: (e: E) => A) {}
```

Added in v1.0.0 (data)

## ap

```ts
<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## chain

```ts
<B>(f: (a: A) => Reader<E, B>): Reader<E, B>
```

Added in v1.0.0 (method)

## local

```ts
<E2 = E>(f: (e: E2) => E): Reader<E2, A>
```

Added in v1.6.1 (method)

## map

```ts
<B>(f: (a: A) => B): Reader<E, B>
```

Added in v1.0.0 (method)

## ask

```ts
<E>(): Reader<E, E>
```

Added in v1.0.0 (function)

reads the current context

## asks

```ts
<E, A>(f: (e: E) => A): Reader<E, A>
```

Added in v1.0.0 (function)

Projects a value from the global context in a Reader

## local

```ts
<E, E2 = E>(f: (e: E2) => E) => <A>(fa: Reader<E, A>): Reader<E2, A>
```

Added in v1.0.0 (function)

changes the value of the local context during the execution of the action `fa`
