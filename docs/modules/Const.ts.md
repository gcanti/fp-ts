---
title: Const.ts
nav_order: 21
parent: Modules
---

# Const overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Const (type alias)](#const-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [const\_](#const_)
- [contramap](#contramap)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getEq](#geteq)
- [getShow](#getshow)
- [make](#make)
- [map](#map)

---

# Const (type alias)

**Signature**

```ts
export type Const<E, A> = E & { readonly _A: A }
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
export declare const URI: 'Const'
```

Added in v2.0.0

# const\_

**Signature**

```ts
export declare const const_: Functor2<'Const'> & Contravariant2<'Const'>
```

Added in v2.0.0

# contramap

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0

# getApplicative

**Signature**

```ts
export declare function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E>
```

Added in v2.0.0

# getApply

**Signature**

```ts
export declare function getApply<E>(S: Semigroup<E>): Apply2C<URI, E>
```

Added in v2.0.0

# getEq

**Signature**

```ts
export declare const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>>
```

Added in v2.0.0

# getShow

**Signature**

```ts
export declare function getShow<E, A>(S: Show<E>): Show<Const<E, A>>
```

Added in v2.0.0

# make

**Signature**

```ts
export declare const make: <E, A = never>(e: E) => Const<E, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0
