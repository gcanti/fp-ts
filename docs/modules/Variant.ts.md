---
title: Variant.ts
nav_order: 119
parent: Modules
---

## Variant overview

```ts
type Tagged<Tag, A> = { _tag: Tag; value: A }
```

is a type for a tagged value which when used together in a union can represent a Variant type
(aka sum type / discriminated union).

Variant types are dual to Record types. Unlike Record types which have multiple keys all of which have to be provided,
a value of a Variant type represents one of a number of cases.

The most common thing we want to do with Variant Types is pattern match on the case;
Given a record of functions, one for each case, we can use the function `caseOf` to pattern match
a value of a Variant and apply the function for the correct case.

**Example**

```ts
import * as variant from 'fp-ts/Variant'
import { pipe } from 'fp-ts/function'

type Media = variant.Tagged<'book', number> | variant.Tagged<'film', string> | variant.Tagged<'song', string>

const Media = variant.module<Media>({
  book: (value: number) => variant.tagged(_book, value),
  film: (value: string) => variant.tagged(_film, value),
  song: (value: string) => variant.tagged(_song, value),
})

const _book = 'book'
const _film = 'film'
const _song = 'song'

const exampleBook = Media.book(123)
const exampleFilm = Media.film('Harry Potter')

const isBook: (media: Media) => boolean = (media) =>
  pipe(
    media,
    variant.caseOfWithDefault(false)({
      [_book]: () => true,
    })
  )

assert.deepStrictEqual(isBook(exampleBook), true)
assert.deepStrictEqual(isBook(exampleFilm), false)
```

Added in v2.12.4

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [Module (type alias)](#module-type-alias)
  - [module](#module)
  - [tagged](#tagged)
- [destructors](#destructors)
  - [caseOf](#caseof)
  - [caseOfWithDefault](#caseofwithdefault)
  - [match](#match)
  - [matchWithDefault](#matchwithdefault)
- [model](#model)
  - [Cases (type alias)](#cases-type-alias)
  - [Map (type alias)](#map-type-alias)
  - [Match (type alias)](#match-type-alias)
  - [Tagged (type alias)](#tagged-type-alias)
  - [TagsOf (type alias)](#tagsof-type-alias)
  - [TypeForTag (type alias)](#typefortag-type-alias)
  - [Variant (type alias)](#variant-type-alias)

---

# constructors

## Module (type alias)

The type of the "module" of variant constructors

**Signature**

```ts
export type Module<Variant extends Tagged<string, any>> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => Variant
}
```

Added in v2.12.4

## module

Groups together all the variant constructors in a "module"

**Signature**

```ts
export declare function module<Variant extends Tagged<string, any>>(constructors: Module<Variant>): Module<Variant>
```

Added in v2.12.4

## tagged

Constructs a value of a Variant with the given tag

**Signature**

```ts
export declare function tagged<Tag extends string, A>(tag: Tag, value: A): Tagged<Tag, A>
```

Added in v2.12.4

# destructors

## caseOf

Pattern matching on a variant where all cases are provided

**Signature**

```ts
export declare function caseOf<Variant extends Tagged<string, any>, A>(
  cases: Cases<Variant, A>
): (variant: Variant) => A
```

Added in v2.12.4

## caseOfWithDefault

Pattern matching on a variant with a default case

**Signature**

```ts
export declare function caseOfWithDefault<A>(
  defaultValue: A
): <Variant extends Tagged<string, any>>(partialCases: Partial<Cases<Variant, A>>) => (variant: Variant) => A
```

Added in v2.12.4

## match

Pattern matching on a variant where all cases are provided, with arguments swapped

**Signature**

```ts
export declare function match<Variant extends Tagged<string, any>>(variant: Variant): <A>(cases: Cases<Variant, A>) => A
```

Added in v2.12.4

## matchWithDefault

Pattern matching on a variant with a default case, with arguments swapped

**Signature**

```ts
export declare function matchWithDefault<Variant extends Tagged<string, any>>(
  variant: Variant
): <A>(defaultValue: A) => (partialCases: Partial<Cases<Variant, A>>) => A
```

Added in v2.12.4

# model

## Cases (type alias)

Type of the record supplied for pattern matching

**Signature**

```ts
export type Cases<Variant extends Tagged<string, any>, A> = {
  [Key in keyof Map<Variant>]: (value: Map<Variant>[Key]) => A
}
```

Added in v2.12.4

## Map (type alias)

Type constructor of a record type from the dual variant type

**Signature**

```ts
export type Map<Variant extends Tagged<string, any>> = {
  [Key in Variant[typeof tagFieldName]]: (Variant & {
    [tagFieldName]: Key
  })[typeof valueFieldName]
}
```

Added in v2.12.4

## Match (type alias)

Type of the pattern matching function, isomorphic to the variant type

**Signature**

```ts
export type Match<Variant extends Tagged<string, any>, A> = (cases: Cases<Variant, A>) => A
```

Added in v2.12.4

## Tagged (type alias)

A type which represents a case in a variant

**Signature**

```ts
export type Tagged<Tag extends number | symbol | string, A> = {
  [tagFieldName]: Tag
  [valueFieldName]: A
}
```

Added in v2.12.4

## TagsOf (type alias)

Type of the tags of a variant

**Signature**

```ts
export type TagsOf<Variant extends Tagged<string, any>> = keyof Map<Variant>
```

Added in v2.12.4

## TypeForTag (type alias)

Type of the variant at a particular tag.

**Signature**

```ts
export type TypeForTag<Variant extends Tagged<string, any>, Key extends keyof Map<Variant>> = Map<Variant>[Key]
```

Added in v2.12.4

## Variant (type alias)

Type constructor of a variant type from the dual record type

**Signature**

```ts
export type Variant<Map extends { [key: string]: any }> = {
  [Key in keyof Map]: Tagged<Key, Map[Key]>
}[keyof Map]
```

Added in v2.12.4
