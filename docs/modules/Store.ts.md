---
title: Store.ts
nav_order: 85
parent: Modules
---

# Store overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Store (interface)](#store-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [duplicate](#duplicate)
- [experiment](#experiment)
- [extend](#extend)
- [map](#map)
- [peeks](#peeks)
- [seek](#seek)
- [seeks](#seeks)
- [store](#store)

---

# Store (interface)

**Signature**

```ts
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "Store" = ...
```

Added in v2.0.0

# duplicate

**Signature**

```ts
<E, A>(ma: Store<E, A>) => Store<E, Store<E, A>>
```

Added in v2.0.0

# experiment

Extract a collection of values from positions which depend on the current position

**Signature**

```ts
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <R, E, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export function experiment<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <E, S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export function experiment<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Kind<F, S>) => <A>(wa: Store<S, A>) => Kind<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> { ... }
```

Added in v2.0.0

# extend

**Signature**

```ts
<E, A, B>(f: (fa: Store<E, A>) => B) => (ma: Store<E, A>) => Store<E, B>
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B>
```

Added in v2.0.0

# peeks

Extract a value from a position which depends on the current position

**Signature**

```ts
export function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A { ... }
```

Added in v2.0.0

# seek

Reposition the focus at the specified position

**Signature**

```ts
export function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A> { ... }
```

Added in v2.0.0

# seeks

Reposition the focus at the specified position, which depends on the current position

**Signature**

```ts
export function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A> { ... }
```

Added in v2.0.0

# store

**Signature**

```ts
export const store: Comonad2<URI> = ...
```

Added in v2.0.0
