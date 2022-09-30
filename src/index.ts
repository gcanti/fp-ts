/**
 * @since 2.0.0
 */

import * as alt from './Alt'
import * as alternative from './Alternative'
import * as applicative from './Applicative'
import * as apply from './Apply'
import * as array from './Array'
import * as bifunctor from './Bifunctor'
import * as boolean from './boolean'
import * as booleanAlgebra from './BooleanAlgebra'
import * as bounded from './Bounded'
import * as boundedDistributiveLattice from './BoundedDistributiveLattice'
import * as boundedJoinSemilattice from './BoundedJoinSemilattice'
import * as boundedLattice from './BoundedLattice'
import * as boundedMeetSemilattice from './BoundedMeetSemilattice'
import * as category from './Category'
import * as chain from './Chain'
import * as chainRec from './ChainRec'
import * as choice from './Choice'
import * as comonad from './Comonad'
import * as compactable from './Compactable'
import * as console from './Console'
import * as const_ from './Const'
import * as contravariant from './Contravariant'
import * as date from './Date'
import * as distributiveLattice from './DistributiveLattice'
import * as either from './Either'
import * as eitherT from './EitherT'
import * as endomorphism from './Endomorphism'
import * as eq from './Eq'
import * as extend from './Extend'
import * as field from './Field'
import * as filterable from './Filterable'
import * as filterableWithIndex from './FilterableWithIndex'
import * as foldable from './Foldable'
import * as foldableWithIndex from './FoldableWithIndex'
import * as fromEither from './FromEither'
import * as fromIO from './FromIO'
import * as fromReader from './FromReader'
import * as fromState from './FromState'
import * as fromTask from './FromTask'
import * as fromThese from './FromThese'
import * as function_ from './function'
import * as functor from './Functor'
import * as functorWithIndex from './FunctorWithIndex'
import * as group from './Group'
import * as heytingAlgebra from './HeytingAlgebra'
import * as hkt from './HKT'
import * as identity from './Identity'
import * as invariant from './Invariant'
import * as io from './IO'
import * as ioEither from './IOEither'
import * as ioOption from './IOOption'
import * as ioRef from './IORef'
import * as joinSemilattice from './JoinSemilattice'
import * as json from './Json'
import * as lattice from './Lattice'
import * as magma from './Magma'
import * as map from './Map'
import * as meetSemilattice from './MeetSemilattice'
import * as monad from './Monad'
import * as monadIO from './MonadIO'
import * as monadTask from './MonadTask'
import * as monadThrow from './MonadThrow'
import * as monoid from './Monoid'
import * as naturalTransformation from './NaturalTransformation'
import * as nonEmptyArray from './NonEmptyArray'
import * as number from './number'
import * as option from './Option'
import * as optionT from './OptionT'
import * as ord from './Ord'
import * as ordering from './Ordering'
import * as pipeable from './pipeable'
import * as pointed from './Pointed'
import * as predicate from './Predicate'
import * as profunctor from './Profunctor'
import * as random from './Random'
import * as reader from './Reader'
import * as readerEither from './ReaderEither'
import * as readerIO from './ReaderIO'
import * as readerT from './ReaderT'
import * as readerTask from './ReaderTask'
import * as readerTaskEither from './ReaderTaskEither'
import * as readonlyArray from './ReadonlyArray'
import * as readonlyMap from './ReadonlyMap'
import * as readonlyNonEmptyArray from './ReadonlyNonEmptyArray'
import * as readonlyRecord from './ReadonlyRecord'
import * as readonlySet from './ReadonlySet'
import * as readonlyTuple from './ReadonlyTuple'
import * as record from './Record'
import * as refinement from './Refinement'
import * as ring from './Ring'
import * as semigroup from './Semigroup'
import * as semigroupoid from './Semigroupoid'
import * as semiring from './Semiring'
import * as separated from './Separated'
import * as set from './Set'
import * as show from './Show'
import * as state from './State'
import * as stateReaderTaskEither from './StateReaderTaskEither'
import * as stateT from './StateT'
import * as store from './Store'
import * as string from './string'
import * as strong from './Strong'
import * as struct from './struct'
import * as task from './Task'
import * as taskEither from './TaskEither'
import * as taskOption from './TaskOption'
import * as taskThese from './TaskThese'
import * as these from './These'
import * as theseT from './TheseT'
import * as traced from './Traced'
import * as traversable from './Traversable'
import * as traversableWithIndex from './TraversableWithIndex'
import * as tree from './Tree'
import * as tuple from './Tuple'
import * as unfoldable from './Unfoldable'
import * as validationT from './ValidationT'
import * as void_ from './void'
import * as witherable from './Witherable'
import * as writer from './Writer'
import * as writerT from './WriterT'
import * as zero from './Zero'
export {
  /**
   * @category type classes
   * @since 2.0.0
   */
  alt,
  /**
   * @category type classes
   * @since 2.0.0
   */
  alternative,
  /**
   * @category type classes
   * @since 2.0.0
   */
  applicative,
  /**
   * @category type classes
   * @since 2.0.0
   */
  apply,
  /**
   * @category data types
   * @since 2.0.0
   */
  array,
  /**
   * @category type classes
   * @since 2.0.0
   */
  bifunctor,
  /**
   * @since 2.2.0
   */
  boolean,
  /**
   * @category type classes
   * @since 2.0.0
   */
  booleanAlgebra,
  /**
   * @category type classes
   * @since 2.0.0
   */
  bounded,
  /**
   * @category type classes
   * @since 2.0.0
   */
  boundedDistributiveLattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  boundedJoinSemilattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  boundedLattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  boundedMeetSemilattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  category,
  /**
   * @category type classes
   * @since 2.0.0
   */
  chain,
  /**
   * @category type classes
   * @since 2.0.0
   */
  chainRec,
  /**
   * @category type classes
   * @since 2.0.0
   */
  choice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  comonad,
  /**
   * @category type classes
   * @since 2.0.0
   */
  compactable,
  /**
   * @since 2.0.0
   */
  console,
  /**
   * @category data types
   * @since 2.0.0
   */
  const_ as const,
  /**
   * @category type classes
   * @since 2.0.0
   */
  contravariant,
  /**
   * @since 2.0.0
   */
  date,
  /**
   * @category type classes
   * @since 2.0.0
   */
  distributiveLattice,
  /**
   * @category data types
   * @since 2.0.0
   */
  either,
  /**
   * @category monad transformers
   * @since 2.0.0
   */
  eitherT,
  /**
   * @category data types
   * @since 2.11.0
   */
  endomorphism,
  /**
   * @category type classes
   * @since 2.0.0
   */
  extend,
  /**
   * @category type classes
   * @since 2.0.0
   */
  field,
  /**
   * @category type classes
   * @since 2.0.0
   */
  filterable,
  /**
   * @category type classes
   * @since 2.0.0
   */
  filterableWithIndex,
  /**
   * @category type classes
   * @since 2.0.0
   */
  foldable,
  /**
   * @category type classes
   * @since 2.0.0
   */
  foldableWithIndex,
  /**
   * @category type classes
   * @since 2.10.0
   */
  fromEither,
  /**
   * @category type classes
   * @since 2.10.0
   */
  fromIO,
  /**
   * @category type classes
   * @since 2.11.0
   */
  fromReader,
  /**
   * @category type classes
   * @since 2.11.0
   */
  fromState,
  /**
   * @category type classes
   * @since 2.10.0
   */
  fromTask,
  /**
   * @category type classes
   * @since 2.11.0
   */
  fromThese,
  /**
   * @since 2.0.0
   */
  function_ as function,
  /**
   * @category type classes
   * @since 2.0.0
   */
  functor,
  /**
   * @category type classes
   * @since 2.0.0
   */
  functorWithIndex,
  /**
   * @category type classes
   * @since 2.0.0
   */
  group,
  /**
   * @category type classes
   * @since 2.0.0
   */
  heytingAlgebra,
  /**
   * @since 2.0.0
   */
  hkt,
  /**
   * @category data types
   * @since 2.0.0
   */
  identity,
  /**
   * @category type classes
   * @since 2.0.0
   */
  invariant,
  /**
   * @category data types
   * @since 2.0.0
   */
  io,
  /**
   * @category data types
   * @since 2.0.0
   */
  ioEither,
  /**
   * @category data types
   * @since 2.12.0
   */
  ioOption,
  /**
   * @since 2.0.0
   */
  ioRef,
  /**
   * @category type classes
   * @since 2.0.0
   */
  joinSemilattice,
  /**
   * @since 2.10.0
   */
  json,
  /**
   * @category type classes
   * @since 2.0.0
   */
  lattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  magma,
  /**
   * @category data types
   * @since 2.0.0
   */
  map,
  /**
   * @category type classes
   * @since 2.0.0
   */
  meetSemilattice,
  /**
   * @category type classes
   * @since 2.0.0
   */
  monad,
  /**
   * @category type classes
   * @since 2.0.0
   */
  monadIO,
  /**
   * @category type classes
   * @since 2.0.0
   */
  monadTask,
  /**
   * @category type classes
   * @since 2.0.0
   */
  monadThrow,
  /**
   * @category type classes
   * @since 2.0.0
   */
  monoid,
  /**
   * @since 2.11.0
   */
  naturalTransformation,
  /**
   * @category data types
   * @since 2.0.0
   */
  nonEmptyArray,
  /**
   * @since 2.10.0
   */
  number,
  /**
   * @category data types
   * @since 2.0.0
   */
  option,
  /**
   * @category monad transformers
   * @since 2.0.0
   */
  optionT,
  /**
   * @category type classes
   * @since 2.0.0
   */
  ord,
  /**
   * @since 2.0.0
   */
  ordering,
  /**
   * @since 2.0.0
   */
  pipeable,
  /**
   * @category type classes
   * @since 2.10.0
   */
  pointed,
  /**
   * @category data types
   * @since 2.11.0
   */
  predicate,
  /**
   * @category type classes
   * @since 2.0.0
   */
  profunctor,
  /**
   * @since 2.0.0
   */
  random,
  /**
   * @category data types
   * @since 2.0.0
   */
  reader,
  /**
   * @category data types
   * @since 2.0.0
   */
  readerEither,
  /**
   * @category data types
   * @since 2.0.0
   */
  readerIO,
  /**
   * @category monad transformers
   * @since 2.0.0
   */
  readerT,
  /**
   * @category data types
   * @since 2.0.0
   */
  readerTaskEither,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlyArray,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlyMap,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlyNonEmptyArray,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlyRecord,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlySet,
  /**
   * @category data types
   * @since 2.5.0
   */
  readonlyTuple,
  /**
   * @category data types
   * @since 2.3.0
   */
  readerTask,
  /**
   * @category data types
   * @since 2.0.0
   */
  record,
  /**
   * @category data types
   * @since 2.11.0
   */
  refinement,
  /**
   * @category type classes
   * @since 2.0.0
   */
  ring,
  /**
   * @category type classes
   * @since 2.0.0
   */
  semigroup,
  /**
   * @category type classes
   * @since 2.0.0
   */
  semigroupoid,
  /**
   * @category type classes
   * @since 2.0.0
   */
  semiring,
  /**
   * @category data types
   * @since 2.10.0
   */
  separated,
  /**
   * @category data types
   * @since 2.0.0
   */
  set,
  /**
   * @category type classes
   * @since 2.0.0
   */
  eq,
  /**
   * @category type classes
   * @since 2.0.0
   */
  show,
  /**
   * @category data types
   * @since 2.0.0
   */
  state,
  /**
   * @category data types
   * @since 2.0.0
   */
  stateReaderTaskEither,
  /**
   * @category monad transformers
   * @since 2.0.0
   */
  stateT,
  /**
   * @category data types
   * @since 2.0.0
   */
  store,
  /**
   * @since 2.10.0
   */
  string,
  /**
   * @category type classes
   * @since 2.0.0
   */
  strong,
  /**
   * @since 2.10.0
   */
  struct,
  /**
   * @category data types
   * @since 2.0.0
   */
  task,
  /**
   * @category data types
   * @since 2.0.0
   */
  taskEither,
  /**
   * @category data types
   * @since 2.10.0
   */
  taskOption,
  /**
   * @category data types
   * @since 2.4.0
   */
  taskThese,
  /**
   * @category data types
   * @since 2.0.0
   */
  these,
  /**
   * @category monad transformers
   * @since 2.4.0
   */
  theseT,
  /**
   * @category data types
   * @since 2.0.0
   */
  traced,
  /**
   * @category type classes
   * @since 2.0.0
   */
  traversable,
  /**
   * @category type classes
   * @since 2.0.0
   */
  traversableWithIndex,
  /**
   * @category data types
   * @since 2.0.0
   */
  tree,
  /**
   * @category data types
   * @since 2.0.0
   */
  tuple,
  /**
   * @category type classes
   * @since 2.0.0
   */
  unfoldable,
  /**
   * @category data types
   * @since 2.0.0
   */
  validationT,
  /**
   * @category monad transformers
   * @since 2.11.0
   * @deprecated
   */
  void_ as void,
  /**
   * @category type classes
   * @since 2.0.0
   */
  witherable,
  /**
   * @category data types
   * @since 2.0.0
   */
  writer,
  /**
   * @category monad transformers
   * @since 2.4.0
   */
  writerT,
  /**
   * @category type classes
   * @since 2.11.0
   */
  zero
}
