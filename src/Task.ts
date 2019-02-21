import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import { URI, fromIO, fromTask, map, of, ap, chain } from './Task_'

/**
 * @since 1.0.0
 */
export const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  fromIO,
  fromTask
}

/**
 * Like {@link task} but `ap` is sequential
 *
 * @since 1.10.0
 */
export const taskSeq: typeof task = {
  ...task,
  ap: (fab, fa) => fab.chain(f => fa.map(f))
}

export { delay, fromIO, fromTask, getMonoid, getRaceMonoid, getSemigroup, Task, tryCatch } from './Task_'
