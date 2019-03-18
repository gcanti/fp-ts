---
title: Migrate from Ramda
parent: Recipes
nav_order: 3
---

# Migrate from Ramda

This guide shows you how to use fp-ts concepts if you have prior experience with [Ramda](https://ramdajs.com/docs/).
{: .fs-6 .fw-300 }

---

| ramda                   | fp-ts                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| add                     | [Field](../modules/Field.ts#fieldnumber)                                                                        |
| addIndex                |                                                                                                              |
| adjust                  | [Array.modifyAt](../modules/Array.ts#modifyat)                                                                  |
| all                     |                                                                                                              |
| allPass                 |                                                                                                              |
| always                  | [function.constant](../modules/function.ts#constant)                                                            |
| and                     | [Semigroup.semigroupAll]../modulesdocs/Semigroup.ts#semigroupall)                                                  |
| any                     |                                                                                                              |
| anyPass                 |                                                                                                              |
| ap                      | [Apply](../modules/Apply.ts)                                                                                    |
| aperture                |                                                                                                              |
| append                  | [Array.snoc](../modules/Array.ts#snoc)                                                                          |
| apply                   | [function.apply](../modules/function.ts#apply)                                                                  |
| applySpec               |                                                                                                              |
| applyTo                 | [function.applyFlipped]../modulesdocs/function.ts#applyflipped)                                                    |
| ascend                  | [Ord.contramap](../modules/Ord.ts#contramap)                                                                    |
| assoc                   | [Semigroup.getObjectSemigroup]../modulesdocs/Semigroup.ts#getobjectsemigroup)                                      |
| assocPath               |                                                                                                              |
| binary                  |                                                                                                              |
| bind                    |                                                                                                              |
| both                    |                                                                                                              |
| call                    |                                                                                                              |
| chain                   | [Chain](../modules/Chain.ts)                                                                                    |
| clamp                   | [Ord.clamp](../modules/Ord.ts#clamp)                                                                            |
| clone                   |                                                                                                              |
| comparator              | [Ord.fromCompare](../modules/Ord.ts#fromcompare)                                                                |
| complement              |                                                                                                              |
| compose                 | [function.compose](../modules/function.ts#compose)                                                              |
| composeK                |                                                                                                              |
| composeP                | [Task.prototype.chain](../modules/Task.ts#chain)                                                                |
| concat                  | [Semigroup](../modules/Semigroup.ts)                                                                            |
| cond                    |                                                                                                              |
| construct               |                                                                                                              |
| constructN              |                                                                                                              |
| contains                | [Array.member](../modules/Array.ts#member)                                                                      |
| converge                |                                                                                                              |
| countBy                 |                                                                                                              |
| curry                   | [function.curry](../modules/function.ts#curry)                                                                  |
| curryN                  |                                                                                                              |
| dec                     | [function.decrement](../modules/function.ts#decrement)                                                          |
| defaultTo               |                                                                                                              |
| descend                 | [Ord.contramap](../modules/Ord.ts#contramap), [Ord.getDualOrd](../modules/Ord.ts#getdualord)                       |
| difference              |                                                                                                              |
| differenceWith          |                                                                                                              |
| dissoc                  | [Record.remove](../modules/Record.ts#remove)                                                                    |
| dissocPath              |                                                                                                              |
| divide                  | [Field](../modules/Field.ts)                                                                                    |
| drop                    | [Array.drop](../modules/Array.ts#drop)                                                                          |
| dropLast                | [Array.dropEnd](../modules/Array.ts#dropend)                                                                    |
| dropLastWhile           |                                                                                                              |
| dropRepeats             |                                                                                                              |
| dropRepeatsWith         |                                                                                                              |
| dropWhile               | [Array.dropWhile](../modules/Array.ts#dropwhile)                                                                |
| either                  |                                                                                                              |
| empty                   |                                                                                                              |
| endWith                 |                                                                                                              |
| eqBy                    | [Setoid.contramap](../modules/Setoid.ts#contramap)                                                              |
| eqProps                 |                                                                                                              |
| equals                  | [Setoid](../modules/Setoid.ts)                                                                                  |
| evolve                  |                                                                                                              |
| F                       | [function.constFalse](../modules/function.ts#constfalse)                                                        |
| filter                  | [Filterable](../modules/Filterable.ts)                                                                          |
| find                    | [Array.find](../modules/Array.ts#find)                                                                          |
| findIndex               | [Array.findIndex](../modules/Array.ts#findindex)                                                                |
| findLast                | [Array.findLast](../modules/Array.ts#findlast)                                                                  |
| findLastIndex           | [Array.findLastIndex](../modules/Array.ts#findlastindex)                                                        |
| flatten                 | [Array.flatten](../modules/Array.ts#flatten)                                                                    |
| flip                    | [function.flip](../modules/function.ts#flip)                                                                    |
| forEach                 |                                                                                                              |
| forEachObjIndexed       |                                                                                                              |
| fromPairs               | [Record.fromFoldable](../modules/Record.ts#fromfoldable)                                                        |
| groupBy                 | [NonEmptyArray.groupBy]../modulesdocs/NonEmptyArray.ts#groupby)                                                    |
| groupWith               | [NonEmptyArray.group](../modules/NonEmptyArray.ts#group), [NonEmptyArray.groupSort](../modules/Array.ts#groupsort) |
| gt                      | [Ord.greaterThan](../modules/Ord.ts#greaterthan)                                                                |
| gte                     | [Ord.greaterThanOrEq](../modules/Ord.ts#greaterthanoreq)                                                        |
| has                     |                                                                                                              |
| hasIn                   |                                                                                                              |
| head                    | [Array.head](../modules/Array.ts#head)                                                                          |
| identical               | [Setoid](../modules/Setoid.ts)                                                                                  |
| identity                | [function.identity](../modules/function.ts#identity)                                                            |
| ifElse                  |                                                                                                              |
| inc                     | [function.increment](../modules/function.ts#increment)                                                          |
| indexBy                 | [NonEmptyArray.groupBy]../modulesdocs/NonEmptyArray.ts#groupby)                                                    |
| indexOf                 | [Array.findIndex](../modules/Array.ts#findindex)                                                                |
| init                    | [Array.init](../modules/Array.ts#init)                                                                          |
| innerJoin               |                                                                                                              |
| insert                  | [Array.insertAt](../modules/Array.ts#insertat)                                                                  |
| insertAll               |                                                                                                              |
| intersection            |                                                                                                              |
| intersperse             |                                                                                                              |
| into                    |                                                                                                              |
| invert                  |                                                                                                              |
| invertObj               |                                                                                                              |
| invoker                 |                                                                                                              |
| is                      |                                                                                                              |
| isEmpty                 |                                                                                                              |
| isNil                   |                                                                                                              |
| join                    |                                                                                                              |
| juxt                    |                                                                                                              |
| keysIn                  |                                                                                                              |
| last                    | [Array.last](../modules/Array.ts#last)                                                                          |
| lastIndexOf             | [Array.findLastIndex](../modules/Array.ts#findlastindex)                                                        |
| length                  |                                                                                                              |
| lens                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensIndex               | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensPath                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lensProp                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| lift                    |                                                                                                              |
| liftN                   | [Apply.liftAN](../modules/Apply.ts#lifta2)                                                                      |
| lt                      | [Ord.lessThan](../modules/Ord.ts#lessthan)                                                                      |
| lte                     | [Ord.lessThanOrEq](../modules/Ord.ts#lessthanoreq)                                                              |
| map                     | [Functor](../modules/Functor.ts)                                                                                |
| mapAccum                |                                                                                                              |
| mapAccumRight           |                                                                                                              |
| mapObjIndexed           |                                                                                                              |
| match                   |                                                                                                              |
| mathMod                 |                                                                                                              |
| max                     | [Ord.max](../modules/Ord.ts#max)                                                                                |
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
| mergeWith               | [Record.getMonoid](../modules/Record.ts#getmonoid)                                                              |
| mergeWithKey            |                                                                                                              |
| min                     | [Ord.min](../modules/Ord.ts#min)                                                                                |
| minBy                   |                                                                                                              |
| module.exports          |                                                                                                              |
| modulo                  |                                                                                                              |
| multiply                | [Field](../modules/Field.ts)                                                                                    |
| nAry                    |                                                                                                              |
| negate                  | [Ring.negate](../modules/Ring.ts#negate)                                                                        |
| none                    |                                                                                                              |
| not                     |                                                                                                              |
| nth                     | [Array.index](../modules/Array.ts#index)                                                                        |
| nthArg                  |                                                                                                              |
| o                       |                                                                                                              |
| objOf                   | [Record.singleton](../modules/Record.ts#singleton)                                                              |
| of                      | [Array.array.of](../modules/Array.ts#of)                                                                        |
| omit                    |                                                                                                              |
| once                    |                                                                                                              |
| or                      | [Semigroup.semigroupAny]../modulesdocs/Semigroup.ts#semigroupany)                                                  |
| over                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| pair                    | [function.tuple](../modules/function.ts#tuple), [function.tupleCurried](../modules/function.ts#tuplecurried)       |
| partial                 |                                                                                                              |
| partialRight            |                                                                                                              |
| partition               | [Filterable](../modules/Filterable.ts)                                                                          |
| path                    |                                                                                                              |
| pathEq                  |                                                                                                              |
| pathOr                  |                                                                                                              |
| pathSatisfies           |                                                                                                              |
| pick                    |                                                                                                              |
| pickAll                 |                                                                                                              |
| pickBy                  |                                                                                                              |
| pipe                    | [function.pipe](../modules/function.ts#pipe)                                                                    |
| pipeK                   |                                                                                                              |
| pipeP                   |                                                                                                              |
| pluck                   |                                                                                                              |
| prepend                 | [Array.cons](../modules/Array.ts#cons)                                                                          |
| product                 | [Foldable.product](../modules/Foldable.ts#product)                                                              |
| project                 |                                                                                                              |
| prop                    |                                                                                                              |
| propEq                  |                                                                                                              |
| propIs                  |                                                                                                              |
| propOr                  |                                                                                                              |
| props                   |                                                                                                              |
| propSatisfies           |                                                                                                              |
| range                   | [Array.range](../modules/Array.ts#range)                                                                        |
| reduce                  | [Foldable](../modules/Foldable.ts)                                                                              |
| reduceBy                |                                                                                                              |
| reduced                 |                                                                                                              |
| reduceRight             | [Foldable](../modules/Foldable.ts)                                                                              |
| reduceWhile             |                                                                                                              |
| reject                  |                                                                                                              |
| remove                  |                                                                                                              |
| repeat                  | [Array.replicate](../modules/Array.ts#replicate)                                                                |
| replace                 |                                                                                                              |
| reverse                 | [Array.reverse](../modules/Array.ts#reverse)                                                                    |
| scan                    | [Array.scanLeft](../modules/Array.ts#scanLeft)                                                                  |
| sequence                | [Traversable](../modules/Traversable.ts)                                                                        |
| set                     | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| slice                   |                                                                                                              |
| sort                    | [Array.sort](../modules/Array.ts#sort)                                                                          |
| sortBy                  | [Array.sort](../modules/Array.ts#sort)                                                                          |
| sortWith                | [Ord.getSemigroup](../modules/Ord.ts#getsemigroup)                                                              |
| split                   |                                                                                                              |
| splitAt                 | [Array.split](../modules/Array.ts#split)                                                                        |
| splitEvery              | [Array.chunksOf](../modules/Array.ts#chunksof)                                                                  |
| splitWhen               |                                                                                                              |
| startsWith              |                                                                                                              |
| subtract                | [Ring](../modules/Ring.ts)                                                                                      |
| sum                     |                                                                                                              |
| symmetricDifference     |                                                                                                              |
| symmetricDifferenceWith |                                                                                                              |
| T                       | [function.constTrue](../modules/function.ts#consttrue)                                                          |
| tail                    | [Array.tail](../modules/Array.ts#tail)                                                                          |
| take                    | [Array.take](../modules/Array.ts#take)                                                                          |
| takeLast                | [Array.takeEnd](../modules/Array.ts#takeend)                                                                    |
| takeLastWhile           |                                                                                                              |
| takeWhile               | [Array.takeWhile](../modules/Array.ts#takewhile)                                                                |
| tap                     |                                                                                                              |
| test                    |                                                                                                              |
| times                   | [Array.makeBy](../modules/Array.ts#makeby)                                                                      |
| toLower                 | [Record.toUnfoldable](../modules/Record.ts#tounfoldable)                                                        |
| toPairs                 |                                                                                                              |
| toPairsIn               |                                                                                                              |
| toString                | [function.toString](../modules/function.ts#tostring)                                                            |
| toUpper                 |                                                                                                              |
| transduce               |                                                                                                              |
| transpose               |                                                                                                              |
| traverse                | [Traversable](../modules/Traversable.ts)                                                                        |
| tryCatch                | [IOEither.tryCatch](../modules/IOEither.ts#trycatch)                                                            |
| type                    |                                                                                                              |
| unapply                 |                                                                                                              |
| unary                   |                                                                                                              |
| uncurryN                |                                                                                                              |
| unfold                  | [Unfoldable](../modules/Unfoldable.ts)                                                                          |
| union                   |                                                                                                              |
| unionWith               |                                                                                                              |
| uniq                    | [Array.uniq](../modules/Array.ts#uniq)                                                                          |
| uniqBy                  |                                                                                                              |
| uniqWith                | [Array.uniq](../modules/Array.ts#uniq)                                                                          |
| unless                  |                                                                                                              |
| unnest                  | [Chain.flatten](../modules/Chain.ts#flatten)                                                                    |
| until                   |                                                                                                              |
| update                  | [Array.updateAt](../modules/Array.ts#updateat), [Array.unsafeUpdateAt](../modules/Array.ts#unsafeupdateat)         |
| useWith                 |                                                                                                              |
| values                  |                                                                                                              |
| valuesIn                |                                                                                                              |
| view                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                       |
| when                    |                                                                                                              |
| where                   |                                                                                                              |
| whereEq                 |                                                                                                              |
| without                 |                                                                                                              |
| xprod                   | [Array.array.chain](../modules/Array.ts#chain)                                                                  |
| zip                     | [Array.zip](../modules/Array.ts#zip)                                                                            |
| zipObj                  |                                                                                                              |
| zipWith                 | [Array.zipWith](../modules/Array.ts#zipwith)                                                                    |
