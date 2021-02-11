# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]
> - [Deprecation]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 2.10.0

- **Deprecations**
  - deprecate `pipeable` module, use the specific helpers instead
  - deprecate `ValidationT` module, use `EitherT` instead
  - deprecate "mega instances", use small, specific instances instead
  - deprecate the old monad transformers, use the specific helpers instead
  - `Applicative`
    - deprecate `getApplicativeComposition`, use `ap` helper instead
  - `BooleanAlgebra`
    - deprecate `booleanAlgebraBoolean`, use `boolean.BooleanAlgebra` instead
    - deprecate `getFunctionBooleanAlgebra`, use `function.getBooleanAlgebra` instead
    - deprecate `getDualBooleanAlgebra`, use `reverse` instead
  - `Bounded`
    - deprecate `boundedNumber`, use `number.Bounded` instead
  - `Compactable`
    - deprecate `getCompactableComposition`, use `compact`, `separate` helpers instead
    - deprecate `Separated`, use `Separated.Separated` instead
  - `Either`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getValidationSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getValidationMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getValidation`, use `getApplicativeValidation` and `getAltValidation` instead
  - `Eq`
    - deprecate `eqBoolean`, use `boolean.Eq` instead
    - deprecate `eqString`, use `string.Eq` instead
    - deprecate `eqNumber`, use `number.Eq` instead
    - deprecate `eqDate`, use `Date.Eq` instead
    - deprecate `getStructEq`, use `struct` instead
    - deprecate `getTupleEq`, use `tuple` instead
  - `Filterable`
    - deprecate `getFilterableComposition`, use `filter`, `filterMap`, `partition`, `partitionMap` helpers instead
  - `Foldable`
    - deprecate `toArray` in favour of `toReadonlyArray`
    - deprecate `getFoldableComposition`, use `reduce`, `foldMap`, `reduceRight` helpers instead
  - `FoldableWithIndex`
    - deprecate `getFoldableWithIndexComposition`, use `reduceWithIndex`, `foldMapWithIndex`, `reduceRightWithIndex` helpers instead
  - `Functor`
    - deprecate `getFunctorComposition`, use `map` helper instead
  - `FunctorWithIndex`
    - deprecate `getFunctorWithIndexComposition`, use `mapWithIndex` helper instead
  - `IO`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `fromIO`
  - `IOEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getIOValidation`, use `getApplicativeIOValidation` and `getAltIOValidation` instead
  - `Monoid`
    - deprecate `monoidAll`, use `boolean.MonoidAll` instead
    - deprecate `monoidAny`, use `boolean.MonoidAny` instead
    - deprecate `getFunctionMonoid`, use `function.getMonoid` instead
    - deprecate `getEndomorphismMonoid`, use `function.getEndomorphismMonoid` instead (**Note**. The execution order in
      `function.getEndomorphismMonoid` is reversed)
    - deprecate `monoidString`, use `string.Monoid` instead
    - deprecate `monoidSum`, use `number.MonoidSum` instead
    - deprecate `monoidProduct`, use `number.MonoidProduct` instead
    - deprecate `fold`, use `concatAll` instead
    - deprecate `getMeetMonoid`, use `min` instead
    - deprecate `getJoinMonoid`, use `max` instead
    - deprecate `getDualMonoid`, use `reverse` instead
    - deprecate `getStructMonoid`, use `struct` instead
    - deprecate `getTupleMonoid`, use `tuple` instead
  - `NonEmptyArray`
    - deprecate `fold`, use `concatAll` instead
  - `Option`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
  - `Ord`
    - deprecate `ordBoolean`, use `boolean.Ord` instead
    - deprecate `ordString`, use `string.Ord` instead
    - deprecate `ordNumber`, use `number.Ord` instead
    - deprecate `ordDate`, use `Date.Ord` instead
    - deprecate `getDualOrd`, use `reverse` instead
    - deprecate `getTupleOrd`, use `tuple` instead
  - `Ordering`
    - deprecate `eqOrdering`, use `Eq` instead
    - deprecate `monoidOrdering`, use `Monoid` instead
  - `Ring`
    - deprecate `getFunctionRing`, use `function.getRing` instead
  - `Reader`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid`
  - `ReaderEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getReaderValidation`, use `getApplicativeReaderValidation` and `getAltReaderValidation` instead
    - deprecate `local`, Use `Reader`'s `local` instead
  - `ReaderTask`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `run`
    - deprecate `local`, Use `Reader`'s `local` instead
  - `ReaderTaskEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getReaderTaskValidation`, use `getApplicativeReaderTaskValidation` and `getAltReaderTaskValidation` instead
    - deprecate `run`
    - deprecate `local`, Use `Reader`'s `local` instead
  - `ReaderTaskEither`
    - deprecate `run`
  - `ReadonlyNonEmptyArray`
    - deprecate `fold`, use `concatAll` instead
  - `Ring`
    - deprecate `getTupleRing`, use `tuple` instead
  - `Semigroup`
    - deprecate `semigroupAll`, use `boolean.SemigroupAll` instead
    - deprecate `semigroupAny`, use `boolean.SemigroupAny` instead
    - deprecate `getFunctionSemigroup`, use `function.getSemigroup` instead
    - deprecate `semigroupString`, use `string.Semigroup` instead
    - deprecate `semigroupSum`, use `number.SemigroupSum` instead
    - deprecate `semigroupProduct`, use `number.SemigroupProduct` instead
    - deprecate `fold`, use `concatAll` instead
    - deprecate `getIntercalateSemigroup`, use `intercalate` instead
    - deprecate `getMeetSemigroup`, use `min` instead
    - deprecate `getJoinSemigroup`, use `max` instead
    - deprecate `getDualSemigroup`, use `reverse` instead
    - deprecate `getStructSemigroup`, use `struct` instead
    - deprecate `getTupleSemigroup`, use `tuple` instead
    - deprecate `getFirstSemigroup`, use `first` instead
    - deprecate `getLastSemigroup`, use `last` instead
    - deprecate `getObjectSemigroup`, use `assign` instead
  - `Show`
    - deprecate `showBoolean`, use `boolean.Show` instead
    - deprecate `showString`, use `string.Show` instead
    - deprecate `showNumber`, use `number.Show` instead
    - deprecate `getStructShow`, use `struct` instead
    - deprecate `getTupleShow`, use `tuple` instead
  - `Task`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `fromTask`
  - `TaskEither`
    - deprecate `getApplySemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getApplyMonoid` in favour of `Applicative.getApplicativeMonoid`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `getTaskValidation`, use `getApplicativeTaskValidation` and `getAltTaskValidation` instead
  - `TaskThese`
    - deprecate `functorTaskThese` instance in favour of `Functor`
    - deprecate `bifunctorTaskThese` instance in favour of `Bifunctor`
    - deprecate `getSemigroup` in favour of `Apply.getApplySemigroup`
    - deprecate `toTuple` in favour of `toTuple2`
  - `These`
    - deprecate `toTuple` in favour of `toTuple2`
  - `Traversable`
    - deprecate `getTraversableComposition`, use `traverse`, `sequence` helpers instead
