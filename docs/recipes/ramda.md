---
title: Migrate from Ramda
parent: Recipes
nav_order: 7
---

# Migrate from Ramda

This guide shows you how to use `fp-ts` concepts if you have prior experience with [Ramda](https://ramdajs.com/docs/).
{: .fs-6 .fw-300 }

**Note**. The following table refers to `fp-ts@1.x`, if you are using `fp-ts@2.x` see [fp-ts-ramda](https://github.com/giogonzo/fp-ts-ramda).

---

| ramda                   | fp-ts                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| add                     | [Field](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Field.ts.md#fieldnumber-constant)                                                            |
| addIndex                |                                                                                                              |
| adjust                  | [Array.modifyAt](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#modifyat-function)                                                      |
| all                     |                                                                                                              |
| allPass                 |                                                                                                              |
| always                  | [function.constant](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#constant-function)                                                |
| and                     | [Semigroup.semigroupAll](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Semigroup.ts.md#semigroupall-constant)                                      |
| any                     |                                                                                                              |
| anyPass                 |                                                                                                              |
| ap                      | [Apply](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Apply.ts)                                                                                 |
| aperture                |                                                                                                              |
| append                  | [Array.snoc](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#snoc-function)                                                              |
| apply                   | [function.apply](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#apply-function)                                                      |
| applySpec               |                                                                                                              |
| applyTo                 | [function.applyFlipped](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#applyflipped-function)                                        |
| ascend                  | [Ord.contramap](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#contramap-function)                                                        |
| assoc                   | [Semigroup.getObjectSemigroup](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Semigroup.ts.md#getobjectsemigroup-function)                          |
| assocPath               |                                                                                                              |
| binary                  |                                                                                                              |
| bind                    |                                                                                                              |
| both                    |                                                                                                              |
| call                    |                                                                                                              |
| chain                   | [Chain](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Chain.ts)                                                                                 |
| clamp                   | [Ord.clamp](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#clamp-function)                                                                |
| clone                   |                                                                                                              |
| comparator              | [Ord.fromCompare](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#fromcompare-function)                                                    |
| complement              |                                                                                                              |
| compose                 | [function.compose](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#compose-function)                                                  |
| composeK                |                                                                                                              |
| composeP                | [Task.prototype.chain](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Task.ts.md#chain-method)                                                      |
| concat                  | [Semigroup](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Semigroup.ts)                                                                         |
| cond                    |                                                                                                              |
| construct               |                                                                                                              |
| constructN              |                                                                                                              |
| contains                | [Array.elem](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#elem-function)                                                              |
| converge                |                                                                                                              |
| countBy                 |                                                                                                              |
| curry                   | [function.curry](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#curry-function)                                                      |
| curryN                  |                                                                                                              |
| dec                     | [function.decrement](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#decrement-function)                                              |
| defaultTo               |                                                                                                              |
| descend                 | [Ord.contramap](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#contramap-function), [Ord.getDualOrd](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#getdualord-function) |
| difference              |                                                                                                              |
| differenceWith          |                                                                                                              |
| dissoc                  | [Record.remove](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Record.ts.md#remove-function)                                                        |
| dissocPath              |                                                                                                              |
| divide                  | [Field](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Field.ts)                                                                                 |
| drop                    | [Array.drop](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#drop-function)                                                              |
| dropLast                | [Array.dropEnd](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#dropend-function)                                                        |
| dropLastWhile           |                                                                                                              |
| dropRepeats             |                                                                                                              |
| dropRepeatsWith         |                                                                                                              |
| dropWhile               | [Array.dropWhile](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#dropwhile-function)                                                    |
| either                  |                                                                                                              |
| empty                   |                                                                                                              |
| endWith                 |                                                                                                              |
| eqBy                    | [Setoid.contramap](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Setoid.ts.md#contramap-function)                                                  |
| eqProps                 |                                                                                                              |
| equals                  | [Setoid](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Setoid.ts)                                                                               |
| evolve                  |                                                                                                              |
| F                       | [function.constFalse](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#constfalse-function)                                            |
| filter                  | [Filterable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Filterable.ts)                                                                       |
| find                    | [Array.find](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#find-function)                                                              |
| findIndex               | [Array.findIndex](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#findindex-function)                                                    |
| findLast                | [Array.findLast](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#findlast-function)                                                      |
| findLastIndex           | [Array.findLastIndex](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#findlastindex-function)                                            |
| flatten                 | [Array.flatten](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#flatten-function)                                                        |
| flip                    | [function.flip](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#flip-function)                                                        |
| forEach                 |                                                                                                              |
| forEachObjIndexed       |                                                                                                              |
| fromPairs               | [Record.fromFoldable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Record.ts.md#fromfoldable-function)                                            |
| groupBy                 | [NonEmptyArray.groupBy](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/NonEmptyArray.ts.md#groupby-function)                                        |
| groupWith               | [NonEmptyArray.group](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/NonEmptyArray.ts.md#group-function), [NonEmptyArray.groupSort](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#groupsort-function) |
| gt                      | [Ord.greaterThan](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#greaterthan-function)                                                    |
| gte                     | [Ord.greaterThanOrEq](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#greaterthanoreq-function)                                            |
| has                     | [Map.member](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Map.ts.md#member-function)                                                              |
| hasIn                   |                                                                                                              |
| head                    | [Array.head](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#head-function)                                                              |
| identical               | [Setoid](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Setoid.ts)                                                                               |
| identity                | [function.identity](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#identity-function)                                                |
| ifElse                  |                                                                                                              |
| inc                     | [function.increment](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#increment-function)                                              |
| indexBy                 | [NonEmptyArray.groupBy](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/NonEmptyArray.ts.md#groupby-function)                                        |
| indexOf                 | [Array.findIndex](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#findindex-function)                                                    |
| init                    | [Array.init](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#init-function)                                                              |
| innerJoin               |                                                                                                              |
| insert                  | [Array.insertAt](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#insertat-function)                                                      |
| insertAll               |                                                                                                              |
| intersection            |                                                                                                              |
| intersperse             |                                                                                                              |
| into                    |                                                                                                              |
| invert                  |                                                                                                              |
| invertObj               |                                                                                                              |
| invoker                 |                                                                                                              |
| is                      |                                                                                                              |
| isEmpty                 |                                                                                                              |
| isNil                   | [Option.fromNullable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Option.ts.md#fromnullable-function)                                            |
| join                    |                                                                                                              |
| juxt                    |                                                                                                              |
| keys                    | [Map.keys](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Map.ts.md#keys-function)                                                                  |
| keysIn                  |                                                                                                              |
| last                    | [Array.last](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#last-function)                                                              |
| lastIndexOf             | [Array.findLastIndex](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#findlastindex-function)                                            |
| length                  |                                                                                                              |
| lens                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensIndex               | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensPath                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensProp                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lift                    |                                                                                                              |
| liftN                   | [Apply.liftAN](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Apply.ts.md#lifta2-function)                                                          |
| lt                      | [Ord.lessThan](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#lessthan-function)                                                          |
| lte                     | [Ord.lessThanOrEq](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#lessthanoreq-function)                                                  |
| map                     | [Functor](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Functor.ts)                                                                             |
| mapAccum                |                                                                                                              |
| mapAccumRight           |                                                                                                              |
| mapObjIndexed           |                                                                                                              |
| match                   |                                                                                                              |
| mathMod                 |                                                                                                              |
| max                     | [Ord.max](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#max-function), [numbers recipe](../recipes/numbers)                              |
| maxBy                   |                                                                                                              |
| mean                    |                                                                                                              |
| median                  |                                                                                                              |
| memoize                 |                                                                                                              |
| memoizeWith             |                                                                                                              |
| merge                   |                                                                                                              |
| mergeAll                |                                                                                                              |
| mergeDeepLeft           |                                                                                                              |
| mergeDeepRight          |                                                                                                              |
| mergeDeepWith           |                                                                                                              |
| mergeDeepWithKey        |                                                                                                              |
| mergeWith               | [Record.getMonoid](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Record.ts.md#getmonoid-function)                                                  |
| mergeWithKey            |                                                                                                              |
| min                     | [Ord.min](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#min-function), [numbers recipe](../recipes/numbers)                              |
| minBy                   |                                                                                                              |
| modulo                  |                                                                                                              |
| multiply                | [Field](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Field.ts)                                                                                 |
| nAry                    |                                                                                                              |
| negate                  | [Ring.negate](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ring.ts.md#negate-function)                                                            |
| none                    |                                                                                                              |
| not                     |                                                                                                              |
| nth                     | [Array.index](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#index-function)                                                            |
| nthArg                  |                                                                                                              |
| o                       |                                                                                                              |
| objOf                   | [Record.singleton](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Record.ts.md#singleton-function)                                                  |
| of                      | [Array.array.of](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#array-constant)                                                         |
| omit                    |                                                                                                              |
| once                    |                                                                                                              |
| or                      | [Semigroup.semigroupAny](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Semigroup.ts.md#semigroupany-function)                                      |
| over                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| pair                    | [function.tuple](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#tuple-function), [function.tupleCurried](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#tuplecurried-function) |
| partial                 |                                                                                                              |
| partialRight            |                                                                                                              |
| partition               | [Filterable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Filterable.ts)                                                                       |
| path                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| pathEq                  |                                                                                                              |
| pathOr                  |                                                                                                              |
| pathSatisfies           |                                                                                                              |
| pick                    |                                                                                                              |
| pickAll                 |                                                                                                              |
| pickBy                  |                                                                                                              |
| pipe                    | [function.pipe](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#pipe-function)                                                        |
| pipeK                   |                                                                                                              |
| pipeP                   |                                                                                                              |
| pluck                   |                                                                                                              |
| prepend                 | [Array.cons](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#cons-function)                                                              |
| product                 | [Foldable.product](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Foldable.ts.md#product-function)                                                  |
| project                 |                                                                                                              |
| prop                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| propEq                  |                                                                                                              |
| propIs                  |                                                                                                              |
| propOr                  |                                                                                                              |
| props                   |                                                                                                              |
| propSatisfies           |                                                                                                              |
| range                   | [Array.range](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#range-function)                                                            |
| reduce                  | [Foldable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Foldable.ts)                                                                           |
| reduceBy                |                                                                                                              |
| reduced                 |                                                                                                              |
| reduceRight             | [Foldable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Foldable.ts)                                                                           |
| reduceWhile             |                                                                                                              |
| reject                  |                                                                                                              |
| remove                  |                                                                                                              |
| repeat                  | [Array.replicate](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#replicate-function)                                                    |
| replace                 |                                                                                                              |
| reverse                 | [Array.reverse](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#reverse-function)                                                        |
| scan                    | [Array.scanLeft](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#scanLeft-function)                                                      |
| sequence                | [Traversable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Traversable.ts)                                                                     |
| set                     | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| slice                   |                                                                                                              |
| sort                    | [Array.sort](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#sort-function)                                                              |
| sortBy                  | [Array.sort](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#sort-function)                                                              |
| sortWith                | [Ord.getSemigroup](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ord.ts.md#getsemigroup-function)                                                  |
| split                   |                                                                                                              |
| splitAt                 | [Array.split](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#split-function)                                                            |
| splitEvery              | [Array.chunksOf](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#chunksof-function)                                                      |
| splitWhen               |                                                                                                              |
| startsWith              |                                                                                                              |
| subtract                | [Ring](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Ring.ts)                                                                                   |
| sum                     | see [numbers recipe](../recipes/numbers)                                                                     |
| symmetricDifference     |                                                                                                              |
| symmetricDifferenceWith |                                                                                                              |
| T                       | [function.constTrue](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#consttrue-function)                                              |
| tail                    | [Array.tail](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#tail-function)                                                              |
| take                    | [Array.take](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#take-function)                                                              |
| takeLast                | [Array.takeEnd](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#takeend-function)                                                        |
| takeLastWhile           |                                                                                                              |
| takeWhile               | [Array.takeWhile](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#takewhile-function)                                                    |
| tap                     |                                                                                                              |
| test                    |                                                                                                              |
| times                   | [Array.makeBy](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#makeby-function)                                                          |
| toLower                 |                                                                                                              |
| toPairs                 | [Record.toUnfoldable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Record.ts.md#tounfoldable-function)                                            |
| toPairsIn               |                                                                                                              |
| toString                | [function.toString](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/function.ts.md#tostring-function)                                                |
| toUpper                 |                                                                                                              |
| transduce               |                                                                                                              |
| transpose               |                                                                                                              |
| traverse                | [Traversable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Traversable.ts)                                                                     |
| tryCatch                | [IOEither.tryCatch](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/IOEither.ts.md#trycatch)                                                         |
| type                    |                                                                                                              |
| unapply                 |                                                                                                              |
| unary                   |                                                                                                              |
| uncurryN                |                                                                                                              |
| unfold                  | [Unfoldable](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Unfoldable.ts)                                                                       |
| union                   |                                                                                                              |
| unionWith               |                                                                                                              |
| uniq                    | [Array.uniq](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#uniq-function)                                                              |
| uniqBy                  |                                                                                                              |
| uniqWith                | [Array.uniq](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#uniq-function)                                                              |
| unless                  |                                                                                                              |
| unnest                  | [Chain.flatten](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Chain.ts.md#flatten-function)                                                        |
| until                   |                                                                                                              |
| update                  | [Array.updateAt](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#updateat-function), [Array.unsafeUpdateAt](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#unsafeupdateat-function) |
| useWith                 |                                                                                                              |
| values                  | [Map.values](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Map.ts.md#values-function)                                                              |
| valuesIn                |                                                                                                              |
| view                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| when                    |                                                                                                              |
| where                   |                                                                                                              |
| whereEq                 |                                                                                                              |
| without                 |                                                                                                              |
| xprod                   | [Array.array.chain](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#array-constant)                                                      |
| zip                     | [Array.zip](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#zip-function)                                                                |
| zipObj                  |                                                                                                              |
| zipWith                 | [Array.zipWith](https://github.com/gcanti/fp-ts/tree/1.x/docs/modules/Array.ts.md#zipwith-function)                                                        |
