import { Extend } from './Extend'
import { Copointed } from './Copointed'

export interface Comonad<F> extends Extend<F>, Copointed<F> {}