- **New Feature**
  - add `Pointed` type class
  - add `FromEither` type class
  - add `FromIO` type class
  - add `FromTask` type class
  - add `TaskOption` module
  - add `string` module
  - add `number` module
  - add `Separated` module (@YBogomolov)
  - `Apply`
    - add `ap` helper
    - add `apS` helper
    - add `apFirst` helper
    - add `apSecond` helper
    - add `getApplySemigroup`
  - `Applicative`
    - add `getApplicativeMonoid`
  - `Array`
    - add `Pointed` instance
    - add `Apply` instance
    - add `matchLeft` alias
    - add `matchRight` alias
  - `boolean`
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `Eq` instance
    - add `BooleanAlgebra` instance
    - add `SemigroupAll` instance
    - add `SemigroupAny` instance
    - add `MonoidAll` instance
    - add `MonoidAny` instance
    - add `Ord` instance
    - add `Show` instance
  - `BooleanAlgebra`
    - add `reverse`
  - `Chain`
    - add `bind` helper
    - add `chainFirst` helper
  - `Compactable`
    - add `compact` helper
    - add `separate` helper
    - add `separated` constructor
  - `Date`
    - add `Eq` instance
    - add `Ord` instance
  - `Filterable`
    - add `filter` helper
    - add `filterMap` helper
    - add `partition` helper
    - add `partitionMap` helper
  - `Foldable`
    - add `reduce` helper
    - add `foldaMap` helper
    - add `reduceRight` helper
  - `FoldableWithIndex`
    - add `reduceWithIndex` helper
    - add `foldaMapWithIndex` helper
    - add `reduceRightWithIndex` helper
  - `function`
    - add `getBooleanAlgebra`
    - add `getSemigroup`
    - add `getMonoid`
    - add `getSemiring`
    - add `getRing`
    - add `getEndomorphismMonoid`
  - `Functor`
    - add `map` helper
    - add `bindTo` helper
    - add `flap` derivable, #1393 (@williamareynolds)
  - `FunctorWithIndex`
    - add `mapWithIndex` helper
  - `Either`
    - add `Pointed` instance
    - add `Apply` instance
    - add `getCompactable`
    - add `getFilterable`
    - add `FromEither` instance
    - add `toUnion`, closes #1362
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `orElseW`
    - add `tryCatchK`
    - add `fromOptionK`
    - add `chainOptionK`
  - `EitherT`
    - split `getEitherM` into separated functions
  - `Eq`
    - add `getSemigroup`
    - add `struct`
    - add `tuple`
  - `Identity`
    - add `Pointed` instance
    - add `Apply` instance
  - `IO`
    - add `Pointed` instance
    - add `Apply` instance
    - add `FromIO` instance
  - `IOEither`
    - add `Pointed` instance
    - add `getCompactable`
    - add `FromIO` instance
    - add `FromEither` instance
    - add `tryCatchK` combinator
    - add `toUnion`
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `orElseW`
    - add `fromOptionK`
    - add `chainOptionK`
  - `Monoid`
    - add `concatAll`
    - add `min`
    - add `max`
    - add `reverse`
    - add `struct`
    - add `tuple`
  - `NonEmptyArray`
    - add `Pointed` instance
    - add `Apply` instance
    - add `concatAll`
  - `Option`
    - add `Pointed` instance
    - add `Apply` instance
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `tryCatchK`
  - `OptionT`
    - split `getOptionM` into separated functions
  - `Ord`
    - add `equalsDefault`
    - add `reverse`
    - add `tuple`
  - `Ordering`
    - add `Eq` instance
    - add `Semigroup` instance
    - add `Monoid` instance
  - `Random`
    - add `randomElem`
  - `Reader`
    - add `Pointed` instance
    - add `Apply` instance
  - `ReaderT`
    - split `getReaderM` into separated functions
  - `ReaderEither`
    - add `Pointed` instance
    - add `Apply` instance
    - add `FromEither` instance
    - add `getCompactable`
    - add `getFilterable`
    - add `toUnion`
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `orElseW`
    - add `fromOptionK`
    - add `chainOptionK`
  - `ReaderTask`
    - add `Pointed` instance
    - add `ApplyPar` instance
    - add `ApplySeq` instance
    - add `FromIO` instance
    - add `FromTask` instance
    - add `traverseSeqArrayWithIndex`
    - add `traverseSeqArray`
    - add `sequenceSeqArray`
  - `ReaderTaskEither`
    - add `Pointed` instance
    - add `ApplyPar` instance
    - add `ApplySeq` instance
    - add `FromIO` instance
    - add `FromTask` instance
    - add `FromEither` instance
    - add `getCompactable`
    - add `getFilterable`
    - add `toUnion`
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `orElseW`
    - add `fromOptionK`
    - add `chainOptionK`
  - `ReadonlyArray`
    - add `Pointed` instance
    - add `Apply` instance
    - add `getSemigroup`
    - add `matchLeft` instance
    - add `matchRight` instance
  - `ReadonlyMap`
    - add `filterWithIndex` combinator
    - add `filterMapWithIndex` combinator
    - add `partitionWithIndex` combinator
    - add `partitionMapWithIndex` combinator
    - add `getFunctorWithIndex`
    - add `getFoldable`
    - add `getFoldableWithIndex`
    - add `getTraversable`
    - add `getTraversableWithIndex`
  - `ReadonlyNonEmptyArray`
    - add `Pointed` instance
    - add `Apply` instance
    - add `concatAll`
  - `Ring`
    - add `tuple`
  - `Semigroup`
    - add `constant`
    - add `concatAll`
    - add `intercalate`
    - add `min`
    - add `max`
    - add `struct`
    - add `tuple`
    - add `first`
    - add `last`
    - add `assign`
  - `Show`
    - add `struct`
    - add `tuple`
  - `State`
    - add `Pointed` instance
    - add `Apply` instance
  - `StateT`
    - split `getStateM` into separated functions
  - `StateReaderTaskEither`
    - add `Pointed` instance
    - add `Apply` instance
    - add `Monad` instance
    - add `FromIO` instance
    - add `FromTask` instance
    - add `FromEither` instance
    - add `fromOptionK`
    - add `chainOptionK`
  - `Task`
    - add `Pointed` instance
    - add `ApplyPar` instance
    - add `ApplySeq` instance
    - add `FromIO` instance
    - add `FromTask` instance
  - `TaskEither`
    - add `Pointed` instance
    - add `ApplyPar` instance
    - add `ApplySeq` instance
    - add `getCompactable`
    - add `FromIO` instance
    - add `FromTask` instance
    - add `FromEither` instance
    - add `toUnion`
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `orElseW`
    - add `fromOptionK`
    - add `chainOptionK`
  - `TaskThese`
    - add `Functor` instance
    - add `Pointed` instance
    - add `Bifunctor` instance
    - add `toTuple2`
    - add `getApply`
    - add `FromIO` instance
    - add `FromTask` instance
    - add `fromEither` function
    - add `FromEither` instance
    - add `getChain` instance
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `fromOption`
    - add `fromOptionK`
    - add `fromPredicate`
  - `These`
    - add `Pointed` instance
    - add `of` function
    - add `getApply`
    - add `toTuple2`
    - add `FromEither` instance
    - add `fromOption` constructor
    - add `foldW`
    - add `match` alias
    - add `matchW` alias
    - add `fromOptionK`
  - `TheseT`
    - split `getTheseM` into separated functions
  - `Traversable`
    - add `traverse` helper
    - add `sequence` helper
  - `Tree`
    - add `Pointed` instance
    - add `Apply` instance
  - `Writer`
    - add `getPointed`
    - add `getApply`
    - add `getApplicative`
    - add `getChain`

