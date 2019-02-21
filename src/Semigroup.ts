import { Ord, max, min } from './Ord'
import { Semigroup } from './Semigroup_'

/**
 * @since 1.0.0
 */
export const getMeetSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: min(O)
  }
}

/**
 * @since 1.0.0
 */
export const getJoinSemigroup = <A>(O: Ord<A>): Semigroup<A> => {
  return {
    concat: max(O)
  }
}

export {
  fold,
  getArraySemigroup,
  getDictionarySemigroup,
  getDualSemigroup,
  getFirstSemigroup,
  getFunctionSemigroup,
  getLastSemigroup,
  getObjectSemigroup,
  getProductSemigroup,
  getRecordSemigroup,
  getStructSemigroup,
  getTupleSemigroup,
  Semigroup,
  semigroupAll,
  semigroupAny,
  semigroupProduct,
  semigroupString,
  semigroupSum,
  semigroupVoid
} from './Semigroup_'
