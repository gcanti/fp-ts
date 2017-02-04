import { Applicative } from './Applicative'
import { Plus } from './Plus'

export interface Alternative<F> extends Applicative<F>, Plus<F> {}