# 2.9.5

- **Polish**
  - `Array`, `ReadonlyArray`: change `scanLeft` and `scanRight` to return `NonEmptyArray`, `ReadonlyNonEmptyArray`, #1391 (@willheslam)

# 2.9.4

- **Bug Fix**
  - fix `filter` overloads in `NonEmptyArray` / `ReadonlyNonEmptyArray`, closes #1388 (@gcanti)

# 2.9.3

- **Polish**
  - add more `/*#__PURE__*/` comments to improve tree shaking, #1370 (@OliverJAsh)

# 2.9.2

- **Polish**
  - add more `/*#__PURE__*/` comments to improve tree shaking, #1368 (@OliverJAsh)

# 2.9.1

- **Polish**
  - `Array` / `ReadonlyArray`
    - `sort`: return the input when length <= 1, closes #1357 (@gcanti)
    - `uniq`: return the input when length <= 1 (@gcanti)

# 2.9.0

- **New Feature**

  - `Array`
    - add `altW` (@gcanti)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `every` (@gcanti)
    - add `some` (@gcanti)
    - add `Do` (@gcanti)
  - `Either`
    - add `altW` (@gcanti)
    - add `fromNullableK` (@gcanti)
    - add `chainNullableK` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `Identity`
    - add `altW` (@gcanti)
    - add `Do` (@gcanti)
  - `IO`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `IOEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `NonEmptyArray`
    - add `altW` (@gcanti)
    - add `uncons` (@marcotoniut)
    - add `unsnoc` (@marcotoniut)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `Do` (@gcanti)
  - `Option`
    - add `altW` (@gcanti)
    - add `fromNullableK` (@gcanti)
    - add `chainNullableK` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `Reader`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `ReaderEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `ReaderTask`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `ReaderTaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `ReadonlyArray`
    - add `altW` (@gcanti)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `every` (@gcanti)
    - add `some` (@gcanti)
    - add `Do` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `altW` (@gcanti)
    - add `uncons` (@marcotoniut)
    - add `unsnoc` (@marcotoniut)
    - add `intersperse` (@marcotoniut)
    - add `prependToAll` (@marcotoniut)
    - add `Do` (@gcanti)
  - `State`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
  - `StateReaderTaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `filterOrElseW` (@gcanti)
  - `Task`
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
  - `TaskEither`
    - add `altW` (@gcanti)
    - add `traverseArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseArray` (@mohaalak @iamomiid)
    - add `sequenceArray` (@mohaalak @iamomiid)
    - add `traverseSeqArrayWithIndex` (@mohaalak @iamomiid)
    - add `traverseSeqArray` (@mohaalak @iamomiid)
    - add `sequenceSeqArray` (@mohaalak @iamomiid)
    - add `Do` (@gcanti)
    - add `filterOrElseW` (@gcanti)
  - `Tree`
    - add `Do` (@gcanti)

