---
title: LinkedList.ts
nav_order: 47
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-lists

---

<h2 class="text-delta">Table of contents</h2>

- [LinkedList (type alias)](#linkedlist-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [nil (constant)](#nil-constant)
- [cons (function)](#cons-function)

---

# LinkedList (type alias)

**Signature**

```ts
export type LinkedList<A> = Nil | Cons<A>
```

Added in v2.1.1

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.1.1

# URI (constant)

**Signature**

```ts
export const URI: "LinkedList" = ...
```

Added in v2.1.1

# nil (constant)

**Signature**

```ts
export const nil: Nil = ...
```

Added in v2.1.1

# cons (function)

**Signature**

```ts
export function cons<A>(head: A, tail: LinkedList<A>): LinkedList<A> { ... }
```

Added in v2.1.1
