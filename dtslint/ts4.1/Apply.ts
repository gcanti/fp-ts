import * as _ from '../../src/Apply'
import { pipe } from '../../src/function'
import * as Fu from '../../src/Functor'
import { Kind, URIS } from '../../src/HKT'

//
// apS
//

export const apS = <F extends URIS>(F: _.Apply1<F>) => (
  s: Kind<F, string>,
  n: Kind<F, number>
): Kind<F, { s: string; n: number }> => {
  const apS = _.apS(F)
  const bindTo = Fu.bindTo(F)
  return pipe(s, bindTo('s'), apS('n', n))
}
