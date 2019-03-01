---
title: Witherable.ts
nav_order: 94
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Wilt](#wilt)
- [Wilt1](#wilt1)
- [Wilt2](#wilt2)
- [Wilt2C](#wilt2c)
- [Wilt3](#wilt3)
- [Wilt3C](#wilt3c)
- [Wither](#wither)
- [Wither1](#wither1)
- [Wither2](#wither2)
- [Wither2C](#wither2c)
- [Wither3](#wither3)
- [Wither3C](#wither3c)
- [Witherable](#witherable)
- [Witherable1](#witherable1)
- [Witherable2](#witherable2)
- [Witherable2C](#witherable2c)
- [Witherable3](#witherable3)
- [Witherable3C](#witherable3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Wilt

**Signature** (interface)

```ts
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<HKT<W, RL>, HKT<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: HKT<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<HKT<W, RL>, HKT<W, RR>>>
}
```

Added in v1.7.0

# Wilt1

**Signature** (interface)

```ts
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type<W, RL>, Type<W, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type<W, RL>, Type<W, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type<W, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type<W, RL>, Type<W, RR>>>
}
```

Added in v1.7.0

# Wilt2

**Signature** (interface)

```ts
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <WL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
}
```

Added in v1.7.0

# Wilt2C

**Signature** (interface)

```ts
export interface Wilt2C<W extends URIS2, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type2<W, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type2<W, WL, RL>, Type2<W, WL, RR>>>
}
```

Added in v1.7.0

# Wilt3

**Signature** (interface)

```ts
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <WU, WL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
}
```

Added in v1.7.0

# Wilt3C

**Signature** (interface)

```ts
export interface Wilt3C<W extends URIS3, WU, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Either<RL, RR>>
  ) => Type3<F, FU, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2>(F: Applicative2<F>): <FL, RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Either<RL, RR>>
  ) => Type2<F, FL, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F extends URIS>(F: Applicative1<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Either<RL, RR>>
  ) => Type<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
  <F>(F: Applicative<F>): <RL, RR, A>(
    wa: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Type3<W, WU, WL, RL>, Type3<W, WU, WL, RR>>>
}
```

Added in v1.7.0

# Wither

**Signature** (interface)

```ts
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
}
```

Added in v1.7.0

# Wither1

**Signature** (interface)

```ts
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type<W, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Type<W, A>, f: (a: A) => Type<F, Option<B>>) => Type<F, Type<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type<W, B>>
}
```

Added in v1.7.0

# Wither2

**Signature** (interface)

```ts
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WL, FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WL, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <WL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <WL, A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}
```

Added in v1.7.0

# Wither2C

**Signature** (interface)

```ts
export interface Wither2C<W extends URIS2, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type2<W, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type2<W, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type2<W, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type2<W, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type2<W, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type2<W, WL, B>>
}
```

Added in v1.7.0

# Wither3

**Signature** (interface)

```ts
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WU, WL, FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <WU, WL, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <WU, WL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Type3<W, WU, WL, B>>
}
```

Added in v1.7.0

# Wither3C

**Signature** (interface)

```ts
export interface Wither3C<W extends URIS3, WU, WL> {
  <F extends URIS3>(F: Applicative3<F>): <FU, FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS3, FU, FL>(F: Applicative3C<F, FU, FL>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type3<F, FU, FL, Option<B>>
  ) => Type3<F, FU, FL, Type3<W, WU, WL, B>>
  <F extends URIS2>(F: Applicative2<F>): <FL, A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS2, FL>(F: Applicative2C<F, FL>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type2<F, FL, Option<B>>
  ) => Type2<F, FL, Type3<W, WU, WL, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Type3<W, WU, WL, A>,
    f: (a: A) => Type<F, Option<B>>
  ) => Type<F, Type3<W, WU, WL, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Type3<W, WU, WL, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Type3<W, WU, WL, B>>
}
```

Added in v1.7.0

# Witherable

**Signature** (interface)

```ts
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  wither: Wither<T>
}
```

Added in v1.7.0

# Witherable1

**Signature** (interface)

```ts
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt: Wilt1<T>
  wither: Wither1<T>
}
```

Added in v1.7.0

# Witherable2

**Signature** (interface)

```ts
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt: Wilt2<T>
  wither: Wither2<T>
}
```

Added in v1.7.0

# Witherable2C

**Signature** (interface)

```ts
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt: Wilt2C<T, TL>
  wither: Wither2C<T, TL>
}
```

Added in v1.7.0

# Witherable3

**Signature** (interface)

```ts
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt: Wilt3<T>
  wither: Wither3<T>
}
```

Added in v1.7.0

# Witherable3C

**Signature** (interface)

```ts
export interface Witherable3C<T extends URIS3, TU, TL> extends Traversable3C<T, TU, TL>, Filterable3C<T, TU, TL> {
  wilt: Wilt3C<T, TU, TL>
  wither: Wither3C<T, TU, TL>
}
```

Added in v1.7.0
