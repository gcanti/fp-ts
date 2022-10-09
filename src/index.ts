/**
 * @since 3.0.0
 */

import * as alt from './Alt'
import * as alternative from './Alternative'
import * as applicative from './Applicative'
import * as apply from './Apply'
import * as async from './Async'
import * as asyncOption from './AsyncOption'
import * as asyncResult from './AsyncResult'
import * as asyncThese from './AsyncThese'
import * as bifunctor from './Bifunctor'
import * as boolean from './boolean'
import * as bounded from './Bounded'
import * as category from './Category'
import * as comonad from './Comonad'
import * as compactable from './Compactable'
import * as composable from './Composable'
import * as console from './Console'
import * as const_ from './Const'
import * as contravariant from './Contravariant'
import * as endomorphism from './Endomorphism'
import * as eq from './Eq'
import * as extendable from './Extendable'
import * as filterable from './Filterable'
import * as filterableWithIndex from './FilterableWithIndex'
import * as flattenable from './Flattenable'
import * as flattenableRec from './FlattenableRec'
import * as foldable from './Foldable'
import * as foldableWithIndex from './FoldableWithIndex'
import * as fromAsync from './FromAsync'
import * as fromIdentity from './FromIdentity'
import * as fromSync from './FromSync'
import * as fromOption from './FromOption'
import * as fromReader from './FromReader'
import * as fromResult from './FromResult'
import * as fromState from './FromState'
import * as fromThese from './FromThese'
import * as fromWriter from './FromWriter'
import * as function_ from './Function'
import * as functor from './Functor'
import * as functorWithIndex from './FunctorWithIndex'
import * as hkt from './HKT'
import * as identity from './Identity'
import * as invariant from './Invariant'
import * as syncOption from './SyncOption'
import * as json from './Json'
import * as kleisliCategory from './KleisliCategory'
import * as kleisliComposable from './KleisliComposable'
import * as magma from './Magma'
import * as monad from './Monad'
import * as monoid from './Monoid'
import * as nonEmptyReadonlyArray from './NonEmptyReadonlyArray'
import * as number from './number'
import * as option from './Option'
import * as optionT from './OptionT'
import * as ord from './Ord'
import * as ordering from './Ordering'
import * as predicate from './Predicate'
import * as random from './Random'
import * as reader from './Reader'
import * as readerAsync from './ReaderAsync'
import * as readerAsyncResult from './ReaderAsyncResult'
import * as readerAsyncWriter from './ReaderAsyncWriter'
import * as readerResult from './ReaderResult'
import * as readerSync from './ReaderSync'
import * as readerT from './ReaderT'
import * as readonlyArray from './ReadonlyArray'
import * as refinement from './Refinement'
import * as result from './Result'
import * as resultT from './ResultT'
import * as semigroup from './Semigroup'
import * as show from './Show'
import * as state from './State'
import * as stateReaderAsyncResult from './StateReaderAsyncResult'
import * as stateT from './StateT'
import * as string from './string'
import * as struct from './struct'
import * as sync from './Sync'
import * as syncResult from './SyncResult'
import * as these from './These'
import * as theseT from './TheseT'
import * as traversable from './Traversable'
import * as traversableFilterable from './TraversableFilterable'
import * as traversableWithIndex from './TraversableWithIndex'
import * as tuple from './tuple'
import * as unfoldable from './Unfoldable'
import * as void_ from './void'
import * as writer from './Writer'
import * as writerT from './WriterT'

export {
  /**
   * @category type classes
   * @since 3.0.0
   */
  alt,
  /**
   * @category type classes
   * @since 3.0.0
   */
  alternative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  applicative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  apply,
  /**
   * @category data types
   * @since 3.0.0
   */
  async,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncOption,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  asyncThese,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bifunctor,
  /**
   * @since 3.0.0
   */
  boolean,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bounded,
  /**
   * @category type classes
   * @since 3.0.0
   */
  category,
  /**
   * @category type classes
   * @since 3.0.0
   */
  comonad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  compactable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  composable,
  /**
   * @since 3.0.0
   */
  console,
  /**
   * @category data types
   * @since 3.0.0
   */
  const_ as const,
  /**
   * @category type classes
   * @since 3.0.0
   */
  contravariant,
  /**
   * @category data types
   * @since 3.0.0
   */
  endomorphism,
  /**
   * @category type classes
   * @since 3.0.0
   */
  extendable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  filterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  filterableWithIndex,
  /**
   * @category type classes
   * @since 3.0.0
   */
  flattenable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  flattenableRec,
  /**
   * @category type classes
   * @since 3.0.0
   */
  foldable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  foldableWithIndex,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromAsync,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromIdentity,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromOption,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromReader,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromResult,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromState,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromSync,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromThese,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromWriter,
  /**
   * @since 3.0.0
   */
  function_ as function,
  /**
   * @category type classes
   * @since 3.0.0
   */
  functor,
  /**
   * @category type classes
   * @since 3.0.0
   */
  functorWithIndex,
  /**
   * @since 3.0.0
   */
  hkt,
  /**
   * @category data types
   * @since 3.0.0
   */
  identity,
  /**
   * @category type classes
   * @since 3.0.0
   */
  invariant,
  /**
   * @since 3.0.0
   */
  json,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliCategory,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliComposable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  magma,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monoid,
  /**
   * @category data types
   * @since 3.0.0
   */
  nonEmptyReadonlyArray,
  /**
   * @since 3.0.0
   */
  number,
  /**
   * @category data types
   * @since 3.0.0
   */
  option,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  optionT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  ord,
  /**
   * @since 3.0.0
   */
  ordering,
  /**
   * @since 3.0.0
   */
  predicate,
  /**
   * @since 3.0.0
   */
  random,
  /**
   * @category data types
   * @since 3.0.0
   */
  reader,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsync,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsyncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerAsyncWriter,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  readerSync,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  readerT,
  /**
   * @category data types
   * @since 3.0.0
   */
  readonlyArray,
  /**
   * @category data types
   * @since 3.0.0
   */
  refinement,
  /**
   * @category data types
   * @since 3.0.0
   */
  result,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  resultT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  semigroup,
  /**
   * @category type classes
   * @since 3.0.0
   */
  eq,
  /**
   * @category type classes
   * @since 3.0.0
   */
  show,
  /**
   * @category data types
   * @since 3.0.0
   */
  state,
  /**
   * @category data types
   * @since 3.0.0
   */
  stateReaderAsyncResult,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  stateT,
  /**
   * @since 3.0.0
   */
  string,
  /**
   * @since 3.0.0
   */
  struct,
  /**
   * @category data types
   * @since 3.0.0
   */
  sync,
  /**
   * @category data types
   * @since 3.0.0
   */
  syncOption,
  /**
   * @category data types
   * @since 3.0.0
   */
  syncResult,
  /**
   * @category data types
   * @since 3.0.0
   */
  these,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  theseT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversableFilterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversableWithIndex,
  /**
   * @since 3.0.0
   */
  tuple,
  /**
   * @category type classes
   * @since 3.0.0
   */
  unfoldable,
  /**
   * @since 3.0.0
   */
  void_ as void,
  /**
   * @category data types
   * @since 3.0.0
   */
  writer,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  writerT
}
