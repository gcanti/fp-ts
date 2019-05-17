---
title: Store.ts
nav_order: 80
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Store (interface)](#store-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [store (constant)](#store-constant)
- [experiment (function)](#experiment-function)
- [peeks (function)](#peeks-function)
- [seek (function)](#seek-function)
- [seeks (function)](#seeks-function)

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

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v2.0.0

# store (constant)

**Signature**

```ts
export const store: Comonad2<URI> = ...
```

Added in v2.0.0

# experiment (function)

Extract a collection of values from positions which depend on the current position

**Signature**

```ts
export function experiment<F extends URIS3>(
  F: Functor3<F>
): <U, L, S>(f: (s: S) => Type3<F, U, L, S>) => <A>(wa: Store<S, A>) => Type3<F, U, L, A>
export function experiment<F extends URIS2>(
  F: Functor2<F>
): <L, S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS2, L>(
  F: Functor2C<F, L>
): <S>(f: (s: S) => Type2<F, L, S>) => <A>(wa: Store<S, A>) => Type2<F, L, A>
export function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Type<F, S>) => <A>(wa: Store<S, A>) => Type<F, A>
export function experiment<F>(F: Functor<F>): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A> { ... }
```

Added in v2.0.0

# peeks (function)

Extract a value from a position which depends on the current position

**Signature**

```ts
export function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A { ... }
```

Added in v2.0.0

# seek (function)

Reposition the focus at the specified position

**Signature**

```ts
export function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A> { ... }
```

Added in v2.0.0

# seeks (function)

Reposition the focus at the specified position, which depends on the current position

**Signature**

```ts
export function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A> { ... }
```

Added in v2.0.0
