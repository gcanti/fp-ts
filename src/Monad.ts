import { Applicative } from './Applicative'
import { Chain } from './Chain'

export interface Monad<F> extends Applicative<F>, Chain<F> {}
