---
title: index.ts
nav_order: 51
parent: Modules
---

## index overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [data types](#data-types)
  - [async](#async)
  - [const](#const)
  - [date](#date)
  - [endomorphism](#endomorphism)
  - [identity](#identity)
  - [ioEither](#ioeither)
  - [ioOption](#iooption)
  - [option](#option)
  - [reader](#reader)
  - [readerEither](#readereither)
  - [readerIO](#readerio)
  - [readerTask](#readertask)
  - [readerTaskEither](#readertaskeither)
  - [readerTaskWriter](#readertaskwriter)
  - [readonlyArray](#readonlyarray)
  - [readonlyMap](#readonlymap)
  - [readonlyNonEmptyArray](#readonlynonemptyarray)
  - [readonlyRecord](#readonlyrecord)
  - [readonlySet](#readonlyset)
  - [refinement](#refinement)
  - [result](#result)
  - [state](#state)
  - [stateReaderTaskEither](#statereadertaskeither)
  - [store](#store)
  - [sync](#sync)
  - [taskEither](#taskeither)
  - [taskOption](#taskoption)
  - [taskThese](#taskthese)
  - [these](#these)
  - [traced](#traced)
  - [tree](#tree)
  - [writer](#writer)
- [monad transformers](#monad-transformers)
  - [eitherT](#eithert)
  - [optionT](#optiont)
  - [readerT](#readert)
  - [stateT](#statet)
  - [theseT](#theset)
  - [writerT](#writert)
- [type classes](#type-classes)
  - [applicative](#applicative)
  - [apply](#apply)
  - [bifunctor](#bifunctor)
  - [booleanAlgebra](#booleanalgebra)
  - [bounded](#bounded)
  - [boundedDistributiveLattice](#boundeddistributivelattice)
  - [boundedJoinSemilattice](#boundedjoinsemilattice)
  - [boundedLattice](#boundedlattice)
  - [boundedMeetSemilattice](#boundedmeetsemilattice)
  - [category](#category)
  - [categoryKind](#categorykind)
  - [comonad](#comonad)
  - [compactable](#compactable)
  - [composable](#composable)
  - [composableKind](#composablekind)
  - [contravariant](#contravariant)
  - [distributiveLattice](#distributivelattice)
  - [eq](#eq)
  - [extendable](#extendable)
  - [field](#field)
  - [filterable](#filterable)
  - [filterableKind](#filterablekind)
  - [filterableWithIndex](#filterablewithindex)
  - [flattenable](#flattenable)
  - [flattenableRec](#flattenablerec)
  - [foldable](#foldable)
  - [foldableWithIndex](#foldablewithindex)
  - [fromIO](#fromio)
  - [fromIdentity](#fromidentity)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromResult](#fromresult)
  - [fromState](#fromstate)
  - [fromTask](#fromtask)
  - [fromThese](#fromthese)
  - [fromWriter](#fromwriter)
  - [functor](#functor)
  - [functorWithIndex](#functorwithindex)
  - [group](#group)
  - [heytingAlgebra](#heytingalgebra)
  - [invariant](#invariant)
  - [joinSemilattice](#joinsemilattice)
  - [lattice](#lattice)
  - [magma](#magma)
  - [meetSemilattice](#meetsemilattice)
  - [monad](#monad)
  - [monoid](#monoid)
  - [monoidKind](#monoidkind)
  - [ord](#ord)
  - [profunctor](#profunctor)
  - [ring](#ring)
  - [semigroup](#semigroup)
  - [semigroupKind](#semigroupkind)
  - [semiring](#semiring)
  - [show](#show)
  - [traversable](#traversable)
  - [traversableWithIndex](#traversablewithindex)
  - [unfoldable](#unfoldable)
- [utils](#utils)
  - [boolean](#boolean)
  - [console](#console)
  - [function](#function)
  - [hkt](#hkt)
  - [json](#json)
  - [number](#number)
  - [ordering](#ordering)
  - [predicate](#predicate)
  - [random](#random)
  - [string](#string)
  - [struct](#struct)
  - [tuple](#tuple)
  - [void](#void)

---

# data types

## async

**Signature**

```ts
export declare const async: typeof async
```

Added in v3.0.0

## const

**Signature**

```ts
export declare const const: typeof const_
```

Added in v3.0.0

## date

**Signature**

```ts
export declare const date: typeof date
```

Added in v3.0.0

## endomorphism

**Signature**

```ts
export declare const endomorphism: typeof endomorphism
```

Added in v3.0.0

## identity

**Signature**

```ts
export declare const identity: typeof identity
```

Added in v3.0.0

## ioEither

**Signature**

```ts
export declare const ioEither: typeof ioEither
```

Added in v3.0.0

## ioOption

**Signature**

```ts
export declare const ioOption: typeof ioOption
```

Added in v3.0.0

## option

**Signature**

```ts
export declare const option: typeof option
```

Added in v3.0.0

## reader

**Signature**

```ts
export declare const reader: typeof reader
```

Added in v3.0.0

## readerEither

**Signature**

```ts
export declare const readerEither: typeof readerEither
```

Added in v3.0.0

## readerIO

**Signature**

```ts
export declare const readerIO: typeof readerIO
```

Added in v3.0.0

## readerTask

**Signature**

```ts
export declare const readerTask: typeof readerTask
```

Added in v3.0.0

## readerTaskEither

**Signature**

```ts
export declare const readerTaskEither: typeof readerTaskEither
```

Added in v3.0.0

## readerTaskWriter

**Signature**

```ts
export declare const readerTaskWriter: typeof readerTaskWriter
```

Added in v3.0.0

## readonlyArray

**Signature**

```ts
export declare const readonlyArray: typeof readonlyArray
```

Added in v3.0.0

## readonlyMap

**Signature**

```ts
export declare const readonlyMap: typeof readonlyMap
```

Added in v3.0.0

## readonlyNonEmptyArray

**Signature**

```ts
export declare const readonlyNonEmptyArray: typeof readonlyNonEmptyArray
```

Added in v3.0.0

## readonlyRecord

**Signature**

```ts
export declare const readonlyRecord: typeof readonlyRecord
```

Added in v3.0.0

## readonlySet

**Signature**

```ts
export declare const readonlySet: typeof readonlySet
```

Added in v3.0.0

## refinement

**Signature**

```ts
export declare const refinement: typeof refinement
```

Added in v3.0.0

## result

**Signature**

```ts
export declare const result: typeof result
```

Added in v3.0.0

## state

**Signature**

```ts
export declare const state: typeof state
```

Added in v3.0.0

## stateReaderTaskEither

**Signature**

```ts
export declare const stateReaderTaskEither: typeof stateReaderTaskEither
```

Added in v3.0.0

## store

**Signature**

```ts
export declare const store: typeof store
```

Added in v3.0.0

## sync

**Signature**

```ts
export declare const sync: typeof sync
```

Added in v3.0.0

## taskEither

**Signature**

```ts
export declare const taskEither: typeof taskEither
```

Added in v3.0.0

## taskOption

**Signature**

```ts
export declare const taskOption: typeof taskOption
```

Added in v3.0.0

## taskThese

**Signature**

```ts
export declare const taskThese: typeof taskThese
```

Added in v3.0.0

## these

**Signature**

```ts
export declare const these: typeof these
```

Added in v3.0.0

## traced

**Signature**

```ts
export declare const traced: typeof traced
```

Added in v3.0.0

## tree

**Signature**

```ts
export declare const tree: typeof tree
```

Added in v3.0.0

## writer

**Signature**

```ts
export declare const writer: typeof writer
```

Added in v3.0.0

# monad transformers

## eitherT

**Signature**

```ts
export declare const eitherT: typeof eitherT
```

Added in v3.0.0

## optionT

**Signature**

```ts
export declare const optionT: typeof optionT
```

Added in v3.0.0

## readerT

**Signature**

```ts
export declare const readerT: typeof readerT
```

Added in v3.0.0

## stateT

**Signature**

```ts
export declare const stateT: typeof stateT
```

Added in v3.0.0

## theseT

**Signature**

```ts
export declare const theseT: typeof theseT
```

Added in v3.0.0

## writerT

**Signature**

```ts
export declare const writerT: typeof writerT
```

Added in v3.0.0

# type classes

## applicative

**Signature**

```ts
export declare const applicative: typeof applicative
```

Added in v3.0.0

## apply

**Signature**

```ts
export declare const apply: typeof apply
```

Added in v3.0.0

## bifunctor

**Signature**

```ts
export declare const bifunctor: typeof bifunctor
```

Added in v3.0.0

## booleanAlgebra

**Signature**

```ts
export declare const booleanAlgebra: typeof booleanAlgebra
```

Added in v3.0.0

## bounded

**Signature**

```ts
export declare const bounded: typeof bounded
```

Added in v3.0.0

## boundedDistributiveLattice

**Signature**

```ts
export declare const boundedDistributiveLattice: typeof boundedDistributiveLattice
```

Added in v3.0.0

## boundedJoinSemilattice

**Signature**

```ts
export declare const boundedJoinSemilattice: typeof boundedJoinSemilattice
```

Added in v3.0.0

## boundedLattice

**Signature**

```ts
export declare const boundedLattice: typeof boundedLattice
```

Added in v3.0.0

## boundedMeetSemilattice

**Signature**

```ts
export declare const boundedMeetSemilattice: typeof boundedMeetSemilattice
```

Added in v3.0.0

## category

**Signature**

```ts
export declare const category: typeof category
```

Added in v3.0.0

## categoryKind

**Signature**

```ts
export declare const categoryKind: typeof categoryKind
```

Added in v3.0.0

## comonad

**Signature**

```ts
export declare const comonad: typeof comonad
```

Added in v3.0.0

## compactable

**Signature**

```ts
export declare const compactable: typeof compactable
```

Added in v3.0.0

## composable

**Signature**

```ts
export declare const composable: typeof composable
```

Added in v3.0.0

## composableKind

**Signature**

```ts
export declare const composableKind: typeof composableKind
```

Added in v3.0.0

## contravariant

**Signature**

```ts
export declare const contravariant: typeof contravariant
```

Added in v3.0.0

## distributiveLattice

**Signature**

```ts
export declare const distributiveLattice: typeof distributiveLattice
```

Added in v3.0.0

## eq

**Signature**

```ts
export declare const eq: typeof eq
```

Added in v3.0.0

## extendable

**Signature**

```ts
export declare const extendable: typeof extendable
```

Added in v3.0.0

## field

**Signature**

```ts
export declare const field: typeof field
```

Added in v3.0.0

## filterable

**Signature**

```ts
export declare const filterable: typeof filterable
```

Added in v3.0.0

## filterableKind

**Signature**

```ts
export declare const filterableKind: typeof filterableKind
```

Added in v3.0.0

## filterableWithIndex

**Signature**

```ts
export declare const filterableWithIndex: typeof filterableWithIndex
```

Added in v3.0.0

## flattenable

**Signature**

```ts
export declare const flattenable: typeof flattenable
```

Added in v3.0.0

## flattenableRec

**Signature**

```ts
export declare const flattenableRec: typeof flattenableRec
```

Added in v3.0.0

## foldable

**Signature**

```ts
export declare const foldable: typeof foldable
```

Added in v3.0.0

## foldableWithIndex

**Signature**

```ts
export declare const foldableWithIndex: typeof foldableWithIndex
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: typeof fromIO
```

Added in v3.0.0

## fromIdentity

**Signature**

```ts
export declare const fromIdentity: typeof fromIdentity
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: typeof fromOption
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: typeof fromReader
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: typeof fromResult
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: typeof fromState
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: typeof fromTask
```

Added in v3.0.0

## fromThese

**Signature**

```ts
export declare const fromThese: typeof fromThese
```

Added in v3.0.0

## fromWriter

**Signature**

```ts
export declare const fromWriter: typeof fromWriter
```

Added in v3.0.0

## functor

**Signature**

```ts
export declare const functor: typeof functor
```

Added in v3.0.0

## functorWithIndex

**Signature**

```ts
export declare const functorWithIndex: typeof functorWithIndex
```

Added in v3.0.0

## group

**Signature**

```ts
export declare const group: typeof group
```

Added in v3.0.0

## heytingAlgebra

**Signature**

```ts
export declare const heytingAlgebra: typeof heytingAlgebra
```

Added in v3.0.0

## invariant

**Signature**

```ts
export declare const invariant: typeof invariant
```

Added in v3.0.0

## joinSemilattice

**Signature**

```ts
export declare const joinSemilattice: typeof joinSemilattice
```

Added in v3.0.0

## lattice

**Signature**

```ts
export declare const lattice: typeof lattice
```

Added in v3.0.0

## magma

**Signature**

```ts
export declare const magma: typeof magma
```

Added in v3.0.0

## meetSemilattice

**Signature**

```ts
export declare const meetSemilattice: typeof meetSemilattice
```

Added in v3.0.0

## monad

**Signature**

```ts
export declare const monad: typeof monad
```

Added in v3.0.0

## monoid

**Signature**

```ts
export declare const monoid: typeof monoid
```

Added in v3.0.0

## monoidKind

**Signature**

```ts
export declare const monoidKind: typeof monoidKind
```

Added in v3.0.0

## ord

**Signature**

```ts
export declare const ord: typeof ord
```

Added in v3.0.0

## profunctor

**Signature**

```ts
export declare const profunctor: typeof profunctor
```

Added in v3.0.0

## ring

**Signature**

```ts
export declare const ring: typeof ring
```

Added in v3.0.0

## semigroup

**Signature**

```ts
export declare const semigroup: typeof semigroup
```

Added in v3.0.0

## semigroupKind

**Signature**

```ts
export declare const semigroupKind: typeof semigroupKind
```

Added in v3.0.0

## semiring

**Signature**

```ts
export declare const semiring: typeof semiring
```

Added in v3.0.0

## show

**Signature**

```ts
export declare const show: typeof show
```

Added in v3.0.0

## traversable

**Signature**

```ts
export declare const traversable: typeof traversable
```

Added in v3.0.0

## traversableWithIndex

**Signature**

```ts
export declare const traversableWithIndex: typeof traversableWithIndex
```

Added in v3.0.0

## unfoldable

**Signature**

```ts
export declare const unfoldable: typeof unfoldable
```

Added in v3.0.0

# utils

## boolean

**Signature**

```ts
export declare const boolean: typeof boolean
```

Added in v3.0.0

## console

**Signature**

```ts
export declare const console: typeof console
```

Added in v3.0.0

## function

**Signature**

```ts
export declare const function: typeof function_
```

Added in v3.0.0

## hkt

**Signature**

```ts
export declare const hkt: typeof hkt
```

Added in v3.0.0

## json

**Signature**

```ts
export declare const json: typeof json
```

Added in v3.0.0

## number

**Signature**

```ts
export declare const number: typeof number
```

Added in v3.0.0

## ordering

**Signature**

```ts
export declare const ordering: typeof ordering
```

Added in v3.0.0

## predicate

**Signature**

```ts
export declare const predicate: typeof predicate
```

Added in v3.0.0

## random

**Signature**

```ts
export declare const random: typeof random
```

Added in v3.0.0

## string

**Signature**

```ts
export declare const string: typeof string
```

Added in v3.0.0

## struct

**Signature**

```ts
export declare const struct: typeof struct
```

Added in v3.0.0

## tuple

**Signature**

```ts
export declare const tuple: typeof tuple
```

Added in v3.0.0

## void

**Signature**

```ts
export declare const void: typeof void_
```

Added in v3.0.0