- **Deprecation**
  - `Option`
    - deprecate `mapNullable` in favour of `chainNullableK` (@gcanti)
  - `StateReaderTaskEither`
    - deprecate `stateReaderTaskEitherSeq` because is useless, `stateReaderTaskEither` is already sequential (@gcanti)

# 2.8.6

- **Bug Fix**
  - fix #1350 (@gcanti)

# 2.8.5

- **Polish**
  - `IOEither`
    - export missing `of` function (@gcanti)
  - `ReaderEither`
    - export missing `of` function (@gcanti)

# 2.8.4

- **Polish**
  - `IOEither`
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
- **Deprecation**
  - `IOEither`
    - deprecate `Applicative` in favour of `ApplicativePar` (@gcanti)

# 2.8.3

- **Polish**
  - `Reader`
    - export `Strong` instance (@urgent)
    - export `Choice` instance (@gcanti)

# 2.8.2

- **Polish**
  - increase the supported number of arguments of pipe function (@heka1024)
- **Bug fix**
  - revert `groupBy` change in #1286 (@gcanti)
- **Internal**
  - define all non-pipeable internal functions in terms of the corresponding pipeable versions (@gcanti)

# 2.8.1

- **Polish**
  - fix `HKT` typings duplication (which might break module augmentation)

# 2.8.0

