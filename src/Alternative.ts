import { Applicative } from './Applicative'
import { Plus } from './Plus'

/** @typeclass */
export interface Alternative<F> extends Applicative<F>, Plus<F> {}
