import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { URI, map, of, ap, chain } from './IO_'
import { identity } from './function'

const fromIO = identity

/**
 * @since 1.0.0
 */
export const io: Monad1<URI> & MonadIO1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO
}

export { getMonoid, getSemigroup, IO, URI } from './IO_'