- **New Feature**
  - expose `fp-ts` modules without lib/es6 prefix, #1241 (@StefanoMagrassi)
  - `Array`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Either`
    - add `apW` (@gcanti)
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
    - add `getFilterable` (@gcanti)
  - `Foldable`
    - add `toArray`, #1272 (@newswim)
    - add `reduceM` (@gcanti)
  - `Identity`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `IO`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `IOEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `NonEmptyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - relax `group` signature (@gcanti)
    - relax `groupBy` signature (@gcanti)
    - relax `groupSort` signature (@gcanti)
    - relax `sort` signature (@gcanti)
  - `Option`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Reader`
    - add `apW` (@gcanti)
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
  - `ReaderEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `ReaderTask`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
  - `ReaderTaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `ReadonlyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - relax `group` signature (@gcanti)
    - relax `groupBy` signature (@gcanti)
    - relax `groupSort` signature (@gcanti)
    - relax `sort` signature (@gcanti)
  - `State`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
  - `StateReaderTaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
  - `Task`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `TaskEither`
    - add `apS` (@gcanti)
    - add `apSW` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
    - add `bindW` (@gcanti)
    - add `chainFirstW`, #1273 (@leemhenson)
  - `Tree`
    - add `apS` (@gcanti)
    - add `bind` (@gcanti)
    - add `bindTo` (@gcanti)
  - `Writer`
    - add `evaluate` (@gcanti)
    - add `execute` (@gcanti)
- **Deprecation**
  - `Foldable`
    - deprecate `foldM` in favour of `reduceM` (@gcanti)
  - `State`
    - deprecate `evalState` in favour of `evaluate` (@gcanti)
    - deprecate `execState` in favour of `execute` (@gcanti)
  - `StateReaderTaskEither`
    - deprecate `evalState` in favour of `evaluate` (@gcanti)
    - deprecate `execState` in favour of `execute` (@gcanti)
  - `Writer`
    - deprecate `evalWriter` in favour of `evaluate` (@gcanti)
    - deprecate `execWriter` in favour of `execute` (@gcanti)

# 2.7.1

- **Bug Fix**
  - `ReadonlyArray`
    - fix `FunctorWithIndex` instance name (@gcanti)
    - fix `Functor` instance name (@gcanti)
- **Polish**
  - `Array`
    - relax `sort` signature (@gcanti)
    - relax `sortBy` signature (@gcanti)
  - `Map`
    - export `mapWithIndex` (@gcanti)
  - `ReadonlyArray`
    - relax `sort` signature (@gcanti)
    - relax `sortBy` signature (@gcanti)
  - `ReadonlyMap`
    - export `mapWithIndex` (@gcanti)

# 2.7.0

- **Bug Fix**
  - `These`
    - fix `ap` implementation in `getMonad` function (@gcanti)
- **Polish**
  - improve performance of sequenceT and sequenceS, fix #1255 (@gcanti)
