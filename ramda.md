# Comparison with [ramda](https://ramdajs.com/docs/)

| ramda                   | fp-ts                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| add                     | [Field](docs/Field.ts.md#fieldnumber)                                                                     |
| addIndex                |                                                                                                        |
| adjust                  | [Array.modifyAt](docs/Array.ts.md#modifyat)                                                               |
| all                     |                                                                                                        |
| allPass                 |                                                                                                        |
| always                  | [function.constant](docs/function.ts.md#constant)                                                         |
| and                     | [Semigroup.semigroupAll](docs/Semigroup.ts.md#semigroupall)                                               |
| any                     |                                                                                                        |
| anyPass                 |                                                                                                        |
| ap                      | [Apply](docs/Apply.ts.md)                                                                                 |
| aperture                |                                                                                                        |
| append                  | [Array.snoc](docs/Array.ts.md#snoc)                                                                       |
| apply                   | [function.apply](docs/function.ts.md#apply)                                                               |
| applySpec               |                                                                                                        |
| applyTo                 | [function.applyFlipped](docs/function.ts.md#applyflipped)                                                 |
| ascend                  | [Ord.contramap](docs/Ord.ts.md#contramap)                                                                 |
| assoc                   | [Semigroup.getObjectSemigroup](docs/Semigroup.ts.md#getobjectsemigroup)                                   |
| assocPath               |                                                                                                        |
| binary                  |                                                                                                        |
| bind                    |                                                                                                        |
| both                    |                                                                                                        |
| call                    |                                                                                                        |
| chain                   | [Chain](docs/Chain.ts.md)                                                                                 |
| clamp                   | [Ord.clamp](docs/Ord.ts.md#clamp)                                                                         |
| clone                   |                                                                                                        |
| comparator              | [Ord.fromCompare](docs/Ord.ts.md#fromcompare)                                                             |
| complement              |                                                                                                        |
| compose                 | [function.compose](docs/function.ts.md#compose)                                                           |
| composeK                |                                                                                                        |
| composeP                | [Task.prototype.chain](docs/Task.ts.md#chain)                                                             |
| concat                  | [Semigroup](docs/Semigroup.ts.md)                                                                         |
| cond                    |                                                                                                        |
| construct               |                                                                                                        |
| constructN              |                                                                                                        |
| contains                | [Array.member](docs/Array.ts.md#member)                                                                   |
| converge                |                                                                                                        |
| countBy                 |                                                                                                        |
| curry                   | [function.curry](docs/function.ts.md#curry)                                                               |
| curryN                  |                                                                                                        |
| dec                     | [function.decrement](docs/function.ts.md#decrement)                                                       |
| defaultTo               |                                                                                                        |
| descend                 | [Ord.contramap](docs/Ord.ts.md#contramap), [Ord.getDualOrd](docs/Ord.ts.md#getdualord)                    |
| difference              |                                                                                                        |
| differenceWith          |                                                                                                        |
| dissoc                  | [Record.remove](docs/Record.ts.md#remove)                                                                 |
| dissocPath              |                                                                                                        |
| divide                  | [Field](docs/Field.ts.md)                                                                                 |
| drop                    | [Array.drop](docs/Array.ts.md#drop)                                                                       |
| dropLast                | [Array.dropEnd](docs/Array.ts.md#dropend)                                                                 |
| dropLastWhile           |                                                                                                        |
| dropRepeats             |                                                                                                        |
| dropRepeatsWith         |                                                                                                        |
| dropWhile               | [Array.dropWhile](docs/Array.ts.md#dropwhile)                                                             |
| either                  |                                                                                                        |
| empty                   |                                                                                                        |
| endWith                 |                                                                                                        |
| eqBy                    | [Setoid.contramap](docs/Setoid.ts.md#contramap)                                                           |
| eqProps                 |                                                                                                        |
| equals                  | [Setoid](docs/Setoid.ts.md)                                                                               |
| evolve                  |                                                                                                        |
| F                       | [function.constFalse](docs/function.ts.md#constfalse)                                                     |
| filter                  | [Filterable](docs/Filterable.ts.md)                                                                       |
| find                    | [Array.find](docs/Array.ts.md#find)                                                                       |
| findIndex               | [Array.findIndex](docs/Array.ts.md#findindex)                                                             |
| findLast                | [Array.findLast](docs/Array.ts.md#findlast)                                                               |
| findLastIndex           | [Array.findLastIndex](docs/Array.ts.md#findlastindex)                                                     |
| flatten                 | [Array.flatten](docs/Array.ts.md#flatten)                                                                 |
| flip                    | [function.flip](docs/function.ts.md#flip)                                                                 |
| forEach                 |                                                                                                        |
| forEachObjIndexed       |                                                                                                        |
| fromPairs               | [Record.fromFoldable](docs/Record.ts.md#fromfoldable)                                                     |
| groupBy                 | [NonEmptyArray.groupBy](docs/NonEmptyArray.ts.md#groupby)                                                 |
| groupWith               | [NonEmptyArray.group](docs/NonEmptyArray.ts.md#group), [NonEmptyArray.groupSort](docs/Array.ts.md#groupsort) |
| gt                      | [Ord.greaterThan](docs/Ord.ts.md#greaterthan)                                                             |
| gte                     | [Ord.greaterThanOrEq](docs/Ord.ts.md#greaterthanoreq)                                                     |
| has                     |                                                                                                        |
| hasIn                   |                                                                                                        |
| head                    | [Array.head](docs/Array.ts.md#head)                                                                       |
| identical               | [Setoid](docs/Setoid.ts.md)                                                                               |
| identity                | [function.identity](docs/function.ts.md#identity)                                                         |
| ifElse                  |                                                                                                        |
| inc                     | [function.increment](docs/function.ts.md#increment)                                                       |
| indexBy                 | [NonEmptyArray.groupBy](docs/NonEmptyArray.ts.md#groupby)                                                 |
| indexOf                 | [Array.findIndex](docs/Array.ts.md#findindex)                                                             |
| init                    | [Array.init](docs/Array.ts.md#init)                                                                       |
| innerJoin               |                                                                                                        |
| insert                  | [Array.insertAt](docs/Array.ts.md#insertat)                                                               |
| insertAll               |                                                                                                        |
| intersection            |                                                                                                        |
| intersperse             |                                                                                                        |
| into                    |                                                                                                        |
| invert                  |                                                                                                        |
| invertObj               |                                                                                                        |
| invoker                 |                                                                                                        |
| is                      |                                                                                                        |
| isEmpty                 |                                                                                                        |
| isNil                   |                                                                                                        |
| join                    |                                                                                                        |
| juxt                    |                                                                                                        |
| keysIn                  |                                                                                                        |
| last                    | [Array.last](docs/Array.ts.md#last)                                                                       |
| lastIndexOf             | [Array.findLastIndex](docs/Array.ts.md#findlastindex)                                                     |
| length                  |                                                                                                        |
| lens                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| lensIndex               | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| lensPath                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| lensProp                | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| lift                    |                                                                                                        |
| liftN                   | [Apply.liftAN](docs/Apply.ts.md#lifta2)                                                                   |
| lt                      | [Ord.lessThan](docs/Ord.ts.md#lessthan)                                                                   |
| lte                     | [Ord.lessThanOrEq](docs/Ord.ts.md#lessthanoreq)                                                           |
| map                     | [Functor](docs/Functor.ts.md)                                                                             |
| mapAccum                |                                                                                                        |
| mapAccumRight           |                                                                                                        |
| mapObjIndexed           |                                                                                                        |
| match                   |                                                                                                        |
| mathMod                 |                                                                                                        |
| max                     | [Ord.max](docs/Ord.ts.md#max)                                                                             |
| maxBy                   |                                                                                                        |
| mean                    |                                                                                                        |
| median                  |                                                                                                        |
| memoize                 |                                                                                                        |
| memoizeWith             |                                                                                                        |
| merge                   |                                                                                                        |
| mergeAll                |                                                                                                        |
| mergeDeepLeft           |                                                                                                        |
| mergeDeepRight          |                                                                                                        |
| mergeDeepWith           |                                                                                                        |
| mergeDeepWithKey        |                                                                                                        |
| mergeWith               | [Record.getMonoid](docs/Record.ts.md#getmonoid)                                                           |
| mergeWithKey            |                                                                                                        |
| min                     | [Ord.min](docs/Ord.ts.md#min)                                                                             |
| minBy                   |                                                                                                        |
| module.exports          |                                                                                                        |
| modulo                  |                                                                                                        |
| multiply                | [Field](docs/Field.ts.md)                                                                                 |
| nAry                    |                                                                                                        |
| negate                  | [Ring.negate](docs/Ring.ts.md#negate)                                                                     |
| none                    |                                                                                                        |
| not                     |                                                                                                        |
| nth                     | [Array.index](docs/Array.ts.md#index)                                                                     |
| nthArg                  |                                                                                                        |
| o                       |                                                                                                        |
| objOf                   | [Record.singleton](docs/Record.ts.md#singleton)                                                           |
| of                      | [Array.array.of](docs/Array.ts.md#of)                                                                     |
| omit                    |                                                                                                        |
| once                    |                                                                                                        |
| or                      | [Semigroup.semigroupAny](docs/Semigroup.ts.md#semigroupany)                                               |
| over                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| pair                    | [function.tuple](docs/function.ts.md#tuple), [function.tupleCurried](docs/function.ts.md#tuplecurried)    |
| partial                 |                                                                                                        |
| partialRight            |                                                                                                        |
| partition               | [Filterable](docs/Filterable.ts.md)                                                                       |
| path                    |                                                                                                        |
| pathEq                  |                                                                                                        |
| pathOr                  |                                                                                                        |
| pathSatisfies           |                                                                                                        |
| pick                    |                                                                                                        |
| pickAll                 |                                                                                                        |
| pickBy                  |                                                                                                        |
| pipe                    | [function.pipe](docs/function.ts.md#pipe)                                                                 |
| pipeK                   |                                                                                                        |
| pipeP                   |                                                                                                        |
| pluck                   |                                                                                                        |
| prepend                 | [Array.cons](docs/Array.ts.md#cons)                                                                       |
| product                 | [Foldable.product](docs/Foldable.ts.md#product)                                                           |
| project                 |                                                                                                        |
| prop                    |                                                                                                        |
| propEq                  |                                                                                                        |
| propIs                  |                                                                                                        |
| propOr                  |                                                                                                        |
| props                   |                                                                                                        |
| propSatisfies           |                                                                                                        |
| range                   | [Array.range](docs/Array.ts.md#range)                                                                     |
| reduce                  | [Foldable](docs/Foldable.ts.md)                                                                           |
| reduceBy                |                                                                                                        |
| reduced                 |                                                                                                        |
| reduceRight             | [Foldable](docs/Foldable.ts.md)                                                                           |
| reduceWhile             |                                                                                                        |
| reject                  |                                                                                                        |
| remove                  |                                                                                                        |
| repeat                  | [Array.replicate](docs/Array.ts.md#replicate)                                                             |
| replace                 |                                                                                                        |
| reverse                 | [Array.reverse](docs/Array.ts.md#reverse)                                                                 |
| scan                    | [Array.scanLeft](docs/Array.ts.md#scanLeft)                                                               |
| sequence                | [Traversable](docs/Traversable.ts.md)                                                                     |
| set                     | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| slice                   |                                                                                                        |
| sort                    | [Array.sort](docs/Array.ts.md#sort)                                                                       |
| sortBy                  | [Array.sort](docs/Array.ts.md#sort)                                                                       |
| sortWith                | [Ord.getSemigroup](docs/Ord.ts.md#getsemigroup)                                                           |
| split                   |                                                                                                        |
| splitAt                 | [Array.split](docs/Array.ts.md#split)                                                                     |
| splitEvery              | [Array.chunksOf](docs/Array.ts.md#chunksof)                                                               |
| splitWhen               |                                                                                                        |
| startsWith              |                                                                                                        |
| subtract                | [Ring](docs/Ring.ts.md)                                                                                   |
| sum                     |                                                                                                        |
| symmetricDifference     |                                                                                                        |
| symmetricDifferenceWith |                                                                                                        |
| T                       | [function.constTrue](docs/function.ts.md#consttrue)                                                       |
| tail                    | [Array.tail](docs/Array.ts.md#tail)                                                                       |
| take                    | [Array.take](docs/Array.ts.md#take)                                                                       |
| takeLast                | [Array.takeEnd](docs/Array.ts.md#takeend)                                                                 |
| takeLastWhile           |                                                                                                        |
| takeWhile               | [Array.takeWhile](docs/Array.ts.md#takewhile)                                                             |
| tap                     |                                                                                                        |
| test                    |                                                                                                        |
| times                   | [Array.makeBy](docs/Array.ts.md#makeby)                                                                   |
| toLower                 | [Record.toUnfoldable](docs/Record.ts.md#tounfoldable)                                                     |
| toPairs                 |                                                                                                        |
| toPairsIn               |                                                                                                        |
| toString                | [function.toString](docs/function.ts.md#tostring)                                                         |
| toUpper                 |                                                                                                        |
| transduce               |                                                                                                        |
| transpose               |                                                                                                        |
| traverse                | [Traversable](docs/Traversable.ts.md)                                                                     |
| tryCatch                | [IOEither.tryCatch](docs/IOEither.ts.md#trycatch)                                                         |
| type                    |                                                                                                        |
| unapply                 |                                                                                                        |
| unary                   |                                                                                                        |
| uncurryN                |                                                                                                        |
| unfold                  | [Unfoldable](docs/Unfoldable.ts.md)                                                                       |
| union                   |                                                                                                        |
| unionWith               |                                                                                                        |
| uniq                    | [Array.uniq](docs/Array.ts.md#uniq)                                                                       |
| uniqBy                  |                                                                                                        |
| uniqWith                | [Array.uniq](docs/Array.ts.md#uniq)                                                                       |
| unless                  |                                                                                                        |
| unnest                  | [Chain.flatten](docs/Chain.ts.md#flatten)                                                                 |
| until                   |                                                                                                        |
| update                  | [Array.updateAt](docs/Array.ts.md#updateat), [Array.unsafeUpdateAt](docs/Array.ts.md#unsafeupdateat)      |
| useWith                 |                                                                                                        |
| values                  |                                                                                                        |
| valuesIn                |                                                                                                        |
| view                    | see [monocle-ts](https://github.com/gcanti/monocle-ts)                                                 |
| when                    |                                                                                                        |
| where                   |                                                                                                        |
| whereEq                 |                                                                                                        |
| without                 |                                                                                                        |
| xprod                   | [Array.array.chain](docs/Array.ts.md#chain)                                                               |
| zip                     | [Array.zip](docs/Array.ts.md#zip)                                                                         |
| zipObj                  |                                                                                                        |
| zipWith                 | [Array.zipWith](docs/Array.ts.md#zipwith)                                                                 |
