---
title: Show.ts
nav_order: 90
parent: Modules
---

## Show overview

The `Show` type class represents those types which can be converted into
a human-readable `string` representation.

While not required, it is recommended that for any expression `x`, the
string `show(x)` be executable TypeScript code which evaluates to the same
value as the expression `x`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [struct](#struct)
  - [tuple](#tuple)
- [instances](#instances)
  - [Contravariant](#contravariant)
- [model](#model)
  - [Show (interface)](#show-interface)
- [type lambdas](#type-lambdas)
  - [ShowTypeLambda (interface)](#showtypelambda-interface)
- [utils](#utils)
  - [contramap](#contramap)

---

# combinators

## struct

**Signature**

```ts
export declare const struct: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<{ readonly [K in keyof A]: A[K] }>
```

Added in v3.0.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...shows: { [K in keyof A]: Show<A[K]> }
) => Show<Readonly<A>>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<ShowTypeLambda>
```

Added in v3.0.0

# model

## Show (interface)

**Signature**

```ts
export interface Show<A> {
  readonly show: (a: A) => string
}
```

Added in v3.0.0

# type lambdas

## ShowTypeLambda (interface)

**Signature**

```ts
export interface ShowTypeLambda extends TypeLambda {
  readonly type: Show<this['In1']>
}
```

Added in v3.0.0

# utils

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Show<A>) => Show<B>
```

Added in v3.0.0