- **New Feature**
  - `function`
    - add `hole` (type hole simulation) (@gcanti)
  - `Array`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Unfoldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `Const`
    - add `Functor` instance (@gcanti)
    - add `Contravariant` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
  - `Either`
    - add `getApplicativeValidation` constrained instance (@gcanti)
    - add `getAltValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Eq`
    - add `Contravariant` instance (@gcanti)
  - `Identity`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
  - `IO`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `MonadIO` instance (@gcanti)
    - add `ChainRec` instance (@gcanti)
  - `IOEither`
    - add `getApplicativeIOValidation` constrained instance (@gcanti)
    - add `getAltIOValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `MonadIO` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Map`
    - add `Functor` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
  - `NonEmptyArray`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `Option`
    - add `Functor` instance (@gcanti)
    - add `Applicativ` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `Ord`
    - add `ContravariantOrd` instance (@gcanti)
  - `Reader`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Profunctor` instance (@gcanti)
    - add `Category` instance (@gcanti)
    - add `String` instance (@gcanti)
    - add `Choice` instance (@gcanti)
  - `ReaderEither`
    - add `getApplicativeReaderValidation` constrained instance (@gcanti)
    - add `getAltReaderValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `MonadThrow` instance (@gcanti)
  - `ReaderTask`
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
  - `ReaderTaskEither`
    - add `getApplicativeReaderTaskValidation` constrained instance (@gcanti)
    - add `getAltReaderTaskValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `ReadonlyArray`
    - add `chainWithIndex`, #1256 (@OliverJAsh)
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Unfoldable` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Alternative` instance (@gcanti)
    - add `Extend` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `ReadonlyMap`
    - add `Functor` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
  - `ReadonlyNonEmptyArray`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `FoldableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Alt` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `ReadonlyRecord`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `ReadonlyTuple`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Semigroupoid` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
  - `Record`
    - add `Functor` instance (@gcanti)
    - add `FunctorWithIndex` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Compactable` instance (@gcanti)
    - add `Filterable` instance (@gcanti)
    - add `FilterableWithIndex` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `TraversableWithIndex` instance (@gcanti)
    - add `Witherable` instance (@gcanti)
  - `State`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
  - `Store`
    - add `Functor` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `StateReaderTaskEither`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `Task`
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
  - `TaskEither`
    - add `getApplicativeTaskValidation` constrained instance (@gcanti)
    - add `getAltTaskValidation` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `ApplicativePar` instance (@gcanti)
    - add `ApplicativeSeq` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Alt` instance (@gcanti)
  - `TaskThese`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
  - `These`
    - add `getApplicative` constrained instance (@gcanti)
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
  - `Traced`
    - rename `traced` to `Functor` for consistency (@gcanti)
  - `Tree`
    - add `Functor` instance (@gcanti)
    - add `Applicative` instance (@gcanti)
    - add `Monad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
  - `Writer`
    - add `Functor` instance (@gcanti)
  - `Tuple`
    - add `Functor` instance (@gcanti)
    - add `Bifunctor` instance (@gcanti)
    - add `Semigroupoid` instance (@gcanti)
    - add `Comonad` instance (@gcanti)
    - add `Foldable` instance (@gcanti)
    - add `Traversable` instance (@gcanti)

# 2.6.7

- **Polish**
  - refine `Either.parseJSON` return type, #1252 (@OliverJAsh)
  - add missing `chainW` to `ReaderTask`, #1254 (@adameier)

# 2.6.6

- **Polish**
  - `Array`
    - export `unfold` (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `zip` data-last (@gcanti)
    - make `cons` data-last (@gcanti)
  - `Map`
    - make `member` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `lookupWithKey` data-last (@gcanti)
    - make `isSubmap` data-last (@gcanti)
  - `NonEmptyArray`
    - make `zip` data-last (@gcanti)
  - `ReadonlyArray`
    - export `unfold` (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `zip` data-last (@gcanti)
    - make `cons` data-last (@gcanti)
  - `ReadonlyMap`
    - make `member` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `lookupWithKey` data-last (@gcanti)
    - make `isSubmap` data-last (@gcanti)
  - `ReadonlyNonEmptyArray`
    - make `zip` data-last (@gcanti)
  - `ReadonlyRecord`
    - make `isSubrecord` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
  - `ReadonlySet`
    - make `isSubset` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
  - `Record`
    - make `isSubrecord` data-last (@gcanti)
    - make `lookup` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
  - `Set`
    - make `subset` data-last (@gcanti)
    - make `elem` data-last (@gcanti)
    - make `union` data-last (@gcanti)
    - make `intersection` data-last (@gcanti)
    - make `difference` data-last (@gcanti)
  - `Semigroup`
    - make `fold` data-last (@gcanti)

# 2.6.5

- **Polish**
  - export a pipeable `wither` function from all modules which admit a `Witherable` instance (@gcanti)
  - export a pipeable `wilt` function from all modules which admit a `Witherable` instance (@gcanti)

# 2.6.4

- **Bug Fix**
  - `ReadonlyMap`
    - `traverseWithIndex` should sort the keys (@gcanti)
  - `ReadonlyRecord`
    - `traverseWithIndex` should sort the keys (@gcanti)

# 2.6.3

- **Polish**
  - change `ReadonlyNonEmptyArray` definition to get better type inference (@gcanti)
  - move `pipe` to `function` module (@gcanti)
  - export `sequence` from all modules which admit a `Traversable` instance (@gcanti)
  - export a pipeable `traverse` function from all modules which admit a `Traversable` instance (@gcanti)
  - export a pipeable `traverseWithIndex` function from all modules which admit a `TraversableWithIndex` instance (@gcanti)
  - remove monad transformers imports from all modules (@gcanti)

# 2.6.2

The goal of this release is to make `fp-ts` more "tree shaking" friendly.

- **Polish**
  - add `/*@__PURE__*/` comments to pipeables (@gcanti)
  - add `/*@__PURE__*/` comments to transformers (@gcanti)
  - remove `pipeable.ts` module imports (@gcanti)

# 2.6.1

- **New Feature**
  - add W variants, closes #904 (@gcanti)
  - `Const`
    - add missing instances, #1201 (@gcanti)
  - `Date`
    - add `eqDate`, `eqMonth`, `eqYear` (@gcanti)
  - `Either`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
  - `Eq`
    - add `getMonoid` (@gcanti)
  - `IOEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
  - `Option`
    - add `getOrElseW` (@gcanti)
  - `Reader`
    - add `chainW` (@gcanti)
  - `ReaderEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
  - `ReaderTaskEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainTaskEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `StateReaderTaskEither`
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainTaskEitherKW` (@giogonzo)
    - add `chainReaderTaskEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `TaskEither`
    - add `getOrElseW` (@gcanti)
    - add `chainW` (@gcanti)
    - add `chainEitherKW` (@giogonzo)
    - add `chainIOEitherKW` (@giogonzo)
  - `Tree`
    - add `fold` function (@gcanti)

# 2.5.4

- **Polish**
  - `StateT`
    - add missing `StateM2C` and `StateM3C` (@qlonik)

# 2.5.3

- **Polish**
  - `Either`
    - add missing instances to `getValidation` (@gcanti)
  - `IOEither`
    - relax `Bifunctor2C` to `Bifunctor2` in `getIOValidation` (@gcanti)
  - `ReaderEither`
    - relax `Bifunctor3C` to `Bifunctor3` in `getReaderValidation` (@gcanti)
  - `ReaderTaskEither`
    - relax `Bifunctor3C` to `Bifunctor3` in `getReaderTaskValidation` (@gcanti)
  - `TaskEither`
    - relax `Bifunctor2C` to `Bifunctor2` in `getTaskValidation` (@gcanti)

# 2.5.1

- **New Feature**
  - `Eq`
    - add `eqStrict`, closes #965 (@gcanti)
  - `NonEmptyArray`
    - add `fold` (@vicrac)
    - add `zip`, `zipWith` and `unzip`, closes #1109 (@gcanti)
  - `Semigroup`
    - add `getIntercalateSemigroup` (@gcanti)
  - `Set`
    - add `toggle` (@ryota-ka)
  - `TaskEither`
    - add `tryCatchK` (@DenisFrezzato)
  - `These`
    - add missing `MonadThrow` instance (@gcanti)
  - `ReaderTaskEither`
    - add missing `leftReaderTask`, `rightReaderTask` functions (@gcanti)
  - `StateReaderTaskEither`
    - add missing `Bifunctor`, `Alt` instances (@gcanti)
- **Experimental**
  - add `ReadonlyArray` module (@gcanti)
  - add `ReadonlyNonEmptyArray` module (@gcanti)
  - add `ReadonlySet` module (@gcanti)
  - add `ReadonlyMap` module (@gcanti)
  - add `ReadonlyRecord` module (@gcanti)
  - add `ReadonlyTuple` module (@gcanti)

# 2.4.4

- **Polish**
  - add missing `MonadIO4` (@mlegenhausen)
  - add missing `MonadTask4` (@mlegenhausen)
  - `StateReaderTaskEither`
    - add missing `MonadTask4` instance (@mlegenhausen)
    - add missing `filterOrElse`, `fromPredicate` combinators (@mlegenhausen)

# 2.4.3

- **Bug Fix**
  - don't set `target: es6` in `tsconfig.build-es6.json`, fix #1110 (@gcanti)

# 2.4.2

- **Bug Fix**
  - fix `Invariant` definition (@gcanti)

# 2.4.1

- **Polish**
  - `NonEmptyArray`
    - add overloading to `group` managing non empty arrays, closes #831 (@gcanti)
    - `foldMap` and `foldMapWithIndex` now require a `Semigroup` instead of a `Monoid` (@gcanti)

# 2.4.0

- **New Feature**
  - add `WriterT` module, closes #1050 (@gcanti)
  - add `TheseT` module (@gcanti)
  - add `TaskThese` module (@gcanti)
  - `function`
    - add `tupled`, `untupled` functions, closes #1062 (@gcanti)
  - `IOEither`
    - add `fromEitherK`, `chainEitherK` (@gcanti)
  - `ReaderEither`
    - add `fromEitherK`, `chainEitherK` (@gcanti)
  - `ReaderTask`
    - add `run` (@gcanti)
    - add `fromIOK`, `chainIOK`, `fromTaskK`, `chainTaskK` (@gcanti)
  - `ReaderTaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK`, `fromTaskEitherK`, `chainTaskEitherK` (@gcanti)
  - `These`
    - add `swap` (@gcanti)
  - `Ord`
    - add `getMonoid` (@vicrac)
  - `Ordering`
    - add `monoidOrdering` (@gcanti)
  - `StateReaderTaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK`, `fromTaskEitherK`, `chainTaskEitherK`, `fromReaderTaskEitherK`, `chainReaderTaskEitherK` (@gcanti)
  - `Task`
    - add `fromIOK`, `chainIOK` (@gcanti)
  - `TaskEither`
    - add `fromEitherK`, `chainEitherK`, `fromIOEitherK`, `chainIOEitherK` (@gcanti)
- **Deprecation**
  - `Ord`
    - deprecate `getSemigroup` in favor of `getMonoid` (@gcanti)
  - `Ordering`
    - deprecate `semigroupOrdering` in favor of `monoidOrdering` (@gcanti)
- **Internal**
  - use native `Promise.race` in `Task.getRaceMonoid` (@gcanti)

# 2.3.1

- **Bug Fix**
  - `Array.ts`
    - fix `sortBy` failing on empty list of ords, #1046 (@vicrac)

# 2.3.0

- **New Feature**
  - add `ReaderTask` module (@sledorze)
  - `ReaderTaskEither`
    - add `getReaderTaskValidation` (@sledorze)
  - `ReaderEither`
    - add `getReaderValidation` (@gcanti)
  - `TaskEither`
    - improve `getTaskValidation` (@gcanti)
  - `IOEither`
    - improve `getIOValidation` (@gcanti)

# 2.2.0

- **New Feature**
  - add `boolean` module, closes #930 (@giogonzo)
  - add `ChainRec` instance to `IO` (@gcanti)
  - `NonEmptyArray`
    - add `init` (@steida)
    - add `Alt` instance (@gcanti)
- **Internal**
  - add new 3C variants and related overloads (@sledorze)

# 2.1.2

- **Bug Fix**
  - `fromNullable` now uses `NonNullable` in its return type, fixes #1004 (@gcanti)

# 2.1.1

- **Bug Fix**
  - add `sequenceT` and `sequenceS` overload signatures for `Kind4`, fixes #969 (@pfgray)

# 2.1.0

- **New Feature**
  - add constrained `Filterable` instance to `IOEither`, `TaskEither`, #959 (@giogonzo)

# 2.0.5

- **Bug Fix**
  - fix `PipeableApply2C` definition (@gcanti)

# 2.0.4

- **Polish**
  - `ReaderTaskEither`
    - add missing `bracket` function (@mlegenhausen)

# 2.0.3

- **Bug Fix**
  - fix `sequenceT`, `sequenceS` implementations, closes #914 (@gcanti)

# 2.0.2

- **Bug Fix**
  - add `reduce` to `FoldableComposition2C1` (@anilanar)

# 2.0.1

- **Bug Fix**
  - fix `PipeableBifunctor` definition (@gcanti)
  - fix `chunksOf` implementation, #897 (@gcanti)

# 2.0.0

- **Breaking Change**
  - remove deprecated APIs (@gcanti)
  - remove classes (@gcanti)
  - remove all phantom fields (@gcanti)
